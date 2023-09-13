# Information overview

On the **Overview Info** page, you can see the information of the NebulaGraph cluster, including Storage leader distribution, Storage service details, versions and hosts information of each NebulaGraph service, and partition distribution and details.

## Entry

1. At the top navigation bar of the Dashboard Enterprise Edition page, click **Cluster Management**.
2. On the right side of the target cluster, click **Detail**.
3. On the left-side navigation bar of the page, click **Information**->**Overview Info**.

!!! note

    Before viewing the cluster information, you need to select any online Graph service address, enter the account to log in to NebulaGraph (not the Dashboard login account), and the corresponding password.

<img src="https://docs-cdn.nebula-graph.com.cn/figures/eo_dash_info_230913_en.png" width="1200" alt="A screenshot that shows the overview information of dashboard">

## Storage Leader Distribution

In this section, the number of Leaders and the Leader distribution will be shown.

- Click the **Balance Leader** button in the upper right corner to distribute Leaders evenly and quickly in the NebulaGraph cluster. For details about the Leader, see [Storage Service](../../../1.introduction/3.nebula-graph-architecture/4.storage-service.md).

- Click **Detail** in the upper right corner to view the details of the Leader distribution.


## Version

In this section, the version and host information of each NebulaGraph service will be shown. Click **Detail** in the upper right corner to view the details of the version and host information.


## Service information

In this section, the information on Storage services will be shown. The parameter description is as follows:

<!-- balance-3.1
You can click the **Balance Date** button in the upper right corner to start the task to distribute all partitions in the cluster evenly.
-->

| Parameter | Description |
| :--- | :--- |
| `Host` | The IP address of the host. |
| `Port` | The port of the host. |
| `Status` | The host status. |
| `Git Info Sha` | The commit ID of the current version. |
| `Leader Count` | The number of Leaders. |
| `Partition Distribution` | The distribution of partitions. |
| `Leader Distribution` | The distribution of Leaders. |

Click **Detail** in the upper right corner to view the details of the Storage service information.

## Partition Distribution

Select the specified graph space in the upper left corner, and then you can perform the following operations:

- View the distribution of partitions in the specified graph space. You can see the IP addresses and ports of all Storage services in the cluster, and the number of partitions in each Storage service.
- Click **Balance Data** to evenly distribute the partitions in the specified graph space.
- Click **Balance Data Remove** to migrate the partitions in the specified Storage service and distribute them evenly to the other Storage services in the cluster. The system will guide you to select the host IP where the specified Storage service is located.

Click **Detail** in the upper right corner to view more details.


## Partition information


In this section, the information on partitions will be shown. Before viewing the partition information, you need to select a graph space in the upper left corner. The parameter description is as follows:

|Parameter|Description|
|:---|:---|
|`Partition ID`|The ID of the partition.|
|`Leader`|The IP address and port of the leader.|
|`Peers`|The IP addresses and ports of all the replicas.|
|`Losts`|The IP addresses and ports of faulty replicas.|

Click **Detail** in the upper right corner to view details. You can also enter the partition ID into the input box in the upper right corner of the details page to filter the shown data. 

<!-- ## Long-term task


On this page, the information of all jobs will be shown. Before viewing the job information, you need to select a graph space in the upper left corner. Online managing jobs is not supported. For more information, see [Job statements](../../3.ngql-guide/4.job-statements.md). The parameter description is as follows:

| Parameter | Description |
| :--- | :--- |
| `Job ID` | Shows the Job ID. |
| `Command` | Shows the command type. |
| `Status` | Shows the status of the job or task. For more information, see [Job statements](../../3.ngql-guide/4.job-statements.md#_2). |
|`Start Time`| Shows a timestamp indicating the time when the job or task starts RUNNING.|
| `Stop Time` | Shows a timestamp indicating the time when the job or task gets `FINISHED`, `FAILED`, or`STOPPED`. | -->

