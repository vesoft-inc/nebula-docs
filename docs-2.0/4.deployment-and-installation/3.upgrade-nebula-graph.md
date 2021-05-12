# Upgrade Nebula Graph to v2.0.0

This topic describes how to upgrade Nebula Graph to v2.0.0.

## Limitations

* Rolling Upgrade is not supported. You must stop the Nebula Graph services before the upgrade.

* There is no upgrade script. You have to manually upgrade each server in the cluster.

* Supported versions:
  * From Nebula Graph [v1.2.0](https://github.com/vesoft-inc/nebula/releases/tag/v1.2.0) to [Nebula Graph v2.0.0](https://github.com/vesoft-inc/nebula-graph/releases/tag/v2.0.0).
  * From Nebula Graph [v2.0.0-RC1](https://github.com/vesoft-inc/nebula-graph/releases/tag/v2.0.0-rc1) to Nebula Graph 2.0.0.

* This topic does not apply to scenarios where Nebula Graph is deployed with Docker, including Docker Swarm, Docker Compose, and Kubernetes.

* You must upgrade the old Nebula Graph services on the same machines they are deployed. **DO NOT** change the IP addresses, configuration files of the machines, and **DO NOT** change the cluster topology.

* The hard disk space of each machine should be three times as much as the space taken by the original data directories.

* Known issues that could cause data loss are listed on [GitHub known issues](https://github.com/vesoft-inc/nebula-graph/issues/857). The issues are all related to altering schema or default values.

* To connect to Nebula Graph 2.0.0, you must upgrade all the Nebula Graph clients. The communication protocols of the old versions and the latest versions are not compatible.

* The upgrade takes about 30 minutes in [this test environment](#appendix_1_test_environment).

* **DO NOT** use soft links to switch the data directories.

* You must have the sudo privileges to complete the steps in this topic.

## Installation paths

### Old installation path

By default, old versions of Nebula Graph are installed in `/usr/local/nebula/`, hereinafter referred to as `${nebula-old}`. The default configuration file path is `${nebula-old}/etc/`.

The data of the old Nebula Graph are stored by the Storage Service and the Meta Service. You can find the data paths as follows.

* Storage data path is defined by the `--data_path` option in the `${nebula-old}/etc/nebula-storaged.conf` file. The default path is `data/storage`.

* Meta data path is defined by the `--data_path` option in the `${nebula-old}/etc/nebula-metad.conf` file. The default path is `data/meta`.

!!! note

    The actual paths in your environment may be different from those described in this topic. You can run the Linux command `ps -ef | grep nebula` to locate them.

### New installation path

`${nebula-new}` represents the installation path of the new Nebula Graph version. An example for `${nebula-new}` is `/usr/local/nebula-new/`.

## Steps

1. Stop all client connections. You can run the following commands on each Graph server to turn off the Graph Service and avoid dirty write.

  ```bash
  > ${nebula-old}/scripts/nebula.service stop graphd
  [INFO] Stopping nebula-graphd...
  [INFO] Done
  ```

2. Run the following commands to stop all services of the old version Nebula Graph.

  ```bash
  > ${nebula-old}/scripts/nebula.service stop all
  [INFO] Stopping nebula-metad...
  [INFO] Done
  [INFO] Stopping nebula-graphd...
  [INFO] Done
  [INFO] Stopping nebula-storaged...
  [INFO] Done
  ```

  The Storage Service needs about 1 minute to flush data. Wait 1 minute and then run `ps -ef | grep nebula` to check and make sure that all the Nebula Graph services are stopped.

  !!! note

        If the services are not fully stopped in 20 minutes, stop upgrading and go to the [Nebula Graph community](https://discuss.nebula-graph.io/) for help.

3. Install the new version of Nebula Graph on each machine.

  * To install with RPM/DEB packages, run the following command. For detailed steps, see [Install Nebula Graph with RPM or DEB package](2.compile-and-install-nebula-graph/2.install-nebula-graph-by-rpm-or-deb.md).

    ```bash
    > sudo rpm --force -i --prefix=${nebula-new}  ${nebula-package-name.rpm} # for CentOS/RedHat
    > sudo dpkg -i --instdir==${nebula-new} ${nebula-package-name.deb} # for Ubuntu
    ```

  * To install with the source code, follow the substeps. For detailed steps, see [Install Nebula Graph by compiling the source code](2.compile-and-install-nebula-graph/1.install-nebula-graph-by-compiling-the-source-code.md)

      1. Clone the source code.

      ```bash
      > git clone --branch v2.0.0 https://github.com/vesoft-inc/nebula-graph.git
      ```

      2. Configure CMake.

      ```bash
      > cmake -DCMAKE_INSTALL_PREFIX=${nebula-new} -DENABLE_BUILD_STORAGE=on -DENABLE_TESTING=OFF -DCMAKE_BUILD_TYPE=Release -DNEBULA_COMMON_REPO_TAG=v2.0.0  -DNEBULA_STORAGE_REPO_TAG=v2.0.0 .. 
      ```

4. Copy the configuration files from the old path to the new path.

  ```bash
  > cp -rf ${nebula-old}/etc ${nebula-new}/
  ```

5. Follow the substeps to prepare the Meta servers (usually 3 of them in a cluster).

  !!! note

        You must make sure that this step is applied on every Meta server.

  1. Locate the old Meta [data path](#old-installation-path) and copy the data files to the new path.

    ```bash
    > mkdir -p ${nebula-new}/data/meta/
    > cp -r ${nebula-old}/data/meta/* ${nebula-new}/data/meta/
    ```

  2. Modify the new Meta configuration files:

    ```bash
    > vim ${nebula-new}/nebula-metad.conf
    ```

  [Optional] Add the following parameters in the Meta configuration files if you need them.

  * `--null_type=false`: Disables the support for using [`NULL`](../3.ngql-guide/3.data-types/5.null.md) as schema properties after the upgrade. The default value is `true`. When set to `false`, you must specify a [default value](../3.ngql-guide/10.tag-statements/1.create-tag.md) when altering tags or edge types, otherwise, data reading fails.
  * `--string_index_limit=32`: Specifies the index length for string values as 32. The default length is 64.

6. Prepare the Storage configuration files on each Storage server.

  * If the old Storage data path is not the default setting `--data_path=data/storage`, Modify the Storage configuration file and change the value of `--data_path` as the new data path.

    ```bash
    > vim ${nebula-new}/nebula-storaged.conf
    ```

  * Create the new Storage data directories.

    ```bash
    > mkdir -p ${nebula-new}/data/storage/
    ```

  !!! note

        If the `--data_path` default value has been modified, create the Storage data directories according to the modification.

7. Start the new Meta Service.

  1. Run the following command on each Meta server.

    ```bash
    $ sudo ${nebula-new}/scripts/nebula.service start metad
    [INFO] Starting nebula-metad...
    [INFO] Done
    ```

  2. Check if every nebula-metad process is started normally.

    ```bash
    $ ps -ef |grep nebula-metad
    ```

  3. Check if there is any error information in the Meta logs in `${nebula-new}/logs`. If any nebula-metad process cannot start normally, stop upgrading, start the Nebula Graph services from the old directories, and take the error logs to the [Nebula Graph community](https://discuss.nebula-graph.io/) for help.

8. Run the following commands to upgrade the Storage data format.

  ```bash
  $ sudo ${nebula-new}/bin/db_upgrader  \
  --src_db_path=<old_storage_directory_path> \
  --dst_db_path=<new_storage_directory_path>  \
  --upgrade_meta_server=<meta_server_ip1>:<port1>[,<meta_server_ip2>:<port2>,...] \
  --upgrade_version=<old_nebula_version> \
  ```

  The parameters are described as follows.

  * `--src_db_path`: Specifies the absolute path of the **OLD** Storage data directories. Separate multiple paths with commas, without spaces.

  * `--dst_db_path`: Specifies the absolute path of the **NEW** Storage data directories. Separate multiple paths with commas, without spaces. The paths must correspond to the paths set in `--src_db_path` one by one.

  !!! danger

        Don't mix up the preceding two parameters, otherwise, the old data will be damaged during the upgrade.

  * `--upgrade_meta_server`: Specifies the addresses of the new Meta servers that you started in step 7.

  * `--upgrade_version`: If the old Nebula Graph version is v1.2.0, set the parameter value to `1`. If the old version is v2.0.0-RC1, set the value to 2.

    !!! danger

        Don't set the value to other numbers.

  Example of upgrading from v1.2.0:

    ```bash
    $ sudo /usr/local/nebula_new/bin/db_upgrader \
    --src_db_path=/usr/local/nebula/data/storage/data1/,/usr/local/nebula/data/storage/data2/ \
    --dst_db_path=/usr/local/nebula_new/data/storage/data1/,/usr/local/nebula_new/data/storage/data2/\
    --upgrade_meta_server=192.168.8.14:45500,192.168.8.15:45500,192.168.8.16:45500 \
    --upgrade_version=1
    ```

  Example of upgrading from v2.0.0-RC1:

    ```bash
    $ sudo /usr/local/nebula_new/bin/db_upgrader \
    --src_db_path=/usr/local/nebula/data/storage/ \
    --dst_db_path=/usr/local/nebula_new/data/storage/ \
    --upgrade_meta_server=192.168.8.14:9559,192.168.8.15:9559,192.168.8.16:9559 \
    --upgrade_version=2
    ```

  !!! note

        Make sure that all the Storage servers have finished the upgrade. If anything goes wrong:

      1. Stop upgrading.
      2. Stop all the Meta servers.
      3. Start the Nebula Graph services from the old directories.
      4. Go to the [Nebula Graph community](https://discuss.nebula-graph.io/) for help.

9.  Start the new Storage Service on each Storage server.

  ```bash
  $ sudo ${nebula-new}/scripts/nebula.service start storaged
  $ sudo ${nebula-new}/scripts/nebula.service status storaged
  ```

  !!! note
        If this step goes wrong on any server:

      1. Stop upgrading.
      2. Stop all the Meta servers and Storage servers.
      3. Start the Nebula Graph services from the old directories.
      4. Take the logs in `${nebula-new}/logs/` to the [Nebula Graph community](https://discuss.nebula-graph.io/) for help.

10. Start the new Graph Service on each Graph server.

  ```bash
  $ sudo ${nebula-new}/scripts/nebula.service start graphd
  $ sudo ${nebula-new}/scripts/nebula.service status graphd
  ```

  !!! note

        If this step goes wrong on any server:

        1. Stop upgrading.
        2. Stop all the Meta servers, Storage servers, and Graph servers.
        3. Start the Nebula Graph services from the old directories.
        4. Take the logs in `${nebula-new}/logs/` to the [Nebula Graph community](https://discuss.nebula-graph.io/) for help.

11. Connect to Nebula Graph with the new version (v2.0.0 or later) of [Nebula Console](https://github.com/vesoft-inc/nebula-console). Verify if the Nebula Graph services are available and if the data can be accessed normally.

  The command for connection, including the IP address and port of the Graph Service, is the same as the old one.

  The following statements may help in this step.

  ```ngql
  nebula> SHOW HOSTS;
  nebula> SHOW SPACES;
  nebula> USE <space_name>
  nebula> SHOW PARTS;
  nebula> SUBMIT JOB STATS;
  nebula> SHOW STATS;
  ```

  !!! danger

        Don't use Nebula Console versions prior to v2.0.0.

12. Upgrade other Nebula Graph clients.

  You must upgrade all other clients to corresponding v2.0.0 versions. The clients include but are not limited to the following ones. Find the v2.0.0 branch for each client.

  * [studio](https://github.com/vesoft-inc/nebula-docker-compose)
  * [python](https://github.com/vesoft-inc/nebula-python)
  * [java](https://github.com/vesoft-inc/nebula-java)
  * [go](https://github.com/vesoft-inc/nebula-go)
  * [c++](https://github.com/vesoft-inc/nebula-cpp)
  * [flink-connector](https://github.com/vesoft-inc/nebula-flink-connector)
  * [spark-util](https://github.com/vesoft-inc/nebula-spark-utils)
  * [benchmark](https://github.com/vesoft-inc/nebula-bench)

  !!! note

      + Communication protocols of the v2.0.0 versions are not compatible with that of the historical versions. To upgrade the clients, you must compile the v2.0.0 source code of the clients or download corresponding binaries.

      + Tip for maintenance: The data path after the upgrade is `${nebula-new}/`. Modify relative paths for hard disk monitor systems or log ELK.

## Upgrade failure and rollback

If the upgrade fails, stop all Nebula Graph services of the new version, and start the services of the old version.

All Nebula Graph clients in use must be switched to the old version.

## Appendix 1: Test Environment

The test environment for this topic is as follows:

* Machine specifications: 32 CPU cores, 62 GB memory, and SSD.
* Data size: 100 GB of Nebula Graph 1.2.0 LDBC test data, with 1 graph space, 24 partitions, and 92 GB of data directory size.
* Concurrent configuration:

  |Parameter|Default value|Applied value in the Tests|
  |-|-|-|
  |--max_concurrent|5|5|
  |--max_concurrent_parts|10|24|
  |--write_batch_num|100|100|

The upgrade cost 21 minutes in all, including 21 minutes of compaction.

## Appendix 2: Nebula Graph V2.0.0 code address and commit ID

| Code address | Commit ID |
|:---|:---|
| [Graph Service](https://github.com/vesoft-inc/nebula-graph/releases/tag/v2.0.0) | 7923a45 |
| [Storage and Meta Services](https://github.com/vesoft-inc/nebula-storage/tree/v2.0.0) | 761f22b |
| [Common](https://github.com/vesoft-inc/nebula-common/tree/v2.0.0) | b2512aa |

## FAQ

### Can I write through the client during the upgrade?

A: No. The state of the data written during this process is undefined.

### Can I upgrade other old versions except for v1.2.0 or v2.0.0-RC1 to v2.0.0?

A: Upgrading from other old versions is not tested. Theoretically, versions between v1.0.0 and v1.2.0 could adopt the upgrade approach for v1.2.0. V2.x nightly versions cannot apply the solutions in this topic.

### How to upgrade clients after the server upgrade?

A: See step 12 in this topic.

### How to upgrade if a machine has only the Graph Service, but not the Storage Service?

A: Upgrade the Graph Service with the corresponding binary or rpm package.

### How to resolve the error `Permission denied`?

A: Try again with the sudo privileges.

### Is there any change in gflags?

A: Yes. For more information, see [known gflags changes](https://github.com/vesoft-inc/nebula-graph/issues/858).

### What are the differences between deleting data then installing the new version and upgrading according to this topic?

A: The default configurations for v2.x and v1.x are different, including the ports used. The upgrade solution keeps the old configurations, and the delete-and-install solution uses the new configurations.

### Is there a tool or solution for verifying data consistency after the upgrade?

A: No.
