# WITH

The `WITH` clause can retrieve the output from a query part, process it, and pass it to the next query part as the input.

## OpenCypher compatibility

This topic applies to openCypher syntax only.

!!! Note

    `WITH` has a similar function with the [Pipe](../5.operators/4.pipe.md) symbol in native nGQL, but they work in different ways. DO NOT use pipe symbols in the openCypher syntax or use `WITH` in native nGQL statements.

## Combine statements and form a composite query

Use a `WITH` clause to combine statements and transfer the output of a statement as the input of another statement.

### Example 1

The following statement:

1. Matches a path.
2. Outputs all the vertices on the path to a list with the `nodes()` function.
3. Unwinds the list into rows.
4. Removes duplicated vertices and returns a set of distinct vertices.

```ngql
nebula> MATCH p=(v:player{name:"Tim Duncan"})--() \
        WITH nodes(p) AS n \
        UNWIND n AS n1 \
        RETURN DISTINCT n1;
+----------------------------------------------------------------------+
| n1                                                                   |
+----------------------------------------------------------------------+
| ("player100" :star{} :person{} :player{age: 42, name: "Tim Duncan"}) |
| ("player101" :player{age: 36, name: "Tony Parker"})                  |
| ("team204" :team{name: "Spurs"})                                     |
| ("player102" :player{age: 33, name: "LaMarcus Aldridge"})            |
| ("player125" :player{age: 41, name: "Manu Ginobili"})                |
| ("player104" :player{age: 32, name: "Marco Belinelli"})              |
| ("player144" :player{age: 47, name: "Shaquile O'Neal"})              |
| ("player105" :player{age: 31, name: "Danny Green"})                  |
| ("player113" :player{age: 29, name: "Dejounte Murray"})              |
| ("player107" :player{age: 32, name: "Aron Baynes"})                  |
| ("player109" :player{age: 34, name: "Tiago Splitter"})               |
| ("player108" :player{age: 36, name: "Boris Diaw"})                   |
+----------------------------------------------------------------------+
```

### Example 2

The following statement:

1. Matches the vertex with the VID `player100`.
2. Outputs all the tags of the vertex into a list with the `labels()` function.
3. Unwinds the list into rows.
4. Returns the output.

```ngql
nebula> MATCH (v) \
        WHERE id(v)=="player100" \
        WITH labels(v) AS tags_unf \
        UNWIND tags_unf AS tags_f \
        RETURN tags_f;
+----------+
| tags_f   |
+----------+
| "star"   |
| "player" |
| "person" |
+----------+
```

## Filter composite queries

`WITH` can work as a filter in the middle of a composite query.

```ngql
nebula> MATCH (v:player)-->(v2:player) \
        WITH DISTINCT v2 AS v2, v2.age AS Age \
        ORDER BY Age \
        WHERE Age<25 \
        RETURN v2.name AS Name, Age;
+----------------------+-----+
| Name                 | Age |
+----------------------+-----+
| "Luka Doncic"        | 20  |
| "Ben Simmons"        | 22  |
| "Kristaps Porzingis" | 23  |
+----------------------+-----+
```

## Process the output before using collect()

Use a `WITH` clause to sort and limit the output before using `collect()` to transform the output into a list.

```ngql
nebula> MATCH (v:player) \
        WITH v.name AS Name \
        ORDER BY Name DESC \
        LIMIT 3 \
        RETURN collect(Name);
+-----------------------------------------------+
| collect(Name)                                 |
+-----------------------------------------------+
| ["Yao Ming", "Vince Carter", "Tracy McGrady"] |
+-----------------------------------------------+
```

## Use with RETURN

Set an alias using a `WITH` clause, and then output the result through a `RETURN` clause.

```ngql
nebula> WITH [1, 2, 3] AS list  RETURN 3 IN list AS r;
+------+
| r    |
+------+
| true |
+------+

nebula> WITH 4 AS one, 3 AS two RETURN one > two AS result;
+--------+
| result |
+--------+
| true   |
+--------+
```
