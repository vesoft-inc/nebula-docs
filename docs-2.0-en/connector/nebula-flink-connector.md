
# NebulaGraph Flink Connector

NebulaGraph Flink Connector is a connector that helps Flink users quickly access NebulaGraph. NebulaGraph Flink Connector supports reading data from the NebulaGraph database or writing other external data to the NebulaGraph database.

For more information, see [NebulaGraph Flink Connector](https://github.com/vesoft-inc/nebula-flink-connector).

## Use cases

NebulaGraph Flink Connector applies to the following scenarios:

- Read data from {{nebula.name}} for analysis and computation.
- Write data back to {{nebula.name}} after analysis and computation.
- Migrate the data of {{nebula.name}}.

## Release note

[Release](https://github.com/vesoft-inc/nebula-flink-connector/releases/tag/{{flinkconnector.tag}})

## Version compatibility

The correspondence between the NebulaGraph Flink Connector version and the NebulaGraph core version is as follows.

| Flink Connector version | NebulaGraph version |
|:----------|:-----------|
|     3.0-SNAPSHOT        |     nightly    |
|       3.8.0             |  3.x.x         |
|       3.5.0             |  3.x.x         |
|       3.3.0             |  3.x.x         |
|       3.0.0             |  3.x.x         |
|       2.6.1             |  2.6.0, 2.6.1  |
|       2.6.0             |  2.6.0, 2.6.1  |
|       2.5.0             |  2.5.0, 2.5.1  |
|       2.0.0             |  2.0.0, 2.0.1  |

## Prerequisites

- Java 8 or later is installed.
- Flink 1.11.x is installed.

## Get NebulaGraph Flink Connector

### Configure Maven dependency

Add the following dependency to the Maven configuration file `pom.xml` to automatically obtain the Flink Connector.

```xml
<dependency>
    <groupId>com.vesoft</groupId>
    <artifactId>nebula-flink-connector</artifactId>
    <version>{{flinkconnector.release}}</version>
</dependency>
```

### Compile and package

Follow the steps below to compile and package the Flink Connector.

1. Clone repository `nebula-flink-connector`.

  ```bash
  $ git clone -b {{flinkconnector.branch}} https://github.com/vesoft-inc/nebula-flink-connector.git
  ```

2. Enter the `nebula-flink-connector` directory.

3. Compile and package.

  ```bash
  $ mvn clean package -Dmaven.test.skip=true
  ```

After compilation, a file similar to `nebula-flink-connector-{{flinkconnector.release}}.jar` is generated in the directory `connector/target` of the folder.

## How to use

### Write data into NebulaGraph

```java
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
NebulaClientOptions nebulaClientOptions = new NebulaClientOptions.NebulaClientOptionsBuilder()
                .setGraphAddress("127.0.0.1:9669")
                .setMetaAddress("127.0.0.1:9559")
                .build();
NebulaGraphConnectionProvider graphConnectionProvider = new NebulaGraphConnectionProvider(nebulaClientOptions);
NebulaMetaConnectionProvider metaConnectionProvider = new NebulaMetaConnectionProvider(nebulaClientOptions);

VertexExecutionOptions executionOptions = new VertexExecutionOptions.ExecutionOptionBuilder()
                .setGraphSpace("flinkSink")
                .setTag("player")
                .setIdIndex(0)
                .setFields(Arrays.asList("name", "age"))
                .setPositions(Arrays.asList(1, 2))
                .setBatchSize(2)
                .build();

NebulaVertexBatchOutputFormat outputFormat = new NebulaVertexBatchOutputFormat(
                graphConnectionProvider, metaConnectionProvider, executionOptions);
NebulaSinkFunction<Row> nebulaSinkFunction = new NebulaSinkFunction<>(outputFormat);
DataStream<Row> dataStream = playerSource.map(row -> {
            Row record = new org.apache.flink.types.Row(row.size());
            for (int i = 0; i < row.size(); i++) {
                record.setField(i, row.get(i));
            }
            return record;
        });
dataStream.addSink(nebulaSinkFunction);
env.execute("write nebula")
```

### Read data from NebulaGraph

```java
NebulaClientOptions nebulaClientOptions = new NebulaClientOptions.NebulaClientOptionsBuilder()
        .setMetaAddress("127.0.0.1:9559")
        .build();
storageConnectionProvider = new NebulaStorageConnectionProvider(nebulaClientOptions);
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
env.setParallelism(1);

VertexExecutionOptions vertexExecutionOptions = new VertexExecutionOptions.ExecutionOptionBuilder()
        .setGraphSpace("flinkSource")
        .setTag("person")
        .setNoColumn(false)
        .setFields(Arrays.asList())
        .setLimit(100)
        .build();

NebulaSourceFunction sourceFunction = new NebulaSourceFunction(storageConnectionProvider)
        .setExecutionOptions(vertexExecutionOptions);
DataStreamSource<BaseTableRow> dataStreamSource = env.addSource(sourceFunction);
dataStreamSource.map(row -> {
    List<ValueWrapper> values = row.getValues();
    Row record = new Row(15);
    record.setField(0, values.get(0).asLong());
    record.setField(1, values.get(1).asString());
    record.setField(2, values.get(2).asString());
    record.setField(3, values.get(3).asLong());
    record.setField(4, values.get(4).asLong());
    record.setField(5, values.get(5).asLong());
    record.setField(6, values.get(6).asLong());
    record.setField(7, values.get(7).asDate());
    record.setField(8, values.get(8).asDateTime().getUTCDateTimeStr());
    record.setField(9, values.get(9).asLong());
    record.setField(10, values.get(10).asBoolean());
    record.setField(11, values.get(11).asDouble());
    record.setField(12, values.get(12).asDouble());
    record.setField(13, values.get(13).asTime().getUTCTimeStr());
    record.setField(14, values.get(14).asGeography());
    return record;
}).print();
env.execute("NebulaStreamSource");
```

### Parameter descriptions

- `NebulaClientOptions` is the configuration for connecting to NebulaGraph, as described below.

  |Parameter|Type|Required|Description|
  |:---|:---|:---|:---|
  |`setGraphAddress` |String |Yes |  The Graph service address of NebulaGraph. |
  |`setMetaAddress` | String|Yes | The Meta service address of NebulaGraph. |

- `VertexExecutionOptions` is the configuration for reading vertices from and writing vertices to NebulaGraph, as described below.

  |Parameter|Type|Required|Description|
  |:---|:---|:---|:---|
  |`setGraphSpace` |String |Yes | The graph space name. |
  |`setTag` |String |Yes | The tag name. |
  |`setIdIndex` |Int |Yes | The subscript of the stream data field that is used as the VID when writing data to NebulaGraph.  |
  |`setFields`  |List|Yes | A collection of the property names of a tag. It is used to write data to or read data from NebulaGraph.</br> Make sure the `setNoColumn` is `false` when reading data; otherwise, the configuration is invalid.</br> If this parameter is empty, all properties are read when reading data from NebulaGraph. |
  |`setPositions` |List |Yes | A collection of the subscripts of the stream data fields. It indicates that the corresponding field values are written to NebulaGraph as property values. This parameter needs to correspond to `setFields`.  |
  |`setBatchSize` |String |No | The maximum number of data records to write to NebulaGraph at a time. The default value is `2000`.  |
  |`setNoColumn` |String |No | The properties are not to be read if set to `true` when reading data. The default value is `false`. |
  |`setLimit`  |String| No| The maximum number of data records to pull at a time when reading data. The default value is `2000`.  |

- `EdgeExecutionOptions` is the configuration for reading edges from and writing edges to NebulaGraph, as described below.

  |Parameter|Type|Required|Description|
  |:---|:---|:---|:---|
  |`setGraphSpace`  |String| Yes| The graph space name.  |
  |`setEdge`  |String |Yes | The edge type name. |
  |`setSrcIndex`  |Int| Yes| The subscript of the stream data field that is used as the VID of the source vertex when writing data to NebulaGraph. |
  |`setDstIndex`  |Int| Yes| The subscript of the stream data field that is used as the VID of the destination vertex when writing data to NebulaGraph. |
  |`setRankIndex` |Int| Yes| The subscript of the stream data field that is used as the rank of the edge when writing data to NebulaGraph. |
  |`setFields`  |List| Yes| A collection of the property names of an edge type. It is used to write data to or read data from NebulaGraph.</br> Make sure the `setNoColumn` is `false` when reading data; otherwise, the configuration is invalid.</br> If this parameter is empty, all properties are read when reading data from NebulaGraph. |
  |`setPositions`  |List |Yes | A collection of the subscripts of the stream data fields. It indicates that the corresponding field values are written to NebulaGraph as property values. This parameter needs to correspond to `setFields`.   |
  |`setBatchSize`  |String |No | The maximum number of data records to write to NebulaGraph at a time. The default value is `2000`.  |
  |`setNoColumn`  |String |No | The properties are not to be read if set to `true` when reading data. The default value is `false`. |
  |`setLimit`  |String| No| The maximum number of data records to pull at a time when reading data. The default value is `2000`.  |

## Example

1. Create a graph space.

  ```java
  NebulaCatalog nebulaCatalog = NebulaCatalogUtils.createNebulaCatalog(
          "NebulaCatalog",
          "default",
          "root",
          "nebula",
          "127.0.0.1:9559",
          "127.0.0.1:9669");
  
  EnvironmentSettings settings = EnvironmentSettings.newInstance()
          .inStreamingMode()
          .build();
  TableEnvironment tableEnv = TableEnvironment.create(settings);
  
  tableEnv.registerCatalog(CATALOG_NAME, nebulaCatalog);
  tableEnv.useCatalog(CATALOG_NAME);
  
  String createDataBase = "CREATE DATABASE IF NOT EXISTS `db1`"
          + " COMMENT 'space 1'"
          + " WITH ("
          + " 'partition_num' = '100',"
          + " 'replica_factor' = '3',"
          + " 'vid_type' = 'FIXED_STRING(10)'"
          + ")";
  tableEnv.executeSql(createDataBase);
  ```

2. Create a tag.

  ```java
  tableEnvironment.executeSql("CREATE TABLE `person` ("
          + " vid BIGINT,"
          + " col1 STRING,"
          + " col2 STRING,"
          + " col3 BIGINT,"
          + " col4 BIGINT,"
          + " col5 BIGINT,"
          + " col6 BIGINT,"
          + " col7 DATE,"
          + " col8 TIMESTAMP,"
          + " col9 BIGINT,"
          + " col10 BOOLEAN,"
          + " col11 DOUBLE,"
          + " col12 DOUBLE,"
          + " col13 TIME,"
          + " col14 STRING"
          + ") WITH ("
          + " 'connector' = 'nebula',"
          + " 'meta-address' = '127.0.0.1:9559',"
          + " 'graph-address' = '127.0.0.1:9669',"
          + " 'username' = 'root',"
          + " 'password' = 'nebula',"
          + " 'data-type' = 'vertex',"
          + " 'graph-space' = 'flink_test',"
          + " 'label-name' = 'person'"
          + ")"
  );
  ```

3. Create an edge type.

  ```java
  tableEnvironment.executeSql("CREATE TABLE `friend` ("
          + " sid BIGINT,"
          + " did BIGINT,"
          + " rid BIGINT,"
          + " col1 STRING,"
          + " col2 STRING,"
          + " col3 BIGINT,"
          + " col4 BIGINT,"
          + " col5 BIGINT,"
          + " col6 BIGINT,"
          + " col7 DATE,"
          + " col8 TIMESTAMP,"
          + " col9 BIGINT,"
          + " col10 BOOLEAN,"
          + " col11 DOUBLE,"
          + " col12 DOUBLE,"
          + " col13 TIME,"
          + " col14 STRING"
          + ") WITH ("
          + " 'connector' = 'nebula',"
          + " 'meta-address' = '127.0.0.1:9559',"
          + " 'graph-address' = '127.0.0.1:9669',"
          + " 'username' = 'root',"
          + " 'password' = 'nebula',"
          + " 'graph-space' = 'flink_test',"
          + " 'label-name' = 'friend',"
          + " 'data-type'='edge',"
          + " 'src-id-index'='0',"
          + " 'dst-id-index'='1',"
          + " 'rank-id-index'='2'"
          + ")"
  );
  ```

4. Queries the data of an edge type and inserts it into another edge type.

  ```java
  Table table = tableEnvironment.sqlQuery("SELECT * FROM `friend`");
  table.executeInsert("`friend_sink`").await();
  ```
