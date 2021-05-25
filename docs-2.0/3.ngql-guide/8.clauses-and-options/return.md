# RETURN

`RETURN` defines the output of an nGQL query. To return multiple fields, separate them with commas.

`RETURN` can lead a clause or a statement:

* A `RETURN` clause works in openCypher statements in nGQL, such as `MATCH` or `UNWIND`.
* A `RETURN` statement works independently to output the result of an expression.

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

## NGQL compatibility

* In nGQL 1.0, `RETURN` works with native nGQL with the syntax `RETURN <var_ref> IF <var_ref> IS NOT NULL`.

* In nGQL 2.0, `RETURN` does not work with native nGQL.

## Return vertices

Set a vertex in the `RETURN` clause to return it.

```ngql
nebula> MATCH (v:player) \
        RETURN v;
+---------------------------------------------------------------+
| v                                                             |
+---------------------------------------------------------------+
| ("player104" :player{age: 32, name: "Marco Belinelli"})       |
+---------------------------------------------------------------+
| ("player107" :player{age: 32, name: "Aron Baynes"})           |
+---------------------------------------------------------------+
| ("player116" :player{age: 34, name: "LeBron James"})          |
+---------------------------------------------------------------+
| ("player120" :player{age: 29, name: "James Harden"})          |
+---------------------------------------------------------------+
| ("player125" :player{age: 41, name: "Manu Ginobili"})         |
+---------------------------------------------------------------+
...
Got 51 rows (time spent 7322/8244 us)
```

## Return edges

Set an edge in the `RETURN` clause to return it.

```ngql
nebula> MATCH (v:player)-[e]->() \
        RETURN e;
+------------------------------------------------------------------------------+
| e                                                                            |
+------------------------------------------------------------------------------+
| [:follow "player104"->"player100" @0 {degree: 55}]                           |
+------------------------------------------------------------------------------+
| [:follow "player104"->"player101" @0 {degree: 50}]                           |
+------------------------------------------------------------------------------+
| [:follow "player104"->"player105" @0 {degree: 60}]                           |
+------------------------------------------------------------------------------+
| [:serve "player104"->"team200" @0 {end_year: 2009, start_year: 2007}]        |
+------------------------------------------------------------------------------+
| [:serve "player104"->"team208" @0 {end_year: 2016, start_year: 2015}]        |
+------------------------------------------------------------------------------+
...
Got 233 rows (time spent 14013/16136 us)
```

## Return properties

To return a vertex or edge property, use the `{<vertex_name>|<edge_name>}.<property>` syntax.

```ngql
nebula> MATCH (v:player) \
        RETURN v.name, v.age \
        LIMIT 3;
+-------------------+-------+
| v.name            | v.age |
+-------------------+-------+
| "Rajon Rondo"     | 33    |
+-------------------+-------+
| "Rudy Gay"        | 32    |
+-------------------+-------+
| "Dejounte Murray" | 29    |
+-------------------+-------+
Got 3 rows (time spent 2663/3260 us)
```

## Return all elements

To return all the elements matched on a pattern, use an asterisk (*).

```ngql
nebula> MATCH (v:player{name:"Tim Duncan"}) \
        RETURN *;
+----------------------------------------------------+
| v                                                  |
+----------------------------------------------------+
| ("player100" :player{age: 42, name: "Tim Duncan"}) |
+----------------------------------------------------+
Got 1 rows (time spent 3332/3954 us)

nebula> MATCH (v:player{name:"Tim Duncan"})-[e]->(v2) \
        RETURN *;
+----------------------------------------------------+-----------------------------------------------------------------------+-------------------------------------------------------+
| v                                                  | e                                                                     | v2                                                    |
+----------------------------------------------------+-----------------------------------------------------------------------+-------------------------------------------------------+
| ("player100" :player{age: 42, name: "Tim Duncan"}) | [:follow "player100"->"player101" @0 {degree: 95}]                    | ("player101" :player{age: 36, name: "Tony Parker"})   |
+----------------------------------------------------+-----------------------------------------------------------------------+-------------------------------------------------------+
| ("player100" :player{age: 42, name: "Tim Duncan"}) | [:follow "player100"->"player125" @0 {degree: 95}]                    | ("player125" :player{age: 41, name: "Manu Ginobili"}) |
+----------------------------------------------------+-----------------------------------------------------------------------+-------------------------------------------------------+
| ("player100" :player{age: 42, name: "Tim Duncan"}) | [:serve "player100"->"team204" @0 {end_year: 2016, start_year: 1997}] | ("team204" :team{name: "Spurs"})                      |
+----------------------------------------------------+-----------------------------------------------------------------------+-------------------------------------------------------+
Got 3 rows (time spent 3957/4696 us)
```

