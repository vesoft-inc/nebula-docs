# Start querying

!!! note

    Select and click a target graph space before querying data. For more information, see [Choose graph spaces](13.choose-graphspace.md).

!!! compatibility "Legacy version compatibility"

    For versions of Nebula Graph below 3.0.0, you need to create an index before querying data. For more information, see [Create an index](../../3.ngql-guide/14.native-index-statements/1.create-native-index.md).

Click the **Start** ![query](https://docs-cdn.nebula-graph.com.cn/figures/nav-query2.png) icon to query target data on the Explorer page. The queried data will be displayed on the canvas. You have the following ways to query data:

- Query by VID
- Query by Tag
- Query Subgraph

## Query by VID

You can enter VIDs to query the target vertices and then start data exploration and analysis based on the vertices.

There are three ways to generate VIDs: Manual input, Random import, and File import.

!!! note

    - The VIDs entered or imported must exist in the graph space you have selected. 
    - Only one VID per row is supported in the querying area.

The following GIF shows how to query data using the `basketballplayer` graph space and related data.

![VID QUERY](https://docs-cdn.nebula-graph.com.cn/figures/vid-query-22-04-06_en.gif)

## Query by Tag

!!! note

    Make sure that the corresponding tags and indexes exist in the graph space when querying by tag. For more information, [Create tags](../3.ngql-guide/10.tag-statements/1.create-tag.md) and [Create indexes](../3.ngql-guide/14.native-index-statements/1.create-native-index.md).

You can limit the number of results and filter the results.

The following example queries 10 players whose age is greater than 30 years old and not equal to 40 years old.

![tag](https://docs-cdn.nebula-graph.com.cn/figures/query_tag.png)

## Query Subgraph

When querying subgraphs, you must enter one or more VIDs. You can specify the number of steps, edge types, and the direction of inflow and outflow of the subgraph. 

The following is an example of VIDs `Kings` and `Suns`, step number `2`, and incoming edge types with a VID value of 101, the number of steps of 4, and edge types of `server` and `like`.

!!! note

    When multiple VIDs are entered, the VIDs are separated by the Enter key.

![tag](https://docs-cdn.nebula-graph.com.cn/figures/query_subgraph.png)

