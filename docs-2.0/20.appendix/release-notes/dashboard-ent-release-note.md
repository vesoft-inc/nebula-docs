# NebulaGraph Dashboard Enterprise Edition release notes

## Enterprise Edition v3.2.2

- Enhancement

  - Delete unnecessary public folders.

- Bugfix

  - Fixed the bug that the RPM and DEB packages could not automatically register services with the Dashboard.

## Enterprise Edition v3.2.1

- Enhancement

  - Add NebulaGraph 3.3.0 version to download list.

- Bugfix

  - Fixed the bug that the BR failed in NebulaGraph Community 3.3.0 version.

## Enterprise Edition 3.2.0

- Feature

  - Cluster security:
    - (Beta) Supported the single sign-on [OAuth2.0 authentication](../..//nebula-dashboard-ent/5.account-management.md) feature.

- Enhancement

  - Monitoring:
    - Added single-process metrics for each NebulaGraph service.
    - Optimized the disk monitoring.
    - Added some monitoring metrics for the Storage service.
  - Alert:
    - Supported configuring [composite conditions](../..//nebula-dashboard-ent/4.cluster-operator/9.notification.md). When both conditions are met, the alarm is triggered.
    - Optimized the disk alert.
  - Security:
    - Support [SSH key](../../nebula-dashboard-ent/4.cluster-operator/operator/node.md).
  - Usability:
    - Adjusted the package structure. Make sure that the NebulaGraph clusters installed through the Dashboard are consistent with the package structure of the clusters deployed separately.
    - Displayed the operating system information of each node.
    - Supported modifying the port of the prometheus and alertmanager services.
    - Supported searching for monitoring metrics and viewing metric details.
    - Supported partitioning service run logs and setting log retention days.

- Bugfix

  - Fixed the bug that the service page did not jump to the monitoring page when clicking the **View** button.
  - Fixed the bug that the baseline could not be set on the service monitoring page.
  - Fixed the authorization failure when importing the cluster.
