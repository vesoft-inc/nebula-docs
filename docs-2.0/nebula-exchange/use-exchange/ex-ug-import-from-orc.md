# Import data from ORC files

This topic provides an example of how to use Exchange to import Nebula Graph data stored in HDFS or local ORC files.

To import a local ORC file to Nebula Graph, see [Nebula Importer](https://github.com/vesoft-inc/nebula-importer "Click to go to GitHub").

## Data set

This topic takes the [basketballplayer dataset](https://docs-cdn.nebula-graph.com.cn/dataset/dataset.zip) as an example.

## Environment

This example is done on MacOS. Here is the environment configuration information:

- Hardware specifications:
  - CPU: 1.7 GHz Quad-Core Intel Core i7
  - Memory: 16 GB

- Spark: 2.4.7, stand-alone

- Hadoop: 2.9.2, pseudo-distributed deployment

- Nebula Graph: {{nebula.release}}. [Deploy Nebula Graph with Docker Compose](../../4.deployment-and-installation/2.compile-and-install-nebula-graph/3.deploy-nebula-graph-with-docker-compose.md).

## Prerequisites

Before importing data, you need to confirm the following information:

- Nebula Graph has been [installed](../../4.deployment-and-installation/2.compile-and-install-nebula-graph/2.install-nebula-graph-by-rpm-or-deb.md) and deployed with the following information:

  - IP addresses and ports of Graph and Meta services.

  - The user name and password with write permission to Nebula Graph.

- Exchange has been [compiled](../ex-ug-compile.md), or [download](https://repo1.maven.org/maven2/com/vesoft/nebula-exchange/) the compiled `.jar` file directly.

- Spark has been installed.

- Learn about the Schema created in Nebula Graph, including names and properties of Tags and Edge types, and more.

- If files are stored in HDFS, ensure that the Hadoop service is running properly.

- If files are stored locally and Nebula Graph is a cluster architecture, you need to place the files in the same directory locally on each machine in the cluster.

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

### Step 2: Process ORC files

Confirm the following information:

1. Process ORC files to meet Schema requirements.

2. Obtain the ORC file storage path.

### Step 3: Modify configuration files

After Exchange is compiled, copy the conf file `target/classes/application.conf` to set ORC data source configuration. In this example, the copied file is called `orc_application.conf`. For details on each configuration item, see [Parameters in the configuration file](../parameter-reference/ex-ug-parameter.md).

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

  # Processing vertexes
  tags: [
    # Set the information about the Tag player.
    {
      name: player
      type: {
        # Specify the data source file format to ORC.
        source: orc

        # Specify how to import the data into Nebula Graph: Client or SST.
        sink: client
      }

      # Specify the path to the ORC file.
      # If the file is stored in HDFS, use double quotation marks to enclose the file path, starting with hdfs://. For example, "hdfs://ip:port/xx/xx".
      # If the file is stored locally, use double quotation marks to enclose the file path, starting with file://. For example, "file:///tmp/xx.orc".
      path: "hdfs://192.168.*.*:9000/data/vertex_player.orc"

      # Specify the key name in the ORC file in fields, and its corresponding value will serve as the data source for the properties specified in the Nebula Graph.
      # If multiple values need to be specified, separate them with commas.
      fields: [age,name]

      # Specify the property names defined in Nebula Graph.
      # The sequence of fields and nebula.fields must correspond to each other.
      nebula.fields: [age, name]

      # Specify a column of data in the table as the source of VIDs in the Nebula Graph.
      # The value of vertex must be consistent with the field in the ORC file.
      # Currently, Nebula Graph {{nebula.release}} supports only strings or integers of VID.
      vertex: {
        field:id
      }

      # The number of data written to Nebula Graph in a single batch.
      batch: 256

      # The number of Spark partitions.
      partition: 32
    }

    # Set the information about the Tag team.
    {
      # Specify the Tag name defined in Nebula Graph.
      name: team
      type: {
        # Specify the data source file format to ORC.
        source: orc

        # Specify how to import the data into Nebula Graph: Client or SST.
        sink: client
      }

      # Specify the path to the ORC file.
      # If the file is stored in HDFS, use double quotation marks to enclose the file path, starting with hdfs://. For example, "hdfs://ip:port/xx/xx".
      # If the file is stored locally, use double quotation marks to enclose the file path, starting with file://. For example, "file:///tmp/xx.orc".
      path: "hdfs://192.168.*.*:9000/data/vertex_team.orc"

      # Specify the key name in the ORC file in fields, and its corresponding value will serve as the data source for the properties specified in the Nebula Graph.
      # If multiple values need to be specified, separate them with commas.
      fields: [name]

      # Specify the property names defined in Nebula Graph.
      # The sequence of fields and nebula.fields must correspond to each other.
      nebula.fields: [name]

      # Specify a column of data in the table as the source of VIDs in the Nebula Graph.
      # The value of vertex must be consistent with the field in the ORC file.
      # Currently, Nebula Graph {{nebula.release}} supports only strings or integers of VID.
      vertex: {
        field:id
      }


      # The number of data written to Nebula Graph in a single batch.
      batch: 256

      # The number of Spark partitions.
      partition: 32
    }



    # If more vertexes need to be added, refer to the previous configuration to add them.
  ]
  # Processing edges
  edges: [
    # Set the information about the Edge Type follow.
    {
      # Specify the Edge Type name defined in Nebula Graph.
      name: follow
      type: {
        # Specify the data source file format to ORC.
        source: orc

        # Specify how to import the data into Nebula Graph: Client or SST.
        sink: client
      }

      # Specify the path to the ORC file.
      # If the file is stored in HDFS, use double quotation marks to enclose the file path, starting with hdfs://. For example, "hdfs://ip:port/xx/xx".
      # If the file is stored locally, use double quotation marks to enclose the file path, starting with file://. For example, "file:///tmp/xx.orc".
      path: "hdfs://192.168.*.*:9000/data/edge_follow.orc"

      # Specify the key name in the ORC file in fields, and its corresponding value will serve as the data source for the properties specified in the Nebula Graph.
      # If multiple values need to be specified, separate them with commas.
      fields: [degree]

      # Specify the property names defined in Nebula Graph.
      # The sequence of fields and nebula.fields must correspond to each other.
      nebula.fields: [degree]

      # Specify a column as the source for the source and destination vertexes.
      # The value of vertex must be consistent with the field in the ORC file.
      # Currently, Nebula Graph {{nebula.release}} supports only strings or integers of VID.
      source: {
        field: src
      }
      target: {
        field: dst
      }


      # (Optional) Specify a column as the source of the rank.
      #ranking: rank

      # The number of data written to Nebula Graph in a single batch.
      batch: 256

      # The number of Spark partitions.
      partition: 32
    }

    # Set the information about the Edge type serve.
    {
      # Specify the Edge type name defined in Nebula Graph.
      name: serve
      type: {
        # Specify the data source file format to ORC.
        source: orc

        # Specify how to import the data into Nebula Graph: Client or SST.
        sink: client
      }

      # Specify the path to the ORC file.
      # If the file is stored in HDFS, use double quotation marks to enclose the file path, starting with hdfs://. For example, "hdfs://ip:port/xx/xx".
      # If the file is stored locally, use double quotation marks to enclose the file path, starting with file://. For example, "file:///tmp/xx.orc".
      path: "hdfs://192.168.*.*:9000/data/edge_serve.orc"

      # Specify the key name in the ORC file in fields, and its corresponding value will serve as the data source for the properties specified in the Nebula Graph.
      # If multiple values need to be specified, separate them with commas.
      fields: [start_year,end_year]

      # Specify the property names defined in Nebula Graph.
      # The sequence of fields and nebula.fields must correspond to each other.
      nebula.fields: [start_year, end_year]

      # Specify a column as the source for the source and destination vertexes.
      # The value of vertex must be consistent with the field in the ORC file.
      # Currently, Nebula Graph {{nebula.release}} supports only strings or integers of VID.
      source: {
        field: src
      }
      target: {
        field: dst
      }

      # (Optional) Specify a column as the source of the rank.
      #ranking: _c5


      # The number of data written to Nebula Graph in a single batch.
      batch: 256

      # The number of Spark partitions.
      partition: 32
    }

  # If more edges need to be added, refer to the previous configuration to add them.
}
```

### Step 4: Import data into Nebula Graph

Run the following command to import ORC data into Nebula Graph. For a description of the parameters, see [Options for import](../parameter-reference/ex-ug-para-import-command.md).

```bash
${SPARK_HOME}/bin/spark-submit --master "local" --class com.vesoft.nebula.exchange.Exchange <nebula-exchange-{{exchange.release}}.jar_path> -c <orc_application.conf_path> 
```

!!! note

    JAR packages are available in two ways: [compiled them yourself](../ex-ug-compile.md), or [download](https://repo1.maven.org/maven2/com/vesoft/nebula-exchange/) the compiled `.jar` file directly.

For example:

```bash
${SPARK_HOME}/bin/spark-submit  --master "local" --class com.vesoft.nebula.exchange.Exchange  /root/nebula-spark-utils/nebula-exchange/target/nebula-exchange-{{exchange.release}}.jar  -c /root/nebula-spark-utils/nebula-exchange/target/classes/orc_application.conf
```

You can search for `batchSuccess.<tag_name/edge_name>` in the command output to check the number of successes. For example, `batchSuccess.follow: 300`.

### Step 5: (optional) Validate data

Users can verify that data has been imported by executing a query in the Nebula Graph client (for example, Nebula Graph Studio). For example:

```ngql
GO FROM "player100" OVER follow;
```

Users can also run the [`SHOW STATS`](../../3.ngql-guide/7.general-query-statements/6.show/14.show-stats.md) command to view statistics.

### Step 6: (optional) Rebuild indexes in Nebula Graph

With the data imported, users can recreate and rebuild indexes in Nebula Graph. For details, see [Index overview](../../3.ngql-guide/14.native-index-statements/README.md).
