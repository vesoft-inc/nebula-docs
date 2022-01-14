# Storage load balance

You can use the `BALANCE` statement to balance the distribution of partitions and Raft leaders, or remove redundant Storage servers.

## Balance partition distribution

`BALANCE DATA` starts a task to equally distribute the storage partitions in a Nebula Graph cluster. A group of subtasks will be created and implemented to migrate data and balance the partition distribution.

!!! danger

    DO NOT stop any machine in the cluster or change its IP address until all the subtasks finish. Otherwise, the follow-up subtasks fail.

### Examples

After you add new storage hosts into the cluster, no partition is deployed on the new hosts.

1. Run [`SHOW HOSTS`](../3.ngql-guide/7.general-query-statements/6.show/6.show-hosts.md) to check the partition distribution.

    ```ngql
    nebual> SHOW HOSTS;
    +-------------+------+----------+--------------+-----------------------------------+------------------------+
    | Host        | Port | Status   | Leader count | Leader distribution               | Partition distribution |
    +-------------+------+----------+--------------+-----------------------------------+------------------------+
    | "storaged0" | 9779 | "ONLINE" | 4            | "basketballplayer:4"              | "basketballplayer:15"  |
    | "storaged1" | 9779 | "ONLINE" | 8            | "basketballplayer:8"              | "basketballplayer:15"  |
    | "storaged2" | 9779 | "ONLINE" | 3            | "basketballplayer:3"              | "basketballplayer:15"  |
    | "storaged3" | 9779 | "ONLINE" | 0            | "No valid partition"              | "No valid partition"   |
    | "storaged4" | 9779 | "ONLINE" | 0            | "No valid partition"              | "No valid partition"   |
    | "Total"     |      |          | 15           | "basketballplayer:15"             | "basketballplayer:45"  |
    +-------------+------+----------+--------------+-----------------------------------+------------------------+
    ```

2. Run `BALANCE DATA` to start balancing the storage partitions. If the partitions are already balanced, `BALANCE DATA` fails.

    ```ngql
    nebula> BALANCE DATA;
    +------------+
    | ID         |
    +------------+
    | 1614237867 |
    +------------+
    ```

3. A BALANCE task ID is returned after running `BALANCE DATA`. Run `BALANCE DATA <balance_id>` to check the status of the `BALANCE` task.

    ```ngql
    nebula> BALANCE DATA 1614237867;
    +--------------------------------------------------------------+-------------------+
    | balanceId, spaceId:partId, src->dst                          | status            |
    +--------------------------------------------------------------+-------------------+
    | "[1614237867, 11:1, storaged1:9779->storaged3:9779]"         | "SUCCEEDED"       |
    | "[1614237867, 11:1, storaged2:9779->storaged4:9779]"         | "SUCCEEDED"       |
    | "[1614237867, 11:2, storaged1:9779->storaged3:9779]"         | "SUCCEEDED"       |
    ...
    | "Total:22, Succeeded:22, Failed:0, In Progress:0, Invalid:0" | 100               |
    +--------------------------------------------------------------+-------------------+
    ```

