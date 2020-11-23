# SHOW CREATE SPACE Syntax

```ngql
SHOW CREATE SPACE <space_name>
```

`SHOW CREATE SPACE` statement returns the specified graph space and its creation syntax. If the graph space contains a default value, the default value is also returned.

```ngql
nebula> SHOW CREATE SPACE NBA;
=========================================================================================================
| Space | Create Space                                                                                  |
=========================================================================================================
| NBA  | CREATE SPACE gods (partition_num = 1, replica_factor = 1, charset = utf8, collate = utf8_bin) |
---------------------------------------------------------------------------------------------------------
```
