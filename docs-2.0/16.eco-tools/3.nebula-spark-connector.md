# Nebula Spark Connector

Nebula Spark Connector is a Spark connector application for reading and writing Nebula Graph data in Spark standard format. Nebula Spark Connector consists of two parts: Reader and Writer.

* Reader
  
  Provides a Spark SQL interface. This interface can be used to read Nebula Graph data. It reads one vertex or edge type data at a time and assemble the result into a Spark DataFrame.

* Writer

  Provides a Spark SQL interface. This interface can be used to write DataFrames into Nebula Graph in a row-by-row or batch-import way.

For more information, see [Nebula Spark Connector](https://github.com/vesoft-inc/nebula-spark-utils/blob/v2.0.0/nebula-spark-connector/README.md).

## Use cases

Nebula Spark Connector applies to the following scenarios:

* Migrate data between different Nebula Graph clusters.

* Migrate data between different graph spaces in the same Nebula Graph cluster.

* Migrate data between Nebula Graph and other data sources.

## Benefits

* Supports multiple connection settings, such as timeout period, number of connection retries, number of execution retries, etc.

* Supports multiple settings for data writing, such as setting the corresponding column as vertex ID, starting vertex ID, destination vertex ID or attributes.

* Supports non-attribute reading and full attribute reading.

* Supports reading Nebula Graph data into VertexRDD and EdgeRDD, and supports non-Long vertex IDs.

* Nebula Spark Connector 2.0 unifies the extended data source of SparkSQL, and uses DataSourceV2 to extend Nebula Graph data.
