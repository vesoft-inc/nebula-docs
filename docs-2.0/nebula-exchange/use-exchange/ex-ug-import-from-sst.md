# Import data from SST files

This topic provides an example of how to generate the data from the data source into an SST (Sorted String Table) file and save it on HDFS, and then import into Nebula Graph. The sample data source is a CSV file.

!!! note

    The SST file can be imported only in Linux.

## Background information

Exchange supports two data import modes:

- Import the data from the data source directly into Nebula Graph as **nGQL** statements.

- Generate the SST file from the data source, and use Console to import the SST file into Nebula Graph.

The following describes the scenarios, implementation methods, prerequisites, and steps for generating an SST file and importing data.

## Scenarios

- Suitable for online services, because the generation almost does not affect services (just reads the Schema), and the import speed is fast.

  !!! caution
  
        Although the import speed is fast, write operations in the corresponding space are blocked during the import period (about 10 seconds). Therefore, you are advised to import data in off-peak hours.

- Suitable for scenarios with a large amount of data from data sources and fast import.

## Implementation methods

Nebula Graph underlying uses RocksDB as the key-value storage engine. RocksDB is a hard disk based storage engine that provides a series of apis for creating and importing SST files to help quickly import massive data.

SST file is an internal file containing an arbitrarily long set of ordered key-value pairs for efficient storage of large amounts of key-value data. The entire process of generating SST files is mainly done by Exchange Reader, sstProcessor, and sstWriter. The whole data processing process is as follows:

1. Reader reads data from the data source.

2. sstProcessor generates the SST file from the Nebula Graph's Schema information and uploads it to the HDFS. For details about the format of the SST file, see [Data Storage Format](../../1.introduction/3.nebula-graph-architecture/4.storage-service.md).

3. SstWriter opens a file and inserts data. When generating SST files, keys must be written in sequence.

4. After the SST file is generated, RocksDB imports the SST file into Nebula Graph using the `IngestExternalFile()` method. Such as:

  ```
  IngestExternalFileOptions ifo;
  # Import two SST files
  Status s = db_->IngestExternalFile({"/home/usr/file1.sst", "/home/usr/file2.sst"}, ifo);
  if (!s.ok()) {
    printf("Error while adding file %s and %s, Error %s\n",
           file_path1.c_str(), file_path2.c_str(), s.ToString().c_str());
    return 1;
  }
  ```

  When the `IngestExternalFile()` method is called, RocksDB copies the file to the data directory by default and blocks the RocksDB write operation. If the key range in the SST file overwrites the Memtable key range, flush the Memtable to hard disk. After placing the SST file in an optimal location in the LSM tree, assign a global serial number to the file and turn on the write operation.

## Data set

