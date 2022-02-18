# Storage load balance

You can use the `BALANCE` statement to balance the distribution of partitions and Raft leaders, or clear some Storage servers for easy maintenance. For details, see [BALANCE](../3.ngql-guide/18.operation-and-maintenance-statements/2.balance-syntax.md).

!!! compatibility "Legacy version compatibility"

    The `BALANCE DATA` commands are not supported.

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
  +------------------+------+----------+--------------+-----------------------------------+------------------------+---------+
  | Host             | Port | Status   | Leader count | Leader distribution               | Partition distribution | Version |
  +------------------+------+----------+--------------+-----------------------------------+------------------------+---------+
  | "192.168.10.100" | 9779 | "ONLINE" | 4            | "basketballplayer:4"              | "basketballplayer:15"  | "3.1.0" |
  | "192.168.10.101" | 9779 | "ONLINE" | 8            | "basketballplayer:8"              | "basketballplayer:15"  | "3.1.0" |
  | "192.168.10.102" | 9779 | "ONLINE" | 3            | "basketballplayer:3"              | "basketballplayer:15"  | "3.1.0" |
  | "192.168.10.103" | 9779 | "ONLINE" | 0            | "No valid partition"              | "No valid partition"   | "3.1.0" |
  | "192.168.10.104" | 9779 | "ONLINE" | 0            | "No valid partition"              | "No valid partition"   | "3.1.0" |
  | "192.168.10.105" | 9779 | "ONLINE" | 0            | "No valid partition"              | "No valid partition"   | "3.1.0" |
  +------------------+------+----------+--------------+-----------------------------------+------------------------+---------+
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
  +-------------------------+--------------------------------------------+-------------+---------------------------------+---------------------------------+
  | Job Id(spaceId:partId)  | Command(src->dst)                          | Status      | Start Time                      | Stop Time                       |
  +-------------------------+--------------------------------------------+-------------+---------------------------------+---------------------------------+
  | 30                      | "DATA_BALANCE"                             | "FINISHED"  | "2022-01-12T02:27:00.000000000" | "2022-01-12T02:30:31.000000000" |
  | "30, 23:1"              | "192.168.10.100:9779->192.168.10.103:9779" | "SUCCEEDED" | 2022-01-12T02:27:00.000000      | 2022-01-12T02:27:30.000000      |
  | "30, 23:2"              | "192.168.10.100:9779->192.168.10.103:9779" | "SUCCEEDED" | 2022-01-12T02:27:00.000000      | 2022-01-12T02:27:01.000000      |
  ......
  | "Total:21"              | "Succeeded:21"                             | "Failed:0"  | "In Progress:0"                 | "Invalid:0"                     |
  +-------------------------+--------------------------------------------+-------------+---------------------------------+---------------------------------+
  ```

5. When all the subtasks succeed, the load balancing process finishes. Run `SHOW HOSTS` again to make sure the partition distribution is balanced.

  !!! Note

        `BALANCE IN ZONE` does not balance the leader distribution. For more information, see [Balance leader distribution](#balance_leader_distribution).

  ```ngql
  nebula> SHOW HOSTS;
  +------------------+------+----------+--------------+-----------------------------------+------------------------+---------+
  | Host             | Port | Status   | Leader count | Leader distribution               | Partition distribution | Version |
  +------------------+------+----------+--------------+-----------------------------------+------------------------+---------+
  | "192.168.10.100" | 9779 | "ONLINE" | 4            | "basketballplayer:4"              | "basketballplayer:8"   | "3.1.0" |
  | "192.168.10.101" | 9779 | "ONLINE" | 8            | "basketballplayer:8"              | "basketballplayer:8"   | "3.1.0" |
  | "192.168.10.102" | 9779 | "ONLINE" | 3            | "basketballplayer:3"              | "basketballplayer:8"   | "3.1.0" |
  | "192.168.10.103" | 9779 | "ONLINE" | 0            | "No valid partition"              | "basketballplayer:7"   | "3.1.0" |
  | "192.168.10.104" | 9779 | "ONLINE" | 0            | "No valid partition"              | "basketballplayer:7"   | "3.1.0" |
  | "192.168.10.105" | 9779 | "ONLINE" | 0            | "No valid partition"              | "basketballplayer:7"   | "3.1.0" |
  +------------------+------+----------+--------------+-----------------------------------+------------------------+---------+
  ```

If any subtask fails, run [`RECOVER JOB <job_id>`](../3.ngql-guide/18.operation-and-maintenance-statements/4.job-statements.md) to restart the balancing. If redoing load balancing does not solve the problem, ask for help in the [Nebula Graph community](https://discuss.nebula-graph.io/).

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
+------------------+------+----------+--------------+-----------------------------------+------------------------+---------+
| Host             | Port | Status   | Leader count | Leader distribution               | Partition distribution | Version |
+------------------+------+----------+--------------+-----------------------------------+------------------------+---------+
| "192.168.10.100" | 9779 | "ONLINE" | 4            | "basketballplayer:3"              | "basketballplayer:8"   | "3.0.0" |
| "192.168.10.101" | 9779 | "ONLINE" | 8            | "basketballplayer:3"              | "basketballplayer:8"   | "3.0.0" |
| "192.168.10.102" | 9779 | "ONLINE" | 3            | "basketballplayer:3"              | "basketballplayer:8"   | "3.0.0" |
| "192.168.10.103" | 9779 | "ONLINE" | 0            | "basketballplayer:2"              | "basketballplayer:7"   | "3.0.0" |
| "192.168.10.104" | 9779 | "ONLINE" | 0            | "basketballplayer:2"              | "basketballplayer:7"   | "3.0.0" |
| "192.168.10.105" | 9779 | "ONLINE" | 0            | "basketballplayer:2"              | "basketballplayer:7"   | "3.0.0" |
+------------------+------+----------+--------------+-----------------------------------+------------------------+---------+
```

!!! caution

    In Nebula Graph {{ nebula.release }}, switching leaders will cause a large number of short-term request errors (Storage Error `E_RPC_FAILURE`). For solutions, see [FAQ](../20.appendix/0.FAQ.md).
