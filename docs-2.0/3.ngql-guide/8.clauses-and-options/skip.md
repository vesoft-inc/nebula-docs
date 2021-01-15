# SKIP

The SKIP clause specifies the number of rows to be skipped in the output.

For now, only in `MATCH` statements can you use `SKIP`.

## Syntax

```nGQL
SKIP <number_rows>
```

`number_rows` specifies the number of rows to be skipped. It can be an expression that outputs a non-negative integer.

## Skip top N rows

You can use `SKIP N` to skip the top N rows from the result and return the rest of the result.

```nGQL
// This is an nGQL query without SKIP.
nebula> MATCH (v:player{name:"Tim Duncan"}) --> (v2) \
        RETURN v2.name AS Name, v2.age AS Age \
        ORDER BY Age DESC;
+-----------------+----------+
| Name            | Age      |
+-----------------+----------+
| "Spurs"         | __NULL__ |
+-----------------+----------+
| "Manu Ginobili" | 41       |
+-----------------+----------+
| "Tony Parker"   | 36       |
+-----------------+----------+
Got 3 rows (time spent 3699/4119 us)

// Skip the first row in the preceding result.
nebula> MATCH (v:player{name:"Tim Duncan"}) --> (v2) \
        RETURN v2.name AS Name, v2.age AS Age \
        ORDER BY Age DESC \
        SKIP 1;
+-----------------+-----+
| Name            | Age |
+-----------------+-----+
| "Manu Ginobili" | 41  |
+-----------------+-----+
| "Tony Parker"   | 36  |
+-----------------+-----+
Got 2 rows (time spent 3712/4861 us)
```

## Return the middle N rows

You can use `SKIP` and `LIMIT` together to return the middle N rows.

```nGQL
nebula> MATCH (v:player{name:"Tim Duncan"}) --> (v2) \
        RETURN v2.name AS Name, v2.age AS Age \
        ORDER BY Age DESC \
        SKIP 1 \
        LIMIT 1;
+-----------------+-----+
| Name            | Age |
+-----------------+-----+
| "Manu Ginobili" | 41  |
+-----------------+-----+
Got 1 rows (time spent 3674/4340 us)
```

For more information about `LIMIT`, see [LIMIT](limit.md).

## Use an expression with SKIP

You can use an expression to specify the number of rows to be skipped. The expression must output a non-negative integer.

> **NOTE:** Fraction expressions composed of two integers are automatically floored to integers. For example, 8/6 is floored to 1.

```nGQL
nebula> MATCH (v:player{name:"Tim Duncan"}) --> (v2) \
        RETURN v2.name AS Name, v2.age AS Age \
        ORDER BY Age DESC \
        SKIP 1+1;
+---------------+-----+
| Name          | Age |
+---------------+-----+
| "Tony Parker" | 36  |
+---------------+-----+
Got 1 rows (time spent 2512/3040 us)
```
