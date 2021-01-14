# LIMIT

The LIMIT clause constrains the number of rows in the output.

## Syntax

```nGQL
LIMIT [<offset>,] <number_rows>
```

|Parameter|Description|
|-|-|
|`offset`|Optional. It specifies the number of rows to be skipped. The offset starts from zero.|
|`number_rows`|It specifies the number of rows to be returned. It can be an expression that outputs a non-negative integer.|

> **NOTE:** In a `MATCH` statement, you can use a `LIMIT` clause with or without a pipe symbol, but in other statements, you must add a pipe symbol before the `LIMIT` clause.

## Return a specific number of rows

To return the top N rows from the result, use `LIMIT <N>` as follows:

```nGQL
nebula> MATCH (v:player) \
        RETURN v.name AS Name, v.age AS Age \
        ORDER BY Age | \
        LIMIT 5;
+-------------------------+-----+
| Name                    | Age |
+-------------------------+-----+
| "Luka Doncic"           | 20  |
+-------------------------+-----+
| "Ben Simmons"           | 22  |
+-------------------------+-----+
| "Kristaps Porzingis"    | 23  |
+-------------------------+-----+
| "Giannis Antetokounmpo" | 24  |
+-------------------------+-----+
| "Kyle Anderson"         | 25  |
+-------------------------+-----+
Got 5 rows (time spent 2841/3511 us)
```

## Use an offset to skip the top M rows

To skip the top M rows and return the next N rows, use `LIMIT <M,> <N>` as follows:

```nGQL
nebula> MATCH (v:player) \
        RETURN v.name AS Name, v.age AS Age \
        ORDER BY Age | \
        LIMIT 2,5;
+-------------------------+-----+
| Name                    | Age |
+-------------------------+-----+
| "Kristaps Porzingis"    | 23  |
+-------------------------+-----+
| "Giannis Antetokounmpo" | 24  |
+-------------------------+-----+
| "Kyle Anderson"         | 25  |
+-------------------------+-----+
| "Joel Embiid"           | 25  |
+-------------------------+-----+
| "Kyrie Irving"          | 26  |
+-------------------------+-----+
Got 5 rows (time spent 2922/3854 us)
```

> **NOTE:** To use a `LIMIT` offset in `MATCH`, you must add a pipe before `LIMIT`.

You can also use [`SKIP`](./skip.md) to skip the top M rows.

## Use an expression to specify the number of rows

You can use an expression to specify the number of rows to be returned. The expression must output a non-negative integer.

> **NOTE:** Fraction expressions composed of two integers are automatically floored to integers. For example, 8/6 is floored to 1.

```nGQL
nebula> MATCH (v:player) \
        RETURN v.name AS Name, v.age AS Age \
        ORDER BY Age \
        LIMIT rand32(5)
+-------------------------+-----+
| Name                    | Age |
+-------------------------+-----+
| "Luka Doncic"           | 20  |
+-------------------------+-----+
| "Ben Simmons"           | 22  |
+-------------------------+-----+
| "Kristaps Porzingis"    | 23  |
+-------------------------+-----+
| "Giannis Antetokounmpo" | 24  |
+-------------------------+-----+
Got 4 rows (time spent 2621/3343 us)
```

> **NOTE:** For now, only in `MATCH` statements can you use an expression with `LIMIT`. And you must omit the pipe symbol.
