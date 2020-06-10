# DELETE EDGE Syntax

The `DELETE EDGE` statement is used to delete edges. Given an edge type, the source vertex and the dest vertex, **Nebula Graph** supports `DELETE` the edge, its associated properties and the edge ranking. You can also delete an edge with a certain rank. The syntax is as follows:

```ngql
DELETE EDGE <edge_type> <vid> -> <vid>[@<ranking>] [, <vid> -> <vid> ...]
```

For example,

```ngql
nebula> DELETE EDGE follow 100 -> 200;
```

The above query deletes an edge whose source vertex is `100`, dest vertex is `200`, and the edge type is `follow`.

**Nebula Graph** will find the properties associated with the edge and delete all of them. Atomic operation is not guaranteed during the entire process for now, so please retry when failure occurs.
