# NebulaGraph Importer

NebulaGraph Importer (Importer) is a standalone tool for importing data from CSV files into NebulaGraph. Importer can read and import CSV file data from multiple data sources.

## Features

- Support multiple data sources, including local, S3, OSS, HDFS, FTP, and SFTP.
- Support importing data from CSV format files. A single file can contain multiple tags, multiple edge types or a mix of both.
- Support connecting to multiple Graph services simultaneously for importing and dynamic load balancing.
- Support reconnect or retry after failure.
- Support displaying statistics in multiple dimensions, including import time, import percentage, etc. Support for printing statistics in Console or logs.

## Advantage

- Lightweight and fast: no complex environment can be used, fast data import.

- Flexible filtering: You can flexibly filter CSV data through configuration files.

## Release note

[Release](https://github.com/vesoft-inc/nebula-importer/releases/tag/{{importer.tag}})

## Prerequisites

Before using NebulaGraph Importer, make sure:

- NebulaGraph service has been deployed. There are currently three deployment modes:
  
  - [Deploy NebulaGraph with Docker Compose](../2.quick-start/1.quick-start-workflow.md)
  
  - [Install NebulaGraph with RPM or DEB package](../4.deployment-and-installation/2.compile-and-install-nebula-graph/2.install-nebula-graph-by-rpm-or-deb.md)
  
  - [Install NebulaGraph by compiling the source code](../4.deployment-and-installation/2.compile-and-install-nebula-graph/1.install-nebula-graph-by-compiling-the-source-code.md)

- Schema is created in NebulaGraph, including space, Tag and Edge type, or set by parameter `manager.hooks.before.statements`.

## Steps

Prepare the CSV file to be imported and configure the YAML file to use the tool to batch write data into NebulaGraph.

!!! note

    For details about the YAML configuration file, see [Configuration File Description](#configuration_file_description) at the end of topic.

### Download binary package and run

1. Download the executable [binary package](https://github.com/vesoft-inc/nebula-importer/releases/tag/{{importer.tag}}).

  !!! note

        The file installation path based on the RPM/DEB package is `/usr/bin/nebula-importer`. 

2. Under the directory where the binary file is located, run the following command to start importing data.

  ```bash
  ./<binary_file_name> --config <yaml_config_file_path>
  ```

### Source code compile and run

Compiling the source code requires deploying a Golang environment. For details, see [Build Go environment](https://github.com/vesoft-inc/nebula-importer/blob/{{importer.branch}}/docs/golang-install-en.md).

1. Clone repository.

  ```bash
  git clone -b {{importer.branch}} https://github.com/vesoft-inc/nebula-importer.git
  ```

  !!! note
  
        Use the correct branch. Different branches have different RPC protocols.

2. Access the directory `nebula-importer`.

  ```bash
  cd nebula-importer
  ```

3. Compile the source code.

  ```bash
  make build
  ```

4. Start the service.

  ```bash
  ./bin/nebula-importer --config <yaml_config_file_path>
  ```

### Run in Docker mode

Instead of installing the Go locale locally, you can use Docker to pull the [image](https://hub.docker.com/r/vesoft/nebula-importer) of the NebulaGraph Importer and mount the local configuration file and CSV data file into the container. The command is as follows:

```bash
docker pull vesoft/nebula-importer:<version>
docker run --rm -ti \
      --network=host \
      -v <config_file>:<config_file> \
      -v <data_dir>:<data_dir> \
      vesoft/nebula-importer:<version> \
      --config <config_file>
```

- `<config_file>`: The absolute path to the YAML configuration file.
- `<data_dir>`: The absolute path to the CSV data file. If the file is not local, ignore this parameter.
- `<version>`: NebulaGraph 3.x Please fill in 'v3'.

!!! note
    A relative path is recommended. If you use a local absolute path, check that the path maps to the path in the Docker.

Example:

```bash
docker pull vesoft/nebula-importer:v4
docker run --rm -ti \
      --network=host \
      -v /home/user/config.yaml:/home/user/config.yaml \
      -v /home/user/data:/home/user/data \
      vesoft/nebula-importer:v4 \
      --config /home/user/config.yaml
```

## Configuration File Description

Various example configuration files are available within the [Github](https://github.com/vesoft-inc/nebula-importer/tree/{{importer.branch}}/examples) of the NebulaGraph Importer. The configuration files are used to describe information about the files to be imported, {{nebula.name}} server information, etc. The following section describes the fields within the configuration file in categories.

!!! note

    If users download a binary package, create the configuration file manually.

### Client configuration

Client configuration stores the configuration associated with the client's connection to the {{nebula.name}}.

The example configuration is as follows:

```yaml
client:
  version: v3
  address: "192.168.1.100:9669,192.168.1.101:9669"
  user: root
  password: nebula
  concurrencyPerAddress: 10
  reconnectInitialInterval: 1s
  retry: 3
  retryInitialInterval: 1s
```

|Parameter|Default value|Required|Description|
|:---|:---|:---|:---|
|`client.version`|`v3`|Yes| Specifies the major version of the NebulaGraph. Currently only `v3` is supported.|
|`client.address`|`"127.0.0.1:9669"`|Yes| Specifies the address of the NebulaGraph. Multiple addresses are separated by commas.|
|`client.user`|`root`|No| NebulaGraph user name.|
|`client.password`|`nebula`|No| The password for the NebulaGraph user name.|
|`client.concurrencyPerAddress`|`10`|No| The number of concurrent client connections for a single graph service.|
|`client.retryInitialInterval`|`1s`|No| Reconnect interval time.|
|`client.retry`|`3`|No| The number of retries for failed execution of the nGQL statement.|
|`client.retryInitialInterval`|`1s`|No| Retry interval time.|

### Manager configuration

Manager configuration is a human-controlled configuration after connecting to the database.

The example configuration is as follows:

```yaml
manager:
  spaceName: basic_string_examples
  batch: 128
  readerConcurrency: 50
  importerConcurrency: 512
  statsInterval: 10s
  hooks:
    before:
      - statements:
        - UPDATE CONFIGS storage:wal_ttl=3600;
        - UPDATE CONFIGS storage:rocksdb_column_family_options = { disable_auto_compactions = true };
      - statements:
        - |
            DROP SPACE IF EXISTS basic_string_examples;
            CREATE SPACE IF NOT EXISTS basic_string_examples(partition_num=5, replica_factor=1, vid_type=int);
            USE basic_string_examples;
        wait: 10s
    after:
      - statements:
          - |
            UPDATE CONFIGS storage:wal_ttl=86400;
            UPDATE CONFIGS storage:rocksdb_column_family_options = { disable_auto_compactions = false };
```

|Parameter|Default value|Required|Description|
|:---|:---|:---|:---|
|`manager.spaceName`|-|Yes| Specifies the NebulaGraph space to import the data into. Do not support importing multiple map spaces at the same time.|
|`manager.batch`|`128`|No| The batch size for executing statements (global configuration).
</br>Setting the batch size individually for a data source can using the parameter `sources.batch` below.|
|`manager.readerConcurrency`|`50`|No| The number of concurrent reads of the data source by the reader.|
|`manager.importerConcurrency`|`512`|No| The number of concurrent nGQL statements generated to be executed, and then will call the client to execute these nGQL statements.|
|`manager.statsInterval`|`10s`|No| The time interval for printing statistical information|
|`manager.hooks.before.[].statements`|-|No|The command to execute in the graph space before importing.|
|`manager.hooks.before.[].wait`|-|No|The wait time after `statements` are executed.|
|`manager.hooks.after.[].statements`|-|No|The commands  to execute in the graph space after importing.|
|`manager.hooks.after.[].wait`|-|No|The wait time after `statements` are executed.|

### Log configuration

Log configuration is the logging-related configuration.

The example configuration is as follows:

```yaml
log:
  level: INFO
  console: true
  files:
   - logs/nebula-importer.log
```

|Parameter|Default value|Required|Description|
|:---|:---|:---|:---|
|`log.level`|`INFO`|No| Specifies the log level. Optional values are `DEBUG`, `INFO`, `WARN`, `ERROR`, `PANIC`, `FATAL`.|
|`log.console`|`true`|No| Whether to print the logs to console synchronously when storing logs.|
|`log.files`|-|No|The log file path. The log directory must exist.|

### Source configuration

The Source configuration requires the configuration of data source information, data processing methods, and Schema mapping.

The example configuration is as follows:

```yaml
sources:
  - path: ./person.csv  # Required. Specifies the path where the data files are stored. If a relative path is used, the path and current configuration file directory are spliced. Wildcard filename is also supported, for example: ./follower-*.csv, please make sure that all matching files with the same schema.
#  - s3: # AWS S3
#      endpoint: endpoint    # Optional. The endpoint of S3 service, can be omitted if using AWS S3.
#      region: us-east-1     # Required. The region of S3 service.
#      bucket: gdelt-open-data    # Required. The bucket of file in S3 service.
#      key: events/20190918.export.csv     # Required. The object key of file in S3 service.
#      accessKeyID: ""    # Optional. The access key of S3 service. If it is public data, no need to configure.
#      accessKeySecret: ""     # Optional. The secret key of S3 service. If it is public data, no need to configure.
#  - oss:
#      endpoint: https://oss-cn-hangzhou.aliyuncs.com    # Required. The endpoint of OSS service.
#      bucket: bucketName    # Required. The bucket of file in OSS service.
#      key: objectKey    # Required. The object key of file in OSS service.
#      accessKeyID: accessKey    # Required. The access key of OSS service.
#      accessKeySecret: secretKey    # Required. The secret key of OSS service.
#  - ftp:
#      host: 192.168.0.10    # Required. The host of FTP service.
#      port: 21    # Required. The port of FTP service.
#      user: user    # Required. The user of FTP service.
#      password: password    # Required. The password of FTP service.
#      path: "/events/20190918.export.csv"    # Required. The path of file in the FTP service.
#  - sftp:
#      host: 192.168.0.10    # Required. The host of SFTP service.
#      port: 22    # Required. The port of SFTP service.
#      user: user    # Required. The user of SFTP service.
#      password: password    # Optional. The password of SFTP service.
#      keyFile: keyFile    # Optional. The ssh key file path of SFTP service.
#      keyData: keyData    $ Optional. The ssh key file content of SFTP service.
#      passphrase: passphrase    # Optional. The ssh key passphrase of SFTP service.
#      path: "/events/20190918.export.csv"    # Required. The path of file in the SFTP service.
#  - hdfs:
#      address: "127.0.0.1:8020"    # Required. The address of HDFS service.
#      user: "hdfs"    # Optional. The user of HDFS service.
#      path: "/events/20190918.export.csv"    # Required. The path of file in the HDFS service.
    batch: 256
    csv:
      delimiter: "|"
      withHeader: false
      lazyQuotes: false
    tags:
    - name: Person
      id:
        type: "STRING"
        function: "hash"
#       index: 0        
        concatItems:
          - person_
          - 0
          - _id
      props:
        - name: "firstName"
          type: "STRING"
          index: 1
        - name: "lastName"
          type: "STRING"
          index: 2
        - name: "gender"
          type: "STRING"
          index: 3
          nullable: true
          defaultValue: female
        - name: "birthday"
          type: "DATE"
          index: 4
          nullable: true
          nullValue: _NULL_
        - name: "creationDate"
          type: "DATETIME"
          index: 5
        - name: "locationIP"
          type: "STRING"
          index: 6
        - name: "browserUsed"
          type: "STRING"
          index: 7
  - path: ./knows.csv
    batch: 256
    edges:
    - name: KNOWS # person_knows_person
      src:
        id:
          type: "STRING"
          concatItems:
            - person_
            - 0
            - _id
      dst:
        id:
          type: "STRING"
          concatItems:
            - person_
            - 1
            - _id
      props:
        - name: "creationDate"
          type: "DATETIME"
          index: 2
          nullable: true
          nullValue: _NULL_
          defaultValue: 0000-00-00T00:00:00
```

The configuration mainly includes the following parts:

- Specify the data source information.
- Specifies the batch size for executing statements.
- Specifies the CSV file format information.
- Specifies the schema mapping for Tag.
- Specifies the schema mapping for Edge type.

|Parameter|Default value|Required|Description|
|:---|:---|:---|:---|
|`sources.path`</br>`sources.s3`</br>`sources.oss`</br>`sources.ftp`</br>`sources.sftp`</br>`sources.hdfs`   |-| No | Specify data source information, such as local file, HDFS, and S3. Only one source can be configured for the `source`. Configure multiple sources in multiple `source`.</br>See the comments in the example for configuration items for different data sources.       |  
|`sources.batch`   |`256`| No | The batch size for executing statements when importing this data source. The priority is higher than `manager.batch`. |  
|`sources.csv.delimiter`   |`,`| No |  Specifies the delimiter for the CSV file. Only 1-character string separators are supported. When using special characters as separators, they need to be escaped. For example, when the delimiter is `0x03` in hexadecimal, i.e. `Ctrl+C`, the escape is written as `"\x03"` or `"\u0003"`. For details on escaping special characters in yaml format, see [Escaped Characters](https://yaml.org/spec/1.2.2/#escaped-characters).|         |  
|`sources.csv.withHeader`   |`false`| No | Whether to ignore the first record in the CSV file.          |  
|`sources.csv.lazyQuotes`   |`false`| No | Whether to allow lazy quotes. If `lazyQuotes` is true, a quote may appear in an unquoted field and a non-doubled quote may appear in a quoted field.    |  
|`sources.tags.name`   |-| Yes | The tag name.         |  
|`sources.tags.id.type`   |`STRING`| No |  The type of the VID.       |  
|`sources.tags.id.function`   |-| No | Functions to generate the VID. Currently, only function `hash` are supported.         |  
|`sources.tags.id.index`   |-| No | The column number corresponding to the VID in the data file. If `sources.tags.id.concatItems` is not configured, this parameter must be configured.   |  
|`sources.tags.id.concatItems`   |-| No | Used to concatenate two or more arrays, the concatenated items can be `string`, `int` or mixed. `string` stands for a constant, `int` for an index column. If this parameter is set, the `sources.tags.id.index` parameter will not take effect.  |  
|`sources.tags.ignoreExistedIndex`   |`true`| No | Whether to enable `IGNORE_EXISTED_INDEX`, that is, do not update index after insertion vertex.     |  
|`sources.tags.props.name`   |-| Yes | The tag property name, which must match the Tag property in the database.         |  
|`sources.tags.props.type`   |`STRING`| No | Property data type, supporting `BOOL`, `INT`, `FLOAT`, `DOUBLE`, `STRING`, `TIME`, `TIMESTAMP`, `DATE`, `DATETIME`, `GEOGRAPHY`, `GEOGRAPHY(POINT)`, `GEOGRAPHY(LINESTRING)` and `GEOGRAPHY(POLYGON)`.    |  
|`sources.tags.props.index`   |-| Yes | The property corresponds to the column number in the data file.         |  
|`sources.tags.props.nullable`   |`false`| No | Whether this prop property can be `NULL`, optional values is `true` or `false`.       |  
|`sources.tags.props.nullValue`   |-| No | Ignored when `nullable` is `false`. The value used to determine whether it is a `NULL`. The property is set to `NULL` when the value is equal to `nullValue`.        |  
|`sources.tags.props.alternativeIndices`   |-| No | Ignored when `nullable` is `false`. The property is fetched from records according to the indices in order until not equal to `nullValue`.         |  
|`sources.tags.props.defaultValue`   |-| No | Ignored when `nullable` is `false`. The property default value, when all the values obtained by `index` and `alternativeIndices` are `nullValue`.         |  
|`sources.edges.name`   |-| Yes | The edge type name.          |  
|`sources.edges.src.id.type`   |`STRING`| No |  The data type of the VID at the starting vertex on the edge.       |  
|`sources.edges.src.id.index`   |-| Yes | The column number in the data file corresponding to the VID at the starting vertex on the edge.         |  
|`sources.edges.dst.id.type`   |`STRING`| No | The data type of the VID at the destination vertex on the edge.         |  
|`sources.edges.dst.id.index`   |-| Yes | The column number in the data file corresponding to the VID at the destination vertex on the edge.         |  
|`sources.edges.rank.index`   |-| No | The column number in the data file corresponding to the rank on the edge.        |  
|`sources.edges.ignoreExistedIndex`   |`true`| No | Whether to enable `IGNORE_EXISTED_INDEX`, that is, do not update index after insertion vertex.         |  
|`sources.edges.props.name`   |-| Yes | The edge type property name, which must match the Tag property in the database.         |  
|`sources.edges.props.type`   |`STRING`| No | Property data type, supporting `BOOL`, `INT`, `FLOAT`, `DOUBLE`, `STRING`, `TIME`, `TIMESTAMP`, `DATE`, `DATETIME`, `GEOGRAPHY`, `GEOGRAPHY(POINT)`, `GEOGRAPHY(LINESTRING)` and `GEOGRAPHY(POLYGON)`.         |  
|`sources.edges.props.index`   |-| Yes | The property corresponds to the column number in the data file.    |  
|`sources.edges.props.nullable`   |-| No | Whether this prop property can be `NULL`, optional values is `true` or `false`.        |  
|`sources.edges.props.nullValue`   |-| No | Ignored when `nullable` is `false`. The value used to determine whether it is a `NULL`. The property is set to `NULL` when the value is equal to `nullValue`.       |  
|`sources.edges.props.defaultValue`   |-| No | Ignored when `nullable` is `false`. The property default value, when all the values obtained by `index` and `alternativeIndices` are `nullValue`.          |  

!!! note
    The sequence numbers of the columns in the CSV file start from 0, that is, the sequence numbers of the first column are 0, and the sequence numbers of the second column are 1.
