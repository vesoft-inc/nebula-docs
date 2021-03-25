# GROUP BY

## OpenCypher Compatibility

This page applies to nGQL extensions only.

Use `GROUP BY` in nGQL-extensions **ONLY** to aggregate data.

OpenCypher uses the [count()](../6.functions-and-expressions/7.count.md) function to aggregate data.

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

The `GROUP BY` clause groups the rows with the same value into summary rows. Then operations such as counting, sorting, and calculation can be applied.

`GROUP BY` works after the pipe symbol and before a `YIELD` clause.

```ngql
| GROUP BY <var> YIELD <var>, <aggregation_function(var)>
```

- aggregation_function can be `avg(), sum(), max(), min(), count(), collect(), std()`.

## Examples

The following statement finds all the vertices connected directly to vertex `"player100"`, groups the result set by player names, and counts the times that the names show up in the result set.

```ngql
nebula> GO FROM "player100" \
        OVER follow BIDIRECT \
        YIELD $$.player.name as Name | \
        GROUP BY $-.Name \
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
Got 10 rows (time spent 3527/4423 us)
```

## Group and calculate with functions

The following statement finds all the players followed by `"player100"`, returns these players as `player` and the property of the follow edge as `degree`. These players are grouped and the sum of their degree values is returned.

```ngql
nebula> GO FROM "player100" OVER follow YIELD follow._src AS player, follow.degree AS degree | GROUP BY $-.player YIELD sum($-.degree);
+----------------+
| sum($-.degree) |
+----------------+
| 190            |
+----------------+
Got 1 rows (time spent 2851/3624 us)
```

For more information about functions, see [Functions](../6.functions-and-expressions/1.math.md).
