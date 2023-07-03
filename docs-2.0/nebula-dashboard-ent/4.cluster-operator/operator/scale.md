# Scale

On the **Scale** page, you can **add node** and **import node in batches** quickly, and add **Graph services** and **Storage services** to the existing nodes.

!!! enterpriseonly 

    Only when the cluster you created or imported is the Enterprise Edition, this feature is available.

## Entry

1. At the top navigation bar of the Dashboard Enterprise Edition page, click **Cluster Management**.
2. On the right side of the target cluster, click **Detail**.
3. On the left-side navigation bar of the page, click **Operation**->**Scale**.

## Steps

### Add node

See [Node](node.md).

!!! note

    After a node is added, data is not automatically imbalanced. You need to select the target graph space on the [Overview Info](../cluster-information/overview-info.md) page and then perform the `Balance Data` and `Balance Leader` operations.

### Batch import of node

Download and fill in the CSV template file, then upload the file and select the installation package. Click **OK** to import nodes in batches.

### Modify services

1. Select the nodes in the node list. Click the service to be added in the upper right corner of the list, or click **X** on the label of the service to be deleted in the **Service type** column in the list.
2. Confirm the modified service in the **Service** display area below. You can modify the port, HTTP port, and HTTP2 port of the newly added service.

  !!! note

        Green indicates services that will be added soon, and red indicates services that will be removed.

3. Click **OK** at the bottom of the page.

!!! caution

    - Currently, you can dynamically scale Storaged and Graphd services through Dashboard. The Metad service cannot be scaled. When scaling a cluster, it is recommended to back up data in advance so that data can be rolled back when scaling fails. For more information, see [FAQ](../../../20.appendix/0.FAQ.md).

    - Make sure that services of the same type are not deployed on the same node, and that at least one of each type of service is deployed in the cluster.

    - Before removing the storage service, you must migrate the data stored on the node. You need to perform the `Balance Data Remove` operation on the [Overview Info](../cluster-information/overview-info.md) page.

In this example, storage services with nodes `192.168.8.143` and `192.168.8.167` are added, and Graph services with node `192.168.8.169` are deleted. If the box is dotted and the service name is greyed, it means the service is removed. If the box is solid, it means the service is newly added.

![scaling](https://docs-cdn.nebula-graph.com.cn/figures/scaling-ds-2022_4-14_en.png)

### Reset

Click the **Reset** button to cancel all uncommitted operations and restore them to the initial state.