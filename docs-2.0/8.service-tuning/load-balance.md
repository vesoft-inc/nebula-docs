# Storage load balance

You can use the `BALANCE` statements to balance the distribution of partitions and Raft leaders, or remove redundant Storage servers.

## Balance partition distribution

`BALANCE DATA` starts a task to equally distribute the storage partitions in a Nebula Graph cluster. A group of subtasks will be created and implemented to migrate data and balance the partition distribution.

>**DON'T:** DON'T stop any machine in the cluster or change its IP address until all the subtasks finish. Otherwise, the follow-up subtasks fail.

Take scaling out Nebula Graph for an example.

After you add new storage hosts into the cluster, no partition is deployed on the new hosts. You can run [`SHOW HOSTS`](../3.ngql-guide/7.general-query-statements/6.show/6.show-hosts.md) to check the partition distribution.

```ngql
nebual> SHOW HOSTS;
+-------------+------+----------+--------------+----------------------+------------------------+
| Host        | Port | Status   | Leader count | Leader distribution  | Partition distribution |
+-------------+------+----------+--------------+----------------------+------------------------+
| "storaged0" | 9779 | "ONLINE" | 4            | "nba:4"              | "nba:15"               |
+-------------+------+----------+--------------+----------------------+------------------------+
| "storaged1" | 9779 | "ONLINE" | 8            | "nba:8"              | "nba:15"               |
+-------------+------+----------+--------------+----------------------+------------------------+
| "storaged2" | 9779 | "ONLINE" | 3            | "nba:3"              | "nba:15"               |
+-------------+------+----------+--------------+----------------------+------------------------+
| "storaged3" | 9779 | "ONLINE" | 0            | "No valid partition" | "No valid partition"   |
+-------------+------+----------+--------------+----------------------+------------------------+
| "storaged4" | 9779 | "ONLINE" | 0            | "No valid partition" | "No valid partition"   |
+-------------+------+----------+--------------+----------------------+------------------------+
| "Total"     |      |          | 15           | "nba:15"             | "nba:45"               |
+-------------+------+----------+--------------+----------------------+------------------------+
Got 6 rows (time spent 1002/1780 us)
```

Run `BALANCE DATA` to start balancing the storage partitions. If the partitions are already balanced, `BALANCE DATA` fails.

```ngql
nebula> BALANCE DATA;
+------------+
| ID         |
+------------+
| 1614237867 |
+------------+
Got 1 rows (time spent 3783/4533 us)
```

A BALANCE task ID is returned after running `BALANCE DATA`. Run `BALANCE DATA <balance_id>` to check the status of the `BALANCE` task.

```ngql
nebula> BALANCE DATA 1614237867;
+--------------------------------------------------------------+-------------------+
| balanceId, spaceId:partId, src->dst                          | status            |
+--------------------------------------------------------------+-------------------+
| "[1614237867, 11:1, storaged1:9779->storaged3:9779]"         | "SUCCEEDED"       |
+--------------------------------------------------------------+-------------------+
| "[1614237867, 11:1, storaged2:9779->storaged4:9779]"         | "SUCCEEDED"       |
+--------------------------------------------------------------+-------------------+
| "[1614237867, 11:2, storaged1:9779->storaged3:9779]"         | "SUCCEEDED"       |
+--------------------------------------------------------------+-------------------+
...
+--------------------------------------------------------------+-------------------+
| "Total:22, Succeeded:22, Failed:0, In Progress:0, Invalid:0" | 100               |
+--------------------------------------------------------------+-------------------+
Got 23 rows (time spent 916/1528 us)
```

When all the subtasks succeed, the load balancing process finishes. Run `SHOW HOSTS` again to make sure the partition distribution is balanced.

> **NOTE:** `BALANCE DATA` does not balance the leader distribution.

