# NebulaGraph Flink Connector

NebulaGraph Flink Connector 是一款帮助 Flink 用户快速访问{{nebula.name}}的连接器，支持从{{nebula.name}}图数据库中读取数据，或者将其他外部数据源读取的数据写入{{nebula.name}}图数据库。

## 适用场景

NebulaGraph Flink Connector 适用于以下场景：

- 读取{{nebula.name}}数据进行分析计算。
- 分析计算完的数据写入{{nebula.name}}。
- 迁移数据。

## 更新说明

[Release notes](https://github.com/vesoft-inc/nebula-flink-connector/releases/tag/{{flinkconnector.tag}})

## 版本兼容性

NebulaGraph Flink Connector 和{{nebula.name}}内核版本对应关系如下。

| Flink Connector 版本 | {{nebula.name}}版本 |
|:----------|:-----------|
|     3.0-SNAPSHOT        |  nightly       |
|       3.8.0             |  3.x.x         |
|       3.5.0             |  3.x.x         |
|       3.3.0             |  3.x.x         |
|       3.0.0             |  3.x.x         |
|       2.6.1             |  2.6.0、2.6.1  |
|       2.6.0             |  2.6.0、2.6.1  |
|       2.5.0             |  2.5.0、2.5.1  |
|       2.0.0             |  2.0.0、2.0.1  |

## 前提条件

- 已安装 Java 8 或更高版本。
- 已安装 Flink 1.11.x。

## 获取 NebulaGraph Flink Connector

### 设置 Maven 依赖

在 Maven 的配置文件`pom.xml`里添加以下依赖自动获取 Flink Connector.

```xml
<dependency>
    <groupId>com.vesoft</groupId>
    <artifactId>nebula-flink-connector</artifactId>
    <version>{{flinkconnector.release}}</version>
</dependency>
```

### 编译打包

按照以下步骤自行编译打包 Flink Connector。

1. 克隆仓库`nebula-flink-connector`。

  ```bash
  $ git clone -b {{flinkconnector.branch}} https://github.com/vesoft-inc/nebula-flink-connector.git
  ```

2. 进入目录`nebula-flink-connector`。

3. 编译打包。

  ```bash
  $ mvn clean package -Dmaven.test.skip=true
  ```

编译完成后，在目录的文件夹`connector/target`下生成类似文件`nebula-flink-connector-{{flinkconnector.release}}.jar`。

## 使用方法

### 向{{nebula.name}}写入数据

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

### 从{{nebula.name}}读取数据

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

### 参数说明

- `NebulaClientOptions`是连接{{nebula.name}}的配置，说明如下。

  |参数|类型|是否必须|说明|
  |:---|:---|:---|:---|
  |`setGraphAddress` |String |是 | {{nebula.name}} Graph 服务地址。 |
  |`setMetaAddress` | String|是 | {{nebula.name}} Meta 服务地址。 |

- `VertexExecutionOptions`是执行点读写的配置，说明如下。

  |参数|类型|是否必须|说明|
  |:---|:---|:---|:---|
  |`setGraphSpace` |String |是 | 图空间名称。 |
  |`setTag` |String |是 | Tag 名称。 |
  |`setIdIndex` |Int |是 | 向{{nebula.name}}写入数据时作为 VID 的流数据字段下标。  |
  |`setFields`  |List|是 | Tag 的属性名集合。用于向{{nebula.name}}写入数据或从{{nebula.name}}读取数据。</br>读取时需要确保`setNoColumn`为`false`，否则配置无效。</br>读取时本参数为空，表示读取所有属性。  |
  |`setPositions` |List |是 | 流数据字段下标的集合。表示将对应的字段值作为属性值写入{{nebula.name}}。需要和`setFields`一一对应。  |
  |`setBatchSize` |String |否 | 每次写入{{nebula.name}}的最大数据记录条数。默认值为`2000`。  |
  |`setNoColumn` |String |否 | 读取数据时设置为`true`则不会读取属性。默认值为`false`。 |
  |`setLimit`  |String| 否| 读取数据时每次拉取的最大数据记录条数。默认值为`2000`。  |

- `EdgeExecutionOptions`是执行边读写的配置，说明如下。

  |参数|类型|是否必须|说明|
  |:---|:---|:---|:---|
  |`setGraphSpace`  |String| 是| 图空间名称。  |
  |`setEdge`  |String |是 | Edge type 名称。 |
  |`setSrcIndex`  |Int| 是| 向{{nebula.name}}写入数据时作为起始点 VID 的流数据字段下标。 |
  |`setDstIndex`  |Int| 是| 向{{nebula.name}}写入数据时作为目的点 VID 的流数据字段下标。 |
  |`setRankIndex` |Int| 是| 向{{nebula.name}}写入数据时作为边的 Rank 的流数据字段下标。 |
  |`setFields`  |List| 是| Edge type 属性名集合。用于向{{nebula.name}}写入数据或从{{nebula.name}}读取数据。</br>读取时需要确保`setNoColumn`为`false`，否则配置无效。</br>读取时本参数为空，表示读取所有属性。 |
  |`setPositions`  |List |是 | 流数据字段下标的集合。表示将对应的字段值作为属性值写入{{nebula.name}}。需要和`setFields`一一对应。  |
  |`setBatchSize`  |String |否 | 每次写入{{nebula.name}}的最大数据记录条数。默认值为`2000`。  |
  |`setNoColumn`  |String |否 | 读取数据时设置为`true`则不会读取属性。默认值为`false`。 |
  |`setLimit`  |String| 否| 读取数据时每次拉取的最大数据记录条数。默认值为`2000`。  |

## 示例

1. 创建图空间。

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

2. 创建 Tag。

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

3. 创建 Edge type。

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

4. 查询边数据并插入到另一个边类型中。

  ```java
  Table table = tableEnvironment.sqlQuery("SELECT * FROM `friend`");
  table.executeInsert("`friend_sink`").await();
  ```