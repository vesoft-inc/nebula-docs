# Nebula Spark Connector

Nebula Spark Connector is a Spark connector application for reading and writing Nebula Graph data in Spark standard format. Nebula Spark Connector consists of two parts: Reader and Writer.

* Reader
  
  Provides a Spark SQL interface. This interface can be used to read Nebula Graph data. It reads one vertex or edge type data at a time and assemble the result into a Spark DataFrame.

* Writer

  Provides a Spark SQL interface. This interface can be used to write DataFrames into Nebula Graph in a row-by-row or batch-import way.

For more information, see [Nebula Spark Connector](https://github.com/vesoft-inc/nebula-spark-utils/blob/{{sparkconnector.branch}}/nebula-spark-connector/README.md).

## Use cases

Nebula Spark Connector applies to the following scenarios:

* Migrate data between different Nebula Graph clusters.

* Migrate data between different graph spaces in the same Nebula Graph cluster.

* Migrate data between Nebula Graph and other data sources.

* Graph computing with [Nebula Algorithm](nebula-algorithm.md).

## Benefits

The features of Nebula Spark Connector {{sparkconnector.release}} are as follows:

* Supports multiple connection settings, such as timeout period, number of connection retries, number of execution retries, etc.

* Supports multiple settings for data writing, such as setting the corresponding column as vertex ID, starting vertex ID, destination vertex ID or attributes.

* Supports non-attribute reading and full attribute reading.

* Supports reading Nebula Graph data into VertexRDD and EdgeRDD, and supports non-Long vertex IDs.

* Unifies the extended data source of SparkSQL, and uses DataSourceV2 to extend Nebula Graph data.

* Two write modes, `insert` and `update`, are supported. `insert` mode will insert (overwrite) data, and `update` mode will only update existing data.

## Get Nebula Spark Connector

### Compile package

!!! note

     Install Nebula Spark Connector of version 2.3 or above.

1. Clone repository `nebula-spark-utils`.

  ```bash
  $ git clone -b {{sparkconnector.branch}} https://github.com/vesoft-inc/nebula-spark-utils.git
  ```

2. Make the `nebula-spark-connector` directory the current working directory.

  ```bash
  $ cd nebula-spark-utils/nebula-spark-connector
  ```

3. Compile package.

  ```bash
  $ mvn clean package -Dmaven.test.skip=true -Dgpg.skip -Dmaven.javadoc.skip=true
  ```

After compilation, a similar file `nebula-spark-connector-{{sparkconnector.release}}-SHANPSHOT.jar` is generated in the directory `nebula-spark-connector/target`.

### Download maven remote repository

[Download](https://repo1.maven.org/maven2/com/vesoft/nebula-spark-connector/)

## How to use

When using Nebula Spark Connector to reading and writing Nebula Graph data, You can refer to the following code.

```scala
# Read vertex and edge data from Nebula Graph.
spark.read.nebula().loadVerticesToDF()
spark.read.nebula().loadEdgesToDF()
 
# Write dataframe data into Nebula Graph as vertex and edges.
dataframe.write.nebula().writeVertices()
dataframe.write.nebula().writeEdges()
```

`nebula()` receives two configuration parameters, including connection configuration and read-write configuration.

### Reading data from Nebula Graph

```scala
val config = NebulaConnectionConfig
  .builder()
  .withMetaAddress("127.0.0.1:9559")
  .withConenctionRetry(2)
  .withExecuteRetry(2)
  .withTimeout(6000)
  .build()
     
val nebulaReadVertexConfig: ReadNebulaConfig = ReadNebulaConfig
  .builder()
  .withSpace("test")
  .withLabel("person")
  .withNoColumn(false)
  .withReturnCols(List("birthday"))
  .withLimit(10)
  .withPartitionNum(10)
  .build()
val vertex = spark.read.nebula(config, nebulaReadVertexConfig).loadVerticesToDF()
  
val nebulaReadEdgeConfig: ReadNebulaConfig = ReadNebulaConfig
  .builder()
  .withSpace("test")
  .withLabel("knows")
  .withNoColumn(false)
  .withReturnCols(List("degree"))
  .withLimit(10)
  .withPartitionNum(10)
  .build()
val edge = spark.read.nebula(config, nebulaReadEdgeConfig).loadEdgesToDF()
```

- `NebulaConnectionConfig` is the configuration for connecting to the nebula graph, as described below.

  |Parameter|Required|Description|
  |:---|:---|:---|
  |`withMetaAddress`  |Yes| Specifies the IP addresses and ports of all Meta Services. Separate multiple addresses with commas. The format is `ip1:port1,ip2:port2,...`. Read data is no need to configure `withGraphAddress`.  |
  |`withConnectionRetry`  |No| The number of retries that the Nebula Java Client connected to the Nebula Graph. The default value is `1`.  |
  |`withExecuteRetry`  |No| The number of retries that the Nebula Java Client executed query statements. The default value is `1`.  |
  |`withTimeout`  |No| The timeout for the Nebula Java Client request response. The default value is `6000`, Unit: ms.  |

- `ReadNebulaConfig` is the configuration to read Nebula Graph data, as described below.

  |Parameter|Required|Description|
  |:---|:---|:---|
  |`withSpace`  |Yes|  Nebula Graph space name.  |
  |`withLabel`  |Yes|   The Tag or Edge type name within the Nebula Graph space.  |
  |`withNoColumn`  |No|  Whether the property is not read. The default value is `false`, read property. If the value is `true`, the property is not read, the `withReturnCols` configuration is invalid.  |
  |`withReturnCols`  |No|  Configures the set of properties for vertex or edges to read. the format is `List(property1,property2,...)`, The default value is `List()`, indicating that all properties are read.  |
  |`withLimit`  |No|  Configure the number of rows of data read from the server by the Nebula Java Storage Client at a time. The default value is `1000`.  |
  |`withPartitionNum`  |No|  Configures the number of Spark partitions to read the Nebula Graph data. The default value is `100`. This value should not exceed the number of slices in the graph space (partition_num).|

### Write data into Nebula Graph

```scala
val config = NebulaConnectionConfig
  .builder()
  .withMetaAddress("127.0.0.1:9559")
  .withGraphAddress("127.0.0.1:9669")
  .withConenctionRetry(2)
  .build()
 
val nebulaWriteVertexConfig: WriteNebulaVertexConfig = WriteNebulaVertexConfig      
  .builder()
  .withSpace("test")
  .withTag("person")
  .withVidField("id")
  .withVidPolicy("hash")
  .withVidAsProp(true)
  .withUser("root")
  .withPasswd("nebula")
  .withBatch(1000)
  .build()    
df.write.nebula(config, nebulaWriteVertexConfig).writeVertices()
  
val nebulaWriteEdgeConfig: WriteNebulaEdgeConfig = WriteNebulaEdgeConfig      
  .builder()
  .withSpace("test")
  .withEdge("friend")
  .withSrcIdField("src")
  .withSrcPolicy(null)
  .withDstIdField("dst")
  .withDstPolicy(null)
  .withRankField("degree")
  .withSrcAsProperty(true)
  .withDstAsProperty(true)
  .withRankAsProperty(true)
  .withUser("root")
  .withPasswd("nebula")
  .withBatch(1000)
  .build()
df.write.nebula(config, nebulaWriteEdgeConfig).writeEdges()
```

The default write mode is `insert`, which can be changed to `update` via `withWriteMode` configuration:

```scala
val config = NebulaConnectionConfig
  .builder()
  .withMetaAddress("127.0.0.1:9559")
  .withGraphAddress("127.0.0.1:9669")
  .build()
val nebulaWriteVertexConfig = WriteNebulaVertexConfig
  .builder()
  .withSpace("test")
  .withTag("person")
  .withVidField("id")
  .withVidAsProp(true)
  .withBatch(1000)
  .withWriteMode(WriteMode.UPDATE)
  .build()
df.write.nebula(config, nebulaWriteVertexConfig).writeVertices()
```

- `NebulaConnectionConfig` is the configuration for connecting to the nebula graph, as described below.

  |Parameter|Required|Description|
  |:---|:---|:---|
  |`withMetaAddress`  |Yes| Specifies the IP addresses and ports of all Meta Services. Separate multiple addresses with commas. The format is `ip1:port1,ip2:port2,...`. |
  |`withGraphAddress`  |Yes| Specifies the IP addresses and ports of Graph Services. Separate multiple addresses with commas. The format is `ip1:port1,ip2:port2,...`. |
  |`withConnectionRetry`  |No| Number of retries that the Nebula Java Client connected to the Nebula Graph. The default value is `1`.  |

- `WriteNebulaVertexConfig` is the configuration of the write vertex, as described below.

  |Parameter|Required|Description|
  |:---|:---|:---|
  |`withSpace`  |Yes|  Nebula Graph space name.  |
  |`withTag`  |Yes|  The Tag name that needs to be associated when a vertex is written.  |
  |`withVidField`  |Yes|  The column in the DataFrame as the vertex ID.  |
  |`withVidPolicy`  |No|  When writing the vertex ID, Nebula Graph 2.x use mapping function, supports HASH only. No mapping is performed by default.  |
  |`withVidAsProp`  |No|  Whether the column in the DataFrame that is the vertex ID is also written as an property. The default value is `false`. If set to `true`, make sure the Tag has the same property name as `VidField`.  |
  |`withUser`  |No|  Nebula Graph user name. If [authentication](7.data-security/1.authentication/1.authentication.md) is disabled, you do not need to configure the user name and password.   |
  |`withPasswd`  |No|  The password for the Nebula Graph user name.  |
  |`withBatch`  |Yes|  The number of rows of data written at a time. The default value is  `1000`.  |
  |`withWriteMode`|No|Write mode. The optional values are `insert` and `update`. The default value is `insert`.|

- `WriteNebulaEdgeConfig` is the configuration of the write edge, as described below.

  |Parameter|Required|Description|
  |:---|:---|:---|
  |`withSpace`  |Yes|  Nebula Graph space name.  |
  |`withEdge`  |Yes|  The Edge type name that needs to be associated when a edge is written.  |
  |`withSrcIdField`  |Yes|  The column in the DataFrame as the vertex ID.  |
  |`withSrcPolicy`  |No| When writing the starting vertex ID, Nebula Graph 2.x use mapping function, supports HASH only. No mapping is performed by default.   |
  |`withDstIdField`  |Yes| The column in the DataFrame that serves as the destination vertex.   |
  |`withDstPolicy`  |No| When writing the destination vertex ID, Nebula Graph 2.x use mapping function, supports HASH only. No mapping is performed by default.   |
  |`withRankField`  |No| The column in the DataFrame as the rank. Rank is not written by default.   |
  |`withSrcAsProperty`  |No| Whether the column in the DataFrame that is the starting vertex is also written as an property.  The default value is `false`. If set to `true`, make sure Edge type has the same property name as `SrcIdField`.   |
  |`withDstAsProperty`  |No| Whether column that are destination vertex in the DataFrame are also written as property. The default value is `false`. If set to `true`, make sure Edge type has the same property name as `DstIdField`.   |
  |`withRankAsProperty`  |No| Whether column in the DataFrame that is the rank is also written as property.The default value is `false`. If set to `true`, make sure Edge type has the same property name as `RankField`.   |
  |`withUser`  |No|  Nebula Graph user name. If [authentication](7.data-security/1.authentication/1.authentication.md) is disabled, you do not need to configure the user name and password.  |
  |`withPasswd`  |No|  The password for the Nebula Graph user name.  |
  |`withBatch`  |Yes|  The number of rows of data written at a time. The default value is  `1000`.  |
  |`withWriteMode`|No|Write mode. The optional values are `insert` and `update`. The default value is `insert`.|

