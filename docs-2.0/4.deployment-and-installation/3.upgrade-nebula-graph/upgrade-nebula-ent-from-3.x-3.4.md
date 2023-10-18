# Upgrade NebulaGraph Enterprise Edition from version 3.x to {{nebula.release}}  

This topic takes the enterprise edition of NebulaGraph v3.1.0 as an example and describes how to upgrade to v{{nebula.release}}.

## Notes

- Rolling Upgrade is not supported. You must stop all the NebulaGraph services before the upgrade.

- There is no upgrade script. You have to manually upgrade each server in the cluster.
  
- The IP address of the machine performing the upgrade operation must be the same as the original machine.
- You must have the sudo privileges to complete the steps in this topic.
  
- The remaining disk space on the machine must be at least 1.5 times the size of the original data directory.

## Upgrade influences

<!-- - Data swelling
  
  The NebulaGraph 3.x version expands the original data format with one more key per vertex, so the data takes up more space after the upgrade.
  
  The format of the new key is:
  
  Type (1 byte) + Partition ID (3 bytes) + VID (size depends on the data type).
  
  The value of the new key is empty. The extra space taken can be calculated based on the number of vertices and the data type of the VID. For example, if there are 100 million vertices in the dataset and the VIDs are INT64, the new key will take 100 million x (1 + 3 + 8) = 1.2 billion bytes, i.e., about 1.2 GB. -->

- Client compatibility

  After the upgrade, you will not be able to connect to NebulaGraph from old clients. You will need to upgrade all clients to a version compatible with NebulaGraph {{nebula.release}}.

- Configuration changes

  A few configuration parameters have been changed. For more information, see the release notes and configuration docs.

- nGQL compatibility

  The nGQL syntax is partially incompatible:

  - Disable the `YIELD` clause to return custom variables.

  - The `YIELD` clause is required in the `FETCH`, `GO`, `LOOKUP`, `FIND PATH` and `GET SUBGRAPH` statements.

  - It is required to specify a tag to query properties of a vertex in a `MATCH` statement. For example, from `return v.name` to `return v.player.name`.

- Full-text indexes

  Before upgrading a NebulaGraph cluster with full-text indexes deployed, you must manually delete the full-text indexes in Elasticsearch, and then run the `SIGN IN` command to log into ES and recreate the indexes after the upgrade is complete. To manually delete the full-text indexes in Elasticsearch, you can use the curl command `curl -XDELETE -u <es_username>:<es_password> '<es_access_ip>:<port>/<fullindex_name>'`, for example, `curl -XDELETE -u elastic:elastic 'http://192.168.8.xxx:9200/nebula_index_2534'`. If no username and password are set for Elasticsearch, you can omit the `-u <es_username>:<es_password>` part.

  !!! note

        For upgrades from version 3.5.0 and later to {{nebula.release}}, there's no need to manually delete the full-text indexes.

## Upgrading to {{nebula.release}} from version 3.4.0 and above
<!-- Enterprise Edition {{nebula.name}} 3.4 introduces a change where each shard corresponds to a RocksDB instance, unlike versions before 3.4 where each graph space corresponds to a RocksDB instance. Therefore, data formats between Enterprise Edition 3.4.0 and earlier versions are not compatible, but they are compatible with versions after 3.4. -->

1. Stop all {{nebula.name}} services.

  ```
  <install_path>/scripts/nebula.service stop all
  ```

  Replace `install_path` with the installation directory of the {{nebula.name}} instance you want to upgrade.

  Allow approximately 1 minute for the `storaged` process to flush data. You can continue by running the `nebula.service status all` command to confirm that all services have stopped. For detailed instructions on starting and stopping services, refer to [Managing Services](../manage-service.md).

  !!! note

        If services cannot be stopped within 20 minutes, abandon the upgrade, and contact customer support.

  !!! caution

        Starting from version 3.0.0, {{nebula.name}} supports inserting points without tags. To retain points without tags, add the `--graph_use_vertex_key=true` flag to the configuration file (`nebula-graphd.conf`) of all Graph services within the cluster and add the `--use_vertex_key=true` flag to the configuration file (`nebula-storaged.conf`) of all Storage services.