This topic takes the [basketballplayer dataset](https://docs-cdn.nebula-graph.com.cn/dataset/dataset.zip) as an example.

## Environment

This example is done on MacOS. Here is the environment configuration information:

- Hardware specifications:
  - CPU: 1.7 GHz Quad-Core Intel Core i7
  - memory: 16 GB

- Spark: 2.4.7, Stand-alone

- Hadoop: 2.9.2, Pseudo-distributed deployment

- Nebula Graph: {{nebula.release}} 

## Prerequisites

Before importing data, you need to confirm the following information:

- Nebula Graph has been [installed](../../4.deployment-and-installation/2.compile-and-install-nebula-graph/2.install-nebula-graph-by-rpm-or-deb.md) and deployed with the following information:

  - IP address and port of Graph and Meta services.

  - User name and password with Nebula Graph write permission.

  - `--ws_storage_http_port` in the Meta service configuration file is the same as `--ws_http_port` in the Storage service configuration file. For example, `1977`.

  - `--ws_meta_http_port` in the Graph service configuration file is the same as `--ws_http_port` in the Meta service configuration file. For example, `19559`.

  - Schema information, including Tag and Edge type names, properties, and more.

- Exchange has been [compiled](../ex-ug-compile.md), or [download](https://repo1.maven.org/maven2/com/vesoft/nebula-exchange/) the compiled `.jar` file directly.

- Spark has been installed.

- JDK 1.8 or later has been installed and the environment variable `JAVA_HOME` has been configured.

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

### Step 2: Process CSV files

Confirm the following information:

1. Process CSV files to meet Schema requirements.

  !!! note

        Exchange supports uploading CSV files with or without headers.

2. Obtain the CSV file storage path.

### Step 3: Modify configuration file

After Exchange is compiled, copy the conf file `target/classes/application.conf` settings SST data source configuration. In this case, the copied file is called `sst_application.conf`. For details on each configuration item, see [Parameters in the configuration file](../parameter-reference/ex-ug-parameter.md).

```conf
{
  # Spark configuration
  spark: {
    app: {
      name: Nebula Exchange 2.0
    }

    master:local

    driver: {
      cores: 1
      maxResultSize: 1G
    }

    executor: {
        memory:1G
    }

    cores:{
      max: 16
    }
  }

  # Nebula Graph configuration
  nebula: {
    address:{
      graph:["127.0.0.1:9669"]
      meta:["127.0.0.1:9559"]
    }
    user: root
    pswd: nebula
    space: basketballplayer

    # SST file configuration
    path:{
        # Local directory that temporarily stores generated SST files
        local:"/tmp"

        # Path for storing the SST file in the HDFS
        remote:"/sst"
        
        # NameNode address of HDFS
        hdfs.namenode: "hdfs://*.*.*.*:9000"
    }

    # Client connection parameters
    connection {
      # Timeout duration of socket connection and execution, in milliseconds.
      timeout: 30000
    }

    error: {
      # Maximum number of failures that will exit the application.
      max: 32
      # Failed import jobs are logged in the output path.
      output: /tmp/errors
    }

    # Use Google's RateLimiter to limit calls to NebulaGraph.
    rate: {
      # Steady throughput of RateLimiter.
      limit: 1024

      # Get the allowed timeout from RateLimiter, in milliseconds
      timeout: 1000
    }
  }


  # Processing vertex
  tags: [
    # Set information about Tag player.
    {
      name: player
      type: {
        # Specify the data source file format, set to CSV.
        source: csv

        # Specifies how to import the data into Nebula Graph: Client or SST.
        sink: sst
      }

      # Specify the path to the CSV file.
      # If the file is stored in HDFS, use double quotation marks to enclose the file path, starting with hdfs://, for example, "hdfs://ip:port/xx/xx".
      path: "hdfs://*.*.*.*:9000/dataset/vertex_player.csv"

      # If the CSV file does not have a header, use [_c0, _c1, _c2, ..., _cn] to represent its header and indicate the columns as the source of the property values.
      # If the CSV file has headers, use the actual column names.
      fields: [_c1, _c2]

      # Specify the column names in the player table in fields, and their corresponding values are specified as properties in the Nebula Graph.
      # The sequence of fields and nebula.fields must correspond to each other.
      nebula.fields: [age, name]

      # Specify a column of data in the table as the source of vertex VID in the Nebula Graph.
      # Currently, Nebula Graph {{nebula.release}} supports only strings or integers of VID.
      vertex: {
        field:_c0
      }

      # The delimiter specified. The default value is comma.
      separator: ","

      # If the CSV file have header, set the header to true.
      # If the CSV file does not have header, set the header to false. The default value is false.
      header: false

      # Number of pieces of data written to Nebula Graph in a single batch.
      batch: 256

      # Number of Spark partitions
      partition: 32
    }

    # Set Tag Team information.
    {
      name: team
      type: {
        source: csv
        sink: sst
      }
      path: "hdfs://*.*.*.*:9000/dataset/vertex_team.csv"
      fields: [_c1]
      nebula.fields: [name]
      vertex: {
        field:_c0
      }
      separator: ","
      header: false
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
        # Specify the data source file format, set to CSV.
        source: csv

        # Specifies how to import the data into Nebula Graph: Client or SST.
        sink: sst
      }

      # Specify the path to the CSV file.
      # If the file is stored in HDFS, use double quotation marks to enclose the file path, starting with hdfs://, for example, "hdfs://ip:port/xx/xx".
      path: "hdfs://*.*.*.*:9000/dataset/edge_follow.csv"

      # If the CSV file does not have a header, use [_c0, _c1, _c2, ..., _cn] to represent its header and indicate the columns as the source of the property values.
      # If the CSV file has headers, use the actual column names.
      fields: [_c2]

      # Specify the column names in the edge table in fields, and their corresponding values are specified as properties in the Nebula Graph.
      # The sequence of fields and nebula.fields must correspond to each other.
      nebula.fields: [degree]

      # Specify a column as the source for the starting and destination vertexes.
      # Currently, Nebula Graph {{nebula.release}} supports only strings or integers of VID.
      source: {
        field: _c0
      }
      target: {
        field: _c1
      }

      # The delimiter specified. The default value is comma.
      separator: ","

      # (optionally) Specify a column as the source of the rank.

      #ranking: rank

      # If the CSV file have header, set the header to true.
      # If the CSV file does not have header, set the header to false. The default value is false.
      header: false

      # Number of pieces of data written to Nebula Graph in a single batch.
      batch: 256

      # Number of Spark partitions
      partition: 32
    }

    # Set information about Edge Type serve.
    {
      name: serve
      type: {
        source: csv
        sink: sst
      }
      path: "hdfs://*.*.*.*:9000/dataset/edge_serve.csv"
      fields: [_c2,_c3]
      nebula.fields: [start_year, end_year]
      source: {
        field: _c0
      }
      target: {
        field: _c1
      }
      separator: ","
      header: false
      batch: 256
      partition: 32
    }

  ]
  # If more edges need to be added, refer to the previous configuration to add them.
}
```

### Step 4: Generate the SST file

Run the following command to generate the SST file from the CSV source file. For a description of the parameters, see [Options for import](../parameter-reference/ex-ug-para-import-command.md).

```bash
${SPARK_HOME}/bin/spark-submit --master "local" --class com.vesoft.nebula.exchange.Exchange <nebula-exchange-{{exchange.release}}.jar_path> -c <sst_application.conf_path> 
```

!!! note

    JAR packages are available in two ways: [compiled them yourself](../ex-ug-compile.md), or [download](https://repo1.maven.org/maven2/com/vesoft/nebula-exchange/) the compiled `.jar` file directly.

Example:

```bash
${SPARK_HOME}/bin/spark-submit  --master "local" --class com.vesoft.nebula.exchange.Exchange  /root/nebula-spark-utils/nebula-exchange/target/nebula-exchange-{{exchange.release}}.jar  -c /root/nebula-spark-utils/nebula-exchange/target/classes/sst_application.conf
```

After the task is complete, you can view the generated SST file in the `/sst` directory (specified by `nebula.path.remote` parameter) on HDFS.

!!! note

    If you modify the Schema, such as rebuilding the graph space, modifying the Tag, or modifying the Edge type, you need to regenerate the SST file because the SST file verifies the space ID, Tag ID, and Edge ID.

### Step 5: Import the SST file

Connect to the Nebula Graph database using the client tool and import the SST file as follows:

1. Run the following command to select the graph space you created earlier.

  ```ngql
  nebula> USE basketballplayer;
  ```

2. Run the following command to download the SST file:

  ```ngql
  nebula> DOWNLOAD HDFS "hdfs://<hadoop_address>:<hadoop_port>/<sst_file_path>";
  ```

  Example:

  ```ngql
  nebula> DOWNLOAD HDFS "hdfs://*.*.*.*:9000/sst";
  ```

2. Run the following command to import the SST file:

  ```ngql
  nebula> INGEST;
  ```

!!! note

    - To download the SST file again, delete the `download` folder in the space ID in the `data/storage/nebula` directory in the Nebula Graph installation path, and then download the SST file again. If the space is multiple copies, the `download` folder needs to be deleted on all machines where the copies are saved.

    - If there is a problem with the import and you need to re-import, re-execute `INGEST;`.

### Step 6: (optional) Validation data

Users can verify that data has been imported by executing a query in the Nebula Graph client (for example, Nebula Graph Studio). Such as:

```ngql
GO FROM "player100" OVER follow;
```

Users can also run the [SHOW STATS](../../3.ngql-guide/7.general-query-statements/6.show/14.show-stats.md) command to view statistics.

### Step 7: (optional) Rebuild indexes in Nebula Graph

With the data imported, users can recreate and rebuild indexes in Nebula Graph. For details, see [Index overview](../../3.ngql-guide/14.native-index-statements/README.md).
