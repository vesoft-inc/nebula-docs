# Graph computing

To better mine and analyze the graph data, users can perform graph computing based on the vertexes and edges in the canvas and view the graph computing results directly.

!!! note

    This function only performs graph computing for existing vertexes in the canvas. If you need to perform complex graph computing, it is recommended to use [Workflow](../workflow/workflows.md) to perform complex visual graph computing.

## Prerequisites

Ensure the canvas has the vertex and edge data needed for the graph calculation. For details, see [Start querying](ex-ug-query-exploration.md).

## Steps

1. In the navigation bar on the left side of the page, click ![graph-algorithm](https://docs-cdn.nebula-graph.com.cn/figures/rightclickmenu-graphCalculation.png) button to open **Graph algorithm** panel.

2. Select the algorithm and set related parameters. For more Information about algorithm and parameter, see [Algorithm overview](../../graph-computing/algorithm-description.md)。

3. Click **Run** and the result pops up from below the canvas.

4. On the result page, you can do the following operations:

   - Click **Auto complete 1-degree edges** to completes the one-degree path relationship between all vertexes in the canvas.
   - Click **Export CSV File** to download the graph computing result file in CSV format.

<img src="https://docs-cdn.nebula-graph.com.cn/figures/eo_expl_algorithm_230913_en.png" width="1200" alt="A screenshot that shows the subgraph algorithm of explorer">
