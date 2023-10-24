# INNER JOIN

`INNER JOIN` is a type of join query that matches records based on common column values between two tables. It is commonly used to create a result set that includes two tables based on values in their associated columns. In NebulaGraph, the `INNER JOIN` clause can be explicitly used to conduct join queries between two tables, leading to more complex query results.

!!! note

    In nGQL statements, the multi-hop query of `GO` implicitly utilizes the `INNER JOIN` clause. For example, in the statement `GO 1 TO 2 STEPS FROM "player101" OVER follow YIELD $$.player.name AS name, $$.player.age AS age`, the `GO` clause implicitly utilizes the `INNER JOIN` clause, matching the result columns of the first-hop query starting from `player101` along the `follow` edge with the starting columns of the second-hop query. Then, based on the matching results, it returns `name` and `age`. 

## openCypher compatibility

The `INNER JOIN` clause is only applicable to the native nGQL syntax.

## Syntax

```ngql
YIELD <column_name_list>
FROM <first_table> INNER JOIN <second_table> ON <join_condition>
```

## Notes

To conduct an `INNER JOIN` query, you need to follow these rules:

- Use the `YIELD` clause to specify the returned columns, and place it before the `INNER JOIN` clause.
- Use the `FROM` clause to specify the two tables to be joined.
- The `INNER JOIN` clause must contain the `ON` clause, which specifies the join condition. The join condition only supports equi-join (i.e., `==`).
- `<first_table>` and `<second_table>` are the two tables to be joined, and the two table names cannot be the same.
- Use user-defined variables to specify the table names. For more information, see [User-defined variables](../4.variable-and-composite-queries/2.user-defined-variables.md).

## Examples

The following examples show how to use the `INNER JOIN` clause to join the results of two queries in nGQL statements.

### Example 1 

Firstly, the `dst` column obtained from the initial `LOOK UP` operation (whose value for Tony Parker has an ID of `player101`) is connected with the `src` column obtained from the second `GO` query (which has IDs `player101` and `player125`). By matching the two columns where `player101` appears on both sides, we obtain the resulting data set. The final request then uses a `YIELD` statement `YIELD $b.vid AS vid, $a.v AS v, $b.e2 AS e2` to display the information.

```ngql
nebula> $a = LOOKUP ON player WHERE player.name == 'Tony Parker' YIELD id(vertex) as dst, vertex AS v; \
        $b = GO FROM 'player101', 'player125' OVER follow YIELD id($^) as src, id($$) as vid, edge AS e2; \
        YIELD $b.vid AS vid, $a.v AS v, $b.e2 AS e2 FROM $a INNER JOIN $b ON $a.dst == $b.src;
+-------------+-----------------------------------------------------+----------------------------------------------------+
| vid         | v                                                   | e2                                                 |
+-------------+-----------------------------------------------------+----------------------------------------------------+
| "player100" | ("player101" :player{age: 36, name: "Tony Parker"}) | [:follow "player101"->"player100" @0 {degree: 95}] |
| "player102" | ("player101" :player{age: 36, name: "Tony Parker"}) | [:follow "player101"->"player102" @0 {degree: 90}] |
| "player125" | ("player101" :player{age: 36, name: "Tony Parker"}) | [:follow "player101"->"player125" @0 {degree: 95}] |
+-------------+-----------------------------------------------------+----------------------------------------------------+
```

### Example 2

The following nGQL example utilizes the `INNER JOIN` clause to combine the `src` column from the first `LOOKUP` query (with `player101` as ID for `Tony Parker`) and the `src` column from the second `FETCH` query (with `player101` being the starting point to `player100`). By matching `player101` in both source columns, we obtain the resulting data set. The final request then utilizes a `YIELD` clause `YIELD $a.src AS src, $a.v AS v, $b.e AS e` to display the information.

```ngql      
nebula> $a = LOOKUP ON player WHERE player.name == 'Tony Parker' YIELD id(vertex) as src, vertex AS v; \
        $b = FETCH PROP ON follow 'player101'->'player100' YIELD src(edge) as src, edge as e; \
        YIELD $a.src AS src, $a.v AS v, $b.e AS e FROM $a INNER JOIN $b ON $a.src == $b.src;
+-------------+-----------------------------------------------------+----------------------------------------------------+
| src         | v                                                   | e                                                  |
+-------------+-----------------------------------------------------+----------------------------------------------------+
| "player101" | ("player101" :player{age: 36, name: "Tony Parker"}) | [:follow "player101"->"player100" @0 {degree: 95}] |
+-------------+-----------------------------------------------------+----------------------------------------------------+
```

