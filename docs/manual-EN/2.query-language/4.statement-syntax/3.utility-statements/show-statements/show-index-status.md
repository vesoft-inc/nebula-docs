# SHOW INDEX STATUS Syntax

```ngql
SHOW {TAG | EDGE} INDEX STATUS
```

`SHOW INDEX STATUS` returns the defined tag/edg-type index status. For example, list the tag index status with the following command:

```ngql
nebula> SHOW TAG INDEX STATUS;
==========================================
| Name                | Tag Index Status |
==========================================
| single_person_index | SUCCEEDED        |
------------------------------------------
```

Details on creating index refer to the [Index](../../1.data-definition-statements/index.md) doc.
