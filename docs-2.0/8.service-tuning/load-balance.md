# Storage load balance

You can use the `SUBMIT JOB BALANCE` statement to balance the distribution of partitions and Raft leaders, or clear some Storage servers for easy maintenance. For details, see [SUBMIT JOB BALANCE](../synchronization-and-migration/2.balance-syntax.md).

!!! danger

    The `BALANCE` commands migrate data and balance the distribution of partitions by creating and executing a set of subtasks. **DO NOT** stop any machine in the cluster or change its IP address until all the subtasks finish. Otherwise, the follow-up subtasks fail.

{{ ent.ent_begin }}
## Balance partition distribution

The `SUBMIT JOB BALANCE DATA` command starts a job to balance the distribution of storage partitions in the current graph space by creating and executing a set of subtasks.

!!! enterpriseonly

    Only available for the NebulaGraph Enterprise Edition.
    
!!! note

    - If the current graph space already has a `SUBMIT JOB BALANCE DATA` job in the `FAILED` status, you can restore the `FAILED` job, but cannot start a new `SUBMIT JOB BALANCE DATA` job. If the job continues to fail, manually stop it, and then you can start a new one.
    - The following example introduces the methods of balanced partition distribution for storage nodes with the Zone feature disabled. When the Zone feature is enabled, balanced partition distribution is performed across zones by specifying the `IN ZONE` clause. For details, see [Manage Zones](../4.deployment-and-installation/5.zone.md).



### Examples

After you add new storage hosts into the cluster, no partition is deployed on the new hosts.

1. Run `SHOW HOSTS` to check the partition distribution.

    ```ngql
    nebual> SHOW HOSTS;
    +-----------------+------+----------+--------------+-----------------------+------------------------+----------------------+
    | Host            | Port | Status   | Leader count | Leader distribution   | Partition distribution | Version              |
    +-----------------+------+----------+--------------+-----------------------+------------------------+----------------------+
    | "192.168.8.101" | 9779 | "ONLINE" | 0            | "No valid partition"  | "No valid partition"   | "{{nebula.release}}" |
    | "192.168.8.100" | 9779 | "ONLINE" | 15           | "basketballplayer:15" | "basketballplayer:15"  | "{{nebula.release}}" |
    +-----------------+------+----------+--------------+-----------------------+------------------------+----------------------+
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
  +-----------------+------+----------+--------------+----------------------+------------------------+----------------------+
  | Host            | Port | Status   | Leader count | Leader distribution  | Partition distribution | Version              |
  +-----------------+------+----------+--------------+----------------------+------------------------+----------------------+
  | "192.168.8.101" | 9779 | "ONLINE" | 7            | "basketballplayer:7" | "basketballplayer:7"   | "{{nebula.release}}" |
  | "192.168.8.100" | 9779 | "ONLINE" | 8            | "basketballplayer:8" | "basketballplayer:8"   | "{{nebula.release}}" |
  +-----------------+------+----------+--------------+----------------------+------------------------+----------------------+
  ```

If any subtask fails, run `RECOVER JOB <job_id>` to recover the failed jobs. If redoing load balancing does not solve the problem, ask for help in the [NebulaGraph community](https://github.com/vesoft-inc/nebula/discussions).

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

### Migrate partition

To migrate specified partitions and scale in the cluster, you can run `SUBMIT JOB BALANCE DATA REMOVE <ip:port> [,<ip>:<port> ...]`.

To migrate specified partitions for Zone-enabled clusters, you need to add the `IN ZONE` clause. For example, `SUBMIT JOB BALANCE DATA IN ZONE REMOVE <ip:port> [,<ip>:<port> ...]`. For details, see [Manage Zones](../4.deployment-and-installation/5.zone.md).

For example, to migrate the partitions in server `192.168.8.100:9779`, the command as following:

```ngql
nebula> SUBMIT JOB BALANCE DATA REMOVE 192.168.8.100:9779;
nebula> SHOW HOSTS;
+-----------------+------+----------+--------------+-----------------------+------------------------+----------------------+
| Host            | Port | Status   | Leader count | Leader distribution   | Partition distribution | Version              |
+-----------------+------+----------+--------------+-----------------------+------------------------+----------------------+
| "192.168.8.101" | 9779 | "ONLINE" | 15           | "basketballplayer:15" | "basketballplayer:15"  | "{{nebula.release}}" |
| "192.168.8.100" | 9779 | "ONLINE" | 0            | "No valid partition"  | "No valid partition"   | "{{nebula.release}}" |
+-----------------+------+----------+--------------+-----------------------+------------------------+----------------------+
```

!!! note

    This command migrates partitions to other storage hosts but does not delete the current storage host from the cluster. To delete the Storage hosts from a cluster, see [Manage Storage hosts](../4.deployment-and-installation/manage-storage-host.md).

{{ ent.ent_end }}


## Balance leader distribution

To balance the raft leaders, run `SUBMIT JOB BALANCE LEADER`. It will start a job to balance the distribution of all the storage leaders in all graph spaces.

### Example

```ngql
nebula> SUBMIT JOB BALANCE LEADER;
```

Run `SHOW HOSTS` to check the balance result.

```ngql
nebula> SHOW HOSTS;
+------------------+------+----------+--------------+-----------------------------------+------------------------+----------------------+
| Host             | Port | Status   | Leader count | Leader distribution               | Partition distribution | Version              |
+------------------+------+----------+--------------+-----------------------------------+------------------------+----------------------+
| "192.168.10.101" | 9779 | "ONLINE" | 8            | "basketballplayer:3"              | "basketballplayer:8"   | "{{nebula.release}}" |
| "192.168.10.102" | 9779 | "ONLINE" | 3            | "basketballplayer:3"              | "basketballplayer:8"   | "{{nebula.release}}" |
| "192.168.10.103" | 9779 | "ONLINE" | 0            | "basketballplayer:2"              | "basketballplayer:7"   | "{{nebula.release}}" |
| "192.168.10.104" | 9779 | "ONLINE" | 0            | "basketballplayer:2"              | "basketballplayer:7"   | "{{nebula.release}}" |
| "192.168.10.105" | 9779 | "ONLINE" | 0            | "basketballplayer:2"              | "basketballplayer:7"   | "{{nebula.release}}" |
+------------------+------+----------+--------------+-----------------------------------+------------------------+----------------------+
```

!!! caution

    During leader partition replica switching in NebulaGraph, the leader replicas will be temporarily prohibited from being written to until the switch is completed. If there are a large number of write requests during the switching period, it will result in a request error (Storage Error `E_RPC_FAILURE`). See [FAQ](../20.appendix/0.FAQ.md#how_to_resolve_the_error_storage_error_e_rpc_failure) for error handling methods.

    You can set the value of `raft_heartbeat_interval_secs` in the Storage configuration file to control the timeout period for leader replica switching. For more information on the configuration file, see [Storage configuration file](../5.configurations-and-logs/1.configurations/4.storage-config.md).
