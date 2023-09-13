# Schema drafting

Explorer supports the schema drafting function. Users can design their schemas on the canvas to visually display the relationships between vertices and edges, and apply the schema to a specified graph space after the design is completed.

## Features

- Design schema visually.
- Applies schema to a specified graph space.
- Export the schema as a PNG image.

## Entry

At the top navigation bar, click ![Template](https://docs-cdn.nebula-graph.com.cn/figures/sketch_cion_221018.png) .

## Design schema

The following steps take designing the schema of the `basketballplayer` dataset as an example to demonstrate how to use the schema drafting function.

1. At the upper left corner of the page, click **New**.
2. Create a tag by selecting the appropriate color tag under the canvas. You can hold down the left button and drag the tag into the canvas.
3. Click the tag. On the right side of the page, you need to fill in the name of the tag as `player`, and add two properties `name` and `age`.
4. Create a tag again. The name of the tag is `team`, and the property is `name`.
5. Connect from the anchor point of the tag `player` to the anchor point of the tag `team`. Click the generated edge, fill in the name of the edge type as `serve`, and add two properties `start_year` and `end_year`.
6. Connect from an anchor point of the tag `player` to another one of its own. Click the generated edge, fill in the name of the edge type as `follow`, and add a property `degree`.
7. After the design is complete, click ![setup](https://docs-cdn.nebula-graph.com.cn/figures/setup-220916.png) at the top of the page to change the name of the draft, and then click ![save](https://docs-cdn.nebula-graph.com.cn/figures/workflow-saveAs-220623.png) at the top right corner to save the draft.

<img src="https://docs-cdn.nebula-graph.com.cn/figures/eo_expl_draft_230913_en.png" width="1000" alt="A screenshot that shows the draft of explorer">

## Apply schema

1. Select the draft that you want to import from the **Draft list** on the left side of the page, and then click **Apply to Space** at the upper right corner.
2. Import the schema to a new or existing space, and click **Confirm**.

  !!! note

      - For more information about the parameters for creating a graph space, see [CREATE SPACE](../../3.ngql-guide/9.space-statements/1.create-space.md).
      - If the same schema exists in the graph space, the import operation fails, and the system prompts you to modify the name or change the graph space.

## Modify schema

Select the schema draft that you want to modify from the **Draft list** on the left side of the page. Click ![save](https://docs-cdn.nebula-graph.com.cn/figures/workflow-saveAs-220623.png) at the upper right corner after the modification.

!!! note

    The graph space to which the schema has been applied will not be modified synchronously.

## Delete schema

Select the schema draft that you want to delete from the **Draft list** on the left side of the page, click **X** at the upper right corner of the thumbnail, and confirm to delete it.

## Export Schema

Click ![data_output](https://docs-cdn.nebula-graph.com.cn/figures/explorer-btn-output.png) at the upper right corner to export the schema as a PNG image.
