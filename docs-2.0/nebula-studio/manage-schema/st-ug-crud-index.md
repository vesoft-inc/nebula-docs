# Operate Indexes

You can create an index for a Tag and/or an Edge type. An index lets traversal start from vertices or edges with the same property and it can make a query more efficient. You can create two index types: Tag Index and Edge type Index. With Studio, you can use the **Console** page or the **Schema** page to create, retrieve, and delete indexes. This article introduces how to use the **Schema** page to operate an index.

!!! note

    You can create an index when a Tag or an Edge Type is created. But an index can decrease the write speed during data import. We recommend that you import data firstly and then create and rebuild an index. For more information, see [nGQL Manual](../../3.ngql-guide/14.native-index-statements/README.md "Click to go to the Nebula Graph website").

## Studio version

Studio of v{{ studio.release }} or later versions supports this function. For more information, see [check updates](../about-studio/st-ug-check-updates.md).

## Prerequisites

To operate an index on the **Schema** page of Studio, you must do a check of these:

- Studio is connected to Nebula Graph.
- A graph Space, Tags, and Edge Types are created.
- Your account has the authority of GOD, ADMIN, or DBA.

## Create an index

To create an index on the **Schema** page, follow these steps:

1. In the toolbar, click the **Schema** tab.
2. On the **Graph Space List** page, find a graph space, and then click its name or the button ![Icon of setting](https://docs-cdn.nebula-graph.com.cn/nebula-studio-docs/st-ug-018.png "Set") in the **Operations** column.
3. In the **Current Graph Space** field, confirm the name of the graph space. If necessary, you can choose another name to change the graph space.
4. Click the **Index** tab and then click the **+ Create** button.
5. On the **Create** page, do these settings:

  - **Index Type**: Choose to create an index for a tag or for an edge type. In this example, **Edge Type** is chosen.

  - **Name**: Choose a tag name or an edge type name. In this example, **follow** is chosen.

  - **Index Name**: Specify a name for the new index. In this example, **follow_index** is used.

  - **Indexed Properties**: Click **Add**, and then, in the dialog box, choose a property. If necessary, repeat this step to choose more properties. You can drag the properties to sort them. In this example, `degree` is chosen.

    !!! note

        The order of the indexed properties has an effect on the result of the `LOOKUP` statement. For more information, see [nGQL Manual](../../3.ngql-guide/7.general-query-statements/5.lookup.md "Click to go to the Nebula Graph website").

  - **Comment**: The remarks of a certain property or the index itself. The maximum length is 256 bytes. By default, there will be no comments on an index. But in this example, `follow_index` is used.

6. When the settings are done, the **Equivalent to the following nGQL statement** panel shows the statement equivalent to the settings.  

![A page for index creation](https://docs-cdn.nebula-graph.com.cn/nebula-studio-docs/st-ug-030.png "Create an index")

7. Confirm the settings and then click the **+ Create** button.  
   When an index is created, the index list shows the new index.

## View indexes

To view indexes on the **Schema** page, follow these steps:

1. In the toolbar, click the **Schema** tab.
2. In the graph space list, find a graph space, and then click its name or the button ![Icon of setting](https://docs-cdn.nebula-graph.com.cn/nebula-studio-docs/st-ug-018.png "Set") in the **Operations** column.
3. In the **Current Graph Space** field, confirm the name of the graph space. If necessary, you can choose another name to change the graph space.
4. Click the **Index** tab, in the upper left corner, choose an index type, **Tag** or **Edge Type**.
5. In the list, find an index and click its row. All its details are shown in the expanded row.

## Delete an index

To delete an index on **Schema**, follow these steps:

1. In the toolbar, click the **Schema** tab.
2. In the graph space list, find a graph space, and then click its name or the button ![Icon of setting](https://docs-cdn.nebula-graph.com.cn/nebula-studio-docs/st-ug-018.png "Set") in the **Operations** column.
3. In the **Current Graph Space** field, confirm the name of the graph space. If necessary, you can choose another name to change the graph space.
4. Click the **Index** tab, find an index and then the button ![Icon of deletion](https://docs-cdn.nebula-graph.com.cn/nebula-studio-docs/st-ug-017.png "Delete") in the **Operations** column.
5. Click **OK** to confirm in the pop-up dialog box.
