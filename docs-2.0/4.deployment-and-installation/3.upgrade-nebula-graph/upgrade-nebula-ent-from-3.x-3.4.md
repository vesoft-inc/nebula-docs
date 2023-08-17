# Upgrade NebulaGraph Enterprise Edition from version 3.x to {{nebula.release}}  

This topic takes the enterprise edition of NebulaGraph v3.1.0 as an example and describes how to upgrade to v{{nebula.release}}.

## Notes

- This upgrade is only applicable for upgrading the enterprise edition of NebulaGraph v3.x (x < 4) to v{{nebula.release}}. For upgrading from version 3.4.0 and above to {{nebula.release}}, you can directly replace the binary files for an upgrade. For more information, see [Upgrade NebulaGraph to {{nebula.release}}](https://docs.nebula-graph.com.cn/{{nebula.release}}/4.deployment-and-installation/3.upgrade-nebula-graph/upgrade-nebula-graph-to-latest/). <!--Because in the Enterprise Edition of NebulaGraph 3.4, one partition corresponds to one RocksDB instance, which is different from one graph space corresponding to one RocksDB instance in versions before 3.4.--> 

  !!! note

        If your version is below 3.0.0, please upgrade to enterprise edition 3.1.0 before upgrading to v{{nebula.release}}. For details, see [Upgrade NebulaGraph Enterprise Edition 2.x to 3.1.0](https://docs.nebula-graph.io/3.1.0/4.deployment-and-installation/3.upgrade-nebula-graph/upgrade-nebula-graph-to-latest/).

- The IP address of the machine performing the upgrade operation must be the same as the original machine.
  
- The remaining disk space on the machine must be at least 1.5 times the size of the original data directory.
  
- Before upgrading a NebulaGraph cluster with full-text indexes deployed, you must manually delete the full-text indexes in Elasticsearch, and then run the `SIGN IN` command to log into ES and recreate the indexes after the upgrade is complete.

  !!! note

        To manually delete the full-text indexes in Elasticsearch, you can use the curl command `curl -XDELETE -u <es_username>:<es_password> '<es_access_ip>:<port>/<fullindex_name>'`, for example, `curl -XDELETE -u elastic:elastic 'http://192.168.8.223:9200/nebula_index_2534'`. If no username and password are set for Elasticsearch, you can omit the `-u <es_username>:<es_password>` part.

## Steps

1. [Contact us](https://www.nebula-graph.io/contact) to obtain the installation package of the enterprise edition of NebulaGraph v{{nebula.release}} and install it.
   
  !!! note

        The upgrade steps are the same for different installation packages. This article uses the RPM package and the installation directory `/usr/local/nebulagraph-ent-{{nebula.release}}` as an example. See [Install with RPM packages](../2.compile-and-install-nebula-graph/2.install-nebula-graph-by-rpm-or-deb.md) for specific operations.
   
  !!! caution

        Please ensure that the number of storage paths set for the `--data_path` parameter in the Meta and Storage service configuration files of the {{nebula.release}} cluster is the same as that for the `--data_path` parameter in the configuration files of the 3.x cluster. Otherwise, the upgraded cluster will not start.

1. Stop the enterprise edition of v3.x services. For details see [Manage NebulaGraph services](https://docs.nebula-graph.io/3.5.0-sc/4.deployment-and-installation/manage-service/).
  
  Run the `nebula.service status all` command to confirm that all services have been stopped after running the command.
   
3. In the installation directory of the Enterprise Edition NebulaGraph v{{nebula.release}}, run the following commands to upgrade the Storage and Meta services. 

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

4. Start and connect to the NebulaGraph v{{nebula.release}} enterprise edition service and verify that the data is correct. The following commands can be used as reference:
   
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

## Docker Compose Deployment

!!! caution
    
    For NebulaGraph deployed using Docker Compose, it is recommended to redeploy the new version and import data.





  
