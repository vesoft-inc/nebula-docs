# Import data from Oracle

This topic provides an example of how to use Exchange to export Oracle data and import to NebulaGraph.

## Data set

This topic takes the [basketballplayer dataset](https://docs-cdn.nebula-graph.com.cn/dataset/dataset.zip) as an example.

In this example, the data set has been stored in Oracle. All vertexes and edges are stored in the `player`, `team`, `follow`, and `serve` tables. The following are some of the data for each table.

```sql
oracle> desc player;
+-----------+-------+---------------+ 
| Column    | Null  | Type          |
+-----------+-------+---------------+ 
| PLAYERID  |  -    | VARCHAR2(30)  |
| NAME      |  -    | VARCHAR2(30)  |
| AGE       |  -    | NUMBER        |
+-----------+-------+---------------+ 

oracle> desc team;
+-----------+-------+---------------+ 
| Column    | Null  | Type          |
+-----------+-------+---------------+ 
| TEAMID    |  -    | VARCHAR2(30)  |
| NAME      |  -    | VARCHAR2(30)  |
+-----------+-------+---------------+ 

oracle> desc follow;
+-------------+-------+---------------+ 
| Column      | Null  | Type          |
+-------------+-------+---------------+ 
| SRC_PLAYER  |  -    | VARCHAR2(30)  |
| DST_PLAYER  |  -    | VARCHAR2(30)  |
| DEGREE      |  -    | NUMBER        |
+-------------+-------+---------------+ 

oracle> desc serve;
+------------+-------+---------------+ 
| Column     | Null  | Type          |
+------------+-------+---------------+ 
| PLAYERID   |  -    | VARCHAR2(30)  |
| TEAMID     |  -    | VARCHAR2(30)  |
| START_YEAR |  -    | NUMBER        |
| END_YEAR   |  -    | NUMBER        |
+------------+-------+---------------+ 
```

## Environment

This example is done on MacOS. Here is the environment configuration information:

- Hardware specifications:
  - CPU: 1.7 GHz Quad-Core Intel Core i7
  - Memory: 16 GB

- Spark: 2.4.7, stand-alone

- NebulaGraph: {{nebula.release}}. [Deploy NebulaGraph with Docker Compose](../../2.quick-start/1.quick-start-workflow.md).

## Prerequisites

Before importing data, you need to confirm the following information:

- NebulaGraph has been [installed](../../4.deployment-and-installation/2.compile-and-install-nebula-graph/2.install-nebula-graph-by-rpm-or-deb.md) and deployed with the following information:

  - IP addresses and ports of Graph and Meta services.

  - The user name and password with write permission to NebulaGraph.

- Exchange has been [compiled](../ex-ug-compile.md), or [download](https://repo1.maven.org/maven2/com/vesoft/nebula-exchange/) the compiled `.jar` file directly.

- Spark has been installed.

- Learn about the Schema created in NebulaGraph, including names and properties of Tags and Edge types, and more.

- The Hadoop service has been installed and started.

## Precautions

nebula-exchange_spark_2.2 supports only single table queries, not multi-table queries.

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

### Step 2: Modify configuration files

After Exchange is compiled, copy the conf file `target/classes/application.conf` to set Oracle data source configuration. In this case, the copied file is called `oracle_application.conf`. For details on each configuration item, see [Parameters in the configuration file](../parameter-reference/ex-ug-parameter.md).

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
      # The Tag name in NebulaGraph.
      name: player
      type: {
        # Specify the data source file format to Oracle.
        source: oracle
        # Specify how to import the data into NebulaGraph: Client or SST.
        sink: client
      }

      url:"jdbc:oracle:thin:@host:1521:basketball"
      driver: "oracle.jdbc.driver.OracleDriver"
      user: "root"
      password: "123456"

      # Scanning a single table to read data.
      # nebula-exchange_spark_2.2 must configure this parameter. Sentence is not supported.
      # nebula-exchange_spark_2.4 and nebula-exchange_spark_3.0 can configure this parameter, but not at the same time as sentence.
      table:"basketball.player"

      # Use query statement to read data.
      # This parameter is not supported by nebula-exchange_spark_2.2.
      # nebula-exchange_spark_2.4 and nebula-exchange_spark_3.0 can configure this parameter, but not at the same time as table. Multi-table queries are supported.
      # sentence: "select * from people, player, team"

      # Specify the column names in the player table in fields, and their corresponding values are specified as properties in the NebulaGraph.
      # The sequence of fields and nebula.fields must correspond to each other.
      # If multiple column names need to be specified, separate them by commas.
      fields: [age,name]
      nebula.fields: [age,name]

      # Specify a column of data in the table as the source of VIDs in the NebulaGraph.
      vertex: {
        field:playerid
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
      batch: 256

      # The number of Spark partitions.
      partition: 32
    }
    # Set the information about the Tag Team.
    {
      name: team
      type: {
        source: oracle
        sink: client
      }

      url:"jdbc:oracle:thin:@host:1521:basketball"
      driver: "oracle.jdbc.driver.OracleDriver"
      user: "root"
      password: "123456"
      table: "basketball.team"
      sentence: "select teamid, name from team"

      fields: [name]
      nebula.fields: [name]
      vertex: {
        field: teamid
      }
      batch: 256
      partition: 32
    }

  ]

  # Processing edges
  edges: [
    # Set the information about the Edge Type follow.
    {
      # The corresponding Edge Type name in NebulaGraph.
      name: follow

      type: {
        # Specify the data source file format to Oracle.
        source: oracle

        # Specify how to import the Edge type data into NebulaGraph.
        # Specify how to import the data into NebulaGraph: Client or SST.
        sink: client
      }

      url:"jdbc:oracle:thin:@host:1521:basketball"
      driver: "oracle.jdbc.driver.OracleDriver"
      user: "root"
      password: "123456"

      # Scanning a single table to read data.
      # nebula-exchange_spark_2.2 must configure this parameter. Sentence is not supported.
      # nebula-exchange_spark_2.4 and nebula-exchange_spark_3.0 can configure this parameter, but not at the same time as sentence.
      table:"basketball.follow"

      # Use query statement to read data.
      # This parameter is not supported by nebula-exchange_spark_2.2.
      # nebula-exchange_spark_2.4 and nebula-exchange_spark_3.0 can configure this parameter, but not at the same time as table. Multi-table queries are supported.
      # sentence: "select * from follow, serve"

      # Specify the column names in the follow table in fields, and their corresponding values are specified as properties in the NebulaGraph.
      # The sequence of fields and nebula.fields must correspond to each other.
      # If multiple column names need to be specified, separate them by commas.
      fields: [degree]
      nebula.fields: [degree]

      # In source, use a column in the follow table as the source of the edge's source vertex.
      # In target, use a column in the follow table as the source of the edge's destination vertex.
      source: {
        field: src_player
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

      target: {
        field: dst_player
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

      # (Optional) Specify a column as the source of the rank.
      #ranking: rank

      # Batch operation types, including INSERT, UPDATE, and DELETE. defaults to INSERT.
      #writeMode: INSERT

      # The number of data written to NebulaGraph in a single batch.
      batch: 256

      # The number of Spark partitions.
      partition: 32
    }

    # Set the information about the Edge Type serve.
    {
      name: serve
      type: {
        source: oracle
        sink: client
      }

      url:"jdbc:oracle:thin:@host:1521:basketball"
      driver: "oracle.jdbc.driver.OracleDriver"
      user: "root"
      password: "123456"
      table: "basketball.serve"
      sentence: "select playerid, teamid, start_year, end_year from serve"

      fields: [start_year,end_year]
      nebula.fields: [start_year,end_year]
      source: {
        field: playerid
      }
      target: {
        field: teamid
      }
      batch: 256
      partition: 32
    }
  ]
}
```

### Step 3: Import data into NebulaGraph

Run the following command to import Oracle data into NebulaGraph. For a description of the parameters, see [Options for import](../parameter-reference/ex-ug-para-import-command.md).

```bash
${SPARK_HOME}/bin/spark-submit --master "local" --class com.vesoft.nebula.exchange.Exchange <nebula-exchange-{{exchange.release}}.jar_path> -c <oracle_application.conf_path>
```

!!! note

    JAR packages are available in two ways: [compiled them yourself](../ex-ug-compile.md), or [download](https://repo1.maven.org/maven2/com/vesoft/nebula-exchange/) the compiled `.jar` file directly.

For example:

```bash
${SPARK_HOME}/bin/spark-submit  --master "local" --class com.vesoft.nebula.exchange.Exchange  /root/nebula-exchange/nebula-exchange/target/nebula-exchange-{{exchange.release}}.jar  -c /root/nebula-exchange/nebula-exchange/target/classes/oracle_application.conf
```

You can search for `batchSuccess.<tag_name/edge_name>` in the command output to check the number of successes. For example, `batchSuccess.follow: 300`.

### Step 4: (optional) Validate data

Users can verify that data has been imported by executing a query in the NebulaGraph client (for example, NebulaGraph Studio). For example:

```ngql
LOOKUP ON player YIELD id(vertex);
```

Users can also run the [SHOW STATS](../../3.ngql-guide/7.general-query-statements/6.show/14.show-stats.md) command to view statistics.

### Step 5: (optional) Rebuild indexes in NebulaGraph

With the data imported, users can recreate and rebuild indexes in NebulaGraph. For details, see [Index overview](../../3.ngql-guide/14.native-index-statements/README.md).
