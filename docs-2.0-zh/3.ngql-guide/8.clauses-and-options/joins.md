# INNER JOIN

`INNER JOIN`是一种连接查询。它基于两个表之间的共同列值进行匹配，并返回满足条件的记录。`INNER JOIN`通常用于根据关联列的值来创建一个包含两个表的结果集。在{{nebula.name}}中，可以显示地使用`INNER JOIN`子句在两个表之间进行连接查询，以获取更加复杂的查询结果。

!!! note

    在 nGQL 语句中，`GO`的多跳查询隐式地使用了`INNER JOIN`子句。例如，`GO 1 TO 2 STEPS FROM "player101" OVER follow YIELD $$.player.name AS name, $$.player.age AS age`语句中，`GO`子句隐式地使用了`INNER JOIN`子句，将从`player101`出发沿`follow`边第一步查询的结果列和第二步查询的起点列进行匹配，然后基于匹配结果返回`name`和`age`。

## openCypher 兼容性

`INNER JOIN`子句仅适用于原生 nGQL 语法。

## 语法

```ngql
YIELD <column_name_list>
FROM <first_table> INNER JOIN <second_table> ON <join_condition>
```

## 使用说明

- 必须使用`YIELD`子句指定返回的列，并且`YIELD`子句需放置在`INNER JOIN`子句之前。
- 使用`FROM`子句指定要连接的两个表。
- `INNER JOIN`子句必须包含`ON`子句，`ON`子句指定了连接条件，并且连接条件只支持等值连接（即`==`）。
- `<first_table>`和`<second_table>`是要连接的两个表，两表名不能相同。
- 使用自定义变量来指定表名。详情参见[使用自定义变量](../4.variable-and-composite-queries/2.user-defined-variables.md)。

## 使用示例

以下示例介绍如何通过`INNER JOIN`关联 nGQL 语句中的两个查询结果。

示例一：通过`INNER JOIN`将第一个`LOOKUP`查询中的结果`dst`列（`Tony Parker`的 ID `player101`）和第二个`GO`查询中的结果`src`列（`player101`和`player125`两个 ID）进行匹配。匹配的结果集为两个查询结果中`dst`和`src`列都包含的`player101`，基于这个`player101`匹配的结果，然后通过`YIELD $b.vid AS vid, $a.v AS v, $b.e2 AS e2`返回最终查询结果。

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

示例二：通过`INNER JOIN`将第一个`LOOKUP`查询中的结果`src`列（`Tony Parker`的 ID `player101`）和第二个`FETCH`查询中的结果`src`列（`player101`到`player100`的起点 ID `player101`）进行匹配。匹配的结果集为都包含的`player101`，基于这个`player101`匹配的结果，然后通过`YIELD $a.src AS src, $a.v AS v, $b.e AS e`返回最终查询结果。

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

示例三：使用`INNER JOIN`关联`LOOKUP`、`GO`和`FIND PATH`子句的查询的过程示例步骤：

1. 通过`LOOKUP ON`语句，先对`player`表进行查询，找到名为`Tony Parker`的球员顶点，并将其 ID 和属性存储到`$a.src`和`v`列中。
2. 再通过`GO`查找从`$a.src`节点出发经过`follow`边往外走 2-5 步的球员节点，其中要求这些节点对应的`player`点年龄大于 30 岁，返回这些节点的 ID，并将它们存储在`$b.dst`列中。
3. 然后通过`FIND ALL PATH`语句，查找从`$a.src`到`$b.dst`的沿`follow`所有路径，并返回路径`$c.p`以及路径中的终点`$c.dst`。
4. 最后通过`FIND SHORTEST PATH`语句，查找从`$c.dst`到`$a.src`的最短路径，并返回路径`$d.p`和路径起点`$d.src`。
5. 使用`INNER JOIN`将 3 和 4 中得到的结果联接起来，匹配`$c.dst`和`$d.src`列，为每个联接匹配的记录返回`YIELD $c.forward AS forwardPath, $c.dst AS end, $d.p AS backwordPath`。


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
      