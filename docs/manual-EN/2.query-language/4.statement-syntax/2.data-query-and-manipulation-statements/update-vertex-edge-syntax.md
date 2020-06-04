# UPDATE Syntax

**Nebula Graph** supports `UPDATE` properties of a vertex or an edge, as well as CAS operation and returning related properties. The `UPDATE` statement only updates one tag/edge-type of a vertex/edge at a time.

## Update Vertex

```ngql
UPDATE VERTEX <vid> SET <update_columns> [WHEN <condition>] [YIELD <columns>]
```

**NOTE:** `WHEN` and `YIELD` are optional.

- `vid` is the id of the vertex to be updated.
- `update_columns` is the properties of the vertex to be updated, for example, `tag1.col1 = $^.tag2.col2 + 1` means to update `tag1.col1` to `tag2.col2+1`.

    **NOTE:**  `$^` indicates vertex to be updated.

- `condition` is some constraints, only when met, `UPDATE` will run successfully and expression operations are supported.
- `columns` is the columns to be returned, `YIELD` returns the latest updated values.

Consider the following example:

```ngql
nebula> UPDATE VERTEX 101 SET player.age = $^.player.age + 1 \
WHEN $^.player.name == "Tony Parker" \
YIELD $^.player.name AS name, $^.player.age AS age;
```

There are one tag in vertex 101, namely player.

## Update Edge

```ngql
UPDATE EDGE <edge> SET <update_columns> [WHEN <condition>] [YIELD <columns>]
```

**NOTE:** `WHEN` and `YIELD` are optional.

- `edge` is the edge to be updated, the syntax is `<src> -> <dst> [@ranking] OF <edge_type>`.
- `update_columns` is the properties of the edge to be updated.
- `condition` is some constraints, only when met, `UPDATE` will run successfully and expression operations are supported.
- `columns` is the columns to be returned, `YIELD` returns the latest updated values.

Consider the following example:

```ngql
nebula> UPDATE EDGE 100 -> 200@0 OF serve SET start_year = serve.start_year + 1 \
YIELD $^.player.name AS name, serve.start_year AS start;
```
