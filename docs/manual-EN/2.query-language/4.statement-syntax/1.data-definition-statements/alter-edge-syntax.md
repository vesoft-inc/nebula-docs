# ALTER EDGE Syntax

```ngql
ALTER EDGE <edge_name>
    <alter_definition> [, alter_definition] ...]
    [ttl_definition [, ttl_definition] ... ]

alter_definition:
| ADD    (prop_name data_type)
| DROP   (prop_name)
| CHANGE (prop_name data_type)

ttl_definition:
    TTL_DURATION = ttl_duration, TTL_COL = prop_name
```

`ALTER EDGE` statement changes the structure of an edge. For example, you can add or delete properties, change the data type of an existing property. You can also set a property as TTL (Time-To-Live), or change the TTL duration.

**Note:** **Nebula Graph** automatically examines indexes when altering an edge. When altering an edge, **Nebula Graph** first checks whether the edge is associated with any indexes then traverses all of them to check whether the column item to be dropped or changed exists in the index column. If existed, the alter is rejected. Otherwise, it is allowed.

Please refer to [Index Documentation](index.md) on details about index.

Multiple `ADD`, `DROP`, and `CHANGE` clauses are permitted in a single `ALTER` statements, separated by commas. But do NOT add, drop, change the same property in one statement. If you have to do so, make each operation as a clause of the `ALTER` statement.

```ngql
nebula> CREATE EDGE e1 (prop3 int, prop4 int, prop5 int);
nebula> ALTER EDGE e1 ADD (prop1 int, prop2 string),    /* 添加 prop1 */
              CHANGE (prop3 string),            /* 将 prop3 类型更改为字符 */
              DROP (prop4, prop5);               /* 删除 prop4 和 prop5 */

nebula> ALTER EDGE e1 TTL_DURATION = 2, TTL_COL = "prop1";
```

Notice that TTL_COL only support INT and TIMESTAMP types.
