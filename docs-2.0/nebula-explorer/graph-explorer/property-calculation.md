# Property calculation

When there are a large number of vertices in the canvas, to enhance the readability and analyzability of the graph, edges with the same start vertex, end vertex and edge type can be aggregated. The aggregated edges can be computed and displayed based on their properties.

## Prerequisites

There were [aggregated edges](../canvas-operations/visualization-mode.md) on the canvas.

## Precautions

- Currently, only summation is supported.
- Only properties of type INT can be aggregated.
- Users can select multiple Edge types for aggregation separately.
- Users can select multiple properties for aggregation separately.
- An edge can display only one aggregation result. You can hover over the aggregated edge to see all the results.

## Steps

### Method 1

1. In the left navigation bar, click ![propertyCalculation](https://docs-cdn.nebula-graph.com.cn/figures/icon-nav-propertyCalculation.png) to open the **Property Calculation** panel.

2. Click **+** and set the edge type, properties and calculation. You can select multiple attributes to be aggregated separately.

3. Click **Confirm**。

Click **+** to add more edge types for property calculation.

<img src="https://docs-cdn.nebula-graph.com.cn/figures/eo_expl_calculation_230913_en.png" width="1200" alt="A screenshot that shows the property calculation of explorer">

### Method 2

1. Right-click the aggregated edge on the canvas and select **Property Calculation**.

2. Set the properties and calculation.

3. Click **Confirm**.
