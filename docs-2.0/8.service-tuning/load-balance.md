# Storage load balance

You can use the `SUBMIT JOB BALANCE` statement to balance the distribution of partitions and Raft leaders, or clear some Storage servers for easy maintenance. For details, see [SUBMIT JOB BALANCE](../synchronization-and-migration/2.balance-syntax.md).

!!! danger

    The `BALANCE` commands migrate data and balance the distribution of partitions by creating and executing a set of subtasks. **DO NOT** stop any machine in the cluster or change its IP address until all the subtasks are finished. Otherwise, the follow-up subtasks fail.

{{ ent.ent_begin }}

## Balance partition distribution

The `SUBMIT JOB BALANCE DATA` command starts a job to balance the distribution of storage partitions in the current graph space by creating and executing a set of subtasks. If the [Zone](../4.deployment-and-installation/5.zone.md) feature is enabled, you can balance the partitions within each Zone by adding the `IN ZONE` keywords to the command. For example, `SUBMIT JOB BALANCE DATA IN ZONE`.

!!! enterpriseonly

    Only available for the NebulaGraph Enterprise Edition.
    
!!! note

    If the current graph space already has a `SUBMIT JOB BALANCE DATA` job in the `FAILED` status, you can restore the `FAILED` job, but cannot start a new `SUBMIT JOB BALANCE DATA` job. If the job continues to fail, manually stop it, and then you can start a new one.

### Balance partitions with Zone disabled

After you add new storage hosts to the cluster, no partition is deployed on the new hosts. For example, run the following steps to balance the partition distribution when the Zone feature is disabled.

1. Run `SHOW HOSTS` to check the partition distribution.

    ```ngql
    nebual> SHOW HOSTS;
    +-----------------+------+----------+--------------+-----------------------+------------------------+-------------+
    | Host            | Port | Status   | Leader count | Leader distribution   | Partition distribution | Version     |
    +-----------------+------+----------+--------------+-----------------------+------------------------+-------------+
    | "192.168.8.101" | 9779 | "ONLINE" | 0            | "No valid partition"  | "No valid partition"   | "{{nebula.release}}" |
    | "192.168.8.100" | 9779 | "ONLINE" | 15           | "basketballplayer:15" | "basketballplayer:15"  | "{{nebula.release}}" |
    +-----------------+------+----------+--------------+-----------------------+------------------------+-------------+
    ```

2. Enter the graph space `basketballplayer`, and execute the command `SUBMIT JOB BALANCE DATA` to balance the distribution of storage partitions.

    ```ngql
    nebula> USE basketballplayer;
    nebula> SUBMIT JOB BALANCE DATA;
    +------------+
    | New Job Id |
    +------------+
    | 25         |
    +------------+
    ```

3. The job ID is returned after running `SUBMIT JOB BALANCE DATA`. Run `SHOW JOB <job_id>` to check the status of the job.

    ```ngql
    nebula> SHOW JOB 25;
    +------------------------+-------------------+------------+----------------------------+----------------------------+-------------+
    | Job Id(spaceId:partId) | Command(src->dst) | Status     | Start Time                 | Stop Time                  | State       |
    +------------------------+-------------------+------------+----------------------------+----------------------------+-------------+
    | 25                     | "DATA_BALANCE"    | "FINISHED" | 2023-01-17T06:24:35.000000 | 2023-01-17T06:24:35.000000 | "SUCCEEDED" |
    | "Total:0"              | "Succeeded:0"     | "Failed:0" | "In Progress:0"            | "Invalid:0"                | ""          |
    +------------------------+-------------------+------------+----------------------------+----------------------------+-------------+
    ```

