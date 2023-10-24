# Manage edge types

After a graph space is created in NebulaGraph, you can create edge types. With Studio, you can choose to use the **Console** page or the **Schema** page to create, retrieve, update, or delete edge types. This topic introduces how to use the **Schema** page to operate edge types in a graph space only.

## Prerequisites

To operate an edge type on the **Schema** page of Studio, you must do a check of these:

- Studio is connected to NebulaGraph.
- A graph space is created.
- Your account has the authority of GOD, ADMIN, or DBA.

## Create an edge type

1. In the toolbar, click the **Schema** tab.

2. In the **Graph Space List** page, find a graph space and then click its name or click **Schema** in the **Operations** column.

3. In the **Current Graph Space** field, confirm the name of the graph space. If necessary, you can choose another name to change the graph space.

4. Click the **Edge Type** tab and click the **+ Create** button.

5. On the **Create Edge Type** page, do these settings:

  - **Name**: Specify an appropriate name for the edge type. In this example, `serve` is used.

  - **Comment** (Optional): Enter the description for edge type.

  - **Define Properties** (Optional): If necessary, click **+ Add Property** to do these settings:

    - Enter a property name.

    - Select a data type.

    - Select whether to allow null values..
    
    - (Optional) Enter the default value.

    - (Optional) Enter the description.

  - **Set TTL (Time To Live)** (Optional): If no index is set for the edge type, you can set the TTL configuration: In the upper left corner of the **Set TTL** panel, click the check box to expand the panel, and configure `TTL_COL` and `TTL_ DURATION` (in seconds). For more information about both parameters, see [TTL configuration](../../3.ngql-guide/8.clauses-and-options/ttl-options.md "Click to go to NebulaGraph website").

6. When the preceding settings are completed, in the **Equivalent to the following nGQL statement** panel, you can see the nGQL statement equivalent to these settings.

   ![Define properties of the `action` edge type](https://docs-cdn.nebula-graph.com.cn/figures/st-ug-004-en.png "Define an edge type")

7. Confirm the settings and then click the **+ Create** button.

When the edge type is created successfully, the **Define Properties** panel shows all its properties on the list.

## Edit an edge type

1. In the toolbar, click the **Schema** tab.

2. In the **Graph Space List** page, find a graph space and then click its name or click **Schema** in the **Operations** column.

3. In the **Current Graph Space** field, confirm the name of the graph space. If necessary, you can choose another name to change the graph space.

4. Click the **Edge Type** tab, find an edge type and then click the button ![Icon of edit](https://docs-cdn.nebula-graph.com.cn/figures/Setup.png) in the **Operations** column.

5. On the **Edit** page, do these operations:

   - To edit a comment: Click **Edit** on the right of `Comment`.
   - To edit a property: On the **Define Properties** panel, find a property, click **Edit**, and then change the data type or the default value.

   - To delete a property: On the **Define Properties** panel, find a property, click **Delete**.

   - To add more properties: On the **Define Properties** panel, click the **Add Property** button to add a new property.

   - To set the TTL configuration: In the upper left corner of the **Set TTL** panel, click the check box and then set TTL.

   - To delete the TTL configuration: When the **Set TTL** panel is expanded, in the upper left corner of the panel, click the check box to delete the configuration.

   - To edit the TTL configuration: On the **Set TTL** panel, click **Edit** and then change the configuration of `TTL_COL` and `TTL_DURATION` (in seconds).

    !!! note

        For information about the coexistence problem of TTL and index, see [TTL]((../../3.ngql-guide/8.clauses-and-options/ttl-options.md).

## Delete an Edge type

!!! danger

    Confirm the [impact](../../3.ngql-guide/11.edge-type-statements/2.drop-edge.md) before deleting the Edge type. The deleted data cannot be restored if it is not [backup](../../backup-and-restore/nebula-br/1.what-is-br.md).

1. In the toolbar, click the **Schema** tab.

2. In the **Graph Space List** page, find a graph space and then click its name or click **Schema** in the **Operations** column.

3. In the **Current Graph Space** field, confirm the name of the graph space. If necessary, you can choose another name to change the graph space.

4. Click the **Edge Type** tab, find an edge type and then click the button ![Icon of deletion](https://docs-cdn.nebula-graph.com.cn/figures/alert-delete.png) in the **Operations** column.

5. Click **OK** to confirm in the pop-up dialog box.

## Next to do

After the edge type is created, you can use the **Console** page to insert edge data one by one manually or use the **Import** page to bulk import edge data.
