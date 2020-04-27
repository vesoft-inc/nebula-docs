# SHOW CONFIGS Syntax

```ngql
SHOW CONFIGS [graph|meta|storage]
```

`SHOW CONFIGS` lists the configuration information. `SHOW CONFIGS` output has these columns: module, name, type, mode and value.

For example:

```ngql
nebula> SHOW CONFIGS meta;
============================================================================================================================
| module | name                                        | type   | mode      | value                                        |
============================================================================================================================
| META   | v                                           | INT64  | IMMUTABLE | 4                                            |
----------------------------------------------------------------------------------------------------------------------------
| META   | help                                        | BOOL   | IMMUTABLE | False                                        |
----------------------------------------------------------------------------------------------------------------------------
| META   | port                                        | INT64  | IMMUTABLE | 45500                                        |
----------------------------------------------------------------------------------------------------------------------------
```

For more information about `SHOW CONFIGS [graph|meta|storage]`, please refer to [configs syntax](../../../../3.build-develop-and-administration/3.configurations/2.configs-syntax.md).
