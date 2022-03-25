# Canvas overview

You can visually explore data on a canvas. This topic introduces the composition of a canvas and its related functions.

Canvas overview diagram:

![canvas](https://docs-cdn.nebula-graph.com.cn/figures/canvas-overview.png)

## Tabs on the Top

Click the plus sign ![canvas_tab](https://docs-cdn.nebula-graph.com.cn/figures/list-add.png) to add a new canvas. You can have operations on multiple canvases simultaneously.

![canvas_overview](https://docs-cdn.nebula-graph.com.cn/figures/canvas-graphspace.png)

- Canvas data on different canvases can come from the same graph space or from different graph spaces.
- You can customize the name of a canvas except for the canvas in the left-most tab.

## Visualization modes

Graph data can be visually explored in **2D mode** and **3D mode**. For more information, [Visualization modes](visualization-mode.md).

## Data storage

Graph data on the current canvas can be stored by creating snapshots or exporting canvas data as images or CSV files.

At the top right of the page, you can:

- Click ![snapshot](https://docs-cdn.nebula-graph.com.cn/figures/graph-snapshot.png) to create a snapshot. For more information, see [Canvas snapshots](canvas-snapshot.md).
- Click ![PNG](https://docs-cdn.nebula-graph.com.cn/figures/topbar-exportPNG.png) to store canvas data as images.
- Click ![CSV](https://docs-cdn.nebula-graph.com.cn/figures/topbar-exportCSV.png) to store canvas data as CSV files.


## Search box

In the search box at the top left of the page, enter a VID  or the property values of tags to locate target vertices.

## Layouts

Explorer provides 6 layouts to show the relationship between the data on a canvas.

| Force | Dagre | Circular | Grid  | Neural Network | Radial  |
| -------- | ------ | ------ | ----- | -------- | ----- |
| ![graphView](https://docs-cdn.nebula-graph.com.cn/figures/Thumbnail-graphView.png)    | ![treeView](https://docs-cdn.nebula-graph.com.cn/figures/Thumbnail-treeView.png)  | ![sphereView](https://docs-cdn.nebula-graph.com.cn/figures/Thumbnail-sphereView.png)  | ![grid](https://docs-cdn.nebula-graph.com.cn/figures/Thumbnail-Grid.png) | ![neural](https://docs-cdn.nebula-graph.com.cn/figures/Thumbnail-neuralNetwork.png)    | ![radial](https://docs-cdn.nebula-graph.com.cn/figures/Thumbnail-Radial.png) |

![layouts](https://docs-cdn.nebula-graph.com.cn/figures/layout.gif)

## Minimap

You can display the vertices on a canvas on full screen. You can also collapse the minimap, zoom in or zoom out the canvass, etc. The percentage of a canvas graph to the total is displayed in the lower-left corner of the minimap.

![](https://docs-cdn.nebula-graph.com.cn/figures/thumbnail.png)

## Data overview

On the right side of the page, click ![list-left](https://docs-cdn.nebula-graph.com.cn/figures/list-left.png) to expand the data overview panel.

![dataView](https://docs-cdn.nebula-graph.com.cn/figures/dataview.png)

On the data overview panel, you are enabled to:

- See the number of tags and edge types, and the number of the corresponding vertices and edges on a canvas.  
- Click the tag color icon to customize the color, size, and icon of the vertices with the same tag.

  !!! note
        Vertices with the same tag have the same color. Right-click a single vertex on a canvas to manually modify the style of the vertex.

- Upload images to personalize the style of the vertices in the canvas, and the uploaded images are stored in the browser. To store uploaded images permanently, save the canvas data as a snapshot. For details, see [Manage snapshots](canvas-snapshot.md).

  ![upload images](../figs/upload-logo.png)
