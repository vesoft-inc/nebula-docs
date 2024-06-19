# NebulaGraph Spark Connector

NebulaGraph Spark Connector is a Spark connector application for reading and writing NebulaGraph data in Spark standard format. NebulaGraph Spark Connector consists of two parts: Reader and Writer.

* Reader
  
  Provides a Spark SQL interface. This interface can be used to read NebulaGraph data. It reads one vertex or edge type data at a time and assemble the result into a Spark DataFrame.

* Writer

  Provides a Spark SQL interface. This interface can be used to write DataFrames into NebulaGraph in a row-by-row or batch-import way.

For more information, see [NebulaGraph Spark Connector](https://github.com/vesoft-inc/nebula-spark-connector/blob/{{sparkconnector.branch}}/README_CN.md).

## Version compatibility

The correspondence between the NebulaGraph Spark Connector version, the NebulaGraph core version and the Spark version is as follows.

| Spark Connector version | NebulaGraph version | Spark version |
|:----------|:-----------|:-------|
|nebula-spark-connector_3.0-3.0-SNAPSHOT.jar|	nightly|	3.x|
|nebula-spark-connector_2.2-3.0-SNAPSHOT.jar|	nightly|	2.2.x|
|nebula-spark-connector-3.0-SNAPSHOT.jar|	nightly|	2.4.x|
|nebula-spark-connector_3.0-3.8.0.jar| 3.x  | 3.x |
|nebula-spark-connector_2.2-3.8.0.jar| 3.x  | 2.2.x |
|nebula-spark-connector-3.8.0.jar    | 3.x  | 2.4.x |
|nebula-spark-connector_3.0-3.6.0.jar| 3.x  | 3.x |
|nebula-spark-connector_2.2-3.6.0.jar| 3.x  | 2.2.x |
|nebula-spark-connector-3.6.0.jar    | 3.x  | 2.4.x |
|nebula-spark-connector_2.2-3.4.0.jar|	3.x|	2.2.x|
|nebula-spark-connector-3.4.0.jar|	3.x|	2.4.x|
|nebula-spark-connector_2.2-3.3.0.jar|	3.x|	2.2.x|
|nebula-spark-connector-3.3.0.jar|	3.x|	2.4.x|
|nebula-spark-connector-3.0.0.jar|	3.x|	2.4.x|
|nebula-spark-connector-2.6.1.jar|	2.6.0, 2.6.1|	2.4.x|
|nebula-spark-connector-2.6.0.jar|	2.6.0, 2.6.1|	2.4.x|
|nebula-spark-connector-2.5.1.jar|	2.5.0, 2.5.1|	2.4.x|
|nebula-spark-connector-2.5.0.jar|	2.5.0, 2.5.1|	2.4.x|
|nebula-spark-connector-2.1.0.jar|	2.0.0, 2.0.1|	2.4.x|
|nebula-spark-connector-2.0.1.jar|	2.0.0, 2.0.1|	2.4.x|
|nebula-spark-connector-2.0.0.jar|	2.0.0, 2.0.1|	2.4.x|

## Use cases

NebulaGraph Spark Connector applies to the following scenarios:

- Read data from {{nebula.name}} for analysis and computation.
- Write data back to {{nebula.name}} after analysis and computation.
- Migrate the data of {{nebula.name}}.
- Graph computing with [NebulaGraph Algorithm](../graph-computing/nebula-algorithm.md).

## Benefits

The features of NebulaGraph Spark Connector {{sparkconnector.release}} are as follows:

* Supports multiple connection settings, such as timeout period, number of connection retries, number of execution retries, etc.

* Supports multiple settings for data writing, such as setting the corresponding column as vertex ID, starting vertex ID, destination vertex ID or attributes.

* Supports non-attribute reading and full attribute reading.

* Supports reading NebulaGraph data into VertexRDD and EdgeRDD, and supports non-Long vertex IDs.

* Unifies the extended data source of SparkSQL, and uses DataSourceV2 to extend NebulaGraph data.

* Three write modes, `insert`, `update` and `delete`, are supported. `insert` mode will insert (overwrite) data, `update` mode will only update existing data, and `delete` mode will only delete data.

## Release note

[Release](https://github.com/vesoft-inc/nebula-spark-connector/releases/tag/{{sparkconnector.tag}})

## Get NebulaGraph Spark Connector

### Compile and package



1. Clone repository `nebula-spark-connector`.

  ```bash
  $ git clone -b {{sparkconnector.branch}} https://github.com/vesoft-inc/nebula-spark-connector.git
  ```

2. Enter the `nebula-spark-connector` directory.

3. Compile and package. The procedure varies with Spark versions.

!!! note

        Spark of the corresponding version has been installed.

  - Spark 2.4

    ```bash
    $ mvn clean package -Dmaven.test.skip=true -Dgpg.skip -Dmaven.javadoc.skip=true -pl nebula-spark-connector -am -Pscala-2.11 -Pspark-2.4
    ```

  - Spark 2.2

    ```bash
    $ mvn clean package -Dmaven.test.skip=true -Dgpg.skip -Dmaven.javadoc.skip=true -pl nebula-spark-connector_2.2 -am -Pscala-2.11 -Pspark-2.2
    ```

  - Spark 3.x

    ```bash
    $ mvn clean package -Dmaven.test.skip=true -Dgpg.skip -Dmaven.javadoc.skip=true -pl nebula-spark-connector_3.0 -am -Pscala-2.12 -Pspark-3.0
    ```

After compilation, a file similar to `nebula-spark-connector-{{sparkconnector.release}}-SHANPSHOT.jar` is generated in the directory `target` of the folder.

### Download maven remote repository

[Download](https://repo1.maven.org/maven2/com/vesoft/nebula-spark-connector/)

## How to use

When using NebulaGraph Spark Connector to reading and writing NebulaGraph data, You can refer to the following code.

```scala
# Read vertex and edge data from NebulaGraph.
spark.read.nebula().loadVerticesToDF()
spark.read.nebula().loadEdgesToDF()
 
# Write dataframe data into NebulaGraph as vertex and edges.
dataframe.write.nebula().writeVertices()
dataframe.write.nebula().writeEdges()
```

`nebula()` receives two configuration parameters, including connection configuration and read-write configuration.

!!! note

    If the value of the properties contains Chinese characters, the encoding error may appear. Please add the following options when submitting the Spark task:

    ```
    --conf spark.driver.extraJavaOptions=-Dfile.encoding=utf-8
    --conf spark.executor.extraJavaOptions=-Dfile.encoding=utf-8
    ```

### Reading data from NebulaGraph

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
  .withUser("root")
  .withPasswd("nebula")
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
  .withUser("root")
  .withPasswd("nebula")
  .withSpace("test")
  .withLabel("knows")
  .withNoColumn(false)
  .withReturnCols(List("degree"))
  .withLimit(10)
  .withPartitionNum(10)
  .build()
val edge = spark.read.nebula(config, nebulaReadEdgeConfig).loadEdgesToDF()
```

- `NebulaConnectionConfig` is the configuration for connecting to NebulaGraph, as described below.

  |Parameter|Required|Description|
  |:---|:---|:---|
  |`withMetaAddress`  |Yes| Specifies the IP addresses and ports of all Meta Services. Separate multiple addresses with commas. The format is `ip1:port1,ip2:port2,...`. Read data is no need to configure `withGraphAddress`.  |
  |`withConnectionRetry`  |No| The number of retries that the NebulaGraph Java Client connected to NebulaGraph. The default value is `1`.  |
  |`withExecuteRetry`  |No| The number of retries that the NebulaGraph Java Client executed query statements. The default value is `1`.  |
  |`withTimeout`  |No| The timeout for the NebulaGraph Java Client request response. The default value is `6000`, Unit: ms.  |

- `ReadNebulaConfig` is the configuration to read NebulaGraph data, as described below.

  |Parameter|Required|Description|
  |:---|:---|:---|
  |`withUser`  |No|  NebulaGraph username. This parameter is required when the Storage services require authentication. This parameter is only supported in NebulaGraph Enterprise Edition.  |
  |`withPasswd`  |No|  The password for the NebulaGraph username. This parameter is required when the Storage services require authentication. This parameter is only supported in NebulaGraph Enterprise Edition.  |
  |`withSpace`  |Yes|  NebulaGraph space name.  |
  |`withLabel`  |Yes|   The Tag or Edge type name within the NebulaGraph space.  |
  |`withNoColumn`  |No|  Whether the property is not read. The default value is `false`, read property. If the value is `true`, the property is not read, the `withReturnCols` configuration is invalid.  |
  |`withReturnCols`  |No|  Configures the set of properties for vertex or edges to read. the format is `List(property1,property2,...)`, The default value is `List()`, indicating that all properties are read.  |
  |`withLimit`  |No|  Configure the number of rows of data read from the server by the NebulaGraph Java Storage Client at a time. The default value is `1000`.  |
  |`withPartitionNum`  |No|  Configures the number of Spark partitions to read the NebulaGraph data. The default value is `100`. This value should not exceed the number of slices in the graph space (partition_num).|

### Write data into NebulaGraph

!!! note

    - The values of columns in a DataFrame are automatically written to NebulaGraph as property values.
    - Make sure that the column names in the DataFrame are consistent with the property names in NebulaGraph. If they are inconsistent, you can use `DataFrame.withColumnRenamed` to rename the column names first.

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

The default write mode is `insert`, which can be changed to `update` or `delete` via `withWriteMode` configuration:

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
  |`withConnectionRetry`  |No| Number of retries that the NebulaGraph Java Client connected to NebulaGraph. The default value is `1`.  |

- `WriteNebulaVertexConfig` is the configuration of the write vertex, as described below.

  |Parameter|Required|Description|
  |:---|:---|:---|
  |`withSpace`  |Yes|  NebulaGraph space name.  |
  |`withTag`  |Yes|  The Tag name that needs to be associated when a vertex is written.  |
  |`withVidField`  |Yes|  The column in the DataFrame as the vertex ID.  |
  |`withVidPolicy`  |No|  When writing the vertex ID, NebulaGraph use mapping function, supports HASH only. No mapping is performed by default.  |
  |`withVidAsProp`  |No|  Whether the column in the DataFrame that is the vertex ID is also written as an property. The default value is `false`. If set to `true`, make sure the Tag has the same property name as `VidField`.  |
  |`withUser`  |No|  NebulaGraph username. If [authentication](7.data-security/1.authentication/1.authentication.md) is disabled, you do not need to configure the username and password.   |
  |`withPasswd`  |No|  The password for the NebulaGraph username.  |
  |`withBatch`  |Yes|  The number of rows of data written at a time. The default value is  `1000`.  |
  |`withWriteMode`|No|Write mode. The optional values are `insert`, `update` and `delete`. The default value is `insert`.|
  |`withDeleteEdge`|No|Whether to delete the related edges synchronously when deleting a vertex. The default value is `false`. It takes effect when `withWriteMode` is `delete`. |

- `WriteNebulaEdgeConfig` is the configuration of the write edge, as described below.

  |Parameter|Required|Description|
  |:---|:---|:---|
  |`withSpace`  |Yes|  NebulaGraph space name.  |
  |`withEdge`  |Yes|  The Edge type name that needs to be associated when a edge is written.  |
  |`withSrcIdField`  |Yes|  The column in the DataFrame as the vertex ID.  |
  |`withSrcPolicy`  |No| When writing the starting vertex ID, NebulaGraph use mapping function, supports HASH only. No mapping is performed by default.   |
  |`withDstIdField`  |Yes| The column in the DataFrame that serves as the destination vertex.   |
  |`withDstPolicy`  |No| When writing the destination vertex ID, NebulaGraph use mapping function, supports HASH only. No mapping is performed by default.   |
  |`withRankField`  |No| The column in the DataFrame as the rank. Rank is not written by default.   |
  |`withSrcAsProperty`  |No| Whether the column in the DataFrame that is the starting vertex is also written as an property.  The default value is `false`. If set to `true`, make sure Edge type has the same property name as `SrcIdField`.   |
  |`withDstAsProperty`  |No| Whether column that are destination vertex in the DataFrame are also written as property. The default value is `false`. If set to `true`, make sure Edge type has the same property name as `DstIdField`.   |
  |`withRankAsProperty`  |No| Whether column in the DataFrame that is the rank is also written as property.The default value is `false`. If set to `true`, make sure Edge type has the same property name as `RankField`.   |
  |`withUser`  |No|  NebulaGraph username. If [authentication](7.data-security/1.authentication/1.authentication.md) is disabled, you do not need to configure the username and password.  |
  |`withPasswd`  |No|  The password for the NebulaGraph username.  |
  |`withBatch`  |Yes|  The number of rows of data written at a time. The default value is  `1000`.  |
  |`withWriteMode`|No|Write mode. The optional values are `insert`, `update` and `delete`. The default value is `insert`.|
