# Algorithm overview

Graph computing can detect the graph structure, such as the communities in a graph and the division of a graph. It can also reveal the inherent characteristics of the correlation between various vertexes, such as the centrality and similarity of the vertices. This topic introduces the algorithms and parameters supported by NebulaGraph.

<!--
NebulaGraph supports some graph computing tools. This topic describes the algorithms and parameters supported by these tools.
-->

!!! note

    This topic only introduces the parameters of NebulaGraph Analytics. For details about the parameters of NebulaGraph Algorithm, see [algorithm](https://github.com/vesoft-inc/nebula-algorithm/tree/{{algorithm.branch}}/example/src/main/scala/com/vesoft/nebula/algorithm).

<!--
!!! note

    Different graph computing tools support different algorithms and different parameters. See below for details.
-->

!!! note

    The algorithm parameters need to be set when performing graph computing, and there are requirements for data sources. The data source needs to contain source vertexes and destination vertexes. PageRank, DegreeWithTime, SSSP, APSP, LPA, HANP, and Louvain algorithms must include weight.

    - If the data source comes from HDFS, users need to specify a CSV file that contains `src` and `dst` columns. Some algorithms also need to contain a `weight` column.

    - If the data source comes from NebulaGraph, users need to specify the edge types that provide `src` and `dst` columns. Some algorithms also need to specify the properties of the edge types as `weight` columns.

## Node importance measurement

### PageRank

The PageRank algorithm calculates the relevance and importance of vertices based on their relationships. It is commonly used in search engine page rankings. If a page is linked by many other pages, the page is more important (PageRank value is higher). If a page with a high PageRank value links to other pages, the PageRank value of the linked pages will increase.

Parameter descriptions are as follows:

<!--
- NebulaGraph Algorithm

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`maxIter`|`10`|Maximum number of iterations.|
  |`resetProb`|`0.15`||
-->

- NebulaGraph Analytics

  - Input parameters

    |Parameter|Predefined value|Description|
    |:--|:--|:--|
    |`ITERATIONS`|`10`| The maximum number of iterations.|
    |`IS_DIRECTED`|`true`| Whether to consider the direction of the edges. If set to `false`, the system automatically adds the reverse edge.|
    |`EPS`|`0.0001`| The convergence accuracy. When the difference between the result of two iterations is less than the `EPS` value, the iteration is not continued.|
    |`DAMPING`|`0.85`| The damping coefficient. It is the jump probability after visiting a page.|

  - Output parameters

    |Parameter|Type|Description|
    |:--|:--|:--|
    |`VID`|Determined by `vid_type` | The vertex ID.|
    |`VALUE`|double| The PageRank value of the vertex.|

### KCore

The KCore algorithm is used to calculate the subgraph composed of no vertexes less than K degree, usually used in community discovery, financial risk control and other scenarios. The calculation result is one of the most commonly used reference values to judge the importance of a vertex, which reflects the propagation ability of a vertex.

Parameter descriptions are as follows:

<!--
- NebulaGraph Algorithm

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`maxIter`|`10`|Maximum number of iterations.|
  |`degree`|`1`||
-->

- NebulaGraph Analytics

  - Input parameters

    |Parameter|Predefined value|Description|
    |:--|:--|:--|
    |`TYPE`|`vertex`| The calculation type. Available values are `vertex` and `subgraph`. When set to `vertex`, the system calculates the number of cores for each vertex.|
    |`KMIN`|`1`| Set the minimum value of K when performing the range calculation. Takes effect only when `TYPE`=`subgraph`. |
    |`KMAX`|`1000000`| Set the maximum value of K when performing the range calculation. Takes effect only when `TYPE`=`subgraph`.|

  - Output parameters when `TYPE=vertex`

    |Parameter|Type|Description|
    |:--|:--|:--|
    |`VID`|Determined by `vid_type`| The vertex ID.|
    |`VALUE`|int| Outputs the core degree of the vertex.|

  - Output parameters when `TYPE=subgraph`

    |Parameter|Type|Description|
    |:--|:--|:--|
    |`VID`|Determined by `vid_type`| The vertex ID.|
    |`VALUE`|The same with `VID`| Outputs the neighbors of the vertex.|

### DegreeCentrality (NStepDegree)

The DegreeCentrality algorithm is used to find the popular vertexes in a graph. Degree centrality measures the number of incoming or outgoing (or both) relationships from a vertex, depending on the direction of the projection of the relationship. The greater the degree of a vertex is, the higher the degree centrality of the vertex is, and the more important the vertex is in the network.

!!! note

    NebulaGraph Analytics only estimates DegreeCentrality roughly.

Parameter descriptions are as follows:

<!--
- NebulaGraph Algorithm（这里叫DegreeStatic？）

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |``|``||
  |``|``||
  |``|``||
  |``|``||
-->

- NebulaGraph Analytics

  - Input parameters

    |Parameter|Predefined value|Description|
    |:--|:--|:--|
    |`IS_DIRECTED`|`true`| Whether to consider the direction of the edges. If set to `false`, the system automatically adds the reverse edge.|
    |`STEP`|`3`| The degree of calculation. `-1` means infinity.|
    |`BITS`|`6`| The hyperloglog bit width for cardinality estimation.|
    |`TYPE`|`both`| The direction of the edges for calculation. Optional values are `in`, `out` and `both`.|

  - Output parameters when `TYPE=both`

    |Parameter|Type|Description|
    |:--|:--|:--|
    |`VID`|Determined by `vid_type`| The vertex ID.|
    |`BOTH_DEGREE`|int| Outputs the bidirectional degree centrality of the vertex.|
    |`OUT_DEGREE`|int| Outputs the outbound degree centrality of the vertex.|
    |`IN_DEGREE`|int| Outputs the inbound degree centrality of the vertex.|

  - Output parameters when `TYPE=out`

    |Parameter|Type|Description|
    |:--|:--|:--|
    |`VID`|Determined by `vid_type`| The vertex ID.|
    |`OUT_DEGREE`|int| Outputs the outbound degree centrality of the vertex.|

  - Output parameters when `TYPE=in`

    |Parameter|Type|Description|
    |:--|:--|:--|
    |`VID`|Determined by `vid_type`| The vertex ID.|
    |`IN_DEGREE`|int| Outputs the inbound degree centrality of the vertex.|

### DegreeWithTime

The DegreeWithTime algorithm is used to count neighbors based on the time range of edges to find out the popular vertexes in a graph.

!!! note

    This algorithm is supported by NebulaGraph Analytics only.

Parameter descriptions are as follows:

- Input parameters

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`ITERATIONS`|`10`| The maximum number of iterations.|
  |`IS_DIRECTED`|`true`| Whether to consider the direction of the edges. If set to `false`, the system automatically adds the reverse edge.|
  |`BEGIN_TIME`|-| The begin time.|
  |`END_TIME`|-| The end time.|

- Output parameters when `TYPE=both`

  |Parameter|Type|Description|
  |:--|:--|:--|
  |`VID`|Determined by `vid_type`| The vertex ID.|
  |`BOTH_DEGREE`|int| Outputs the bidirectional popularity of the vertex.|
  |`OUT_DEGREE`|int| Outputs the outbound popularity of the vertex.|
  |`IN_DEGREE`|int| Outputs the inbound popularity of the vertex.|

- Output parameters when `TYPE=out`

  |Parameter|Type|Description|
  |:--|:--|:--|
  |`VID`|Determined by `vid_type`| The vertex ID.|
  |`OUT_DEGREE`|int| Outputs the outbound popularity of the vertex.|

- Output parameters when `TYPE=in`

  |Parameter|Type|Description|
  |:--|:--|:--|
  |`VID`|Determined by `vid_type`| The vertex ID.|
  |`IN_DEGREE`|int| Outputs the inbound popularity of the vertex.|

### BetweennessCentrality

The BetweennessCentrality algorithm is used to detect the amount of influence a vertex has on the flow of information in a graph. It is used to find the vertexes that act as bridges between one part of the graph and another. Each vertex is given a score, the betweenness centrality score, based on the number of shortest paths through that vertex.

Parameter descriptions are as follows:

<!--
- NebulaGraph Algorithm

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`maxIter`|`5`|Maximum number of iterations.|
-->

- NebulaGraph Analytics

  - Input parameters

    |Parameter|Predefined value|Description|
    |:--|:--|:--|
    |`ITERATIONS`|`10`| The maximum number of iterations.|
    |`IS_DIRECTED`|`true`| Whether to consider the direction of the edges. If set to `false`, the system automatically adds the reverse edge.|
    |`CHOSEN`|`-1`| The selected vertex ID, `-1` means random selection.|
    |`CONSTANT`|`2`| The constant.|

  - Output parameters

    |Parameter|Type|Description|
    |:--|:--|:--|
    |`VID`|Determined by `vid_type`| The vertex ID.|
    |`VALUE`|double| The betweenness centrality score of the vertex.|

### ClosenessCentrality

The ClosenessCentrality algorithm is used to calculate the reciprocal of the average of the shortest distance from one vertex to all other reachable vertexes. The larger the value is, the closer the vertex is to the center of the graph, and it can also be used to measure how long it takes for information to be transmitted from that vertex to other vertexes.

Parameter descriptions are as follows:

<!--
- NebulaGraph Algorithm

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |``|``||
  |``|``||
  |``|``||
  |``|``||
-->

- NebulaGraph Analytics

  - Input parameters

    |Parameter|Predefined value|Description|
    |:--|:--|:--|
    |`IS_DIRECTED`|`true`| Whether to consider the direction of the edges. If set to `false`, the system automatically adds the reverse edge.|
    |`NUM_SAMPLES`|`10`| The number of sample vertices.|

  - Output parameters

    |Parameter|Type|Description|
    |:--|:--|:--|
    |`VID`|Determined by `vid_type`| The vertex ID.|
    |`VALUE`|double| The closeness centrality score of the vertex.|

## Path

### APSP

The APSP (Full Graph Shortest Path) algorithm is used to find all shortest paths between two vertexes in a graph.

!!! note

    This algorithm is supported by NebulaGraph Analytics only.

Parameter descriptions are as follows:

- Output parameters

  |Parameter|Type|Description|
  |:--|:--|:--|
  |`VID1`|Determined by `vid_type`| The VID of the source vertex.|
  |`VID2`|Determined by `vid_type`| The VID of the destination vertex.|
  |`DISTANCE`|double| Outputs the distance from `VID1` to `VID2`.|

### SSSP

The SSSP (Single source shortest Path) algorithm is used to calculate the shortest path length from a given vertex (source vertex) to other vertexes. It is usually used in scenarios such as network routing and path designing.

Parameter descriptions are as follows:

<!--
- NebulaGraph Algorithm

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`sourceid`|-|The VID of the source vertex.|
-->

- NebulaGraph Analytics

  - Input parameters

    |Parameter|Predefined value|Description|
    |:--|:--|:--|
    |`ROOT`|-| The VID of the source vertex.|

  - Output parameters

    |Parameter|Type|Description|
    |:--|:--|:--|
    |`VID`|Determined by `vid_type`| The VID of the source vertex.|
    |`DISTANCE`|double| Outputs the distance from `ROOT` to `VID`.|

### BFS

The BFS (Breadth First traversal) algorithm is a basic graph traversal algorithm. It gives a source vertex and accesses other vertexes with increasing hops, that is, it traverses all the adjacent vertexes of the vertex first and then extends to the adjacent vertexes of the adjacent vertexes.

Parameter descriptions are as follows:

<!--
- NebulaGraph Algorithm

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |``|``||
  |``|``||
  |``|``||
  |``|``||
-->

- NebulaGraph Analytics

  - Input parameters

    |Parameter|Predefined value|Description|
    |:--|:--|:--|
    |`IS_DIRECTED`|`true`|Whether to consider the direction of the edges. If set to `false`, the system automatically adds the reverse edge.|
    |`ROOT`|-|The VID of the source vertex.|

  - Output parameters

    |Parameter|Type|Description|
    |:--|:--|:--|
    |`ROOT`|Determined by `vid_type`| The VID of the source vertex.|
    |`VISITED`|int| Outputs the number of the vertex accessed by `ROOT`.|

### ShortestPath

The ShortestPath algorithm is used to find the shortest path between any two vertices in the graph, which is frequently applied in scenarios such as path design and network planning.

- NebulaGraph Analytics

  - Input parameters

    |Parameter|Predefined value|Description|
    |:--|:--|:--|
    |`src`|`"100"`|Starting vertices. Multiple VIDs are separated by commas (,).|
    |`dst`|`"200"`|Destination vertices. Multiple VIDs are separated by commas (,).|

  - Output parameters

    |Parameter|Type|Description|
    |:--|:--|:--|
    |`VALUE`|list| Returns the vertices in the shortest path. The format is`src, vid1,vid2...dst`. If there are multiple shortest paths between two vertices, only one path is returned.|

## Community discovery

### LPA

The LPA (label propagation) algorithm is a semi-supervised learning method based on graph. Its basic idea is to use label information of labeled vertexes to predict label information of unlabeled vertexes. vertexes include labeled and unlabeled data, and their edges represent the similarity of two vertexes. The labels of vertexes are transferred to other vertexes according to the similarity. Label data is like a source that can be labeled for unlabeled data. The greater the similarity of vertexes is, the easier the label is to spread.

Parameter descriptions are as follows:

<!--
- NebulaGraph Algorithm

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`maxIter`|`20`|Maximum number of iterations.|
  |``|``||
  |``|``||
  |``|``||
-->

- NebulaGraph Analytics

  - Input parameters

    |Parameter|Predefined value|Description|
    |:--|:--|:--|
    |`ITERATIONS`|`10`|The maximum number of iterations.|
    |`IS_DIRECTED`|`true`|Whether to consider the direction of the edges. If set to `false`, the system automatically adds the reverse edge.|
    |`IS_CALC_MODULARITY`|`false`| Whether to calculate modularity.|
    |`IS_OUTPUT_MODULARITY`|`false`|Whether to calculate and output module degrees. When set to `true`, the default output is to the third column of the file, but it can also be output to NebulaGraph with options `-nebula_output_props` and `-nebula_output_types`. Output to NebulaGraph is not yet supported when using Explorer.|
    |`IS_STAT_COMMUNITY`|`false`|Whether to count the number of communities.|

  - Output parameters

    |Parameter|Type|Description|
    |:--|:--|:--|
    |`VID`|Determined by `vid_type`| The vertex ID.|
    |`LABEL`|The same with `VID`| Outputs the vertex IDs that have the same label.|

### HANP

The HANP (Hop Preference & Node Preference) algorithm is an optimization algorithm of LPA algorithm, which considers other information of labels, such as degree information, distance information, etc., and introduces attenuation coefficient during propagation to prevent transition propagation.

Parameter descriptions are as follows:

<!--
- NebulaGraph Algorithm

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`hopAttenuation`|`0.1`|The attenuation coefficient.|
  |`maxIter`|`10`|Maximum number of iterations.|
  |`preference`|`1.0`||
-->

- NebulaGraph Analytics

  - Input parameters

    |Parameter|Predefined value|Description|
    |:--|:--|:--|
    |`ITERATIONS`|`10`|The maximum number of iterations.|
    |`IS_DIRECTED`|`true`|Whether to consider the direction of the edges. If set to `false`, the system automatically adds the reverse edge.|
    |`PREFERENCE`|`1.0`| The bias of the neighbor vertex degree. `m>0`indicates biasing the neighbor with high vertex degree, `m<0` indicates biasing the neighbor with low vertex degree, and `m=0` indicates ignoring the neighbor vertex degree.|
    |`HOP_ATT`|`0.1`|The attenuation coefficient. The value ranges from `0` to `1`. The larger the value, the faster it decays and the fewer times it can be passed.|
    |`IS_OUTPUT_MODULARITY`|`false`|Whether to calculate and output module degrees. When set to `true`, the default output is to the third column of the file, but it can also be output to NebulaGraph with options `-nebula_output_props` and `-nebula_output_types`. Output to NebulaGraph is not yet supported when using Explorer.|
    |`IS_STAT_COMMUNITY`|`false`|Whether to count the number of communities.|

  - Output parameters

    |Parameter|Type|Description|
    |:--|:--|:--|
    |`VID`|Determined by `vid_type`| The vertex ID.|
    |`LABEL`|The same with `VID`| Outputs the vertex IDs that have the same label.|

### ConnectedComponent

The ConnectedComponent algorithm is used to calculate a subgraph of a graph in which all vertexes are connected to each other. Strongly Connected Component takes the path direction into account, while Weakly Connected Component does not.

!!! note

    NebulaGraph Analytics only supports Weakly Connected Component.

Parameter descriptions are as follows:

<!--
- NebulaGraph Algorithm

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`maxIter`|`10`|Maximum number of iterations.|
-->

- NebulaGraph Analytics

  - Input parameters

    |Parameter|Predefined value|Description|
    |:--|:--|:--|
    |`IS_DIRECTED`|`true`| Whether to consider the direction of the edges. If set to `false`, the system automatically adds the reverse edge.|
    |`IS_CALC_MODULARITY`|`false`| Whether to calculate modularity.|
    |`IS_OUTPUT_MODULARITY`|`false`|Whether to calculate and output module degrees. When set to `true`, the default output is to the third column of the file, but it can also be output to NebulaGraph with options `-nebula_output_props` and `-nebula_output_types`. Output to NebulaGraph is not yet supported when using Explorer.|
    |`IS_STAT_COMMUNITY`|`false`|Whether to count the number of communities.|

  - Output parameters

    |Parameter|Type|Description|
    |:--|:--|:--|
    |`VID`|Determined by `vid_type`| The vertex ID.|
    |`LABEL`|The same with `VID`| Outputs the vertex IDs that have the same label.|

### Louvain

The Louvain algorithm is a community discovery algorithm based on modularity. This algorithm performs well in efficiency and effect, and can be used to find hierarchical community structures. Its optimization goal is to maximize the modularity of the whole community network. Modularity is used to distinguish the differences in link density within and between communities, and to measure how well each vertex divides the community. In general, a good clustering approach will result in more modularity within communities than between communities.

Parameter descriptions are as follows:

<!--
- NebulaGraph Algorithm

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`maxIter`|`20`|Maximum number of iterations.|
  |`internalIter`|`10`||
  |`tol`|`0.5`||
-->

- NebulaGraph Analytics

  - Input parameters

    |Parameter|Predefined value|Description|
    |:--|:--|:--|
    |`IS_DIRECTED`|`true`| Whether to consider the direction of the edges. If set to `false`, the system automatically adds the reverse edge.|
    |`OUTER_ITERATION`|`20`|The maximum number of iterations in the first phase.|
    |`INNER_ITERATION`|`10`|The maximum number of iterations in the second phase.|
    |`IS_CALC_MODULARITY`|`false`| Whether to calculate modularity.|
    |`IS_OUTPUT_MODULARITY`|`false`|Whether to calculate and output module degrees. When set to `true`, the default output is to the third column of the file, but it can also be output to NebulaGraph with options `-nebula_output_props` and `-nebula_output_types`. Output to NebulaGraph is not yet supported when using Explorer.|
    |`IS_STAT_COMMUNITY`|`false`|Whether to count the number of communities.|

  - Output parameters

    |Parameter|Type|Description|
    |:--|:--|:--|
    |`VID`|Determined by `vid_type`| The vertex ID.|
    |`LABEL`|The same with `VID`| Outputs the vertex IDs that have the same label.|

### InfoMap

The InfoMap algorithm uses double encoding to classify directed graphs into communities. The encoding reuse of nodes in different communities can greatly shorten the length of description information. In terms of implementation, the algorithm includes the PageRank algorithm, which converts a random walk into a random surf.

!!! note

    This algorithm is supported by NebulaGraph Analytics only.

- NebulaGraph Analytics

  - Input parameters

    |Parameter|Predefined value|Description|
    |:--|:--|:--|
    |`pagerank_iter`|`10`| The maximum number of iterations of the internal PageRank algorithm.|
    |`pagerank_threshold`|`0.0001`| The convergence accuracy of the internal PageRank algorithm.|
    |`teleport_prob`|`0.15`| The teleportation probability.|
    |`inner_iter`|`3`| The number of inner iterations.|
    |`outer_iter`|`2`| The number of outer iterations.|
    |`comm_info_num`|`100`| The number of communities exported.|

  - Output parameters

    |Parameter|Type|Description|
    |:--|:--|:--|
    |`VID`|Determined by `vid_type`| The vertex ID.|
    |`LABEL`|The same with `VID`| Outputs the vertex IDs that have the same label.|

## Graph feature

### TriangleCount

The TriangleCount algorithm is used to count the number of triangles in a graph. The more triangles, the higher the degree of vertex association in the graph, the tighter the organizational relationship.

Parameter descriptions are as follows:

<!--
- NebulaGraph Algorithm

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |``|``||
  |``|``||
  |``|``||
  |``|``||
-->

- NebulaGraph Analytics

  - Input parameters

    |Parameter|Predefined value|Description|
    |:--|:--|:--|
    |`OPT`|`3`|The calculation type. Optional values are `1`, `2` and `3`. `1` indicates counting the entire graph, `2` indicates counting through each vertex, `3` indicates listing all triangles.|
    |`REMOVED_DUPLICATION_EDGE`|`true`| Whether to exclude repeated edges.|
    |`REMOVED_SELF_EDGE`|`true`| Whether to exclude self-loop edge.|

  - Output parameters when `OPT=1`

    |Parameter|Type|Description|
    |:--|:--|:--|
    |`COUNT`|int| Outputs the number of the triangles in the full graph space.|

  - Output parameters when `OPT=2`

    |Parameter|Type|Description|
    |:--|:--|:--|
    |`VID`|Determined by `vid_type`|The vertex ID.|
    |`COUNT`|int| Outputs the number of the triangles based on the vertex.|

  - Output parameters when `OPT=3`

    |Parameter|Type|Description|
    |:--|:--|:--|
    |`VID1`|The same with `VID`| Outputs the ID of the vertex A that forms the triangle.|
    |`VID2`|The same with `VID`| Outputs the ID of the vertex B that forms the triangle.|
    |`VID3`|The same with `VID`| Outputs the ID of the vertex C that forms the triangle.|


### Node2Vec

The Node2Vec algorithm proposed a more reasonable graph feature learning method based on DeepWalk, and proposed a semi-supervised algorithm for scalable feature learning in networks. SGD was used to optimize a custom graph-based objective function, which could maximize the network domain information of nodes reserved in d-dimensional feature space. Based on the random walk, a second order random walk process is designed, which is equivalent to an extension of DeepWalk algorithm, and preserves the graph characteristics of neighbor nodes. Applicable to node function similarity comparison, node structure similarity comparison, community clustering and other scenarios.R

Parameter descriptions are as follows:


<!--
- NebulaGraph Algorithm

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`maxIter`|`10`|Maximum number of iterations.|
  |`lr`|`0.025`||
  |`dataNumPartition`|`10`||
  |`modelNumPartition`|`10`||
  |`dim`|`10`|The map dimensions.|
  |`window`|`3`||
  |`walkLength`|`5`| The random step size.|
  |`numWalks`|`3`| The number of random steps for each node.|
  |`p`|`1.0`| The rollback parameters.|
  |`q`|`1.0`|The forward parameters.|
  |`directed`|`false`||
  |`degree`|`30`||
  |`embSeparate`|`","`||
  |`modelPath`|`"hdfs://127.0.0.1:9000/model"`||
-->

- NebulaGraph Analytics
  - Input parameters
    |Parameter|Predefined value|Description|
    |:--|:--|:--|
    |`is_weighted`|`false`|  Random walk with bias or not.|
    |`p`|`1.0`| The backward bias for random walk.|
    |`q`|`0.5`| The forward bias for random walk.|
    |`epoch`|`1`| The number of iterations.|
    |`step`|`10`| The number of steps per iteration.|
    |`rate`|`0.02`| The rate of the random walk.|

  - Output parameters
    Output multiple columns where vertices in the same column are associated.

### Tree_stat

The Tree_stat algorithm counts the width or depth of a subgraph with a specified root vertex.

!!! note

    This algorithm is supported by NebulaGraph Analytics only.

- NebulaGraph Analytics

  - Input parameters

    |Parameter|Predefined value|Description|
    |:--|:--|:--|
    |`root`|`100`| The VID of the root vertex.|
    |`stat`|`width,depth`|Counts width or depth. Multiple values are separated by commas (,).|

  - Output parameters

    |Parameter|Type|Description|
    |:--|:--|:--|
    |`VALUE`|list| Returns a row of statistics in the same format as the `stat` parameter.|

### HyperANF

The HyperANF algorithm is used to evaluate the average distance between any two vertices in a graph.

!!! note

    This algorithm is supported by NebulaGraph Analytics only.

- NebulaGraph Analytics

  - Input parameters

    |Parameter|Predefined value|Description|
    |:--|:--|:--|
    |`bits`|`6`| The bit length of the HyperLogLog counter. The value ranges from 6 to 16.|

  - Output parameters

    |Parameter|Type|Description|
    |:--|:--|:--|
    |`VALUE`|double| The average distance.|

## Clustering

### ClusteringCoefficient

The ClusteringCoefficient algorithm is used to calculate the clustering degree of vertexes in a graph. In all kinds of network structures reflecting the real world, especially social network structures, network groups with relatively high density tend to be formed between various vertexes. In other words, compared with the networks randomly connected between two vertexes, the aggregation coefficient of the real world network is higher.

Parameter descriptions are as follows:

<!--
- NebulaGraph Algorithm

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |``|``||
  |``|``||
  |``|``||
  |``|``||
-->

- NebulaGraph Analytics

  - Input parameters

    |Parameter|Predefined value|Description|
    |:--|:--|:--|
    |`TYPE`|`local`|The clustering type. Optional values are `local` and `global`. `local` indicates counting through each vertex, `global` indicates counting the entire graph.|
    |`REMOVED_DUPLICATION_EDGE`|`true`| Whether to exclude repeated edges.|
    |`REMOVED_SELF_EDGE`|`true`| Whether to exclude self-loop edge.|

  - Output parameters when `TYPE=local`

    |Parameter|Type|Description|
    |:--|:--|:--|
    |`VID`|Determined by `vid_type`| The vertex ID.|
    |`VALUE`|double| Outputs the clustering coefficient of the vertex.|

  - Output parameters when `TYPE=global`

    |Parameter|Type|Description|
    |:--|:--|:--|
    |`VID`|Determined by `vid_type`| The vertex ID.|
    |`VALUE`|double| Outputs the clustering coefficient of the full graph space. There is only one line of data.|

## Similarity

### Jaccard

The Jaccard algorithm is used to calculate the similarity of two vertexes (or sets) and predict the relationship between them. It is suitable for social network friend recommendation, relationship prediction and other scenarios.

Parameter descriptions are as follows:

<!--
- NebulaGraph Algorithm

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |``|``||
  |``|``||
  |``|``||
  |``|``||
-->

- NebulaGraph Analytics

  - Input parameters

    |Parameter|Predefined value|Description|
    |:--|:--|:--|
    |`IDS1`|-| A set of VIDs. Multiple VIDs are separated by commas (,). It is not allowed to be empty.|
    |`IDS2`|-| A set of VIDs. Multiple VIDs are separated by commas (,). It can be empty, and empty represents all vertexes.|
    |`REMOVED_SELF_EDGE`|`true`|Whether to exclude self-loop edges.|

  - Output parameters

    |Parameter|Type|Description|
    |:--|:--|:--|
    |`VID1`|Determined by `vid_type`| The ID of the first vertex.|
    |`VID2`|Determined by `vid_type`| The ID of the second vertex.|
    |`VALUE`|double| The similarity between `VID1` and `VID2`.|
