# YIELD

`YIELD` defines the output of an nGQL query.

`YIELD` can lead a clause or a statement:

* A `YIELD` clause works in nGQL statements such as `GO`, `FETCH`, or `LOOKUP`.
* A `YIELD` statement works in a composite query or independently.

## OpenCypher Compatibility

This topic applies to native nGQL only. For the openCypher syntax, use [`RETURN`](return.md).

`YIELD` has different functions in openCypher and nGQL.

* In openCypher, `YIELD` is used in the `CALL[…YIELD]` clause to specify the output of the procedure call.

  !!! note

        NGQL does not support `CALL[…YIELD]` yet.

* In nGQL, `YIELD` works like `RETURN` in openCypher.

## YIELD clauses

### Syntax

```ngql
YIELD [DISTINCT] <col> [AS <alias>] [, <col> [AS <alias>] ...]
```

The syntax is described as follows.

|Keyword/Field|Description|
|-|-|
|`DISTINCT`|Aggregates the output and makes the statement return a distinct result set.|
|`col`|A field to be returned. If no alias is set, `col` will be a column name in the output.|
|`alias`|An alias for `col`. It is set after the keyword `AS` and will be a column name in the output.|

### Use a YIELD clause in a statement

* Use `YIELD` with `GO`:

    ```ngql
    nebula> GO FROM "player100" OVER follow \
            YIELD $$.player.name AS Friend, $$.player.age AS Age;
    +-----------------+-----+
    | Friend          | Age |
    +-----------------+-----+
    | "Tony Parker"   | 36  |
    +-----------------+-----+
    | "Manu Ginobili" | 41  |
    +-----------------+-----+
    Got 2 rows (time spent 3378/4030 us)
    ```

* Use `YIELD` with `FETCH`:

    ```ngql
    nebula> FETCH PROP ON player "player100" \
            YIELD player.name;
    +-------------+--------------+
    | VertexID    | player.name  |
    +-------------+--------------+
    | "player100" | "Tim Duncan" |
    +-------------+--------------+
    Got 1 rows (time spent 2933/5931 us)
    ```

* Use `YIELD` with `LOOKUP`:

    ```ngql
    nebula> LOOKUP ON player WHERE player.name == "Tony Parker" \
            YIELD player.name, player.age;
    =======================================
    | VertexID | player.name | player.age |
    =======================================
    | 101      | Tony Parker | 36         |
    ---------------------------------------
    Got 1 rows (time spent 2963/3778 us)
    ```

## YIELD Statements

### Syntax

```ngql
YIELD [DISTINCT] <col> [AS <alias>] [, <col> [AS <alias>] ...]
[WHERE <conditions>]
```

The syntax is described as follows.

|Field|Description|
|-|-|
|`DISTINCT`|Aggregates the output and makes the statement return a distinct result set.|
|`col`|A field to be returned. If no alias is set, `col` will be a column name in the output.|
|`alias`|An alias for `col`. It is set after the keyword `AS` and will be a column name in the output.|
|`conditions`|Conditions set in a `WHERE` clause to filter the output. For more information, see [`WHERE`](where.md).|

### Use a YIELD statement in a composite query

In a [composite query](../4.variable-and-composite-queries/1.composite-queries.md), a `YIELD` statement accepts, filters, and reforms the result set of the preceding statement, and then outputs it.

The following query finds the players that "player100" follows and calculates their average age.

```ngql
nebula> GO FROM "player100" OVER follow \
        YIELD follow._dst AS ID | \
        FETCH PROP ON player $-.ID \
        YIELD player.age AS Age | \
        YIELD AVG($-.Age) as Avg_age, count(*)as Num_friends;
+---------+-------------+
| Avg_age | Num_friends |
+---------+-------------+
| 38.5    | 2           |
+---------+-------------+
Got 1 rows (time spent 1846/2426 us)
```

The following query finds the players that "player101" follows and the follow degrees are greater than 90.

```ngql
nebula> $var1 = GO FROM "player101" OVER follow \
        YIELD follow.degree AS Degree, follow._dst as ID; \
        YIELD $var1.ID AS ID \
        WHERE $var1.Degree > 90;
+-------------+
| ID          |
+-------------+
| "player100" |
+-------------+
| "player125" |
+-------------+
Got 2 rows (time spent 891/1411 us)
```

### Use a standalone YIELD statement

A `YIELD` statement can calculate a valid expression and output the result.

```ngql
nebula> YIELD rand32(1, 6);
+-------------+
| rand32(1,6) |
+-------------+
| 3           |
+-------------+
Got 1 rows (time spent 144/615 us)

nebula> YIELD "Hel" + "\tlo" AS string1, ", World!" AS string2;
+-------------+------------+
| string1     | string2    |
+-------------+------------+
| "Hel    lo" | ", World!" |
+-------------+------------+
Got 1 rows (time spent 154/692 us)

nebula> YIELD hash("Tim") % 100;
+-----------------+
| (hash(Tim)%100) |
+-----------------+
| 42              |
+-----------------+
Got 1 rows (time spent 164/820 us)

nebula> YIELD \
      CASE 2+3 \
      WHEN 4 THEN 0 \
      WHEN 5 THEN 1 \
      ELSE -1 \
      END \
      AS result;
+--------+
| result |
+--------+
| 1      |
+--------+
Got 1 rows (time spent 204/935 us)
```
