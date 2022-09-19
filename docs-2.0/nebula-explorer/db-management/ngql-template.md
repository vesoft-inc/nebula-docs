# nGQL template

NebulaGraph Explorer supports saving the commonly nGQL statement as a template for yourself or others. The text in the nGQL statement supports parameterization, and parameter values can be filled in as needed.

## Prerequisites

The schema has been created in the NebulaGraph database.

## Entry

At the top navigation bar, click ![Template](https://docs-cdn.nebula-graph.com.cn/figures/icon-navbar-queryTemplate.png) .

## Create new template

1. Click **+ New Template**, and set the parameters as follows.

  ![new template](https://docs-cdn.nebula-graph.com.cn/figures/ex-template-220916-en.png)

  |Parameter|Example|Description|
  |:---|:---|:---|
  |Template name|`test`|The name of the template.|
  |Space|`basketballplayer`|The graph space to which the template applies.|
  |Description|`Returns the neighbor name of the specified player`| Describes the function of the template.|
  |Query template|`MATCH (v:player{name:"${name}"})--(v2:player) RETURN v2.player.name AS Name;`|nGQL template. You can select the text you want to parameterize, click **+ parameterize selected content** on the right, and set the parameter name and description. In the example, `${name}` is parameterized text. In actual use, you can fill in a name such as `Tim Duncan`.|
  |Input|-|Displays parameterized text content. You can edit or delete it.|

  !!! note

        Click **+ Save as template** on the upper left corner of the console page to use the entered query statement as a template statement automatically.

2. Click **Save as template**.

## Other Operations

- Click ![setup](https://docs-cdn.nebula-graph.com.cn/figures/setup-220916.png) on the right of the target template to modify the template context.
- Click ![console](https://docs-cdn.nebula-graph.com.cn/figures/nav-console2.png) on the right of the target template to automatically jump to the console and enter the template.
- Click ![delete](https://docs-cdn.nebula-graph.com.cn/figures/alert-delete.png) on the right of the target template to delete the template.
- The filter box in the upper right corner allows you to filter templates for a specified graph space.
- The search box in the upper right corner allows you to search the template name.

## Use template

In addition to clicking ![console](https://docs-cdn.nebula-graph.com.cn/figures/nav-console2.png) on the template list page to automatically jump to the console and enter the template, templates can also be used on the graph exploration page. For details, see [Start querying](../graph-explorer/ex-ug-query-exploration.md).