### Example 3

The following example shows the process of using the `INNER JOIN` clause to join the results of the `LOOKUP`, `GO`, and `FIND PATH` clauses.

1. Query the `player` table using the `LOOKUP ON` statement to find the vertex for player `Tony Parker`, storing the ID and properties in the `$a.src` and `$a.v` columns, respectively.
2. Then use the `GO` statement to find player nodes that are reachable in 2-5 steps through the `follow` edges from the node `$a.src`. It also requires that the players corresponding to these nodes have an age greater than 30 years old. We store the IDs of these nodes in the `$b.dst` column.
3. Use the `FIND ALL PATH` statement to find all the paths that traverse the `follow` edges from `$a.src` to `$b.dst`. We also return the paths themselves as `$c.p` and the destination of each path as `$c.dst`.
4. Using the `FIND SHORTEST PATH` statement, find the shortest path from `$c.dst` back to `$a.src`, storing the path in `$d.p` and the starting point in `$d.src`.
5. Finally, we utilize the `INNER JOIN` clause to join the results of steps 3 and 4 by matching the `$c.dst` column with the `$d.src` column. Then use the `YIELD` statement `YIELD $c.forward AS forwardPath, $c.dst AS end, $d.p AS backwardPath` to return the matched records of the join.

```ngql
nebula> $a = LOOKUP ON player WHERE player.name == 'Tony Parker' YIELD id(vertex) as src, vertex AS v; \
        $b = GO 2 TO 5 STEPS FROM $a.src OVER follow WHERE $$.player.age > 30 YIELD id($$) AS dst; \
        $c = (FIND ALL PATH FROM $a.src TO $b.dst OVER follow YIELD path AS p | YIELD $-.p AS forward, id(endNode($-.p)) AS dst); \
        $d = (FIND SHORTEST PATH FROM $c.dst TO $a.src OVER follow YIELD path AS p | YIELD $-.p AS p, id(startNode($-.p)) AS src); \
        YIELD $c.forward AS forwardPath, $c.dst AS end, $d.p AS backwordPath FROM $c INNER JOIN $d ON $c.dst == $d.src;
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------+-----------------------------------------------------------------------------+
| forwardPath                                                                                                                                                           | end         | backwordPath                                                                |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------+-----------------------------------------------------------------------------+
| <("player101")-[:follow@0 {}]->("player102")>                                                                                                                         | "player102" | <("player102")-[:follow@0 {}]->("player101")>                               |
| <("player101")-[:follow@0 {}]->("player100")-[:follow@0 {}]->("player101")-[:follow@0 {}]->("player102")>                                                             | "player102" | <("player102")-[:follow@0 {}]->("player101")>                               |
| <("player101")-[:follow@0 {}]->("player125")>                                                                                                                         | "player125" | <("player125")-[:follow@0 {}]->("player100")-[:follow@0 {}]->("player101")> |
| <("player101")-[:follow@0 {}]->("player100")-[:follow@0 {}]->("player125")>                                                                                           | "player125" | <("player125")-[:follow@0 {}]->("player100")-[:follow@0 {}]->("player101")> |
| <("player101")-[:follow@0 {}]->("player100")-[:follow@0 {}]->("player101")-[:follow@0 {}]->("player125")>                                                             | "player125" | <("player125")-[:follow@0 {}]->("player100")-[:follow@0 {}]->("player101")> |
| <("player101")-[:follow@0 {}]->("player102")-[:follow@0 {}]->("player100")-[:follow@0 {}]->("player125")>                                                             | "player125" | <("player125")-[:follow@0 {}]->("player100")-[:follow@0 {}]->("player101")> |
| <("player101")-[:follow@0 {}]->("player102")-[:follow@0 {}]->("player101")-[:follow@0 {}]->("player125")>                                                             | "player125" | <("player125")-[:follow@0 {}]->("player100")-[:follow@0 {}]->("player101")> |
...
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------+-----------------------------------------------------------------------------+
```
      