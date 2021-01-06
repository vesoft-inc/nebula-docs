# FAQ

**What version of Nebula Graph does Exchange v1.x support?**

Read [Limitations](ex-ug-limitations.md) to get the latest information about supported Nebula Graph versions.

**What is the difference between Exchange and Spark Writer?**

Both are Spark applications, and Exchange is based on Spark Writer. Both of them are designed for the migration of data into a Nebula Graph cluster in a distributed environment, but the later maintenance work will focus on Exchange. Compared with Spark Writer, Exchange has the following improvements:

- Supporting more data sources, such as MySQL, Neo4j, HIVE, HBase, Kafka, and Pulsar.

- Some problems with Spark Writer were fixed. For example, by default Spark reads source data from HDFS as strings, which is probably different from your graph schema defined in Nebula Graph. Exchange supports automatically matching and converting data types. With it, when a non-string data type is defined in Nebula Graph, Exchange converts the strings into data of the required data type.
