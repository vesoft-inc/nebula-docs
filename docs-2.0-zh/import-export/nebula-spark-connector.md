# NebulaGraph Spark Connector

NebulaGraph Spark Connector 是一个 Spark 连接器，提供通过 Spark 标准形式读写 {{nebula.name}} 数据的能力。NebulaGraph Spark Connector 由 Reader 和 Writer 两部分组成。

- Reader
  
  提供一个 Spark SQL 接口，用户可以使用该接口编程读取 {{nebula.name}} 图数据，单次读取一个点或 Edge type 的数据，并将读取的结果组装成 Spark 的 DataFrame。

- Writer

  提供一个 Spark SQL 接口，用户可以使用该接口编程将 DataFrame 格式的数据逐条或批量写入 {{nebula.name}} 。

更多使用说明请参见 [NebulaGraph Spark Connector](https://github.com/vesoft-inc/nebula-spark-connector/blob/{{sparkconnector.branch}}/README_CN.md)。

## 版本兼容性

NebulaGraph Spark Connector、 {{nebula.name}} 内核版本和 Spark 版本对应关系如下。

| Spark Connector 版本 |  {{nebula.name}} 版本 | Spark 版本 |
|:----------|:-----------|:-------|
|nebula-spark-connector_3.0-3.0-SNAPSHOT.jar|	nightly|	3.x|
|nebula-spark-connector_2.2-3.0-SNAPSHOT.jar|	nightly|	2.2.x|
|nebula-spark-connector-3.0-SNAPSHOT.jar|	nightly|	2.4.x|
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

## 适用场景

NebulaGraph Spark Connector 适用于以下场景：

- 在不同的 {{nebula.name}} 集群之间迁移数据。

- 在同一个 {{nebula.name}} 集群内不同图空间之间迁移数据。

-  {{nebula.name}} 与其他数据源之间迁移数据。

- 结合 [NebulaGraph Algorithm](../graph-computing/nebula-algorithm.md) 进行图计算。

## 特性

NebulaGraph Spark Connector {{sparkconnector.release}}版本特性如下：

- 提供多种连接配置项，如超时时间、连接重试次数、执行重试次数等。

- 提供多种数据配置项，如写入数据时设置对应列为点 ID、起始点 ID、目的点 ID 或属性。

- Reader 支持无属性读取和全属性读取。

- Reader 支持将 {{nebula.name}} 数据读取成 Graphx 的 VertexRDD 和 EdgeRDD，支持非 Long 型点 ID。

- 统一了 SparkSQL 的扩展数据源，统一采用 DataSourceV2 进行 {{nebula.name}} 数据扩展。

- 支持`insert`、`update`和`delete`三种写入模式。`insert`模式会插入（覆盖）数据，`update`模式仅会更新已存在的数据，`delete`模式只删除数据。

- 支持与 {{nebula.name}} 之间的 SSL 加密连接。

## 更新说明

[Release notes](https://github.com/vesoft-inc/nebula-spark-connector/releases/tag/{{sparkconnector.tag}})

## 获取 NebulaGraph Spark Connector

### 编译打包

1. 克隆仓库`nebula-spark-connector`。

  ```bash
  $ git clone -b {{sparkconnector.branch}} https://github.com/vesoft-inc/nebula-spark-connector.git
  ```

2. 进入目录`nebula-spark-connector`。

3. 编译打包。不同版本的 Spark 命令略有不同。

  !!! note

        需已安装对应版本 Spark。

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

编译完成后，在目录的文件夹`target`下生成类似文件`nebula-spark-connector-{{sparkconnector.release}}-SHANPSHOT.jar`。

### Maven 远程仓库下载

[下载地址](https://repo1.maven.org/maven2/com/vesoft/nebula-spark-connector/)

## 使用方法

使用 NebulaGraph Spark Connector 读写 {{nebula.name}} 时，只需要编写以下代码即可实现。

```scala
# 从 {{nebula.name}} 读取点边数据。
spark.read.nebula().loadVerticesToDF()
spark.read.nebula().loadEdgesToDF()
 
# 将 dataframe 数据作为点和边写入 {{nebula.name}} 中。
dataframe.write.nebula().writeVertices()
dataframe.write.nebula().writeEdges()
```

`nebula()`接收两个配置参数，包括连接配置和读写配置。

### 从 {{nebula.name}} 读取数据

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

- `NebulaConnectionConfig`是连接 {{nebula.name}} 的配置，说明如下。

  |参数|是否必须|说明|
  |:---|:---|:---|
  |`withMetaAddress`  |是| 所有 Meta 服务的地址，多个地址用英文逗号（,）隔开，格式为`ip1:port1,ip2:port2,...`。读取数据不需要配置`withGraphAddress`。  |
  |`withConnectionRetry`  |否| NebulaGraph Java Client 连接 {{nebula.name}} 的重试次数。默认值为`1`。  |
  |`withExecuteRetry`  |否| NebulaGraph Java Client 执行查询语句的重试次数。默认值为`1`。  |
  |`withTimeout`  |否| NebulaGraph Java Client 请求响应的超时时间。默认值为`6000`，单位：毫秒（ms）。  |

- `ReadNebulaConfig`是读取 {{nebula.name}} 数据的配置，说明如下。

  |参数|是否必须|说明|
  |:---|:---|:---|
  |`withSpace`  |是|   {{nebula.name}} 图空间名称。  |
  |`withLabel`  |是|   {{nebula.name}} 图空间内的 Tag 或 Edge type 名称。  |
  |`withNoColumn`  |否|  是否不读取属性。默认值为`false`，表示读取属性。取值为`true`时，表示不读取属性，此时`withReturnCols`配置无效。  |
  |`withReturnCols`  |否|  配置要读取的点或边的属性集。格式为`List(property1,property2,...)`，默认值为`List()`，表示读取全部属性。  |
  |`withLimit`  |否|  配置 NebulaGraph Java Storage Client 一次从服务端读取的数据行数。默认值为 1000。  |
  |`withPartitionNum`  |否|  配置读取 {{nebula.name}} 数据时 Spark 的分区数。默认值为 100。该值的配置最好不超过图空间的的分片数量（partition_num）。|

### 向 {{nebula.name}} 写入数据

!!! note

    DataFrame 中的列会自动作为属性写入 {{nebula.name}} 。

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
  .withBatch(512)
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
  .withBatch(512)
  .build()
df.write.nebula(config, nebulaWriteEdgeConfig).writeEdges()
```

默认写入模式为`insert`，可以通过`withWriteMode`配置修改为`update`或`delete`：

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
  .withBatch(512)
  .withWriteMode(WriteMode.UPDATE)
  .build()
df.write.nebula(config, nebulaWriteVertexConfig).writeVertices()
```

- `NebulaConnectionConfig`是连接 {{nebula.name}} 的配置，说明如下。

  |参数|是否必须|说明|
  |:---|:---|:---|
  |`withMetaAddress`  |是| 所有 Meta 服务的地址，多个地址用英文逗号（,）隔开，格式为`ip1:port1,ip2:port2,...`。 |
  |`withGraphAddress`  |是| Graph 服务的地址，多个地址用英文逗号（,）隔开，格式为`ip1:port1,ip2:port2,...`。 |
  |`withConnectionRetry`  |否| NebulaGraph Java Client 连接 {{nebula.name}} 的重试次数。默认值为`1`。  |

- `WriteNebulaVertexConfig`是写入点的配置，说明如下。

  |参数|是否必须|说明|
  |:---|:---|:---|
  |`withSpace`  |是|   {{nebula.name}} 图空间名称。  |
  |`withTag`  |是|  写入点时需要关联的 Tag 名称。  |
  |`withVidField`  |是|  DataFrame 中作为点 ID 的列。  |
  |`withVidPolicy`  |否|  写入点 ID 时，采用的映射函数，{{nebula.name}} 仅支持 HASH。默认不做映射。  |
  |`withVidAsProp`  |否|  DataFrame 中作为点 ID 的列是否也作为属性写入。默认值为`false`。如果配置为`true`，请确保 Tag 中有和`VidField`相同的属性名。  |
  |`withUser`  |否|   {{nebula.name}} 用户名。若未开启[身份验证](../7.data-security/1.authentication/1.authentication.md)，无需配置用户名和密码。   |
  |`withPasswd`  |否|   {{nebula.name}} 用户名对应的密码。  |
  |`withBatch`  |是|  一次写入的数据行数，默认值为`512`。当`withWriteMode`为`update`时，该参数的最大值为`512`。  |
  |`withWriteMode`|否|写入模式。可选值为`insert`、`update`和`delete`。默认为`insert`。|
  |`withDeleteEdge`|否|删除点时是否删除该点关联的边。默认为`false`。当`withWriteMode`为`delete`时生效。 |

- `WriteNebulaEdgeConfig`是写入边的配置，说明如下。

  |参数|是否必须|说明|
  |:---|:---|:---|
  |`withSpace`  |是|   {{nebula.name}} 图空间名称。  |
  |`withEdge`  |是|  写入边时需要关联的 Edge type 名称。  |
  |`withSrcIdField`  |是|  DataFrame 中作为起始点的列。  |
  |`withSrcPolicy`  |否| 写入起始点时，采用的映射函数，{{nebula.name}} 仅支持 HASH。默认不做映射。   |
  |`withDstIdField`  |是| DataFrame 中作为目的点的列。   |
  |`withDstPolicy`  |否| 写入目的点时，采用的映射函数，{{nebula.name}} 仅支持 HASH。默认不做映射。   |
  |`withRankField`  |否| DataFrame 中作为 rank 的列。默认不写入 rank。   |
  |`withSrcAsProperty`  |否| DataFrame 中作为起始点的列是否也作为属性写入。默认值为`false`。如果配置为`true`，请确保 Edge type 中有和`SrcIdField`相同的属性名。   |
  |`withDstAsProperty`  |否| DataFrame 中作为目的点的列是否也作为属性写入。默认值为`false`。如果配置为`true`，请确保 Edge type 中有和`DstIdField`相同的属性名。   |
  |`withRankAsProperty`  |否| DataFrame 中作为 rank 的列是否也作为属性写入。默认值为`false`。如果配置为`true`，请确保 Edge type 中有和`RankField`相同的属性名。   |
  |`withUser`  |否|   {{nebula.name}} 用户名。若未开启[身份验证](../7.data-security/1.authentication/1.authentication.md)，无需配置用户名和密码。  |
  |`withPasswd`  |否|   {{nebula.name}} 用户名对应的密码。  |
  |`withBatch`  |是| 一次写入的数据行数，默认值为`512`。当`withWriteMode`为`update`时，该参数的最大值为`512`。  |
  |`withWriteMode`|否|写入模式。可选值为`insert`、`update`和`delete`。默认为`insert`。|

### 示例代码

详细的使用方式参见 [示例代码](https://github.com/vesoft-inc/nebula-spark-connector/tree/{{sparkconnector.branch}}/example/src/main/scala/com/vesoft/nebula/examples/connector)。
