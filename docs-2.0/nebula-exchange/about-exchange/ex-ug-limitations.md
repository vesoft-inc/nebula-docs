# Limitations

This topic describes some of the limitations of using Exchange 2.x.

## Nebula Graph releases

The correspondence between the Nebula Exchange release (the JAR version) and the Nebula Graph release is as follows.

|Exchange client|Nebula Graph|
|:---|:---|
|2.5-SNAPSHOT|v2-nightly|
|{{exchange.release}}|{{nebula.release}}|
|2.1.0|2.0.0, 2.0.1|
|2.0.1|2.0.0, 2.0.1|
|2.0.0|2.0.0, 2.0.1|

JAR packages are available in two ways: [compile them yourself](../ex-ug-compile.md) or download them from the Maven repository.

If you are using Nebula Graph 1.x, use [Nebula Exchange 1.x](https://github.com/vesoft-inc/nebula-java/tree/v1.0/tools "Click to go to GitHub").

## Environment

Exchange 2.x supports the following operating systems:

- CentOS 7
- macOS

## Software depend on

To ensure the normal operation of Exchange, ensure that the following software has been installed on the machine:

- Apache Spark: 2.4.x

- Java: 1.8

- Scala: 2.10.7, 2.11.12 or 2.12.10

Hadoop Distributed File System (HDFS) needs to be deployed in the following scenarios:

- Migrate HDFS data
- Generate SST file
