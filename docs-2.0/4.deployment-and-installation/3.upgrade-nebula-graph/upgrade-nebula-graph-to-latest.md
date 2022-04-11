# Upgrade Nebula Graph from version 2.x to {{nebula.release}}

This topic describes how to upgrade Nebula Graph from version 2.x to {{nebula.release}}, taking upgrading from version 2.6.1 to {{nebula.release}} as an example.

## Applicable source versions

This topic applies to upgrading Nebula Graph from 2.0.0 and later 2.x versions to {{nebula.release}}. It does not apply to historical versions earlier than 2.0.0, including the 1.x versions.

To upgrade Nebula Graph from historical versions to {{nebula.release}}:

1. Upgrade it to the latest 2.x version according to the docs of that version.
2. Follow this topic to upgrade it to {{nebula.release}}.

!!! caution

    To upgrade Nebula Graph from versions earlier than 2.0.0 (including the 1.x versions) to {{nebula.release}}, you need to find the `date_time_zonespec.csv` in the `share/resources` directory of {{nebula.release}} files, and then copy it to the same directory in the Nebula Graph installation path.

## Limitations

* Rolling Upgrade is not supported. You must stop all the Nebula Graph services before the upgrade.

* There is no upgrade script. You have to manually upgrade each server in the cluster.

* This topic does not apply to scenarios where Nebula Graph is deployed with Docker, including Docker Swarm, Docker Compose, and K8s.

* You must upgrade the old Nebula Graph services on the same machines they are deployed. **DO NOT** change the IP addresses, configuration files of the machines, and **DO NOT** change the cluster topology.

* The hard disk space left on each machine should be **two times** as much as the space taken by the original data directories. Half of the reserved space is for storing the manual backup of data. The other half is for storing the WALs that will be copied to the `dst_db_path` and the new keys supporting vertices with no tags.

