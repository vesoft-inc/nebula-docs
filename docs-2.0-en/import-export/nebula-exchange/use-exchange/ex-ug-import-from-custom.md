# Import data from custom data sources

This topic provides an example to illustrate how to use Exchange to import a custom-type data source into {{nebula.name}}.

## The specific definition of custom type data

The custom-type data sources referred to in this topic have the following meanings:

- Introduction of new data source types, for which the official team provides corresponding JAR packages.
- Custom development of existing data source types, such as modifying the default parsing and reading logic.

Custom configurations are applied at the Tag/Edge Type granularity, and the data source configurations for different Tags/Edge Types do not need to be the same.

This topic demonstrates this functionality by developing a CSV data source plugin example, helping users get started quickly.

## Prerequisites

Successfully completed: [Import data from CSV files](./ex-ug-import-from-csv.md) in your test environment.

## Steps

There are two core steps for Exchange to interact with different data sources: configuration parsing and data reading. These steps have been exposed to users in the form of interfaces.

Users can implement these interfaces through Scala singleton objects and upload JAR packages using the `--jars` parameter when starting a Spark application, allowing Exchange to switch to custom data source mode at runtime.

### Step 1: Implement configuration parsing interface

The configuration parsing part corresponds to the [DataSourceConfigResolver](https://github.com/vesoft-inc/nebula-exchange/blob/master/exchange-common/src/main/scala/com/vesoft/exchange/common/plugin/DataSourceConfigResolver.scala) interface.

```scala
// Part of the code
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

The parameters of the `getDataSourceConfigEntry` method are as follows:

- `category`: Data source type at the Tag/EdgeType granularity.
- `config`: Configuration items of the data source at the Tag/EdgeType granularity.
- `nebulaConfig`: Configuration items of the {{nebula.name}} service.

The interface provides default parsing logic, which retrieves user-defined configurations from the custom field in the configuration. It includes the following content:

- `reader`: The fully qualified class name of the custom parser class for data reading.
- Other configuration fields: Any required custom fields (optional).

This method ultimately returns a `DataSourceConfigEntry` instance, which encapsulates various configuration information of the data source and specifies the concrete implementation class for data reading.

The following is an example implementation:

```scala
object ConfigResolverImpl extends DataSourceConfigResolver{
  override def getDataSourceConfigEntry(category: SourceCategory.Value, config: Config, nebulaConfig: Config): DataSourceConfigEntry = {
    super.getDataSourceConfigEntry(category, config, nebulaConfig)
  }
}
```

Users can also customize the parsing logic according to specific requirements to override the existing implementation.

### Step 2: Implement the CustomReader Interface

The data reading part corresponds to the [`DataSourceCustomReader`](https://github.com/vesoft-inc/nebula-exchange/blob/master/exchange-common/src/main/scala/com/vesoft/exchange/common/plugin/DataSourceCustomReader.scala) interface.

```scala
// Part of the code
abstract class  DataSourceCustomReader {
  def readData(session:SparkSession,config:DataSourceConfigEntry,fields:List[String]):Option[DataFrame]
}
```

The `readData` method accepts the following parameters:

- `session`: A SparkSession instance.
- `config`: The `DataSourceConfigEntry` returned in Step 1.
- `fields`: A list of fields from the data source. This parameter is generally not required. If users need field information, they can parse the required fields themselves within the Reader section, aside from using this parameter.

During implementation, users can still refer to various built-in Readers in Exchange to implement their own Reader. For example, in the code below, all configuration parsing is handled internally by the CSVReader:

```scala
object CustomReaderImpl extends DataSourceCustomReader {
  override def readData(session: SparkSession, config: DataSourceConfigEntry, fields: List[String]): Option[DataFrame] = {
    val csvConfig = config.asInstanceOf[CustomSourceConfigEntry]
    val reader = new CSVReader(session, csvConfig)
    Some(reader.read())
  }
}
```

### Step 3: Modify configuration files

For the CSV file example, users only need to make the following modifications in the Tag/Edge Type configuration:

- Modify `type.source`: Set it to `custom`.
- Add `configResolver`: Specify the configuration parsing class.
- Add `custom`: A custom configuration set, which must internally specify the data source reading class.

```conf
{
  # Spark configuration
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

  # {{nebula.name}} configuration
  nebula: {
    address:{
      graph:["host.docker.internal:9669"]
      meta:["host.docker.internal:9559"]
    }

    # The account entered must have write permission for the {{nebula.name}} space.
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

  # Processing vertexes
  tags: [
    # Set the information about the Tag player.
    {
      # Specify the Tag name defined in {{nebula.name}}.
      name: player
      type: {
        # Specify the data source file format to CSV.
        source: custom
        # Specify how to import the data into {{nebula.name}}: Client or SST.
        sink: client
      }

      configResolver: com.vesoft.nebula.exchange.plugin.fileBase.ConfigResolverImpl
      path: "file:///opt/spark/data/vertex_player.csv"

      fields: [_c1, _c2]

      nebula.fields: [age, name]

      vertex: {
        field:_c0
      }
      # `custom` configuration
      custom: {
        reader: com.vesoft.nebula.exchange.plugin.fileBase.CustomReaderImpl
        separator: ","
        header: false
      }

      batch: 256

      partition: 32
    }

     # Set the information about the Tag Team.
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
  ]
  # Processing edges
  edges: [
    # Set the information about the Edge Type follow.
    {
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

      separator: ","

      header: false

      batch: 256

      partition: 32
    }
    #   Set the information about the Edge Type serve.
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

### Step 4: Import data into {{nebula.name}}

Run the following command to import CSV data into {{nebula.name}} in custom data source mode. For descriptions of the parameters, see [Options for import](../parameter-reference/ex-ug-para-import-command.md).

```bash
${SPARK_HOME}/bin/spark-submit --master "local" --class com.vesoft.nebula.exchange.Exchange --jars <custom-plugin.jar_path> <nebula-exchange.jar_path> -c <csv_application.conf_path> 
```

If users need to upload multiple JAR packages, they should separate the JAR file paths with commas.

You can search for `batchSuccess.<tag_name/edge_name>` in the command output to check the number of successful operations. For example, `batchSuccess.follow: 300`.

### Step 5: (optional) Validate data

Users can verify that data has been imported by executing a query in the {{nebula.name}} client (for example, NebulaGraph Studio). For example:

```ngql
LOOKUP ON player YIELD id(vertex);
```

Users can also run the [SHOW STATS](../../../3.ngql-guide/7.general-query-statements/6.show/14.show-stats.md) command to view statistics.