```ngql
nebula> SHOW HOSTS;
+-------------+------+----------+--------------+----------------------+------------------------+
| Host        | Port | Status   | Leader count | Leader distribution  | Partition distribution |
+-------------+------+----------+--------------+----------------------+------------------------+
| "storaged0" | 9779 | "ONLINE" | 4            | "nba:4"              | "nba:9"                |
+-------------+------+----------+--------------+----------------------+------------------------+
| "storaged1" | 9779 | "ONLINE" | 8            | "nba:8"              | "nba:9"                |
+-------------+------+----------+--------------+----------------------+------------------------+
| "storaged2" | 9779 | "ONLINE" | 3            | "nba:3"              | "nba:9"                |
+-------------+------+----------+--------------+----------------------+------------------------+
| "storaged3" | 9779 | "ONLINE" | 0            | "No valid partition" | "nba:9"                |
+-------------+------+----------+--------------+----------------------+------------------------+
| "storaged4" | 9779 | "ONLINE" | 0            | "No valid partition" | "nba:9"                |
+-------------+------+----------+--------------+----------------------+------------------------+
| "Total"     |      |          | 15           | "nba:15"             | "nba:45"               |
+-------------+------+----------+--------------+----------------------+------------------------+
Got 6 rows (time spent 849/1420 us)
```

If any subtask fails, run `BALANCE DATA` again to restart the balancing. If redoing load balancing does not solve the problem, ask for help in the [Nebula Graph community](https://discuss.nebula-graph.io/).

## Stop data balancing

To stop a balance task, run `BALANCE DATA STOP`.

* If no balance task is running, an error is returned.

* If a balance task is running, the task ID is returned.

`BALANCE DATA STOP` does not stop the running subtasks but cancels all follow-up subtasks. The running subtasks continue.

To check the status of the stopped balance task, run `BALANCE DATA <balance_id>`.

Once all the subtasks are finished or stopped, you can run `BALANCE DATA` again to balance the partitions again.

* If any subtask of the preceding balance task failed, Nebula Graph restarts the preceding balance task.

* If no subtask of the preceding balance task failed, Nebula Graph starts a new balance task.

## Remove storage servers

To remove specific storage servers and scale in the Storage Service, use the `BALANCE DATA REMOVE <host_list>` syntax.

For example, to remove the following storage servers:

|Server name|IP|Port|
|-|-|-|
|storage3|192.168.0.8|19779|
|storage4|192.168.0.9|19779|

Run the following statement:

```ngql
BALANCE DATA REMOVE 192.168.0.8:19779,192.168.0.9:19779;
```

Nebula Graph will start a balance task, migrate the storage partitions in storage3 and storage4, and then remove them from the cluster.

## Balance leader distribution

`BALANCE DATA` only balances the partition distribution. If the raft leader distribution is not balanced, some of the leaders may overload. To load balance the raft leaders, run `BALANCE LEADER`.

```ngql
nebula> BALANCE LEADER;
Execution succeeded (time spent 7576/8657 us)
```

Run `SHOW HOSTS` to check the balance result.

```ngql
nebula> SHOW HOSTS;
+-------------+------+----------+--------------+----------------------+------------------------+
| Host        | Port | Status   | Leader count | Leader distribution  | Partition distribution |
+-------------+------+----------+--------------+----------------------+------------------------+
| "storaged0" | 9779 | "ONLINE" | 3            | "nba:3"              | "nba:9"                |
+-------------+------+----------+--------------+----------------------+------------------------+
| "storaged1" | 9779 | "ONLINE" | 3            | "nba:3"              | "nba:9"                |
+-------------+------+----------+--------------+----------------------+------------------------+
| "storaged2" | 9779 | "ONLINE" | 3            | "nba:3"              | "nba:9"                |
+-------------+------+----------+--------------+----------------------+------------------------+
| "storaged3" | 9779 | "ONLINE" | 3            | "nba:3"              | "nba:9"                |
+-------------+------+----------+--------------+----------------------+------------------------+
| "storaged4" | 9779 | "ONLINE" | 3            | "nba:3"              | "nba:9"                |
+-------------+------+----------+--------------+----------------------+------------------------+
| "Total"     |      |          | 15           | "nba:15"             | "nba:45"               |
+-------------+------+----------+--------------+----------------------+------------------------+
```
