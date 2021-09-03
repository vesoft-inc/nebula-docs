# Operate tags

After a graph space is created in Nebula Graph, you can create tags. With Studio, you can use the **Console** page or the **Schema** page to create, retrieve, update, or delete tags. This topic introduces how to use the **Schema** page to operate tags in a graph space only.

## Studio version

Studio of v{{ studio.release}} or later versions supports this function. For more information, see [check updates](../about-studio/st-ug-check-updates.md).

## Prerequisites

To operate a tag on the **Schema** page of Studio, you must do a check of these:

- Studio is connected to Nebula Graph.
- A graph space is created.
- Your account has the authority of GOD, ADMIN, or DBA.

## Create a tag

To create a tag on the **Schema** page, follow these steps:

1. In the toolbar, click the **Schema** tab.

2. In the **Graph Space List** page, find a graph space, and then click its name or the button ![Icon of setting](https://docs-cdn.nebula-graph.com.cn/nebula-studio-docs/st-ug-018.png "Settings") in the **Operations** column.

3. In the **Current Graph Space** field, confirm the name of the graph space. If necessary, you can choose another name to change the graph space.

4. Click the **Tag** tab and click the **+ Create** button.

5. On the **Create** page, do these settings:

   a. **Name**: Specify an appropriate name for the tag. In this example, `player` and `team` are specified.

   b. (Optional) If necessary, in the upper left corner of the **Define Properties** panel, click the check box to expand the panel and do these settings:

      - To define a property: Enter a property name, a data type, and a default value.

      - To add multiple properties: Click the **Add Property** button and define more properties.

      - To cancel a defined property: Besides the **Defaults** column, click the button ![Icon of deletion](https://docs-cdn.nebula-graph.com.cn/nebula-studio-docs/st-ug-020.png "Cancel").

   c. (Optional) If no index is set for the tag, you can set the TTL configuration: In the upper left corner of the **Set TTL** panel, click the check box to expand the panel and configure `TTL_COL` and `TTL_ DURATION`. For more information about both parameters, see [TTL configuration](../../3.ngql-guide/8.clauses-and-options/ttl-options.md "Click to go to Nebula Graph website").

6. When the preceding settings are completed, in the **Equivalent to the following nGQL statement** panel, you can see the nGQL statement equivalent to these settings.

   ![Define properties of the `course` tag](https://docs-cdn.nebula-graph.com.cn/nebula-studio-docs/st-ug-028.png "Define a tag")

7. Confirm the settings and then click the **+ Create** button. When the tag is created successfully, the **Define Properties** panel shows all its properties on the list.

## Edit a tag

To edit a tag on the **Schema** page, follow these steps:

1. In the toolbar, click the **Schema** tab.

2. In the **Graph Space List** page, find a graph space, and then click its name or the button ![Icon of setting](https://docs-cdn.nebula-graph.com.cn/nebula-studio-docs/st-ug-018.png "Set") in the **Operations** column.

3. In **Current Graph Space** field, confirm the name of the graph space. If necessary, you can choose another name to change the graph space.

4. Click the **Tag** tab, find a tag and then the button ![Icon of edit](https://docs-cdn.nebula-graph.com.cn/nebula-studio-docs/st-ug-021.png "Edit") in the **Operations** column.

5. On the **Edit** page, do these settings:

   - To edit a Comment: Click **Edit** under the **Name**.

   - To edit a property: On the **Define Properties** panel, find a property, click **Edit**, and then change the data type or the default value.

   - To delete a property: On the **Define Properties** panel, find a property and then click **Delete**.

   - To add more properties: On the **Define Properties** panel, click the **Add Property** button to add a new property.

   - To set the TTL configuration: In the upper left corner of the **Set TTL** panel, click the check box and then set the TTL configuration.

   - To edit the TTL configuration: On the **Set TTL** panel, click **Edit** and then change the configuration of `TTL_COL` and `TTL_DURATION`.

   - To delete the TTL configuration: When the **Set TTL** panel is expanded, in the upper left corner of the panel, click the check box to delete the configuration.

6. When the configuration is done, in the **Equivalent to the following nGQL statement** panel, you can see the equivalent `ALTER TAG` statement.

## Delete a tag


!!! danger

    Confirm the [impact](../../3.ngql-guide/10.tag-statements/2.drop-tag.md) before deleting the tag. The deleted data cannot be restored if it is not [backed up](../../7.data-security/3.manage-snapshot.md).

To delete a tag on the **Schema** page, follow these steps:

1. In the toolbar, click the **Schema** tab.

2. In **Graph Space List**, find a graph space, and then click its name or the button ![Icon of setting](https://docs-cdn.nebula-graph.com.cn/nebula-studio-docs/st-ug-018.png "Settings") in the **Operations** column.

3. In the **Current Graph Space** field, confirm the name of the graph space. If necessary, you can choose another name to change the graph space.

4. Click the **Tag** tab, find a tag and then the button ![Icon of deletion](https://docs-cdn.nebula-graph.com.cn/nebula-studio-docs/st-ug-017.png) in the **Operations** column.

5. CLick **OK**.

## Next to do

After the tag is created, you can use the **Console** page to insert vertex data one by one manually or use the **Import** page to bulk import vertex data.

