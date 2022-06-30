# Algorithm overview

Graph computing can detect the graph structure, such as the communities in a graph and the division of a graph. It can also reveal the inherent characteristics of the correlation between various vertexes, such as the centrality and similarity of the vertices. This topic introduces the algorithms and parameters supported by Nebula Graph.

<!--
Nebula Graph supports some graph computing tools. This topic describes the algorithms and parameters supported by these tools.
-->

!!! note

    This topic only introduces the parameters of Nebula Analytics. For details about the parameters of Nebula Algorithm, see [algorithm](https://github.com/vesoft-inc/nebula-algorithm/tree/{{algorithm.branch}}/example/src/main/scala/com/vesoft/nebula/algorithm).

<!--
!!! note

    Different graph computing tools support different algorithms and different parameters. See below for details.
-->

## Node importance measurement

### PageRank

The PageRank algorithm calculates the relevance and importance of vertices based on their relationships. It is commonly used in search engine page rankings. If a page is linked by many other pages, the page is more important (PageRank value is higher). If a page with a high PageRank value links to other pages, the PageRank value of the linked pages will increase.

Parameter descriptions are as follows:

<!--
- Nebula Algorithm

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`maxIter`|`10`|Maximum number of iterations.|
  |`resetProb`|`0.15`||
-->

- Nebula Analytics

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`ITERATIONS`|`10`| The maximum number of iterations.|
  |`IS_DIRECTED`|`true`| Whether to consider the direction of the edges. If set to `false`, the system automatically adds the reverse edge.|
  |`EPS`|`0.0001`| The convergence accuracy. When the sum of the differences between the two iterations is less than this value, the iteration is not continued.|
  |`DAMPING`|`0.85`| The damping coefficient. It is the jump probability after visiting a page.|

### KCore

The KCore algorithm is used to calculate the subgraph composed of no vertexes less than K degree, usually used in community discovery, financial risk control and other scenarios. The calculation result is one of the most commonly used reference values to judge the importance of a vertex, which reflects the propagation ability of a vertex.

Parameter descriptions are as follows:

<!--
- Nebula Algorithm

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`maxIter`|`10`|Maximum number of iterations.|
  |`degree`|`1`||
-->

- Nebula Analytics

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`TYPE`|`vertex`| The calculation type. Available values are `vertex` and `subgraph`. When set to `vertex`, the system calculates the number of cores for each vertex.|
  |`VERTICES`|`0`| The number of vertexes. If set to `0`, the system automatically calculates the value.|
  |`EDGES`|`0`| The number of edges. If set to `0`, the system automatically calculates the value.|
  |`KMIN`|`1`| Set the minimum value of K when range calculation. Takes effect only when `TYPE`=`subgraph`. |
  |`KMAX`|`1000000`| Set the maximum value of K when range calculation. Takes effect only when `TYPE`=`subgraph`.|
  |`ITERATIONS`|`10`| The maximum number of iterations.|

### DegreeCentrality (NStepDegree)

The DegreeCentrality algorithm is used to find the popular vertexes in a graph. Degree centrality measures the number of incoming or outgoing (or both) relationships from a vertex, depending on the direction of the projection of the relationship. The greater the degree of a vertex is, the higher the degree centrality of the vertex is, and the more important the vertex is in the network.

!!! note

    Nebula Analytics only estimates DegreeCentrality roughly.

Parameter descriptions are as follows:

<!--
- Nebula Algorithm（这里叫DegreeStatic？）

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |``|``||
  |``|``||
  |``|``||
  |``|``||
-->

- Nebula Analytics

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`IS_DIRECTED`|`true`| Whether to consider the direction of the edges. If set to `false`, the system automatically adds the reverse edge.|
  |`STEP`|`3`| The degree of calculation. `-1` means infinity.|
  |`BITS`|`6`| The hyperloglog bit width for cardinality estimation.|
  |`TYPE`|`both`| The direction of the edges for calculation. Optional values are `in`, `out` and `both`.|

### DegreeWithTime

The DegreeWithTime algorithm is used to count neighbors based on the time range of edges to find out the popular vertexes in a graph.

!!! note

    This algorithm is supported by Nebula Analytics only.

Parameter descriptions are as follows:

|Parameter|Predefined value|Description|
|:--|:--|:--|
|`ITERATIONS`|`10`| The maximum number of iterations.|
|`IS_DIRECTED`|`true`| Whether to consider the direction of the edges. If set to `false`, the system automatically adds the reverse edge.|
|`BEGIN_TIME`|-| The begin time.|
|`END_TIME`|-| The end time.|

### BetweennessCentrality

The BetweennessCentrality algorithm is used to detect the amount of influence a vertex has on the flow of information in a graph. It is used to find the vertexes that act as bridges between one part of the graph and another. Each vertex is given a score, the betweenness centrality score, based on the number of shortest paths through that vertex.

Parameter descriptions are as follows:

<!--
- Nebula Algorithm

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`maxIter`|`5`|Maximum number of iterations.|
-->

- Nebula Analytics

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`ITERATIONS`|`10`| The maximum number of iterations.|
  |`IS_DIRECTED`|`true`| Whether to consider the direction of the edges. If set to `false`, the system automatically adds the reverse edge.|
  |`CHOSEN`|`-1`| The selected vertex ID, `-1` means random selection.|
  |`CONSTANT`|`2`| The constant.|

### ClosenessCentrality

The ClosenessCentrality algorithm is used to calculate the reciprocal of the average of the shortest distance from one vertex to all other reachable vertexes. The larger the value is, the closer the vertex is to the center of the graph, and it can also be used to measure how long it takes for information to be transmitted from that vertex to other vertexes.

Parameter descriptions are as follows:

<!--
- Nebula Algorithm

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |``|``||
  |``|``||
  |``|``||
  |``|``||
-->

- Nebula Analytics

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`ITERATIONS`|`10`| The maximum number of iterations.|
  |`IS_DIRECTED`|`true`| Whether to consider the direction of the edges. If set to `false`, the system automatically adds the reverse edge.|
  |`NUM_SAMPLES`|`10`| The number of sampling vertexes.|

## Path

### APSP

The APSP (Full Graph Shortest Path) algorithm is used to find all shortest paths between two vertexes in a graph.

!!! note

    This algorithm is supported by Nebula Analytics only.

Parameter descriptions are as follows:

|Parameter|Predefined value|Description|
|:--|:--|:--|
|`WEIGHT`|-| The maximum weight of edges.|

### SSSP

The SSSP (Single source shortest Path) algorithm is used to calculate the shortest path length from a given vertex (starting vertex) to other vertexes. It is usually used in scenarios such as network routing and path design.

Parameter descriptions are as follows:

<!--
- Nebula Algorithm

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`sourceid`|-|The VID of the starting vertex.|
-->

- Nebula Analytics

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`WEIGHT`|-| The maximum weight of edges.|
  |`ROOT`|-| The VID of the starting vertex.|

### BFS

The BFS (Breadth First traversal) algorithm is a basic graph traversal algorithm. It gives a starting vertex and accesses other vertexes with increasing hops, that is, it traverses all the adjacent vertexes of the vertex first and then extends to the adjacent vertexes of the adjacent vertexes.

Parameter descriptions are as follows:

<!--
- Nebula Algorithm

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |``|``||
  |``|``||
  |``|``||
  |``|``||
-->

- Nebula Analytics

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`WEIGHT`|-| The maximum weight of edges.|
  |`IS_DIRECTED`|`true`|Whether to consider the direction of the edges. If set to `false`, the system automatically adds the reverse edge.|
  |`ROOT`|-|The VID of the starting vertex.|

<!--
### Node2Vec

The Node2Vec algorithm proposed a more reasonable graph feature learning method based on DeepWalk, and proposed a semi-supervised algorithm for scalable feature learning in networks. SGD was used to optimize a custom graph-based objective function, which could maximize the network domain information of nodes reserved in d-dimensional feature space. Based on the random walk, a second order random walk process is designed, which is equivalent to an extension of DeepWalk algorithm, and preserves the graph characteristics of neighbor nodes. Applicable to node function similarity comparison, node structure similarity comparison, community clustering and other scenarios.R

!!! note
    
    This algorithm is supported by Nebula Algorithm only.

Parameter descriptions are as follows:

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

## Community discovery

### LPA

The LPA (label propagation) algorithm is a semi-supervised learning method based on graph. Its basic idea is to use label information of labeled vertexes to predict label information of unlabeled vertexes. vertexes include labeled and unlabeled data, and their edges represent the similarity of two vertexes. The labels of vertexes are transferred to other vertexes according to the similarity. Label data is like a source that can be labeled for unlabeled data. The greater the similarity of vertexes is, the easier the label is to spread.

Parameter descriptions are as follows:

<!--
- Nebula Algorithm

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`maxIter`|`20`|Maximum number of iterations.|
  |``|``||
  |``|``||
  |``|``||
-->

- Nebula Analytics

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`ITERATIONS`|`10`|The maximum number of iterations.|
  |`IS_DIRECTED`|`true`|Whether to consider the direction of the edges. If set to `false`, the system automatically adds the reverse edge.|
  |`IS_CALC_MODULARITY`|`false`| Whether to calculate modularity.|

### HANP

The HANP (Hop Preference & Node Preference) algorithm is an optimization algorithm of LPA algorithm, which considers other information of labels, such as degree information, distance information, etc., and introduces attenuation coefficient during propagation to prevent transition propagation.

Parameter descriptions are as follows:

<!--
- Nebula Algorithm

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`hopAttenuation`|`0.1`|The attenuation coefficient.|
  |`maxIter`|`10`|Maximum number of iterations.|
  |`preference`|`1.0`||
-->

- Nebula Analytics

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`ITERATIONS`|`10`|The maximum number of iterations.|
  |`IS_DIRECTED`|`true`|Whether to consider the direction of the edges. If set to `false`, the system automatically adds the reverse edge.|
  |`PREFERENCE`|`1.0`| The bias of the neighbor vertex degree. `m>0`indicates biasing the neighbor with high vertex degree, `m<0` indicates biasing the neighbor with low vertex degree, and `m=0` indicates ignoring the neighbor vertex degree.|
  |`HOP_ATT`|`0.1`|The attenuation coefficient. The value ranges from `0` to `1`. The larger the value, the faster it decays and the fewer times it can be passed.|

### ConnectedComponent

The ConnectedComponent algorithm is used to calculate a subgraph of a graph in which all vertexes are connected to each other. Strongly Connected Component is considered in the path direction, Weakly Connected Component is not considered in the path direction.

!!! note

    Nebula Analytics only supports Weakly Connected Component.

Parameter descriptions are as follows:

<!--
- Nebula Algorithm

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`maxIter`|`10`|Maximum number of iterations.|
-->

- Nebula Analytics

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`IS_DIRECTED`|`true`| Whether to consider the direction of the edges. If set to `false`, the system automatically adds the reverse edge.|
  |`IS_CALC_MODULARITY`|`false`| Whether to calculate modularity.|

### Louvain

The Louvain algorithm is a community discovery algorithm based on modularity. This algorithm performs well in efficiency and effect, and can find hierarchical community structure. Its optimization goal is to maximize the modularity of the whole community network. Modularity is used to distinguish the difference of link density within and between communities, and to measure how well each vertex divides the community. In general, a good clustering approach will result in more modularity within communities than between communities.

Parameter descriptions are as follows:

<!--
- Nebula Algorithm

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`maxIter`|`20`|Maximum number of iterations.|
  |`internalIter`|`10`||
  |`tol`|`0.5`||
-->

- Nebula Analytics

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`IS_DIRECTED`|`true`| Whether to consider the direction of the edges. If set to `false`, the system automatically adds the reverse edge.|
  |`OUTER_ITERATION`|`20`|The maximum number of iterations in the first phase.|
  |`INNER_ITERATION`|`10`|The maximum number of iterations in the second phase.|
  |`IS_CALC_MODULARITY`|`false`| Whether to calculate modularity.|

## Graph feature

### TriangleCount

The TriangleCount algorithm is used to count the number of triangles in a graph. The more triangles, the higher the degree of vertex association in the graph, the tighter the organizational relationship.

Parameter descriptions are as follows:

<!--
- Nebula Algorithm

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |``|``||
  |``|``||
  |``|``||
  |``|``||
-->

- Nebula Analytics

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`OPT`|`3`|The calculation type. Optional values are `1`, `2` and `3`. `1` indicates counting the entire graph, `2` indicates counting through each vertex, `3` indicates listing all triangles.|
  |`REMOVED_DUPLICATION_EDGE`|`true`| Whether to exclude repeated edges.|
  |`REMOVED_SELF_EDGE`|`true`| Whether to exclude self-loop edge.|

## Clustering

### ClusteringCoefficient

The ClusteringCoefficient algorithm is used to calculate the clustering degree of vertexes in a graph. In all kinds of network structures reflecting the real world, especially social network structures, network groups with relatively high density tend to be formed between various vertexes. In other words, compared with the networks randomly connected between two vertexes, the aggregation coefficient of the real world network is higher.

Parameter descriptions are as follows:

<!--
- Nebula Algorithm

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |``|``||
  |``|``||
  |``|``||
  |``|``||
-->

- Nebula Analytics

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`TYPE`|`local`|The clustering type. Optional values are `local` and `global`. `local` indicates counting through each vertex, `global` indicates counting the entire graph.|
  |`REMOVED_DUPLICATION_EDGE`|`true`| Whether to exclude repeated edges.|
  |`REMOVED_SELF_EDGE`|`true`| Whether to exclude self-loop edge.|

## Similarity

### Jaccard

The Jaccard algorithm is used to calculate the similarity of two vertexes (or sets) and predict the relationship between them. It is suitable for social network friend recommendation, relationship prediction and other scenarios.

Parameter descriptions are as follows:

<!--
- Nebula Algorithm

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |``|``||
  |``|``||
  |``|``||
  |``|``||
-->

- Nebula Analytics

  |Parameter|Predefined value|Description|
  |:--|:--|:--|
  |`IDS1`|-| A set of VIDs. Multiple VIDs are separated by commas (,). It is not allowed to be empty.|
  |`IDS2`|-| A set of VIDs. Multiple VIDs are separated by commas (,). It can be empty, and empty represents all vertexes.|
  |`REMOVED_SELF_EDGE`|`true`|Whether to exclude self-loop edge.|
