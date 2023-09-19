# Export data from NebulaGraph

The Exchange allows you to export data from NebulaGraph to a CSV file or another NebulaGraph space (supporting different NebulaGraph clusters). This topic describes the specific procedure.

!!! enterpriseonly

    Only Exchange Enterprise Edition supports exporting data from NebulaGraph.

## Preparation

This example is completed on a virtual machine equipped with Linux. The hardware and software you need to prepare before exporting data are as follows.

### Hardware

| Type | Information |
| - | - |
| CPU | 4 Intel(R) Xeon(R) Platinum 8260 CPU @ 2.30GHz |
| Memory | 16G |
| Hard disk | 50G |

### System

CentOS 7.9.2009

### Software

| Name | Version |
| - | - |
| JDK | 1.8.0 |
| Scala | 2.12.11 |
| Spark | 2.4.7 |
| NebulaGraph | {{nebula.release}} |

### Dataset

As the data source, NebulaGraph stores the [basketballplayer dataset](https://docs.nebula-graph.io/2.0/basketballplayer-2.X.ngql) in this example, the Schema elements of which are shown as follows.

| Element  | Name | Property |
| :--- | :--- | :--- |
| Tag | `player` | `name string, age int` |
| Tag | `team` | `name string` |
| Edge type | `follow` | `degree int` |
| Edge type | `serve` | `start_year int, end_year int` |

## Steps

1. Get the JAR file of Exchange Enterprise Edition from the [NebulaGraph Enterprise Edition Package](https://nebula-graph.com.cn/pricing/).

2. Modify the configuration file.
  
  Exchange Enterprise Edition provides the configuration template `export_to_csv.conf` and `export_to_nebula.conf` for exporting NebulaGraph data. For details, see [Exchange parameters](../parameter-reference/ex-ug-parameter.md). The core content of the configuration file used in this example is as follows:
  
  - Export to a CSV file:

  ```conf
  # Use the command to submit the exchange job:
  
  # spark-submit \
  # --master "spark://master_ip:7077" \
  # --driver-memory=2G --executor-memory=30G  \
  # --total-executor-cores=60 --executor-cores=20 \
  # --class com.vesoft.nebula.exchange.Exchange \
  # nebula-exchange-3.0-SNAPSHOT.jar -c export_to_csv.conf
  
  {
    # Spark config
    spark: {
      app: {
        name: NebulaGraph Exchange
      }
    }
  
    # Nebula Graph config
    # if you export nebula data to csv, please ignore these nebula config
    nebula: {
      address:{
        graph:["127.0.0.1:9669"]

        # the address of any of the meta services.
        # if your NebulaGraph server is in virtual network like k8s, please config the leader address of meta.
        meta:["127.0.0.1:9559"]
      }
      user: root
      pswd: nebula
      space: test
  
      # nebula client connection parameters
      connection {
        # socket connect & execute timeout, unit: millisecond
        timeout: 30000
      }
  
      error: {
        # max number of failures, if the number of failures is bigger than max, then exit the   application.
        max: 32
        # failed data will be recorded in output path, format with ngql
        output: /tmp/errors
      }
  
      # use google's RateLimiter to limit the requests send to NebulaGraph
      rate: {
        # the stable throughput of RateLimiter
        limit: 1024
        # Acquires a permit from RateLimiter, unit: MILLISECONDS
        # if it can't be obtained within the specified timeout, then give up the request.
        timeout: 1000
      }
    }
  
    # Processing tags
    tags: [
      {
        # you can ignore the tag name when export nebula data to csv
        name: tag-name-1
        type: {
          source: nebula
          sink: csv
        }
        metaAddress:"127.0.0.1:9559"
        space:"test"
        label:"person"
        # config the fields you want to export from nebula. If you want to export all properties, you can set this parameter to empty, that is `fields: []`.
        fields: [nebula-field-0, nebula-field-1, nebula-field-2]
        noFields:false  # default false, if true, just export id
        partition: 60
        # config the path to save your csv file. if your file in not in hdfs, config "file:///path/  test.csv"
        path: "hdfs://ip:port/path/person"
        separator: ","
        header: true
      }
    ]
  
    # process edges
    edges: [
      {
        # you can ignore the edge name when export nebula data to csv
        name: edge-name-1
        type: {
          source: nebula
          sink: csv
        }
        metaAddress:"127.0.0.1:9559"
        space:"test"
        label:"friend"
        # config the fields you want to export from nebula. If you want to export all properties, you can set this parameter to empty, that is `fields: []`.
        fields: [nebula-field-0, nebula-field-1, nebula-field-2]
        noFields:false  # default false, if true, just export id
        partition: 60
        # config the path to save your csv file. if your file in not in hdfs, config "file:///path/  test.csv"
        path: "hdfs://ip:port/path/friend"
        separator: ","
        header: true
      }
    ]
  }
  ```

  - Export to another graph space:

  ```conf
  # Use the command to submit the exchange job:
  
  # spark-submit \
  # --master "spark://master_ip:7077" \
  # --driver-memory=2G --executor-memory=30G  \
  # --total-executor-cores=60 --executor-cores=20 \
  # --class com.vesoft.nebula.exchange.Exchange \
  # nebula-exchange-3.0-SNAPSHOT.jar -c export_to_nebula.conf
  
  {
    # Spark config
    spark: {
      app: {
        name: NebulaGraph Exchange
      }
    }
  
    # Nebula Graph config, just config the sink nebula information
    nebula: {
      address:{
        graph:["127.0.0.1:9669"]

        # the address of any of the meta services
        meta:["127.0.0.1:9559"]
      }
      user: root
      pswd: nebula
      space: test
  
      # nebula client connection parameters
      connection {
        # socket connect & execute timeout, unit: millisecond
        timeout: 30000
      }
  
      error: {
        # max number of failures, if the number of failures is bigger than max, then exit the   application.
        max: 32
        # failed data will be recorded in output path, format with ngql
        output: /tmp/errors
      }
  
      # use google's RateLimiter to limit the requests send to NebulaGraph
      rate: {
        # the stable throughput of RateLimiter
        limit: 1024
        # Acquires a permit from RateLimiter, unit: MILLISECONDS
        # if it can't be obtained within the specified timeout, then give up the request.
        timeout: 1000
      }
    }
  
    # Processing tags
    tags: [
      {
        name: tag-name-1
        type: {
          source: nebula
          sink: client
        }
        # data source nebula config
        metaAddress:"127.0.0.1:9559"
        space:"test"
        label:"person"
        # mapping the fields of the original NebulaGraph to the fields of the target NebulaGraph.
        fields: [source_nebula-field-0, source_nebula-field-1, source_nebula-field-2]
        nebula.fields: [target_nebula-field-0, target_nebula-field-1, target_nebula-field-2]
        limit:10000
        vertex: _vertexId  # must be `_vertexId`
      # udf:{
      #            separator:"_"
      #            oldColNames:[field-0,field-1,field-2]
      #            newColName:new-field
      #        }
        batch: 2000
        partition: 60
      }
    ]
  
    # process edges
    edges: [
      {
        name: edge-name-1
        type: {
          source: csv
          sink: client
        }
        # data source nebula config
        metaAddress:"127.0.0.1:9559"
        space:"test"
        label:"friend"
        fields: [source_nebula-field-0, source_nebula-field-1, source_nebula-field-2]
        nebula.fields: [target_nebula-field-0, target_nebula-field-1, target_nebula-field-2]
        limit:1000
        source: _srcId # must be `_srcId`
      # udf:{
      #            separator:"_"
      #            oldColNames:[field-0,field-1,field-2]
      #            newColName:new-field
      #        }
        target: _dstId # must be `_dstId`
      # udf:{
      #            separator:"_"
      #            oldColNames:[field-0,field-1,field-2]
      #            newColName:new-field
      #        }
        ranking: source_nebula-field-2
        batch: 2000
        partition: 60
      }
    ]   
  }
  ```

3. Export data from NebulaGraph with the following command.
  
  !!! note

        The parameters of the Driver and Executor process can be modified based on your own machine configuration.

  ```bash
  <spark_install_path>/bin/spark-submit --master "spark://<master_ip>:7077" \
  --driver-memory=2G --executor-memory=30G \
  --total-executor-cores=60 --executor-cores=20 \
  --class com.vesoft.nebula.exchange.Exchange nebula-exchange-x.y.z.jar_path> \
  -c <conf_file_path>
  ```
  
  The following is an example command to export the data to a CSV file.
  
  ```bash
  $ ./spark-submit --master "spark://192.168.10.100:7077" \
  --driver-memory=2G --executor-memory=30G \
  --total-executor-cores=60 --executor-cores=20 \
  --class com.vesoft.nebula.exchange.Exchange ~/exchange-ent/nebula-exchange-ent-{{exchange.release}}.jar \
  -c ~/exchange-ent/export_to_csv.conf
  ```
  
4. Check the exported data.

  - Export to a CSV file:

    Check whether the CSV file is successfully generated under the target path, and check the contents of the CSV file to ensure that the data export is successful.
  
    ```bash
    $ hadoop fs -ls /vertex/player
    Found 11 items
    -rw-r--r--   3 nebula supergroup          0 2021-11-05 07:36 /vertex/player/_SUCCESS
    -rw-r--r--   3 nebula supergroup        160 2021-11-05 07:36 /vertex/player/    part-00000-17293020-ba2e-4243-b834-34495c0536b3-c000.csv
    -rw-r--r--   3 nebula supergroup        163 2021-11-05 07:36 /vertex/player/    part-00001-17293020-ba2e-4243-b834-34495c0536b3-c000.csv
    -rw-r--r--   3 nebula supergroup        172 2021-11-05 07:36 /vertex/player/    part-00002-17293020-ba2e-4243-b834-34495c0536b3-c000.csv
    -rw-r--r--   3 nebula supergroup        172 2021-11-05 07:36 /vertex/player/    part-00003-17293020-ba2e-4243-b834-34495c0536b3-c000.csv
    -rw-r--r--   3 nebula supergroup        144 2021-11-05 07:36 /vertex/player/    part-00004-17293020-ba2e-4243-b834-34495c0536b3-c000.csv
    -rw-r--r--   3 nebula supergroup        173 2021-11-05 07:36 /vertex/player/    part-00005-17293020-ba2e-4243-b834-34495c0536b3-c000.csv
    -rw-r--r--   3 nebula supergroup        160 2021-11-05 07:36 /vertex/player/    part-00006-17293020-ba2e-4243-b834-34495c0536b3-c000.csv
    -rw-r--r--   3 nebula supergroup        148 2021-11-05 07:36 /vertex/player/    part-00007-17293020-ba2e-4243-b834-34495c0536b3-c000.csv
    -rw-r--r--   3 nebula supergroup        125 2021-11-05 07:36 /vertex/player/    part-00008-17293020-ba2e-4243-b834-34495c0536b3-c000.csv
    -rw-r--r--   3 nebula supergroup        119 2021-11-05 07:36 /vertex/player/    part-00009-17293020-ba2e-4243-b834-34495c0536b3-c000.csv
    ```
  
  - Export to another graph space:

    Log in to the new graph space and check the statistics through `SUBMIT JOB STATS` and `SHOW STATS` commands to ensure the data export is successful.