## Rename a field

Use the `AS <alias>` syntax to rename a field in the output.

```ngql
nebula> MATCH (v:player{name:"Tim Duncan"})-[:serve]->(v2) \
        RETURN v2.name AS Team;
+---------+
| Team    |
+---------+
| "Spurs" |
+---------+
Got 1 rows (time spent 2370/3017 us)

nebula> RETURN "Amber" AS Name;
+---------+
| Name    |
+---------+
| "Amber" |
+---------+
Got 1 rows (time spent 380/1097 us)
```

## Return a non-existing property

If a property matched does not exist, `NULL` is returned.

```ngql
nebula> MATCH (v:player{name:"Tim Duncan"})-[e]->(v2) \
        RETURN v2.name, type(e), v2.age;
+-----------------+----------+----------+
| v2.name         | type(e)  | v2.age   |
+-----------------+----------+----------+
| "Tony Parker"   | "follow" | 36       |
+-----------------+----------+----------+
| "Manu Ginobili" | "follow" | 41       |
+-----------------+----------+----------+
| "Spurs"         | "serve"  | __NULL__ |
+-----------------+----------+----------+
Got 3 rows (time spent 2976/3658 us)
```

## Return expression results

To return the results of expressions such as literals, functions, or predicates, set them in a `RETURN` clause.

```ngql
nebula> MATCH (v:player{name:"Tony Parker"})-->(v2:player) \
        RETURN DISTINCT v2.name, "Hello"+" graphs!", v2.age > 35;
+---------------------+------------------+-------------+
| v2.name             | (Hello+ graphs!) | (v2.age>35) |
+---------------------+------------------+-------------+
| "Tim Duncan"        | "Hello graphs!"  | true        |
+---------------------+------------------+-------------+
| "LaMarcus Aldridge" | "Hello graphs!"  | false       |
+---------------------+------------------+-------------+
| "Manu Ginobili"     | "Hello graphs!"  | true        |
+---------------------+------------------+-------------+
Got 3 rows (time spent 2645/3237 us)

nebula> RETURN 1+1;
+-------+
| (1+1) |
+-------+
| 2     |
+-------+
Got 1 rows (time spent 319/1238 us)

nebula> RETURN 3 > 1;
+-------+
| (3>1) |
+-------+
| true  |
+-------+
Got 1 rows (time spent 205/751 us)

RETURN 1+1, rand32(1, 5);
+-------+-------------+
| (1+1) | rand32(1,5) |
+-------+-------------+
| 2     | 1           |
+-------+-------------+
Got 1 rows (time spent 258/1098 us)
```

## Return unique fields

Use `DISTINCT` to remove duplicate fields in the result set.

```ngql
// Before using DISTINCT
nebula> MATCH (v:player{name:"Tony Parker"})--(v2:player) \
        RETURN v2.name, v2.age;
+---------------------+--------+
| v2.name             | v2.age |
+---------------------+--------+
| "Tim Duncan"        | 42     |
+---------------------+--------+
| "LaMarcus Aldridge" | 33     |
+---------------------+--------+
| "Marco Belinelli"   | 32     |
+---------------------+--------+
| "Boris Diaw"        | 36     |
+---------------------+--------+
| "Dejounte Murray"   | 29     |
+---------------------+--------+
| "Tim Duncan"        | 42     |
+---------------------+--------+
| "LaMarcus Aldridge" | 33     |
+---------------------+--------+
| "Manu Ginobili"     | 41     |
+---------------------+--------+
Got 8 rows (time spent 3273/3893 us)

// After using DISTINCT
MATCH (v:player{name:"Tony Parker"})--(v2:player) RETURN DISTINCT v2.name, v2.age;
+---------------------+--------+
| v2.name             | v2.age |
+---------------------+--------+
| "Tim Duncan"        | 42     |
+---------------------+--------+
| "LaMarcus Aldridge" | 33     |
+---------------------+--------+
| "Marco Belinelli"   | 32     |
+---------------------+--------+
| "Boris Diaw"        | 36     |
+---------------------+--------+
| "Dejounte Murray"   | 29     |
+---------------------+--------+
| "Manu Ginobili"     | 41     |
+---------------------+--------+
Got 6 rows (time spent 3314/3897 us)
```
