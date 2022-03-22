# Canvas overview

You can visually explore data on a canvas. This topic introduces the composition of a canvas and its related functions.

Canvas overview diagram:

![canvas](../figs/canvas-overview.png)

## Tabs on the Top

Click the plus sign ![canvas_tab](../figs/list-add.png) to add a new canvas. You can have operations on multiple canvases simultaneously.

![canvas_overview](../figs/canvas-graphspace.png)

- Canvas data on different canvases can come from the same graph space or from different graph spaces.
- You can customize the name of a canvas except for the canvas in the left-most tab.

## Visualization modes

Graph data can be visually explored in **2D mode** and **3D mode**. For more information, [Visualization modes](visualization-mode.md).

## Data storage

Graph data on the current canvas can be stored by creating snapshots or exporting canvas data as images or CSV files.

At the top right of the page, you can:

- Click ![snapshot](../figs/graph-snapshot.png) to create a snapshot. For more information, see [Canvas snapshots](canvas-snapshot.md).
- Click ![PNG](../figs/topbar-exportPNG.png) to store canvas data as images.
- Click ![CSV](../figs/topbar-exportCSV.png) to store canvas data as CSV files.


## Search box

In the search box at the top left of the page, enter a VID  or the property values of tags to locate target vertices.

## Layouts

Explorer provides 6 layouts to show the relationship between the data on a canvas.

| Force | Dagre | Circular | Grid  | Neural Network | Radial  |
| -------- | ------ | ------ | ----- | -------- | ----- |
| ![graphView](../figs/Thumbnail-graphView.png)    | ![treeView](../figs/Thumbnail-treeView.png)  | ![sphereView](../figs/Thumbnail-sphereView.png)  | ![grid](../figs/Thumbnail-Grid.png) | ![neural](../figs/Thumbnail-neuralNetwork.png)    | ![radial](../figs/Thumbnail-Radial.png) |

![layouts](../figs/layout.gif)

## Minimap

You can display the vertices on a canvas on full screen. You can also collapse the minimap, zoom in or zoom out the canvass, etc. The percentage of a canvas graph to the total is displayed in the lower-left corner of the minimap.

![](../figs/thumbnail.png)

## Data overview

On the right side of the page, click ![list-left](../figs/list-left.png) to expand the data overview panel.

![dataView](../figs/dataview.png)

On the data overview panel, you are enabled to:

- See the number of tags and edge types, and the number of the corresponding vertices and edges on a canvas.  
- Click the tag color icon to customize the color, size, and icon of the vertices with the same tag.

  !!! note
        Vertices with the same tag have the same color. Right-click on a single vertex on a canvas to manually modify the style of the vertex.

- Upload images to personalize the style of the vertices in the canvas, and the uploaded images are stored in the browser. To store uploaded images permanently, save the canvas data as a snapshot. For details, see [Manage snapshots](canvas-snapshot.md).

  ![](../figs/upload-logo.png)