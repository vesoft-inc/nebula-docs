# DROP TAG Syntax

```ngql
DROP TAG [IF EXISTS] <tag_name>
```

You must have the DROP privilege for the tag.

> **NOTE**: Be careful with this statement. When dropping a tag, **Nebula Graph** will only check whether the tag is associated with any indexes. If so the deletion is rejected.

Please refer to [Index Documentation](index.md) on details about index.

You can use the `If EXISTS` keywords when dropping tags. These keywords automatically detect if the corresponding tag exists. If it exists, it will be deleted. Otherwise, no tag is deleted.

A vertex can have one or more tags (types).

If a vertex has only one tag, after the tag is dropped, the vertex can NOT be accessible. But its edges are available. If a vertex has multiple tags, after one tag is dropped, the vertex is still accessible. But all the properties defined by this dropped tag are not accessible.

This operation only deletes the Schema data, all the files and directories in the disk are NOT deleted directly, data is deleted in the next compaction.
