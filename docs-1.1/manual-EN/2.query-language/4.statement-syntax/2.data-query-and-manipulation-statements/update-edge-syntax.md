# UPDATE EDGE Syntax

**Nebula Graph** supports `UPDATE EDGE` properties of an edge, as well as CAS operation and returning related properties. The `UPDATE EDGE` statement only updates one edge-type of an edge at a time.

```ngql
UPDATE EDGE <edge> SET <update_columns> [WHEN <condition>] [YIELD <columns>]
```

**NOTE:** `WHEN` and `YIELD` are optional.

- `edge` is the edge to be updated, the syntax is `<src> -> <dst> [@rank] OF <edge_type>`.
- `update_columns` is the properties of the edge to be updated.
- `condition` is some constraints, only when met, `UPDATE` will run successfully and expression operations are supported.
- `columns` is the columns to be returned, `YIELD` returns the latest updated values.

Consider the following example:

```ngql
nebula> UPDATE EDGE 100 -> 200@0 OF serve SET start_year = serve.start_year + 1 \
YIELD $^.player.name AS name, serve.start_year AS start;
```
