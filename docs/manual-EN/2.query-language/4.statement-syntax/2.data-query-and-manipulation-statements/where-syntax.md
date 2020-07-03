# WHERE Syntax

The `WHERE` clause allows you to specify a search condition for the data returned by a query. The following shows the syntax of the WHERE clause:

```ngql
WHERE <expression> [ AND | OR <expression> ...])
```

Currently, the `WHERE` statement applies to the `GO` and `LOOKUP` statement. Note some `WHERE` filter conditions are not supported in the `LOOKUP` statement. Refer to the [LOOKUP Doc](lookup-syntax.md) for details.

Usually, `WHERE` is a set of logical combination that filters vertex or edge properties.

> As syntactic sugar, logic AND is represented by `AND` or `&&` and logic OR is represented by `OR` or `||`.

## Examples

```ngql
-- the degree property of edge follow is greater than 90.
nebula> GO FROM 100 OVER follow WHERE follow.degree > 90;
-- the following result is returned:
===============
| follow._dst |
===============
| 101         |
---------------

-- find the dest vertex whose age is equal to the source vertex, player 104.
nebula> GO FROM 104 OVER follow WHERE $^.player.age == $$.player.age;
-- the following result is returned:
===============
| follow._dst |
===============
| 103         |
---------------

-- logical combination is allowed.
nebula> GO FROM 100 OVER follow WHERE follow.degree > 90 OR $$.player.age != 33 AND $$.player.name != "Tony Parker";
-- the following result is returned:
===============
| follow._dst |
===============
| 101         |
---------------
| 106         |
---------------

-- the condition in the WHERE clause is always TRUE.
nebula> GO FROM 101 OVER follow WHERE 1 == 1 OR TRUE;
-- the following result is returned:
===============
| follow._dst |
===============
| 100         |
---------------
| 102         |
---------------
```

## Filtering Edge Rank with WHERE

You can filter the edge rank with the `WHERE` clause. For example:

```ngql
nebula> CREATE SPACE test;
nebula> USE test;
nebula> CREATE EDGE e1(p1 int);
nebula> CREATE TAG person(p1 int);
nebula> INSERT VERTEX person(p1) VALUES 1:(1);
nebula> INSERT VERTEX person(p1) VALUES 2:(2);
nebula> INSERT EDGE e1(p1) VALUES 1->2@0:(10);
nebula> INSERT EDGE e1(p1) VALUES 1->2@1:(11);
nebula> INSERT EDGE e1(p1) VALUES 1->2@2:(12);
nebula> INSERT EDGE e1(p1) VALUES 1->2@3:(13);
nebula> INSERT EDGE e1(p1) VALUES 1->2@4:(14);
nebula> INSERT EDGE e1(p1) VALUES 1->2@5:(15);
nebula> INSERT EDGE e1(p1) VALUES 1->2@6:(16);
nebula> GO FROM 1 OVER e1 WHERE e1._rank>2 YIELD e1._src, e1._dst, e1._rank AS Rank, e1.p1 | ORDER BY Rank DESC;
====================================
| e1._src | e1._dst | Rank | e1.p1 |
====================================
| 1       | 2       | 6    | 16    |
------------------------------------
| 1       | 2       | 5    | 15    |
------------------------------------
| 1       | 2       | 4    | 14    |
------------------------------------
| 1       | 2       | 3    | 13    |
------------------------------------
```
