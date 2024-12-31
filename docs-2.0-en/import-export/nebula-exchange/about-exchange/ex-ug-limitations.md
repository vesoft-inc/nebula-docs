# Limitations

This topic describes some of the limitations of using Exchange 3.x.

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

        Use the correct Exchange JAR file based on the Spark version. For example, for Spark version 2.4, use nebula-exchange_spark_2.4-{{exchange.release}}.jar. For the JAR files corresponding to different Spark versions, see [Version Compatibility Matrix](https://github.com/vesoft-inc/nebula-exchange?tab=readme-ov-file#version-compatibility-matrix).

  | Data source | Spark 2.2 | Spark 2.4 | Spark 3 |
  | - | - | - | - |
  | CSV file | Y | N | Y |
  | JSON file | Y | Y | Y |
  | ORC file | Y | Y | Y |
  | Parquet file | Y | Y | Y |
  | HBase | Y | Y | Y |
  | MySQL | Y | Y | Y |
  | PostgreSQL | Y | Y | Y |
  | Oracle | Y | Y | Y |
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
