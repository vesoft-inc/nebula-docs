# RETURN

The `RETURN` clause defines the output of an nGQL query. To return multiple fields, separate them with commas.

`RETURN` can lead a clause or a statement:

* A `RETURN` clause can work in openCypher statements in nGQL, such as `MATCH` or `UNWIND`.

* A `RETURN` statement can work independently to output the result of an expression.

## OpenCypher compatibility

This topic applies to the openCypher syntax in nGQL only. For native nGQL, use [`YIELD`](yield.md).

`RETURN` does not support the following openCypher features yet.

* Return variables with uncommon characters, for example:

  ```ngql
  MATCH (`non-english_characters`:player) \
  RETURN `non-english_characters`;
  ```

* Set a pattern in the `RETURN` clause and return all elements that this pattern matches, for example:

  ```ngql
  MATCH (v:player) \
  RETURN (v)-[e]->(v2);
  ```

## Map order description

When `RETURN` returns the map data structure, the order of key-value pairs is undefined.

```ngql
nebula> RETURN {age: 32, name: "Marco Belinelli"};
+------------------------------------+
| {age:32,name:"Marco Belinelli"}    |
+------------------------------------+
| {age: 32, name: "Marco Belinelli"} |
+------------------------------------+

nebula> RETURN {zage: 32, name: "Marco Belinelli"};
+-------------------------------------+
| {zage:32,name:"Marco Belinelli"}    |
+-------------------------------------+
| {name: "Marco Belinelli", zage: 32} |
+-------------------------------------+
```

## Return vertices or edges

Use the `RETURN {<vertex_name> | <edge_name>}` to return vertices and edges all information.

```ngql
// Return vertices
nebula> MATCH (v:player) \
        RETURN v;
+---------------------------------------------------------------+
| v                                                             |
+---------------------------------------------------------------+
| ("player104" :player{age: 32, name: "Marco Belinelli"})       |
| ("player107" :player{age: 32, name: "Aron Baynes"})           |
| ("player116" :player{age: 34, name: "LeBron James"})          |
| ("player120" :player{age: 29, name: "James Harden"})          |
| ("player125" :player{age: 41, name: "Manu Ginobili"})         |
+---------------------------------------------------------------+
...

// Return edges
nebula> MATCH (v:player)-[e]->() \
        RETURN e;
+------------------------------------------------------------------------------+
| e                                                                            |
+------------------------------------------------------------------------------+
| [:follow "player104"->"player100" @0 {degree: 55}]                           |
| [:follow "player104"->"player101" @0 {degree: 50}]                           |
| [:follow "player104"->"player105" @0 {degree: 60}]                           |
| [:serve "player104"->"team200" @0 {end_year: 2009, start_year: 2007}]        |
| [:serve "player104"->"team208" @0 {end_year: 2016, start_year: 2015}]        |
+------------------------------------------------------------------------------+
...
```

## Return VIDs

Use the `id()` function to retrieve VIDs.

```ngql
nebula> MATCH (v:player{name:"Tim Duncan"}) \
        RETURN id(v);
+-------------+
| id(v)       |
+-------------+
| "player100" |
+-------------+

```

## Return Tag

Use the `labels()` function to return the list of tags on a vertex.

```ngql
nebula> MATCH (v:player{name:"Tim Duncan"}) \
        RETURN labels(v);
+------------+
| labels(v)  |
+------------+
| ["player"] |
+------------+
```

To retrieve the nth element in the `labels(v)` list, use `labels(v)[n-1]`. The following example shows how to use `labels(v)[0]` to return the first tag in the list.

```ngql
nebula> MATCH (v:player{name:"Tim Duncan"}) \
        RETURN labels(v)[0];
+--------------+
| labels(v)[0] |
+--------------+
| "player"     |
+--------------+
```


## Return properties

When returning properties of a vertex, it is necessary to specify the tag to which the properties belong because a vertex can have multiple tags and the same property name can appear on different tags.

It is possible to specify the tag of a vertex to return all properties of that tag, or to specify both the tag and a property name to return only that property of the tag.

