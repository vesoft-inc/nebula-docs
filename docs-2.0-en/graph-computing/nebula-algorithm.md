# NebulaGraph Algorithm

[NebulaGraph Algorithm](https://github.com/vesoft-inc/nebula-algorithm) (Algorithm) is a Spark application based on [GraphX](https://spark.apache.org/graphx/). It uses a complete algorithm tool to perform graph computing on the data in the NebulaGraph database by submitting a Spark task. You can also programmatically use the algorithm under the lib repository to perform graph computing on DataFrame.

## Version compatibility

The correspondence between the NebulaGraph Algorithm release and the NebulaGraph core release is as follows.

|NebulaGraph |NebulaGraph Algorithm |
|:---|:---|
|  nightly         |  3.0-SNAPSHOT |
| 3.0.0 ~ 3.8.x      |  3.x.0        |
| 2.6.x            |  2.6.x        | 
| 2.5.0、2.5.1      |  2.5.0        | 
| 2.0.0、2.0.1      |  2.1.0        |

## Prerequisites

Before using the NebulaGraph Algorithm, users need to confirm the following information:

- The NebulaGraph services have been deployed and started. For details, see [NebulaGraph Installation](../4.deployment-and-installation/1.resource-preparations.md).

- The Spark version is 2.4 or 3.x is installed.

- The Scala version is 2.11 (for Spark 2.4) or 2.12 (for Spark 3.x) is installed.

- (Optional) If users need to clone, compile, and package the latest Algorithm in Github, install [Maven](https://maven.apache.org/download.cgi).

## Limitations

Graph computing outputs vertex datasets, and the algorithm results are stored in DataFrames as the properties of vertices. You can do further operations such as statistics and filtering according to your business requirements.

!!!

    Before Algorithm v3.1.0, when submitting the algorithm package directly, the data of the vertex ID must be an integer. That is, the vertex ID can be INT or String, but the data itself is an integer.

## Supported algorithms

The graph computing algorithms supported by NebulaGraph Algorithm are as follows.

| Algorithm | Description| Scenario|   Properties name      |Properties type|
| :-- |:--  | :--|:--|:--|
| PageRank  | The rank of pages| Web page ranking, key node mining|      pagerank        |double/string|
| Louvain   | Louvain | Community mining, hierarchical clustering|         louvain        | int/string  |
| KCore     | K core | Community discovery, financial risk control|  kcore         | int/string  |
| LabelPropagation | Label propagation | Information spreading, advertising, and community discovery|      lpa           | int/string  |
| Hanp |Label propagation advanced |Community discovery, recommendation system |       hanp         | int/string  |
| ConnectedComponent | Weakly connected component | Community discovery, island discovery|         cc           | int/string  |
| StronglyConnectedComponent |Strongly connected component  | Community discovery |         scc          | int/string  |
| ShortestPath     |The shortest path | Path planning, network planning |     shortestpath     |   string    |
| TriangleCount    |Triangle counting | Network structure analysis|       trianglecount     | int/string  |
| GraphTriangleCount | Graph triangle counting | Network structure and tightness analysis|  count  |  int|
| BetweennessCentrality | Intermediate centrality | Key node mining, node influence computing |     betweenness     |double/string|
| ClosenessCentrality | Closeness centrality |Key node mining, node influence computing|    closeness       |double/string|
| DegreeStatic    |Degree of statistical | Graph structure analysis| degree,inDegree,outDegree| int/string  |
| ClusteringCoefficient |Aggregation coefficient| Recommendation system, telecom fraud analysis|   clustercoefficient   |double/string|
| Jaccard | Jaccard similarity | Similarity computing, recommendation system|    jaccard        |    string   |
| BFS       | Breadth-First Search| Sequence traversal, shortest path planning|     bfs          |    string   |
| DFS       | Depth-First Search  | Sequence traversal, shortest path planning|     dfs          |    string   |
| Node2Vec  |     -     | Graph classification         |     node2vec       |    string   |

!!! note

    When writing the algorithm results into the NebulaGraph, make sure that the tag in the corresponding graph space has properties names and data types corresponding to the table above.

## Implementation methods

NebulaGraph Algorithm implements the graph calculating as follows:

1. Read the graph data of DataFrame from the NebulaGraph database using the NebulaGraph Spark Connector.

2. Transform the graph data of DataFrame to the GraphX graph.

3. Use graph algorithms provided by GraphX (such as PageRank) or self-implemented algorithms (such as Louvain).

For detailed implementation methods, see [Scala file](https://github.com/vesoft-inc/nebula-algorithm/tree/master/nebula-algorithm/src/main/scala/com/vesoft/nebula/algorithm/lib).

## Get NebulaGraph Algorithm

### Compile and package

1. Clone the repository `nebula-algorithm`.

  ```bash
  $ git clone -b {{algorithm.branch}} https://github.com/vesoft-inc/nebula-algorithm.git
  ```

  If running Algorithm in a Spark 3.x environment, use the spark3 branch:

  ```bash
  $ git clone -b spark3 https://github.com/vesoft-inc/nebula-algorithm.git
  ```

1. Enter the directory `nebula-algorithm`.

  ```bash
  $ cd nebula-algorithm
  ```

3. Compile and package.

  ```bash
  $ mvn clean package -Dgpg.skip -Dmaven.javadoc.skip=true -Dmaven.test.skip=true
  ```

After the compilation, a similar file `nebula-algorithm-3.x.x.jar` is generated in the directory `nebula-algorithm/target`.

### Download maven from the remote repository

[Download address](https://repo1.maven.org/maven2/com/vesoft/nebula-algorithm/)

## How to use

!!! note

    If the value of the properties contains Chinese characters, the encoding error may appear. Please add the following options when submitting the Spark task:

    ```
    --conf spark.driver.extraJavaOptions=-Dfile.encoding=utf-8
    --conf spark.executor.extraJavaOptions=-Dfile.encoding=utf-8
    ```

### Use algorithm interface (recommended)

The `lib` repository provides 10 common graph algorithms.

1. Add dependencies to the file `pom.xml`.

  ```bash
  <dependency>
       <groupId>com.vesoft</groupId>
       <artifactId>nebula-algorithm</artifactId>
       <version>{{algorithm.release}}</version>
  </dependency>
  ```

2. Use the algorithm (take PageRank as an example) by filling in parameters. For more examples, see [example](https://github.com/vesoft-inc/nebula-algorithm/tree/master/example/src/main/scala/com/vesoft/nebula/algorithm).

  !!! note
        By default, the DataFrame that executes the algorithm sets the first column as the starting vertex, the second column as the destination vertex, and the third column as the edge weights (not the rank in the NebulaGraph).

  ```bash
  val prConfig = new PRConfig(5, 1.0)
  val prResult = PageRankAlgo.apply(spark, data, prConfig, false)
  ```
  
  If your vertex IDs are Strings, see [Pagerank Example](https://github.com/vesoft-inc/nebula-algorithm/blob/master/example/src/main/scala/com/vesoft/nebula/algorithm/PageRankExample.scala) for how to encoding and decoding them.

### Submit the algorithm package directly

1. Set the [Configuration file](https://github.com/vesoft-inc/nebula-algorithm/blob/{{algorithm.branch}}/nebula-algorithm/src/main/resources/application.conf).

  ```bash
  {
    # Configurations related to Spark
    spark: {
      app: {
          name: LPA
          # The number of partitions of Spark
          partitionNum:100
      }
      master:local
    }

    data: {
      # Data source. Optional values are nebula, csv, and json.
      source: csv
      # Data sink. The algorithm result will be written into this sink. Optional values are nebula, csv, and text.
      sink: nebula
      # Whether the algorithm has a weight.
      hasWeight: false
    }

    # Configurations related to NebulaGraph
    nebula: {
      # Data source. When NebulaGraph is the data source of the graph computing, the configuration of `nebula.read` is valid.
      read: {
          # The IP addresses and ports of all Meta services. Multiple addresses are separated by commas (,). Example: "ip1:port1,ip2:port2".
          # To deploy NebulaGraph by using Docker Compose, fill in the port with which Docker Compose maps to the outside.
          # Check the status with `docker-compose ps`.
          metaAddress: "192.168.*.10:9559"
          # The name of the graph space in NebulaGraph.
          space: basketballplayer
          # Edge types in NebulaGraph. When there are multiple labels, the data of multiple edges will be merged.
          labels: ["serve"]
          # The property name of each edge type in NebulaGraph. This property will be used as the weight column of the algorithm. Make sure that it corresponds to the edge type.
          weightCols: ["start_year"]
      }

      # Data sink. When the graph computing result sinks into NebulaGraph, the configuration of `nebula.write` is valid.
      write:{
          # The IP addresses and ports of all Graph services. Multiple addresses are separated by commas (,). Example: "ip1:port1,ip2:port2".
          # To deploy by using Docker Compose, fill in the port with which Docker Compose maps to the outside.
          # Check the status with `docker-compose ps`.
          graphAddress: "192.168.*.11:9669"
          # The IP addresses and ports of all Meta services. Multiple addresses are separated by commas (,). Example: "ip1:port1,ip2:port2".
          # To deploy NebulaGraph by using Docker Compose, fill in the port with which Docker Compose maps to the outside.
          # Check the staus with `docker-compose ps`.
          metaAddress: "192.168.*.12:9559"
          user:root
          pswd:nebula
          # Before submitting the graph computing task, create the graph space and tag.
          # The name of the graph space in NebulaGraph.
          space:nb
          # The name of the tag in NebulaGraph. The graph computing result will be written into this tag. The property name of this tag is as follows.
          # PageRank: pagerank
          # Louvain: louvain
          # ConnectedComponent: cc
          # StronglyConnectedComponent: scc
          # LabelPropagation: lpa
          # ShortestPath: shortestpath
          # DegreeStatic: degree,inDegree,outDegree
          # KCore: kcore
          # TriangleCount: tranglecpunt
          # BetweennessCentrality: betweennedss
          tag:pagerank
      }
      }  

    local: {
      # Data source. When the data source is csv or json, the configuration of `local.read` is valid.
      read:{
          filePath: "hdfs://127.0.0.1:9000/edge/work_for.csv"
          # If the CSV file has a header or it is a json file, use the header. If not, use [_c0, _c1, _c2, ..., _cn] instead.
          # The header of the source VID column.
          srcId:"_c0"
          # The header of the destination VID column.
          dstId:"_c1"
          # The header of the weight column.
          weight: "_c2"
          # Whether the csv file has a header.
          header: false
          # The delimiter in the csv file.
          delimiter:","
      }

      # Data sink. When the graph computing result sinks to the csv or text file, the configuration of `local.write` is valid.
      write:{
          resultPath:/tmp/
      }
      }


    algorithm: {
      # The algorithm to execute. Optional values are as follow: 
      # pagerank, louvain, connectedcomponent, labelpropagation, shortestpaths, 
      # degreestatic, kcore, stronglyconnectedcomponent, trianglecount ,
      # betweenness, graphtriangleCount.
      executeAlgo: pagerank
 
      # PageRank
      pagerank: {
          maxIter: 10
          resetProb: 0.15 
          encodeId:false # Configure true if the VID is of string type.
      }
 
      # Louvain
      louvain: {
          maxIter: 20
          internalIter: 10
          tol: 0.5
          encodeId:false # Configure true if the VID is of string type.
      }

     # ...

  }
  }
  ```

  !!! note

        When `sink: nebula` is configured, it means that the algorithm results will be written back to the NebulaGraph cluster. The property names of the tag have implicit conventions. For details, see **Supported algorithms** section of this topic.

2. Submit the graph computing task.

  ```bash
  ${SPARK_HOME}/bin/spark-submit --master <mode> --class com.vesoft.nebula.algorithm.Main <nebula-algorithm-{{algorithm.release}}.jar_path> -p <application.conf_path>
  ```

  Example:

  ```bash
  ${SPARK_HOME}/bin/spark-submit --master "local" --class com.vesoft.nebula.algorithm.Main /root/nebula-algorithm/target/nebula-algorithm-3.0-SNAPSHOT.jar -p /root/nebula-algorithm/src/main/resources/application.conf
  ```
