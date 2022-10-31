# Node

On this page, the information of all nodes will be shown, including the cluster name, Host(SSH_User), CPU (Core), etc. Users can add nodes, view node monitoring, and manage services on the node.

## Entry

1. At the top navigation bar of the Dashboard Enterprise Edition page, click **Cluster Management**.
2. On the right side of the target cluster, click **Detail**.
3. On the left-side navigation bar of the page, click **Operation**->**Node**.

## Add node

Click **Add Node** and enter the following information, the Host, SSH port, SSH user, authentication type, NebulaGraph package, etc., and click **OK**.

The authentication type is described as follows:

- SSH Password: Enter the password of the SSH user.

- SSH Key: Click **Upload** and select the private key file of the node. You need to generate the secret key files on the node to be added and send the private key file to the current computer (not the machine where Dashboard is deployed). If the passphrase is set, this parameter is also required.

!!! note

    After a node is added, data is not automatically imbalanced. You need to select the target graph space on the [Overview Info](../cluster-information/overview-info.md) page and then perform the `Balance Data` and `Balance Leader` operations.

## Other node operations

Click the ![plus](https://docs-cdn.nebula-graph.com.cn/figures/Plus.png) button to view the process name, service type, status, and runtime directory of the corresponding node.

- Click **Node Monitoring** to jump to the detailed node monitoring page. For more information, see [Cluster monitoring](../2.monitor.md).

- Click **Service Management** to jump to the service management page.

- Click **Edit Node** to modify the node settings.
  
- If a node has no service, you can **Delete Node**. For details about how to delete a service, see section **Scale** below.