2. Prepare the installation package for {{nebula.name}} {{nebula.release}} and extract it. You can specify any installation directory.

3. In the directory of {{nebula.release}}, use the new binary files from its `bin` directory to replace the old binary files in the `bin` directory of the {{nebula.name}} installation path.

  !!! note
        Update the binary files for each machine where {{nebula.name}} services are deployed.

<!-- This step can be ignored after version 3.0.0 as the default value for this field was changed in the configuration file after that.
3. Edit the configuration files for all Graph services, changing the following parameters to match the new version's value range. If the parameter value is already within the specified range, you can skip this step.
   
  - Set a value for the `session_idle_timeout_secs` parameter within the range of [1, 604800]. The recommended value is 28800.
  - Set a value for the `client_idle_timeout_secs` parameter within the range of [1, 604800]. The recommended value is 28800.

  The default values of these parameters in version 2.x are not within the value range of the new version. Failure to modify them will result in a failed upgrade. For detailed parameter descriptions, refer to [Graph Service Configuration](../../5.configurations-and-logs/1.configurations/3.graph-config.md). -->

4. In the `nebula-metad.conf` configuration file of NebulaGraph, add the `license_manager_url` parameter and set it to the LM's path.

  The LM is used to verify {{nebula.name}}'s licensing information. For details, see [LM Configuration](../../9.about-license/2.license-management-suite/3.license-manager.md).

  !!! note
        Starting from version 3.5.0, {{nebula.name}} enables license validation, so it's necessary to install and configure LM.

5. Start all Meta services.

  ```
  <nebula_install_path>/scripts/nebula-metad.service start
  ```

  After starting, the Meta services will elect a leader. This process takes a few seconds.

  Once started, you can start any Graph service node and connect to it using {{nebula.name}}. Run [`SHOW HOSTS meta`](../../3.ngql-guide/7.general-query-statements/6.show/6.show-hosts.md) and [`SHOW META LEADER`](../../3.ngql-guide/7.general-query-statements/6.show/19.show-meta-leader.md). If they return the status of the Meta node correctly, the Meta service has started successfully.

  !!! note

        If there are any exceptions during startup, abandon the upgrade, and contact customer support.

5. Start all Graph and Storage services.

  !!! note

        If there are any exceptions during startup, abandon the upgrade, and contact customer support.

6. Connect to the new version of {{nebula.name}} and verify that the service is operational and that the data is intact. For information on connecting to the service, refer to [Connecting to Nebula Graph](../connect-to-nebula-graph.md).

  Some reference commands to test the upgrade are as follows:

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

## Upgrade 3.x（x < 4）to {{nebula.release}}

