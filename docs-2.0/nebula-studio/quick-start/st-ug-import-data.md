# Import data

After CSV files of data and a schema are created, you can use the **Import** page to batch import vertex and edge data into NebulaGraph for graph exploration and data analysis.

## Prerequisites

To batch import data, do a check of these:

- Studio is connected to NebulaGraph.

- A schema is created.

- CSV files meet the demands of the Schema.

- Your account has privilege of GOD, ADMIN, DBA, or USER.

## Procedure

Before importing data, you need to upload the file first and then create the import task.
## Upload files

To upload files, follow these steps:

1. In the toolbar, click the **Import** tab.

2. On the **Upload Files** page, click the **Upload Files** button and then choose CSV files. In this example, `edge_serve.csv`, `edge_follow.csv`, `vertex_player.csv`, and `vertex_team.csv` are chosen.

  !!! note

        You can choose multiple CSV files at the same time. The CSV file used in this article can be downloaded in the [Design a schema](../../nebula-studio/quick-start/st-ug-create-schema.md).

1. After uploading, you can click the ![detail](https://docs-cdn.nebula-graph.com.cn/figures/detail.png) button in the **Operations** column to preview the file content, or click the ![delete](https://docs-cdn.nebula-graph.com.cn/figures/alert-delete.png) button to delete the uploaded file.
   
  ![preview](https://docs-cdn.nebula-graph.com.cn/figures/st-ug-010-en.png)

## Import Data

To batch import data, follow these steps:

1. In the toolbar, click the **Import** tab.

2. In **Import** tab, click the **Import Data**.

3. On the **Import Data** page, click **+ New Import** button to complete these operations:

  !!! caution

        users can click **Import Template** to download the example configuration file `example.yaml`, and upload the configuration file after configuration. The configuration mode is similar to that of [NebulaGraph Importer](../../nebula-importer/use-importer.md), but all file paths for configuration files in the template retain the filename only. And make sure all CSV data files are uploaded before importing the YAML file.

  - Select a graph space.
  - Fill in the task name.
  - (Optional) Fill in the batch size.
  - In the **Map Vertices** section, click the **+ Bind Datasource** button, select bind source file in the dialog box, and click the **Confirm** button, the `vertex_player.csv` file is chosen.
    - In the **vertices 1** drop-down list, click **Select CSV Index**, and select the column where vertexID is located in the pop-up dialog box.
    - Click the **+ Add Tag** button and click the ![down](https://docs-cdn.nebula-graph.com.cn/figures/down.png) icon on the right. In the displayed property list, bind the source data for the tag property. In this example, **player** is used for the `vertex_player.csv` file. For the **player** tag, choose **Column 1** for the age property, and choose **Column 2** for the name property.
  - In the **Map Edges** section, click the **+ Bind Datasource** button, select bind source file in the dialog box, and click the **Confirm** button, the `edge_follow.csv` file is chosen.
    - In the **vertices 1** drop-down list, click **Select Edge Type**. In this example, follow is chosen.
    - Based on the edge type property, select the corresponding data column from the `edge_follow.csv` file. **srcId** and **dstId** are the VIDs of the source vertex and destination vertex of an edge. In this example, **srcId** must be set to the VIDs of the player and **dstId** must be set to the VIDs of another player. **Rank** is optional.
    
    ![import](https://docs-cdn.nebula-graph.com.cn/figures/st-ug-011-en.png)

4. After completing the settings, click the **Import** button.
  
5. You need to enter the password of your NebulaGraph account before importing data.
  ![enter password](https://docs-cdn.nebula-graph.com.cn/figures/st-ug-014-en.png)

6. After importing data, you can view logs, download logs, download configuration files, and delete tasks on the **Import Data** tab.
  ![import completed](https://docs-cdn.nebula-graph.com.cn/figures/st-ug-012-en.png)


