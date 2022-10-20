# Member management

**Member Management** page shows only the cluster creator account (`owner` role) by default. The account with the `owner` role can add and delete the cluster administrator (`operator` role).

## Entry

1. At the top navigation bar of the Dashboard Enterprise Edition page, click **Cluster Management**.
2. On the right side of the target cluster, click **Detail**.
3. On the left-side navigation bar of the page, click **Operation**->**Member Management**.

## Steps

- Add the cluster administrator: Click the search box at the top left. Select the target account that you want to add to be the administrator of the cluster in the drop-down list, and then click **Add**.

  !!! note

        The accounts of cluster members must be included in Dashboard accounts. For information about how to create an account, see [Authority management](../../5.account-management.md).

- Delete the cluster administrator: Click ![delete](https://docs-cdn.nebula-graph.com.cn/figures/alert_delete.png) in the operation column on the right of the cluster administrator account, and then click **Confirm**.

- Transfer the `owner` role: Click **Transfer** in the operation column on the right of the `owner` role. Select the target account that you want to be transferred, and then click **Confirm**.