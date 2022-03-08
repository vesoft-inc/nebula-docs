# Nebula Analytics

Nebula Analytics is a high-performance graph computing framework tool that performs graph analysis of data in the Nebula Graph database.

!!! enterpriseonly

    Only available for the Nebula Graph Enterprise Edition.

## Scenarios

You can import data from data sources as Nebula Graph clusters, CSV files on HDFS, or local CSV files into Nebula Analytics and export the graph computation results to Nebula Graph clusters, CSV files on HDFS, or local CSV files from Nebula Analytics.


## Limitations

When you import Nebula Graph cluster data into Nebula Analytics and export the graph computation results from Nebula Analytics to a Nebula Graph cluster, the graph computation results can only be exported to the graph space where the data source is located.

## Version compatibility

The version correspondence between Nebula Analytics and Nebula Graph is as follows.

|Nebula Analytics|Nebula Graph|
|:---|:---|
|{{plato.release}}|{{nebula.release}}|

## Graph algorithms

Nebula Analytics supports the following graph algorithms.

|           Algorithm        |Description            |Category        |
|:----------------------|:----------------|:-----------|
|  APSP                 | All Pair Shortest Path      |  Path       |
|  SSSP                 | Single Source Shortest Path      | Path        |
|  BFS                  | Breadth-first search      |  Path       |
|  PageRank             | It is used to rank web pages.          | Node importance measurement   |
|  KCore                | k-Cores              | Node importance measurement   |
|  DegreeCentrality     | It is a simple count of the total number of connections linked to a vertex.           | Node importance measurement   |
|  TriangleCount        | It counts the number of triangles.         | Graph feature      |
| LPA                   | Label Propagation Algorithm          |  Community discovery    |
| WCC                   | World Competitive Contests          |  Community discovery    |
| LOUVAIN               | It detects communities in large networks.          |  Community discovery   |
| HANP                  | Hop attenuation & Node Preference   |  Community discovery    |
| Clustering Coefficient| It is a measure of the degree to which nodes in a graph tend to cluster together.          |  Clustering       |

## Install Nebula Analytics

When installing a cluster of multiple Nebula Analytics on multiple nodes, you need to install Nebula Analytics to the same path and set up SSH-free login between nodes.

```bash
sudo rpm -i nebula-analytics-1.0.0-centos.x86_64.rpm  --prefix /home/xxx/nebula-analytics
```

<!--
### Install Nebula Analytics with the source code

The preparations for compiling Nebula Analytics are similar to compiling Nebula Graph. For details, see [Resource preparations](4.deployment-and-installation/1.resource-preparations.md).
 
1. Clone the `analytics` repository.

  ```bash
  $ git clone -b {{plato.branch}} https://github.com/vesoft-inc/nebula-analytics.git
  ```

2. Access the `nebula-analytics` directory.

  ```bash
  $ cd nebula-analytics
  ```

3. Execute the following script to install compile dependencies.

  ```bash
  $ sudo ./docker/install-dependencies.sh
  ```

4. Download a static library and compile it.

  ```bash
  $ ./3rdtools.sh distclean && ./3rdtools.sh install
  ```

5. Compile Nebula Analytics.

  ```bash
  $ ./build.sh
  ```
-->

## How to use Nebula Analytics

After installation, you can set parameters of different algorithms and then execute a script to obtain the results of the algorithms and export them to the specified format.

1. Select one node from the Nebula Analytics cluster and then access the `scripts` directory.

  ```bash
  $ cd scripts
  ```

