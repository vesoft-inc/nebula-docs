# Import data from MaxCompute

This topic provides an example of how to use Exchange to import Nebula Graph data stored in MaxCompute.

## Data set

This topic takes the [basketballplayer dataset](https://docs-cdn.nebula-graph.com.cn/dataset/dataset.zip) as an example.

## Environment

This example is done on MacOS. Here is the environment configuration information:

- Hardware specifications:
  - CPU: 1.7 GHz Quad-Core Intel Core i7
  - memory: 16 GB

- Spark: 2.4.7, Stand-alone

- Hadoop: 2.9.2, Pseudo-distributed deployment

- MaxCompute: Alibaba Cloud official version

- Nebula Graph: {{nebula.release}} ([Deploy Nebula Graph with Docker Compose](../../4.deployment-and-installation/2.compile-and-install-nebula-graph/3.deploy-nebula-graph-with-docker-compose.md))

## Prerequisites

Before importing data, you need to confirm the following information:

- Nebula Graph has been [installed](../../4.deployment-and-installation/2.compile-and-install-nebula-graph/2.install-nebula-graph-by-rpm-or-deb.md) and deployed with the following information:

  - IP address and port of Graph and Meta services.

  - User name and password with Nebula Graph write permission.

- Exchange has been [compiled](../ex-ug-compile.md), or [download](https://repo1.maven.org/maven2/com/vesoft/nebula-exchange/) the compiled `.jar` file directly.

- Spark has been installed.

- Learn about the Schema created in Nebula Graph, including Tag and Edge type names, properties, and more.

- The Hadoop service has been installed and started.

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

### Step 2: Modify configuration file

After Exchange is compiled, copy the conf file `target/classes/application.conf` settings MaxCompute data source configuration. In this case, the copied file is called `maxcompute_application.conf`. For details on each configuration item, see [Parameters in the configuration file](../parameter-reference/ex-ug-parameter.md).

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
  # Processing vertex
  tags: [
    # Set information about Tag player.
    {
      name: player
      type: {
        # Specify the data source file format, set to MaxCompute.
        source: maxcompute
        # Specifies how to import the data into Nebula Graph: Client or SST.
        sink: client
      }
      
      # Table name of MaxCompute.
      table:player

      # Project name of MaxCompute.
      project:project

      # OdpsUrl and tunnelUrl for MaxCompute service.
      # Address at https://help.aliyun.com/document_detail/34951.html 
      odpsUrl:"http://service.cn-hangzhou.maxcompute.aliyun.com/api"
      tunnelUrl:"http://dt.cn-hangzhou.maxcompute.aliyun.com"

      # AccessKeyId and accessKeySecret of the MaxCompute service.
      accessKeyId:xxx
      accessKeySecret:xxx

      # Table partition description of MaxCompute. This configuration is optional.
      partitionSpec:"dt='partition1'"

      # Ensure that the table name in the SQL statement is the same as the value of the table above. This configuration is optional.
      sentence:"select id, name, age, playerid from player where id < 10"

      # Specify the column names in the player table in fields, and their corresponding values are specified as properties in the Nebula Graph.
      # The sequence of fields and nebula.fields must correspond to each other.
      # If multiple column names need to be specified, separate them by commas.
      fields:[name, age]
      nebula.fields:[name, age]

      # Specify a column of data in the table as the source of vertex VID in the Nebula Graph.
      vertex:{
        field: playerid
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
        source: maxcompute
        sink: client
      }
      table:team
      project:project
      odpsUrl:"http://service.cn-hangzhou.maxcompute.aliyun.com/api"
      tunnelUrl:"http://dt.cn-hangzhou.maxcompute.aliyun.com"
      accessKeyId:xxx
      accessKeySecret:xxx
      partitionSpec:"dt='partition1'"
      sentence:"select id, name, teamid from team where id < 10"
      fields:[name]
      nebula.fields:[name]
      vertex:{
        field: teamid
      }
      batch: 256
      partition: 32
    }
  ]

  # Processing edge
  edges: [
    # Set information about Edge Type follow
    {
      # The corresponding Edge Type name in Nebula Graph.
      name: follow

      type:{
        # Specify the data source file format, set to MaxCompute.
        source:maxcompute

        # Specifies how to import the data into Nebula Graph: Client or SST.
        sink:client
      }
      
      # Table name of MaxCompute.
      table:follow

      # Project name of MaxCompute.
      project:project

      # OdpsUrl and tunnelUrl for MaxCompute service.
      # Address at https://help.aliyun.com/document_detail/34951.html 
      odpsUrl:"http://service.cn-hangzhou.maxcompute.aliyun.com/api"
      tunnelUrl:"http://dt.cn-hangzhou.maxcompute.aliyun.com"

      # AccessKeyId and accessKeySecret of the MaxCompute service.
      accessKeyId:xxx
      accessKeySecret:xxx

      # Table partition description of MaxCompute. This configuration is optional.
      partitionSpec:"dt='partition1'"

      # Ensure that the table name in the SQL statement is the same as the value of the table above. This configuration is optional.
      sentence:"select * from follow"

      # Specify the column names in the follow table in Fields, and their corresponding values are specified as properties in the Nebula Graph.
      # The sequence of fields and nebula.fields must correspond to each other.
      # If multiple column names need to be specified, separate them by commas.
      fields:[degree]
      nebula.fields:[degree]

      # In source, use a column in the follow table as the source of the edge's starting vertex.
      source:{
        field: src_player
      }

      # In target, use a column in the follow table as the source of the edge's destination vertex.
      target:{
        field: dst_player
      }

      # Number of Spark partitions
      partition:10

      # Number of pieces of data written to Nebula Graph in a single batch.
      batch:10
    }
    
    # Set information about Edge Type serve
    {
      name: serve
      type:{
        source:maxcompute
        sink:client
      }
      table:serve
      project:project
      odpsUrl:"http://service.cn-hangzhou.maxcompute.aliyun.com/api"
      tunnelUrl:"http://dt.cn-hangzhou.maxcompute.aliyun.com"
      accessKeyId:xxx
      accessKeySecret:xxx
      partitionSpec:"dt='partition1'"
      sentence:"select * from serve"
      fields:[start_year,end_year]
      nebula.fields:[start_year,end_year]
      source:{
        field: playerid
      }
      target:{
        field: teamid
      }
      partition:10
      batch:10
    }
  ]
}
```

### Step 3: Import data into Nebula Graph

Run the following command to import MaxCompute data into Nebula Graph. For a description of the parameters, see [Options for import](../parameter-reference/ex-ug-para-import-command.md).

```bash
${SPARK_HOME}/bin/spark-submit --master "local" --class com.vesoft.nebula.exchange.Exchange <nebula-exchange-{{exchange.release}}.jar_path> -c <maxcompute_application.conf_path>
```

!!! note

    JAR packages are available in two ways: [compiled them yourself](../ex-ug-compile.md), or [download](https://repo1.maven.org/maven2/com/vesoft/nebula-exchange/) the compiled `.jar` file directly.

Example:

```bash
${SPARK_HOME}/bin/spark-submit  --master "local" --class com.vesoft.nebula.exchange.Exchange  /root/nebula-spark-utils/nebula-exchange/target/nebula-exchange-{{exchange.release}}.jar  -c /root/nebula-spark-utils/nebula-exchange/target/classes/maxcompute_application.conf
```

You can search for `batchSuccess.<tag_name/edge_name>` in the command output to check the number of successes. For example, `batchSuccess.follow: 300`.

### Step 4: (optional) Validation data

Users can verify that data has been imported by executing a query in the Nebula Graph client (for example, Nebula Graph Studio). Such as:

```ngql
GO FROM "player100" OVER follow;
```

Users can also run the [SHOW STATS](../../3.ngql-guide/7.general-query-statements/6.show/14.show-stats.md) command to view statistics.

### Step 5: (optional) Rebuild indexes in Nebula Graph

With the data imported, users can recreate and rebuild indexes in Nebula Graph. For details, see [Index overview](../../3.ngql-guide/14.native-index-statements/README.md).
