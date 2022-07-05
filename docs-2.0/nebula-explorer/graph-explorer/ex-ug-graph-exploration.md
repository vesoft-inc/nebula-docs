# Graph exploration

The graph exploration can be performed from the following four aspects:

- Expand
- Common Neighbor
- Search for Path
- Inspect Property

![query_exploration](https://docs-cdn.nebula-graph.com.cn/figures/exploration-query-22-04-06_en.gif)

## Prerequisite

Make sure that there are vertices on the canvas. For more information, see [Start querying](ex-ug-query-exploration.md).

## Expand

1. In the navigation bar on the left side of the page, click ![expand](https://docs-cdn.nebula-graph.com.cn/figures/nav-expand.png) to open the **Expand** panel. You can set expansion conditions on the panel, including edge type, direction, vertex style, steps or filter, as described below.

  | Parameter     | Description                                                         |
  | -------- | ------------------------------------------------------------ |
  | Edge type   | All edges in the graph space are displayed and selected by default.                           |
  | Direction     | Define the edge direction for the selected vertices, including `Outgoing`, `Incoming`, and `Bidirect`. |
  | Vertex Style | `Group by vertex tag`: The target vertices are displayed in the same color as the corresponding tag.<br />`Custom Style`: You can customize the color of the target vertices. |
  | Steps     | `Single`: Customize the number of steps from the selected vertex to the target vertex.<br />`Range`: Customize the step range from the selected vertex to the target vertex.  |
  | Filter | Query target vertices by filtering conditions.                                      |

2. Select the vertex you want to expand, either by holding down the right mouse to select or by holding down the `Shift` key and clicking on multiple vertexes on the canvas, and then click the `Expand` button in the **Expand** panel. For a single vertex, you can double-click the left mouse on the vertex to expand.

!!! Note

    The system saves the current configurations on the panel. When you double-click or right-click on a vertex for exploration, the exploration will be performed based on the saved configurations.

## Common Neighbor

In the navigation bar on the left side of the page, click ![commonneighbor](https://docs-cdn.nebula-graph.com.cn/figures/nav-commonNeighbor.png) to open the **Common Neighbor** panel. You can select two or more vertices either by holding down the right mouse to select or by holding down the `Shift` key and clicking on multiple vertexes on the canvas and query their common neighbors. When the selected vertices have no common neighbor, the default returns ****There is no data**.

## Search for Path

1. In the navigation bar on the left side of the page, click ![findpath](https://docs-cdn.nebula-graph.com.cn/figures/nav-findPath.png) to open the **Search Path** panel. You can set the edge type, direction, query type or filter, as described below.

  | Parameter     | Description                                                         |
  | -------- | ------------------------------------------------------------ |
  | Edge Type   | All edges in the graph space are displayed and selected by default.                            |
  | Direction     | Define the edge direction for the selected vertices, including `Outgoing`, `Incoming`, and `Bidirect`. |
  | Query Type | `All path`: Request for vertices and edges in all paths from the source vertex to the destination vertex.<br />`Shortest Path`: Request for vertices and edges in the shortest path from the source vertex to the destination vertex.<br />`NoLoop Path`: Request for vertices and edges in non-loop paths from the source vertex to the destination vertex. |
  | Steps | Customize the number of steps from the source vertex to the destination vertex.                                   |
  | Filter | Query target vertices by filtering conditions.                                     |

2. Hold down the `Shift` key and left-click to select two vertexes on the canvas. The first selected vertex is the source and the second is the destination vertex by default. Then click **Find Path** in the **Search Path** window.

## Inspect Property

In the navigation bar on the left side of the page, click ![propertyview](https://docs-cdn.nebula-graph.com.cn/figures/nav-propertyView.png) to open the **Inspect Property** panel. Properties of vertices or edges can be hidden or displayed on the canvas.

!!! note

    - Vertex properties are displayed on the canvas only when the zoom ratio is greater than 90%, and properties are automatically hidden when the zoom ratio is less than 90%.
    - Edge properties are displayed on the canvas only when the zoom ratio is greater than 100%, and properties are automatically hidden when the zoom ratio is less than 100%.