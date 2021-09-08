# Nebula Algorithm

[Nebula Algorithm](https://github.com/vesoft-inc/nebula-spark-utils/tree/master/nebula-algorithm) (Algorithm) is a Spark application based on [GraphX](https://spark.apache.org/graphx/). It uses a complete algorithm tool to perform graph computing on the data in the Nebula Graph database by submitting a Spark task. You can also programmatically use the algorithm under the lib repository to perform graph computing on DataFrame.

## Prerequisites

Before using the Nebula Algorithm, users need to confirm the following information:

- The Nebula Graph services have been deployed and started. For details, see [Nebula Installation](4.deployment-and-installation/1.resource-preparations.md).

- The Spark version is 2.4.x.

- (Optional) If users need to clone, compile, and package the latest Algorithm in Github, install [Maven](https://maven.apache.org/download.cgi).

## Limitations

The data of the vertex ID must be an integer. That is, the vertex ID can be INT or String, but the data itself is an integer.

For non-integer String data, it is recommended to use the algorithm interface. You can use the `dense_rank` function of SparkSQL to encode the data as the Long type instead of the String type.

## Supported algorithms

The graph computing algorithms supported by Nebula Algorithm are as follows.

| Algorithm | Description| Scenario|
| :-- |:--  | :--|
| PageRank  | The rank of pages| Web page ranking, key node mining|
| Louvain   | Community discovery | Community mining, hierarchical clustering|  
| KCore     | K core | Community discovery, financial risk control|
| LabelPropagation | Label propagation | Information spreading, advertising, and community discovery|
| ConnectedComponent | Connected component | Community discovery, island discovery|
| StronglyConnectedComponent |Strongly connected component  | Community discovery |
| ShortestPath     |The shortest path | Path planning, network planning |
| TriangleCount    |Triangle counting | Network structure analysis|
| BetweennessCentrality | Intermediate centrality | Key node mining, node influence computing | 
| DegreeStatic    |Degree of statistical | Graph structure analysis|

## Implementation methods

Nebula Algorithm implements the graph calculating as follows:

1. Read the graph data of DataFrame from the Nebula Graph database using the Nebula Spark Connector.

2. Transform the graph data of DataFrame to the GraphX graph.

3. Use graph algorithms provided by GraphX (such as PageRank) or self-implemented algorithms (such as Louvain).

For detailed implementation methods, see [Scala file](https://github.com/vesoft-inc/nebula-spark-utils/tree/master/nebula-algorithm/src/main/scala/com/vesoft/nebula/algorithm/lib).

## Get Nebula Algorithm

### Compile and package

1. Clone the repository `nebula-spark-utils`.

  ```bash
  $ git clone -b {{algorithm.branch}} https://github.com/vesoft-inc/nebula-spark-utils.git
  ```

2. Enter the directory `nebula-algorithm`.

  ```bash
  $ cd nebula-spark-utils/nebula-algorithm
  ```

3. Compile and package.

  ```bash
  $ mvn clean package -Dgpg.skip -Dmaven.javadoc.skip=true -Dmaven.test.skip=true
  ```

After the compilation, a similar file `nebula-algorithm-{{algorithm.release}}.jar` is generated in the directory `nebula-algorithm/target`.

### Download maven from the remote repository

[Download address](https://repo1.maven.org/maven2/com/vesoft/nebula-algorithm/{{algorithm.release}}/)

## How to use

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

2. Use the algorithm (take PageRank as an example) by filling in parameters. For more algorithms, see [Test cases](https://github.com/vesoft-inc/nebula-spark-utils/tree/master/nebula-algorithm/src/test/scala/com/vesoft/nebula/algorithm/lib).

  !!! note
        By default, the DataFrame that executes the algorithm sets the first column as the starting vertex, the second column as the destination vertex, and the third column as the edge weights (not the rank in the Nebula Graph).

  ```bash
  val prConfig = new PRConfig(5, 1.0)
  val louvainResult = PageRankAlgo.apply(spark, data, prConfig, false)
  ```

### Submit the algorithm package directly

!!! note
    There are limitations to use sealed packages. For example, when sinking a repository into Nebula Graph, the property name of the tag created in the sunk graph space must match the preset name in the code. The first method is recommended if the user has development skills.

1. Set the [Configuration file](https://github.com/vesoft-inc/nebula-spark-utils/blob/{{algorithm.branch}}/nebula-algorithm/src/main/resources/application.conf).

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

    # Configurations related to Nebula Graph
    nebula: {
      # Data source. When Nebula Graph is the data source of the graph computing, the configuration of `nebula.read` is valid.
      read: {
          # The IP addresses and ports of all Meta services. Multiple addresses are separated by commas (,). Example: "ip1:port1,ip2:port2".
          # To deploy Nebula Graph by using Docker Compose, fill in the port with which Docker Compose maps to the outside.
          # Check the status with `docker-compose ps`.
          metaAddress: "192.168.*.10:9559"
          # The name of the graph space in Nebula Graph.
          space: basketballplayer
          # Edge types in Nebula Graph. When there are multiple labels, the data of multiple edges will be merged.
          labels: ["serve"]
          # The property name of each edge type in Nebula Graph. This property will be used as the weight column of the algorithm. Make sure that it corresponds to the edge type.
          weightCols: ["start_year"]
      }

      # Data sink. When the graph computing result sinks into Nebula Graph, the configuration of `nebula.write` is valid.
      write:{
          # The IP addresses and ports of all Graph services. Multiple addresses are separated by commas (,). Example: "ip1:port1,ip2:port2".
          # To deploy by using Docker Compose, fill in the port with which Docker Compose maps to the outside.
          # Check the status with `docker-compose ps`.
          graphAddress: "192.168.*.11:9669"
          # The IP addresses and ports of all Meta services. Multiple addresses are separated by commas (,). Example: "ip1:port1,ip2:port2".
          # To deploy Nebula Graph by using Docker Compose, fill in the port with which Docker Compose maps to the outside.
          # Check the staus with `docker-compose ps`.
          metaAddress: "192.168.*.12:9559"
          user:root
          pswd:nebula
          # Before submitting the graph computing task, create the graph space and tag.
          # The name of the graph space in Nebula Graph.
          space:nb
          # The name of the tag in Nebula Graph. The graph computing result will be written into this tag. The property name of this tag is as follows.
          # PageRank: pagerank
          # Louvain: louvain
          # ConnectedComponent: cc
          # StronglyConnectedComponent: scc
          # LabelPropagation: lpa
          # ShortestPath: shortestpath
          # DegreeStatic: degree、inDegree、outDegree
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
      # The algorithm to execute. Optional values are pagerank, louvain, connectedcomponent,
      # labelpropagation, shortestpaths, degreestatic, kcore,
      # stronglyconnectedcomponent, trianglecount, betweenness,
      executeAlgo: pagerank
 
      # PageRank
      pagerank: {
          maxIter: 10
          resetProb: 0.15  # The default value is 0.15
      }
 
      # Louvain
      louvain: {
          maxIter: 20
          internalIter: 10
          tol: 0.5
      }

     # ConnectedComponent/StronglyConnectedComponent
     connectedcomponent: {
         maxIter: 20
     }

     # LabelPropagation
     labelpropagation: {
         maxIter: 20
     }

      # ShortestPath
      shortestpaths: {
          # several vertices to compute the shortest path to all vertices.
          landmarks: "1"
      }

      # DegreeStatic
      degreestatic: {}

      # KCore
      kcore:{
          maxIter:10
          degree:1
      }

      # TriangleCount
      trianglecount:{}
 
      # BetweennessCentrality
      betweenness:{
          maxIter:5
      }
  }
  }
  ```

2. Submit the graph computing task.

  ```bash
  ${SPARK_HOME}/bin/spark-submit --master <mode> --class com.vesoft.nebula.algorithm.Main <nebula-algorithm-2.0.0.jar_path> -p <application.conf_path>
  ```

  Example:

  ```bash
  ${SPARK_HOME}/bin/spark-submit --master "local" --class com.vesoft.nebula.algorithm.Main /root/nebula-spark-utils/nebula-algorithm/target/nebula-algorithm-2.0.0.jar -p /root/nebula-spark-utils/nebula-algorithm/src/main/resources/application.conf
  ```
