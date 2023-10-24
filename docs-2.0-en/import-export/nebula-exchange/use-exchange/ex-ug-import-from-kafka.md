# Import data from Kafka

This topic provides a simple guide to importing Data stored on Kafka into NebulaGraph using Exchange.

!!! compatibility

    Please use Exchange 3.5.0/3.3.0/3.0.0 when importing Kafka data. In version 3.4.0, caching of imported data was added, and streaming data import is not supported.
    
## Environment

This example is done on MacOS. Here is the environment configuration information:

- Hardware specifications:
  - CPU: 1.7 GHz Quad-Core Intel Core i7
  - Memory: 16 GB

- Spark: 2.4.7, stand-alone

- NebulaGraph: {{nebula.release}}. [Deploy NebulaGraph with Docker Compose](../../../2.quick-start/1.quick-start-workflow.md).

## Prerequisites

Before importing data, you need to confirm the following information:

- NebulaGraph has been [installed](../../../4.deployment-and-installation/2.compile-and-install-nebula-graph/2.install-nebula-graph-by-rpm-or-deb.md) and deployed with the following information:

  - IP addresses and ports of Graph and Meta services.

  - The user name and password with write permission to NebulaGraph.

- Exchange has been [compiled](../ex-ug-compile.md), or [download](https://repo1.maven.org/maven2/com/vesoft/nebula-exchange/) the compiled `.jar` file directly.

- Spark has been installed.

- The following JAR files have been downloaded and placed in the directory `SPARK_HOME/jars` of Spark:

  - [spark-streaming-kafka_xxx.jar](https://mvnrepository.com/artifact/org.apache.spark/spark-streaming-kafka)

  - [spark-sql-kafka-0-10_xxx.jar](https://mvnrepository.com/artifact/org.apache.spark/spark-sql-kafka-0-10)

  - [kafka-clients-xxx.jar](https://mvnrepository.com/artifact/org.apache.kafka/kafka-clients)

- Learn about the Schema created in NebulaGraph, including names and properties of Tags and Edge types, and more.

- The Kafka service has been installed and started.

## Precautions

- Only client mode is supported when importing Kafka data, i.e. the value of parameters `tags.type.sink` and `edges.type.sink` is `client`.

- When importing Kafka data, do not use Exchange version 3.4.0, which adds caching of imported data and does not support streaming data import. Use Exchange versions 3.0.0, 3.3.0, or 3.5.0.

## Steps

### Step 1: Create the Schema in NebulaGraph

Analyze the data to create a Schema in NebulaGraph by following these steps:

1. Identify the Schema elements. The Schema elements in the NebulaGraph are shown in the following table.

    | Element  | Name | Property |
    | :--- | :--- | :--- |
    | Tag | `player` | `name string, age int` |
    | Tag | `team` | `name string` |
    | Edge Type | `follow` | `degree int` |
    | Edge Type | `serve` | `start_year int, end_year int` |

2. Create a graph space **basketballplayer** in the NebulaGraph and create a Schema as shown below.

    ```ngql
    ## Create a graph space.
    nebula> CREATE SPACE basketballplayer \
            (partition_num = 10, \
            replica_factor = 1, \
            vid_type = FIXED_STRING(30));
    
    ## Use the graph space basketballplayer.
    nebula> USE basketballplayer;
    
    ## Create the Tag player.
    nebula> CREATE TAG player(name string, age int);
    
    ## Create the Tag team.
    nebula> CREATE TAG team(name string);
    
    ## Create the Edge type follow.
    nebula> CREATE EDGE follow(degree int);

    ## Create the Edge type serve.
    nebula> CREATE EDGE serve(start_year int, end_year int);
    ```

For more information, see [Quick start workflow](../../../2.quick-start/1.quick-start-workflow.md).

### Step 2: Modify configuration files

!!! note

    If some data is stored in Kafka's value field, you need to modify the source code, get the value from Kafka, parse the value through the from_JSON function, and return it as a Dataframe.

After Exchange is compiled, copy the conf file `target/classes/application.conf` to set Kafka data source configuration. In this example, the copied file is called `kafka_application.conf`. For details on each configuration item, see [Parameters in the configuration file](../parameter-reference/ex-ug-parameter.md).

!!! note

    When importing Kafka data, a configuration file can only handle one tag or edge type. If there are multiple tag or edge types, you need to create multiple configuration files.

```conf
{
  # Spark configuration
  spark: {
    app: {
      name: NebulaGraph Exchange {{exchange.release}}
    }
    driver: {
      cores: 1
      maxResultSize: 1G
    }
    cores: {
      max: 16
    }
  }


  # NebulaGraph configuration
  nebula: {
    address:{
      # Specify the IP addresses and ports for Graph and all Meta services.
      # If there are multiple addresses, the format is "ip1:port","ip2:port","ip3:port".
      # Addresses are separated by commas.
      graph:["127.0.0.1:9669"]
      # the address of any of the meta services.
      # if your NebulaGraph server is in virtual network like k8s, please config the leader address of meta.
      meta:["127.0.0.1:9559"]
    }
    # The account entered must have write permission for the NebulaGraph space.
    user: root
    pswd: nebula
    # Fill in the name of the graph space you want to write data to in the NebulaGraph.
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

      # The corresponding Tag name in NebulaGraph.
      name: player
      type: {
        # Specify the data source file format to Kafka.
        source: kafka
        # Specify how to import the data into NebulaGraph. Only client is supported.
        sink: client
      }
      # Kafka server address.
      service: "127.0.0.1:9092"
      # Message category.
      topic: "topic_name1"

      # Kafka data has a fixed domain name: key, value, topic, partition, offset, timestamp, timestampType.
      # If multiple fields need to be specified after Spark reads as DataFrame, separate them with commas.
      # Specify the field name in fields. For example, use key for name in NebulaGraph and value for age in Nebula, as shown in the following.
      fields: [key,value]
      nebula.fields: [name,age]

      # Specify a column of data in the table as the source of vertex VID in the NebulaGraph.
      # The key is the same as the value above, indicating that key is used as both VID and property name.
      vertex:{
          field:key
      # udf:{
      #            separator:"_"
      #            oldColNames:[field-0,field-1,field-2]
      #            newColName:new-field
      #        }
      # Add the specified prefix to the VID. For example, if the VID is `12345`, adding the prefix `tag1` will result in `tag1_12345`. The underscore cannot be modified.
      # prefix:"tag1"
      # Performs hashing operations on VIDs of type string.
      # policy:hash
      }

      # Batch operation types, including INSERT, UPDATE, and DELETE. defaults to INSERT.
      #writeMode: INSERT
      
      # Whether or not to delete the related incoming and outgoing edges of the vertices when performing a batch delete operation. This parameter takes effect when `writeMode` is `DELETE`.
      #deleteEdge: false

      # The number of data written to NebulaGraph in a single batch.
      batch: 10

      # The number of Spark partitions.
      partition: 10
      # The interval for message reading. Unit: second.
      interval.seconds: 10
      # The consumer offsets. The default value is latest. Optional value are latest and earliest.
      startingOffsets: latest
      # Flow control, with a rate limit on the maximum offset processed per trigger interval, may not be configured.
      # maxOffsetsPerTrigger:10000
    }
  ]

  # Processing edges
  #edges: [
  #  # Set the information about the Edge Type follow.
  #  {
  #    # The corresponding Edge Type name in NebulaGraph.
  #    name: follow

  #    type: {
  #      # Specify the data source file format to Kafka.
  #      source: kafka

  #      # Specify how to import the Edge type data into NebulaGraph.
  #      # Specify how to import the data into NebulaGraph. Only client is supported.
  #      sink: client
  #    }

  #    # Kafka server address.
  #    service: "127.0.0.1:9092"
  #    # Message category.
  #    topic: "topic_name3"

  #    # Kafka data has a fixed domain name: key, value, topic, partition, offset, timestamp, timestampType.
  #    # If multiple fields need to be specified after Spark reads as DataFrame, separate them with commas.
  #    # Specify the field name in fields. For example, use key for degree in Nebula, as shown in the following.
  #    fields: [key]
  #    nebula.fields: [degree]

  #    # In source, use a column in the topic as the source of the edge's source vertex.
  #    # In target, use a column in the topic as the source of the edge's destination vertex.
  #    source:{
  #        field:timestamp
  #    # udf:{
  #    #            separator:"_"
  #    #            oldColNames:[field-0,field-1,field-2]
  #    #            newColName:new-field
  #    #        }
  #    # Add the specified prefix to the VID. For example, if the VID is `12345`, adding the prefix `tag1` will result in `tag1_12345`. The underscore cannot be modified.
  #    # prefix:"tag1"
  #    # Performs hashing operations on VIDs of type string.
  #    # policy:hash
  #    }


  #    target:{
  #        field:offset
  #    # udf:{
  #    #            separator:"_"
  #    #            oldColNames:[field-0,field-1,field-2]
  #    #            newColName:new-field
  #    #        }
  #    # Add the specified prefix to the VID. For example, if the VID is `12345`, adding the prefix `tag1` will result in `tag1_12345`. The underscore cannot be modified.
  #    # prefix:"tag1"
  #    # Performs hashing operations on VIDs of type string.
  #    # policy:hash
  #    }

  #    # (Optional) Specify a column as the source of the rank.
  #    #ranking: rank

  #    # Batch operation types, including INSERT, UPDATE, and DELETE. defaults to INSERT.
  #    #writeMode: INSERT

  #    # The number of data written to NebulaGraph in a single batch.
  #    batch: 10

  #    # The number of Spark partitions.
  #    partition: 10

  #    # The interval for message reading. Unit: second.
  #    interval.seconds: 10
  #    # The consumer offsets. The default value is latest. Optional value are latest and earliest.
  #    startingOffsets: latest
  #    # Flow control, with a rate limit on the maximum offset processed per trigger interval, may not be configured.
  #    # maxOffsetsPerTrigger:10000
  #  }
  #]
}
```

### Step 3: Import data into NebulaGraph

Run the following command to import Kafka data into NebulaGraph. For a description of the parameters, see [Options for import](../parameter-reference/ex-ug-para-import-command.md).

```bash
${SPARK_HOME}/bin/spark-submit --master "local" --class com.vesoft.nebula.exchange.Exchange <nebula-exchange-{{exchange.release}}.jar_path> -c <kafka_application.conf_path>
```

!!! note

    JAR packages are available in two ways: [compiled them yourself](../ex-ug-compile.md), or [download](https://repo1.maven.org/maven2/com/vesoft/nebula-exchange/) the compiled `.jar` file directly.

For example:

```bash
${SPARK_HOME}/bin/spark-submit  --master "local" --class com.vesoft.nebula.exchange.Exchange  /root/nebula-exchange/nebula-exchange/target/nebula-exchange-{{exchange.release}}.jar  -c /root/nebula-exchange/nebula-exchange/target/classes/kafka_application.conf
```

You can search for `batchSuccess.<tag_name/edge_name>` in the command output to check the number of successes. For example, `batchSuccess.follow: 300`.

### Step 4: (optional) Validate data

Users can verify that data has been imported by executing a query in the NebulaGraph client (for example, NebulaGraph Studio). For example:

```ngql
LOOKUP ON player YIELD id(vertex);
```

Users can also run the [SHOW STATS](../../../3.ngql-guide/7.general-query-statements/6.show/14.show-stats.md) command to view statistics.

### Step 5: (optional) Rebuild indexes in NebulaGraph

With the data imported, users can recreate and rebuild indexes in NebulaGraph. For details, see [Index overview](../../../3.ngql-guide/14.native-index-statements/README.md).
