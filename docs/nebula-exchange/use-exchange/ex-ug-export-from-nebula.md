# Export data from Nebula Graph

This topic uses an example to illustrate how to use Exchange to export data from Nebula Graph to a CSV file.

!!! enterpriseonly

    Only Exchange Enterprise Edition supports exporting data from Nebula Graph to a CSV file.

!!! note

    SSL encryption is not supported when exporting data from Nebula Graph.

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
| Hadoop | 2.10.1 |
| Scala | 2.12.11 |
| Spark | 2.4.7 |
| Nebula Graph | {{nebula.release}} |

### Dataset

As the data source, Nebula Graph stores the [basketballplayer dataset](https://docs.nebula-graph.io/2.0/basketballplayer-2.X.ngql) in this example, the Schema elements of which are shown as follows.

| Element  | Name | Property |
| :--- | :--- | :--- |
| Tag | `player` | `name string, age int` |
| Tag | `team` | `name string` |
| Edge type | `follow` | `degree int` |
| Edge type | `serve` | `start_year int, end_year int` |

## Steps

1. Get the JAR file of Exchange Enterprise Edition from the [Nebula Graph Enterprise Edition Package](https://nebula-graph.com.cn/pricing/).

2. Modify the configuration file.
  
  Exchange Enterprise Edition provides the configuration template `export_application.conf` for exporting Nebula Graph data. For details, see [Exchange parameters](../parameter-reference/ex-ug-parameter.md). The core content of the configuration file used in this example is as follows:
  
  ```conf
  ...
  
    # Processing tags
    # There are tag config examples for different dataSources.
    tags: [
      # export NebulaGraph tag data to csv, only support export to CSV for now.
      {
        name: player
        type: {
          source: Nebula
          sink: CSV
        }
        # the path to save the NebulaGrpah data, make sure the path doesn't exist.
        path:"hdfs://192.168.8.177:9000/vertex/player"
        # if no need to export any properties when export NebulaGraph tag data
        # if noField is configured true, just export vertexId
        noField:false
        # define properties to export from NebulaGraph tag data
        # if return.fields is configured as empty list, then export all properties
        return.fields:[]
        # nebula space partition number
        partition:10
      }
  
  ...
  
    ]
  
    # Processing edges
    # There are edge config examples for different dataSources.
    edges: [
      # export NebulaGraph tag data to csv, only support export to CSV for now.
      {
        name: follow
        type: {
          source: Nebula
          sink: CSV
        }
        # the path to save the NebulaGrpah data, make sure the path doesn't exist.
        path:"hdfs://192.168.8.177:9000/edge/follow"
        # if no need to export any properties when export NebulaGraph edge data
        # if noField is configured true, just export src,dst,rank
        noField:false
        # define properties to export from NebulaGraph edge data
        # if return.fields is configured as empty list, then export all properties
        return.fields:[]
        # nebula space partition number
        partition:10
      }
  
  ...
  
    ]
  }
  ```

3. Export data from Nebula Graph with the following command.
  
  ```bash
  <spark_install_path>/bin/spark-submit --master "local" --class com.vesoft.nebula.exchange.Exchange nebula-exchange-x.y.z.jar_path> -c <export_application.conf_path>
  ```
  
  The command used in this example is as follows.
  
  ```bash
  $ ./spark-submit --master "local" --class com.vesoft.nebula.exchange.Exchange \
    ~/exchange-ent/nebula-exchange-ent-{{exchange.release}}.jar -c ~/exchange-ent/export_application.conf
  ```
  
4. Check the exported data.

  1. Check whether the CSV file is successfully generated under the target path.
  
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
  
  2. Check the contents of the CSV file to ensure that the data export is successful.
