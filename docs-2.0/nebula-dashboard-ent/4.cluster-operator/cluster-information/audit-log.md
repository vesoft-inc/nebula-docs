# Audit log

The NebulaGraph audit logs store and categorize all operations performed on the Graph service. Dashboard Enterprise Edition allows you to quickly view audit logs.

!!! enterpriseonly

    Only when the cluster you created or imported is the Enterprise Edition, this feature is available.

## Entry

1. At the top navigation bar of the Dashboard Enterprise Edition page, click **Cluster Management**.
2. On the right side of the target cluster, click **Detail**.
3. On the left-side navigation bar of the page, click **Information**->**Audit Log**.

!!! note

    - To use the audit log for the first time, you need to jump to the **Config Management** page as prompts to enable the audit log and restart the graph service.
    - For the description of audit log parameters, see [Configure audit logs](../../..//5.configurations-and-logs/2.log-management/audit-log.md).

## View audit log

In the upper corner of the page, you can filter services or search for the log name. Click **View Log** in the **Operation** column.

- Support copying all logs in the window with one click.
- Support copying the log file path.
- Support **Tail Mode** and **Range Mode** to view logs. You need to click **Refresh** after setting.
- Support searching logs by keywords (at least 3 characters).
