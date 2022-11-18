# Start querying

To explore graph data, users need to query some initial data, and based on these initial data, can further analysis and filtering. This topic describes how to query initial data.

## Prerequisites

Select a target graph space before querying data. For more information, see [Choose graph spaces](13.choose-graphspace.md).

!!! compatibility "Legacy version compatibility"

    For versions of NebulaGraph below 3.0.0, you need to create an index before querying data. For more information, see [Create an index](../../3.ngql-guide/14.native-index-statements/1.create-native-index.md).

## Steps

Click the **Start** ![query](https://docs-cdn.nebula-graph.com.cn/figures/nav-query2.png) icon to query target data on the `Explorer` page. The queried data will be displayed on the canvas. You have the following ways to query data:

- Query by VID
- Query by Tag
- Query Subgraph
- Query by template

### Query by VID

You can enter VIDs to query the target vertices.

There are three ways to generate VIDs: Manual input, Random import, and File import.

!!! note

    Only one VID per row is supported in the querying area. Press `Enter` to separate the VIDs.

The following GIF shows how to query data using the `basketballplayer` graph space and related data.

![VID QUERY](https://docs-cdn.nebula-graph.com.cn/figures/vid-query-22-04-06_en.gif)

### Query by Tag

You can select the tag and corresponding index to query the target vertices, and set the number of results limit or filter conditions.

!!! note

    Make sure that the corresponding tags and indexes exist in the graph space when querying by tag. For more information, [Create tags](../../3.ngql-guide/10.tag-statements/1.create-tag.md) and [Create indexes](../../3.ngql-guide/14.native-index-statements/1.create-native-index.md).

The following example queries 10 players whose age is greater than 30 years old and not equal to 40 years old.

![tag](https://docs-cdn.nebula-graph.com.cn/figures/query_tag.png)

### Query Subgraph

When querying subgraphs, you can specify the number of steps, edge types, and the direction of inflow and outflow of the subgraph. VID is mandatory. The default value of optional steps is 1, and the default value of optional edge type is all.

!!! note

    When multiple VIDs are entered, the VIDs are separated by the Enter key.

The following is an example of VIDs `Kings` and `Suns`, step number `2`, and incoming edge types with a VID value of 101, the number of steps of 4, and edge types of `server` and `like`.

![tag](https://docs-cdn.nebula-graph.com.cn/figures/query_subgraph.png)

### Query by template

You can select the created nGQL template, and set the parameter value.

![query_template](https://docs-cdn.nebula-graph.com.cn/figures/query_template_221118_en.png)

- When the returned result is vertices, they will be displayed on the canvas.
- When the returned result is not vertices, they will be displayed in table format. For example, return player name, age, etc.

For more information, see [nGQL template](../db-management/ngql-template.md).