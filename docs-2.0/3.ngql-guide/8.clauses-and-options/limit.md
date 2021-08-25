# LIMIT AND SKIP

The `LIMIT` clause constrains the number of rows in the output.

- Native nGQL: A pipe `|` must be used. And an offset can be ignored.

- OpenCypher style: No pipes are permitted. And you can use `SKIP` to indicate an offset.

!!! note

        When using `LIMIT` in either syntax above, it is important to use an `ORDER BY` clause that constrains the output into a unique order. Otherwise, you will get an unpredictable subset of the output.

## Native nGQL syntax

In native nGQL, `LIMIT` works the same as in `SQL`, and must be used with pipe `|`. The `LIMIT` clause accepts one or two parameters. The values of both arguments must be non-negative integers.

```ngql
YIELD <var>
[| LIMIT [<offset_value>,] <number_rows>];
```

|Parameter|Description|
|:--|:--|
|`var`|The columns or calculations that you wish to sort.|
|`offset_value`|The offset value. It defines from which row to start returning. The offset starts from `0`. The default value is `0`, which returns from the first row.|
|`number_rows`|It constrains the total number of returned rows.|

### Examples

```ngql
# The following example returns the 3 rows of data starting from the second row of the sorted output.
nebula> GO FROM "player100" OVER follow REVERSELY \
        YIELD $$.player.name AS Friend, $$.player.age AS Age \
        | ORDER BY Age,Friend \
        | LIMIT 1, 3;
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

## OpenCypher syntax

```ngql
RETURN <var>
[SKIP <offset>]
[LIMIT <number_rows>];
```

|Parameter|Description|
|:--|:--|
|`var`|The columns or calculations that you wish to sort.|
|`offset`|The offset value. It defines from which row to start returning. The offset starts from `0`. The default value is `0`, which returns from the first row.|
|`number_rows`|It constrains the total number of returned rows.|

Both `offset` and `number_rows` accept expressions, but the result of the expression must be a non-negative integer.

!!! note

    Fraction expressions composed of two integers are automatically floored to integers. For example, `8/6` is floored to 1.

### Examples

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

### Examples of SKIP

You can use `SKIP <offset>` to skip the top N rows of the output and return the rest of the output. So, there is no need to add `LIMIT <number_rows>`.

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

You can use `SKIP <offset>` and `LIMIT <number_rows>` together to return the data of the middle N rows.

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
<!--
## Performance tip

Nebula Graph {{ nebula.release }} does not implement the pushdown optimization of the storage layer of the `LIMIT` statement. Statements similar to `MATCH (n:T) RETURN n LIMIT 10` or `LOOKUP on i_T | LIMIT 10` will generate excessive resource occupancies in the graphd process. A graphd process will retrieve all T-type vertices from all storaged processes and then return 10 vertices. If the total amount of data is large, the graphd process will consume a lot of memory at this time and even cause OOM.
-->