```ngql
nebula> MATCH (v:player) \
        RETURN v.player, v.player.name, v.player.age \
        LIMIT 3;
+--------------------------------------+---------------------+--------------+
| v.player                             | v.player.name       | v.player.age |
+--------------------------------------+---------------------+--------------+
| {age: 33, name: "LaMarcus Aldridge"} | "LaMarcus Aldridge" | 33           |
| {age: 25, name: "Kyle Anderson"}     | "Kyle Anderson"     | 25           |
| {age: 40, name: "Kobe Bryant"}       | "Kobe Bryant"       | 40           |
+--------------------------------------+---------------------+--------------+
```

When returning edge properties, it is not necessary to specify the edge type to which the properties belong, because an edge can only have one edge type.

```ngql
// Return the property of a vertex
nebula> MATCH p=(v:player{name:"Tim Duncan"})-[]->(v2) \
        RETURN properties(v2);
+----------------------------------+
| properties(v2)                   |
+----------------------------------+
| {name: "Spurs"}                  |
| {age: 36, name: "Tony Parker"}   |
| {age: 41, name: "Manu Ginobili"} |
+----------------------------------+
```

```ngql
// Return the property of an edge
nebula> MATCH (v:player{name:"Tim Duncan"})-[e]->() \
        RETURN e.start_year, e.degree \
+--------------+----------+
| e.start_year | e.degree |
+--------------+----------+
| __NULL__     | 95       |
| __NULL__     | 95       |
| 1997         | __NULL__ |
+--------------+----------+
```

## Return edge type

Use the `type()` function to return the matched edge types.

```ngql
nebula> MATCH p=(v:player{name:"Tim Duncan"})-[e]->() \
        RETURN DISTINCT type(e);
+----------+
| type(e)  |
+----------+
| "serve"  |
| "follow" |
+----------+
```

## Return paths

Use `RETURN <path_name>` to return all the information of the matched paths.

```ngql
nebula> MATCH p=(v:player{name:"Tim Duncan"})-[*3]->() \
        RETURN p;
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| p                                                                                                                                                                                                                                                                                                              |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| <("player100" :player{age: 42, name: "Tim Duncan"})-[:follow@0 {degree: 95}]->("player101" :player{age: 36, name: "Tony Parker"})-[:follow@0 {degree: 90}]->("player102" :player{age: 33, name: "LaMarcus Aldridge"})-[:serve@0 {end_year: 2019, start_year: 2015}]->("team204" :team{name: "Spurs"})>         |
| <("player100" :player{age: 42, name: "Tim Duncan"})-[:follow@0 {degree: 95}]->("player101" :player{age: 36, name: "Tony Parker"})-[:follow@0 {degree: 90}]->("player102" :player{age: 33, name: "LaMarcus Aldridge"})-[:serve@0 {end_year: 2015, start_year: 2006}]->("team203" :team{name: "Trail Blazers"})> |
| <("player100" :player{age: 42, name: "Tim Duncan"})-[:follow@0 {degree: 95}]->("player101" :player{age: 36, name: "Tony Parker"})-[:follow@0 {degree: 90}]->("player102" :player{age: 33, name: "LaMarcus Aldridge"})-[:follow@0 {degree: 75}]->("player101" :player{age: 36, name: "Tony Parker"})>           |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
...
```

### Return vertices in a path

Use the `nodes()` function to return all vertices in a path.

```ngql
nebula> MATCH p=(v:player{name:"Tim Duncan"})-[]->(v2) \
        RETURN nodes(p);
+-------------------------------------------------------------------------------------------------------------+
| nodes(p)                                                                                                    |
+-------------------------------------------------------------------------------------------------------------+
| [("player100" :player{age: 42, name: "Tim Duncan"}), ("team204" :team{name: "Spurs"})]                      |
| [("player100" :player{age: 42, name: "Tim Duncan"}), ("player101" :player{age: 36, name: "Tony Parker"})]   |
| [("player100" :player{age: 42, name: "Tim Duncan"}), ("player125" :player{age: 41, name: "Manu Ginobili"})] |
+-------------------------------------------------------------------------------------------------------------+
```

### Return edges in a path

Use the `relationships()` function to return all edges in a path.

