# View subgraphs

With the **View Subgraphs** function, you can run a [FIND SHORTEST | ALL PATH](../../3.ngql-guide/16.subgraph-and-path/2.find-path.md) or a [`GET SUBGRAPH`](../../3.ngql-guide/16.subgraph-and-path/1.get-subgraph.md) statement on the **Console** page and then view the result on the **Explore** page.

## Studio version

Studio of v2.0.0 or later versions supports this function. To update the version, see [Check updates](../about-studio/st-ug-check-updates.md).

## Prerequisites

To use the **View Subgraphs** function, you must do a check of these:

- The version of Studio is v2.0.0 or later.

- Studio is connected to Nebula Graph v2.x.

- A dataset exists in the database. In the example of this article, the **mooc_actions** dataset is used. For more information, see [Import data](../quick-start/st-ug-import-data.md).

## Procedure

To query the paths or subgraph on the **Console** page and then view them on the **Explore** page, follow these steps:

1. In the navigation bar, click the **Console** tab.

2. In the **Current Graph Space** dropdown list, choose a graph space name. In this example, **mooc_actions** is chosen.

3. In the input box, enter a `FIND SHORTEST PATH`, `FIND ALL PATH`, or `GET SUBGRAPH` statement and click **Run** ![Icon of Run](https://docs-cdn.nebula-graph.com.cn/nebula-studio-docs/st-ug-008.png "Run").

   Here is an nGQL statement example.

   ```ngql
   // Run FIND ALL PATH
   nebula> FIND ALL PATH FROM "1","2","4","6","42" to "History of Ecology","Neurobiology" OVER action;

   // Run FIND SHORTEST PATH
   nebula> FIND SHORTEST PATH FROM "1","2","4","6","42" to "History of Ecology","Neurobiology" OVER action;

   // Run GET SUBGRAPH
   nebula> GET SUBGRAPH 1 STEPS FROM "1";
   ```

    Take the `FIND ALL PATH` for example, the queried result gives all the paths from the specified user vertices to the course vertices, as shown in this figure.

    ![The result window shows the queried paths](../figs/st-ug-049.png "The queried PATHs")

4. Click the **View Subgraphs** button.

5. (Optional) If some data exists on the board of **Explore**, choose a method to insert data:

    - **Incremental Insertion**: Click this button to add the result to the existing data on the board.

    - **Insert After Clear**: Click this button to clear the existing data from the board and then add the data to the board.

When the data is inserted, you can view the visualized representation of the paths.

![The paths are represented on the Explore board](https://docs-cdn.nebula-graph.com.cn/nebula-studio-docs/st-ug-046.png "Visualize paths")

## Next to do

On the **Explore** page, you can expand the graph to explore and analyze graph data.
