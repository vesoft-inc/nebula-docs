# Open in Explore

With the **Open in Explore** function, you can run nGQL statements on the **Console** page to query vertex or edge data and then view the result on the **Explore** page in a visualized way.

## Supported versions

Studio of v{{ studio.release }} or later versions supports this function. For more information, see [check updates](../about-studio/st-ug-check-updates.md).

## Prerequisites

To use the **Open in Explore** function, you must do a check of these:

- Studio is connected to Nebula Graph. For more information, see [Connect to Nebula Graph](../deploy-connect/st-ug-connect.md).

- A dataset exists in the database. For more information, see [Import data](../quick-start/st-ug-import-data.md).

## Query and visualize edge data

To query edge data on the **Console** page and then view the result on the **Explore** page, follow these steps:

1. In the toolbar, click the **Console** tab.

2. In the **Current Graph Space** field, choose a graph space name. In this example, **basketballplayer** is chosen.

3. In the input box, enter an nGQL statement and click the button ![Icon of Run](../figs/st-ug-008.png "Run").  

  !!! note

        The query result must contain the VIDs of the source vertex and the destination vertex of an edge.

   Here is an nGQL statement example.

    ```ngql
    nebula> GO FROM "player102" OVER serve YIELD src(edge),dst(edge);
    ```

   In the query result, you can see the start year and end year of the service team for the player whose playerId is `palyer102`. As shown below.

   ![The Result window shows the queried edge data, including the VIDs of the source vertex and the destination vertex](../figs/st-ug-037.png "Edge data")

4. Click the **Open in Explore** button.

5. In the dialog box, configure as follows:  
   a. Click **Edge Type**.  

   b. In the **Edge Type** field, enter an edge type name. In this example, `serve` is used.  

   c. In the **Src ID** field, choose a column name from the result table representing the VIDs of the source vertices. In this example, `serve._src` is chosen.  

   d. In the **Dst ID** field, choose a column name from the result table representing the VIDs of the destination vertices. In this example, `serve._dst` is chosen.  

   e. (Optional) If the result table contains the ranking information of the edges, in the **Rank** field, choose a column name representing the `rank` of the edges. If no ranking information exists in the result, leave the **Rank** field blank.  

   f. When the configuration is done, click the **Import** button.  

   ![The dialog box for you to configure the edge data](../figs/st-ug-038-1.png "Configure edge data")

6. If some data exists on the board of **Explore**, choose a method to insert data:

   - **Incremental Insertion**: Click this button to add the result to the existing data on the board.
   - **Insert After Clear**: Click this button to clear the existing data from the board and then add the data to the board.

When the data is inserted, you can view the visualized representation of the edge data.

![The edge data is represented on the Explore board](../figs/st-ug-044-1.png "Visualize edge data")

## Query and visualize vertex data

To query vertex data on the **Console** page and then view the result on the **Explore** page, follow these steps:

1. In the toolbar, click the **Console** tab.

2. In the **Current Graph Space** field, choose a graph space name. In this example, **basketballplayer** is chosen.

3. In the input box, enter an nGQL statement and click the button ![Icon of Run](../figs/st-ug-008.png "Run").

  !!! note

        The query result must contain the VIDs of the vertices.

   Here is an nGQL statement example.

   ```ngql
   nebula> FETCH PROP ON player "player100" YIELD properties(vertex).name;
   ```

   The query result gives the information of the player whose `playerId` is `player100`, as shown in this figure.

   ![The Result window shows the queried vertex data](../figs/st-ug-043-1.png "Vertex data")

4. Click the **Open in Explore** button.

5. In the dialog box, configure as follows:  
   a. Click **Vertex**.  
   
   b. In the **Vertex ID** field, choose a column name from the result table representing the VIDs of the vertices. In this example, `VertexID` is chosen.  
   
   c. When the configuration is done, click the **Import** button.

   ![The dialog box for you to configure the vertex data](../figs/st-ug-047-1.png "Configure vertex data")  

6. If some data exists on the board of **Explore**, choose a method to insert data:

   - **Incremental Insertion**: Click this button to add the queried result to the existing data on the board.

   - **Insert After Clear**: Click this button to clear the existing data from the board and then add the data.

When the data is inserted, you can view the visualized representation of the vertex data.

## Next to do

On the **Explore** page, you can expand the board to explore and analyze graph data.
