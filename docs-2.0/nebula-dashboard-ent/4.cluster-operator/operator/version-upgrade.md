# Version upgrade

NebulaGraph Dashboard Enterprise Edition supports upgrading the version of the existing NebulaGraph cluster.

!!! caution

    - During the upgrade, the cluster will replace binary files. The upgrade speed is fast, but the cluster will still be stopped and restarted.
    - Automatic rollback is not supported. Users can manually upgrade the cluster again when the upgrade failed.
    - The upgrade cannot be stopped or canceled.

!!! note

    - Only supports upgrading the NebulaGraph cluster that version greater than **3.0.0** to the version equal to or lower than **3.2.1**. To upgrade to **3.3.0**, see [manual upgrade](../../../4.deployment-and-installation/3.upgrade-nebula-graph/upgrade-nebula-graph-to-latest.md). 
    - Do not support upgrading clusters across the major version.
    - The community edition can be upgraded to the enterprise edition, and the enterprise edition can be upgraded to the community edition.
    - The cluster can be upgraded to a minor version in the current major version, including a smaller version than the current minor version.

1. At the top navigation bar of the Dashboard Enterprise Edition page, click **Cluster Management**.
2. On the right side of the target cluster, click **Detail**.
3. On the left-side navigation bar of the page, click **Operation**->**Version Upgrade**.
4. On the **Version Upgrade** page, confirm **Current NebulaGraph version** and select the upgrade version.

  !!! note

        If you do not find the suitable version, click **Package Management** to download or upload the required version installation package. For details, see [Package management](../../system-settings/manage-package.md).

  {{ent.ent_begin}}
  !!! note

        When upgrading Enterprise Edition clusters with version below 3.5.0, you need to click **Upload Certificate** to upload license.
  {{ent.ent_end}}

5. Click **Next** to perform the upgrade check, and then click **Next**.

   The cluster will be shut down during the upgrade and automatically restart the services after the upgrade. You can use the **diagnostics report** to help you judge whether the timing to upgrade is suitable.

6. Confirm the upgrade information again, including **Cluster Name**, **Current NebulaGraph Version**, and **Upgrade NebulaGraph Version**, and then click **Upgrade**.
   Users can view the upgrade task information in [task center](../../10.tasks.md), the task type is `version update`.

