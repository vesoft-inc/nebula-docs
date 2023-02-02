# NebulaGraph Dashboard Enterprise Edition release notes

## Enterprise Edition 3.4.0

- Feature
  - Support viewing the [runtime log](../../nebula-dashboard-ent/4.cluster-operator/cluster-information/runtime-log.md) of the NebulaGraph clusters.
  - Support viewing the [audit log](../../nebula-dashboard-ent/4.cluster-operator/cluster-information/audit-log.md) of the NebulaGraph clusters.
  - Support [jog management](../../nebula-dashboard-ent/4.cluster-operator/cluster-information/job-management.md).
  - Support [incremental backup](../../nebula-dashboard-ent/4.cluster-operator/operator/backup-and-restore.md) for Backup & Restore (BR) tool.
  - Support the built-in [dashboard.service](../../nebula-dashboard-ent/2.deploy-connect-dashboard-ent.md) script to manage the Dashboard services with one-click and view the Dashboard version.
  - Add product feedback page.

- Enhancement

  - Automatically detects whether the installation package is compatible with the operating system when creating a cluster.
  - Support specifying the NebulaGraph installation directory when importing nodes in batches.
  - Support deleting the installation directory when deleting a cluster.
  - Dependent services are displayed in the importing cluster and service monitoring.
  - Support canceling the mute of alert rules midway.
  - Support killing the Graph service processes forcibly.
  - Support viewing and modifying configuration information of multiple services.
  - Support modifying the configuration of the Meta service.
  - Support logging **update configuration** and **delete backup** operations on **operation record** page.
  - Support auto-registration after LDAP is enabled.
  - Log information of the task center is more detailed.
  - Browser compatibility tips.
  - NebulaGraph license expiration reminder.
  - Support for Red Flag OS Asianux Linux 7 (Core).
  - Optimize multiple interactions such as connecting to the database, creating a cluster, scaling and batch importing nodes.
  - Optimize the interface error message.
  - Display the names of the monitoring metrics on the overview page of `node`.
  - Optimize the calculation of monitoring metrics such as `num_queries`, and adjust the display to time series aggregation.

- Bugfix

  - Fix the bug that the selection of monitoring time range does not take effect in the overview page of service monitoring.
  - Fix the bug that the corresponding NebulaGraph file is not deleted when deleting empty nodes during scale-in reduction.
  - Fix the bug that the global language is switched at the same time when switching the language of the diagnosis report.
  - Fix the bug that an import cluster task blocks and causes other import tasks to be in waiting state.
