# NebulaGraph Dashboard Enterprise Edition release notes

## Enterprise Edition 3.2.0

- Feature

  - Cluster security:
    - Support [OAuth2.0 authentication](../..//nebula-dashboard-ent/5.account-management.md) in the single sign-on feature.

- Enhancement

  - Monitoring:
    - Added single process metrics of the service.
    - Optimized the disk monitoring.
    - Added some storage monitoring metrics.
  - Alert:
    - Support configuring [composite conditions](../..//nebula-dashboard-ent/4.cluster-operator/9.notification.md). When both conditions are met, the alarm is triggered.
    - Optimized the disk alert.
  - Security:
    - Support [SSH key](../../nebula-dashboard-ent/4.cluster-operator/operator/node.md).
  - Usability:
    - Adjusted the package structure. Make sure that the NebulaGraph clusters installed through the Dashboard are consistent with the package structure of the clusters deployed separately.
    - Display the operating system information of each node.
    - Support modifying the port of prometheus and alertmanager.
    - Support searching for monitoring metrics and viewing metric details.
    - Supports partitioning service run logs and setting log retention days.

- Bugfix

  - Fixed the bug that the service page does not jump to the monitoring page when clicking the **View** button.
  - Fixed the bug that the baseline cannot be set on the service monitoring page.
  - Fixed the bug that the authorization failure when importing the cluster.
  - Fixed the bug that the cluster diagnostic reporting language is not automatically switching according to the platform's global language.
