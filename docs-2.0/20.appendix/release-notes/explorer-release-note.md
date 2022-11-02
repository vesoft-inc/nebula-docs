# NebulaGraph Explorer release notes

## v3.2.0

- Feature
  - Support [edge aggregation](../..//nebula-explorer/canvas-operations/visualization-mode.md). The edges with the same starting vertex, end vertex and edge type on the canvas are aggregated, making it clear which vertices have a lot of relationships. It also supports the computation of properties of aggregated edges.
  - Support [schema drafting](../../nebula-explorer/db-management/draft.md). The Schema is designed directly by dragging and dropping on the canvas. The vertex and edge relationship is more intuitive and supports applying the schema to a graph space with one click.
  - Support [iFrame](../../nebula-explorer/iframe.md). You can embedding canvas into third-party pages by using inline frameworks.
  - Support [custom icon library and edge style](../../nebula-explorer/canvas-operations/canvas-overview.md). Explorer has ten built-in icons for industry categories and supports uploading pictures as an icon.
  - Support [nGQL template](../../nebula-explorer/db-management/ngql-template.md). Design the query statement template directly or make nGQL statement as a template in the console, and then directly call the template and fill in the parameters to query.
  - Support [database user management](../../nebula-explorer/db-management/dbuser_management.md). Manage database users visually, including creating and authorizing users.
  - Workflow added [node2vec algorithm](../../graph-computing/algorithm-description.md).
  - (Beta) Support [OAuth 2.0 authentication](../../nebula-explorer/deploy-connect/ex-ug-connect.md). Users can log in to Explorer only after being authenticated by OAuth2.0 to ensure data security.

- Enhancement
  - The [Dag Controller](../../nebula-explorer/deploy-connect/ex-ug-deploy.md) is built into the installation package.
  - The welcome page provides some demo datasets.
  - Increases the drag effect of the vertex.
  - The console supports adding comments with `//`.
  - The favorites folder contents can be saved on the server.
  - Support searching graph space names in the graph space list.
  - The workflow prompts you to enter a missing parameter manually.
  - The help page provides introductory videos.
  - Workflow supports the configuration of resources on the page.
  - Added a white screen page for the crash.

- Bugfix
  - Fixed the bug that the right-click menu would not collapse automatically.
  - Fixed the bug that the canvas auto-scaling when adding filter criteria.
  - Fixed the bug that the canvas shook when switching to 3D mode with a large amount of data.
  - Fixed the bug that importing Int8/16/32 and fixed_string data failed.
