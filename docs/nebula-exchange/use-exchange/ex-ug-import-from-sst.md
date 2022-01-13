# Import data from SST files

This topic provides an example of how to generate the data from the data source into an SST (Sorted String Table) file and save it on HDFS, and then import it into Nebula Graph. The sample data source is a CSV file.

## Precautions

- The SST file can be imported only in Linux.

- The default value of the property is not supported.

## Background information

Exchange supports two data import modes:

- Import the data from the data source directly into Nebula Graph as **nGQL** statements.

- Generate the SST file from the data source, and use Console to import the SST file into Nebula Graph.

The following describes the scenarios, implementation methods, prerequisites, and steps for generating an SST file and importing data.

## Scenarios

- Suitable for online services, because the generation almost does not affect services (just reads the Schema), and the import speed is fast.

  !!! caution
  
        Although the import speed is fast, write operations in the corresponding space are blocked during the import period (about 10 seconds). Therefore, you are advised to import data in off-peak hours.

- Suitable for scenarios with a large amount of data from data sources for its fast import speed.

## Implementation methods

The underlying code in Nebula Graph uses RocksDB as the key-value storage engine. RocksDB is a storage engine based on the hard disk, providing a series of APIs for creating and importing SST files to help quickly import massive data.

The SST file is an internal file containing an arbitrarily long set of ordered key-value pairs for efficient storage of large amounts of key-value data. The entire process of generating SST files is mainly done by Exchange Reader, sstProcessor, and sstWriter. The whole data processing steps are as follows:

1. Reader reads data from the data source.

2. sstProcessor generates the SST file from the Nebula Graph's Schema information and uploads it to the HDFS. For details about the format of the SST file, see [Data Storage Format](../../1.introduction/3.nebula-graph-architecture/4.storage-service.md).

3. sstWriter opens a file and inserts data. When generating SST files, keys must be written in sequence.

4. After the SST file is generated, RocksDB imports the SST file into Nebula Graph using the `IngestExternalFile()` method. For example:

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

  When the `IngestExternalFile()` method is called, RocksDB copies the file to the data directory by default and blocks the RocksDB write operation. If the key range in the SST file overwrites the Memtable key range, flush the Memtable to the hard disk. After placing the SST file in an optimal location in the LSM tree, assign a global serial number to the file and turn on the write operation.

## Data set

