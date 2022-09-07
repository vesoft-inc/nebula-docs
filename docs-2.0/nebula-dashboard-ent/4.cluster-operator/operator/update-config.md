# Update config

On **Update Config** page, you can modify the configuration files of Storage and Graph services.

## Entry

1. At the top navigation bar of the Dashboard Enterprise Edition page, click **Cluster Management**.
2. On the right side of the target cluster, click **Detail**.
3. On the left-side navigation bar of the page, click **Operation**->**Update Config**.

## Steps

Click **Edit** to modify the configuration and click **Confirm**, then click **Save** or **Save and Restart** in the upper right corner.

- **Save**: The configuration will take effect after the next service restart.
- **Save and Restart**: Restart the service directly to make the configuration take effect immediately.

  !!! danger

        If you click **Save and Restart**, the running task will be stopped and the cluster will be restarted instantly, which may cause data inconsistency. It is recommended to perform this operation during the low peak period of the business.

  !!! note

      - Updating configuration files is a batch operation, and each Storage/Graph configuration file will be modified.
      - For more information about parameter, see [Storage service configuration](../../5.configurations-and-logs/1.configurations/4.storage-config.md) and [Graph service configuration](../../5.configurations-and-logs/1.configurations/3.graph-config.md). 
