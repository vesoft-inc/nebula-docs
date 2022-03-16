# Explorer console

<!-- update after the studio docs are done -->

Explorer console allows you to enter nGQL statements and import the query results into Explorer's canvas.

!!! note

    Ensure that you have selected a target graph space before using the Explorer console.

## Enter nGQL statements

1. In the left-side navigation bar, click ![console_input](figs/nav-console.png).
2. In the input box of the console page, enter nGQL statements. For more information, see [nGQL cheatsheet](../2.quick-start/6.cheatsheet-for-ngql-command.md).
3. Click the execution icon ![run](figs/console_run.png).
4. (Optional) Click ![history](figs/console_history.png) to view commands executed before.
5. (Optional) Click ![clear](figs/console_delete.png) to clear the current statement in the input box.

## nGQL statement result display

In the lower area of the console page, the query results of the executed statements are displayed.

The results are displayed in the form of a table. You can click **Export CSV File** to store the data displayed in the table to your local drive.

The time taken to execute the statement in seconds (s) is displayed at the bottom of the table.

## Import nGQL statement results to canvas

The query results can be imported to the canvas. Click **View Subgraphs**:

- **Insert After Clear**: Clears the data on the canvas and imports the data of the query results into the canvas.
- **Incremental Insertion**: Adds the data of the query results to the canvas based on the original data on the canvas. The same data will be overwritten.


