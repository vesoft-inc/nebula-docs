# Load balance

(WIP)

## Balance partition distribution

`BALANCE DATA` starts a task to equally distribute the storage partitions in a Nebula Graph cluster. A group of subtasks will be created and implemented.

>**DON'T:** DON'T stop any machine in the cluster or change its IP address until all the subtasks finish. Otherwise the follow-up subtasks fail.

```ngql
// Check the hosts status before load balancing.
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

// Start load balancing.
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
// Check the task status.
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

When all the subtasks succeeds, the load balancing process finishes.

> **NOTE:** `BALANCE DATA` does not balance the leader distribution.

```ngql
// Check the hosts status after load balancing.
nebula> SHOW HOSTS;
+-------------+------+----------+--------------+----------------------+------------------------+
| Host        | Port | Status   | Leader count | Leader distribution  | Partition distribution |
+-------------+------+----------+--------------+----------------------+------------------------+
| "storaged0" | 9779 | "ONLINE" | 3            | "nba:3"              | "nba:9"                |
+-------------+------+----------+--------------+----------------------+------------------------+
| "storaged1" | 9779 | "ONLINE" | 6            | "nba:6"              | "nba:9"                |
+-------------+------+----------+--------------+----------------------+------------------------+
| "storaged2" | 9779 | "ONLINE" | 3            | "nba:3"              | "nba:9"                |
+-------------+------+----------+--------------+----------------------+------------------------+
| "storaged3" | 9779 | "ONLINE" | 0            | "No valid partition" | "nba:9"                |
+-------------+------+----------+--------------+----------------------+------------------------+
| "storaged4" | 9779 | "ONLINE" | 3            | "nba:3"              | "nba:9"                |
+-------------+------+----------+--------------+----------------------+------------------------+
| "Total"     |      |          | 15           | "nba:15"             | "nba:45"               |
+-------------+------+----------+--------------+----------------------+------------------------+
Got 6 rows (time spent 849/1420 us)
```

If any subtask fails, run `BALANCE DATA` again to restart the balancing. If redoing load balancing does not solve the problem, ask for help in the [Nebula Graph community](https://discuss.nebula-graph.io/).

## Stop data balancing






## Balance leader distribution

