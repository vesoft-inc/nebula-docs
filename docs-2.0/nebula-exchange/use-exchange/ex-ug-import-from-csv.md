# Import data from CSV files

This topic provides an example of how to use Exchange to import NebulaGraph data stored in HDFS or local CSV files.

To import a local CSV file to NebulaGraph, see [NebulaGraph Importer](https://github.com/vesoft-inc/nebula-importer "Click to go to GitHub").

## Data set

This topic takes the [basketballplayer dataset](https://docs-cdn.nebula-graph.com.cn/dataset/dataset.zip) as an example.

## Environment

This example is done on MacOS. Here is the environment configuration information:

- Hardware specifications:
  - CPU: 1.7 GHz Quad-Core Intel Core i7
  - Memory: 16 GB

- Spark: 2.4.7, stand-alone

- Hadoop: 2.9.2, pseudo-distributed deployment

- NebulaGraph: {{nebula.release}}. [Deploy NebulaGraph with Docker Compose](../../4.deployment-and-installation/2.compile-and-install-nebula-graph/3.deploy-nebula-graph-with-docker-compose.md).

## Prerequisites

Before importing data, you need to confirm the following information:

- NebulaGraph has been [installed](../../4.deployment-and-installation/2.compile-and-install-nebula-graph/2.install-nebula-graph-by-rpm-or-deb.md) and deployed with the following information:

  - IP addresses and ports of Graph and Meta services.

  - The user name and password with write permission to NebulaGraph.

- Exchange has been [compiled](../ex-ug-compile.md), or [download](https://repo1.maven.org/maven2/com/vesoft/nebula-exchange/) the compiled `.jar` file directly.

- Spark has been installed.

- Learn about the Schema created in NebulaGraph, including names and properties of Tags and Edge types, and more.

- If files are stored in HDFS, ensure that the Hadoop service is running normally.

- If files are stored locally and NebulaGraph is a cluster architecture, you need to place the files in the same directory locally on each machine in the cluster.

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

For more information, see [Quick start workflow](../../2.quick-start/1.quick-start-workflow.md).

### Step 2: Process CSV files

Confirm the following information:

1. Process CSV files to meet Schema requirements.

  !!! note

        Exchange supports uploading CSV files with or without headers.

2. Obtain the CSV file storage path.

### Step 3: Modify configuration files

After Exchange is compiled, copy the conf file `target/classes/application.conf` to set CSV data source configuration. In this example, the copied file is called `csv_application.conf`. For details on each configuration item, see [Parameters in the configuration file](../parameter-reference/ex-ug-parameter.md).

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
    executor: {
        memory:1G
    }

    cores: {
      max: 16
    }
  }

  # NebulaGraph configuration
  nebula: {
    address:{
      # Specify the IP addresses and ports for Graph and Meta services.
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
      # Specify the Tag name defined in NebulaGraph.
      name: player
      type: {
        # Specify the data source file format to CSV.
        source: csv

        # Specify how to import the data into NebulaGraph: Client or SST.
        sink: client
      }

      # Specify the path to the CSV file.
      # If the file is stored in HDFS, use double quotation marks to enclose the file path, starting with hdfs://. For example: "hdfs://ip:port/xx/xx".
      # If the file is stored locally, use double quotation marks to enclose the file path, starting with file://. For example: "file:///tmp/xx.csv".
      path: "hdfs://192.168.*.*:9000/data/vertex_player.csv"

      # If the CSV file does not have a header, use [_c0, _c1, _c2, ..., _cn] to represent its header and indicate the columns as the source of the property values.
      # If the CSV file has headers, use the actual column names.
      fields: [_c1, _c2]

      # Specify the column names in the player table in fields, and their corresponding values are specified as properties in the NebulaGraph.
      # The sequence of fields and nebula.fields must correspond to each other.
      nebula.fields: [age, name]

      # Specify a column of data in the table as the source of vertex VID in the NebulaGraph.
      # The value of vertex must be the same as the column names in the above fields or csv.fields.
      # Currently, NebulaGraph {{nebula.release}} supports only strings or integers of VID.
      vertex: {
        field:_c0
        # policy:hash
      }

      # The delimiter specified. The default value is comma.
      separator: ","

      # If the CSV file has a header, set the header to true.
      # If the CSV file does not have a header, set the header to false. The default value is false.
      header: false

      # The number of data written to NebulaGraph in a single batch.
      batch: 256

      # The number of Spark partitions.
      partition: 32
    }

    # Set the information about the Tag Team.
    {
      # Specify the Tag name defined in NebulaGraph.
      name: team
      type: {
        # Specify the data source file format to CSV.
        source: csv

        # Specify how to import the data into NebulaGraph: Client or SST.
        sink: client
      }

      # Specify the path to the CSV file.
      # If the file is stored in HDFS, use double quotation marks to enclose the file path, starting with hdfs://. For example: "hdfs://ip:port/xx/xx".
      # If the file is stored locally, use double quotation marks to enclose the file path, starting with file://. For example: "file:///tmp/xx.csv".
      path: "hdfs://192.168.*.*:9000/data/vertex_team.csv"

      # If the CSV file does not have a header, use [_c0, _c1, _c2, ..., _cn] to represent its header and indicate the columns as the source of the property values.
      # If the CSV file has headers, use the actual column names.
      fields: [_c1]

      # Specify the column names in the player table in fields, and their corresponding values are specified as properties in the NebulaGraph.
      # The sequence of fields and nebula.fields must correspond to each other.
      nebula.fields: [name]

      # Specify a column of data in the table as the source of VIDs in the NebulaGraph.
      # The value of vertex must be the same as the column names in the above fields or csv.fields.
      # Currently, NebulaGraph {{nebula.release}} supports only strings or integers of VID.
      vertex: {
        field:_c0
        # policy:hash
      }

      # The delimiter specified. The default value is comma.
      separator: ","

      # If the CSV file has a header, set the header to true.
      # If the CSV file does not have a header, set the header to false. The default value is false.
      header: false

      # The number of data written to NebulaGraph in a single batch.
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
      # Specify the Edge Type name defined in NebulaGraph.
      name: follow
      type: {
        # Specify the data source file format to CSV.
        source: csv

        # Specify how to import the data into NebulaGraph: Client or SST.
        sink: client
      }

      # Specify the path to the CSV file.
      # If the file is stored in HDFS, use double quotation marks to enclose the file path, starting with hdfs://. For example: "hdfs://ip:port/xx/xx".
      # If the file is stored locally, use double quotation marks to enclose the file path, starting with file://. For example: "file:///tmp/xx.csv".
      path: "hdfs://192.168.*.*:9000/data/edge_follow.csv"

      # If the CSV file does not have a header, use [_c0, _c1, _c2, ..., _cn] to represent its header and indicate the columns as the source of the property values.
      # If the CSV file has headers, use the actual column names.
      fields: [_c2]

      # Specify the column names in the edge table in fields, and their corresponding values are specified as properties in the NebulaGraph.
      # The sequence of fields and nebula.fields must correspond to each other.
      nebula.fields: [degree]

      # Specify a column as the source for the source and destination vertexes.
      # The value of vertex must be the same as the column names in the above fields or csv.fields.
      # Currently, NebulaGraph {{nebula.release}} supports only strings or integers of VID.
      source: {
        field: _c0
      }
      target: {
        field: _c1
      }

      # The delimiter specified. The default value is comma.
      separator: ","

      # Specify a column as the source of the rank (optional).

      #ranking: rank

      # If the CSV file has a header, set the header to true.
      # If the CSV file does not have a header, set the header to false. The default value is false.
      header: false

      # The number of data written to NebulaGraph in a single batch.
      batch: 256

      # The number of Spark partitions.
      partition: 32
    }

    # Set the information about the Edge Type serve.
    {
      # Specify the Edge Type name defined in NebulaGraph.
      name: serve
      type: {
        # Specify the data source file format to CSV.
        source: csv

        # Specify how to import the data into NebulaGraph: Client or SST.
        sink: client
      }

      # Specify the path to the CSV file.
      # If the file is stored in HDFS, use double quotation marks to enclose the file path, starting with hdfs://. For example: "hdfs://ip:port/xx/xx".
      # If the file is stored locally, use double quotation marks to enclose the file path, starting with file://. For example: "file:///tmp/xx.csv".
      path: "hdfs://192.168.*.*:9000/data/edge_serve.csv"

      # If the CSV file does not have a header, use [_c0, _c1, _c2, ..., _cn] to represent its header and indicate the columns as the source of the property values.
      # If the CSV file has headers, use the actual column names.
      fields: [_c2,_c3]

      # Specify the column names in the edge table in fields, and their corresponding values are specified as properties in the NebulaGraph.
      # The sequence of fields and nebula.fields must correspond to each other.
      nebula.fields: [start_year, end_year]

      # Specify a column as the source for the source and destination vertexes.
      # The value of vertex must be the same as the column names in the above fields or csv.fields.
      # Currently, NebulaGraph {{nebula.release}} supports only strings or integers of VID.
      source: {
        field: _c0
      }
      target: {
        field: _c1
      }

      # The delimiter specified. The default value is comma.
      separator: ","

      # Specify a column as the source of the rank (optional).
      #ranking: _c5

      # If the CSV file has a header, set the header to true.
      # If the CSV file does not have a header, set the header to false. The default value is false.
      header: false

      # The number of data written to NebulaGraph in a single batch.
      batch: 256

      # The number of Spark partitions.
      partition: 32
    }

  ]
    # If more edges need to be added, refer to the previous configuration to add them.
}
```

### Step 4: Import data into NebulaGraph

Run the following command to import CSV data into NebulaGraph. For descriptions of the parameters, see [Options for import](../parameter-reference/ex-ug-para-import-command.md).

```bash
${SPARK_HOME}/bin/spark-submit --master "local" --class com.vesoft.nebula.exchange.Exchange <nebula-exchange-{{exchange.release}}.jar_path> -c <csv_application.conf_path> 
```

!!! note

    JAR packages are available in two ways: [compiled them yourself](../ex-ug-compile.md), or [download](https://repo1.maven.org/maven2/com/vesoft/nebula-exchange/) the compiled `.jar` file directly.

For example:

```bash
${SPARK_HOME}/bin/spark-submit  --master "local" --class com.vesoft.nebula.exchange.Exchange  /root/nebula-exchange/nebula-exchange/target/nebula-exchange-{{exchange.release}}.jar  -c /root/nebula-exchange/nebula-exchange/target/classes/csv_application.conf
```

You can search for `batchSuccess.<tag_name/edge_name>` in the command output to check the number of successes. For example, `batchSuccess.follow: 300`.

### Step 5: (optional) Validate data

Users can verify that data has been imported by executing a query in the NebulaGraph client (for example, NebulaGraph Studio). For example:

```ngql
LOOKUP ON player YIELD id(vertex);
```

Users can also run the [`SHOW STATS`](../../3.ngql-guide/7.general-query-statements/6.show/14.show-stats.md) command to view statistics.

### Step 6: (optional) Rebuild indexes in NebulaGraph

With the data imported, users can recreate and rebuild indexes in NebulaGraph. For details, see [Index overview](../../3.ngql-guide/14.native-index-statements/README.md).