```ngql
nebula> MATCH p=(v:player{name:"Tim Duncan"})-[]->(v2) \
        RETURN relationships(p);
+-------------------------------------------------------------------------+
| relationships(p)                                                        |
+-------------------------------------------------------------------------+
| [[:serve "player100"->"team204" @0 {end_year: 2016, start_year: 1997}]] |
| [[:follow "player100"->"player101" @0 {degree: 95}]]                    |
| [[:follow "player100"->"player125" @0 {degree: 95}]]                    |
+-------------------------------------------------------------------------+
```

### Return path length

Use the `length()` function to return the length of a path.

```ngql
nebula> MATCH p=(v:player{name:"Tim Duncan"})-[*..2]->(v2) \
        RETURN p AS Paths, length(p) AS Length;
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------+
| Paths                                                                                                                                                                                                                  | Length |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------+
| <("player100" :player{age: 42, name: "Tim Duncan"})-[:serve@0 {end_year: 2016, start_year: 1997}]->("team204" :team{name: "Spurs"})>                                                                                   | 1      |
| <("player100" :player{age: 42, name: "Tim Duncan"})-[:follow@0 {degree: 95}]->("player101" :player{age: 36, name: "Tony Parker"})>                                                                                     | 1      |
| <("player100" :player{age: 42, name: "Tim Duncan"})-[:follow@0 {degree: 95}]->("player125" :player{age: 41, name: "Manu Ginobili"})>                                                                                   | 1      |
| <("player100" :player{age: 42, name: "Tim Duncan"})-[:follow@0 {degree: 95}]->("player101" :player{age: 36, name: "Tony Parker"})-[:serve@0 {end_year: 2018, start_year: 1999}]->("team204" :team{name: "Spurs"})>     | 2      |
| <("player100" :player{age: 42, name: "Tim Duncan"})-[:follow@0 {degree: 95}]->("player101" :player{age: 36, name: "Tony Parker"})-[:serve@0 {end_year: 2019, start_year: 2018}]->("team215" :team{name: "Hornets"})>   | 2      |
| <("player100" :player{age: 42, name: "Tim Duncan"})-[:follow@0 {degree: 95}]->("player101" :player{age: 36, name: "Tony Parker"})-[:follow@0 {degree: 95}]->("player100" :player{age: 42, name: "Tim Duncan"})>        | 2      |
| <("player100" :player{age: 42, name: "Tim Duncan"})-[:follow@0 {degree: 95}]->("player101" :player{age: 36, name: "Tony Parker"})-[:follow@0 {degree: 90}]->("player102" :player{age: 33, name: "LaMarcus Aldridge"})> | 2      |
| <("player100" :player{age: 42, name: "Tim Duncan"})-[:follow@0 {degree: 95}]->("player101" :player{age: 36, name: "Tony Parker"})-[:follow@0 {degree: 95}]->("player125" :player{age: 41, name: "Manu Ginobili"})>     | 2      |
| <("player100" :player{age: 42, name: "Tim Duncan"})-[:follow@0 {degree: 95}]->("player125" :player{age: 41, name: "Manu Ginobili"})-[:serve@0 {end_year: 2018, start_year: 2002}]->("team204" :team{name: "Spurs"})>   | 2      |
| <("player100" :player{age: 42, name: "Tim Duncan"})-[:follow@0 {degree: 95}]->("player125" :player{age: 41, name: "Manu Ginobili"})-[:follow@0 {degree: 90}]->("player100" :player{age: 42, name: "Tim Duncan"})>      | 2      |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------+
```



## Return all elements

To return all the elements that this pattern matches, use an asterisk (*).

```ngql
nebula> MATCH (v:player{name:"Tim Duncan"}) \
        RETURN *;
+----------------------------------------------------+
| v                                                  |
+----------------------------------------------------+
| ("player100" :player{age: 42, name: "Tim Duncan"}) |
+----------------------------------------------------+

nebula> MATCH (v:player{name:"Tim Duncan"})-[e]->(v2) \
        RETURN *;
+----------------------------------------------------+-----------------------------------------------------------------------+-------------------------------------------------------+
| v                                                  | e                                                                     | v2                                                    |
+----------------------------------------------------+-----------------------------------------------------------------------+-------------------------------------------------------+
| ("player100" :player{age: 42, name: "Tim Duncan"}) | [:follow "player100"->"player101" @0 {degree: 95}]                    | ("player101" :player{age: 36, name: "Tony Parker"})   |
| ("player100" :player{age: 42, name: "Tim Duncan"}) | [:follow "player100"->"player125" @0 {degree: 95}]                    | ("player125" :player{age: 41, name: "Manu Ginobili"}) |
| ("player100" :player{age: 42, name: "Tim Duncan"}) | [:serve "player100"->"team204" @0 {end_year: 2016, start_year: 1997}] | ("team204" :team{name: "Spurs"})                      |
+----------------------------------------------------+-----------------------------------------------------------------------+-------------------------------------------------------+
```

