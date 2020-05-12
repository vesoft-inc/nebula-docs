# SHOW CONFIGS Syntax

```ngql
SHOW CONFIGS [graph|meta|storage]
```

`SHOW CONFIGS` lists the configuration information. `SHOW CONFIGS` output has these columns: module, name, type, mode and value.

For example:

```ngql
nebula> SHOW CONFIGS graph;
==============================================================
| module | name                    | type  | mode    | value |
==============================================================
| GRAPH  | v                       | INT64 | MUTABLE | 0     |
--------------------------------------------------------------
| GRAPH  | minloglevel             | INT64 | MUTABLE | 2     |
--------------------------------------------------------------
| GRAPH  | slow_op_threshhold_ms   | INT64 | MUTABLE | 50    |
--------------------------------------------------------------
| GRAPH  | heartbeat_interval_secs | INT64 | MUTABLE | 3     |
--------------------------------------------------------------
| GRAPH  | meta_client_retry_times | INT64 | MUTABLE | 3     |
--------------------------------------------------------------
```

For more information about `SHOW CONFIGS [graph|meta|storage]`, please refer to [configs syntax](../../../../3.build-develop-and-administration/3.configurations/2.configs-syntax.md).
