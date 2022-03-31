# Synchronize between two clusters

Nebula Graph supports data synchronization from a primary to a secondary cluster in almost real-time. It applies to scenarios such as disaster recovery and load balancing, and helps reduce the risk of data loss and enhance data security.

!!! enterpriseonly

    This feature applies to the Enterprise Edition only.

## Synchronization workflow

The synchronization works as follows:

![replication between clusters](https://docs-cdn.nebula-graph.com.cn/figures/replication-between-clusters.png)

1. The primary cluster sends any data written into it to the Meta listener or the Storage listener.
2. The listener sends the data to the drainer.
3. The drainer sends the data to the partitions of the secondary cluster through the Meta client or the Storage client.

## Applicable Scenarios

- Remote disaster recovery: Data synchronization enables cross-room or cross-city disaster recovery.

- Data migration: The migration can be implemented by synchronizing data and then switching cluster roles, without stopping the service.

- Read/Write splitting: Enable only writing on the primary cluster and only reading on the secondary cluster to lower the system load, and improve stability and usability.

## Precautions

- The synchronization is based on graph spaces, i.e., from one graph space in the primary cluster to another in the secondary cluster.

- About the synchronization topology, Nebula Graph:

  - Supports synchronizing from one primary cluster to one secondary cluster, but not multiple primary clusters to one secondary cluster.

  - Supports chained synchronization but not synchronization from one primary cluster to multiple secondary clusters directly. An example of chained synchronization is from cluster A to cluster B, and then cluster B to cluster C.

- The synchronization is implemented asynchronously, but with low latency.

## Prerequisites

- Prepare at least two machines to deploy the primary and secondary clusters, the listeners, and the drainer.
  
  The listener and drainer can be deployed in a standalone way, or on the machines hosting the primary and secondary clusters. The latter way can increase the machine load and decrease the service performance.

- Prepare the license file for the Nebula Graph Enterprise Edition.

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

1. Install Nebula Graph on all the machines.

  For installing Nebula Graph, see the instructions in the [Compile and install Nebula directory](../4.deployment-and-installation/2.compile-and-install-nebula-graph/2.install-nebula-graph-by-rpm-or-deb.md).

2. Modify the configuration files on all the machines.

  !!! note
        For newly installed services, remove the suffix `.default` or `.production` of a configuration template file in the `conf` directory to make it take effect.

  - On the primary and secondary cluster machines, modify `nebula-graphd.conf`, `nebula-metad.conf`, and `nebula-storaged.conf`. In all three files, set real IP addresses for `local_ip` instead of `127.0.0.1`, and set the IP addresses and ports for their own nebula-metad processes as the `meta_server_addrs` values. In `nebula-graphd.conf`, set `enable_authorize=true`.

  - On the Meta listener machine, modify `nebula-metad-listener.conf`. Set the IP addresses and ports of the **primary cluster's** nebula-metad processes for `meta_server_addrs`, and those of the listener process for `meta_sync_listener`.

  - On the Storage listener machine, modify `nebula-storaged-listener.conf`. Set the IP addresses and ports of the **primary cluster's** nebula-metad processes for `meta_server_addrs`.

  - On the drainer machine, modify `nebula-drainerd.conf`. Set the IP addresses and ports of the **secondary cluster's** nebula-metad processes for `meta_server_addrs`.

  For more information about the configurations, see [Configurations](../5.configurations-and-logs/1.configurations/1.configurations.md).

3. On the machines of the primary cluster, secondary cluster, and listeners, upload the license files into the `share/resources/` directories in the Nebula Graph installation directories.

4. Go to the Nebula Graph installation directories on the machines and start the needed services.

  - On the primary and secondary machines, run `sudo scripts/nebula.service start all`.

  - On the Meta listener machine, run `sudo bin/nebula-metad --flagfile etc/nebula-metad-listener.conf`.

  - On the Storage listener machine, run `sudo bin/nebula-storaged --flagfile etc/nebula-storaged-listener.conf`.

  - On the drainer machine, run `sudo scripts/nebula-drainerd.service start`.

5. Log into the primary cluster, add the Storage hosts, and check the status of the listeners.

  ```bash
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
  | "192.168.10.103" | 9559 | "ONLINE" | "META_LISTENER" | "xxxxxxx"    |  "ent-3.1.0"         |
  +------------------+------+----------+-----------------+--------------+----------------------+
  ```

6. Log into the secondary cluster, add the Storage hosts, and check the status of the drainer.

  ```bash
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

  ```bash
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

3. Configure the listener service.

  ```bash
  # replication_basketballplayer is the synchronization target. It will be created in the following steps.
  nebula> ADD LISTENER SYNC \
          META 192.168.10.103:9559 \
          STORAGE 192.168.10.103:9789 \
          TO SPACE replication_basketballplayer;
  
  # Check the listener status.
  nebula> SHOW LISTENER SYNC;
  +--------+--------+------------------------+--------------------------------+----------+
  | PartId | Type   | Host                   | SpaceName                      | Status   |
  +--------+--------+------------------------+--------------------------------+----------+
  | 0      | "SYNC" | ""192.168.10.103":9559" | "replication_basketballplayer" | "ONLINE" |
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

4. Log into the secondary cluster and create graph space `replication_basketballplayer`.

  ```bash
  nebula> CREATE SPACE replication_basketballplayer(partition_num=15, \
          replica_factor=1, \
          vid_type=fixed_string(30));
  ```

5. Use `replication_basketballplayer` and configure the drainer service.

  ```bash
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

6. Set the target graph space as read-only to avoid data inconsistency.

  !!! note

        This step only sets the target graph space, not other graph spaces.

  ```bash
  nebula> USE replication_basketballplayer;
  
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

  ```bash
  nebula> USE basketballplayer;
  nebula> CREATE TAG player(name string, age int);
  nebula> CREATE EDGE follow(degree int);
  nebula> INSERT VERTEX player(name, age) VALUES "player100":("Tim Duncan", 42);
  nebula> INSERT VERTEX player(name, age) VALUES "player101":("Tony Parker", 36);
  nebula> INSERT EDGE follow(degree) VALUES "player101" -> "player100":(95);
  ```

2. Log into the secondary cluster and validate the data.

  ```bash
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

## Switch between primary and secondary clusters

To migrate data or implement disaster recovery, manually switch between the primary and secondary clusters.

!!! note

  Before the switching, set up a listener for the new primary cluster, and a drainer for the new secondary cluster. In the following example, the listener has IP address 192.168.10.105 and drainer 192.168.10.106.

1. Log into the primary cluster and remove the old drainer and listener.

  ```bash
  nebula> USE basketballplayer;
  nebula> SIGN OUT DRAINER SERVICE;
  nebula> REMOVE LISTENER SYNC;
  ```

2. Set the working graph space as read-only to avoid data inconsistency.

  ```bash
  nebula> SET VARIABLES read_only=true;
  ```

3. Log into the secondary cluster, disable read-only, and remove the old drainer.

  ```bash
  nebula> USE replication_basketballplayer;
  nebula> SET VARIABLES read_only=false;
  nebula> REMOVE DRAINER;
  ```

4. Change the secondary cluster to the new primary cluster.

  ```bash
  nebula> SIGN IN DRAINER SERVICE(192.168.10.106:9889);
  nebula> ADD LISTENER SYNC META 192.168.10.105:9559 STORAGE 192.168.10.105:9789 TO SPACE basketballplayer;
  nebula> REMOVE DRAINER;
  ```

5. Log into the old primary cluster and change it to the new secondary cluster.

  ```bash
  nebula> USE basketballplayer;
  # Disable read-only for the working graph space, otherwise adding drainer fails.
  nebula> SET VARIABLES read_only=false;
  nebula> ADD DRAINER 192.168.10.106:9889;
  nebula> SET VARIABLES read_only=true;
  ```

## FAQ

### Can the pre-existent data in the primary cluster be synchronized to the secondary cluster?

Yes. After receiving the WAL from the listener, if the drainer finds that the data to be updated does not exist in the secondary cluster, it starts the synchronization of the complete data set.

### Will the pre-existent data in the secondary cluster affect the synchronization?

If the pre-existent data in the secondary cluster is a subset of the data in the primary cluster, the data in the primary and secondary clusters will eventually become consistent through synchronization.

The pre-existent data that is not in the primary cluster will stay in the secondary cluster until manually deleted.

### Will the pre-existent schema information in the secondary cluster affect the synchronization?

The pre-existent schema information must not conflict with the schema of the primary cluster. Otherwise, it will be overwritten, and related data in the secondary cluster might become invalid.

### Should the number of machines, replicas, and partitions in the primary and secondary clusters be the same?

No. The synchronization is based on graph spaces, not other elements such as partitions and replicas. The primary and secondary clusters do not need to have the exact specifications.

### Does altering the schema in the primary cluster affect the synchronization?

Altering the schema may increase the synchronization latency.

The schema data is synchronized through the Meta listener, while the vertex/edge data is through the Storage listener. When synchronizing the vertex/edge data, the system checks the schema version of the data. If the system finds that the version number of the schema is greater than that in the secondary cluster, it pauses the vertex/edge data update, and updates the schema data first.

### How to check the data synchronization status and progress?

<!--show sync
Find the WALs that has just been synchronized, and that has most recently been generated, then:

- Compare their timestamps to see if the synchronization is working correctly.

- Compare the log ID to view the synchronization gap.
-->

There is no tool specially designed to do this for now.
