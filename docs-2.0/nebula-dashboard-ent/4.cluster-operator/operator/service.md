# Service

On **Service** page, you can view the host, path, and status of the services, and start, stop, kill, or restart the services. In addition, you can easily and quickly view the contents of the log file.

## Entry

1. At the top navigation bar of the Dashboard Enterprise Edition page, click **Cluster Management**.
2. On the right side of the target cluster, click **Detail**.
3. On the left-side navigation bar of the page, click **Operation**->**Service**.

## Steps

!!! danger

    If you click **Stop**/**Restart**, the running task will be stopped instantly, which may cause data inconsistency. It is recommended to perform this operation during the low peak period of the business.

- Locate the target service and perform the related operation in the **Operation** column.

- Select multiple services and perform batch operations at the upper corner of the page.

- Click the ![nav](https://docs-cdn.nebula-graph.com.cn/figures/nav-dashboard.png) icon to quickly view the [service monitoring information](../2.monitor.md).

- When synchronizing data, you can view and manage related services on the **Dependency** page. For details about data synchronization, see [Synchronize between two clusters](../../../synchronization-and-migration/replication-between-clusters.md).