* Known issues that could cause data loss are listed on [GitHub known issues](https://github.com/vesoft-inc/nebula-graph/issues/857). The issues are all related to altering schema or default values.

* **DO NOT** use soft links to switch the data directories.

* You must have the sudo privileges to complete the steps in this topic.

## Upgrade influences

- Data swelling
  
  The Nebula Graph 3.x version expands the original data format with one more key per vertex, so the data takes up more space after the upgrade.
  
  The format of the new key is:
  
  Type (1 byte) + Partition ID (3 bytes) + VID (size depends on the data type).
  
  The value of the new key is empty. The extra space taken can be calculated based on the number of vertices and the data type of the VID. For example, if there are 100 million vertices in the dataset and the VIDs are INT64, the new key will take 100 million x (1 + 3 + 8) = 1.2 billion bytes, i.e., about 1.2 GB.

- Client compatibility

  After the upgrade, you will not be able to connect to Nebula Graph from old clients. You will need to upgrade all clients to a version compatible with Nebula Graph {{nebula.release}}.

- Configuration changes

  A few configuration parameters have been changed. For more information, see the release notes and configuration docs.

- nGQL compatibility

  The nGQL syntax is partially incompatible:

  - Disable the `YIELD` clause to return custom variables.

  - The `YIELD` clause is required in the `FETCH`, `GO`, `LOOKUP`, `FIND PATH` and `GET SUBGRAPH` statements.

  - It is required to specify a tag to query properties of a vertex in a `MATCH` statement. For example, from `return v.name` to `return v.player.name`.

!!! caution

    There may be other undiscovered influences. Before the upgrade, we recommend that you read the release notes and user manual carefully, and keep an eye on the [posts](https://discuss.nebula-graph.io/) on the forum and [issues](https://github.com/vesoft-inc/nebula/issues) on Github.

## Preparations before the upgrade

- Download the TAR file of Nebula Graph {{nebula.release}} according to your operating system and system architecture. You need the binary files during the upgrade. Find the TAR file on [the download page](https://nebula-graph.io/download/).

  !!! note
        You can also get the new binaries from the source code or the RPM/DEB package.

- Locate the data files based on the value of the `data_path` parameters in the Storage and Meta configurations, and backup the data files. The default paths are `nebula/data/storage` and `nebula/data/meta`.

  !!! danger
        The old data will not be automatically backed up during the upgrade. You must manually back up the data to avoid data loss.

- Backup the configuration files.

- Collect the statistics of all graph spaces before the upgrade. After the upgrade, you can collect again and compare the results to make sure that no data is lost. To collect the statistics:

  1. Run `SUBMIT JOB STATS`.
  2. Run `SHOW JOBS` and record the result.

## Upgrade steps

1. Stop all Nebula Graph services.

  ```
  <nebula_install_path>/scripts/nebula.service stop all
  ```

  `nebula_install_path` indicates the installation path of Nebula Graph.

  The storaged progress needs around 1 minute to flush data. You can run `nebula.service status all` to check if all services are stopped. For more information about starting and stopping services, see [Manage services](../manage-service.md).

  !!! note

        If the services are not fully stopped in 20 minutes, stop upgrading and ask for help on [the forum](https://discuss.nebula-graph.io/) or [Github](https://github.com/vesoft-inc/nebula/issues).

2. In the target path where you unpacked the TAR file, use the binaries in the `bin` directory to replace the old binaries in the `bin` directory in the Nebula Graph installation path.

  !!! note
        Update the binary of the corresponding service on each Nebula Graph server.

3. Modify the following parameters in all Graph configuration files to accommodate the value range of the new version. If the parameter values are within the specified range, skip this step.

  - Set a value in [1,604800] for `session_idle_timeout_secs`. The recommended value is 28800.
  - Set a value in [1,604800] for `client_idle_timeout_secs`. The recommended value is 28800.

  The default values of these parameters in the 2.x versions are not within the range of the new version. If you do not change the default values, the upgrade will fail. For detailed parameter description, see [Graph Service Configuration](../../5.configurations-and-logs/1.configurations/3.graph-config.md).

4. Start all Meta services.

  ```
  <nebula_install_path>/scripts/nebula-metad.service start
  ```

  Once started, the Meta services take several seconds to elect a leader.

  To verify that Meta services are all started, you can start any Graph server, connect to it through Nebula Console, and run [`SHOW HOSTS meta`](../../3.ngql-guide/7.general-query-statements/6.show/6.show-hosts.md) and [`SHOW META LEADER`](../../3.ngql-guide/7.general-query-statements/6.show/19.show-meta-leader.md). If the status of Meta services are correctly returned, the services are successfully started.

  !!! note
        If the operation fails, stop the upgrade and ask for help on [the forum](https://discuss.nebula-graph.com.cn/) or [GitHub](https://github.com/vesoft-inc/nebula/issues).

5. Use the new db_upgrader file in the `bin` directory to upgrade the format of old data.

  !!! danger
        This step DOES NOT back up the Storage data. To avoid data loss, before executing this step, make sure that you have followed the **Preparations before the upgrade** section and backed up the Meta data and Storage data.

  Command syntax:

  ```
  <nebula_install_path>/bin/db_upgrader \
  --src_db_path=<old_storage_data_path> \
  --dst_db_path=<data_backup_path> \
  --upgrade_meta_server=<meta_server_ip>:<port>[, <meta_server_ip>:<port> ...] \
  --upgrade_version=2:3
  ```

  - `old_storage_data_path` indicates the path of the Storage data. It is defined by the `data_path` parameter in the Storage configuration files.
  - `data_backup_path` indicates a custom path for data backup. **This option does not work for the current version and the old data will not be backed up to any path.**
  - `meta_server_ip` and `port` indicate the IP address and port number of a Meta server.
  - `2:3` indicates that the upgrade is from version 2.x to 3.x.

  Example for the test in this topic:

  ```
  <nebula_install_path>/bin/db_upgrader \
  --src_db_path=/usr/local/nebula/data/storage \
  --dst_db_path=/home/vesoft/nebula/data-backup \
  --upgrade_meta_server=192.168.8.132:9559 \
  --upgrade_version=2:3
  ```

  !!! note
        If the operation fails, stop the upgrade and ask for help on [the forum](https://discuss.nebula-graph.com.cn/) or [GitHub](https://github.com/vesoft-inc/nebula/issues).

6. Start all the Graph and Storage services.

  !!! note
        If the operation fails, stop the upgrade and ask for help on [the forum](https://discuss.nebula-graph.com.cn/) or [GitHub](https://github.com/vesoft-inc/nebula/issues).

7. Connect to the new version of Nebula Graph to verify that services are available and data are complete. For how to connect, see [Connect to Nebula Graph](../connect-to-nebula-graph.md).

  Currently, there is no official way to check whether the upgrade is successful. You can run the following reference statements to test the upgrade:

  ```ngql
  nebula> SHOW HOSTS;
  nebula> SHOW HOSTS storage;
  nebula> SHOW SPACES;
  nebula> USE <space_name>
  nebula> SHOW PARTS;
  nebula> SUBMIT JOB STATS;
  nebula> SHOW STATS;
  nebula> MATCH (v) RETURN v LIMIT 5;
  ```

  You can also test against [new features]((../../20.appendix/releasenote.md)) in version {{nebula.release}}.

## Upgrade failure and rollback

If the upgrade fails, stop all Nebula Graph services of the new version, recover the old configuration files and binaries, and start the services of the old version.

All Nebula Graph clients in use must be switched to the old version.

## FAQ

### Can I write through the client during the upgrade?

A: No. You must stop all Nebula Graph services during the upgrade.

### How to upgrade if a machine has only the Graph Service, but not the Storage Service?

A: You only need to update the configuration files and binaries of the Graph Service.

### How to resolve the error `Permission denied`?

A: Try again with the sudo privileges.

### Is there any change in gflags?

A: Yes. For more information, see the release notes and configuration docs.

### Is there a tool or solution for verifying data consistency after the upgrade?

A: No. But if you only want to check the number of vertices and edges, run `SUBMIT JOB STATS` and `SHOW STATS` after the upgrade, and compare the result with the result that you recorded before the upgrade.

### How to solve the issue that Storage is `OFFLINE` and `Leader count` is `0`?

A: Run the following statement to add the Storage hosts into the cluster manually.

```ngql
ADD HOSTS <ip>:<port>[, <ip>:<port> ...];
```

For example:

```ngql
ADD HOSTS 192.168.10.100:9779, 192.168.10.101:9779, 192.168.10.102:9779;
```

If the issue persists, ask for help on [the forum](https://discuss.nebula-graph.com.cn/) or [GitHub](https://github.com/vesoft-inc/nebula/issues).

### Why the job type changed after the upgrade, but job ID remains the same?

A: `SHOW JOBS` depends on an internal ID to identify job types, but in Nebula Graph 2.5.0 the internal ID changed in [this pull request](https://github.com/vesoft-inc/nebula-common/pull/562/files), so this issue happens after upgrading from a version earlier than 2.5.0.
