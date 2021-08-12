# GROUP BY

The `GROUP BY` clause can be used to aggregate data.

## OpenCypher Compatibility

This topic applies to native nGQL only.

You can also use the [count()](../6.functions-and-expressions/7.count.md) function to aggregate data.

```ngql
nebula>  MATCH (v:player)<-[:follow]-(:player) RETURN v.name AS Name, count(*) as cnt ORDER BY cnt DESC
+----------------------+--------------+
| Name                 | Follower_Num |
+----------------------+--------------+
| "Tim Duncan"         | 10           |
+----------------------+--------------+
| "LeBron James"       | 6            |
+----------------------+--------------+
| "Tony Parker"        | 5            |
+----------------------+--------------+
| "Manu Ginobili"      | 4            |
+----------------------+--------------+
| "Chris Paul"         | 4            |
+----------------------+--------------+
| "Tracy McGrady"      | 3            |
+----------------------+--------------+
| "Dwyane Wade"        | 3            |
+----------------------+--------------+
...
```

## Syntax

The `GROUP BY` clause groups the rows with the same value. Then operations such as counting, sorting, and calculation can be applied.

The `GROUP BY` clause works after the pipe symbol (|) and before a `YIELD` clause.

```ngql
| GROUP BY <var> YIELD <var>, <aggregation_function(var)>
```

The `aggregation_function()` function supports `avg()`, `sum()`, `max()`, `min()`, `count()`, `collect()`, and `std()`.

## Examples

The following statement finds all the vertices connected directly to vertex `"player100"`, groups the result set by player names, and counts how many times the name shows up in the result set.

```ngql
nebula> GO FROM "player100" OVER follow BIDIRECT \
        YIELD $$.player.name as Name \
        | GROUP BY $-.Name \
        YIELD $-.Name as Player, count(*) AS Name_Count;
+---------------------+------------+
| Player              | Name_Count |
+---------------------+------------+
| "Tiago Splitter"    | 1          |
+---------------------+------------+
| "Aron Baynes"       | 1          |
+---------------------+------------+
| "Boris Diaw"        | 1          |
+---------------------+------------+
| "Manu Ginobili"     | 2          |
+---------------------+------------+
| "Dejounte Murray"   | 1          |
+---------------------+------------+
| "Danny Green"       | 1          |
+---------------------+------------+
| "Tony Parker"       | 2          |
+---------------------+------------+
| "Shaquille O'Neal"   | 1         |
+---------------------+------------+
| "LaMarcus Aldridge" | 1          |
+---------------------+------------+
| "Marco Belinelli"   | 1          |
+---------------------+------------+
```

## Group and calculate with functions

The following statement finds all the vertices connected directly to vertex `"player100"`, groups the result set by source vertices, and returns the sum of degree values.

```ngql
nebula> GO FROM "player100" OVER follow \
        YIELD follow._src AS player, follow.degree AS degree \
        | GROUP BY $-.player \
        YIELD sum($-.degree);
+----------------+
| sum($-.degree) |
+----------------+
| 190            |
+----------------+
```

For more information about the `sum()` function, see [Built-in math functions](../6.functions-and-expressions/1.math.md).
