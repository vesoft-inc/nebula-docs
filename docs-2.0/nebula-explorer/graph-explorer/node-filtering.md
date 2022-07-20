# Vertex Filter 

The Vertex Filter helps you filter the vertices and edges displayed on the canvas. You can filter data by tag only or by one or more sets of filter conditions. 

## Prerequisite

Make sure that there are vertices on the canvas. For more information, see [Start query](ex-ug-query-exploration.md).

## Notes

- When filtering vertices and associated edges by **Tag**:

  - All the tags in the graph space are displayed on the **Filters** panel.

  - The selected tag turns gray, and the vertices and associated edges of the corresponding tag are hidden. 

  - For multi-tag vertices, if any of its tags is selected, the vertices are hidden.

  - You can enter a tag name in the search box to search for tags.

- When filtering vertices and associated edges by **filter conditions**.

  - Each set of filter conditions is only for the data with the target tag. The filtering conditions include Tag, Property, Operator, and Value. If the conditions are met, and the corresponding vertices will be automatically selected. If the conditions are not met, the corresponding vertices can be set to be **hidden** or **turning gray**. The vertices with other tags are not affected.

  - The filtering priority by **Tag** is the highest. If the filter conditions include a selected tag (in gray), the corresponding data will not be displayed on the canvas.

  - Each time you perform **Vertex Filter**, only one tag can be selected. If you want to filter data based on more tags, conduct **Add New Filter** multiple times.

  - The same tag cannot be filtered multiple times. Only the result of the first filtering is displayed.

## Example

### Example 1 Filter vertices on the canvas with the tag **player**

1. In the left navigation bar, click **Vertex Filter** ![node-filter](https://docs-cdn.nebula-graph.com.cn/figures/nav-filter.png).

2. On the **Filters** panel, click **player**.

3. Only vertices with the tag team are displayed on the canvas.

    ![node-filter](https://docs-cdn.nebula-graph.com.cn/figures/vertex-filtering-example1_en.png)

    The orange vertices filtered out in the above figure are the vertices with the tag team.

### Example 2 Filter players older than 33 years old

1. In the left navigation bar, click **Vertex Filter** ![node-filter](https://docs-cdn.nebula-graph.com.cn/figures/nav-filter.png).

2. Click **Add New Filter**, and set filter conditions (The values in the example are `player`, `age`, `>`, and `33`).

3. Click **Grayscale** to gray the vertices that do not meet the filter conditions.

4. Turn on the **Apply Filter** button.

    ![vertex filtering](https://docs-cdn.nebula-graph.com.cn/figures/vertex-filtering-example2_en.png)
