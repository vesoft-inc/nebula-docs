# NebulaGraph Operator release notes

## v1.8.0 (2024.02)

- Features:

  - [Cluster Rolling Restart](../../k8s-operator/4.cluster-administration/4.9.advanced/4.9.2.restart-cluster.md): Supported graceful rolling restart of all Pods in a certain type of service within the cluster or restart of a single Storage service Pod.
  - [Local PV Failover](../../k8s-operator/4.cluster-administration/4.4.storage-management/4.4.1.use-local-pv.md): Combined the cloud's elastic scaling capabilities for computing resources to implement automatic failover. In case of a node failure, it automatically unbinds the Pod from the Local PV, allowing the Pod to migrate to other healthy nodes and continue running.
  - [Backup and Restore](../../k8s-operator/4.cluster-administration/4.6.backup-and-restore/4.6.0.overview.md):
  
    - Supported scheduled backups.
    - Supported backing up data to GCS.
    - Supported backup and restore of clusters with zones enabled.
    - Supported configuring policies for cleaning up expired backups.
    - Supported cross-namespace data backup.
  
  - Supported [specifying the cluster through tags](../../k8s-operator/3.operator-management/3.5.cluster-scope-config.md) to manage the scope of clusters by the operator.

- Optimizations & Enhancements:
  
  - Optimized the retry mechanism of data balance type jobs to prevent the controller from getting stuck in the main process after a job failure.
  - Optimized uneven distribution of Pod scheduling across zones.
  - Added [deletion protection mechanism](../../k8s-operator/4.cluster-administration/4.7.security/4.7.3.config-deletion-protection.md) for cluster deletion operations.
  - The mTLS feature can be disabled at any time after it is enabled.
  <!-- - Supported automatic upgrade of the NebulaGraph Operator CRD. add this release note and relevant steps in operator 1.9.0-->
  - Optimized [Cluster Helm Chart](../../k8s-operator/4.cluster-administration/4.1.installation/4.1.1.cluster-install.md):
  
    - Supported securityContext configuration, used to define permissions and access control for cluster containers.
    - Added console configuration, used to configure the nebula-console container image.
    - Supported enabling configuration and size configuration for service log storage.
    - Supported configuring multiple storage volumes for the Storage service.
    - Added alpineImage configuration, used to obtain the zone information where the node is located.