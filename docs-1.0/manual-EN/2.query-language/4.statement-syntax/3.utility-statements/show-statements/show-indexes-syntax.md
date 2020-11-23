# SHOW INDEXES Syntax

```ngql
SHOW {TAG | EDGE} INDEXES
```

`SHOW INDEXES` returns the defined tag/edg-type index information. `SHOW INDEXES` returns the following fields: index ID and index name.

For example:

```ngql
nebula> SHOW TAG INDEXES;
=============================
| Index ID | Index Name     |
=============================
| 6        | player_index_1 |
-----------------------------
| 7        | player_index_0 |
-----------------------------
```

See [Index](../../1.data-definition-statements/index.md) on how to create indexes.
