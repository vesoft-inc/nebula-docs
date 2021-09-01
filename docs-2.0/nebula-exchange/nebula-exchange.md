# Nebula Exchange

[Nebula Exchange](https://github.com/vesoft-inc/nebula-spark-utils/tree/v2.0.0/nebula-exchange) (hereinafter referred to as Exchange) is an Apache Spark&trade; application for migrating data into Nebula Graph from distributed systems. Exchange supports the migration of migrating batch data and stream data of different formats.

<!--
For more information, see [What is Nebula Exchange](https://github.com/vesoft-inc/nebula-spark-utils/blob/v2.0.0/nebula-exchange/doc-2.0/EN/about-exchange/ex-ug-what-is-exchange.md). 
-->

## Use cases

Exchange applies to transforming the following data into vertices and edges in [Nebula Graph](../1.introduction/1.what-is-nebula-graph.md):

* Stream data stored in Kafka or Pulsar, including Logs, online shopping records, online game player activities, social network information, financial trading data, and geospatial service data.
* Telemeasuring data recorded by equipment connected to IDCs.
* Batch data stored in relational databases such as MySQL or distributed file systems such as HDFS.

## Benefits

* Adaptable. Exchange supports importing data with many different formats and sources into the Nebula Graph for easy data migration.

* Supports SST import. Exchange can transform data from different sources into SST files for importing.

  !!! note

        SST import is only supported on Linux.

* Supports breakpoint continuous transmission. To save time and improve efficiency, Exchange can continue the data transmission after the transmission is stopped.

  !!! note

        For now, breakpoint continuous transmission is only supported when importing Neo4j data.

* Asynchronous operations. Exchange generates a writing statement and then sends it to the Graph Service for data insertion.

* Flexible. Exchange supports importing data with multiple tags and edge types that originated from different data formats or sources.

* Supports statistics. Exchange uses Apache Spark&trade; Accumulators to make statistics for successful and failed insertion operations.

* Easy to use. Exchange applies the Human-Optimized Config Object Notation (HOCON) format for configuration files. HOCON is object-oriented and easy to understand and use.

## Data formats and origins

Exchange 2.0 can migrate data with the following formats or origins.

* Data stored in HDFS, including: 
  - Apache Parquet
  - Apache ORC
  - JSON
  - CSV

* Apache HBase&trade;

* Data warehouse: Hive

* Graph database: Neo4j

* Relational database: MySQL

* Event streaming platform: Apache Kafka&reg;

* Message publishing/subscribing platform: Apache Pulsar 2.4.5
