# Limitations

This article introduces the limitations of Exchange v1.x.

## Supported Nebula Graph versions

Exchange v1.x supports Nebula Graph v1.x only. If you are using Nebula Graph v2.x, please use [Nebula Exchange v2.x](https://github.com/vesoft-inc/nebula-spark-utils/tree/master/nebula-exchange "Click to go to GitHub").

## Supported operation systems

You can use Exchange v1.x in these operation systems:

- CentOS 7
- Mac OS

## Software dependencies

To make sure that Exchange v1.x works properly, make sure that these software applications are installed in your machine:

- Apache Spark: 2.3.0 or later versions

- Java: 1.8

- Scala: 2.10.7, 2.11.12, or 2.12.10

In these scenarios, Hadoop Distributed File System (HDFS) must be deployed:

- Importing data from HDFS to Nebula Graph

- Importing SST files into Nebula Graph
