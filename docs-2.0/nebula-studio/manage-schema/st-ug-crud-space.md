# Operate graph spaces

When Studio is connected to Nebula Graph, you can create or delete a graph space. You can use the **Console** page or the **Schema** page to do these operations. This article only introduces how to use the **Schema** page to operate graph spaces in Nebula Graph.

## Studio version

Studio of v{{ studio.base220 }} or later versions supports this function. To update the version, run this command.

```bash
docker-compose pull && docker-compose up
```

## Prerequisites

To operate a graph space on the **Schema** page of Studio, you must do a check of these:

- The version of Studio is v{{ studio.base220 }} or later.
- Studio is connected to Nebula Graph.
- Your account has the authority of GOD. It means that:
  - If the authentication is enabled in Nebula Graph, you can use `user` and `password` to sign in to Studio.
  - If the authentication is disabled in Nebula Graph, you must use `root` and its password to sign in to Studio.

## Create a graph space

To create a graph space on the **Schema** page, follow these steps:

1. In the toolbar, click the **Schema** tab.
2. On the **Graph Space List** page, click the **+ Create** button.
3. On the **Create** page, do these settings:

   a. **Name**: Specify a name to the new graph space. In this example, `basketballplayer` is used. The name must be distinct in the database.

   b. **Optional Parameters**: Set `partition_num`, `replica_factor`, `charset`, `collate` and `vid type`. In this example, these parameters are set to `10`, `1`, `utf8`, `utf8_bin` and `FIXED_STRING(32)` separately. For more information, see [`CREATE SPACE` syntax](/docs-2.0/3.ngql-guide/9.space-statements/1.create-space.md "Click to go to the Nebula Graph website").

   In the **Equivalent to the following nGQL statement** panel, you can see the statement equivalent to the preceding settings.
   
   ```bash
   CREATE SPACE basketballplayer (partition_num = 10, replica_factor = 1, charset = utf8, collate = utf8_bin, vid_type = FIXED_STRING(32))
   ```

4. Confirm the settings and then click the **+ Create** button. If the graph space is created successfully, you can see it on the graph space list.

![The Create page with settings for a graph space](../figs/st-ug-026-1.png)

## Delete a graph space

!!! danger

    Deleting the image space will delete all the data in it, and the deleted data cannot be restored if it is not [backed up](../../7.data-security/3.manage-snapshot.md).

To delete a graph space on the **Schema** page, follow these steps:

1. In the toolbar, click the **Schema** tab.
2. In the graph space list, find a graph space and then the button ![Icon of deletion](https://docs-cdn.nebula-graph.com.cn/nebula-studio-docs/st-ug-017.png "Delete") in the **Operations** column.

   ![Graph space list with the graph space to be deleted](./../figs/st-ug-029.png)
3. On the dialog box, confirm the information and then click the **OK** button.  
   When the graph space is deleted successfully, it is removed from the graph space list.

## Next to do

After a graph space is created, you can create or edit a schema, including:

- [Operate tags](st-ug-crud-tag.md)
- [Operate edge types](st-ug-crud-edge-type.md)
- [Operate indexes](st-ug-crud-index.md)
