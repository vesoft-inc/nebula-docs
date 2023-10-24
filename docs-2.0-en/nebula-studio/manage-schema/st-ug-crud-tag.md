# Manage tags

After a graph space is created in NebulaGraph, you can create tags. With Studio, you can use the **Console** page or the **Schema** page to create, retrieve, update, or delete tags. This topic introduces how to use the **Schema** page to operate tags in a graph space only.

## Prerequisites

To operate a tag on the **Schema** page of Studio, you must do a check of these:

- Studio is connected to NebulaGraph.
- A graph space is created.
- Your account has the authority of GOD, ADMIN, or DBA.

## Create a tag

1. In the toolbar, click the **Schema** tab.

2. In the **Graph Space List** page, find a graph space and then click its name or click **Schema** in the **Operations** column.

3. In the **Current Graph Space** field, confirm the name of the graph space. If necessary, you can choose another name to change the graph space.

4. Click the **Tag** tab and click the **+ Create** button.

5. On the **Create** page, do these settings:

  - **Name**: Specify an appropriate name for the tag. In this example, `course` is specified.

  - **Comment** (Optional): Enter the description for tag.

  - **Define Properties** (Optional): If necessary, click **+ Add Property** to do these settings:

    - Enter a property name.

    - Select a data type.

    - Select whether to allow null values..
    
    - (Optional) Enter the default value.

    - (Optional) Enter the description.

    - **Set TTL (Time To Live)** (Optional): If no index is set for the tag, you can set the TTL configuration: In the upper left corner of the **Set TTL** panel, click the check box to expand the panel, and configure `TTL_COL` and `TTL_ DURATION` (in seconds). For more information about both parameters, see [TTL configuration](../../3.ngql-guide/8.clauses-and-options/ttl-options.md "Click to go to NebulaGraph website").

6. When the preceding settings are completed, in the **Equivalent to the following nGQL statement** panel, you can see the nGQL statement equivalent to these settings.

   ![Define properties of the `course` tag](https://docs-cdn.nebula-graph.com.cn/figures/st-ug-008-en.png)

7. Confirm the settings and then click the **+ Create** button. 

When the tag is created successfully, the **Define Properties** panel shows all its properties on the list.

## Edit a tag

1. In the toolbar, click the **Schema** tab.

2. In the **Graph Space List** page, find a graph space and then click its name or click **Schema** in the **Operations** column.

3. In the **Current Graph Space** field, confirm the name of the graph space. If necessary, you can choose another name to change the graph space.

4. Click the **Tag** tab, find a tag and then click the button ![Icon of edit](https://docs-cdn.nebula-graph.com.cn/figures/Setup.png) in the **Operations** column.

5. On the **Edit** page, do these operations:

   - To edit a Comment: Click **Edit** on the right of `Comment`.

   - To edit a property: On the **Define Properties** panel, find a property, click **Edit**, and then change the data type or the default value.

   - To delete a property: On the **Define Properties** panel, find a property, click **Delete**.

   - To add more properties: On the **Define Properties** panel, click the **Add Property** button to add a new property.

   - To set the TTL configuration: In the upper left corner of the **Set TTL** panel, click the check box and then set TTL.

   - To delete the TTL configuration: When the **Set TTL** panel is expanded, in the upper left corner of the panel, click the check box to delete the configuration.

   - To edit the TTL configuration: On the **Set TTL** panel, click **Edit** and then change the configuration of `TTL_COL` and `TTL_DURATION` (in seconds).

    !!! note

        The problem of coexistence of TTL and index, see [TTL]((../../3.ngql-guide/8.clauses-and-options/ttl-options.md).

## Delete a tag

!!! danger

    Confirm the [impact](../../3.ngql-guide/10.tag-statements/2.drop-tag.md) before deleting the tag. The deleted data cannot be restored if it is not [backup](../../backup-and-restore/nebula-br/1.what-is-br.md).

1. In the toolbar, click the **Schema** tab.

2. In the **Graph Space List** page, find a graph space and then click its name or click **Schema** in the **Operations** column.

3. In the **Current Graph Space** field, confirm the name of the graph space. If necessary, you can choose another name to change the graph space.

4. Click the **Tag** tab, find an tag and then click the button ![Icon of deletion](https://docs-cdn.nebula-graph.com.cn/figures/alert-delete.png) in the **Operations** column.

5. Click **OK** to confirm delete a tag in the pop-up dialog box.

## Next to do

After the tag is created, you can use the **Console** page to insert vertex data one by one manually or use the **Import** page to bulk import vertex data.

