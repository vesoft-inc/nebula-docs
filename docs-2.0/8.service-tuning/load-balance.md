# Storage load balance

You can use the `BALANCE` statement to balance the distribution of partitions and Raft leaders, or clear some Storage servers for easy maintenance. For details, see [BALANCE](../synchronization-and-migration/2.balance-syntax.md).

!!! danger

    The `BALANCE` commands migrate data and balance the distribution of partitions by creating and executing a set of subtasks. **DO NOT** stop any machine in the cluster or change its IP address until all the subtasks finish. Otherwise, the follow-up subtasks fail.

## Balance partition distribution

!!! enterpriseonly

    Only available for the Nebula Graph Enterprise Edition.
    
!!! note

    If the current graph space already has a failed `BALANCE DATA` job, you can resume the failed job, but cannot start a new `BALANCE DATA` job. If the job continues to fail, manually stop it, and then you can start a new one.

The `BALANCE DATA` commands starts a job to balance the distribution of storage partitions in the current graph space by creating and executing a set of subtasks.

### Examples

After you add new storage hosts into the cluster, no partition is deployed on the new hosts.

1. Run `SHOW HOSTS` to check the partition distribution.

    ```ngql
    nebual> SHOW HOSTS;
    +-----------------+------+-----------+----------+--------------+-----------------------+------------------------+-------------+
    | Host            | Port | HTTP port | Status   | Leader count | Leader distribution   | Partition distribution | Version     |
    +-----------------+------+-----------+----------+--------------+-----------------------+------------------------+-------------+
    | "192.168.8.101" | 9779 | 19669     | "ONLINE" | 0            | "No valid partition"  | "No valid partition"   | "3.1.0-ent" |
    | "192.168.8.100" | 9779 | 19669     | "ONLINE" | 15           | "basketballplayer:15" | "basketballplayer:15"  | "3.1.0-ent" |
    +-----------------+------+-----------+----------+--------------+-----------------------+------------------------+-------------+
    ```

2. Enter the graph space `basketballplayer`, and execute the command `BALANCE DATA` to balance the distribution of storage partitions.

    ```ngql
    nebula> USE basketballplayer;
    nebula> BALANCE DATA;
    +------------+
    | New Job Id |
    +------------+
    | 2          |
    +------------+
    ```

3. The job ID is returned after running `BALANCE DATA`. Run `SHOW JOB <job_id>` to check the status of the job.

    ```ngql
    nebula> SHOW JOB 2;
    +------------------------+------------------------------------------+-------------+---------------------------------+---------------------------------+-------------+
    | Job Id(spaceId:partId) | Command(src->dst)                        | Status      | Start Time                      | Stop Time                       | Error Code  |
    +------------------------+------------------------------------------+-------------+---------------------------------+---------------------------------+-------------+
    | 2                      | "DATA_BALANCE"                           | "FINISHED"  | "2022-04-12T03:41:43.000000000" | "2022-04-12T03:41:53.000000000" | "SUCCEEDED" |
    | "2, 1:1"               | "192.168.8.100:9779->192.168.8.101:9779" | "SUCCEEDED" | 2022-04-12T03:41:43.000000      | 2022-04-12T03:41:53.000000      | "SUCCEEDED" |
    | "2, 1:2"               | "192.168.8.100:9779->192.168.8.101:9779" | "SUCCEEDED" | 2022-04-12T03:41:43.000000      | 2022-04-12T03:41:53.000000      | "SUCCEEDED" |
    | "2, 1:3"               | "192.168.8.100:9779->192.168.8.101:9779" | "SUCCEEDED" | 2022-04-12T03:41:43.000000      | 2022-04-12T03:41:53.000000      | "SUCCEEDED" |
    | "2, 1:4"               | "192.168.8.100:9779->192.168.8.101:9779" | "SUCCEEDED" | 2022-04-12T03:41:43.000000      | 2022-04-12T03:41:53.000000      | "SUCCEEDED" |
    | "2, 1:5"               | "192.168.8.100:9779->192.168.8.101:9779" | "SUCCEEDED" | 2022-04-12T03:41:43.000000      | 2022-04-12T03:41:53.000000      | "SUCCEEDED" |
    | "2, 1:6"               | "192.168.8.100:9779->192.168.8.101:9779" | "SUCCEEDED" | 2022-04-12T03:41:43.000000      | 2022-04-12T03:41:43.000000      | "SUCCEEDED" |
    | "2, 1:7"               | "192.168.8.100:9779->192.168.8.101:9779" | "SUCCEEDED" | 2022-04-12T03:41:43.000000      | 2022-04-12T03:41:53.000000      | "SUCCEEDED" |
    | "Total:7"              | "Succeeded:7"                            | "Failed:0"  | "In Progress:0"                 | "Invalid:0"                     | ""          |
    +------------------------+------------------------------------------+-------------+---------------------------------+---------------------------------+-------------+
    ```

