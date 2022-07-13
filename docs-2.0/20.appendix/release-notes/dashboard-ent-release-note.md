# Nebula Dashboard Enterprise Edition release notes

## Enterprise Edition 3.1.0

- Feature
  - Support [Upgrading the Nebula Graph version in a specified cluster](../../nebula-dashboard-ent/4.cluster-operator/4.manage.md).
  - Support [full backup and full restore](../../nebula-dashboard-ent/4.cluster-operator/8.backup-and-restore.md) functions.
  - Support [managing the installation packages](../../nebula-dashboard-ent/11.manage-package.md).
  - Support using [SQLite database](../../nebula-dashboard-ent/2.deploy-connect-dashboard-ent.md) when deploying the Nebula Dashboard.

- Enhancement
  - Adapted for Nebula Graph 3.2.0.
  - Monitoring
    - Support configuring the monitoring time range globally.
    - Support configuring the monitoring refresh frequency globally.
    - Support monitoring all the disk usages in the cluster.
    - Support displaying all the monitoring metrics of a specified dimension.
  - Alert
    - Support [muting the alert messages](../../nebula-dashboard-ent/9.alerts.md).
  - Configuration
    - Support modifying the service port in the file `config.yaml`.
    - Support searching the configuration name on the `Update Config` page.
  - Enhanced the system error message.

- Bugfix
  - Fixed the bug that the load and traffic information was lost in the diagnostic report.
  - Fixed the selection problem on the monitoring page.
  - Fixed the bug that the system could not identify the `Alias` column in the CSV file containing Chinese characters when importing nodes in batches.