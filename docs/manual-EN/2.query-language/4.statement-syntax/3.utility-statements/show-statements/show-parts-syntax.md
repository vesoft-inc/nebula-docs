# SHOW PARTS Syntax

```ngql
SHOW PARTS <part_id>
```

`SHOW PARTS` lists the partition information of the given SPACE. `<part_id>` is optional, if not specified, all parts information is returned.

```ngql
nebula> SHOW PARTS 1;
==============================================================
| Partition ID | Leader           | Peers            | Losts |
==============================================================
| 1            | 172.28.2.2:44500 | 172.28.2.2:44500 |       |
--------------------------------------------------------------
```

`SHOW PARTS` output has these columns:

- Partition ID
- Leader
- Peers
- Losts
