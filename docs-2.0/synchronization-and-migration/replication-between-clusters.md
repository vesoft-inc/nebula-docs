# Synchronize between two clusters

NebulaGraph supports data synchronization from a primary cluster to a secondary cluster in almost real-time. It applies to scenarios such as disaster recovery and load balancing, and helps reduce the risk of data loss and enhance data security.

!!! enterpriseonly

    This feature applies to the Enterprise Edition only.

## Synchronization workflow

The synchronization works as follows:

![replication between clusters](https://docs-cdn.nebula-graph.com.cn/figures/replication-between-clusters.png)

1. The primary cluster sends any data written into it to the Meta listener or the Storage listener in the form of WALs or snapshots.
2. The listener sends the data to the drainer in the form of WALs.
3. The drainer sends the data to the partitions of the secondary cluster through the Meta client or the Storage client.

## Applicable Scenarios

- Remote disaster recovery: Data synchronization enables cross-data-center or cross-city disaster recovery.

- Data migration: The migration can be implemented by synchronizing data and then switching cluster roles, without stopping the service.

- Read/Write splitting: Enable only writing on the primary cluster and only reading on the secondary cluster to lower the system load, and improve stability and usability.

## Precautions

- Make sure that the primary and secondary clusters are deployed in the same NebulaGraph version. Otherwise, the synchronization will fail.
  
- The synchronization is based on graph spaces, i.e., from one graph space in the primary cluster to another in the secondary cluster.

- About the synchronization topology, NebulaGraph:

  - Supports synchronizing from one primary cluster to one secondary cluster, but not multiple primary clusters to one secondary cluster.

  - Supports chained synchronization but not synchronization from one primary cluster to multiple secondary clusters directly. An example of chained synchronization is from cluster A to cluster B, and then cluster B to cluster C.

- The synchronization is implemented asynchronously, but with low latency.

- The Meta listener listens to the Meta Service and the Storage listener listens to the Storage Service. Do not mix them up.

- One graph space can have one Meta listener and one to multiple Storage listeners. These listeners can work with one to multiple drainers:
  - One listener with one drainer.
  - Multiple listeners with one drainer.
  - Multiple listeners with multiple drainers.

- The machines where the listeners and drainers run must have enough disk space to store the WAL or snapshot files.

- If the target graph space in the secondary cluster has schema or data before the synchronization starts, conflicts or inconsistencies may happen during the synchronization. It is recommended to keep the target graph space empty.

- It is recommended to use the NebulaGraph `root` user with the God privileges to perform the cluster data synchronization. The required user roles for each synchronization command are different. For details, see the **Role permission requirements** section at the end of this topic.

- During the synchronization, do not perform data recovery (backup recovery and snapshot recovery) operations on the primary cluster at the same time. Otherwise, the synchronization will fail.


## Prerequisites

- Prepare at least two machines to deploy the primary and secondary clusters, the listeners, and the drainer.
  
  The listener and drainer can be deployed in a standalone way, or on the machines hosting the primary and secondary clusters. The latter way can increase the machine load and decrease the service performance.

## Test environment

The test environment for the operation example in this topic is as follows:

- The primary cluster runs on the machine with the IP address 192.168.10.101. The cluster has one nebula-graphd process, one nebula-metad process, and one nebula-storaged process.

- The secondary cluster runs on the machine with the IP address 192.168.10.102. The cluster has one nebula-graphd process, one nebula-metad process, and one nebula-storaged process.

  !!! note
        The primary and secondary clusters can have different cluster specifications, such as different numbers of machines, service processes, and data partitions.

- The processes for the Meta and Storage listeners run on the machine with the IP address 192.168.10.103.

- The process for the drainer runs on the machine with the IP address 192.168.10.104.

## Steps

### Step 1: Set up the clusters, listeners, and drainer

1. Install NebulaGraph on all the machines.

  For installation instructions, see [Install NebulaGraph](../4.deployment-and-installation/2.compile-and-install-nebula-graph/2.install-nebula-graph-by-rpm-or-deb.md).

2. Modify the configuration files on all the machines.

  !!! note
        For newly installed services, remove the suffix `.default` or `.production` of a configuration template file in the `conf` directory to make it take effect.

  - In the Meta service configuration file (`nebula-metad.conf`) of NebulaGraph, set the value of `license_manager_url` to the host IP and port number `9119` where the license management tool is located, e.g. `192.168.8.100:9119`.

  - On the primary and secondary cluster machines, modify `nebula-graphd.conf`, `nebula-metad.conf`, and `nebula-storaged.conf`. In all three files, set real IP addresses for `local_ip` instead of `127.0.0.1`, and set the IP addresses and ports for their own nebula-metad processes as the `meta_server_addrs` values. In `nebula-graphd.conf`, set `enable_authorize=true`.

  - On the primary cluster, set `--snapshot_send_files=false` in both the `nebula-storaged.conf` file and the `nebula-metad.conf` file. 

  - On the Meta listener machine, modify `nebula-metad-listener.conf`. Set the IP addresses and ports of the **primary cluster's** nebula-metad processes for `meta_server_addrs`, and those of the listener process for `meta_sync_listener`.

  - On the Storage listener machine, modify `nebula-storaged-listener.conf`. Set the IP addresses and ports of the **primary cluster's** nebula-metad processes for `meta_server_addrs`.

  - On the drainer machine, modify `nebula-drainerd.conf`. Set the IP addresses and ports of the **secondary cluster's** nebula-metad processes for `meta_server_addrs`.

  For more information about the configurations, see [Configurations](../5.configurations-and-logs/1.configurations/1.configurations.md).

3. Go to the NebulaGraph installation directories on the machines and start the needed services.

  - On the primary and secondary machines, run `sudo scripts/nebula.service start all`.

  - On the Meta listener machine, run `sudo bin/nebula-metad --flagfile etc/nebula-metad-listener.conf`.

  - On the Storage listener machine, run `sudo bin/nebula-storaged --flagfile etc/nebula-storaged-listener.conf`.

  - On the drainer machine, run `sudo scripts/nebula-drainerd.service start`.

4. Log into the primary cluster, add the Storage hosts, and check the status of the listeners.

  ```ngql
  # Add the Storage hosts first.
  nebula> ADD HOSTS 192.168.10.101:9779;
  nebula> SHOW HOSTS STORAGE;
  +------------------+------+----------+-----------+--------------+----------------------+
  | Host             | Port | Status   | Role      | Git Info Sha | Version              |
  +------------------+------+----------+-----------+--------------+----------------------+
  | "192.168.10.101" | 9779 | "ONLINE" | "STORAGE" | "xxxxxxx"    | "ent-3.1.0"          |
  +------------------+------+----------+-----------+--------------+----------------------+

  # Check the status of the Storage listener.
  nebula> SHOW HOSTS STORAGE LISTENER;
  +------------------+------+----------+--------------------+--------------+----------------------+
  | Host             | Port | Status   | Role               | Git Info Sha | Version              |
  +------------------+------+----------+--------------------+--------------+----------------------+
  | "192.168.10.103" | 9789 | "ONLINE" | "STORAGE_LISTENER" | "xxxxxxx"    | "ent-3.1.0"          |
  +------------------+------+----------+--------------------+--------------+----------------------+

  # Check the status of the Meta listener.
  nebula> SHOW HOSTS META LISTENER;
  +------------------+------+----------+-----------------+--------------+----------------------+
  | Host             | Port | Status   | Role            | Git Info Sha | Version              |
  +------------------+------+----------+-----------------+--------------+----------------------+
  | "192.168.10.103" | 9569 | "ONLINE" | "META_LISTENER" | "xxxxxxx"    |  "ent-3.1.0"         |
  +------------------+------+----------+-----------------+--------------+----------------------+
  ```

5. Log into the secondary cluster, add the Storage hosts, and check the status of the drainer.

  ```ngql
  nebula> ADD HOSTS 192.168.10.102:9779;
  nebula> SHOW HOSTS STORAGE;
  +------------------+------+----------+-----------+--------------+----------------------+
  | Host             | Port | Status   | Role      | Git Info Sha | Version              |
  +------------------+------+----------+-----------+--------------+----------------------+
  | "192.168.10.102" | 9779 | "ONLINE" | "STORAGE" | "xxxxxxx"    | "ent-3.1.0"          |
  +------------------+------+----------+-----------+--------------+----------------------+

  nebula> SHOW HOSTS DRAINER;
  +------------------+------+----------+-----------+--------------+----------------------+
  | Host             | Port | Status   | Role      | Git Info Sha | Version              |
  +------------------+------+----------+-----------+--------------+----------------------+
  | "192.168.10.104" | 9889 | "ONLINE" | "DRAINER" | "xxxxxxx"    | "ent-3.1.0"          |
  +------------------+------+----------+-----------+--------------+----------------------+
  ```

### Step 2: Set up the synchronization

1. Log into the primary cluster and create a graph space `basketballplayer`.

  ```
  nebula> CREATE SPACE basketballplayer(partition_num=15, \
          replica_factor=1, \
          vid_type=fixed_string(30));
  ```

2. Use the graph space `basketballplayer` and register the drainer service.

  ```ngql
  nebula> USE basketballplayer;

  # Register the drainer service.
  nebula> SIGN IN DRAINER SERVICE(192.168.10.104:9889);

  # Check if the drainer service is successfully signed in.
  nebula> SHOW DRAINER CLIENTS;
  +-----------+------------------+------+
  | Type      | Host             | Port |
  +-----------+------------------+------+
  | "DRAINER" | "192.168.10.104" | 9889 |
  +-----------+------------------+------+
  ```

  !!! note

        To register multiple drainer services, run the command such as `SIGN IN DRAINER SERVICE(192.168.8.x:9889),(192.168.8.x:9889)`.


1. Configure the listener service.

  ```ngql
  # replication_basketballplayer is the synchronization target. It will be created in the following steps.
  nebula> ADD LISTENER SYNC \
          META 192.168.10.103:9569 \
          STORAGE 192.168.10.103:9789 \
          TO SPACE replication_basketballplayer;
  
  # Check the listener status.
  nebula> SHOW LISTENER SYNC;
  +--------+--------+------------------------+--------------------------------+----------+
  | PartId | Type   | Host                   | SpaceName                      | Status   |
  +--------+--------+------------------------+--------------------------------+----------+
  | 0      | "SYNC" | ""192.168.10.103":9569" | "replication_basketballplayer" | "ONLINE" |
  | 1      | "SYNC" | ""192.168.10.103":9789" | "replication_basketballplayer" | "ONLINE" |
  | 2      | "SYNC" | ""192.168.10.103":9789" | "replication_basketballplayer" | "ONLINE" |
  | 3      | "SYNC" | ""192.168.10.103":9789" | "replication_basketballplayer" | "ONLINE" |
  | 4      | "SYNC" | ""192.168.10.103":9789" | "replication_basketballplayer" | "ONLINE" |
  | 5      | "SYNC" | ""192.168.10.103":9789" | "replication_basketballplayer" | "ONLINE" |
  | 6      | "SYNC" | ""192.168.10.103":9789" | "replication_basketballplayer" | "ONLINE" |
  | 7      | "SYNC" | ""192.168.10.103":9789" | "replication_basketballplayer" | "ONLINE" |
  | 8      | "SYNC" | ""192.168.10.103":9789" | "replication_basketballplayer" | "ONLINE" |
  | 9      | "SYNC" | ""192.168.10.103":9789" | "replication_basketballplayer" | "ONLINE" |
  | 10     | "SYNC" | ""192.168.10.103":9789" | "replication_basketballplayer" | "ONLINE" |
  | 11     | "SYNC" | ""192.168.10.103":9789" | "replication_basketballplayer" | "ONLINE" |
  | 12     | "SYNC" | ""192.168.10.103":9789" | "replication_basketballplayer" | "ONLINE" |
  | 13     | "SYNC" | ""192.168.10.103":9789" | "replication_basketballplayer" | "ONLINE" |
  | 14     | "SYNC" | ""192.168.10.103":9789" | "replication_basketballplayer" | "ONLINE" |
  | 15     | "SYNC" | ""192.168.10.103":9789" | "replication_basketballplayer" | "ONLINE" |
  +--------+--------+------------------------+--------------------------------+----------+
  ```


  !!! note

        To configure multiple storage listener services, run the command such as `ADD LISTENER SYNC META 192.168.10.xxx:9569 STORAGE 192.168.10.xxx:9789,192.168.10.xxx:9789 TO SPACE replication_basketballplayer`.

1. Log into the secondary cluster and create graph space `replication_basketballplayer`.

  ```ngql
  nebula> CREATE SPACE replication_basketballplayer(partition_num=15, \
          replica_factor=1, \
          vid_type=fixed_string(30));
  ```

5. Use `replication_basketballplayer` and configure the drainer service.

  ```ngql
  nebula> USE replication_basketballplayer;

  # Configure the drainer service.
  nebula> ADD DRAINER 192.168.10.104:9889;

  # Check the drainer status.
  nebula> SHOW DRAINERS;
  +-------------------------+----------+
  | Host                    | Status   |
  +-------------------------+----------+
  | ""192.168.10.104":9889" | "ONLINE" |
  +-------------------------+----------+
  ```

  !!! note

        To configure multiple drainer services, run the command such as `ADD DRAINER 192.168.8.x:9889,192.168.8.x:9889`.


1. Set the target graph space `replication_basketballplayer` as read-only to avoid data inconsistency.

  !!! note

        This step only sets the target graph space, not other graph spaces.

  ```ngql
  
  # Set the working graph space as read-only.
  nebula> SET VARIABLES read_only=true;

  # Check the read_only status of the working graph space.
  nebula> GET VARIABLES read_only;
  +-------------+--------+-------+
  | name        | type   | value |
  +-------------+--------+-------+
  | "read_only" | "bool" | true  |
  +-------------+--------+-------+
  ```

### Step 3: Validate the data

1. Log into the primary cluster, create the schema, and insert data.

  ```ngql
  nebula> USE basketballplayer;
  nebula> CREATE TAG player(name string, age int);
  nebula> CREATE EDGE follow(degree int);
  nebula> INSERT VERTEX player(name, age) VALUES "player100":("Tim Duncan", 42);
  nebula> INSERT VERTEX player(name, age) VALUES "player101":("Tony Parker", 36);
  nebula> INSERT EDGE follow(degree) VALUES "player101" -> "player100":(95);
  ```

2. Log into the secondary cluster and validate the data.

  ```ngql
  nebula> USE replication_basketballplayer;
  nebula> SUBMIT JOB STATS;
  nebula> SHOW STATS;
  +---------+------------+-------+
  | Type    | Name       | Count |
  +---------+------------+-------+
  | "Tag"   | "player"   | 2     |
  | "Edge"  | "follow"   | 1     |
  | "Space" | "vertices" | 2     |
  | "Space" | "edges"    | 1     |
  +---------+------------+-------+

  nebula> FETCH PROP ON player "player100" \
          YIELD properties(vertex);
  +-------------------------------+
  | properties(VERTEX)            |
  +-------------------------------+
  | {age: 42, name: "Tim Duncan"} |
  +-------------------------------+

  nebula> GO FROM "player101" OVER follow \
          YIELD dst(edge);
  +-------------+
  | dst(EDGE)   |
  +-------------+
  | "player100" |
  +-------------+
  ```

## Stop/Restart data synchronization

The listener continuously sends the WALs to the drainer during data synchronization.

To stop data synchronization, run the `STOP SYNC` command. The listener stops sending data to the drainer.

To restart data synchronization, run the `RESTART SYNC` command. The listener sends the data accumulated during the period when the synchronization is stopped to the drainer. If the WALs are lost, the listener pulls the snapshot from the primary cluster and synchronizes data again.

## View the status of inter-cluster data synchronization

When data is written to the primary cluster, you can check the status of inter-cluster data synchronization and tell whether data synchronization is normal.

### Check the status of synchronized data in the primary cluster

You can execute the `SHOW SYNC STATUS` command in the primary cluster to view the status of the data sent from the primary cluster to the secondary cluster. `SHOW SYNC STATUS` gets the information of data synchronization status between clusters in real-time, and sends synchronized data to the secondary cluster only when the primary cluster has written successfully.

Examples are as follows.

```ngql
// Write data to the primary cluster.
nebula> INSERT VERTEX player(name,age) VALUES "player102":("LaMarcus Aldridge", 33);
nebula> INSERT VERTEX player(name,age) VALUES "player102":("LaMarcus Aldridge", 33);
nebula> INSERT VERTEX player(name,age) VALUES "player103":("Rudy Gay", 32);
nebula> INSERT VERTEX player(name,age) VALUES "player104":("Marco Belinelli", 32);

// Check the status of data synchronization in the current cluster (the returned result indicates that data is being sent to the secondary cluster).
nebula> SHOW SYNC STATUS;
+--------+-------------+-----------+--------------+
| PartId | Sync Status | LogId Lag | Time Latency |
+--------+-------------+-----------+--------------+
| 0      | "ONLINE"    | 0         | 0            |
| 1      | "ONLINE"    | 0         | 0            |
| 2      | "ONLINE"    | 0         | 0            |
| 3      | "ONLINE"    | 0         | 0            |
| 4      | "ONLINE"    | 0         | 0            |
| 5      | "ONLINE"    | 1         | 46242122     |
| 6      | "ONLINE"    | 0         | 0            |
| 7      | "ONLINE"    | 0         | 0            |
| 8      | "ONLINE"    | 0         | 0            |
| 9      | "ONLINE"    | 0         | 0            |
| 10     | "ONLINE"    | 0         | 0            |
| 11     | "ONLINE"    | 0         | 0            |
| 12     | "ONLINE"    | 0         | 0            |
| 13     | "ONLINE"    | 0         | 0            |
| 14     | "ONLINE"    | 0         | 0            |
| 15     | "ONLINE"    | 0         | 0            |
+--------+-------------+-----------+--------------+

// Check the status of data synchronization in the current cluster again (the returned result indicates that the data is fully synchronized to the secondary cluster and there is no data to be synchronized).
nebula> SHOW SYNC STATUS;
+--------+-------------+-----------+--------------+
| PartId | Sync Status | LogId Lag | Time Latency |
+--------+-------------+-----------+--------------+
| 0      | "ONLINE"    | 0         | 0            |
| 1      | "ONLINE"    | 0         | 0            |
| 2      | "ONLINE"    | 0         | 0            |
| 3      | "ONLINE"    | 0         | 0            |
| 4      | "ONLINE"    | 0         | 0            |
| 5      | "ONLINE"    | 0         | 0            |
| 6      | "ONLINE"    | 0         | 0            |
| 7      | "ONLINE"    | 0         | 0            |
| 8      | "ONLINE"    | 0         | 0            |
| 9      | "ONLINE"    | 0         | 0            |
| 10     | "ONLINE"    | 0         | 0            |
| 11     | "ONLINE"    | 0         | 0            |
| 12     | "ONLINE"    | 0         | 0            |
| 13     | "ONLINE"    | 0         | 0            |
| 14     | "ONLINE"    | 0         | 0            |
| 15     | "ONLINE"    | 0         | 0            |
+--------+-------------+-----------+--------------+
```

After executing the `SHOW SYNC STATUS` command, the parameters in the returned result are described as follows.

| Parameter   | Description   |
|:---    |:---   |
| PartId | The partition ID in the specified graph space in the primary cluster. The Meta data to be synchronized by Meta listener is located in the partition `0`. The Storage data to be synchronized by Storage listener is located in other partitions. |
| Sync Status | Indicates the status of the listener service.<br>When the listener is `ONLINE`, it continuously sends data to the drainer service.<br>When the listener is `OFFLINE`, it stops sending data to the drainer.|
| LogId Lag | Indicates the difference between Log IDs, that is how many logs are still sent to the secondary cluster from the corresponding partition of the primary cluster. <br>The value `0` indicates that there are no logs to be sent in the corresponding partition of the primary cluster. |
| Time Latency | The difference between the timestamp in the WAL of the last log to be sent and the timestamp in the WAL of the last log that has been sent in the corresponding partition of the primary cluster. <br>The value `0` indicates that data has been sent to the secondary cluster. <br> Unit: Millisecond.|

### Check the status of synchronized data in the secondary cluster

In the secondary cluster, run `SHOW DRAINER SYNC STATUS` to view the status of synchronizing data to the Meta and Storage services in the secondary cluster. 

```ngql
nebula> SHOW DRAINER SYNC STATUS;
+--------+-------------+-----------+--------------+
| PartId | Sync Status | LogId Lag | Time Latency |
+--------+-------------+-----------+--------------+
| 0      | "ONLINE"    | 0         | 0            |
| 1      | "ONLINE"    | 0         | 0            |
| 2      | "ONLINE"    | 0         | 0            |
| 3      | "ONLINE"    | 0         | 0            |
| 4      | "ONLINE"    | 0         | 0            |
| 5      | "ONLINE"    | 0         | 0            |
| 6      | "ONLINE"    | 0         | 0            |
| 7      | "ONLINE"    | 0         | 0            |
| 8      | "ONLINE"    | 0         | 0            |
| 9      | "ONLINE"    | 0         | 0            |
| 10     | "ONLINE"    | 0         | 0            |
| 11     | "ONLINE"    | 0         | 0            |
| 12     | "ONLINE"    | 0         | 0            |
| 13     | "ONLINE"    | 0         | 0            |
| 14     | "ONLINE"    | 0         | 0            |
| 15     | "ONLINE"    | 0         | 0            |
+--------+-------------+-----------+--------------+
```
After executing `SHOW DRAINER SYNC STATUS`, the parameters in the returned result are described as follows.

| Parameter   | Description   |
|:---    |:---   |
| PartId | The partition ID in the specified graph space in the primary cluster. The partition `0` is where the Meta data to be synchronized is located. The Storage data is located in other partitions.|
| Sync Status |  Indicates the status of the drainer service.<br>When drainer is `ONLINE`, it continuously sends WAL to `metaClient`/`storageClient` in the secondary cluster for data synchronization.<br>When drainer is `OFFLINE`, it stops sending WAL to `metaClient`/`storageClient` in the secondary cluster for data synchronization.|
| LogId Lag | Indicates the difference between Log IDs, that is how many logs are still sent to `metaClient`/`storageClient` from the corresponding drainer partition in the secondary cluster.<br>The value `0` indicates that there are no logs to be synchronized in the corresponding drainer partition.|
| Time Latency | The difference between the timestamp in the WAL of the newest log received by the corresponding drainer partition between the timestamp in the WAL of the last log that has been synchronized to `metaClient`/`storageClient` in the secondary cluster. <br>The value `0` indicates that drainer partition data has been sent to `metaClient`/`storageClient`. <br> Unit: Millisecond.|

## Switch between primary and secondary clusters

To migrate data or implement disaster recovery, manually switch between the primary and secondary clusters.

!!! note

    Before the switching, set up a listener for the new primary cluster, and a drainer for the new secondary cluster. In the following example, the listener has IP address 192.168.10.105 and drainer 192.168.10.106.


1. Log into the old primary cluster and set the working graph space as read-only to avoid data inconsistency.

  ```
  nebula> USE basketballplayer;
  nebula> SET VARIABLES read_only=true;
  ```

2. Check whether the data in the old primary cluster has been synchronized to the old secondary cluster. Make sure the data in the old primary cluster has been synchronized to the old secondary cluster.

  1. In the old primary cluster, view the status of the data sent from the old primary cluster to the old secondary cluster.

  ```
  nebula> SHOW SYNC STATUS;
  ```

  2. Log into the old secondary cluster and then view the status of synchronizing data to the Meta and Storage services.

  ```
  nebula> USE replication_basketballplayer;
  nebula> SHOW DRAINER SYNC STATUS;
  ```

  When the values of `LogId Lag` and `Time Latency` in the returned results in both old primary and secondary clusters are `0`, the data synchronization is complete.

3. In the old secondary cluster, disable read-only for the working graph space.

  ```
  nebula> SET VARIABLES read_only=false;
  ```

  !!! note

        If there is business data to be written, you can now write the business data to the old secondary cluster (the new primary cluster).

4. In the old secondary cluster, remove the old drainer service.

  ```
  nebula> REMOVE DRAINER;
  ```

5. Log into the old primary cluster, disable read-only, sign out the drainer, and remove the listener.

  ```
  nebula> USE basketballplayer;
  // Disable read-only for the working graph space, otherwise adding drainer fails.
  nebula> SET VARIABLES read_only=false;
  nebula> SIGN OUT DRAINER SERVICE;
  nebula> REMOVE LISTENER SYNC;
  ```

6. In the old primary cluster, change the old primary cluster to the new secondary cluster by adding the new drainer service and setting the working graph space as read-only. 

  !!! note

        Ensure that the new drainer service is deployed and started for the new secondary cluster.

  ```
  nebula> ADD DRAINER 192.168.10.106:9889;
  nebula> SET VARIABLES read_only=true;
  ```

7. Log into the old secondary cluster and change the old secondary cluster to the new primary cluster.

  !!! note

        Ensure that the new meta listener and storage listener services are deployed and started for the new primary cluster.

  ```
  nebula> SIGN IN DRAINER SERVICE(192.168.10.106:9889);
  nebula> ADD LISTENER SYNC META 192.168.10.105:9569 STORAGE 192.168.10.105:9789 TO SPACE basketballplayer;
  ```

  The primary-secondary cluster switch is now complete.

## Role permission requirements

The required user roles for each synchronization command are different. The required roles for each command are as follows (A check mark indicates that the role has the permission).


| Command                              | God  | Admin | DBA  | User | Guest |
| ------------------------------------ | ---- | ----- | ---- | ---- | ----- |
| `SIGN IN / SIGN OUT DRAINER SERVICE` | √    |       |      |      |       |
| `ADD / REMOVE LISTENER SYNC`         | √    | √     | √    |      |       |
| `SHOW DRAINER CLIENTS`               | √    | √     | √    | √    | √     |
| `SHOW LISTENER SYNC`                 | √    | √     | √    | √    | √     |
| `ADD / REMOVE DRAINER`               | √    | √     | √    |      |       |
| `SET VARIABLES read_only`            | √    |       |      |      |       |
| `SHOW DRAINERS`                      | √    | √     | √    | √    | √     |


## FAQ

### Can the pre-existent data in the primary cluster be synchronized to the secondary cluster?

Yes. After receiving the WAL from the listener, if the drainer finds that the data to be updated does not exist in the secondary cluster, it starts the synchronization of the complete data set.

### Will the pre-existent data in the secondary cluster affect the synchronization?

If the pre-existent data in the secondary cluster is a subset of the data in the primary cluster, the data in the primary and secondary clusters will eventually become consistent through synchronization. If there is any pre-existent data (not a subset of the data in the primary cluster) in the secondary cluster before the synchronization, the data may be lost after the synchronization. It is recommended to use a secondary cluster without data for synchronization.

### Will the pre-existent schema information in the secondary cluster affect the synchronization?

The pre-existent schema information must not conflict with the schema of the primary cluster. Otherwise, it will be overwritten, and related data in the secondary cluster might become invalid.

### Should the number of machines, replicas, and partitions in the primary and secondary clusters be the same?

No. The synchronization is based on graph spaces, not other elements such as partitions and replicas. The primary and secondary clusters do not need to have the exact specifications.

### Does altering the schema in the primary cluster affect the synchronization?

Altering the schema may increase the synchronization latency.

The schema data is synchronized through the Meta listener, while the vertex/edge data is through the Storage listener. When synchronizing the vertex/edge data, the system checks the schema version of the data. If the system finds that the version number of the schema is greater than that in the secondary cluster, it pauses the vertex/edge data update, and updates the schema data first.

### How to deal with synchronization failures?

Fix the problems in the cluster, and then the synchronization will be automatically restored.

- If problems have happened in the primary cluster, the synchronization continues when the problems are fixed and the primary cluster restarts.

- If problems have happened in the secondary cluster, listeners, or drainers, when the problems are fixed, the services that had the problems will receive the WALs accumulated from its upstream and the synchronization will continue working. If the faulty machine is replaced with a new one, all the data of the synchronization services on the faulty machine must be copied to the new machine. Otherwise, the synchronization of the complete data set will start automatically.

### How to check the data synchronization status and progress?

You can run `SHOW SYNC STATUS` to check the status of the data sent by the primary cluster and run `SHOW DRAINER SYNC STATUS` to check the status of the data received by the secondary cluster. If all the data is sent successfully from the primary cluster and all the data is received successfully by the secondary cluster, the data synchronization is completed.


### My WAL log files has expired and will it affect the cluster synchronization?

Expired WAL files (beyond the time set by `--wal-ttl`) will cause unsynchronization of cluster data. You can manually add `--snapshot_send_files=false` to the configuration files of the Meta and Storage services to synchronize data. After updating the configuration files, you need to restart the services. For more information about the configuration files, see [Configuration Files](../5.configurations-and-logs/1.configurations/1.configurations.md).
