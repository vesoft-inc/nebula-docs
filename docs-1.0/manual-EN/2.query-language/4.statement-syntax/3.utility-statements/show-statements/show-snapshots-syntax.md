# SHOW SNAPSHOTS Syntax

```ngql
SHOW SNAPSHOTS
```

`SHOW SNAPSHOTS` statement lists all the snapshots.

For example:

```ngql
nebula> SHOW SNAPSHOTS;
===========================================================
| Name                         | Status | Hosts           |
===========================================================
| SNAPSHOT_2019_12_04_10_54_36 | VALID  | 127.0.0.1:77833 |
-----------------------------------------------------------
| SNAPSHOT_2019_12_04_10_54_42 | VALID  | 127.0.0.1:77833 |
-----------------------------------------------------------
| SNAPSHOT_2019_12_04_10_54_44 | VALID  | 127.0.0.1:77833 |
-----------------------------------------------------------
```

See [here](../../../../3.build-develop-and-administration/5.storage-service-administration/cluster-snapshot.md) to create snapshots.
