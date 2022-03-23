# Graph exploration

The graph exploration can be performed from the following four aspects:

- Expand
- Common Neighbor
- Search for Path
- Inspect Property

![query_exploration](https://docs-cdn.nebula-graph.com.cn/figures/exploration_query.gif)

## Prerequisite

Make sure that there are vertices on the canvas. For more information, see [Start querying](ex-ug-query-exploration.md).

## Expand

In the navigation bar on the left side of the page, click ![expand](https://docs-cdn.nebula-graph.com.cn/figures/nav-expand.png) to open the **Expand** panel. You can double-click on a vertex or right-click to select multiple vertices for expansion. On the panel, you can edit edge types, select the direction of edges, change the color of vertices, custom steps, and add filtering conditions. 

| Parameter     | Description                                                         |
| -------- | ------------------------------------------------------------ |
| Edge type   | All edges in the graph space are displayed and selected by default.                           |
| Direction     | Define the edge direction for the selected vertices, including `Outgoing`, `Incoming`, and `Bidirect`. |
| Vertex Style | `Group by vertex tag`: The target vertices are displayed in the same color as the corresponding tag.<br />`Custom Style`: You can customize the color of the target vertices. |
| Steps     | `Single`: Customize the number of steps from the selected vertex to the target vertex.<br />`Range`: Customize the step range from the selected vertex to the target vertex.  |
| Filter | Query target vertices by filtering conditions.                                      |

!!! Note

    The system saves the current configurations on the panel. When you double-click or right-click on a vertex for exploration, the exploration will be performed based on the saved configurations.


## Common Neighbor

In the navigation bar on the left side of the page, click ![commonneighbor](https://docs-cdn.nebula-graph.com.cn/figures/nav-commonNeighbor.png) to open the **Common Neighbor** panel. You can select two or more vertices on the canvas and query their common neighbors. When the selected vertices have no common neighbor, the default returns ****There is no data**.

For information about selecting two or more vertices, see [Basic operations](ex-ug-shortcuts.md).

## Search for Path

In the navigation bar on the left side of the page, click ![findpath](https://docs-cdn.nebula-graph.com.cn/figures/nav-findPath.png) to open the **Search Path** panel. **You can select two vertices on the canvas. The first selected vertex is the source and the second is the destination vertex by default**. You can also customize the type and direction of edges, specify the number of exploration steps, and select the query path type.

| Parameter     | Description                                                         |
| -------- | ------------------------------------------------------------ |
| Edge Type   | All edges in the graph space are displayed and selected by default.                            |
| Direction     | Define the edge direction for the selected vertices, including `Outgoing`, `Incoming`, and `Bidirect`. |
| Query Type | `All path`: Request for vertices and edges in all paths from the source vertex to the destination vertex.<br />`Shortest Path`: Request for vertices and edges in the shortest path from the source vertex to the destination vertex.<br />`NoLoop Path`: Request for vertices and edges in non-loop paths from the source vertex to the destination vertex. |
| Steps | Customize the number of steps from the source vertex to the destination vertex.                                   |
| Filter | Query target vertices by filtering conditions.                                     |

## Inspect Property

In the navigation bar on the left side of the page, click ![propertyview](https://docs-cdn.nebula-graph.com.cn/figures/nav-propertyView.png) to open the **Inspect Property** panel. Properties of vertices or edges can be hidden or displayed on the canvas.

!!! note

    - Vertex properties are displayed on the canvas only when the zoom ratio is greater than 90%, and properties are automatically hidden when the zoom ratio is less than 90%.
    - Edge properties are displayed on the canvas only when the zoom ratio is greater than 100%, and properties are automatically hidden when the zoom ratio is less than 100%.