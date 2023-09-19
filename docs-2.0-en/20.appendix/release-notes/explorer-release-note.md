# NebulaGraph Explorer release notes

## v3.5.1

- Bugfix

  - Fix wrong links.
  - Fix wrong text.
  - Remove deprecated tool components.

## v3.5.0

- Feature

  - Support for using workflows via [NFS configuration](../../nebula-explorer/workflow/1.prepare-resources.md).
  - Allow users to personalize the product, including the page logo and product name.
  - [Import data](../../nebula-explorer/db-management/11.import-data.md) supports historical task re-import, and the data source type supports `cloud` and `SFTP`.
  - Support for the new [License](../../9.about-license/1.license-overview.md).

## v3.4.0

- Feature

  - Support viewing the [creation statements](../../nebula-explorer/db-management/10.create-schema.md) of the schema.
  - Add a **Beta functions** switch button on the global settings page.
  - Add a product feedback page.

- Enhancement

  - Remove the timeout limit for slow queries.
  - Keep history on the console page after switching pages.
  - Support adding comments with `#` on the console page.
  - Support adding comments with `#` or `//` when creating nGQL templates.
  - Update the global settings page.
  - Support the visual modification of the IP whitelist.
  - Show VID on canvas by default.
  - Display browser compatibility hints.
  - Show the kernel version in the connection information.
  - Add indexes to the built-in dataset.
  - Optimize the login page.
  - Optimize Workflow:
    - Add algorithm descriptions.
    - Optimize the parameter configurations of the graph algorithm.
    - Optimize the presentation of the result.
  - Optimize interactions:
    - Vertex filter
    - Query by tag
    - Search path
  - Optimize presentations:
    - Optimize the presentation of schema statistics.
    - Optimize the layout of force.
    - Optimize the layout of the visual query results after importing them to the canvas.
    - Optimize the presentation of vertices on dangling edges.
    - Optimize the console page.
  - Optimize hints:
    - Optimize guidances.
    - Optimize error messages.

- Bugfix

  - Fix the bug that can not be able to view the import task log.
  - Fix the bug that some data of the edges in the `demo_basketballplayer` dataset is missing.
  - Fix the crash of the page.
  - Fix the bug that the results of the graph algorithm in the workflow can not show the details of vertices after importing them to canvas.
