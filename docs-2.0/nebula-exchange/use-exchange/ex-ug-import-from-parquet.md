# Import data from Parquet files

This topic provides an example of how to use Exchange to import Nebula Graph data stored in HDFS or local Parquet files.

To import a local Parquet file to Nebula Graph, see [Nebula Importer](https://github.com/vesoft-inc/nebula-importer "Click to go to GitHub").

## Data set

This topic takes the [basketballplayer dataset](https://docs-cdn.nebula-graph.com.cn/dataset/dataset.zip) as an example.

## Environment

This example is done on MacOS. Here is the environment configuration information:

- Hardware specifications:
  - CPU: 1.7 GHz Quad-Core Intel Core i7
  - memory: 16 GB

- Spark: 2.4.7, Stand-alone

- Hadoop: 2.9.2, Pseudo-distributed deployment

- Nebula Graph: {{nebula.release}} ([Deploy Nebula Graph with Docker Compose](../../4.deployment-and-installation/2.compile-and-install-nebula-graph/3.deploy-nebula-graph-with-docker-compose.md))

## Prerequisites

Before importing data, you need to confirm the following information:

- Nebula Graph has been [installed](../../4.deployment-and-installation/2.compile-and-install-nebula-graph/2.install-nebula-graph-by-rpm-or-deb.md) and deployed with the following information:

  - IP address and port of Graph and Meta services.

  - User name and password with Nebula Graph write permission.

- Exchange has been [compiled](../ex-ug-compile.md), or [download](https://repo1.maven.org/maven2/com/vesoft/nebula-exchange/) the compiled `.jar` file directly.

- Spark has been installed.

- Learn about the Schema created in Nebula Graph, including Tag and Edge type names, properties, and more.

- If files are stored in HDFS, ensure that the Hadoop service is running properly.

- If files are stored locally and Nebula Graph is a cluster architecture, you need to place the files in the same directory locally on each machine in the cluster.

## Steps

### Step 1: Create the Schema in Nebula Graph

Analyze the data to create a Schema in Nebula Graph by following these steps:

1. Identify the Schema elements. The Schema elements in the Nebula Graph are shown in the following table.

    | Element  | name | property |
    | :--- | :--- | :--- |
    | Tag | `player` | `name string, age int` |
    | Tag | `team` | `name string` |
    | Edge Type | `follow` | `degree int` |
    | Edge Type | `serve` | `start_year int, end_year int` |

2. Create a graph space **basketballplayer** in the Nebula Graph and create a Schema as shown below.

    ```ngql
    ## create graph space
    nebula> CREATE SPACE basketballplayer \
            (partition_num = 10, \
            replica_factor = 1, \
            vid_type = FIXED_STRING(30));
    
    ## use the graph space basketballplayer
    nebula> USE basketballplayer;
    
    ## create Tag player
    nebula> CREATE TAG player(name string, age int);
    
    ## create Tag team
    nebula> CREATE TAG team(name string);
    
    ## create Edge type follow
    nebula> CREATE EDGE follow(degree int);

    ## create Edge type serve
    nebula> CREATE EDGE serve(start_year int, end_year int);
    ```

For more information, see [Quick start workflow](../../2.quick-start/1.quick-start-workflow.md).

### Step 2: Process Parquet files

Confirm the following information:

1. Process Parquet files to meet Schema requirements.

2. Obtain the Parquet file storage path.

### Step 3: Modify configuration file

After Exchange is compiled, copy the conf file `target/classes/application.conf` settings Parquet data source configuration. In this case, the copied file is called `parquet_application.conf`. For details on each configuration item, see [Parameters in the configuration file](../parameter-reference/ex-ug-parameter.md).

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
    executor: {
        memory:1G
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

  # Processing vertex
  tags: [
    # Set information about Tag player.
    {
      name: player
      type: {
        # Specify the data source file format, set to Parquet.
        source: parquet

        # Specifies how to import the data into Nebula Graph: Client or SST.
        sink: client
      }

      # Specify the path to the Parquet file.
      # If the file is stored in HDFS, use double quotation marks to enclose the file path, starting with hdfs://, for example, "hdfs://ip:port/xx/xx".
      # If the file is stored locally, use double quotation marks around the path, starting with file://, for example, "file:///tmp/xx.parquet".
      path: "hdfs://192.168.*.13:9000/data/vertex_player.parquet"

      # Specify the key name in the Parquet file in fields, and its corresponding value will serve as the data source for the properties specified in the Nebula Graph.
      # If multiple values need to be specified, separate them with commas.
      fields: [age,name]

      # Specify the column names in the player table in fields, and their corresponding values are specified as properties in the Nebula Graph.
      # The sequence of fields and nebula.fields must correspond to each other.
      nebula.fields: [age, name]

      # Specify a column of data in the table as the source of vertex VID in the Nebula Graph.
      # Currently, Nebula Graph {{nebula.release}} supports only strings or integers of VID.
      vertex: {
        field:id
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
        source: parquet
        sink: client
      }
      path: "hdfs://192.168.*.13:9000/data/vertex_team.parquet"
      fields: [name]
      nebula.fields: [name]
      vertex: {
        field:id
      }
      batch: 256
      partition: 32
    }


    # If more vertexes need to be added, refer to the previous configuration to add them.
  ]
  # Processing edge
  edges: [
    # Set information about Edge Type follow
    {
      # The corresponding Edge Type name in Nebula Graph.
      name: follow
      type: {
        # Specify the data source file format, set to Parquet.
        source: parquet

        # Specifies how to import the data into Nebula Graph: Client or SST.
        sink: client
      }

      # Specify the path to the Parquet file.
      # If the file is stored in HDFS, use double quotation marks to enclose the file path, starting with hdfs://, for example, "hdfs://ip:port/xx/xx".
      # If the file is stored locally, use double quotation marks around the path, starting with file://, for example, "file:///tmp/xx.parquet".
      path: "hdfs://192.168.11.13:9000/data/edge_follow.parquet"

      # Specify the key name in the Parquet file in fields, and its corresponding value will serve as the data source for the properties specified in the Nebula Graph.
      # If multiple values need to be specified, separate them with commas.
      fields: [degree]

      # Specify the column names in the follow table in fields, and their corresponding values are specified as properties in the Nebula Graph.
      # The sequence of fields and nebula.fields must correspond to each other.
      nebula.fields: [degree]

      # Specify a column as the source for the starting and destination vertexes.
      # The values of vertex must be consistent with the fields in the Parquet file.
      # Currently, Nebula Graph {{nebula.release}} supports only strings or integers of VID.
      source: {
        field: src
      }
      target: {
        field: dst
      }


      # (optionally) Specify a column as the source of the rank.
      #ranking: rank

      # Number of pieces of data written to Nebula Graph in a single batch.
      batch: 256

      # Number of Spark partitions
      partition: 32
    }

    # Set information about Edge Type serve.
    {
      name: serve
      type: {
        source: parquet
        sink: client
      }
      path: "hdfs://192.168.*.13:9000/data/edge_serve.parquet"
      fields: [start_year,end_year]
      nebula.fields: [start_year, end_year]
      source: {
        field: src
      }
      target: {
        field: dst
      }
      batch: 256
      partition: 32
    }

  ]
  # If more edges need to be added, refer to the previous configuration to add them.
}
```

### Step 4: Import data into Nebula Graph

Run the following command to import Parquet data into Nebula Graph. For a description of the parameters, see [Options for import](../parameter-reference/ex-ug-para-import-command.md).

```bash
${SPARK_HOME}/bin/spark-submit --master "local" --class com.vesoft.nebula.exchange.Exchange <nebula-exchange-{{exchange.release}}.jar_path> -c <parquet_application.conf_path> 
```

!!! note

    JAR packages are available in two ways: [compiled them yourself](../ex-ug-compile.md), or [download](https://repo1.maven.org/maven2/com/vesoft/nebula-exchange/) the compiled `.jar` file directly.

Example:

```bash
${SPARK_HOME}/bin/spark-submit  --master "local" --class com.vesoft.nebula.exchange.Exchange  /root/nebula-spark-utils/nebula-exchange/target/nebula-exchange-{{exchange.release}}.jar  -c /root/nebula-spark-utils/nebula-exchange/target/classes/parquet_application.conf
```

You can search for `batchSuccess.<tag_name/edge_name>` in the command output to check the number of successes. For example, `batchSuccess.follow: 300`.

### Step 5: (optional) Validation data

Users can verify that data has been imported by executing a query in the Nebula Graph client (for example, Nebula Graph Studio). Such as:

```ngql
GO FROM "player100" OVER follow;
```

Users can also run the [SHOW STATS](../../3.ngql-guide/7.general-query-statements/6.show/14.show-stats.md) command to view statistics.

### Step 6: (optional) Rebuild indexes in Nebula Graph

With the data imported, users can recreate and rebuild indexes in Nebula Graph. For details, see [Index overview](../../3.ngql-guide/14.native-index-statements/README.md).
