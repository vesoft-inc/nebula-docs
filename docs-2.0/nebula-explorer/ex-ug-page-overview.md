# Page overview

This topic introduces the Explorer page to help you learn more about Explorer's functions.

The Explorer page consists of two modules navigation bar and canvas. 

![explorer-overview](https://docs-cdn.nebula-graph.com.cn/figures/explorer-overview-1.png)

!!! note

    After logging into Explorer, select a graph space and click on it to unlock query and exploration functions in the left-side navigation bar. 
    
![explorer-overview-graph_space](https://docs-cdn.nebula-graph.com.cn/figures/explorer-overview-graphspace.png)

## Navigation bar

Click the icons in the left-side navigation bar to import, analyze, and explore graph data. The descriptions of the icons are as follows:

| Icon  | Description |
| ----- | ---- |
| ![query](https://docs-cdn.nebula-graph.com.cn/figures/nav-query2.png) | Enter VIDs or tags to query data. For more information, see [Ways to query data](ex-ug-query-exploration.md).     |
| ![filter](https://docs-cdn.nebula-graph.com.cn/figures/nav-filter.png) | Search for target vertexes displayed on the canvas. For more information, see [Filter vertices](node-filtering.md).     |
| ![expand](https://docs-cdn.nebula-graph.com.cn/figures/nav-expand.png) | Perform explorations on the vertices on the canvas by setting edge directions, steps, and filtering conditions.    |
| ![commonNeighbor](https://docs-cdn.nebula-graph.com.cn/figures/nav-commonNeighbor.png) | Select at least two vertices on the canvas to search for their common neighbors.     |
| ![findPath](https://docs-cdn.nebula-graph.com.cn/figures/nav-findPath.png) | Find all paths, the shortest path, and the non-loop paths from the source to the destination vertex.     |
| ![propertyView](https://docs-cdn.nebula-graph.com.cn/figures/nav-propertyView.png) | Choose whether to display the properties of vertices or edges on the canvas.     |
| ![hide](https://docs-cdn.nebula-graph.com.cn/figures/nav-miss.png) | Hide the selected vertices and edges on the canvas.     |
| ![hideReverse](https://docs-cdn.nebula-graph.com.cn/figures/nav-missReverse.png) | Hide the unselected vertices and edges on the canvas.     |
| ![Revoke](https://docs-cdn.nebula-graph.com.cn/figures/nav-Revoke.png) | Undo the action in the previous step.     |
| ![Redo](https://docs-cdn.nebula-graph.com.cn/figures/redo.png) | Restores the action that was previously undone.     |
| ![snapshot](https://docs-cdn.nebula-graph.com.cn/figures/snapshot-history.png) | View historical snapshots. For more information, see [Canvas snapshots](canvas-operations/canvas-snapshot.md).     |
| ![graphSpace](https://docs-cdn.nebula-graph.com.cn/figures/nav-graphSpace.png) | View all graph spaces. Click a graph space to create a canvas corresponding to it.     |
| ![Help](https://docs-cdn.nebula-graph.com.cn/figures/nav-help.png) | View Explorer documents and Nebula Graph forum.     |
| ![Setup](https://docs-cdn.nebula-graph.com.cn/figures/nav-setup.png) | View your account and shortcuts, edit languages, limit returned results, and clear connection.|
| ![Console](https://docs-cdn.nebula-graph.com.cn/figures/nav-console.png) | Query data by entering nGQL statements. Querying results are imported on canvas. For more information, see [Explorer console](explorer-console.md).   |

## Canvas

Graph data can be displayed visually on a canvas. The canvas consists of the following parts:

- Tabs on the Top
- Visualization modes
- Data storage
- Search box
- Layouts
- Minimap
- Data overview

For more information, see [Canvas overview](canvas-operations/canvas-overview.md).