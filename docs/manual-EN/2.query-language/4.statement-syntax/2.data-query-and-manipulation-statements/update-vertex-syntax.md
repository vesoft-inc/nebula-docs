# UPDATE VERTEX Syntax

**Nebula Graph** supports `UPDATE VERTEX` properties of a vertex, as well as CAS operation and returning related properties. The `UPDATE VERTEX` statement only updates one tag of a vertex at a time.

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

```ngql
nebula> UPDATE VERTEX 200 SET player.name = 'Cory Joseph' WHEN $^.team.name == 'Rocket';
[ERROR (-8)]: Maybe invalid tag or property in SET/YIELD clause!
```

`UPDATE VERTEX` does not support multiple tags, so an error occurs here.