4. When all the subtasks succeed, the load balancing process finishes. Run `SHOW HOSTS` again to make sure the partition distribution is balanced.

  !!! Note

        `SUBMIT JOB BALANCE DATA` does not balance the leader distribution. For more information, see [Balance leader distribution](#balance_leader_distribution).

  ```ngql
  nebula> SHOW HOSTS;
  +-----------------+------+----------+--------------+----------------------+------------------------+-------------+
  | Host            | Port | Status   | Leader count | Leader distribution  | Partition distribution | Version     |
  +-----------------+------+----------+--------------+----------------------+------------------------+-------------+
  | "192.168.8.101" | 9779 | "ONLINE" | 7            | "basketballplayer:7" | "basketballplayer:7"   | "{{nebula.release}}" |
  | "192.168.8.100" | 9779 | "ONLINE" | 8            | "basketballplayer:8" | "basketballplayer:8"   | "{{nebula.release}}" |
  +-----------------+------+----------+--------------+----------------------+------------------------+-------------+
  ```

If any subtask fails, run `RECOVER JOB <job_id>` to recover the failed jobs. If redoing load balancing does not solve the problem, ask for help in the [NebulaGraph community](https://github.com/vesoft-inc/nebula/discussions).


### Balance partitions with Zone enabled

For Zone-enabled clusters, you can balance the partitions within each Zone by adding the `IN ZONE` keywords to the `SUBMIT JOB BALANCE DATA` command. After you add a new storage host to the cluster, no partition is deployed on the new hosts. The following example adds a new storage host `192.168.8.158` and assigns the new host to `zone1` to show how to balance the partition distribution within the Zone `zone1`.

1. Run `SHOW HOSTS` to check the partition distribution.

  ```ngql
  nebula> SHOW HOSTS;
  +-----------------+------+----------+--------------+----------------------+------------------------+---------+-------------+
  | Host            | Port | Status   | Leader count | Leader distribution  | Partition distribution | Zone    | Version     |
  +-----------------+------+----------+--------------+----------------------+------------------------+---------+-------------+
  | "192.168.8.111" | 7779 | "ONLINE" | 5            | "my_space:5"         | "my_space:10"          | "zone1" | "{{nebula.release}}" |
  | "192.168.8.113" | 7779 | "ONLINE" | 5            | "my_space:5"         | "my_space:10"          | "zone3" | "{{nebula.release}}" |
  | "192.168.8.129" | 7779 | "ONLINE" | 0            | "No valid partition" | "my_space:10"          | "zone2" | "{{nebula.release}}" |
  | "192.168.8.158" | 7779 | "ONLINE" | 0            | "No valid partition" | "No valid partition"   | "zone1" | "{{nebula.release}}" |
  +-----------------+------+----------+--------------+----------------------+------------------------+---------+-------------+
  ```

2. Enter the graph space `my_zoned_space`, and execute the command `SUBMIT JOB BALANCE DATA IN ZONE` to balance the distribution of storage partitions within each Zone.

  ```ngql
  nebula> USE my_zoned_space;
  nebula> SUBMIT JOB BALANCE DATA IN ZONE;
  +------------+
  | New Job Id |
  +------------+
  | 2          |
  +------------+
  ```

3. The job ID is returned after running `SUBMIT JOB BALANCE DATA IN ZONE`. Run `SHOW JOB <job_id>` to check the status of the job.

  ```ngql
  nebula> SHOW JOB 2;
  +------------------------+------------------------------------------+-------------+----------------------------+----------------------------+-------------+
  | Job Id(spaceId:partId) | Command(src->dst)                        | Status      | Start Time                 | Stop Time                  | State       |
  +------------------------+------------------------------------------+-------------+----------------------------+----------------------------+-------------+
  | 2                      | "DATA_BALANCE"                           | "FINISHED"  | 2024-04-11T02:41:27.000000 | 2024-04-11T02:41:32.000000 | "SUCCEEDED" |
  | "2, 1:1"               | "192.168.8.111:7779->192.168.8.158:7779" | "SUCCEEDED" | 2024-04-11T02:41:27.000000 | 2024-04-11T02:41:27.000000 | "SUCCEEDED" |
  | "2, 1:2"               | "192.168.8.111:7779->192.168.8.158:7779" | "SUCCEEDED" | 2024-04-11T02:41:27.000000 | 2024-04-11T02:41:32.000000 | "SUCCEEDED" |
  | "2, 1:3"               | "192.168.8.111:7779->192.168.8.158:7779" | "SUCCEEDED" | 2024-04-11T02:41:27.000000 | 2024-04-11T02:41:27.000000 | "SUCCEEDED" |
  | "2, 1:4"               | "192.168.8.111:7779->192.168.8.158:7779" | "SUCCEEDED" | 2024-04-11T02:41:27.000000 | 2024-04-11T02:41:27.000000 | "SUCCEEDED" |
  | "2, 1:5"               | "192.168.8.111:7779->192.168.8.158:7779" | "SUCCEEDED" | 2024-04-11T02:41:27.000000 | 2024-04-11T02:41:32.000000 | "SUCCEEDED" |
  | "Total:5"              | "Succeeded:5"                            | "Failed:0"  | "In Progress:0"            | "Invalid:0"                | ""          |
  +------------------------+------------------------------------------+-------------+----------------------------+----------------------------+-------------+
  ```

The above result shows the process of balancing the partitions within the Zone `zone1`. When the job succeeds, the load balancing process finishes.

4. Run `SHOW HOSTS` again to make sure the partition distribution is balanced.

  ```ngql
  +-----------------+------+----------+--------------+----------------------+------------------------+---------+-------------+
  | Host            | Port | Status   | Leader count | Leader distribution  | Partition distribution | Zone    | Version     |
  +-----------------+------+----------+--------------+----------------------+------------------------+---------+-------------+
  | "192.168.8.111" | 7779 | "ONLINE" | 3            | "my_space:3"         | "my_space:5"           | "zone1" | "{{nebula.release}}" |
  | "192.168.8.113" | 7779 | "ONLINE" | 7            | "my_space:7"         | "my_space:10"          | "zone3" | "{{nebula.release}}" |
  | "192.168.8.129" | 7779 | "ONLINE" | 0            | "No valid partition" | "my_space:10"          | "zone2" | "{{nebula.release}}" |
  | "192.168.8.158" | 7779 | "ONLINE" | 0            | "No valid partition" | "my_space:5"           | "zone1" | "{{nebula.release}}" |
  +-----------------+------+----------+--------------+----------------------+------------------------+---------+-------------+
  ```

  From the result, you can see that the partition distribution is balanced on all the storage hosts within Zone `zone1`.


### Stop data balancing

To stop a balance job, run `STOP JOB <job_id>`.

* If no balance job is running, an error is returned.

* If a balance job is running, `Job stopped` is returned.

!!! note

    `STOP JOB <job_id>` does not stop the running subtasks but cancels all follow-up subtasks. The status of follow-up subtasks is set to `INVALID`. The status of ongoing subtasks is set to `SUCCEEDED` or `FAILED` based on the result. You can run the `SHOW JOB <job_id>` command to check the stopped job status.

Once all the subtasks are finished or stopped, you can run `RECOVER JOB <job_id>` again to balance the partitions again, the subtasks continue to be executed in the original state.

### Restore a balance job

To restore a balance job in the `FAILED` or `STOPPED` status, run `RECOVER JOB <job_id>`.

!!! note

    For a `STOPPED` `SUBMIT JOB BALANCE DATA` job, NebulaGraph detects whether the same type of `FAILED` jobs or `FINISHED` jobs have been created since the start time of the job. If so, the `STOPPED` job cannot be restored. For example, if chronologically there are STOPPED job1, FINISHED job2, and STOPPED Job3, only job3 can be restored, and job1 cannot.

### Migrate partitions

To migrate specified partitions and scale in the cluster, you can run `SUBMIT JOB BALANCE DATA REMOVE <ip:port> [,<ip>:<port> ...]`.

To migrate specified partitions for Zone-enabled clusters, you need to add the `IN ZONE` keywords. For example, `SUBMIT JOB BALANCE DATA IN ZONE REMOVE <ip:port> [,<ip>:<port> ...]`. For details, see [Manage Zones](../4.deployment-and-installation/5.zone.md).

For example, to migrate the partitions in server `192.168.8.100:9779`, the command is as following:

```ngql
nebula> SUBMIT JOB BALANCE DATA REMOVE 192.168.8.100:9779;
nebula> SHOW HOSTS;
+-----------------+------+----------+--------------+-----------------------+------------------------+-------------+
| Host            | Port | Status   | Leader count | Leader distribution   | Partition distribution | Version     |
+-----------------+------+----------+--------------+-----------------------+------------------------+-------------+
| "192.168.8.101" | 9779 | "ONLINE" | 15           | "basketballplayer:15" | "basketballplayer:15"  | "{{nebula.release}}" |
| "192.168.8.100" | 9779 | "ONLINE" | 0            | "No valid partition"  | "No valid partition"   | "{{nebula.release}}" |
+-----------------+------+----------+--------------+-----------------------+------------------------+-------------+
```

!!! note

    This command migrates partitions to other storage hosts but does not delete the current storage host from the cluster. To delete the Storage hosts from a cluster, see [Manage Storage hosts](../4.deployment-and-installation/manage-storage-host.md).

{{ ent.ent_end }}

## Balance leader distribution

To balance the raft leaders, run `SUBMIT JOB BALANCE LEADER`. It starts a job to balance the distribution of all the storage leaders in all graph spaces.

For example, to balance the leader distribution, run the following command.

```ngql
nebula> SUBMIT JOB BALANCE LEADER;
```

Run `SHOW HOSTS` to check the balance result.

```ngql
nebula> SHOW HOSTS;
+------------------+------+----------+--------------+-----------------------------------+------------------------+-------------+
| Host             | Port | Status   | Leader count | Leader distribution               | Partition distribution | Version     |
+------------------+------+----------+--------------+-----------------------------------+------------------------+-------------+
| "192.168.10.100" | 9779 | "ONLINE" | 4            | "basketballplayer:4"              | "basketballplayer:8"   | "{{nebula.release}}" |
| "192.168.10.101" | 9779 | "ONLINE" | 8            | "basketballplayer:3"              | "basketballplayer:8"   | "{{nebula.release}}" |
| "192.168.10.102" | 9779 | "ONLINE" | 3            | "basketballplayer:3"              | "basketballplayer:8"   | "{{nebula.release}}" |
| "192.168.10.103" | 9779 | "ONLINE" | 0            | "basketballplayer:2"              | "basketballplayer:7"   | "{{nebula.release}}" |
| "192.168.10.104" | 9779 | "ONLINE" | 0            | "basketballplayer:2"              | "basketballplayer:7"   | "{{nebula.release}}" |
| "192.168.10.105" | 9779 | "ONLINE" | 0            | "basketballplayer:2"              | "basketballplayer:7"   | "{{nebula.release}}" |
+------------------+------+----------+--------------+-----------------------------------+------------------------+-------------+
```

!!! caution

    In NebulaGraph {{ nebula.release }}, switching leaders will cause a large number of short-term request errors (Storage Error `E_RPC_FAILURE`). For solutions, see [FAQ](../20.appendix/0.FAQ.md).