4. When all the subtasks succeed, the load balancing process finishes. Run `SHOW HOSTS` again to make sure the partition distribution is balanced.

  !!! Note

        `BALANCE DATA` does not balance the leader distribution. For more information, see [Balance leader distribution](#Balance leader distribution).

  ```ngql
  nebula> SHOW HOSTS;
  +-----------------+------+-----------+----------+--------------+----------------------+------------------------+-------------+
  | Host            | Port | HTTP port | Status   | Leader count | Leader distribution  | Partition distribution | Version     |
  +-----------------+------+-----------+----------+--------------+----------------------+------------------------+-------------+
  | "192.168.8.101" | 9779 | 19669     | "ONLINE" | 7            | "basketballplayer:7" | "basketballplayer:7"   | "3.1.0-ent" |
  | "192.168.8.100" | 9779 | 19669     | "ONLINE" | 8            | "basketballplayer:8" | "basketballplayer:8"   | "3.1.0-ent" |
  +-----------------+------+-----------+----------+--------------+----------------------+------------------------+-------------+
  ```

If any subtask fails, run `RECOVER JOB <job_id>` to recover the failed jobs. If redoing load balancing does not solve the problem, ask for help in the [Nebula Graph community](https://discuss.nebula-graph.io/).

### Stop data balancing

To stop a balance job, run `STOP JOB <job_id>`.

* If no balance job is running, an error is returned.

* If a balance job is running, `Job stopped` is returned.

!!! note

    - `STOP JOB <job_id>` does not stop the running subtasks but cancels all follow-up subtasks. The status of follow-up subtasks is set to `INVALID`. The status of ongoing subtasks is set to `SUCCEEDED` or `FAILED` based on the result. You can run the `SHOW JOB <job_id>` command to check the stopped job status.

Once all the subtasks are finished or stopped, you can run `RECOVER JOB <job_id>` again to balance the partitions again, the subtasks continue to be executed in the original state.

### Restore a BALANCE job

To restore a BALANCE job in the `FAILED` or `STOPPED` status, run `RECOVER JOB <job_id>`.

!!! note

    For a `STOPPED` `BALANCE DATA` job, Nebula Graph detects whether the same type of `FAILED` jobs or `FINISHED` jobs have been created since the start time of the job. If so, the `STOPPED` job cannot be restored. For example, if chronologically there are STOPPED job1, FINISHED job2, and STOPPED Job3, only job3 can be restored, and job1 cannot.

### Migrate partition

To migrate specified partitions and scale in the cluster, you can run `BALANCE DATA REMOVE <ip:port> [,<ip>:<port> ...]`.

For example, to migrate the partitions in server `192.168.8.100:9779`, the command as following:

```ngql
nebula> BALANCE DATA REMOVE 192.168.8.100:9779;
nebula> SHOW HOSTS;
+-----------------+------+-----------+----------+--------------+-----------------------+------------------------+-------------+
| Host            | Port | HTTP port | Status   | Leader count | Leader distribution   | Partition distribution | Version     |
+-----------------+------+-----------+----------+--------------+-----------------------+------------------------+-------------+
| "192.168.8.101" | 9779 | 19669     | "ONLINE" | 15           | "basketballplayer:15" | "basketballplayer:15"  | "3.1.0-ent" |
| "192.168.8.100" | 9779 | 19669     | "ONLINE" | 0            | "No valid partition"  | "No valid partition"   | "3.1.0-ent" |
+-----------------+------+-----------+----------+--------------+-----------------------+------------------------+-------------+
```

!!! note

    This command migrates partitions to other storage hosts but does not delete the current storage host from the cluster. To delete the Storage hosts from cluster, see [Manage Storage hosts](../4.deployment-and-installation/manage-storage-host.md).

<!-- balance-3.1
!!! danger

    The `BALANCE` commands migrates data and balances the distribution of partitions by creating and executing a set of subtasks. **DO NOT** stop any machine in the cluster or change its IP address until all the subtasks finish. Otherwise, the follow-up subtasks fail.

## Balance partition distribution

### Examples

After you add new storage hosts into the zone, no partition is deployed on the new hosts.

1. Add the three new storage hosts into a cluster, and add them respectively to the zone which the graph space `basketballplayer` belongs. For details about the Zone, see [Manage zone](../4.deployment-and-installation/5.zone.md).

  ```ngql
  nebual> ADD HOSTS 192.168.10.103:9779 INTO ZONE "zone1";
  nebual> ADD HOSTS 192.168.10.104:9779 INTO ZONE "zone2";
  nebual> ADD HOSTS 192.168.10.105:9779 INTO ZONE "zone3";
  ```

2. Run [`SHOW HOSTS`](../3.ngql-guide/7.general-query-statements/6.show/6.show-hosts.md) to check the partition distribution.

  ```ngql
  nebual> SHOW HOSTS;
  +------------------+------+-----------+----------+--------------+-----------------------------------+------------------------+---------+
  | Host             | Port | HTTP port | Status   | Leader count | Leader distribution               | Partition distribution | Version |
  +------------------+------+-----------+----------+--------------+-----------------------------------+------------------------+---------+
  | "192.168.10.100" | 9779 | 19669     | "ONLINE" | 4            | "basketballplayer:4"              | "basketballplayer:15"  | "3.1.0" |
  | "192.168.10.101" | 9779 | 19669     | "ONLINE" | 8            | "basketballplayer:8"              | "basketballplayer:15"  | "3.1.0" |
  | "192.168.10.102" | 9779 | 19669     | "ONLINE" | 3            | "basketballplayer:3"              | "basketballplayer:15"  | "3.1.0" |
  | "192.168.10.103" | 9779 | 19669     | "ONLINE" | 0            | "No valid partition"              | "No valid partition"   | "3.1.0" |
  | "192.168.10.104" | 9779 | 19669     | "ONLINE" | 0            | "No valid partition"              | "No valid partition"   | "3.1.0" |
  | "192.168.10.105" | 9779 | 19669     | "ONLINE" | 0            | "No valid partition"              | "No valid partition"   | "3.1.0" |
  +------------------+------+-----------+----------+--------------+-----------------------------------+------------------------+---------+
  ```

3. Run `BALANCE IN ZONE` to start a job to balance the distribution of storage partitions in each zone in the current graph space. 

  ```ngql
  nebula> USE basketballplayer;
  nebula> BALANCE IN ZONE;
  +------------+
  | New Job Id |
  +------------+
  | 30         |
  +------------+
  ```

4. A BALANCE job ID is returned after running `BALANCE IN ZONE`. Run `SHOW JOB <job_id>` to check the status of the `BALANCE` job.

  ```ngql
  nebula> SHOW JOB 30;
  +-------------------------+--------------------------------------------+-------------+---------------------------------+---------------------------------+-------------+
  | Job Id(spaceId:partId)  | Command(src->dst)                          | Status      | Start Time                      | Stop Time                       | Error Code  |
  +-------------------------+--------------------------------------------+-------------+---------------------------------+---------------------------------+-------------+
  | 30                      | "DATA_BALANCE"                             | "FINISHED"  | "2022-01-12T02:27:00.000000000" | "2022-01-12T02:30:31.000000000" | "SUCCEEDED" |
  | "30, 23:1"              | "192.168.10.100:9779->192.168.10.103:9779" | "SUCCEEDED" | 2022-01-12T02:27:00.000000      | 2022-01-12T02:27:30.000000      | "SUCCEEDED" |
  | "30, 23:2"              | "192.168.10.100:9779->192.168.10.103:9779" | "SUCCEEDED" | 2022-01-12T02:27:00.000000      | 2022-01-12T02:27:01.000000      | "SUCCEEDED" |
  ......
  | "Total:21"              | "Succeeded:21"                             | "Failed:0"  | "In Progress:0"                 | "Invalid:0"                     | ""          |
  +-------------------------+--------------------------------------------+-------------+---------------------------------+---------------------------------+-------------+
  ```

5. When all the subtasks succeed, the load balancing process finishes. Run `SHOW HOSTS` again to make sure the partition distribution is balanced.

  !!! Note

        `BALANCE IN ZONE` does not balance the leader distribution. For more information, see [Balance leader distribution](#balance_leader_distribution).

  ```ngql
  nebula> SHOW HOSTS;
  +------------------+------+-----------+----------+--------------+-----------------------------------+------------------------+---------+
  | Host             | Port | HTTP port | Status   | Leader count | Leader distribution               | Partition distribution | Version |
  +------------------+------+-----------+----------+--------------+-----------------------------------+------------------------+---------+
  | "192.168.10.100" | 9779 | 19669     | "ONLINE" | 4            | "basketballplayer:4"              | "basketballplayer:8"   | "3.1.0" |
  | "192.168.10.101" | 9779 | 19669     | "ONLINE" | 8            | "basketballplayer:8"              | "basketballplayer:8"   | "3.1.0" |
  | "192.168.10.102" | 9779 | 19669     | "ONLINE" | 3            | "basketballplayer:3"              | "basketballplayer:8"   | "3.1.0" |
  | "192.168.10.103" | 9779 | 19669     | "ONLINE" | 0            | "No valid partition"              | "basketballplayer:7"   | "3.1.0" |
  | "192.168.10.104" | 9779 | 19669     | "ONLINE" | 0            | "No valid partition"              | "basketballplayer:7"   | "3.1.0" |
  | "192.168.10.105" | 9779 | 19669     | "ONLINE" | 0            | "No valid partition"              | "basketballplayer:7"   | "3.1.0" |
  +------------------+------+-----------+----------+--------------+-----------------------------------+------------------------+---------+
  ```

If any subtask fails, run [`RECOVER JOB <job_id>`](../synchronization-and-migration/2.balance-syntax.md) to restart the balancing. If redoing load balancing does not solve the problem, ask for help in the [Nebula Graph community](https://discuss.nebula-graph.io/).

## Stop data balancing

To stop a balance task, run `STOP JOB <job_id>`.

* If no balance task is running, an error is returned.

* If a balance task is running, `Job stopped` is returned.

!!! note

    - `STOP JOB <job_id>` does not stop the running subtasks but cancels all follow-up subtasks. The status of follow-up subtasks is set to `INVALID`. The status of ongoing subtasks is set to `SUCCEEDED` or `FAILED` based on the result. You can run the `SHOW JOB <job_id>` command to check the stopped job status.
    - After terminate and restart, the job status is set to `QUEUE`. If the previous status of subtasks was `INVALID` or `FAILED`, the status set to `IN_PROGRESS`. If it was `IN_PROGRESS` or `SUCCEEDED`, the status remains unchanged.

Once all the subtasks are finished or stopped, you can run `RECOVER JOB <job_id>` again to balance the partitions again, the subtasks continue to be executed in the original state.

## Remove storage servers

To remove specified storage servers and scale in the Storage Service, you can run `BALANCE IN ZONE REMOVE <ip>:<port> [,<ip>:<port> ...]` command to clear specified storage servers, then run `DROP HOSTS <ip>:<port> [,<ip>:<port> ...]` command to remove specified storage servers.

### Example

To remove the following storage servers.

|IP address|Port|
|:---|:---|
|192.168.10.104|9779|
|192.168.10.105|9779|

1. Clear specified storage servers. The command as following:

  ```ngql
  nebula> BALANCE IN ZONE REMOVE 192.168.10.104:9779,192.168.10.105:9779;
  ```

2. After the job is complete, remove the specified Storage servers. The command as following:

  ```ngql
  nebula> DROP HOSTS 192.168.10.104:9779,192.168.10.105:9779;
  ```
-->

## Balance leader distribution

To balance the raft leaders, run `BALANCE LEADER`.

### Example

```ngql
nebula> BALANCE LEADER;
```

Run `SHOW HOSTS` to check the balance result.

```ngql
nebula> SHOW HOSTS;
+------------------+------+-----------+----------+--------------+-----------------------------------+------------------------+---------+
| Host             | Port | HTTP port | Status   | Leader count | Leader distribution               | Partition distribution | Version |
+------------------+------+-----------+----------+--------------+-----------------------------------+------------------------+---------+
| "192.168.10.100" | 9779 | 19669     | "ONLINE" | 4            | "basketballplayer:3"              | "basketballplayer:8"   | "3.1.0" |
| "192.168.10.101" | 9779 | 19669     | "ONLINE" | 8            | "basketballplayer:3"              | "basketballplayer:8"   | "3.1.0" |
| "192.168.10.102" | 9779 | 19669     | "ONLINE" | 3            | "basketballplayer:3"              | "basketballplayer:8"   | "3.1.0" |
| "192.168.10.103" | 9779 | 19669     | "ONLINE" | 0            | "basketballplayer:2"              | "basketballplayer:7"   | "3.1.0" |
| "192.168.10.104" | 9779 | 19669     | "ONLINE" | 0            | "basketballplayer:2"              | "basketballplayer:7"   | "3.1.0" |
| "192.168.10.105" | 9779 | 19669     | "ONLINE" | 0            | "basketballplayer:2"              | "basketballplayer:7"   | "3.1.0" |
+------------------+------+-----------+----------+--------------+-----------------------------------+------------------------+---------+
```

!!! caution

    In Nebula Graph {{ nebula.release }}, switching leaders will cause a large number of short-term request errors (Storage Error `E_RPC_FAILURE`). For solutions, [FAQ](../20.appendix/0.FAQ.md).
