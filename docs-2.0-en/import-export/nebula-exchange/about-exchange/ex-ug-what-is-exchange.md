# What is NebulaGraph Exchange

[NebulaGraph Exchange](https://github.com/vesoft-inc/nebula-exchange) (Exchange) is an Apache Spark&trade; application for bulk migration of cluster data to NebulaGraph in a distributed environment, supporting batch and streaming data migration in a variety of formats.

Exchange consists of Reader, Processor, and Writer. After Reader reads data from different sources and returns a DataFrame, the Processor iterates through each row of the DataFrame and obtains the corresponding value based on the mapping between `fields` in the configuration file. After iterating through the number of rows in the specified batch, Writer writes the captured data to the NebulaGraph at once. The following figure illustrates the process by which Exchange completes the data conversion and migration.

![NebulaGraph&reg; Exchange consists of Reader, Processor, and Writer that can migrate data from a variety of formats and sources to NebulaGraph](https://docs-cdn.nebula-graph.com.cn/figures/ex-ug-003.png)

## Editions

Exchange has two editions, the Community Edition and the Enterprise Edition. The Community Edition is open source developed on [GitHub](https://github.com/vesoft-inc/nebula-exchange). The Enterprise Edition supports not only the functions of the Community Edition but also adds additional features. For details, see [Comparisons](https://nebula-graph.com.cn/pricing/).

## Scenarios

Exchange applies to the following scenarios:

- Streaming data from Kafka and Pulsar platforms, such as log files, online shopping data, activities of game players, information on social websites, financial transactions or geospatial services, and telemetry data from connected devices or instruments in the data center, are required to be converted into the vertex or edge data of the property graph and import them into the NebulaGraph database.

- Batch data, such as data from a time period, needs to be read from a relational database (such as MySQL) or a distributed file system (such as HDFS), converted into vertex or edge data for a property graph, and imported into the NebulaGraph database.

- A large volume of data needs to be generated into SST files that NebulaGraph can recognize and then imported into the NebulaGraph database.

- The data saved in NebulaGraph needs to be exported.

  !!! enterpriseonly

        Exporting the data saved in NebulaGraph is supported by Exchange Enterprise Edition only.

## Advantages

Exchange has the following advantages:

- High adaptability: It supports importing data into the NebulaGraph database in a variety of formats or from a variety of sources, making it easy to migrate data.

- SST import: It supports converting data from different sources into SST files for data import.

- SSL encryption: It supports establishing the SSL encryption between Exchange and NebulaGraph to ensure data security.

- Resumable data import: It supports resumable data import to save time and improve data import efficiency.

  !!! note

        Resumable data import is currently supported when migrating Neo4j data only.

- Asynchronous operation: An insert statement is generated in the source data and sent to the Graph service. Then the insert operation is performed.

- Great flexibility: It supports importing multiple Tags and Edge types at the same time. Different Tags and Edge types can be from different data sources or in different formats.

- Statistics: It uses the accumulator in Apache Spark&trade; to count the number of successful and failed insert operations.

- Easy to use: It adopts the Human-Optimized Config Object Notation (HOCON) configuration file format and has an object-oriented style, which is easy to understand and operate.

## Version compatibility

Exchange supports Spark versions 2.2.x, 2.4.x, and 3.x.x, which are named `nebula-exchange_spark_2.2`, `nebula-exchange_spark_2.4`, and `nebula-exchange_spark_3.0` for different Spark versions.

The correspondence between the NebulaGraph Exchange version (the JAR version), the NebulaGraph core version and the Spark version is as follows.

| Exchange version | NebulaGraph version | Spark version |
|:----------|:-----------|:-------|
|nebula-exchange_spark_3.0-3.0-SNAPSHOT.jar|  nightly       |3.3.x、3.2.x、3.1.x、3.0.x |
|nebula-exchange_spark_2.4-3.0-SNAPSHOT.jar|  nightly       |2.4.x |
|nebula-exchange_spark_2.2-3.0-SNAPSHOT.jar|  nightly       |2.2.x |
|nebula-exchange_spark_3.0-3.4.0.jar       |  3.x.x         |3.3.x、3.2.x、3.1.x、3.0.x |
|nebula-exchange_spark_2.4-3.4.0.jar       |  3.x.x         |2.4.x |
|nebula-exchange_spark_2.2-3.4.0.jar       |  3.x.x         |2.2.x |
|nebula-exchange_spark_3.0-3.3.0.jar       |  3.x.x         |3.3.x、3.2.x、3.1.x、3.0.x|
|nebula-exchange_spark_2.4-3.3.0.jar       |  3.x.x         |2.4.x |
|nebula-exchange_spark_2.2-3.3.0.jar       |  3.x.x         |2.2.x |
|nebula-exchange_spark_3.0-3.0.0.jar       |  3.x.x         |3.3.x、3.2.x、3.1.x、3.0.x|
|nebula-exchange_spark_2.4-3.0.0.jar       |  3.x.x         |2.4.x |
|nebula-exchange_spark_2.2-3.0.0.jar       |  3.x.x         |2.2.x |
|nebula-exchange-2.6.3.jar                 |  2.6.1、2.6.0  |2.4.x |
|nebula-exchange-2.6.2.jar                 |  2.6.1、2.6.0  |2.4.x |
|nebula-exchange-2.6.1.jar                 |  2.6.1、2.6.0  |2.4.x |
|nebula-exchange-2.6.0.jar                 |  2.6.1、2.6.0  |2.4.x |
|nebula-exchange-2.5.2.jar                 |  2.5.1、2.5.0  |2.4.x |
|nebula-exchange-2.5.1.jar                 |  2.5.1、2.5.0  |2.4.x |
|nebula-exchange-2.5.0.jar                 |  2.5.1、2.5.0  |2.4.x |
|nebula-exchange-2.1.0.jar                 |  2.0.1、2.0.0  |2.4.x |
|nebula-exchange-2.0.1.jar                 |  2.0.1、2.0.0  |2.4.x |
|nebula-exchange-2.0.0.jar                 |  2.0.1、2.0.0  |2.4.x |

## Data source

Exchange {{exchange.release}} supports converting data from the following formats or sources into vertexes and edges that NebulaGraph can recognize, and then importing them into NebulaGraph in the form of nGQL statements:

- Data stored in HDFS or locally:
  - [Apache Parquet](../use-exchange/ex-ug-import-from-parquet.md)
  - [Apache ORC](../use-exchange/ex-ug-import-from-orc.md)
  - [JSON](../use-exchange/ex-ug-import-from-json.md)
  - [CSV](../use-exchange/ex-ug-import-from-csv.md)

- [Apache HBase&trade;](../use-exchange/ex-ug-import-from-hbase.md)

- Data repository:

  - [Hive](../use-exchange/ex-ug-import-from-hive.md)
  - [MaxCompute](../use-exchange/ex-ug-import-from-maxcompute.md)

- Graph database: [Neo4j](../use-exchange/ex-ug-import-from-neo4j.md) (Client version 2.4.5-M1)

- Relational database:
  - [MySQL](../use-exchange/ex-ug-import-from-mysql.md)
  - [PostgreSQL](../use-exchange/ex-ug-import-from-mysql.md)
  - [Oracle](../use-exchange/ex-ug-import-from-oracle.md)

- Column database: [ClickHouse](../use-exchange/ex-ug-import-from-clickhouse.md)

- Stream processing software platform: [Apache Kafka&reg;](../use-exchange/ex-ug-import-from-kafka.md)

- Publish/Subscribe messaging platform: [Apache Pulsar 2.4.5](../use-exchange/ex-ug-import-from-pulsar.md)

- [JDBC](../use-exchange/ex-ug-import-from-jdbc.md)

In addition to importing data as nGQL statements, Exchange supports generating SST files for data sources and then [importing SST](../use-exchange/ex-ug-import-from-sst.md) files via Console.

## Release note

[Release](https://github.com/vesoft-inc/nebula-exchange/releases/tag/{{exchange.tag}})
