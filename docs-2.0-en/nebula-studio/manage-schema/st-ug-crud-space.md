# Manage graph spaces

When Studio is connected to NebulaGraph, you can create or delete a graph space. You can use the **Console** page or the **Schema** page to do these operations. This article only introduces how to use the **Schema** page to operate graph spaces in NebulaGraph.

## Prerequisites

To operate a graph space on the **Schema** page of Studio, you must do a check of these:

- Studio is connected to NebulaGraph.
- Your account has the authority of GOD. It means that:
  - If the authentication is enabled in NebulaGraph, you can use `root` and any password to sign in to Studio.
  - If the authentication is disabled in NebulaGraph, you must use `root` and its password to sign in to Studio.

## Create a graph space

1. In the toolbar, click the **Schema** tab.

2. In the **Graph Space List** page, click **Create Space**, do these settings:

  - **Name**: Specify a name to the new graph space. In this example, `basketballplayer` is used. The name must be unique in the database.

  - **Vid Type**: The data types of VIDs are restricted to `FIXED_STRING(<N>)` or `INT64`. A graph space can only select one VID type. In this example, `FIXED_STRING(32)` is used. For more information, see [VID](../../1.introduction/3.vid.md).

  - **Comment**: Enter the description for graph space. The maximum length is 256 bytes. By default, there will be no comments on a space. But in this example, `Statistics of basketball players` is used.

  - **Optional Parameters**: Set the values of `partition_num` and `replica_factor` respectively. In this example, these parameters are set to `100` and `1` respectively. For more information, see [`CREATE SPACE` syntax](../../3.ngql-guide/9.space-statements/1.create-space.md "Click to go to the NebulaGraph website").

  In the **Equivalent to the following nGQL statement** panel, you can see the statement equivalent to the preceding settings.
   
  ```bash
  CREATE SPACE basketballplayer (partition_num = 100, replica_factor = 1, vid_type = FIXED_STRING(32)) COMMENT = "Statistics of basketball players"
  ```

3. Confirm the settings and then click the **+ Create** button. If the graph space is created successfully, you can see it on the graph space list.

![The Create page with settings for a graph space](https://docs-cdn.nebula-graph.com.cn/figures/st-ug-006-en.png)

## Delete a graph space

!!! danger

    Deleting the space will delete all the data in it, and the deleted data cannot be restored if it is not [backed up](../../backup-and-restore/3.manage-snapshot.md).

1. In the toolbar, click the **Schema** tab.

2. In the **Graph Space List**, find the space you want to be deleted, and click **Delete Graph Space** in the **Operation** column.

   ![Graph space list with the graph space to be deleted](https://docs-cdn.nebula-graph.com.cn/figures/st-ug-007-en.png)

3. On the dialog box, confirm the information and then click **OK**. 

## Next to do

After a graph space is created, you can create or edit a schema, including:

- [Operate tags](st-ug-crud-tag.md)
- [Operate edge types](st-ug-crud-edge-type.md)
- [Operate indexes](st-ug-crud-index.md)
