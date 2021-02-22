# WITH

## OpenCypher compatibility

The `WITH` clause can take the output from a query part, process it, and pass it to the next query part as the input.

`WITH` has a similar function with the [pipe](../5.operators/4.pipe.md) symbol in nGQL-extension, but they work in different ways.

`WITH` only works in the openCypher syntax, such as in `MATCH` or `UNWIND`.

In the nGQL-extensions such as `GO` or `FETCH`, use pipe symbols (`|`) instead.

> **DON'T:** Don't use pipe symbols in the openCypher syntax or use `WITH` in the nGQL extensions.

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
+----------------------------------------------------------------------+
| ("player101" :player{age: 36, name: "Tony Parker"})                  |
+----------------------------------------------------------------------+
| ("team204" :team{name: "Spurs"})                                     |
+----------------------------------------------------------------------+
| ("player102" :player{age: 33, name: "LaMarcus Aldridge"})            |
+----------------------------------------------------------------------+
| ("player125" :player{age: 41, name: "Manu Ginobili"})                |
+----------------------------------------------------------------------+
| ("player104" :player{age: 32, name: "Marco Belinelli"})              |
+----------------------------------------------------------------------+
| ("player144" :player{age: 47, name: "Shaquile O'Neal"})              |
+----------------------------------------------------------------------+
| ("player105" :player{age: 31, name: "Danny Green"})                  |
+----------------------------------------------------------------------+
| ("player113" :player{age: 29, name: "Dejounte Murray"})              |
+----------------------------------------------------------------------+
| ("player107" :player{age: 32, name: "Aron Baynes"})                  |
+----------------------------------------------------------------------+
| ("player109" :player{age: 34, name: "Tiago Splitter"})               |
+----------------------------------------------------------------------+
| ("player108" :player{age: 36, name: "Boris Diaw"})                   |
+----------------------------------------------------------------------+
Got 12 rows (time spent 3795/4487 us)
```

### Example 2

The following statement:

1. Matches a vertex with the VID "player100".
2. Outputs all the tags of the vertex into a list with the `labels()` function.
3. Unwinds the list into rows.
4. Returns the rows.

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
+----------+
| "player" |
+----------+
| "person" |
+----------+
Got 3 rows (time spent 1709/2495 us)
```

## Filter aggregated queries

`WITH` can work as a filter in the middle of an aggregated query.

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
+----------------------+-----+
| "Ben Simmons"        | 22  |
+----------------------+-----+
| "Kristaps Porzingis" | 23  |
+----------------------+-----+
Got 3 rows (time spent 7444/8467 us)
```

## Process the output before using collect() on it

Use a `WITH` clause to sort and limit the output before using `collect()` to transform the output into a list.

```ngql
nebula> MATCH (v:player) \
        WITH v.name AS Name \
        ORDER BY Name DESC \
        LIMIT 3 \
        RETURN collect(Name);
+-----------------------------------------------+
| COLLECT(Name)                                 |
+-----------------------------------------------+
| ["Yao Ming", "Vince Carter", "Tracy McGrady"] |
+-----------------------------------------------+
Got 1 rows (time spent 3498/4222 us)
```
