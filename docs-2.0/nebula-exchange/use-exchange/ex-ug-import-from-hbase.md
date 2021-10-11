# Import data from HBase

This topic provides an example of how to use Exchange to import Nebula Graph data stored in HBase.

## Data set

This topic takes the [basketballplayer dataset](https://docs-cdn.nebula-graph.com.cn/dataset/dataset.zip) as an example.

In this example, the data set has been stored in HBase. All vertexes and edges are stored in the `player`, `team`, `follow`, and `serve` tables. The following are some of the data for each table.

```sql
hbase(main):002:0> scan "player"
ROW                                COLUMN+CELL
 player100                         column=cf:age, timestamp=1618881347530, value=42
 player100                         column=cf:name, timestamp=1618881354604, value=Tim Duncan
 player101                         column=cf:age, timestamp=1618881369124, value=36
 player101                         column=cf:name, timestamp=1618881379102, value=Tony Parker
 player102                         column=cf:age, timestamp=1618881386987, value=33
 player102                         column=cf:name, timestamp=1618881393370, value=LaMarcus Aldridge
 player103                         column=cf:age, timestamp=1618881402002, value=32
 player103                         column=cf:name, timestamp=1618881407882, value=Rudy Gay
 ...

hbase(main):003:0> scan "team"
ROW                                COLUMN+CELL
 team200                           column=cf:name, timestamp=1618881445563, value=Warriors
 team201                           column=cf:name, timestamp=1618881453636, value=Nuggets
 ...

hbase(main):004:0> scan "follow"
ROW                                COLUMN+CELL
 player100                         column=cf:degree, timestamp=1618881804853, value=95
 player100                         column=cf:dst_player, timestamp=1618881791522, value=player101
 player101                         column=cf:degree, timestamp=1618881824685, value=90
 player101                         column=cf:dst_player, timestamp=1618881816042, value=player102
 ...

hbase(main):005:0> scan "serve"
ROW                                COLUMN+CELL
 player100                         column=cf:end_year, timestamp=1618881899333, value=2016
 player100                         column=cf:start_year, timestamp=1618881890117, value=1997
 player100                         column=cf:teamid, timestamp=1618881875739, value=team204
 ...
```

## Environment

This example is done on MacOS. Here is the environment configuration information:

- Hardware specifications:
  - CPU: 1.7 GHz Quad-Core Intel Core i7
  - Memory: 16 GB

- Spark: 2.4.7, stand-alone

- Hadoop: 2.9.2, pseudo-distributed deployment

- HBase: 2.2.7

- Nebula Graph: {{nebula.release}}. [Deploy Nebula Graph with Docker Compose](../../4.deployment-and-installation/2.compile-and-install-nebula-graph/3.deploy-nebula-graph-with-docker-compose.md).

## Prerequisites

Before importing data, you need to confirm the following information:

- Nebula Graph has been [installed](../../4.deployment-and-installation/2.compile-and-install-nebula-graph/2.install-nebula-graph-by-rpm-or-deb.md) and deployed with the following information:

  - IP addresses and ports of Graph and Meta services.

  - The user name and password with write permission to Nebula Graph.

- Exchange has been [compiled](../ex-ug-compile.md), or [download](https://repo1.maven.org/maven2/com/vesoft/nebula-exchange/) the compiled `.jar` file directly.

- Spark has been installed.

- Learn about the Schema created in Nebula Graph, including names and properties of Tags and Edge types, and more.

- The Hadoop service has been installed and started.

## Steps

### Step 1: Create the Schema in Nebula Graph

Analyze the data to create a Schema in Nebula Graph by following these steps:

1. Identify the Schema elements. The Schema elements in the Nebula Graph are shown in the following table.

    | Element  | Name | Property |
    | :--- | :--- | :--- |
    | Tag | `player` | `name string, age int` |
    | Tag | `team` | `name string` |
    | Edge Type | `follow` | `degree int` |
    | Edge Type | `serve` | `start_year int, end_year int` |

2. Create a graph space **basketballplayer** in the Nebula Graph and create a Schema as shown below.

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

For more information, see [Quick start workflow](../../2.quick-start/1.quick-start-workflow.md).

### Step 2: Modify configuration files

After Exchange is compiled, copy the conf file `target/classes/application.conf` to set HBase data source configuration. In this example, the copied file is called `hbase_application.conf`. For details on each configuration item, see [Parameters in the configuration file](../parameter-reference/ex-ug-parameter.md).

```conf
{
  # Spark configuration
  spark: {
    app: {
      name: Nebula Exchange {{exchange.release}}
    }
    driver: {
      cores: 1
      maxResultSize: 1G
    }
    cores {
      max: 16
    }
  }


  # Nebula Graph configuration
  nebula: {
    address:{
      # Specify the IP addresses and ports for Graph and all Meta services.
      # If there are multiple addresses, the format is "ip1:port","ip2:port","ip3:port".
      # Addresses are separated by commas.
      graph:["127.0.0.1:9669"]
      meta:["127.0.0.1:9559"]
    }
    # The account entered must have write permission for the Nebula Graph space.
    user: root
    pswd: nebula
    # Fill in the name of the graph space you want to write data to in the Nebula Graph.
    space: basketballplayer
    connection {
      timeout: 3000
      retry: 3
    }
    execution {
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
    # Set information about Tag player.
    # If you want to set RowKey as the data source, enter rowkey and the actual column name of the column family.
    {
      # The Tag name in Nebula Graph.
      name: player
      type: {
        # Specify the data source file format to HBase.
        source: hbase
        # Specify how to import the data into Nebula Graph: Client or SST.
        sink: client
      }
      host:192.168.*.*
      port:2181
      table:"player"
      columnFamily:"cf"

      # Specify the column names in the player table in fields, and their corresponding values are specified as properties in the Nebula Graph.
      # The sequence of fields and nebula.fields must correspond to each other.
      # If multiple column names need to be specified, separate them by commas.
      fields: [age,name]
      nebula.fields: [age,name]

      # Specify a column of data in the table as the source of vertex VID in the Nebula Graph.
      # For example, if rowkey is the source of the VID, enter rowkey.
      vertex:{
          field:rowkey
      }


      # Number of pieces of data written to Nebula Graph in a single batch.
      batch: 256

      # Number of Spark partitions
      partition: 32
    }
    # Set Tag Team information.
    {
      name: team
      type: {
        source: hbase
        sink: client
      }
      host:192.168.*.*
      port:2181
      table:"team"
      columnFamily:"cf"
      fields: [name]
      nebula.fields: [name]
      vertex:{
          field:rowkey
      }
      batch: 256
      partition: 32
    }

  ]

  # Processing edges
  edges: [
    # Set the information about the Edge Type follow.
    {
      # The corresponding Edge Type name in Nebula Graph.
      name: follow

      type: {
        # Specify the data source file format to HBase.
        source: hbase

        # Specify how to import the Edge type data into Nebula Graph.
        # Specify how to import the data into Nebula Graph: Client or SST.
        sink: client
      }

      host:192.168.*.*
      port:2181
      table:"follow"
      columnFamily:"cf"

      # Specify the column names in the follow table in fields, and their corresponding values are specified as properties in the Nebula Graph.
      # The sequence of fields and nebula.fields must correspond to each other.
      # If multiple column names need to be specified, separate them by commas.
      fields: [degree]
      nebula.fields: [degree]

      # In source, use a column in the follow table as the source of the edge's source vertex.
      # In target, use a column in the follow table as the source of the edge's destination vertex.
      source:{
          field:rowkey
      }


      target:{
          field:dst_player
      }


      # The number of data written to Nebula Graph in a single batch.
      batch: 256

      # The number of Spark partitions.
      partition: 32
    }

    # Set the information about the Edge Type serve.
    {
      name: serve
      type: {
        source: hbase
        sink: client
      }
      host:192.168.*.*
      port:2181
      table:"serve"
      columnFamily:"cf"

      fields: [start_year,end_year]
      nebula.fields: [start_year,end_year]
      source:{
          field:rowkey
      }

      target:{
          field:teamid
      }

      batch: 256
      partition: 32
    }
  ]
}
```

### Step 3: Import data into Nebula Graph

Run the following command to import HBase data into Nebula Graph. For descriptions of the parameters, see [Options for import](../parameter-reference/ex-ug-para-import-command.md).

```bash
${SPARK_HOME}/bin/spark-submit --master "local" --class com.vesoft.nebula.exchange.Exchange <nebula-exchange-{{exchange.release}}.jar_path> -c <hbase_application.conf_path>
```

!!! note

    JAR packages are available in two ways: [compiled them yourself](../ex-ug-compile.md), or [download](https://repo1.maven.org/maven2/com/vesoft/nebula-exchange/) the compiled `.jar` file directly.

For example:

```bash
${SPARK_HOME}/bin/spark-submit  --master "local" --class com.vesoft.nebula.exchange.Exchange  /root/nebula-spark-utils/nebula-exchange/target/nebula-exchange-{{exchange.release}}.jar  -c /root/nebula-spark-utils/nebula-exchange/target/classes/hbase_application.conf
```

You can search for `batchSuccess.<tag_name/edge_name>` in the command output to check the number of successes. For example, `batchSuccess.follow: 300`.

### Step 4: (optional) Validate data

Users can verify that data has been imported by executing a query in the Nebula Graph client (for example, Nebula Graph Studio). For example:

```ngql
GO FROM "player100" OVER follow;
```

Users can also run the [SHOW STATS](../../3.ngql-guide/7.general-query-statements/6.show/14.show-stats.md) command to view statistics.

### Step 5: (optional) Rebuild indexes in Nebula Graph

With the data imported, users can recreate and rebuild indexes in Nebula Graph. For details, see [Index overview](../../3.ngql-guide/14.native-index-statements/README.md).