## Rename a field

Use the `AS <alias>` syntax to rename a field in the output.

```ngql
nebula> MATCH (v:player{name:"Tim Duncan"})-[:serve]->(v2) \
        RETURN v2.team.name AS Team;
+---------+
| Team    |
+---------+
| "Spurs" |
+---------+

nebula> RETURN "Amber" AS Name;
+---------+
| Name    |
+---------+
| "Amber" |
+---------+
```

## Return a non-existing property

If a property matched does not exist, `NULL` is returned.

```ngql
nebula> MATCH (v:player{name:"Tim Duncan"})-[e]->(v2) \
        RETURN v2.player.name, type(e), v2.player.age;
+-----------------+----------+---------------+
| v2.player.name  | type(e)  | v2.player.age |
+-----------------+----------+---------------+
| "Manu Ginobili" | "follow" | 41            |
| __NULL__        | "serve"  | __NULL__      |
| "Tony Parker"   | "follow" | 36            |
+-----------------+----------+---------------+
```

## Return expression results

To return the results of expressions such as literals, functions, or predicates, set them in a `RETURN` clause.

```ngql
nebula> MATCH (v:player{name:"Tony Parker"})-->(v2:player) \
        RETURN DISTINCT v2.player.name, "Hello"+" graphs!", v2.player.age > 35;
+---------------------+----------------------+--------------------+
| v2.player.name      | ("Hello"+" graphs!") | (v2.player.age>35) |
+---------------------+----------------------+--------------------+
| "LaMarcus Aldridge" | "Hello graphs!"      | false              |
| "Tim Duncan"        | "Hello graphs!"      | true               |
| "Manu Ginobili"     | "Hello graphs!"      | true               |
+---------------------+----------------------+--------------------+

nebula> RETURN 1+1;
+-------+
| (1+1) |
+-------+
| 2     |
+-------+

nebula> RETURN 1- -1;
+----------+
| (1--(1)) |
+----------+
| 2        |
+----------+

nebula> RETURN 3 > 1;
+-------+
| (3>1) |
+-------+
| true  |
+-------+

nebula> RETURN 1+1, rand32(1, 5);
+-------+-------------+
| (1+1) | rand32(1,5) |
+-------+-------------+
| 2     | 1           |
+-------+-------------+
```

## Return unique fields

Use `DISTINCT` to remove duplicate fields in the result set.

```ngql
# Before using DISTINCT.
nebula> MATCH (v:player{name:"Tony Parker"})--(v2:player) \
        RETURN v2.player.name, v2.player.age;
+---------------------+---------------+
| v2.player.name      | v2.player.age |
+---------------------+---------------+
| "Manu Ginobili"     | 41            |
| "Boris Diaw"        | 36            |
| "Marco Belinelli"   | 32            |
| "Dejounte Murray"   | 29            |
| "Tim Duncan"        | 42            |
| "Tim Duncan"        | 42            |
| "LaMarcus Aldridge" | 33            |
| "LaMarcus Aldridge" | 33            |
+---------------------+---------------+

# After using DISTINCT.
nebula> MATCH (v:player{name:"Tony Parker"})--(v2:player) \
        RETURN DISTINCT v2.player.name, v2.player.age;
+---------------------+---------------+
| v2.player.name      | v2.player.age |
+---------------------+---------------+
| "Manu Ginobili"     | 41            |
| "Boris Diaw"        | 36            |
| "Marco Belinelli"   | 32            |
| "Dejounte Murray"   | 29            |
| "Tim Duncan"        | 42            |
| "LaMarcus Aldridge" | 33            |
+---------------------+---------------+
```
