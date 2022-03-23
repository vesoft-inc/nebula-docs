# Vertex Filter 

The Vertex Filter helps you filter the vertices displayed on the canvas by one or more sets of filtering conditions. The filtering conditions include Tag, Property, Operator, and Value.

!!! note

    Each set of filter conditions is only for the data with the target tag. If the conditions are met, the corresponding vertices will be automatically selected. If the conditions are not met, the color of the corresponding vertices will turn gray. The vertices with other tags are not affected. 

## Prerequisite

Make sure that there are vertices on the canvas. For more information, see [Start query](ex-ug-query-exploration.md).

## Example

The following steps are for filtering players older than 33 years old. 

1. In the left navigation bar, click **Vertex Filter** ![node-filter](https://docs-cdn.nebula-graph.com.cn/figures/nav-filter.png).
2. Click **Add New Filter** and then fill in the following values as shown below. 
3. (Optional) Repeat the second step to add multiple filtering conditions.
4. Turn on the **Apply Filter** button.

![vertex filtering](https://docs-cdn.nebula-graph.com.cn/figures/node-filtering.png)
