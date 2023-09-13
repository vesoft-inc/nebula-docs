# Config Management

On **Config Management** page, you can view and update the service configuration files.

## Precautions

You need to restart the corresponding service in the **Service** page after the configuration modification. For details, see [Service](service.md).

## Entry

1. At the top navigation bar of the Dashboard Enterprise Edition page, click **Cluster Management**.
2. On the right side of the target cluster, click **Detail**.
3. On the left-side navigation bar of the page, click **Operation**->**Config Management**.

## Modify configuration

1. Select the type of service whose configuration you want to modify.
2. Locate the configuration to be modified and click **Edit** in the **Operation** column.
3. In the pop-up dialog box, you can modify the **Value** individually. They can also be modified uniformly at the top, and you need to click **Apply To All Services** after modification.

  <img src="https://docs-cdn.nebula-graph.com.cn/figures/eo_dash_config_230913_en.png" width="1000" alt="A screenshot that shows the configuration of dashboard">

4. Click **Confirm** after the modification is complete.

## Add configuration

If you need to adjust a parameter that is not included in the configuration file, you need to add the configuration first.

1. Click **Add Config** at the top left.
2. Fill in the parameter name in **Config Key**, then fill in the **Config Value**, and apply the config value to all services. You can also adjust the value for individual services below.
3. Click **Confirm**.

## Delete configuration

!!! note

    After deleting the configuration and restarting the service, the corresponding configuration will be restored to its default value.

1. Select the type of service whose configuration you want to delete.
2. Locate the configuration to be deleted and click **Delete** in the **Operation** column, and then Click **OK**.