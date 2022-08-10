# Limitations

This topic describes some of the limitations of using Exchange 3.x.

## Version compatibility

The correspondence between the NebulaGraphExchange release (the JAR version) and the NebulaGraph core release is as follows.

|Exchange client|NebulaGraph|
|:---|:---|
|3.0-SNAPSHOT|nightly|
|{{exchange.release}}|{{nebula.release}}|
|2.6.x|2.6.x       |  
|2.5.x|2.5.x       |
|2.1.0|2.0.0, 2.0.1|
|2.0.1|2.0.0, 2.0.1|
|2.0.0|2.0.0, 2.0.1|

JAR packages are available in two ways: [compile them yourself](../ex-ug-compile.md) or download them from the Maven repository.

If you are using NebulaGraph 1.x, use [NebulaGraphExchange 1.x](https://github.com/vesoft-inc/nebula-java/tree/v1.0/tools "Click to go to GitHub").

## Environment

Exchange 3.x supports the following operating systems:

- CentOS 7
- macOS

## Software dependencies

To ensure the healthy operation of Exchange, ensure that the following software has been installed on the machine:

- Java version 1.8

- Scala version 2.10.7, 2.11.12, or 2.12.10

- Apache Spark. The requirements for Spark versions when using Exchange to export data from data sources are as follows. In the following table, Y means that the corresponding Spark version is supported, and N means not supported.

  !!! note
        Use the correct Exchange JAR file based on the Spark version. For example, for Spark version 2.4, use nebula-exchange_spark_2.4-{{exchange.release}}.jar.

  | Data source | Spark 2.2 | Spark 2.4 | Spark 3 |
  | - | - | - | - |
  | CSV file | Y | N | Y |
  | JSON file | Y | Y | Y |
  | ORC file | Y | Y | Y |
  | Parquet file | Y | Y | Y |
  | HBase | Y | Y | Y |
  | MySQL | Y | Y | Y |
  | PostgreSQL | Y | Y | Y |
  | ClickHouse | Y | Y | Y |
  | Neo4j | N | Y | N |
  | Hive | Y | Y | Y |
  | MaxCompute | N | Y | N |
  | Pulsar | N | Y | Untested |
  | Kafka | N | Y | Untested |
  | NebulaGraph | N | Y | N |

Hadoop Distributed File System (HDFS) needs to be deployed in the following scenarios:

- Migrate HDFS data
- Generate SST files
