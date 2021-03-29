# LIMIT AND SKIP

The `LIMIT` clause constrains the number of rows in the output.

The Syntax in openCypher and nGQL-extension are different.

- NGQL-extension: A pipe `|` must be used. And an offset can be ignored.
- OpenCypher style: No pipes are permitted. Use `Skip` to indicate offset.

>**NOTE**: When using `LIMIT`(in either syntax above), it is important to use an `ORDER BY` clause that constrains the output into a unique order. Otherwise, you will get an unpredictable subset of the output.

## nGQL-extension syntax

In nGQL-extension, `LIMIT` works the same as in `SQL`, and must be used with pipe `|`. The `LIMIT` clause accepts one or two arguments. The values of both arguments must be non-negative integers.

```ngql
YIELD <var>
[| LIMIT [<offset_value>,] <number_rows>]
```

- var: The columns or calculations that you wish to sort.
- number_rows: It constrains the number of rows to return. For example, `LIMIT 10` would return the first 10 rows.
- offset_value(Optional): It defines from which row to start including the rows in the output. The offset starts from zero.

### Examples

```ngql
nebula> GO FROM "player100" OVER follow REVERSELY YIELD $$.player.name AS Friend, $$.player.age AS Age | ORDER BY Age,Friend | LIMIT 1, 3;
+-------------------+-----+
| Friend            | Age |
+-------------------+-----+
| "Danny Green"     | 31  |
+-------------------+-----+
| "Aron Baynes"     | 32  |
+-------------------+-----+
| "Marco Belinelli" | 32  |
+-------------------+-----+
```

## OpenCypher Syntax

```ngql
RETURN <var>
[SKIP <offset>]
[LIMIT <number_rows>]
```

|Parameter|Description|
|-|-|
|`offset`| Optional. It specifies the number of rows to be skipped. The offset starts from zero.|
|`number_rows`| It specifies the number of rows to be returned. It can be a non-negative integer or an expression that outputs a non-negative integer.|

Either `offset` or `number_rows` can accept an expression, which value must be a non-negative integer.

> **NOTE:** Fraction expressions composed of two integers are automatically floored to integers. For example, 8/6 is floored to 1.

### Examples

Return a specific number of rows. To return the top N rows from the result, use `LIMIT <N>` as follows:

```ngql
nebula> MATCH (v:player) RETURN v.name AS Name, v.age AS Age \
        ORDER BY Age LIMIT 5;
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
nebula> MATCH (v:player) RETURN v.name AS Name, v.age AS Age \
        ORDER BY Age LIMIT rand32(5);
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
```

### SKIP-syntax

You can use `SKIP <N>` to skip the top N rows from the result and return the rest of the result.

```ngql
nebula> MATCH (v:player{name:"Tim Duncan"}) --> (v2) \
        RETURN v2.name AS Name, v2.age AS Age \
        ORDER BY Age DESC SKIP 1;
+-----------------+-----+
| Name            | Age |
+-----------------+-----+
| "Manu Ginobili" | 41  |
+-----------------+-----+
| "Tony Parker"   | 36  |
+-----------------+-----+
nebula> MATCH (v:player{name:"Tim Duncan"}) --> (v2) \
        RETURN v2.name AS Name, v2.age AS Age \
        ORDER BY Age DESC SKIP 1+1;
+---------------+-----+
| Name          | Age |
+---------------+-----+
| "Tony Parker" | 36  |
+---------------+-----+
```

You can use `SKIP` and `LIMIT` together to return the middle N rows.

```ngql
nebula> MATCH (v:player{name:"Tim Duncan"}) --> (v2) \
        RETURN v2.name AS Name, v2.age AS Age \
        ORDER BY Age DESC SKIP 1 LIMIT 1;
+-----------------+-----+
| Name            | Age |
+-----------------+-----+
| "Manu Ginobili" | 41  |
+-----------------+-----+
```
