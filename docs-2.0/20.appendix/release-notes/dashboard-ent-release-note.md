# NebulaGraph Dashboard Enterprise Edition release notes

## Enterprise Edition 3.5.0

- Feature

  - Support deploying License Manager (LM) through Dashboard. For more detail, see [Activate Dashboard](../../nebula-dashboard-ent/3.connect-dashboard.md).
  - [Back up and restore](../../nebula-dashboard-ent/4.cluster-operator/operator/backup-and-restore.md) support full backup to local.
  - Add [Slow query analyst](../../nebula-dashboard-ent/4.cluster-operator/analysis-diagnosis/slow-query-analyst.md) function.
  - The [Cluster diagnostics](../../nebula-dashboard-ent/4.cluster-operator/analysis-diagnosis/cluster-diagnosis.md) formula supports configuration.
  - [Config Management](../../nebula-dashboard-ent/4.cluster-operator/operator/update-config.md) support **Add Config**, view the **Effective value** of the current configuration, and **View inconsistent configurations**.
  - In the [Notification endpoint](../../nebula-dashboard-ent/system-settings/notification-endpoint.md), the webhook supports configuring the **Webhook request body**.
  - Support [custom monitoring panel](../../nebula-dashboard-ent/4.cluster-operator/2.monitor.md).


- Enhancement

  - Cluster topology consistency: After scale, no user manual refresh and authorization are required.
  - [Cluster Overview](../../nebula-dashboard-ent/4.cluster-operator/1.overview.md) page optimization.
  - [Data Synchronization](../../nebula-dashboard-ent/4.cluster-operator/7.data-synchronization.md) optimization.
  - By default, the configuration of newly added nodes is consistent with that of the first node in the cluster.
  - Optimize cluster diagnostic report content.
  - Support changing the port number of `Prometheus` service in the `config.yaml` file.


## Enterprise Edition 3.4.2

- Enhancement

  - Support viewing the data backup and restoration progress on the **Backup&Restore** page.
  - The installation package for NebulaGraph Enterprise v3.4.1 is built in.

## Enterprise Edition 3.4.1

- Bugfix

  - Fix the bug that the RPM package cannot execute `nebula-agent` due to permission issues.
  - Fix the bug that the cluster import information can not be viewed due to the `goconfig` folder permission.
  - Fix the page error when the license expiration time is less than `30` days and `gracePeriod` is greater than `0`.

## Enterprise Edition 3.4.0

- Feature
  - Support viewing the [runtime log](../../nebula-dashboard-ent/4.cluster-operator/cluster-information/runtime-log.md) of the NebulaGraph clusters.
  - Support viewing the [audit log](../../nebula-dashboard-ent/4.cluster-operator/cluster-information/audit-log.md) of the NebulaGraph clusters.
  - Support [jog management](../../nebula-dashboard-ent/4.cluster-operator/cluster-information/job-management.md).
  - Support [incremental backup](../../nebula-dashboard-ent/4.cluster-operator/operator/backup-and-restore.md) for Backup & Restore (BR) tool.
  - Support the built-in [dashboard.service](../../nebula-dashboard-ent/2.deploy-connect-dashboard-ent.md) script to manage the Dashboard services with one-click and view the Dashboard version.
  - Add a product feedback page.

- Enhancement

  - Automatically detects whether the installation package is compatible with the operating system when creating a cluster.
  - Support specifying the NebulaGraph installation directory when importing nodes in batches.
  - Support deleting the installation directory when deleting a cluster.
  - Dependent services are displayed in the importing cluster and service monitoring.
  - Support canceling the alert rule silence midway.
  - Support killing the Graph service processes forcibly.
  - Support viewing and modifying configuration information of multiple services.
  - Support modifying the configuration of the Meta service.
  - Support logging **update configuration** and **delete backup** operations on **operation record** page.
  - Support auto-registration after LDAP is enabled.
  - Detail Log information of the task center.
  - Display browser compatibility hint.
  - NebulaGraph license expiration reminder.
  - Support for Red Flag OS Asianux Linux 7 (Core).
  - Optimize multiple interactions such as connecting to the database, creating a cluster, scaling and batch node importing.
  - Optimize the interface error message.
  - Display the names of the monitoring metrics on the overview page of `node`.
  - Optimize the calculation of monitoring metrics such as `num_queries`, and adjust the display to time series aggregation.

- Bugfix

  - Fix the bug that the selection of monitoring time range does not take effect in the overview page of service monitoring.
  - Fix the bug that the corresponding NebulaGraph file is not deleted when deleting empty nodes during scale-in reduction.
  - Fix the bug that the global language is switched at the same time when switching the language of the diagnosis report.
  - Fix the bug that an import cluster task blocks and causes other import tasks to be in waiting state.
