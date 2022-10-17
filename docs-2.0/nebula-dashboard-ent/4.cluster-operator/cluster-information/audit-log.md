# Audit log

The audit log feature in NebulaGraph Enterprise Edition can classify and store all the operations received by the graph service. The Dashboard Enterprise Edition supports viewing audit logs quickly for users to see.

## Entry

1. In the top navigation bar of the Dashboard Enterprise Edition page, click **Cluster Management**.
2. On the right side of the target cluster, click **Detail**.
3. In the left navigation bar, click **Information**->**Audit Log**.

!!! note

    The audit log can be viewed only after the feature is enabled in the configuration. If the audit log is not enabled, you can modify the related parameters by clicking **Update Configuration** as prompted. For more information about parameters, see [NebulaGraph audit logs](../../../5.configurations-and-logs/2.log-management/audit-log.md).

## View audit log

The method for viewing audit logs according to the storage scheme:

- The storage location is the local file (`audit_log_handler = file`)

  The audit log files on all graph services are displayed by default. You can filter hosts or search for the file names above.
  
  Click `View Log` in the `Operation` column on the right of the file name. By default, the latest 300 rows of the file, the file path and the last modification time of the file are displayed.
  
  - A maximum of 1000 rows of audit logs can be displayed.
  - Click **Refresh** at the upper right corner to view the latest audit logs.
  - Supports copying the log in the window, or copying the file path.

- The storage location is the Elasticsearch (`audit_log_handler = es`)

  Set the Kibana platform address that provides Elasticsearch, and click **Access Kibana**. Users can view the audit logs stored on Elasticsearch in the Kibana platform.