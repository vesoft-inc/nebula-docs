# LOOKUP Syntax

The `LOOKUP` statement is used to search for the filter condition in it. `LOOKUP` is often coupled with a `WHERE` clause which adds filters or predicates.

> **NOTE**: Before using the `LOOKUP` statement, please make sure that indexes are created. Read more about indexes in [Index Documentation](../1.data-definition-statements/index.md).

```ngql
LOOKUP ON {<vertex_tag> | <edge_type>} WHERE <expression> [ AND | OR expression ...]) ] [YIELD <return_list>]

<return_list>
    <col_name> [AS <col_alias>] [, <col_name> [AS <col_alias>] ...]
```

- `LOOKUP` clause finds the vertices or edges.
- `WHERE` extracts only those results that fulfill the specified conditions. Only logical AND is supported. See [WHERE Syntax](where-syntax.md) for more information.
- `YIELD` clause returns particular results. If not specified, vertex ID is returned when `LOOKUP` tags, source vertex ID, destination vertex ID and ranking of the edges are returned when `LOOKUP` edges.

## Restrictions for index usage

The `WHERE` clause does not support the following operations in `LOOKUP`:

- `$-` and `$^`
- In relational expressions, expressions with field-names on both sides of the operator are not currently supported, such as (tagName.column1> tagName.column2)
- Nested AliasProp expressions in operation expressions and function expressions are not supported at this time.
- Range scan is not supported in the string type index.
- The `OR` and the `OXR` operations are not supported.

## Retrieve Vertices

The following example returns vertices whose name is `Tony Parker` and tagged with _player_.

```ngql
nebula> CREATE TAG INDEX index_player ON player(name, age);

nebula> LOOKUP ON player WHERE player.name == "Tony Parker";
============
| VertexID |
============
| 101      |
------------

nebula> LOOKUP ON player WHERE player.name == "Tony Parker" \
YIELD player.name, player.age;
=======================================
| VertexID | player.name | player.age |
=======================================
| 101      | Tony Parker | 36         |
---------------------------------------

nebula> LOOKUP ON player WHERE player.name== "Kobe Bryant" YIELD player.name AS name | \
GO FROM $-.VertexID OVER serve YIELD $-.name, serve.start_year, serve.end_year, $$.team.name;
==================================================================
| $-.name     | serve.start_year | serve.end_year | $$.team.name |
==================================================================
| Kobe Bryant | 1996             | 2016           | Lakers       |
------------------------------------------------------------------
```

## Retrieve Edges

The following example returns edges whose `degree` is 90 and the edge type is _follow_.

```ngql
nebula> CREATE EDGE INDEX index_follow ON follow(degree);

nebula> LOOKUP ON follow WHERE follow.degree == 90;
=============================
| SrcVID | DstVID | Ranking |
=============================
| 100    | 106    | 0       |
-----------------------------

nebula> LOOKUP ON follow WHERE follow.degree == 90 YIELD follow.degree;
=============================================
| SrcVID | DstVID | Ranking | follow.degree |
=============================================
| 100    | 106    | 0       | 90            |
---------------------------------------------

nebula> LOOKUP ON follow WHERE follow.degree == 60 YIELD follow.degree AS Degree | \
GO FROM $-.DstVID OVER serve YIELD $-.DstVID, serve.start_year, serve.end_year, $$.team.name;
================================================================
| $-.DstVID | serve.start_year | serve.end_year | $$.team.name |
================================================================
| 105       | 2010             | 2018           | Spurs        |
----------------------------------------------------------------
| 105       | 2009             | 2010           | Cavaliers    |
----------------------------------------------------------------
| 105       | 2018             | 2019           | Raptors      |
----------------------------------------------------------------
```

## FAQ

### Error code 411

```bash
[ERROR (-8)]: Unknown error(411):
```

Error code `411` shows there is no valid index for the current `WHERE` filter. Nebula Graph uses the left matching mode to select indexes. That is, columns in the `WHERE` filter must be in the first N columns of the index. For example:

```ngql
nebula> CREATE TAG INDEX example_index ON TAG t(p1, p2, p3);  -- Create an index for the first 3 properties of tag t
nebula> LOOKUP ON t WHERE p2 == 1 and p3 == 1; -- Not supported
nebula> LOOKUP ON t WHERE p1 == 1;  -- Supported
nebula> LOOKUP ON t WHERE p1 == 1 and p2 == 1;  -- Supported
nebula> LOOKUP ON t WHERE p1 == 1 and p2 == 1 and p3 == 1;  -- Supported
```

### No valid index found

```bash
No valid index found
```

If your query filter contains a string type field, Nebula Graph selects the index that matches all the fields. For example:

```ngql
nebula> CREATE TAG t1 (c1 string, c2 int);
nebula> CREATE TAG INDEX i1 ON t1 (c1, c2);
nebula> LOOKUP ON t1 WHERE t1.c1 == "a"; -- Index i1 is invalid
nebula> LOOKUP ON t1 WHERE t1.c1 == "a" and t1.c2 == 1;  -- Index i1 is valid
```
