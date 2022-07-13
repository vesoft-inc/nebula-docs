# Nebula Explorer release notes

## v3.1.0

- Feature
  - Support [workflow](../../nebula-explorer/workflow/workflows.md) function. A workflow is formed by connecting graph query and graph computing tasks.
  - Support [subgraph computing](../../nebula-explorer/graph-explorer/graph-algorithm.md) function.
  - Support [N-Step Vertex Detection](../../nebula-explorer/canvas-operations/visualization-mode.md) function based on the canvas.

- Enhancement
  - Adapted for Nebula Graph 3.2.0.
  - Support storing the canvas snapshots persistent. The snapshot data is saved on the server to avoid snapshot loss when users clearing browser data.
  - Support [setting the maximum number of the vertices and edges](../../nebula-explorer/canvas-operations/visualization-mode.md) displayed in the bird view mode.
  - Increase the distribution on the Z-axis by default to avoid the flat feeling in 3D mode when the 2D mode switches to 3D mode.

- Bugfix
  - Fixed the bug that users could not view the canvas snapshot when importing a canvas snapshot.
  - Fixed the bug that users could not select the new tab when opening too many tabs.
  - Fixed the bug that special characters were added to `<edge_type_list>` when performing the `FIND PATH` statement in the console.