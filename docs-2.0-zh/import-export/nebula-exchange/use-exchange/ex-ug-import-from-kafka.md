# 导入 Kafka 数据

本文简单说明如何使用 Exchange 将存储在 Kafka 上的数据导入 {{nebula.name}} 。

!!! compatibility

    导入 Kafka 数据时请使用 Exchange 3.5.0/3.3.0/3.0.0 版本。3.4.0 版本增加了对导入数据的缓存，不支持流式数据导入。

## 环境配置

本文示例在 MacOS 下完成，以下是相关的环境配置信息：

- 硬件规格：
  - CPU：1.7 GHz Quad-Core Intel Core i7
  - 内存：16 GB

- Spark：2.4.7，单机版

-  {{nebula.name}} ：{{nebula.release}}。

## 前提条件

开始导入数据之前，用户需要确认以下信息：

- 已经[安装部署 {{nebula.name}} ](../../../4.deployment-and-installation/2.compile-and-install-nebula-graph/2.install-nebula-graph-by-rpm-or-deb.md) 并获取如下信息：

  - Graph 服务和 Meta 服务的的 IP 地址和端口。

  - 拥有 {{nebula.name}} 写权限的用户名和密码。

- 已经编译 Exchange。详情请参见[编译 Exchange](../ex-ug-compile.md)。本示例中使用 Exchange {{exchange.release}}。

- 已经安装 Spark。

