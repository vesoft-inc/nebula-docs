# NebulaGraph Analytics

NebulaGraph Analytics is a high-performance graph computing framework tool that performs graph analysis of data in the NebulaGraph database.

!!! enterpriseonly

    This NebulaGraph Analytics tool is available in the NebulaGraph Enterprise Edition only.

## Prerequisites

- The NebulaGraph Analytics installation package has been obtained. [Contact us](https://www.nebula-graph.io/contact) to apply.

- The [license key](../9.about-license/2.license-management-suite/3.license-manager.md) is loaded.

- The [HDFS](https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-common/ClusterSetup.html) 2.2.x or later has been deployed.

- The JDK 1.8 has been deployed.

## Scenarios

You can import data from data sources as NebulaGraph clusters, CSV files on HDFS, or local CSV files into NebulaGraph Analytics and export the graph computation results to NebulaGraph clusters, CSV files on HDFS, or local CSV files from NebulaGraph Analytics.


## Limitations

When you import NebulaGraph cluster data into NebulaGraph Analytics and export the graph computation results from NebulaGraph Analytics to a NebulaGraph cluster, the graph computation results can only be exported to the graph space where the data source is located.

## Version compatibility

The version correspondence between NebulaGraph Analytics and NebulaGraph is as follows.

|NebulaGraph |NebulaGraph Analytics |
|:---|:---|
|3.5.0| 3.5.0 |
|3.4.0 ~ 3.4.1| 3.5.0、3.4.0 |
|3.3.0      | 3.3.0 |
|3.1.0 ~ 3.2.x| 3.2.0 |
|3.0.x      | 1.0.x |
|2.6.x      | 0.9.0 |

## Graph algorithms

NebulaGraph Analytics supports the following graph algorithms.

|           Algorithm        |Description            |Category        |
|:----------------------|:----------------|:-----------|
|  APSP                 | All Pair Shortest Path      |  Path       |
|  SSSP                 | Single Source Shortest Path      | Path        |
|  BFS                  | Breadth-first search      |  Path       |
| ShortestPath | The shortest path | Path |
|  PageRank             | It is used to rank web pages.          | Node importance measurement   |
|  KCore                | k-Cores              | Node importance measurement   |
|  DegreeCentrality     | It is a simple count of the total number of connections linked to a vertex.           | Node importance measurement   |
|  DegreeWithTime        | Neighbor statistics based on the time range of edge ranks | Node importance measurement  |
| BetweennessCentrality | Intermediate centrality | Node importance measurement|
| ClosenessCentrality    | Closeness centrality   | Node importance measurement|
|  TriangleCount        | It counts the number of triangles.         | Graph feature      |
|  Node2Vec              | Graph neural network        | Graph feature       |
|  Tree_stat             | Tree structure statistics        | Graph feature       |
|  HyperANF              | Estimate the average distance of the graph     | Graph feature      |
| LPA                   | Label Propagation Algorithm          |  Community discovery    |
| WCC                   | Weakly connected component          |  Community discovery    |
| LOUVAIN               | It detects communities in large networks.          |  Community discovery   |
| InfoMap | Community classification | Community discovery |
| HANP                  | Hop attenuation & Node Preference   |  Community discovery    |
| Clustering Coefficient| It is a measure of the degree to which nodes in a graph tend to cluster together.          |  Clustering       |
| Jaccard               | Jaccard similarity | Similarity|

## Install NebulaGraph Analytics

1. Install the NebulaGraph Analytics. When installing a cluster of multiple NebulaGraph Analytics on multiple nodes, you need to install NebulaGraph Analytics to the same path and set up SSH-free login between nodes.

  ```
  sudo rpm -ivh <analytics_package_name> --prefix <install_path>
  sudo chown <user>:<user> -R <install path>
  ```

  For example:

  ```
  sudo rpm -ivh nebula-analytics-{{plato.release}}-centos.x86_64.rpm --prefix=/home/vesoft/nebula-analytics
  sudo chown vesoft:vesoft -R /home/vesoft/nebula-analytics
  ```

2. Configure the correct Hadoop path and JDK path in the file `set_env.sh`, the file path is `nebula-analytics/scripts/set_env.sh`. If there are multiple machines, ensure that the paths are the same.

  !!! note

        The default TCP port range used by the MPICH process manager and MPICH library is 10000 to 10100. To adjust this, modify the value of the environment variable `MPIR_CVAR_CH3_PORT_RANGE` in the `set_env.sh` file.

  ```
  export HADOOP_HOME=<hadoop_path>
  export JAVA_HOME=<java_path>
  ```

3. Configure the `analytics.conf` file with the path `nebula-analytics/scripts/analytics.conf`. Set the value of `license_manager_url` to the host IP and port number `9119` where the license management tool is located, e.g. `192.168.8.100:9119`.

<!--
### Install NebulaGraph Analytics with the source code

The preparations for compiling NebulaGraph Analytics are similar to compiling NebulaGraph. For details, see [Resource preparations](4.deployment-and-installation/1.resource-preparations.md).
 
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

5. Compile NebulaGraph Analytics.

  ```bash
  $ ./build.sh
  ```
-->

## How to use NebulaGraph Analytics

After installation, you can set parameters of different algorithms and then execute a script to obtain the results of the algorithms and export them to the specified format.

1. Select one node from the NebulaGraph Analytics cluster and then access the `scripts` directory.

  ```bash
  $ cd scripts
  ```

2. Confirm the data source and export path. Configuration steps are as follows.
   
  - NebulaGraph clusters as the data source
   
    1. Modify the configuration file `nebula.conf` to configure the NebulaGraph cluster. 

      ```bash
      # The number of retries connecting to NebulaGraph.
      --retry=3  
      # The name of the graph space where you read or write data.
      --space=baskeyballplayer  

      # Read data from NebulaGraph.
      # The name of edges.
      --edges=LIKES  
      # The name of the property to be read as the weight of the edge. Can be either the attribute name or _rank.
      #--edge_data_fields 
      # The number of rows read per scan.
      --read_batch_size=10000  

      # Write data to NebulaGraph.
      # The graphd process address.
      --graph_server_addrs=192.168.8.100:9669  
      # The account to log into NebulaGraph.
      --user=root  
      # The password to log into NebulaGraph.
      --password=nebula  
      # The pattern used to write data back to NebulaGraph: insert or update.
      --mode=insert  
      # The tag name written back to NebulaGraph.
      --tag=pagerank  
      # The property name corresponding to the tag.
      --prop=pr  
      # The property type corresponding the the tag.
      --type=double 
      # The number of rows per write. 
      --write_batch_size=1000 
      # The file path where the data failed to be written back to NebulaGraph is stored.
      --err_file=/home/xxx/analytics/err.txt 
      
      # other
      # The access timeout period of the service.
      --graphd_timeout=60000
      --metad_timeout=60000
      --storaged_timeout=60000
      ```
    
    2. Modify the related parameters in the script to be used, such as `run_pagerank.sh`. 

      ```bash
      # The sum of the number of processes running on all machines in the cluster. It is recommended to be the number of machines or the number of nodes in the NUMA architecture.
      WNUM=3 
      # The number of threads per process. It is recommended to set the maximum value to be the number of hardware threads of the machine.
      WCORES=4  
      # The path to the data source.
      # Set to read data from NebulaGraph via the nebula.conf file.
      INPUT=${INPUT:="nebula:$PROJECT/scripts/nebula.conf"}  
      # Set to read data from the CSV files on HDFS or on local directories.
      # #INPUT=${INPUT:="$PROJECT/data/graph/v100_e2150_ua_c3.csv"}

      # The export path to the graph computation results.
      # Data can be exported to a NebulaGraph. If the data source is also a NebulaGraph, the results will be exported to the graph space specified in nebula.conf.
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
    # Set to read data from NebulaGraph via the nebula.conf file.
    # INPUT=${INPUT:="nebula:$PROJECT/scripts/nebula.conf"}  
    # Set to read data from the CSV files on HDFS or on local directories.
    INPUT=${INPUT:="$PROJECT/data/graph/v100_e2150_ua_c3.csv"}

    # The export path to the graph computation results.
    # Data can be exported to a NebulaGraph. If the data source is also a NebulaGraph, the results will be exported to the graph space specified in nebula.conf.
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

3. Modify the configuration file `cluster` to set the NebulaGraph Analytics cluster nodes and task assignment weights for executing the algorithm.

  ```bash
  # NebulaGraph Analytics Cluster Node IP Addresses: Task Assignment Weights
  192.168.8.200:1
  192.168.8.201:1
  192.168.8.202:1
  ```

4. Run the algorithm script. For example:

  ```bash
  ./run_pagerank.sh
  ```

5. View the graph computation results in the export path.

  - For exporting to a NebulaGraph cluster, check the results according to the settings in `nebula.conf`.

  - For exporting the results to the CSV files on HDFS or on local directories, check the results according to the settings in `OUTPUT`, which is a compressed file in the `.gz` format.
