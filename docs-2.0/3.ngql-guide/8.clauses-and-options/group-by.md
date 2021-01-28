# GROUP BY

The `GROUP BY` clause groups the rows with the same value into summary rows. Then operations such as counting, sorting, and calculation can be applied.

`GROUP BY` works after the pipe symbol and before a `YIELD` or `RETURN` clause.

## Group and count the output

The following statement finds all the vertices connected directly to vertex `"player100"`, groups the result set by player names, and counts the times that the names show up in the result set.

```ngql
nebula> GO FROM "player100" \
        OVER follow BIDIRECT \
        YIELD $$.player.name as Name | \
        GROUP BY $-.Name \
        YIELD $-.Name as Player, COUNT(*) AS Name_Count;
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

## Group and sort the output

The following statement finds the follower number of players, groups the output by player names, and sorts the output by the follower number.

```ngql
nebula> MATCH (v:player)<-[:follow]-(:player) \
        RETURN v.name AS Name | \
        GROUP BY $-.Name \
        YIELD $-.Name AS Name, count(*) AS Follower_Num | \
        ORDER BY Follower_Num DESC;
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
Got 35 rows (time spent 5150/5881 us)
```

## Group and calculate with functions

The following statement finds all the players followed by `"player100"`, returns these players as `player` and the property of the follow edge as `degree`. These players are grouped and the sum of their degree values is returned.

```ngql
nebula> GO FROM "player100" OVER follow YIELD follow._src AS player, follow.degree AS degree | GROUP BY $-.player YIELD SUM($-.degree);
+----------------+
| SUM($-.degree) |
+----------------+
| 190            |
+----------------+
Got 1 rows (time spent 2851/3624 us)
```

For more information about functions, see [Functions](../6.functions-and-expressions/1.math.md).
