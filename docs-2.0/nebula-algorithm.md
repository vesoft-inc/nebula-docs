# Nebula Algorithm

[Nebula Algorithm](https://github.com/vesoft-inc/nebula-spark-utils/tree/master/nebula-algorithm) (Algorithm) is a Spark application based on [GraphX] (https://spark.apache.org/graphx/), by submitting a Spark task, use a complete algorithm tool to perform graph calculations on the data in the Nebula Graph database, you can also programmatically call the algorithm under the lib library to perform graph calculations for DataFrame.

## Prerequisites

Before using Algorithm, users need to confirm the following information:

- The Nebula Graph service has been deployed and started. For details, see [Nebula Installation](4.deployment-and-installation/1.resource-preparations.md).

- The Spark version is 2.4.x.

- (optional) if the user need to clone the latest Algorithm in the making, and to compile the package, can choose to install [Maven](https://maven.apache.org/download.cgi).

## Limitations

The data of the vertex ID must be integer, that is, the vertex ID can be INT, or String but the data itself is integer.

For non-integer String data, it is recommended to call the algorithm interface. You can use the `dense_rank` function of SparkSQL to encode the String to Long.

## Support algorithms

The graph computing algorithms supported by Nebula Algorithm are as follows.

| algorithm | Description| scenario|
| :-- |:--  | :--|
| PageRank  | Page sorting| Web page sorting, key node mining|
| Louvain   | Community found | Community mining, hierarchical clustering|  
| KCore     | K nuclear | Community discovery, financial risk control|
| LabelPropagation | Label propagation| Information dissemination, advertising recommendation, community discovery|
| ConnectedComponent | Unicom component | Community discovery, island discovery|
| StronglyConnectedComponent |Strongly connected component  | Community discovery |
| ShortestPath     |Shortest path | path planning, network planning |
| TriangleCount    |Triangle counting | Network structure analysis|
| BetweennessCentrality | Intermediate centrality | Key node mining, node influence calculation | 
| | DegreeStatic    |Degree of statistical | Graph structure analysis|

## Implementation method

Nebula Algorithm implements the diagram calculation process as follows:

1. Read the diagram data as a DataFrame from the Nebula Graph database using the Nebula Spark Connector.

2. Convert DataFrame to GraphX graph.

3. Call GraphX provided graph algorithms (such as PageRank) or self-implemented algorithms (such as Louvain).

Detailed implementation method can refer to relevant [Scala file](https://github.com/vesoft-inc/nebula-spark-utils/tree/master/nebula-algorithm/src/main/scala/com/vesoft/nebula/algorithm/lib).

## Get Nebula Algorithm

### Compile package

1. Clone repository `nebula-spark-utils`.

  ```bash
  $ git clone -b {{algorithm.branch}} https://github.com/vesoft-inc/nebula-spark-utils.git
  ```

2. Access the directory `nebula-algorithm`.

  ```bash
  $ cd nebula-spark-utils/nebula-algorithm
  ```

3. Compile and package.

  ```bash
  $ mvn clean package -Dgpg.skip -Dmaven.javadoc.skip=true -Dmaven.test.skip=true
  ```

After compilation, a similar file `nebula-algorithm-{{algorithm.release}}.jar` is generated in the directory `nebula-algorithm/target`.

### Download maven remote repository

[Download address](https://repo1.maven.org/maven2/com/vesoft/nebula-algorithm/{{algorithm.release}}/)

## How to use

### Call algorithm interface (recommended)

The `lib` library provides 10 common graph algorithms that can be invoked programmatically.

1. Add dependencies to the file `pom.xml`.

  ```bash
  <dependency>
  <groupId>com.vesoft</groupId>
  <artifactId>nebula-algorithm</artifactId>
  <version>{{algorithm.release}}</version>
  </dependency>
  ```

2. Call the algorithm (take PageRank as an example) by passing in parameters. More algorithm can refer to [test cases](https://github.com/vesoft-inc/nebula-spark-utils/tree/master/nebula-algorithm/src/test/scala/com/vesoft/nebula/algorithm/lib).

  !!! note
        The DataFrame that executes the algorithm defaults to the first column being the starting vertex, the second column being the destination vertex, and the third column being the edge weights (not the rank in the Nebula Graph).

  ```bash
  val prConfig = new PRConfig(5, 1.0)
  val louvainResult = PageRankAlgo.apply(spark, data, prConfig, false)
  ```

### Directly submit the algorithm package

!!! note
    There are limitations to using packaged packages. For example, when dropping a library into Nebula Graph, the Tag property names created in the library's graph space must match the preset names in the code. The first method is recommended if the user has the development ability.

1. Setting [configuration file](https://github.com/vesoft-inc/nebula-spark-utils/blob/{{algorithm.branch}}/nebula-algorithm/src/main/resources/application.conf).

  ```bash
  {
    # Spark relation config
    spark: {
      app: {
          name: LPA
          # spark.app.partitionNum
          partitionNum:100
      }
      master:local
    }

    data: {
      # data source. optional of nebula,csv,json
      source: csv
      # data sink, means the algorithm result will be write into this sink. optional of nebula,csv,text
      sink: nebula
      # if your algorithm needs weight
      hasWeight: false
    }

    # Nebula Graph relation config
    nebula: {
      # algo's data source from Nebula. If data.source is nebula, then this nebula.read config can be valid.
      read: {
          # Nebula metad server address, multiple addresses are split by English comma
          metaAddress: "127.0.0.1:9559"
          # Nebula space
          space: nb
          # Nebula edge types, multiple labels means that data from multiple edges will union together
          labels: ["serve"]
          # Nebula edge property name for each edge type, this property will be as weight col for algorithm.
          # Make sure the weightCols are corresponding to labels.
          weightCols: ["start_year"]
      }

      # algo result sink into Nebula. If data.sink is nebula, then this nebula.write config can be valid.
      write:{
          # Nebula graphd server address， multiple addresses are split by English comma
          graphAddress: "127.0.0.1:9669"
          # Nebula metad server address, multiple addresses are split by English comma
          metaAddress: "127.0.0.1:9559,127.0.0.1:9560"
          user:root
          pswd:nebula
          # Nebula space name
          space:nb
          # Nebula tag name, the algorithm result will be write into this tag
          tag:pagerank
      }
    }

    local: {
      # algo's data source from Nebula. If data.source is csv or json, then this local.read can be valid.
      read:{
          filePath: "hdfs://127.0.0.1:9000/edge/work_for.csv"
          # srcId column
          srcId:"_c0"
          # dstId column
          dstId:"_c1"
          # weight column
          #weight: "col3"
          # if csv file has header
          header: false
          # csv file's delimiter
          delimiter:","
      }

      # algo result sink into local file. If data.sink is csv or text, then this local.write can be valid.
      write:{
          resultPath:/tmp/
      }
    }


    algorithm: {
      # the algorithm that you are going to execute，pick one from [pagerank, louvain, connectedcomponent,
      # labelpropagation, shortestpaths, degreestatic, kcore, stronglyconnectedcomponent, trianglecount,
      # betweenness]
      executeAlgo: pagerank

      # PageRank parameter
      pagerank: {
          maxIter: 10
          resetProb: 0.15  # default 0.15
      }

      # Louvain parameter
      louvain: {
          maxIter: 20
          internalIter: 10
          tol: 0.5
    }

    # connected component parameter.
      connectedcomponent: {
          maxIter: 20
    }

    # LabelPropagation parameter
      labelpropagation: {
          maxIter: 20
    }

    # ShortestPaths parameter
      shortestpaths: {
          # several vertices to compute the shortest path to all vertices.
          landmarks: "1"
    }

      # Vertex degree statistics parameter
      degreestatic: {}

    # KCore parameter
    kcore:{
          maxIter:10
          degree:1
    }

    # Trianglecount parameter
    trianglecount:{}

    # Betweenness centrality parameter
    betweenness:{
          maxIter:5
    }
  }
  }
  ```

2. Submit the graph calculation task.

  ```bash
  ${SPARK_HOME}/bin/spark-submit --master <mode> --class com.vesoft.nebula.algorithm.Main <nebula-algorithm-{{algorithm.release}}.jar_path> -p <application.conf_path>
  ```

  Example:

  ```bash
  ${SPARK_HOME}/bin/spark-submit --master "local" --class com.vesoft.nebula.algorithm.Main /root/nebula-spark-utils/nebula-algorithm/target/nebula-algorithm-{{algorithm.release}}jar -p /root/nebula-spark-utils/nebula-algorithm/src/main/resources/application.conf
  ```
