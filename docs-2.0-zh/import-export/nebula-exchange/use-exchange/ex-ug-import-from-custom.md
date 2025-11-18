# 导入自定义数据源数据

本文以一个示例说明如何使用 Exchange 将自定义类型的数据源导入到 {{nebula.name}}。

## 自定义类型数据的具体定义

本文所指的自定义类型数据源，有如下含义：

- 引入新的数据源类型，官方会提供新增数据源的 JAR 包。

- 自定义开发现存数据源类型，比如修改默认的解析与读取逻辑。  

这里支持 Tag/Edge type 粒度的自定义配置，不同 Tag/Edge type 数据源配置不必相同。

而本文会通过开发一个 CSV 数据源插件例子，来使用户快速上手此功能。


## 前提条件

已经在测试环境正常运行[使用 Exchange 导入 CSV 文件数据示例](./ex-ug-import-from-csv.md)。

## 操作步骤

Exchange 和不同数据源的交互，有两个核心步骤：配置解析与数据读取。而这两部分已经通过接口的形式暴露给用户。

用户通过 Scala 单例对象 实现接口并在 Spark 应用启动的时候通过`--jars`参数上传 JAR 包，即可在运行时切换到自定义数据源模式。

### 步骤 1：实现配置解析接口

配置解析部分，对应[`DataSourceConfigResolver`](https://github.com/vesoft-inc/nebula-exchange/blob/master/exchange-common/src/main/scala/com/vesoft/exchange/common/plugin/DataSourceConfigResolver.scala)接口。

```scala
// 部分代码
abstract class DataSourceConfigResolver {
  def getDataSourceConfigEntry(category: SourceCategory.Value,
                               config: Config,
                               nebulaConfig: Config): DataSourceConfigEntry = {
    val customConfig = config.getConfig("custom")
    val readerClazz  = customConfig.getString("reader")
    CustomSourceConfigEntry(category,readerClazz,config,nebulaConfig)
  }
}
```

其中`getDataSourceConfigEntry`方法的入参如下：

- `category`：Tag/Edge type 粒度的数据源类型。
- `config`：Tag/Edge type 粒度的数据源的配置项。
- `nebulaConfig`：{{nebula.name}} 服务的配置项。

接口已经提供了默认的解析逻辑，也就是从配置项的`custom`字段中获取用户自定义配置，内容如下：

- `reader`：数据读取部分的自定义解析类的全类名。
- 其他配置字段：任意需要的自定义字段，可选。

此方法最终返回一个`DataSourceConfigEntry`实例，其封装了数据源的各种配置信息，并指定数据源读取的具体实现类。

一个实现示例如下：

```scala
object ConfigResolverImpl extends DataSourceConfigResolver{
  override def getDataSourceConfigEntry(category: SourceCategory.Value, config: Config, nebulaConfig: Config): DataSourceConfigEntry = {
    super.getDataSourceConfigEntry(category, config, nebulaConfig)
  }
}
```

用户也可以根据具体需求，使用自定义解析逻辑来覆盖现有实现。

### 步骤 2：实现数据读取接口

数据读取部分，对应[`DataSourceCustomReader`](https://github.com/vesoft-inc/nebula-exchange/blob/master/exchange-common/src/main/scala/com/vesoft/exchange/common/plugin/DataSourceCustomReader.scala)接口。

```scala
// 部分代码
abstract class  DataSourceCustomReader {
  def readData(session:SparkSession,config:DataSourceConfigEntry,fields:List[String]):Option[DataFrame]
}
```

其中`readData`方法的入参如下：

- `session`：`SparkSession`实例。
- `config`：步骤 1 中返回的`DataSourceConfigEntry`对象。
- `fields`：数据源的字段集合，通常并不需要关注此参数。如果用户需要用到字段信息，除了此参数外，亦可在 Reader 部分自行解析出需要的字段信息。

实现过程中，用户依旧可以参考 Exchange 中内置的各种 Reader 来实现自己的 Reader。比如下面的例子，只需要将配置项的所有解析均放到 CSVReader 内部实现即可。

```scala
object CustomReaderImpl extends DataSourceCustomReader {
  override def readData(session: SparkSession, config: DataSourceConfigEntry, fields: List[String]): Option[DataFrame] = {
    val csvConfig = config.asInstanceOf[CustomSourceConfigEntry]
    val reader = new CSVReader(session, csvConfig)
    Some(reader.read())
  }
}
```

### 步骤 3：修改配置文件

对于 CSV 文件示例，用户只需要在 Tag/Edge type 的配置做如下修改：

- 修改`type.source`：指定为`custom`。
- 新增`configResolver`：指定配置解析类。
- 新增`custom`：自定义配置集合，同时内部必须指定数据源读取类。

一个完整的配置示例如下：

```conf
{
  # Spark 相关配置
  spark: {
    app: {
      name: {{nebula.name}} Exchange 3.8.0
    }
    driver: {
      cores: 1
      maxResultSize: 1G
    }
    executor: {
        memory:1G
    }

    cores: {
      max: 16
    }
  }

  # {{nebula.name}} 相关配置
  nebula: {
    address:{
      graph:["host.docker.internal:9669"]
      meta:["host.docker.internal:9559"]
    }

    # 指定拥有 {{nebula.name}} 写权限的用户名和密码。
    user: root
    pswd: 123456
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
      # 指定 {{nebula.name}} 中定义的 Tag 名称。
      name: player
      type: {
        # 指定数据源，使用 CSV。
        # source: csv
        source: custom
        # 指定如何将点数据导入 {{nebula.name}} ：Client 或 SST。
        sink: client
      }

      configResolver: com.vesoft.nebula.exchange.plugin.fileBase.ConfigResolverImpl
      path: "file:///opt/spark/data/vertex_player.csv"

      fields: [_c1, _c2]

      nebula.fields: [age, name]

      vertex: {
        field:_c0
      }
      # `custom`字段配置
      custom: {
        reader: com.vesoft.nebula.exchange.plugin.fileBase.CustomReaderImpl
        separator: ","
        header: false
      }

      # 指定单批次写入 {{nebula.name}} 的最大点数量。
      batch: 256

      # 数据写入 {{nebula.name}} 时需要创建的分区数。
      partition: 32
    }

    # 设置 Tag team 相关信息。
    {
      name: team
      type: {
        source: csv
        sink: client
      }
      #path: "hdfs://192.168.*.*:9000/data/vertex_team.csv"
      path: "file:///opt/spark/data/vertex_team.csv"
      fields: [_c1]
      nebula.fields: [name]
      vertex: {
        field:_c0
      }
      separator: ","
      header: false
      batch: 256
      partition: 32
    }
    # 如果需要添加更多点，请参考前面的配置进行添加。
  ]
  # 处理边
  edges: [
    # 设置 Edge type follow 相关信息。
    {
      # 指定 {{nebula.name}} 中定义的 Edge type 名称。
      name: follow
      type: {
        source: csv
        sink: client
      }

      path: "file:///opt/spark/data/edge_follow.csv"

      fields: [_c2]

      nebula.fields: [degree]

      source: {
        field: _c0
      }
      target: {
        field: _c1
      }

      # 指定的分隔符。默认值为英文逗号（,）。
      separator: ","

      header: false

      batch: 256

      # 数据写入 {{nebula.name}} 时需要创建的分区数。
      partition: 32
    }

    # 设置 Edge type serve 相关信息。
    {
      name: serve
      type: {
        source: csv
        sink: client
      }
      #path: "hdfs://192.168.*.*:9000/data/edge_serve.csv"
      path: "file:///opt/spark/data/edge_serve.csv"
      fields: [_c2,_c3]
      nebula.fields: [start_year, end_year]
      source: {
        field: _c0
      }
      target: {
        field: _c1
      }
      separator: ","
      header: false
      batch: 256
      partition: 32
    }

  ]
}
```

### 步骤 4：向 {{nebula.name}} 导入数据

运行如下命令，使用自定义数据源模式将 CSV 文件数据导入到 {{nebula.name}} 中。关于参数的说明，请参见[导入命令参数](../parameter-reference/ex-ug-para-import-command.md)。

```bash
${SPARK_HOME}/bin/spark-submit --master "local" --class com.vesoft.nebula.exchange.Exchange --jars <custom-plugin.jar_path> <nebula-exchange.jar_path> -c <csv_application.conf_path> 
```

如果用户需要上传多个 JAR 包，需要将多个 JAR 包路径用逗号隔开。

用户可以在返回信息中搜索`batchSuccess.<tag_name/edge_name>`，确认成功的数量。例如`batchSuccess.follow: 300`。

### 步骤 5：（可选）验证数据

用户可以在 {{nebula.name}} 客户端（例如 NebulaGraph Studio）中执行查询语句，确认数据是否已导入。例如：

```ngql
LOOKUP ON player YIELD id(vertex);
```

用户也可以使用命令 [SHOW STATS](../../../3.ngql-guide/7.general-query-statements/6.show/14.show-stats.md) 查看统计数据。