4. When all the subtasks succeed, the load balancing process finishes. Run `SHOW HOSTS` again to make sure the partition distribution is balanced.

  !!! Note

        `BALANCE DATA` does not balance the leader distribution. For more information, see [Balance leader distribution](#Balance leader distribution).

    ```ngql
    nebula> SHOW HOSTS;
    +-------------+------+----------+--------------+-----------------------------------+------------------------+
    | Host        | Port | Status   | Leader count | Leader distribution               | Partition distribution |
    +-------------+------+----------+--------------+-----------------------------------+------------------------+
    | "storaged0" | 9779 | "ONLINE" | 4            | "basketballplayer:4"              | "basketballplayer:9"   |
    | "storaged1" | 9779 | "ONLINE" | 8            | "basketballplayer:8"              | "basketballplayer:9"   |
    | "storaged2" | 9779 | "ONLINE" | 3            | "basketballplayer:3"              | "basketballplayer:9"   |
    | "storaged3" | 9779 | "ONLINE" | 0            | "No valid partition"              | "basketballplayer:9"   |
    | "storaged4" | 9779 | "ONLINE" | 0            | "No valid partition"              | "basketballplayer:9"   |
    | "Total"     |      |          | 15           | "basketballplayer:15"             | "basketballplayer:45"  |
    +-------------+------+----------+--------------+-----------------------------------+------------------------+
    ```

If any subtask fails, run `BALANCE DATA` again to restart the balancing. If redoing load balancing does not solve the problem, ask for help in the [Nebula Graph community](https://discuss.nebula-graph.io/).

## Stop data balancing

To stop a balance task, run `BALANCE DATA STOP`.

* If no balance task is running, an error is returned.

* If a balance task is running, the task ID (`balance_id`) is returned.

`BALANCE DATA STOP` does not stop the running subtasks but cancels all follow-up subtasks. To check the status of the stopped balance task, run `BALANCE DATA <balance_id>`.

Once all the subtasks are finished or stopped, you can run `BALANCE DATA` again to balance the partitions again.

* If any subtask of the preceding balance task fails, Nebula Graph restarts the preceding balance task.

* If no subtask of the preceding balance task fails, Nebula Graph starts a new balance task.

## RESET a balance task

If a balance task fails to be restarted after being stopped, run `BALANCE DATA RESET PLAN` to reset the task. After that, run `BALANCE DATA` again to start a new balance task.

## Remove storage servers

To remove specified storage servers and scale in the Storage Service, run `BALANCE DATA REMOVE <host_list>`.

### Example

To remove the following storage server,

|Server name|IP address|Port|
|:---|:---|:---|
|storage3|192.168.0.8|9779|
|storage4|192.168.0.9|9779|

Run the following command:

```ngql
BALANCE DATA REMOVE 192.168.0.8:9779,192.168.0.9:9779;
```

Nebula Graph will start a balance task, migrate the storage partitions in storage3 and storage4, and then remove them from the cluster.

!!! note

    The state of the removed server will change to `OFFLINE`. This record will be deleted after one day. To retain it, you can change the meta configuration `removed_threshold_sec`.

## Balance leader distribution

`BALANCE DATA` only balances the partition distribution. If the raft leader distribution is not balanced, some of the leaders may overload. To balance the raft leaders, run `BALANCE LEADER`.

### Example

```ngql
nebula> BALANCE LEADER;
```

Run `SHOW HOSTS` to check the balance result.

```ngql
nebula> SHOW HOSTS;
+-------------+------+----------+--------------+-----------------------------------+------------------------+
| Host        | Port | Status   | Leader count | Leader distribution               | Partition distribution |
+-------------+------+----------+--------------+-----------------------------------+------------------------+
| "storaged0" | 9779 | "ONLINE" | 3            | "basketballplayer:3"              | "basketballplayer:9"   |
| "storaged1" | 9779 | "ONLINE" | 3            | "basketballplayer:3"              | "basketballplayer:9"   |
| "storaged2" | 9779 | "ONLINE" | 3            | "basketballplayer:3"              | "basketballplayer:9"   |
| "storaged3" | 9779 | "ONLINE" | 3            | "basketballplayer:3"              | "basketballplayer:9"   |
| "storaged4" | 9779 | "ONLINE" | 3            | "basketballplayer:3"              | "basketballplayer:9"   |
| "Total"     |      |          | 15           | "basketballplayer:15"             | "basketballplayer:45"  |
+-------------+------+----------+--------------+-----------------------------------+------------------------+
```

!!! caution

    In Nebula Graph {{ nebula.release }}, switching leaders will cause a large number of short-term request errors (Storage Error `E_RPC_FAILURE`). For solutions, see [FAQ](../20.appendix/0.FAQ.md).
