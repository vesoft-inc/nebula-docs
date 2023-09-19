# UNWIND

`UNWIND` transform a list into a sequence of rows.

`UNWIND` can be used as an individual statement or as a clause within a statement.

## UNWIND statement

### Syntax

```ngql 
UNWIND <list> AS <alias> <RETURN clause>;
```

### Examples

- To transform a list.

  ```ngql
  nebula> UNWIND [1,2,3] AS n RETURN n;
  +---+
  | n |
  +---+
  | 1 |
  | 2 |
  | 3 |
  +---+
  ```

## UNWIND clause

### Syntax

- The `UNWIND` clause in native nGQL statements.

  !!! note

        To use a `UNWIND` clause in a native nGQL statement, use it after the `|` operator and use the `$-` prefix for variables. If you use a statement or clause after the `UNWIND` clause, use the `|` operator and use the `$-` prefix for variables.


  ```ngql
  <statement> | UNWIND $-.<var> AS <alias> <|> <clause>;
  ```


- The `UNWIND` clause in openCypher statements.

  ```
  <statement> UNWIND <list> AS <alias> <RETURN clause>；
  ```

### Examples

- To transform a list of duplicates into a unique set of rows using `WITH DISTINCT` in a `UNWIND` clause.

  !!! note
      
      `WITH DISTINCT` is not available in native nGQL statements.  

  ```ngql
  // Transform the list `[1,1,2,2,3,3]` into a unique set of rows, sort the rows, and then transform the rows into a list of unique values.

  nebula> WITH [1,1,2,2,3,3] AS n \
          UNWIND n AS r \
          WITH DISTINCT r AS r \
          ORDER BY r \
          RETURN collect(r);
  +------------+
  | collect(r) |
  +------------+
  | [1, 2, 3]  |
  +------------+
  ```

- To use an `UNWIND` clause in a `MATCH` statement.

  ```ngql
  // Get a list of the vertices in the matched path, transform the list into a unique set of rows, and then transform the rows into a list. 

  nebula> MATCH p=(v:player{name:"Tim Duncan"})--(v2) \
          WITH nodes(p) AS n \
          UNWIND n AS r \
          WITH DISTINCT r AS r \
          RETURN collect(r);
  +----------------------------------------------------------------------------------------------------------------------+
  | collect(r)                                                                                                           |
  +----------------------------------------------------------------------------------------------------------------------+
  | [("player100" :player{age: 42, name: "Tim Duncan"}), ("player101" :player{age: 36, name: "Tony Parker"}),            |
  |("team204" :team{name: "Spurs"}), ("player102" :player{age: 33, name: "LaMarcus Aldridge"}),                          |
  |("player125" :player{age: 41, name: "Manu Ginobili"}), ("player104" :player{age: 32, name: "Marco Belinelli"}),       |
  |("player144" :player{age: 47, name: "Shaquile O'Neal"}), ("player105" :player{age: 31, name: "Danny Green"}),         |
  |("player113" :player{age: 29, name: "Dejounte Murray"}), ("player107" :player{age: 32, name: "Aron Baynes"}),         |
  |("player109" :player{age: 34, name: "Tiago Splitter"}), ("player108" :player{age: 36, name: "Boris Diaw"})]           |  
  +----------------------------------------------------------------------------------------------------------------------+
  ```

- To use an `UNWIND` clause in a `GO` statement.

  ```ngql 
  // Query the vertices in a list for the corresponding edges with a specified statement.

  nebula> YIELD ['player101', 'player100'] AS a | UNWIND $-.a AS  b | GO FROM $-.b OVER follow YIELD edge AS e;
  +----------------------------------------------------+
  | e                                                  |
  +----------------------------------------------------+
  | [:follow "player101"->"player100" @0 {degree: 95}] |
  | [:follow "player101"->"player102" @0 {degree: 90}] |
  | [:follow "player101"->"player125" @0 {degree: 95}] |
  | [:follow "player100"->"player101" @0 {degree: 95}] |
  | [:follow "player100"->"player125" @0 {degree: 95}] |
  +----------------------------------------------------+
  ```

- To use an `UNWIND` clause in a `LOOKUP` statement.

  ```ngql
  // Find all the properties of players whose age is greater than 46, get a list of unique properties, and then transform the list into rows. 

  nebula> LOOKUP ON player \
          WHERE player.age > 46 \
          YIELD DISTINCT keys(vertex) as p | UNWIND $-.p as a | YIELD $-.a AS a;
  +--------+
  | a      |
  +--------+
  | "age"  |
  | "name" |
  +--------+
  ```

- To use an `UNWIND` clause in a `FETCH` statement. 

  ```ngql
  // Query player101 for all tags related to player101, get a list of the tags and then transform the list into rows.

  nebula> CREATE TAG hero(like string, height int);
          INSERT VERTEX hero(like, height) VALUES "player101":("deep", 182);
          FETCH PROP ON * "player101" \
          YIELD tags(vertex) as t | UNWIND $-.t as a | YIELD $-.a AS a;
  +----------+
  | a        |
  +----------+
  | "hero"   |
  | "player" |
  +----------+
  ```
  
- To use an `UNWIND` clause in a `GET SUBGRAPH` statement. 

  ```ngql
  // Get the subgraph including outgoing and incoming serve edges within 0~2 hops from/to player100, and transform the result into rows.

  nebula> GET SUBGRAPH 2 STEPS FROM "player100" BOTH serve \
          YIELD edges as e | UNWIND $-.e as a | YIELD $-.a AS a;
  +----------------------------------------------+
  | a                                            |
  +----------------------------------------------+
  | [:serve "player100"->"team204" @0 {}]        |
  | [:serve "player101"->"team204" @0 {}]        |
  | [:serve "player102"->"team204" @0 {}]        |
  | [:serve "player103"->"team204" @0 {}]        |
  | [:serve "player105"->"team204" @0 {}]        |
  | [:serve "player106"->"team204" @0 {}]        |
  | [:serve "player107"->"team204" @0 {}]        |
  | [:serve "player108"->"team204" @0 {}]        |
  | [:serve "player109"->"team204" @0 {}]        |
  | [:serve "player110"->"team204" @0 {}]        |
  | [:serve "player111"->"team204" @0 {}]        |
  | [:serve "player112"->"team204" @0 {}]        |
  | [:serve "player113"->"team204" @0 {}]        |
  | [:serve "player114"->"team204" @0 {}]        |
  | [:serve "player125"->"team204" @0 {}]        |
  | [:serve "player138"->"team204" @0 {}]        |
  | [:serve "player104"->"team204" @20132015 {}] |
  | [:serve "player104"->"team204" @20182019 {}] |
  +----------------------------------------------+
  ```

- To use an `UNWIND` clause in a `FIND PATH` statement.

  ```ngql
  // Find all the vertices in the shortest path from player101 to team204 along the serve edge, and transform the result into rows. 

  nebula> FIND SHORTEST PATH FROM "player101" TO "team204" OVER serve \
          YIELD path as p | YIELD nodes($-.p) AS nodes | UNWIND $-.nodes AS a | YIELD $-.a AS a;
  +---------------+
  | a             |
  +---------------+
  | ("player101") |
  | ("team204")   |
  +---------------+
  ```
