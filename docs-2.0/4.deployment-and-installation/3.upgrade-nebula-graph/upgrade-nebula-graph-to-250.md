# Upgrade Nebula Graph to v{{nebula.release}}

The legacy versions of Nebula Graph refer to the versions lower than Nebula Graph v2.0.0-GA. This topic describes how to upgrade Nebula Graph to v{{nebula.release}}.

!!! note

     To upgrade Nebula Graph v2.0.0-GA or later versions to v{{nebula.release}}, see [Nebula Graph v2.0.x to v{{nebula.release}}](upgrade-nebula-from-200-to-250.md).

## Limitations

* Rolling Upgrade is not supported. You must stop the Nebula Graph services before the upgrade.

* There is no upgrade script. You have to manually upgrade each server in the cluster.

* This topic does not apply to scenarios where Nebula Graph is deployed with Docker, including Docker Swarm, Docker Compose, and K8s.

* You must upgrade the old Nebula Graph services on the same machines they are deployed. **DO NOT** change the IP addresses, configuration files of the machines, and **DO NOT** change the cluster topology.

* The hard disk space of each machine should be **three times** as much as the space taken by the original data directories.

* Known issues that could cause data loss are listed on [GitHub known issues](https://github.com/vesoft-inc/nebula-graph/issues/857). The issues are all related to altering schema or default values.

* To connect to Nebula Graph 2.0.0, you must upgrade all the Nebula Graph clients. The communication protocols of the old versions and the latest versions are not compatible.

* The upgrade takes about 30 minutes in [this test environment](#appendix_1_test_environment).

* **DO NOT** use soft links to switch the data directories.

* You must have the sudo privileges to complete the steps in this topic.

## Installation paths

### Old installation path

By default, old versions of Nebula Graph are installed in `/usr/local/nebula/`, hereinafter referred to as `${nebula-old}`. The default configuration file path is `${nebula-old}/etc/`.

* Storaged data path is defined by the `--data_path` option in the `${nebula-old}/etc/nebula-storaged.conf` file. The default path is `data/storage`.

* Metad data path is defined by the `--data_path` option in the `${nebula-old}/etc/nebula-metad.conf` file. The default path is `data/meta`.

!!! note

    The actual paths in your environment may be different from those described in this topic. You can run the Linux command `ps -ef | grep nebula` to locate them.

### New installation path

`${nebula-new}` represents the installation path of the new Nebula Graph version, such as `/usr/local/nebula-new/`.

```
# mkdir -p ${nebula-new}
```

## Upgrade steps

1. **Stop all client connections**. You can run the following commands on each Graph server to turn off the Graph Service and avoid dirty write.

   ```
   # ${nebula-old}/scripts/nebula.service stop graphd
   [INFO] Stopping nebula-graphd...
   [INFO] Done
   ```

2. Run the following commands to stop all services of the old version Nebula Graph.

   ```
   # ${nebula-old}/scripts/nebula.service stop all
   [INFO] Stopping nebula-metad...
   [INFO] Done
   [INFO] Stopping nebula-graphd...
   [INFO] Done
   [INFO] Stopping nebula-storaged...
   [INFO] Done
   ```

   The `storaged` process needs about 1 minute to flush data. Wait 1 minute and then run `ps -ef | grep nebula` to check and make sure that all the Nebula Graph services are stopped.

  !!! Note

        If the services are not fully stopped in 20 minutes, **stop upgrading** and go to the [Nebula Graph community](https://discuss.nebula-graph.io/) for help.

3. Install the new version of Nebula Graph on each machine.

   1. Install the new binary file.

    - To install with RPM/DEB packages, download the installation package of the corresponding operating system from [release page](https://github.com/vesoft-inc/nebula-graph/releases).

       ```
       # sudo rpm --force -i --prefix=${nebula-new}  ${nebula-package-name.rpm} # for centos/redhat
       # sudo dpkg -i --instdir==${nebula-new} ${nebula-package-name.deb} # for ubuntu
       ```

       For detailed steps, see [Install Nebula Graph with RPM or DEB package](../2.compile-and-install-nebula-graph/2.install-nebula-graph-by-rpm-or-deb.md).

    - To install with the source code, follow the substeps. For detailed steps, see [Install Nebula Graph by compiling the source code](../2.compile-and-install-nebula-graph/1.install-nebula-graph-by-compiling-the-source-code.md). Some key commands are as follows.

      - Clone the source code.
  
        ```
        # git clone --branch v{{nebula.release}} https://github.com/vesoft-inc/nebula-graph.git
        ```

      - Configure CMake.

        ```
        # cmake -DCMAKE_INSTALL_PREFIX=${nebula-new} -DENABLE_BUILD_STORAGE=on -DENABLE_TESTING=OFF -DCMAKE_BUILD_TYPE=Release -DNEBULA_COMMON_REPO_TAG=v{{nebula.release}}  -DNEBULA_STORAGE_REPO_TAG=v{{nebula.release}} .. 
        ```

   2. Copy the configuration files from the old path to the new path.

       ```
       # cp -rf ${nebula-old}/etc ${nebula-new}/
       ```

4. Follow the substeps to prepare the Meta servers (usually 3 of them in a cluster).

   - Locate the old Meta [data path](#old-installation-path) and copy the data files to the new path.

     Find the  `--data_path` option in `${nebula-old}/etc/nebula-metad.conf`. The default value is `data/meta`.

     - If the legacy versions **has not changed** the `--data_path` item, run the following command to copy the meta data to the new directory.

       ```
       # mkdir -p ${nebula-new}/data/meta/
       # cp -r ${nebula-old}/data/meta/* ${nebula-new}/data/meta/
       ```

     - If the legacy versions change the default metad directory, copy it according to the actual directory.

   - Modify the new Meta configuration files.

     - Edit the new metad configuration file.

       ```
       # vim ${nebula-new}/nebula-metad.conf
       ```

     - [Optional]Add the following parameters in the Meta configuration files if you need them.

       `--null_type=false`: Disables the support for using [`NULL`](../../3.ngql-guide/3.data-types/5.null.md).**The default value is `true`**. When set to `false`, you must specify a [default value](../../3.ngql-guide/10.tag-statements/1.create-tag.md) when altering tags or edge types, otherwise, data reading fails.

       `--string_index_limit=32`: Specifies the [index length](../../3.ngql-guide/14.native-index-statements/1.create-native-index.md) for string values as 32. The default length is 64.

    !!! Note

        You must make sure that this step is applied on every Meta server.

5. Prepare the Storage configuration files on each Storage server.

   + [Optional]If the old Storage data path is not the default setting `--data_path=data/storage`, modify it.

      ```
      # vim ${nebula-new}/nebula-storaged.conf
      ```
      Change the value of `--data_path` as the new data path.

   + Create the new Storage data directories.

      ```
      # mkdir -p ${nebula-new}/data/storage/
      ```

   If the `--data_path` default value has been modified, create the Storage data directories according to the modification.

6. Start the new Meta Service.

   - Run the following command on each Meta server.

      ```
      # ${nebula-new}/scripts/nebula.service start metad
      [INFO] Starting nebula-metad...
      [INFO] Done
      ```

   - Check if every nebula-metad process is started normally.

      ```
      # ps -ef |grep nebula-metad
      ```

   - Check if there is any error information in the Meta logs in `${nebula-new}/logs`.
  
  !!! Note

        If any nebula-metad process cannot start normally, **stop upgrading, start the Nebula Graph services from the old directories**, and take the error logs to the [Nebula Graph community](https://discuss.nebula-graph.io/) for help.

7. Run the following commands to upgrade the Storage data format.

   ```
   # ${nebula-new}/bin/db_upgrader  \
   --src_db_path=<old_storage_directory_path> \
   --dst_db_path=<new_storage_directory_path>  \
   --upgrade_meta_server=<meta_server_ip1>:<port1>[,<meta_server_ip2>:<port2>,...] \
   --upgrade_version=<old_nebula_version> \
   ```

   The parameters are described as follows.

   - `--src_db_path`: Specifies the absolute path of the **OLD** Storage data directories. Separate multiple paths with commas, without spaces.

   - `--dst_db_path`: Specifies the absolute path of the **NEW** Storage data directories. Separate multiple paths with commas, without spaces. The paths must correspond to the paths set in `--src_db_path` one by one.

   - `--upgrade_meta_server`: Specifies the addresses of the new Meta servers that you started in step 6.

   - `--upgrade_version`: If the old Nebula Graph version is v1.2.0, set the parameter value to `1`. If the old version is v2.0.0-RC1, set the value to `2`. Do not set the value to other numbers.

  !!! danger

        Do not mix up the order of `--src_db_path` and `--dst_db_path`. Otherwise, the old data will be damaged during the upgrade.

   For example, upgrade from v1.2.x:

   ```
   # /usr/local/nebula_new/bin/db_upgrader \
   --src_db_path=/usr/local/nebula/data/storage/data1/,/usr/local/nebula/data/storage/data2/ \
   --dst_db_path=/usr/local/nebula_new/data/storage/data1/,/usr/local/nebula_new/data/storage/data2/\
   --upgrade_meta_server=192.168.*.14:45500,192.168.*.15:45500,192.168.*.16:45500 \
   --upgrade_version=1
   ```

   For example, upgrade from v2.0.0-RC1:

   ```
   # /usr/local/nebula_new/bin/db_upgrader \
   --src_db_path=/usr/local/nebula/data/storage/ \
   --dst_db_path=/usr/local/nebula_new/data/storage/ \
   --upgrade_meta_server=192.168.*.14:9559,192.168.*.15:9559,192.168.*.16:9559 \
   --upgrade_version=2
   ```

  !!! Note
  
      - If anything goes wrong, **Stop upgrading, stop all the Meta servers, and start the Nebula Graph services from the old directories.**
      - Make sure that all the Storage servers have finished the upgrade. 

8.  Start the new Storage Service on each Storage server.

   ```
   # ${nebula-new}/scripts/nebula.service start storaged
   # ${nebula-new}/scripts/nebula.service status storaged
   ```

  !!! note
        If this step goes wrong on any server, Take the logs in `${nebula-new}/logs/` to the [Nebula Graph community](https://discuss.nebula-graph.io/) for help. **Stop upgrading. Stop all the Meta servers and Storage servers. Start the Nebula Graph services from the old directories.**

9.  Start the new Graph Service on each Graph server.

   ```
   # ${nebula-new}/scripts/nebula.service start graphd
   # ${nebula-new}/scripts/nebula.service status graphd
   ```

  !!! note

        If this step goes wrong on any server, take the logs in `${nebula-new}/logs/` to the [Nebula Graph community](https://discuss.nebula-graph.io/) for help. **Stop upgrading. Stop all the Meta servers, Storage servers, and Graph servers. Start the Nebula Graph services from the old directories.**

10.  Connect to Nebula Graph with the new versions of [Nebula Console](https://github.com/vesoft-inc/nebula-console). Verify if the Nebula Graph services are available and if the data can be accessed normally. Make sure that the command parameters, including the IP address and port of the Graph Service, are the same as the old one.

    ```ngql
    nebula> SHOW HOSTS;
    nebula> SHOW SPACES;
    nebula> USE <space_name>
    nebula> SHOW PARTS;
    nebula> SUBMIT JOB STATS;
    nebula> SHOW STATS;
    ```

  !!! Note

        The old releases of Nebula Console may have compatibility issues.

11. Upgrade other Nebula Graph clients.

    You must upgrade all other clients to corresponding Nebula Graph v{{nebula.release}}. The clients include but are not limited to [Python](https://github.com/vesoft-inc/nebula-python), [Java](https://github.com/vesoft-inc/nebula-java), [go](https://github.com/vesoft-inc/nebula-go), [C++](https://github.com/vesoft-inc/nebula-cpp), [Flink-connector](https://github.com/vesoft-inc/nebula-flink-connector), [Spark-util](https://github.com/vesoft-inc/nebula-spark-utils), and [Nebula Bench](https://github.com/vesoft-inc/nebula-bench). Find the v{{nebula.release}} branch for each client.

  !!! Note

        Communication protocols of v{{nebula.release}} are not compatible with that of the old releases. To upgrade the clients, compile the v{{nebula.release}} source code of the clients or download corresponding binaries.
        
        Tip for maintenance: The data path after the upgrade is `${nebula-new}/`. Modify relative paths for hard disk monitor systems, log, or ELK, etc.

## Upgrade failure and rollback

If the upgrade fails, stop all Nebula Graph services of the new version, and start the services of the old version.

All Nebula Graph clients in use must be switched to the **old version**.

## Appendix 1: Test Environment

The test environment for this topic is as follows:

* Machine specifications: 32 CPU cores, 62 GB memory, and SSD.

* Data size: 100 GB of Nebula Graph 1.2.0 LDBC test data, with 1 graph space, 24 partitions, and 92 GB of data directory size.

* Concurrent configuration: `--max_concurrent=5`, `--max_concurrent_parts=24`, and `--write_batch_num=100`.

The upgrade cost **21 minutes** in all, including 13 minutes of compaction. The descriptions are as follows.

|Parameter|Default value|
|:---|:---|
|`--max_concurrent`|5|
|`--max_concurrent_parts`|10|
|`--write_batch_num`|100|

## Appendix 2: Nebula Graph V2.0.0 code address and commit ID

| Code address | Commit ID |
|:---|:---|
| [graphd](https://github.com/vesoft-inc/nebula-graph/releases/tag/v2.0.0) | 91639db |
| [storaged and metad](https://github.com/vesoft-inc/nebula-storage/tree/v2.0.0) | 761f22b |
| [common](https://github.com/vesoft-inc/nebula-common/tree/v2.0.0) | b2512aa |

## FAQ

### Can I write through the client during the upgrade?

A: No. The state of the data written during this process is undefined.

### Can I upgrade other old versions except for v1.2.x and v2.0.0-RC to v{{nebula.release}}?

A: Upgrading from other old versions is not tested. Theoretically, versions between v1.0.0 and v1.2.0 could adopt the upgrade approach for v1.2.x. v2.0.0-RC nightly versions cannot apply the solutions in this topic.

### How to upgrade if a machine has only the Graph Service, but not the Storage Service?

A: Upgrade the Graph Service with the corresponding binary or rpm package.

### How to resolve the error `Permission denied`?

A: Try again with the sudo privileges.

### Is there any change in gflags?

A: Yes. For more information, see [github issues](https://github.com/vesoft-inc/nebula/issues/2501).

### What are the differences between deleting data then installing the new version and upgrading according to this topic?

A: The default configurations for v2.x and v1.x are different, including the ports used. The upgrade solution keeps the old configurations, and the delete-and-install solution uses the new configurations.

### Is there a tool or solution for verifying data consistency after the upgrade?

A: No.
