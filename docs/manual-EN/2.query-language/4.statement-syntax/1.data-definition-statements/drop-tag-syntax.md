# DROP TAG Syntax

```ngql
DROP TAG [IF EXISTS] <tag_name>
```

You must have the DROP privilege for the tag.

> Be careful with this statement.

**Note:** When dropping a tag, **Nebula Graph** will only check whether the tag is associated with any indexes. If so the deletion is rejected.

Please refer to [Index Documentation](index.md) on details about index.

You can use the `If EXISTS` keywords when dropping tags. These keywords automatically detect if the corresponding tag exists. If it exists, it will be deleted. Otherwise, no tag is deleted.

A vertex can have one to more tags (types).

If vertices have only one tag, after dropping the tag, vertices labelled with this tag can NOT be accessible. But the edges connected with the vertices are available.
If vertices have multiple tags, after dropping one of the tags, the vertices are still accessible. But all the properties defined by this dropped tag are not accessible.

This operation only deletes the Schema data, all the files and directories in the disk are NOT deleted directly, data is deleted in the next compaction.