- 以下 JAR 包已经下载并放置在 Spark 的`SPARK_HOME/jars`目录下：

  - [spark-streaming-kafka_xxx.jar](https://mvnrepository.com/artifact/org.apache.spark/spark-streaming-kafka)

  - [spark-sql-kafka-0-10_xxx.jar](https://mvnrepository.com/artifact/org.apache.spark/spark-sql-kafka-0-10)

  - [kafka-clients-xxx.jar](https://mvnrepository.com/artifact/org.apache.kafka/kafka-clients)

- 了解 {{nebula.name}} 中创建 Schema 的信息，包括 Tag 和 Edge type 的名称、属性等。

- 已经安装并开启 Kafka 服务。

## 注意事项

- 导入 Kafka 数据时只支持 Client 模式，即参数`tags.type.sink`和`edges.type.sink`的值为`client`。

- 导入 Kafka 数据时请勿使用 Exchange 3.4.0 版本，该版本增加了对导入数据的缓存，不支持流式数据导入。请使用 Exchange 3.0.0、3.3.0、3.5.0 版本。

## 操作步骤

### 步骤 1：在 {{nebula.name}} 中创建 Schema

分析数据，按以下步骤在 {{nebula.name}} 中创建 Schema：

1. 确认 Schema 要素。 {{nebula.name}} 中的 Schema 要素如下表所示。

    | 要素  | 名称 | 属性 |
    | :--- | :--- | :--- |
    | Tag | `player` | `name string, age int` |
    | Tag | `team` | `name string` |
    | Edge Type | `follow` | `degree int` |
    | Edge Type | `serve` | `start_year int, end_year int` |

2. 在 {{nebula.name}} 中创建一个图空间** basketballplayer**，并创建一个 Schema，如下所示。

    ```ngql
    ## 创建图空间
    nebula> CREATE SPACE basketballplayer \
            (partition_num = 10, \
            replica_factor = 1, \
            vid_type = FIXED_STRING(30));
    
    ## 选择图空间 basketballplayer
    nebula> USE basketballplayer;
    
    ## 创建 Tag player
    nebula> CREATE TAG player(name string, age int);
    
    ## 创建 Tag team
    nebula> CREATE TAG team(name string);
    
    ## 创建 Edge type follow
    nebula> CREATE EDGE follow(degree int);

    ## 创建 Edge type serve
    nebula> CREATE EDGE serve(start_year int, end_year int);
    ```

更多信息，请参见[快速开始](../../../2.quick-start/3.quick-start-on-premise/4.nebula-graph-crud.md)。

### 步骤 2：修改配置文件

编译 Exchange 后，复制`target/classes/application.conf`文件设置 Kafka 数据源相关的配置。在本示例中，复制的文件名为`kafka_application.conf`。各个配置项的详细说明请参见[配置说明](../parameter-reference/ex-ug-parameter.md)。

!!! note

    导入 Kafka 数据时，一个配置文件只能处理一个 Tag 或 Edge type。如果有多个 Tag 或 Edge type，需要创建多个配置文件。

```conf
{
  # Spark 相关配置
  spark: {
    app: {
      name: NebulaGraph Exchange {{exchange.release}}
    }
    driver: {
      cores: 1
      maxResultSize: 1G
    }
    cores: {
      max: 16
    }
  }

  # {{nebula.name}} 相关配置
  nebula: {
    address:{
      # 以下为 {{nebula.name}} 的 Graph 服务和 Meta 服务所在机器的 IP 地址及端口。
      # 如果有多个地址，格式为 "ip1:port","ip2:port","ip3:port"。
      # 不同地址之间以英文逗号 (,) 隔开。
      graph:["127.0.0.1:9669"]
      #任意一个 Meta 服务的地址。
      #如果您的 {{nebula.name}} 在虚拟网络中，如k8s，请配置 Leader Meta的地址。
      meta:["127.0.0.1:9559"]
    }
    # 填写的账号必须拥有 {{nebula.name}} 相应图空间的写数据权限。
    user: root
    pswd: nebula
    # 填写 {{nebula.name}} 中需要写入数据的图空间名称。
    space: basketballplayer
    connection: {
      timeout: 3000
      retry: 3
    }
    execution: {
      retry: 3
    }
    error: {
      max: 32
      output: /tmp/errors
    }
    rate: {
      limit: 1024
      timeout: 1000
    }
  }
  # 处理点
  tags: [
    # 设置 Tag player 相关信息。
    {
      # {{nebula.name}} 中对应的 Tag 名称。
      name: player
      type: {
        # 指定数据源文件格式，设置为 Kafka。
        source: kafka
        # 指定如何将数据导入 {{nebula.name}} 。只支持 Client。
        sink: client
      }
      # Kafka 服务器地址。
      service: "127.0.0.1:9092"
      # 消息类别。
      topic: "topic_name1"

      # 在 fields 里指定 Kafka value 中的字段名称，多个字段用英文逗号（,）隔开。Spark Structured Streaming 读取 Kafka 数据后会将其以 JSON 格式存储于 value 字段中，而这里的 fields 要配置 JSON 的 key 名。示例如下：
      fields: [personName, personAge]
      # 设置与 fields 中的 key 对应的 {{nebula.name}} 属性名，key 的 value 将保存为相应的属性值。下方设置会将 personName 的 value 保存到 {{nebula.name}} 中的 name 属性，personAge 的 value 则保存到 age 属性。
      nebula.fields: [name, age]

      # 指定表中某一列数据为 {{nebula.name}} 中点 VID 的来源。
      # 这里的值 key 和上面的 key 重复，表示 key 既作为 VID，也作为属性 name。
      vertex:{
          field:personId
      # udf:{
      #            separator:"_"
      #            oldColNames:[field-0,field-1,field-2]
      #            newColName:new-field
      #        }
      # 为 VID 增加指定的前缀。例如 VID 为 12345，增加前缀 tag1 后为 tag1_12345。下划线无法修改。
      # prefix:"tag1"
      # 对 string 类型的 VID 进行哈希化操作。
      # policy:hash
      }

      # 批量操作类型，包括 INSERT、UPDATE 和 DELETE。默认为 INSERT。
      #writeMode: INSERT

      # 单批次写入 {{nebula.name}} 的数据条数。
      batch: 10

      # 数据写入 {{nebula.name}} 时需要创建的分区数。
      partition: 10
      # 读取消息的间隔。单位：秒。
      interval.seconds: 10
      # 消费起点，默认值 latest。 可选 latest、earliest
      startingOffsets: latest
      # 流控，对每个触发区间处理的最大偏移量的速率限制，可不配置。
      # maxOffsetsPerTrigger:10000
    }
  ]
  # 处理边数据
  #edges: [
  #  # 设置 Edge type follow 相关信息
  #  {
  #    # {{nebula.name}} 中对应的 Edge type 名称。
  #    name: follow

  #    type: {
  #      # 指定数据源文件格式，设置为 Kafka。
  #      source: kafka

  #      # 指定边数据导入 {{nebula.name}} 的方式，
  #      # 指定如何将数据导入 {{nebula.name}} 。只支持 Client。
  #      sink: client
  #    }

  #    # Kafka 服务器地址。
  #    service: "127.0.0.1:9092"
  #    # 消息类别。
  #    topic: "topic_name3"

  #    # 在 fields 里指定 Kafka value 中的字段名称，多个字段用英文逗号（,）隔开。Spark Structured Streaming 读取 Kafka 数据后会将其以 JSON 格式存储于 value 字段中，而这里的 fields 要配置 JSON 的 key 名。示例如下：
  #    fields: [degree]
  #    # 设置与 fields 中的 key 对应的 {{nebula.name}} 属性名，key 的 value 将保存为相应的属性值。下方设置会将 degree 的 value 保存到 {{nebula.name}} 中的 degree 属性。
  #    nebula.fields: [degree]

  #    # 在 source 里，将 topic 中某一列作为边的起始点数据源。
  #    # 在 target 里，将 topic 中某一列作为边的目的点数据源。
  #    source:{
  #        field:srcPersonId
  #    # udf:{
  #    #            separator:"_"
  #    #            oldColNames:[field-0,field-1,field-2]
  #    #            newColName:new-field
  #    #        }
  #    # 为 VID 增加指定的前缀。例如 VID 为 12345，增加前缀 tag1 后为 tag1_12345。下划线无法修改。
  #    # prefix:"tag1"
  #    # 对 string 类型的 VID 进行哈希化操作。
  #    # policy:hash
  #    }

  #    target:{
  #        field:dstPersonId
  #    # udf:{
  #    #            separator:"_"
  #    #            oldColNames:[field-0,field-1,field-2]
  #    #            newColName:new-field
  #    #        }
  #    # 为 VID 增加指定的前缀。例如 VID 为 12345，增加前缀 tag1 后为 tag1_12345。下划线无法修改。
  #    # prefix:"tag1"
  #    # 对 string 类型的 VID 进行哈希化操作。
  #    # policy:hash
  #    }

  #    # 指定一个列作为 rank 的源（可选）。
  #    #ranking: rank

  #    # 批量操作类型，包括 INSERT、UPDATE 和 DELETE。默认为 INSERT。
  #    #writeMode: INSERT

  #    # 单批次写入 {{nebula.name}} 的数据条数。
  #    batch: 10

  #    # 数据写入 {{nebula.name}} 时需要创建的分区数。
  #    partition: 10

  #    # 读取消息的间隔。单位：秒。
  #    interval.seconds: 10
  #    # 消费起点，默认值 latest。 可选 latest、earliest
  #    startingOffsets: latest
  #    # 流控，对每个触发区间处理的最大偏移量的速率限制，可不配置。
  #    # maxOffsetsPerTrigger:10000
  #  }
  #]
}
```

### 步骤 3：向 {{nebula.name}} 导入数据

运行如下命令将 Kafka 数据导入到 {{nebula.name}} 中。关于参数的说明，请参见[导入命令参数](../parameter-reference/ex-ug-para-import-command.md)。

```bash
${SPARK_HOME}/bin/spark-submit --master "local" --class com.vesoft.nebula.exchange.Exchange <nebula-exchange-{{exchange.release}}.jar_path> -c <kafka_application.conf_path>
```

!!! note

    JAR 包有两种获取方式：[自行编译](../ex-ug-compile.md)或者从 maven 仓库下载。

示例：

```bash
${SPARK_HOME}/bin/spark-submit  --master "local" --class com.vesoft.nebula.exchange.Exchange  /root/nebula-exchange/nebula-exchange/target/nebula-exchange-{{exchange.release}}.jar  -c /root/nebula-exchange/nebula-exchange/target/classes/kafka_application.conf
```

用户可以在返回信息中搜索`batchSuccess.<tag_name/edge_name>`，确认成功的数量。例如`batchSuccess.follow: 300`。

### 步骤 4：（可选）验证数据

用户可以在 {{nebula.name}} 客户端（例如 NebulaGraph Studio）中执行查询语句，确认数据是否已导入。例如：

```ngql
LOOKUP ON player YIELD id(vertex);
```

用户也可以使用命令 [`SHOW STATS`](../../../3.ngql-guide/7.general-query-statements/6.show/14.show-stats.md) 查看统计数据。

### 步骤 5：（如有）在 {{nebula.name}} 中重建索引

导入数据后，用户可以在 {{nebula.name}} 中重新创建并重建索引。详情请参见[索引介绍](../../../3.ngql-guide/14.native-index-statements/README.md)。