This topic takes the [basketballplayer dataset](https://docs-cdn.nebula-graph.com.cn/dataset/dataset.zip) as an example.

## Environment

This example is done on MacOS. Here is the environment configuration information:

- Hardware specifications:
  - CPU: 1.7 GHz Quad-Core Intel Core i7
  - Memory: 16 GB

- Spark: 2.4.7, stand-alone

- Hadoop: 2.9.2, pseudo-distributed deployment

- Nebula Graph: {{nebula.release}}.

## Prerequisites

Before importing data, you need to confirm the following information:

- Nebula Graph has been [installed](../../4.deployment-and-installation/2.compile-and-install-nebula-graph/2.install-nebula-graph-by-rpm-or-deb.md) and deployed with the following information:

  - IP addresses and ports of Graph and Meta services.

  - The user name and password with write permission to Nebula Graph.

  - `--ws_storage_http_port` in the Meta service configuration file is the same as `--ws_http_port` in the Storage service configuration file. For example, `19779`.

  - `--ws_meta_http_port` in the Graph service configuration file is the same as `--ws_http_port` in the Meta service configuration file. For example, `19559`.

  - The information about the Schema, including names and properties of Tags and Edge types, and more.

- Exchange has been [compiled](../ex-ug-compile.md), or [download](https://repo1.maven.org/maven2/com/vesoft/nebula-exchange/) the compiled `.jar` file directly.

- Spark has been installed.

- JDK 1.8 or the later version has been installed and the environment variable `JAVA_HOME` has been configured.

- The Hadoop service has been installed and started.

  !!! note

      - To generate SST files of other data sources, see documents of the corresponding data source and check the prerequisites.

      - To generate SST files only, users do not need to install the Hadoop service on the machine where the Storage service is deployed.

      - To delete the SST file after the ingest (data import) operation, add the configuration `-- move_Files =true` to the Storage Service configuration file.

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
    ## Create a graph space
    nebula> CREATE SPACE basketballplayer \
            (partition_num = 10, \
            replica_factor = 1, \
            vid_type = FIXED_STRING(30));
    
    ## Use the graph space basketballplayer
    nebula> USE basketballplayer;
    
    ## Create the Tag player
    nebula> CREATE TAG player(name string, age int);
    
    ## Create the Tag team
    nebula> CREATE TAG team(name string);
    
    ## Create the Edge type follow
    nebula> CREATE EDGE follow(degree int);

    ## Create the Edge type serve
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

After Exchange is compiled, copy the conf file `target/classes/application.conf` to set SST data source configuration. In this example, the copied file is called `sst_application.conf`. For details on each configuration item, see [Parameters in the configuration file](../parameter-reference/ex-ug-parameter.md).

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
        # The local directory that temporarily stores generated SST files
        local:"/tmp"

        # The path for storing the SST file in the HDFS
        remote:"/sst"
        
        # The NameNode address of HDFS
        hdfs.namenode: "hdfs://*.*.*.*:9000"
    }

    # The connection parameters of clients
    connection {
      # The timeout duration of socket connection and execution. Unit: milliseconds.
      timeout: 30000
    }

    error: {
      # The maximum number of failures that will exit the application.
      max: 32
      # Failed import jobs are logged in the output path.
      output: /tmp/errors
    }

    # Use Google's RateLimiter to limit requests to NebulaGraph.
    rate: {
      # Steady throughput of RateLimiter.
      limit: 1024

      # Get the allowed timeout duration from RateLimiter. Unit: milliseconds.
      timeout: 1000
    }
  }


  # Processing vertices
  tags: [
    # Set the information about the Tag player.
    {
      # Specify the Tag name defined in Nebula Graph.
      name: player
      type: {
        # Specify the data source file format to CSV.
        source: csv

        # Specify how to import the data into Nebula Graph: Client or SST.
        sink: sst
      }

      # Specify the path to the CSV file.
      # If the file is stored in HDFS, use double quotation marks to enclose the file path, starting with hdfs://. For example, "hdfs://ip:port/xx/xx.csv".
      path: "hdfs://*.*.*.*:9000/dataset/vertex_player.csv"

      # If the CSV file does not have a header, use [_c0, _c1, _c2, ..., _cn] to represent its header and indicate the columns as the source of the property values.
      # If the CSV file has a header, use the actual column name.
      fields: [_c1, _c2]

      # Specify the property name defined in Nebula Graph.
      # The sequence of fields and nebula.fields must correspond to each other.
      nebula.fields: [age, name]

      # Specify a column of data in the table as the source of VIDs in Nebula Graph.
      # The value of vertex must be consistent with the column name in the above fields or csv.fields.
      # Currently, Nebula Graph {{nebula.release}} supports only strings or integers of VID.
      vertex: {
        field:_c0
      }

      # The delimiter specified. The default value is comma.
      separator: ","

      # If the CSV file has a header, set the header to true.
      # If the CSV file does not have a header, set the header to false. The default value is false.
      header: false

      # The number of data written to Nebula Graph in a single batch.
      batch: 256

      # The number of Spark partitions.
      partition: 32
    }

    # Set the information about the Tag Team.
    {
      # Specify the Tag name defined in Nebula Graph.
      name: team
      type: {
        # Specify the data source file format to CSV.
        source: csv

        # Specify how to import the data into Nebula Graph: Client or SST.
        sink: sst
      }

      # Specify the path to the CSV file.
      # If the file is stored in HDFS, use double quotation marks to enclose the file path, starting with hdfs://. For example, "hdfs://ip:port/xx/xx.csv".
      path: "hdfs://*.*.*.*:9000/dataset/vertex_team.csv"

      # If the CSV file does not have a header, use [_c0, _c1, _c2, ..., _cn] to represent its header and indicate the columns as the source of the property values.
      # If the CSV file has a header, use the actual column name.
      fields: [_c1]

      # Specify the property name defined in Nebula Graph.
      # The sequence of fields and nebula.fields must correspond to each other.
      nebula.fields: [name]

      # Specify a column of data in the table as the source of VIDs in Nebula Graph.
      # The value of vertex must be consistent with the column name in the above fields or csv.fields.
      # Currently, Nebula Graph {{nebula.release}} supports only strings or integers of VID.
      vertex: {
        field:_c0
      }

      # The delimiter specified. The default value is comma.
      separator: ","

      # If the CSV file has a header, set the header to true.
      # If the CSV file does not have a header, set the header to false. The default value is false.
      header: false

      # The number of data written to Nebula Graph in a single batch.
      batch: 256

      # The number of Spark partitions.
      partition: 32
    }



    # If more vertices need to be added, refer to the previous configuration to add them.
  ]
  # Processing edges
  edges: [
    # Set the information about the Edge Type follow.
    {
      # The Edge Type name defined in Nebula Graph.
      name: follow
      type: {
        # Specify the data source file format to CSV.
        source: csv

        # Specify how to import the data into Nebula Graph: Client or SST.
        sink: sst
      }

      # Specify the path to the CSV file.
      # If the file is stored in HDFS, use double quotation marks to enclose the file path, starting with hdfs://. For example, "hdfs://ip:port/xx/xx.csv".
      path: "hdfs://*.*.*.*:9000/dataset/edge_follow.csv"

      # If the CSV file does not have a header, use [_c0, _c1, _c2, ..., _cn] to represent its header and indicate the columns as the source of the property values.
      # If the CSV file has a header, use the actual column name.
      fields: [_c2]

      # Specify the property name defined in Nebula Graph.
      # The sequence of fields and nebula.fields must correspond to each other.
      nebula.fields: [degree]

      # Specify a column as the source for the source and destination vertices.
      # The value of vertex must be consistent with the column name in the above fields or csv.fields.
      # Currently, Nebula Graph {{nebula.release}} supports only strings or integers of VID.
      source: {
        field: _c0
      }
      target: {
        field: _c1
      }

      # The delimiter specified. The default value is comma.
      separator: ","

      # (Optional) Specify a column as the source of the rank.

      #ranking: rank

      # If the CSV file has a header, set the header to true.
      # If the CSV file does not have a header, set the header to false. The default value is false.
      header: false

      # The number of data written to Nebula Graph in a single batch.
      batch: 256

      # The number of Spark partitions.
      partition: 32
    }

    # Set the information about the Edge Type serve.
    {
      # Specify the Edge type name defined in Nebula Graph.
      name: serve
      type: {
        # Specify the data source file format to CSV.
        source: csv

        # Specify how to import the data into Nebula Graph: Client or SST.
        sink: sst
      }

      # Specify the path to the CSV file.
      # If the file is stored in HDFS, use double quotation marks to enclose the file path, starting with hdfs://. For example, "hdfs://ip:port/xx/xx.csv".
      path: "hdfs://*.*.*.*:9000/dataset/edge_serve.csv"

      # If the CSV file does not have a header, use [_c0, _c1, _c2, ..., _cn] to represent its header and indicate the columns as the source of the property values.
      # If the CSV file has a header, use the actual column name.
      fields: [_c2,_c3]

      # Specify the property name defined in Nebula Graph.
      # The sequence of fields and nebula.fields must correspond to each other.
      nebula.fields: [start_year, end_year]

      # Specify a column as the source for the source and destination vertices.
      # The value of vertex must be consistent with the column name in the above fields or csv.fields.
      # Currently, Nebula Graph {{nebula.release}} supports only strings or integers of VID.
      source: {
        field: _c0
      }
      target: {
        field: _c1
      }

      # The delimiter specified. The default value is comma.
      separator: ","

      # (Optional) Specify a column as the source of the rank.
      #ranking: _c5

      # If the CSV file has a header, set the header to true.
      # If the CSV file does not have a header, set the header to false. The default value is false.
      header: false

      # The number of data written to Nebula Graph in a single batch.
      batch: 256

      # The number of Spark partitions.
      partition: 32
    }

  ]
  # If more edges need to be added, refer to the previous configuration to add them.
}
```

### Step 4: Generate the SST file

Run the following command to generate the SST file from the CSV source file. For a description of the parameters, see [Options for import](../parameter-reference/ex-ug-para-import-command.md).

```bash
${SPARK_HOME}/bin/spark-submit --master "local" --conf spark.sql.shuffle.partition=<shuffle_concurrency> --class com.vesoft.nebula.exchange.Exchange <nebula-exchange-{{exchange.release}}.jar_path> -c <sst_application.conf_path> 
```

!!! note

    When generating SST files, the shuffle operation of Spark will be involved. Note that the configuration of `spark.sql.shuffle.partition` should be added when you submit the command.

!!! note

    JAR packages are available in two ways: [compiled them yourself](../ex-ug-compile.md), or [download](https://repo1.maven.org/maven2/com/vesoft/nebula-exchange/) the compiled `.jar` file directly.

For example:

```bash
${SPARK_HOME}/bin/spark-submit  --master "local" --conf spark.sql.shuffle.partition=200 --class com.vesoft.nebula.exchange.Exchange  /root/nebula-exchange/nebula-exchange/target/nebula-exchange-{{exchange.release}}.jar  -c /root/nebula-exchange/nebula-exchange/target/classes/sst_application.conf
```

After the task is complete, you can view the generated SST file in the `/sst` directory (specified by the `nebula.path.remote` parameter) on HDFS.

!!! note

    If you modify the Schema, such as rebuilding the graph space, modifying the Tag, or modifying the Edge type, you need to regenerate the SST file because the SST file verifies the space ID, Tag ID, and Edge ID.

### Step 5: Import the SST file

!!! note

    Confirm the following information before importing:

    - Confirm that the Hadoop service has been deployed on all the machines where the Storage service is deployed, and configure `HADOOP_HOME` and `JAVA_HOME`.

    - The `--ws_storage_http_port` in the Meta service configuration file (add it manually if it does not exist) is the same as the `--ws_http_port` in the Storage service configuration file. For example, both are `19779`.

    - The `--ws_meta_http_port` in the Graph service configuration file (add it manually if it does not exist) is the same as the `--ws_http_port` in the Meta service configuration file. For example, both are `19559`.

Connect to the Nebula Graph database using the client tool and import the SST file as follows:

1. Run the following command to select the graph space you created earlier.

  ```ngql
  nebula> USE basketballplayer;
  ```

2. Run the following command to download the SST file:

  ```ngql
  nebula> DOWNLOAD HDFS "hdfs://<hadoop_address>:<hadoop_port>/<sst_file_path>";
  ```

  For example:

  ```ngql
  nebula> DOWNLOAD HDFS "hdfs://*.*.*.*:9000/sst";
  ```

2. Run the following command to import the SST file:

  ```ngql
  nebula> INGEST;
  ```

!!! note

    - To download the SST file again, delete the `download` folder in the space ID in the `data/storage/nebula` directory in the Nebula Graph installation path, and then download the SST file again. If the space has multiple copies, the `download` folder needs to be deleted on all machines where the copies are saved.

    - If there is a problem with the import and re-importing is required, re-execute `INGEST;`.

### Step 6: (optional) Validate data

Users can verify that data has been imported by executing a query in the Nebula Graph client (for example, Nebula Graph Studio). For example:

```ngql
GO FROM "player100" OVER follow;
```

Users can also run the [`SHOW STATS`](../../3.ngql-guide/7.general-query-statements/6.show/14.show-stats.md) command to view statistics.

### Step 7: (optional) Rebuild indexes in Nebula Graph

With the data imported, users can recreate and rebuild indexes in Nebula Graph. For details, see [Index overview](../../3.ngql-guide/14.native-index-statements/README.md).
