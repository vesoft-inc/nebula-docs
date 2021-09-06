# Operate edge types

After a graph space is created in Nebula Graph, you can create edge types. With Studio, you can choose to use the **Console** page or the **Schema** page to create, retrieve, update, or delete edge types. This article only introduces how to use the **Schema** page to operate edge types in a graph space.

## Studio version

Studio of v{{ studio.release }} or later versions supports this function. For more information, see [check updates](../about-studio/st-ug-check-updates.md).

## Prerequisites

To operate an edge type on the **Schema** page of Studio, you must do a check of these:

- Studio is connected to Nebula Graph.
- A graph space is created.
- Your account has the authority of GOD, ADMIN, or DBA.

## Create an edge type

To create an edge type on the **Schema** page, follow these steps:

1. In the toolbar, click the **Schema** tab.

2. In the **Graph Space List** page, find a graph space and then click its name or click the button ![Icon of setting](https://docs-cdn.nebula-graph.com.cn/nebula-studio-docs/st-ug-018.png "Set") in the **Operations** column.

3. In the **Current Graph Space** field, confirm the name of the graph space. If necessary, you can choose another name to change the graph space.

4. Click the **Edge Type** tab and click the **+ Create** button.

5. On the **Create** page, do these settings:

  a. **Name**: Specify an appropriate name for the edge type. In this example, `serve` is used.

  b. (Optional) If necessary, under the name, click the **Comment** to input content.

  c. (Optional) If necessary, in the upper left corner of the **Define Properties** panel, click the check box to expand the panel and do these settings:

    - To define a property: Enter a property name, a data type, and a default value.

    - To add multiple properties: Click the **Add Property** button and define more properties.

    - To cancel a defined property: Besides the **Defaults** column, click the button ![Icon of deletion](https://docs-cdn.nebula-graph.com.cn/nebula-studio-docs/st-ug-020.png "Cancel").

   d. (Optional) If no index is set for the edge type, you can set the TTL configuration: In the upper left corner of the **Set TTL** panel, click the check box to expand the panel, and configure `TTL_COL` and `TTL_ DURATION`. For more information about both parameters, see [TTL configuration](../../3.ngql-guide/8.clauses-and-options/ttl-options.md "Click to go to Nebula Graph website").

6. When the preceding settings are completed, in the **Equivalent to the following nGQL statement** panel, you can see the nGQL statement equivalent to these settings.

   ![Define properties of the `action` edge type](../figs/st-ug-027-1.png "Define an edge type")

7. Confirm the settings and then click the **+ Create** button.

When the edge type is created successfully, the **Define Properties** panel shows all its properties on the list.

## Edit an edge type

To edit an edge type on the **Schema** page, follow these steps:

1. In the toolbar, click the **Schema** tab.

2. In the **Graph Space List** page, find a graph space and then click its name or click the button ![Icon of setting](https://docs-cdn.nebula-graph.com.cn/nebula-studio-docs/st-ug-018.png "Set") in the **Operations** column.

3. In the **Current Graph Space** field, confirm the name of the graph space. If necessary, you can choose another name to change the graph space.

4. Click the **Edge Type** tab, find an edge type and then click the button ![Icon of edit](https://docs-cdn.nebula-graph.com.cn/nebula-studio-docs/st-ug-021.png "Edit") in the **Operations** column.

5. On the **Edit** page, do these operations:

   - To edit a Comment: Click **Edit** under the Name.
   - To edit a property: On the **Define Properties** panel, find a property, click **Edit**, and then change the data type or the default value.

   - To delete a property: On the **Define Properties** panel, find a property, click **Delete**.

   - To add more properties: On the **Define Properties** panel, click the **Add Property** button to add a new property.

   - To set the TTL configuration: In the upper left corner of the **Set TTL** panel, click the check box and then set TTL.

   - To edit the TTL configuration: On the **Set TTL** panel, click **Edit** and then change the configuration of `TTL_COL` and `TTL_DURATION`.

   - To delete the TTL configuration: When the **Set TTL** panel is expanded, in the upper left corner of the panel, click the check box to delete the configuration.

6. When the configuration is done, in the **Equivalent to the following nGQL statement** panel, you can see the equivalent `ALTER EDGE` statement.

## Delete an Edge type

!!! danger

    Confirm the [impact](../../3.ngql-guide/11.edge-type-statements/2.drop-edge.md) before deleting the Edge type. The deleted data cannot be restored if it is not [backed up](../../7.data-security/3.manage-snapshot.md).

To delete an edge type on the **Schema** page, follow these steps:

1. In the toolbar, click the **Schema** tab.

2. In **Graph Space List**, find a graph space and then click its name or click the button ![Icon of setting](https://docs-cdn.nebula-graph.com.cn/nebula-studio-docs/st-ug-018.png "Set") in the **Operations** column.

3. In the **Current Graph Space** field, confirm the name of the graph space. If necessary, you can choose another name to change the graph space.

4. Click the **Edge Type** tab, find an edge type and then click the button ![Icon of deletion](https://docs-cdn.nebula-graph.com.cn/nebula-studio-docs/st-ug-017.png "Delete") in the **Operations** column.

5. Click **OK** to confirm in the pop-up dialog box.

## Next to do

After the edge type is created, you can use the **Console** page to insert edge data one by one manually or use the **Import** page to bulk import edge data.
