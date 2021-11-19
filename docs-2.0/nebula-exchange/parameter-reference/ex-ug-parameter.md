# Parameters in the configuration file

This topic describes how to configure the file [`application.conf`](https://github.com/vesoft-inc/nebula-exchange/blob/master/nebula-exchange/src/main/resources/application.conf) when users use Nebula Exchange.

Before configuring the `application.conf` file, it is recommended to copy the file name `application.conf` and then edit the file name according to the file type of a data source. For example, change the file name to `csv_application.conf` if the file type of the data source is CSV.

The `application.conf` file contains the following content types:

- Spark configurations

- Hive configurations (optional)

- Nebula Graph configurations

- Vertex configurations

- Edge configurations

## Spark configurations

This topic lists only some Spark parameters. For more information, see [Spark Configuration](https://spark.apache.org/docs/latest/configuration.html#application-properties).

|Parameter|Type|Default value|Required|Description|
|:---|:---|:---|:---|:---|
|`spark.app.name`|string|-|No|The drive name in Spark.|
|`spark.driver.cores`|int|`1`|No|The number of CPU cores used by a driver, only applicable to a cluster mode.|
|`spark.driver.maxResultSize`|string|`1G`|No|The total size limit (in bytes) of the serialized results of all partitions in a single Spark operation (such as collect). The minimum value is 1M, and 0 means unlimited.|
|`spark.executor.memory`|string|`1G`|No|The amount of memory used by a Spark driver which can be specified in units, such as 512M or 1G.|
|`spark.cores.max`|int|`16`|No|The maximum number of CPU cores of applications requested across clusters (rather than from each node) when a driver runs in a coarse-grained sharing mode on a standalone cluster or a Mesos cluster. The default value is `spark.deploy.defaultCores` on a Spark standalone cluster manager or the value of the `infinite` parameter (all available cores) on Mesos.|

## Hive configurations (optional)

Users only need to configure parameters for connecting to Hive if Spark and Hive are deployed in different clusters. Otherwise, please ignore the following configurations.

|Parameter|Type|Default value|Required|Description|
|:---|:---|:---|:---|:---|
|`hive.warehouse`|string|-|Yes|The warehouse path in HDFS. Enclose the path in double quotes and start with `hdfs://`.|
|`hive.connectionURL`|string|-|Yes|The URL of a JDBC connection. For example, `"jdbc:mysql://127.0.0.1:3306/hive_spark?characterEncoding=UTF-8"`.|
|`hive.connectionDriverName`|string|`"com.mysql.jdbc.Driver"`|Yes|The driver name.|
|`hive.connectionUserName`|list\[string\]|-|Yes|The username for connections.|
|`hive.connectionPassword`|list\[string\]|-|Yes|The account password.|

## Nebula Graph configurations

|Parameter|Type|Default value|Required|Description|
|:---|:---|:---|:---|:---|
|`nebula.address.graph`|list\[string\]|`["127.0.0.1:9669"]`|Yes|The addresses of all Graph services, including IPs and ports, separated by commas (,). Example: `["ip1:port1","ip2:port2","ip3:port3"]`.|
|`nebula.address.meta`|list\[string\]|`["127.0.0.1:9559"]`|Yes|The addresses of all Meta services, including IPs and ports, separated by commas (,). Example: `["ip1:port1","ip2:port2","ip3:port3"]`.|
|`nebula.user`|string|-|Yes|The username with write permissions for Nebula Graph.|
|`nebula.pswd`|string|-|Yes|The account password.|
|`nebula.space`|string|-|Yes|The name of the graph space where data needs to be imported.|
|`nebula.ssl.enable.graph`|bool|`false`|Yes|Enables the [SSL encryption](https://en.wikipedia.org/wiki/Transport_Layer_Security) between Exchange and Graph services. If the value is `true`, the SSL encryption is enabled and the following SSL parameters take effect. If Exchange is run on a multi-machine cluster, you need to store the corresponding files in the same path on each machine when setting the following SSL-related paths.|
|`nebula.ssl.sign`|string|`ca`|Yes|Specifies the SSL sign. Optional values are `ca` and `self`.|
|`nebula.ssl.ca.param.caCrtFilePath`|string|Specifies the storage path of the CA certificate. It takes effect when the value of `nebula.ssl.sign` is `ca`.|
|`nebula.ssl.ca.param.crtFilePath`|string|`"/path/crtFilePath"`|Yes|Specifies the storage path of the CRT certificate. It takes effect when the value of `nebula.ssl.sign` is `ca`.|
|`nebula.ssl.ca.param.keyFilePath`|string|`"/path/keyFilePath"`|Yes|Specifies the storage path of the key file. It takes effect when the value of `nebula.ssl.sign` is `ca`.|
|`nebula.ssl.self.param.crtFilePath`|string|`"/path/crtFilePath"`|Yes|Specifies the storage path of the CRT certificate. It takes effect when the value of `nebula.ssl.sign` is `self`.|
|`nebula.ssl.self.param.keyFilePath`|string|`"/path/keyFilePath"`|Yes|Specifies the storage path of the key file. It takes effect when the value of `nebula.ssl.sign` is `self`.|
|`nebula.ssl.self.param.password`|string|`"nebula"`|Yes|Specifies the storage path of the password. It takes effect when the value of `nebula.ssl.sign` is `self`.|
|`nebula.path.local`|string|`"/tmp"`|No|The local SST file path which needs to be set when users import SST files.|
|`nebula.path.remote`|string|`"/sst"`|No|The remote SST file path which needs to be set when users import SST files.|
|`nebula.path.hdfs.namenode`|string|`"hdfs://name_node:9000"`|No|The NameNode path which needs to be set when users import SST files.|
|`nebula.connection.timeout`|int|`3000`|No|The timeout set for Thrift connections. Unit: ms.|
|`nebula.connection.retry`|int|`3`|No|Retries set for Thrift connections.|
|`nebula.execution.retry`|int|`3`|No|Retries set for executing nGQL statements.|
|`nebula.error.max`|int|`32`|No|The maximum number of failures during the import process. When the number of failures reaches the maximum, the Spark job submitted will stop automatically .|
|`nebula.error.output`|string|`/tmp/errors`|No|The path to output error logs. Failed nGQL statement executions are saved in the error log.|
|`nebula.rate.limit`|int|`1024`|No|The limit on the number of tokens in the token bucket when importing data.|
|`nebula.rate.timeout`|int|`1000`|No|The timeout period for getting tokens from a token bucket. Unit: milliseconds.|

## Vertex configurations

For different data sources, the vertex configurations are different. There are many general parameters and some specific parameters. General parameters and specific parameters of different data sources need to be configured when users configure vertices.

### General parameters

|Parameter|Type|Default value|Required|Description|
|:---|:---|:---|:---|:---|
|`tags.name`|string|-|Yes|The tag name defined in Nebula Graph.|
|`tags.type.source`|string|-|Yes|Specify a data source. For example, `csv`.|
|`tags.type.sink`|string|`client`|Yes|Specify an import method. Optional values are `client` and `SST`.|
|`tags.fields`|list\[string\]|-|Yes|The header or column name of the column corresponding to properties. If there is a header or a column name, please use that name directly. If a CSV file does not have a header, use the form of `[_c0, _c1, _c2]` to represent the first column, the second column, the third column, and so on.|
|`tags.nebula.fields`|list\[string\]|-|Yes|Property names defined in Nebula Graph, the order of which must correspond to `tags.fields`. For example, `[_c1, _c2]` corresponds to `[name, age]`, which means that values in the second column are the values of the property `name`, and values in the third column are the values of the property `age`.|
|`tags.vertex.field`|string|-|Yes|The column of vertex IDs. For example, when a CSV file has no header, users can use `_c0` to indicate values in the first column are vertex IDs.|
|`tags.batch`|int|`256`|Yes|The maximum number of vertices written into Nebula Graph in a single batch.|
|`tags.partition`|int|`32`|Yes|The number of Spark partitions.|

### Specific parameters of Parquet/JSON/ORC data sources

|Parameter|Type|Default value|Required|Description|
|:---|:---|:---|:---|:---|
|`tags.path`|string|-|Yes|The path of vertex data files in HDFS. Enclose the path in double quotes and start with `hdfs://`.|

### Specific parameters of CSV data sources

|Parameter|Type|Default value|Required|Description|
|:---|:---|:---|:---|:---|
|`tags.path`|string|-|Yes|The path of vertex data files in HDFS. Enclose the path in double quotes and start with `hdfs://`.|
|`tags.separator`|string|`,`|Yes|The separator. The default value is a comma (,).|
|`tags.header`|bool|`true`|Yes|Whether the file has a header.|

### Specific parameters of Hive data sources

|Parameter|Type|Default value|Required|Description|
|:---|:---|:---|:---|:---|
|`tags.exec`|string|-|Yes|The statement to query data sources. For example, `select name,age from mooc.users`.|

### Specific parameters of MaxCompute data sources

|Parameter|Type|Default value|Required|Description|
|:---|:---|:---|:---|:---|
|`tags.table`|string|-|Yes|The table name of the MaxCompute.|
|`tags.project`|string|-|Yes|The project name of the MaxCompute.|
|`tags.odpsUrl`|string|-|Yes|The odpsUrl of the MaxCompute service. For more information about odpsUrl, see [Endpoints](https://www.alibabacloud.com/help/doc-detail/34951.html).|
|`tags.tunnelUrl`|string|-|Yes|The tunnelUrl of the MaxCompute service. For more information about tunnelUrl, see [Endpoints](https://www.alibabacloud.com/help/doc-detail/34951.html).|
|`tags.accessKeyId`|string|-|Yes|The accessKeyId of the MaxCompute service.|
|`tags.accessKeySecret`|string|-|Yes|The accessKeySecret of the MaxCompute service.|
|`tags.partitionSpec`|string|-|No|Partition descriptions of MaxCompute tables.|
|`tags.sentence`|string|-|No|Statements to query data sources. The table name in the SQL statement is the same as the value of the table above.|

### Specific parameters of Neo4j data sources

|Parameter|Type|Default value|Required|Description|
|:---|:---|:---|:---|:---|
|`tags.exec`|string|-|Yes|Statements to query data sources. For example: `match (n:label) return n.neo4j-field-0`.|
|`tags.server`|string|`"bolt://127.0.0.1:7687"`|Yes|The server address of Neo4j.|
|`tags.user`|string|-|Yes|The Neo4j username with read permissions.|
|`tags.password`|string|-|Yes|The account password.|
|`tags.database`|string|-|Yes|The name of the database where source data is saved in Neo4j.|
|`tags.check_point_path`|string|`/tmp/test`|No|The directory set to import progress information, which is used for resuming transfers. If not set, the resuming transfer is disabled.|

### Specific parameters of MySQL data sources

|Parameter|Type|Default value|Required|Description|
|:---|:---|:---|:---|:---|
|`tags.host`|string|-|Yes|The MySQL server address.|
|`tags.port`|string|-|Yes|The MySQL server port.|
|`tags.database`|string|-|Yes|The database name.|
|`tags.table`|string|-|Yes|The name of a table used as a data source.|
|`tags.user`|string|-|Yes|The MySQL username with read permissions.|
|`tags.password`|string|-|Yes|The account password.
|`tags.sentence`|string|-|Yes|Statements to query data sources. For example: `"select teamid, name from basketball.team order by teamid;"`.|

### Specific parameters of ClickHouse data sources

|Parameter|Type|Default value|Required|Description|
|:---|:---|:---|:---|:---|
|`tags.url`|string|-|Yes|The JDBC URL of ClickHouse.|
|`tags.user`|string|-|Yes|The ClickHouse username with read permissions.|
|`tags.password`|string|-|Yes|The account password.|
|`tags.numPartition`|string|-|Yes|The number of ClickHouse partitions.
|`tags.sentence`|string|-|Yes|Statements to query data sources.|

### Specific parameters of Hbase data sources

|Parameter|Type|Default value|Required|Description|
|:---|:---|:---|:---|:---|
|`tags.host`|string|`127.0.0.1`|Yes|The Hbase server address.|
|`tags.port`|string|`2181`|Yes|The Hbase server port.
|`tags.table`|string|-|Yes|The name of a table used as a data source.|
|`tags.columnFamily`|string|-|Yes|The column family to which a table belongs.|

### Specific parameters of Pulsar data sources

|Parameter|Type|Default value|Required|Description|
|:---|:---|:---|:---|:---|
|`tags.service`|string|`"pulsar://localhost:6650"`|Yes|The Pulsar server address.
|`tags.admin`|string|`"http://localhost:8081"`|Yes|The admin URL used to connect pulsar.|
|`tags.options.<topic\|topics\| topicsPattern>`|string|-|Yes|Options offered by Pulsar, which can be configured by choosing one from `topic`, `topics`, and `topicsPattern`.|
|`tags.interval.seconds`|int|`10`|Yes|The interval for reading messages. Unit: seconds.|

### Specific parameters of Kafka data sources

|Parameter|Type|Default value|Required|Description|
|:---|:---|:---|:---|:---|
|`tags.service`|string|-|Yes|The Kafka server address.|
|`tags.topic`|string|-|Yes|The message type.|
|`tags.interval.seconds`|int|`10`|Yes|The interval for reading messages. Unit: seconds.|

### Specific parameters of SST data sources

|Parameter|Type|Default value|Required|Description|
|:---|:---|:---|:---|:---|
|`tags.path`|string|-|Yes|The path of the source file specified to generate SST files.|

### Specific parameters of Nebula Graph

!!! enterpriseonly

    Specific parameters of Nebula Graph are used for exporting Nebula Graph data, which is supported by Exchange Enterprise Edition only.

|Parameter|Data type|Default value|Required|Description|
|:---|:---|:---|:---|:---|
|`tags.path`|string|`"hdfs://namenode:9000/path/vertex"`|Yes|Specifies the storage path of the CSV file. You need to set a new path and Exchange will automatically create the path you set. If you store the data to the HDFS server, the path format is the same as the default value, such as `"hdfs://192.168.8.177:9000/vertex/player"`. If you store the data to the local, the path format is `"file:///path/vertex"`, such as `"file:///home/nebula/vertex/player"`. If there are multiple Tags, different directories must be set for each Tag.|
|`tags.noField`|bool|`false`|Yes|If the value is `true`, only VIDs will be exported, not the property data. If the value is `false`, VIDs and the property data will be exported.|
|`tags.return.fields`|list|`[]`|Yes|Specifies the properties to be exported. For example, to export the `name` and `age`, you need to set the parameter value to `["name","age"]`. This parameter only takes effect when the value of `tags.noField` is `false`.|

## Edge configurations

For different data sources, configurations of edges are also different. There are general parameters and some specific parameters. General parameters and specific parameters of different data sources need to be configured when users configure edges.

For the specific parameters of different data sources for edge configurations, please refer to the introduction of specific parameters of different data sources above, and pay attention to distinguishing tags and edges.

### General parameters

|Parameter|Type|Default value|Required|Description|
|:---|:---|:---|:---|:---|
|`edges.name`| string|-|Yes|The edge type name defined in Nebula Graph.|
|`edges.type.source`|string|-|Yes|The data source of edges. For example, `csv`.|
|`edges.type.sink`|string|`client`|Yes|The method specified to import data. Optional values are `client` and `SST`.|
|`edges.fields`|list\[string\]|-|Yes|The header or column name of the column corresponding to properties. If there is a header or column name, please use that name directly. If a CSV file does not have a header, use the form of `[_c0, _c1, _c2]` to represent the first column, the second column, the third column, and so on.|
|`edges.nebula.fields`|list\[string\]|-|Yes|Edge names defined in Nebula Graph, the order of which must correspond to `edges.fields`. For example, `[_c2, _c3]` corresponds to `[start_year, end_year]`, which means that values in the third column are the values of the start year, and values in the fourth column are the values of the end year.|
|`edges.source.field`|string|-|Yes|The column of source vertices of edges. For example, `_c0` indicates a value in the first column that is used as the source vertex of an edge.|
|`edges.target.field`|string|-|Yes|The column of destination vertices of edges. For example, `_c0` indicates a value in the first column that is used as the destination vertex of an edge.|
|`edges.ranking`|int|-|No|The column of rank values. If not specified, all rank values are `0` by default.|
|`edges.batch`|int|`256`|Yes|The maximum number of edges written into Nebula Graph in a single batch.|
|`edges.partition`|int|`32`|Yes|The number of Spark partitions.|

### Specific parameters of Nebula Graph

|Parameter|Type|Default value|Required|Description|
|:---|:---|:---|:---|:---|
|`edges.path`|string|`"hdfs://namenode:9000/path/edge"`|Yes|Specifies the storage path of the CSV file. You need to set a new path and Exchange will automatically create the path you set. If you store the data to the HDFS server, the path format is the same as the default value, such as `"hdfs://192.168.8.177:9000/edge/follow"`. If you store the data to the local, the path format is `"file:///path/edge"`, such as `"file:///home/nebula/edge/follow"`. If there are multiple Edges, different directories must be set for each Edge.|
|`edges.noField`|bool|`false`|Yes|If the value is `true`, source vertex IDs, destination vertex IDs, and ranks will be exported, not the property data. If the vaue is `false`, ranks, source vertex IDs, destination vertex IDs, ranks, and the property data will be exported.|
|`edges.return.fields`|list|`[]`|Yes|Specifies the properties to be exported. For example, to export `start_year` and `end_year`, you need to set the parameter value to `["start_year","end_year"]`. This parameter only takes effect when the value of `edges.noField` is `false`.|
