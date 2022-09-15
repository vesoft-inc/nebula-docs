# Visualization modes

Explorer provides **2D** and **3D** visualization modes for you to explore data. 2D enables you to operate on graph data and view data information. 3D lets you explore graph data from a different perspective. The 3D is suitable for cases with a large amount of data or situations requiring presentations.

!!! note
 
    In 3D mode, operations on graph data are unavailable. 

![visualizaiton_mode](https://docs-cdn.nebula-graph.com.cn/figures/visualization-22-04-06_en.gif)

## 2D mode

Exploration of the data on a canvas is possible in 2D mode.

![2D](https://docs-cdn.nebula-graph.com.cn/figures/2d-mode-220712-en.png)

| Parameter       | Description                                                         |
| ---------- | ------------------------------------------------------------ |
| Auto | Weight Degree：Automatically resizes vertices according to the number of outgoing and incoming edges of all the vertices on the canvas.<br />Reset Degree：Resets the vertices on the canvas to their original size. <br />Edge Aggregation: Automatically aggregate all edges on the canvas that match the aggregation rules. <br />Edge Disaggregate: Resets the aggregated edges on the canvas.     |
| Detection   | Outlier: Detects the vertices that connect no edges on a canvas.<br />Hang Edge: Detects edges associated with vertices of one degree in the canvas (associated vertices are included).<br />Loop Detection: Detects the paths that connect a vertex to itself.<br /> N-Step Vertex Detection: Starting from the selected vertex, the vertices in the outbound direction are displayed on the canvas hop by hop.|
| Aggregation| Aggregate the edges between the vertices: Aggregate the edges between the selected vertices on the canvas.<br />Cancels aggregation of edges between vertices: Resets the aggregated edges between the selected vertices on the canvas. |
| Edit | Dismiss: Hide the selected vertices and edges on the canvas.<br />Dismiss Others: Hide the unselected vertices and edges on the canvas.<br />Undo: Undo the action in the previous step.<br />Redo: Restore the action that was previously undone. |

For more information about the operations available in 2D mode, see [Canvas](canvas-overview.md).

### Edge aggregation description

When there are a large number of vertices in the canvas, to enhance the readability and analyzability of the graph, edges with the same start vertex, end vertex and edge type can be aggregated to make the relationship between vertices clearer.

- Edge aggregation automatically displays the number of aggregated edges.
- Edge aggregation supports the calculation of properties in it. For details, see [Property calculation](../graph-explorer/property-calculation.md).
- Hovering over the aggregated edge displays the edge type, the number of aggregated edges, edge properties, and property values. If the property calculation was performed, the result is also displayed.
- In addition to canceling edge aggregation in the upper bar, you can also double-click the aggregated edge or right-click the aggregated edge and select **disaggregate**.

## 3D mode

![3D](https://docs-cdn.nebula-graph.com.cn/figures/3d-mode-220712-en.png)

At the top left of the page, toggle the view button to switch to 3D mode. 3D mode allows you to switch back to 2D mode and does not influence operations in 2D.

| Parameter     | Description                                                         |
| -------- | ------------------------------------------------------------ |
| Bird View     | Shows a bird view of all the data in the current graph space. By default, displays data for up to 20,000 vertices and 2,000 edges in the current graph space. Click ![list-down](https://docs-cdn.nebula-graph.com.cn/figures/list-down-220712.png) to adjust the settings, but setting them too large may crash the browser.                        |
| Image Quality     | High: Vertices are displayed in the form of balls with better light and shadow effects.<br />Normal: Vertices are represented in a circle format and support a large amount of data.  |
| Reheat | Disperses the distance between vertices when the vertices overlap. |

!!! compatibility "Legacy version compatibility"

    For versions of NebulaGraph below 3.0.0, you need to create an index before using the Bird View feature. For more information, see [Create an index](../../3.ngql-guide/14.native-index-statements/1.create-native-index.md).
