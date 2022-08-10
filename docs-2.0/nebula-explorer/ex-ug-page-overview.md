# Page overview

This topic introduces the NebulaGraphExplorer page to help you learn more about NebulaGraphExplorer's functions.

The NebulaGraphExplorer page consists of three modules top navigation bar, left-side navigation bar, and canvas. 

![explorer-overview](https://docs-cdn.nebula-graph.com.cn/figures/ex-overview-220622-en.png)

## Top navigation bar

| Icon/Element                                                    | Description                                                 |
| ------------------------------------------------------------ | ---------------------------------------------------- |
| **Explorer**                                                 | Visually explore and analyze data. For more information, see [Start querying](graph-explorer/ex-ug-query-exploration.md), [Vertex Filter](graph-explorer/node-filtering.md), [Graph exploration](graph-explorer/ex-ug-graph-exploration.md) and [Graph algorithm](graph-explorer/graph-algorithm.md).     |
| **Visual Query**                                             | Visually construct scenarios for data queries. For more information, see [Visual Query](12.query-visually.md).          |
| **Workflow** |  Visually construct custom workflows for complex graph computing. For more information, see [Workflow overview](workflow/workflows.md). |
| ![create_schema](https://docs-cdn.nebula-graph.com.cn/figures/studio-nav-schema.png) | Manage NebulaGraph database graph spaces. For more information, see [Create a schema](db-management/10.create-schema.md).       |
| ![import_data](https://docs-cdn.nebula-graph.com.cn/figures/studio-btn-download.png) | Bulk import of data into NebulaGraph. For more information, see [Import data](db-management/11.import-data.md).          |
| ![Console](https://docs-cdn.nebula-graph.com.cn/figures/nav-console2.png) | Query the NebulaGraph data with nGQL statements. For more information, see [Console](db-management/explorer-console.md). |
| ![language](https://docs-cdn.nebula-graph.com.cn/figures/navbar-language.png) | Select the language of  NebulaGraphExplorer page. Chinese and English are supported.   |
| ![help](https://docs-cdn.nebula-graph.com.cn/figures/navbar-help.png) | Guide and help you in using NebulaGraph.          |
| ![clear_connection](https://docs-cdn.nebula-graph.com.cn/figures/image-icon10.png) | Show the NebulaGraph version and allow you to disconnect from NebulaGraphExplorer.    |

## Left-side navigation bar

!!! note

    After logging into Explorer, select a graph space and click on it to unlock query and exploration functions in the left-side navigation bar. For more information, see [Choose graph spaces](graph-explorer/13.choose-graphspace.md).

Click the icons in the left-side navigation bar to import, analyze, and explore graph data. The descriptions of the icons are as follows:

| Icon  | Description |
| ----- | ---- |
| ![query](https://docs-cdn.nebula-graph.com.cn/figures/nav-query2.png) | Enter VIDs or tags to query data. For more information, see [Ways to query data](graph-explorer/ex-ug-query-exploration.md).     |
| ![filter](https://docs-cdn.nebula-graph.com.cn/figures/nav-filter.png) | Search for target vertexes displayed on the canvas. For more information, see [Filter vertices](graph-explorer/node-filtering.md).     |
| ![expand](https://docs-cdn.nebula-graph.com.cn/figures/nav-expand.png) | Perform explorations on the vertices on the canvas by setting edge directions, steps, and filtering conditions. For more information, see [Graph exploration](graph-explorer/ex-ug-graph-exploration.md).   |
| ![commonNeighbor](https://docs-cdn.nebula-graph.com.cn/figures/nav-commonNeighbor.png) | Select at least two vertices on the canvas to search for their common neighbors. For more information, see [Graph exploration](graph-explorer/ex-ug-graph-exploration.md).    |
| ![findPath](https://docs-cdn.nebula-graph.com.cn/figures/nav-findPath.png) | Find all paths, the shortest path, and the non-loop paths from the source to the destination vertex. For more information, see [Graph exploration](graph-explorer/ex-ug-graph-exploration.md).    |
| ![propertyView](https://docs-cdn.nebula-graph.com.cn/figures/nav-propertyView.png) | Choose whether to display the properties of vertices or edges on the canvas. For more information, see [Graph exploration](graph-explorer/ex-ug-graph-exploration.md).    |
| ![graph-algorithm](https://docs-cdn.nebula-graph.com.cn/figures/rightclickmenu-graphCalculation.png)| Perform graph computing based on the vertexes and edges in the canvas. For more Information see [Graph computing](graph-explorer/ex-ug-graph-exploration.md). |
| ![snapshot](https://docs-cdn.nebula-graph.com.cn/figures/snapshot-history.png) | View historical snapshots. For more information, see [Canvas snapshots](canvas-operations/canvas-snapshot.md).     |
| ![graphSpace](https://docs-cdn.nebula-graph.com.cn/figures/nav-graphSpace.png) | View all graph spaces. Click a graph space to create a canvas corresponding to it. For more information, see [Choose graph spaces](graph-explorer/13.choose-graphspace.md).    |
| ![Help](https://docs-cdn.nebula-graph.com.cn/figures/nav-help.png) | View Explorer documents and NebulaGraph forum.     |
| ![Setup](https://docs-cdn.nebula-graph.com.cn/figures/nav-setup2.png) | View your account, explorer version and shortcuts, limit returned results.|

## Canvas

!!! note

    After logging into Explorer, select a graph space and click on it to enter the canvas page. For more information, see [Choose graph spaces](graph-explorer/13.choose-graphspace.md).

Graph data can be displayed visually on a canvas. The canvas consists of the following parts:

- Tabs on the Top
- Visualization modes
- Data storage
- Search box
- Layouts
- Minimap
- Data overview

For more information, see [Canvas overview](canvas-operations/canvas-overview.md).