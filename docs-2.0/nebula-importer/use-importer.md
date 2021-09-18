# Nebula Importer

Nebula Importer (Importer) is a standalone import tool for CSV files with [Nebula Graph](https://github.com/vesoft-inc/nebula). Importer can read the local CSV file and then import the data into the Nebula Graph database.

## Scenario

Importer is used to import the contents of a local CSV file into the Nebula Graph.

## Advantage

- Lightweight and fast: no complex environment can be used, fast data import.

- Flexible filtering: You can flexibly filter CSV data through configuration files.

## Prerequisites

Before using Nebula Importer, make sure:

- Nebula Graph service has been deployed. There are currently three deployment modes:
  
  - [Deploy Nebula Graph with Docker Compose](../4.deployment-and-installation/2.compile-and-install-nebula-graph/3.deploy-nebula-graph-with-docker-compose.md)
  
  - [Install Nebula Graph with RPM or DEB package](../4.deployment-and-installation/2.compile-and-install-nebula-graph/2.install-nebula-graph-by-rpm-or-deb.md)
  
  - [Install Nebula Graph by compiling the source code](../4.deployment-and-installation/2.compile-and-install-nebula-graph/1.install-nebula-graph-by-compiling-the-source-code.md)

- Schema is created in Nebula Graph, including space, Tag and Edge type, or set by parameter `clientSettings.postStart.commands`.

- Golang environment has been deployed on the machine running the Importer. For details, see [Build Go environment](https://github.com/vesoft-inc/nebula-importer/blob/release-v2.0.0-ga/docs/golang-install-en.md).

## Steps

Configure the YAML file and prepare the CSV file to be imported to use the tool to batch write data to Nebula Graph.

### Source code compile and run

1. Clone repository.

  ```bash
  $ git clone -b {{importer.branch}} https://github.com/vesoft-inc/nebula-importer.git
  ```

  !!! note
  
        Use the correct branch.
        Nebula Graph 1.x and 2.x have different RPC protocols, so:

      - The Nebula Importer V1 branch can only connect to Nebula Graph 1.x.
      - The Nebula Importer Master branch and v2 branch can connect to Nebula Graph 2.x.

2. Access the directory `nebula-importer`.

  ```bash
  $ cd nebula-importer
  ```

3. Compile the source code.

  ```bash
  $ make build
  ```

4. Start the service.

  ```bash
  $ ./nebula-importer --config <yaml_config_file_path>
  ```

  !!! note
        For details about the YAML configuration file, see configuration file description at the end of topic.

### No network compilation mode

If the server cannot be connected to the Internet, it is recommended to upload the source code and various dependency packages to the corresponding server for compilation on the machine that can be connected to the Internet. The operation steps are as follows:

1. Clone repository.

   ```bash
   $ git clone -b {{importer.release}} https://github.com/vesoft-inc/nebula-importer.git
   ```

2. Use the following command to download and package the dependent source code.

   ```bash
   $ cd nebula-importer
   $ go mod vendor
   $ cd .. && tar -zcvf nebula-importer.tar.gz nebula-importer
   ```

3. Upload the compressed package to a server that cannot be connected to the Internet.

4. Unzip and compile.

   ```bash
   $ tar -zxvf nebula-importer.tar.gz 
   $ cd nebula-importer
   $ go build -mod vendor cmd/importer.go
   ```

### Run in Docker mode

Instead of installing the Go locale locally, you can use Docker to pull the [image](https://hub.docker.com/r/vesoft/nebula-importer) of the Nebula Importer and mount the local configuration file and CSV data file into the container. The command is as follows:

```bash
$ docker run --rm -ti \
    --network=host \
    -v <config_file>:<config_file> \
    -v <csv_data_dir>:<csv_data_dir> \
    vesoft/nebula-importer:<version>
    --config <config_file>
```

- `<config_file>`: The absolute path to the local YAML configuration file.
- `<csv_data_dir>`: The absolute path to the local CSV data file.
- `<version>`: Nebula Graph 2.x Please fill in 'v2'.

!!! note
    A relative path is recommended. If you use a local absolute path, check that the path maps to the path in the Docker.

## Configuration File Description

Nebula Importer uses configuration(`nebula-importer/examples/v2/example.yaml`) files to describe information about the files to be imported, the Nebula Graph server, and more. You can refer to the example configuration file: [Configuration without Header](config-without-header.md)/[Configuration with Header](config-with-header.md). This section describes the fields in the configuration file by category.

### Basic configuration

The example configuration is as follows:

```yaml
version: v2
description: example
removeTempFiles: false
```

|Parameter|Default value|Required|Description|
|:---|:---|:---|:---|
|`version`|v2|Yes|Target version of Nebula Graph.|
|`description`|example|No|Description of the configuration file.|
|`removeTempFiles`|false|No|Whether to delete temporarily generated logs and error data files.|

### Client configuration

The client configuration stores the configurations associated with Nebula Graph.

The example configuration is as follows:

```yaml
clientSettings:
  retry: 3
  concurrency: 10
  channelBufferSize: 128
  space: test
  connection:
    user: user
    password: password
    address: 192.168.*.13:9669,192.168.*.14:9669
  postStart:
    commands: |
      UPDATE CONFIGS storage:wal_ttl=3600;
      UPDATE CONFIGS storage:rocksdb_column_family_options = { disable_auto_compactions = true };
    afterPeriod: 8s
  preStop:
    commands: |
      UPDATE CONFIGS storage:wal_ttl=86400;
      UPDATE CONFIGS storage:rocksdb_column_family_options = { disable_auto_compactions = false };
```

|Parameter|Default value|Required|Description|
|:---|:---|:---|:---|
|`clientSettings.retry`|3|No|Retry times of nGQL statement execution failures.|
|`clientSettings.concurrency`|10|No|Number of Nebula Graph client concurrency.|
|`clientSettings.channelBufferSize`|128|No|Cache queue size per Nebula Graph client.|
|`clientSettings.space`|-|Yes|Specifies the Nebula Graph space to import the data into. Do not import multiple spaces at the same time to avoid performance impact.|
|`clientSettings.connection.user`|-|Yes|Nebula Graph user name.|
|`clientSettings.connection.password`|-|Yes|The password for the Nebula Graph user name.|
|`clientSettings.connection.address`|-|Yes|Addresses and ports for all Graph services.|
|`clientSettings.postStart.commands`|-|No|Configure some of the operations to perform after connecting to the Nebula Graph server, and before inserting data.|
|`clientSettings.postStart.afterPeriod`|-|No|The interval, between executing the above `commands` and executing the insert data command, such as `8s`.|
|`clientSettings.preStop.commands`|-|No|Configure some of the actions you performed before disconnecting from the Nebula Graph server.|

### File configuration

File configuration Stores the configuration of data files and logs, and details about the Schema.

#### File and log configuration

The example configuration is as follows:

```yaml
logPath: ./err/test.log
files:
  - path: ./student_without_header.csv
    failDataPath: ./err/studenterr.csv
    batchSize: 128
    limit: 10
    inOrder: false
    type: csv
    csv:
      withHeader: false
      withLabel: false
      delimiter: ","
```

|Parameter|Default value|Required|Description|
|:---|:---|:---|:---|
|`logPath`|-|No|Path for exporting log information, such as errors during import.|
|`files.path`|-|Yes|Path for storing data files. If a relative path is used, the path is merged with the current configuration file directory. You can use an asterisk (\*) for fuzzy matching to import multiple files with similar names, but the files need to be the same structure.|
|`files.failDataPath`|-|Yes|Insert the failed data file storage path, so that data can be written later.|
|`files.batchSize`|128|No|The number of statements inserting data in a batch.|
|`files.limit`|-|No|Limit on the number of rows of read data.|
|`files.inOrder`|-|No|Whether to insert rows in the file in order. If the value is set to `false`, the import rate decreases due to data skew.|
|`files.type`|-|Yes|The file type.|
|`files.csv.withHeader`|`false`|Yes|Whether there is a header.|
|`files.csv.withLabel`|`false`|Yes|Whether there is a  label.|
|`files.csv.delimiter`|`","`|Yes|Specifies the delimiter for the CSV file. A string delimiter that supports only one character.|

#### Schema configuration

Schema configuration describes the Meta information of the current data file. Schema types are vertex and edge. Multiple vertexes or edges can be configured at the same time.

- vertex configuration

The example configuration is as follows:

```yaml
schema:
  type: vertex
  vertex:
    vid:
      type: string
      index: 0
    tags:
      - name: student
        props:
          - name: name
            type: string
            index: 1
          - name: age
            type: int
            index: 2
          - name: gender
            type: string
            index: 3
```

|Parameter|Default value|Required|Description|
|:---|:---|:---|:---|
|`files.schema.type`|-|Yes|Schema type. Possible values are `vertex` and `edge`.|
|`files.schema.vertex.vid.type`|-|No|The data type of the vertex ID. Possible values are `int` and `string`.|
|`files.schema.vertex.vid.index`|-|No|The vertex ID corresponds to the column number in the CSV file.|
|`files.schema.vertex.tags.name`|-|Yes|Tag name.|
|`files.schema.vertex.tags.props.name`|-|Yes|Tag property name, which must match the Tag property in the Nebula Graph.|
|`files.schema.vertex.tags.props.type`|-|Yes|Property data type, supporting `bool`, `int`, `float`, `double`, `timestamp` and `string`.|
|`files.schema.vertex.tags.props.index`|-|No|Property corresponds to the sequence number of the column in the CSV file.|

!!! note
    The sequence numbers of the columns in the CSV file start from 0, that is, the sequence numbers of the first column are 0, and the sequence numbers of the second column are 1.

- edge configuration

The example configuration is as follows:

```yaml
schema:
  type: edge
  edge:
    name: follow
    withRanking: true
    srcVID:
      type: string
      index: 0
    dstVID:
      type: string
      index: 1
    rank:
      index: 2
    props:
      - name: degree
        type: double
        index: 3
```

|Parameter|Default value|Required|Description|
|:---|:---|:---|:---|
|`files.schema.type`|-|Yes|Schema type. Possible values are `vertex` and `edge`.|
|`files.schema.edge.name`|-|Yes|Edge type name.|
|`files.schema.edge.srcVID.type`|-|No|边的起始点ID的数据类型.|
|`files.schema.edge.srcVID.index`|-|No|The data type of the starting vertex ID of the edge.|
|`files.schema.edge.dstVID.type`|-|No|The data type of the destination vertex ID of the edge.|
|`files.schema.edge.dstVID.index`|-|No|The destination vertex ID of the edge corresponds to the column number in the CSV file.|
|`files.schema.edge.rank.index`|-|No|The rank value of the edge corresponds to the column number in the CSV file.|
|`files.schema.edge.props.name`|-|Yes|The Edge Type property name must match the Edge Type property in the Nebula Graph.|
|`files.schema.edge.props.type`|-|Yes|Property data type, supporting `bool`, `int`, `float`, `double`, `timestamp` and `string`.|
|`files.schema.edge.props.index`|-|No|Property corresponds to the sequence number of the column in the CSV file.|

## About the CSV file header

According to whether the CSV file has a header or not, the Importer needs to make different Settings on the configuration file. For relevant examples and explanations, please refer to:

- [Configuration without Header](config-without-header.md)

- [Configuration with Header](config-with-header.md)
