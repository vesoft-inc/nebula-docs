# Console

Studio console interface is shown as follows.

![console](https://docs-cdn.nebula-graph.com.cn/figures/st-ug-015-en.png)

The following table lists various functions on the console interface.

| number  |  function | descriptions  |
| :-- | :--|   :--   |
|  1  |  toolbar  |  Click the **Console** tab to enter the console page.  |
|  2  |  select a space  | Select a space in the Current Graph Space list. <br/> **descriptions**: Studio does not support running the `USE <space_name>` statements directly in the input box.  |
|  3  | favorites | Click the ![save](https://docs-cdn.nebula-graph.com.cn/figures/studio-btn-save.png) button to expand the favorites, click one of the statements, and the input box will automatically enter the statement. |
|  4  |  history list   |  Click ![history](https://docs-cdn.nebula-graph.com.cn/figures/studio-btn-history.png) button representing the statement record. In the statement running record list, click one of the statements, and the statement will be automatically entered in the input box. The list provides the record of the last 15 statements.  |
|  5  |  clean input box  | Click ![clean](https://docs-cdn.nebula-graph.com.cn/figures/studio-btn-clear.png) button to clear the content entered in the input box.  |
|  6  |  run   |  After inputting the nGQL statement in the input box, click ![run](https://docs-cdn.nebula-graph.com.cn/figures/studio-btn-play.png) button to indicate the operation to start running the statement.  |
|  7  |  custom parameters display   | Click the ![Query](https://docs-cdn.nebula-graph.com.cn/figures/down.png) button to expand the custom parameters for parameterized query. For details, see [Manage parameters](../../nebula-console.md).|
|  8  |  input box   |  After inputting the nGQL statements, click the ![run](https://docs-cdn.nebula-graph.com.cn/figures/studio-btn-play.png) button to run the statement. You can input multiple statements and run them at the same time by using the separator `;`, and also use the symbol `//` to add comments. |
|  9  |  statement running status   |  After running the nGQL statement, the statement running status is displayed. If the statement runs successfully, the statement is displayed in green. If the statement fails, the statement is displayed in red.   |
|  10  | add to favorites | Click the ![save](https://docs-cdn.nebula-graph.com.cn/figures/studio-btn-save.png) button to save the statement as a favorite, the button for the favorite statement is colored in yellow exhibit.|
|  11  |  export CSV file or PNG file |  After running the nGQL statement to return the result, when the result is in **Table** window, click the ![download](https://docs-cdn.nebula-graph.com.cn/figures/studio-btn-download.png) button to export as a CSV file. Switch to the **Graph** window and click the ![download](https://docs-cdn.nebula-graph.com.cn/figures/studio-btn-download.png) button to save the results as a CSV file or PNG image export. |
|  12  |  expand/hide execution results  | Click the ![up](https://docs-cdn.nebula-graph.com.cn/figures/studio-btn-up.png) button to hide the result or click ![down](https://docs-cdn.nebula-graph.com.cn/figures/studio-btn-down.png) button to expand the result. |
|  13  |  close execution results | Click the ![close](https://docs-cdn.nebula-graph.com.cn/figures/studio-btn-close.png) button to close the result returned by this nGQL statement. |
|  14  |  **Table** window | Display the result from running nGQL statement. If the statement returns results, the window displays the results in a table. |
|  15  |  **Graph** window | Display the result from running nGQL statement. If the statement returns the complete vertex-edge result, the window displays the result as a graph . Click the ![expand](https://docs-cdn.nebula-graph.com.cn/figures/studio-btn-back.png) button on the right to view the overview panel. |