1. [Contact us](https://www.nebula-graph.io/contact) to obtain the installation package of the enterprise edition of NebulaGraph v{{nebula.release}} and install it.
   
  !!! note

        The upgrade steps are the same for different installation packages. This article uses the RPM package and the installation directory `/usr/local/nebulagraph-ent-{{nebula.release}}` as an example. See [Install with RPM packages](../2.compile-and-install-nebula-graph/2.install-nebula-graph-by-rpm-or-deb.md) for specific operations.
   
  !!! caution

        Please ensure that the number of storage paths set for the `--data_path` parameter in the Meta and Storage service configuration files of the {{nebula.release}} cluster is the same as that for the `--data_path` parameter in the configuration files of the 3.x cluster. Otherwise, the upgraded cluster will not start.

2. Back up the data and the binary files in the subdirectory `bin` of the 3.x cluster.

  !!! note

        The backup is used for rollback in case of upgrade failure. The backup files are not used in the upgrade process.

3. Stop the enterprise edition of v3.x services. For details see [Manage NebulaGraph services](https://docs.nebula-graph.io/3.5.0-sc/4.deployment-and-installation/manage-service/).
  
  Run the `nebula.service status all` command to confirm that all services have been stopped after running the command.
   

4. In the subdirectory `etc` of the {{nebula.name}} v{{nebula.release}} installation directory, update the configuration files (if there have been any configuration updates previously).

  !!! note

        If there were no configuration updates previously, you can skip this step. 

5. In the `nebula-metad.conf` file of {{nebula.name}} v{{nebula.release}}, set `license_manager_url` to the URL of [LM](../../9.about-license/2.license-management-suite/3.license-manager.md).
   
  !!! note
        For the Enterprise Edition of NebulaGraph v3.5.0 or later, you need to install and configure LM to verify the license used to start NebulaGraph.

6. In the installation directory of the Enterprise Edition NebulaGraph v{{nebula.release}}, run the following commands to upgrade the Storage and Meta services. 

  - Upgrade the Storage service:

    Syntax:

    ```bash
    sudo ./bin/db_upgrader  --max_concurrent_parts=<num> --src_db_path=<source_storage_data_path> --dst_db_path=<destination_storage_data_path>
    ```

    | Parameter            | Description                         |
    | :-------------- | :--------------------------- |
    | `--max_concurrent_parts` | Specify the number of partitions to upgrade simultaneously, with the default value being 1.<br/>It is recommended to increase the value appropriately based on disk performance. |
    | `--src_db_path` | Specify the absolute path to the source data directory. The following takes the source data directory `/usr/local/nebula-ent-3.1.0/data/storage` as an example.  |
    | `--dst_db_path` | Specify the absolute path to the target data directory. The example target data directory is `/usr/local/nebula-ent-{{nebula.release}}/data/storage`.|

    Example:

    ```bash
    sudo ./bin/db_upgrader --max_concurrent_parts=20 --src_db_path=/usr/local/nebula-ent-3.1.0/data/storage --dst_db_path=/usr/local/nebula-ent-{{nebula.release}}/data/storage
    ```

    If there are multiple source data directories, specify each source data directory and target data directory and run the corresponding command. For example, there are two source data directories `/usr/local/nebula-ent-3.1.0/data/storage` and `/usr/local/nebula-ent-3.1.0/data2/storage`, run the following commands:

    ```bash
    sudo ./bin/db_upgrader --src_db_path=/usr/local/nebula-ent-3.1.0/data/storage --dst_db_path=/usr/local/nebula-ent-{{nebula.release}}/data/storage

    sudo ./bin/db_upgrader --src_db_path=/usr/local/nebula-ent-3.1.0/data2/storage --dst_db_path=/usr/local/nebula-ent-{{nebula.release}}/data2/storage
    ```

  - Upgrade the Meta service:

    Syntax:

    ```bash
    sudo ./bin/meta_upgrader --src_meta_path=<source_meta_data_path> --dst_meta_path=<destination_meta_data_path>
    ```

    | Parameter            | Description                         |
    | :-------------- | :--------------------------- |
    | `--src_meta_path` | Specify the absolute path to the source meta data directory. The following takes the source data directory `/usr/local/nebula-ent-3.1.0/data/meta` as an example. |
    | `--dst_meta_path` | Specify the absolute path to the target meta data directory. The example target data directory is `/usr/local/nebula-ent-{{nebula.release}}/data/meta`.|

    Example:

    ```bash
    sudo ./bin/meta_upgrader --src_meta_path=/usr/local/nebula-ent-3.1.0/data/meta --dst_meta_path=/usr/local/nebula-ent-{{nebula.release}}/data/meta
    ```

    If there are multiple source meta data directories, specify each source meta data directory and target meta data directory and run the corresponding command.

  After the upgrade, a `data` directory will be generated in the v{{nebula.release}} installation directory, containing the upgraded data files.


7. Start and connect to the NebulaGraph v{{nebula.release}} enterprise edition service and verify that the data is correct. The following commands can be used as reference:
   
  ```
  nebula> SHOW HOSTS;
  nebula> SHOW HOSTS storage;
  nebula> SHOW SPACES;
  nebula> USE <space_name>
  nebula> SHOW PARTS;
  nebula> SUBMIT JOB STATS;
  nebula> SHOW STATS;
  nebula> MATCH (v) RETURN v LIMIT 5;
  ```


## Upgrading from previous versions to {{nebula.release}}

If the your NebulaGraph database version is lower than 3.0.0, to upgrade to {{nebula.release}}, see the above section **Upgrade 3.x（x < 4）to {{nebula.release}}**.







  
