# ALTER TAG Syntax

```ngql
ALTER TAG <tag_name>
    <alter_definition> [, alter_definition] ...]
    [ttl_definition [, ttl_definition] ... ]

alter_definition:
| ADD    (prop_name data_type)
| DROP   (prop_name)
| CHANGE (prop_name data_type)

ttl_definition:
    TTL_DURATION = ttl_duration, TTL_COL = prop_name
```

`ALTER TAG` statement changes the structure of a tag. For example, you can add or delete properties, change the data type of an existing property. You can also set a property as TTL (Time-To-Live), or change the TTL duration.

**Note:** **Nebula Graph** automatically examines indexes when altering a tag. When altering a tag, **Nebula Graph** first checks whether the tag is associated with any indexes then traverses all of them to check whether the column item to be dropped or changed exists in the index column. If existed, the alter is rejected. Otherwise, it is allowed.

Please refer to [Index Documentation](index.md) on details about index.

Multiple `ADD`, `DROP`, and `CHANGE` clauses are permitted in a single `ALTER` statements, separated by commas. But do NOT add, drop, change the same property in one statement. If you have to do so, make each operation as a clause of the `ALTER` statement.

```ngql
nebula> CREATE TAG t1 (name string, age int);
nebula> ALTER TAG t1 ADD (id int, address string);
nebula> ALTER TAG t1 TTL_DURATION = 2, TTL_COL = "age";
```

**Note:** `TTL_COL` only supports the properties whose values are of the `INT` or the `TIMESTAMP` type.
