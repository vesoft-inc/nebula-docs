# Canvas snapshots

Explorer provides a snapshot feature that lets you store the visualized canvas data so that the data can be restored when your browser is opened again.

## Create snapshots

1. In the upper right corner of a canvas page, click the camera icon ![snapshot](https://docs-cdn.nebula-graph.com.cn/figures/graph-snapshot.png).
2. Fill in the snapshot name and notes (optional).
3. Click **submit**.

!!! note

    Created snapshots are stored on the snapshot list page. For more information, see below.

## Historical snapshots

!!! note

    Up to 50 snapshots can be stored in the snapshot list currently.

In the left navigation bar of the Explorer page, click ![snapshot_history](https://docs-cdn.nebula-graph.com.cn/figures/snapshot-history.png) to enter the Snapshot page. You can switch graph spaces and view the historical snapshots of the corresponding graph space. You can also import snapshots to a canvas, download canvas snapshots to your local drive, and delete snapshots.

Under the **Operation** column to the right of the target snapshot, you are enabled to: 

- Click ![snapshot_import](https://docs-cdn.nebula-graph.com.cn/figures/snapshot-import.png) to import a historical snapshot to a new canvas.
- Click ![snapshot_export](https://docs-cdn.nebula-graph.com.cn/figures/snapshot-export.png) to download a snapshot in JSON format locally.
- Click ![snapshot_delete](https://docs-cdn.nebula-graph.com.cn/figures/snapshot-delete.png) to delete a snapshot.

At the top left of the **Snapshot** page, click **Import Snapshot** to import previously downloaded files in JSON format to the **Snapshot** page for sharing the snapshot data offline. The system automatically places the imported snapshots in the corresponding graph space based on the graph space information recorded in the JSON file.