2. Confirm the data source and export path. Configuration steps are as follows.
   
  - Nebula Graph clusters as the data source
   
    1. Modify the configuration file `nebula.conf` to configure the Nebula Graph cluster. 

      ```bash
      # The number of retries connecting to Nebula Graph.
      --retry=3  
      # The name of the graph space where you read or write data.
      --space=baskeyballplayer  

      # Read data from Nebula Graph.
      # The metad process address.
      --meta_server_addrs=192.168.8.100:9559, 192.168.8.101:9559, 192.168.8.102:9559
      # The name of edges.
      --edges=LIKES  
      # The name of the property to be read as the weight of the edge. Can be either the attribute name or _rank.
      #--edge_data_fields 
      # The number of rows read per scan.
      --read_batch_size=10000  

      # Write data to Nebula Graph.
      # The graphd process address.
      --graph_server_addrs=192.168.8.100:9669  
      # The account to log into Nebula Graph.
      --user=root  
      # The password to log into Nebula Graph.
      --password=nebula  
      # The pattern used to write data back to Nebula Graph: insert or update.
      --mode=insert  
      # The tag name written back to Nebula Graph.
      --tag=pagerank  
      # The property name corresponding to the tag.
      --prop=pr  
      # The property type corresponding the the tag.
      --type=double 
      # The number of rows per write. 
      --write_batch_size=1000 
      # The file path where the data failed to be written back to Nebula Graph is stored.
      --err_file=/home/xxx/analytics/err.txt 
      ```
    
    2. Modify the related parameters in the script to be used, such as `run_pagerank.sh`. 

      ```bash
      # The sum of the number of processes running on all machines in the cluster. It is recommended to be the number of machines or the number of nodes in the NUMA architecture.
      WNUM=3 
      # The number of threads per process. It is recommended to set the maximum value to be the number of hardware threads of the machine.
      WCORES=4  
      # The path to the data source.
      # Set to read data from Nebula Graph via the nebula.conf file.
      INPUT=${INPUT:="nebula:$PROJECT/scripts/nebula.conf"}  
      # Set to read data from the CSV files on HDFS or on local directories.
      # #INPUT=${INPUT:="$PROJECT/data/graph/v100_e2150_ua_c3.csv"}

      # The export path to the graph computation results.
      # Data can be exported to a Nebula Graph. If the data source is also a Nebula Graph, the results will be exported to the graph space specified in nebula.conf.
      OUTPUT=${OUTPUT:="nebula:$PROJECT/scripts/nebula.conf"}
      # Data can also be exported to the CSV files on HDFS or on local directories.
      # OUTPUT=${OUTPUT:='hdfs://192.168.8.100:9000/_test/output'}

      # If the value is true, it is a directed graph, if false, it is an undirected graph.
      IS_DIRECTED=${IS_DIRECTED:=true}
      # Set whether to encode ID or not.
      NEED_ENCODE=${NEED_ENCODE:=true}
      # The ID type of the data source vertices. For example string, int32, and int64.
      VTYPE=${VTYPE:=int32}
      # Encoding type. The value distributed specifies the distributed vertex ID encoding. The value single specifies the single-machine vertex ID encoding. 
      ENCODER=${ENCODER:="distributed"}
      # The parameter for the PageRank algorithm. Algorithms differ in parameters.
      EPS=${EPS:=0.0001}
      DAMPING=${DAMPING:=0.85}
      # The number of iterations.
      ITERATIONS=${ITERATIONS:=100}
      ```

  - Local or HDFS CSV files as the data source

    Modify parameters in the script to be used, such as `run_pagerank.sh`.

    ```bash
    # The sum of the number of processes running on all machines in the cluster. It is recommended to be the number of machines or the number of nodes in the NUMA architecture.
    WNUM=3 
    # The number of threads per process. It is recommended to set the maximum value to be the number of hardware threads of the machine.
    WCORES=4  
    # The path to the data source.
    # Set to read data from Nebula Graph via the nebula.conf file.
    # INPUT=${INPUT:="nebula:$PROJECT/scripts/nebula.conf"}  
    # Set to read data from the CSV files on HDFS or on local directories.
    INPUT=${INPUT:="$PROJECT/data/graph/v100_e2150_ua_c3.csv"}

    # The export path to the graph computation results.
    # Data can be exported to a Nebula Graph. If the data source is also a Nebula Graph, the results will be exported to the graph space specified in nebula.conf.
    # OUTPUT=${OUTPUT:="nebula:$PROJECT/scripts/nebula.conf"}
    # Data can also be exported to the CSV files on HDFS or on local directories.
    OUTPUT=${OUTPUT:='hdfs://192.168.8.100:9000/_test/output'}

    # If the value is true, it is a directed graph, if false, it is an undirected graph.
    IS_DIRECTED=${IS_DIRECTED:=true}
    # Set whether to encode ID or not.
    NEED_ENCODE=${NEED_ENCODE:=true}
    # The ID type of the data source vertices. For example string, int32, and int64.
    VTYPE=${VTYPE:=int32}
    # The value distributed specifies the distributed vertex ID encoding. The value single specifies the single-machine vertex ID encoding. 
    ENCODER=${ENCODER:="distributed"}
    # The parameter for the PageRank algorithm. Algorithms differ in parameters.
    EPS=${EPS:=0.0001}
    DAMPING=${DAMPING:=0.85}
    # The number of iterations.
    ITERATIONS=${ITERATIONS:=100}
    ```

3. Modify the configuration file `cluster` to set the Nebula Analytics cluster nodes and task assignment weights for executing the algorithm.

  ```bash
  # Nebula Analytics Cluster Node IP Addresses: Task Assignment Weights
  192.168.8.200:1
  192.168.8.201:1
  192.168.8.202:1
  ```

4. Run the algorithm script. For example:

  ```bash
  ./run_pagerank.sh
  ```

5. View the graph computation results in the export path.

  - For exporting to a Nebula Graph cluster, check the results according to the settings in `nebula.conf`.

  - For exporting the results to the CSV files on HDFS or on local directories, check the results according to the settings in `OUTPUT`, which is a compressed file in the `.gz` format.
