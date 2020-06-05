# UPSERT Syntax

`UPSERT` is used to insert a new vertex or edge or update an existing one. If the vertex or edge doesn’t exist it will be created. `UPSERT` is a combination of `INSERT` and `UPDATE`.

The performance of `UPSERT` is much lower than that of `INSERT`, because `UPSERT` is a read-modify-write serialization operation at the partition level. So it is not suitable for large concurrent write scenarios.

- If the vertex or edge does not exist, a new one will be created regardless of whether the condition in WHEN clause is met. The property columns not specified by the `SET` statement use the default values of the columns, if there are no default values, an error will be returned;
- If the vertex or edge exists and the WHEN condition is met, the vertex or edge will be updated;
- If the vertex or edge exists and the WHEN condition is not met, nothing will be done.

```ngql
UPSERT {VERTEX <vid> | EDGE <edge>} SET <update_columns> [WHEN <condition>] [YIELD <columns>]
```

- `vid` is the ID of the vertex to be updated.
- `edge` is the edge to be updated, the syntax is `<src> -> <dst> [@ranking] OF <edge_type>`.
- `update_columns` is the properties of the vertex or edge to be updated, for example, `tag1.col1 = $^.tag2.col2 + 1` means to update `tag1.col1` to `tag2.col2+1`.

    **NOTE:**  `$^` indicates vertex to be updated.

- `condition` is some constraints, only when met, `UPSERT` will run successfully and expression operations are supported.
- `columns` is the columns to be returned, `YIELD` returns the latest updated values.

Consider the following example:

```ngql
nebula> INSERT VERTEX player(name, age) VALUES 111:("Ben Simmons", 22); -- Insert a new vertex.
nebula> UPSERT VERTEX 111 SET player.name = "Dwight Howard", player.age = $^.player.age + 11 WHEN $^.player.name == "Ben Simmons" && $^.player.age > 20 YIELD $^.player.name AS Name, $^.player.age AS Age; -- Do upsert on the vertex.
=======================
| Name          | Age |
=======================
| Dwight Howard | 33  |
-----------------------
```

```ngql
nebula> FETCH PROP ON * 111; -- An empty set is returned, indicating vertex 111 does not exist.
Empty set (Time spent: 3.069/4.382 ms)
nebula> UPSERT VERTEX 111 SET player.age = $^.player.age + 1;
```

When vertex 111 does not exist and the player's age has a default value, the player.age of vertex 111 is the default value + 1. If player.age does not have default value, an error will be reported.

```ngql
nebula> CREATE TAG person(followers int, age int DEFAULT 0); -- Create example tag person

nebula> UPSERT VERTEX 300 SET person.followers = $^.course.age + 1,  person.age = 8; -- followers is 1, age is 8

nebula> UPSERT VERTEX 300 SET person.age = 8, person.followers = $^.followers.age + 1; -- followers is 9, age is 8
```
