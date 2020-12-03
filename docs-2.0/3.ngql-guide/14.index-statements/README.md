# Index overview

Indexes are built to fast process graph queries. Nebula Graph supports two kinds of indexes: native indexes and full-text indexes. This topics introduces the index types and helps choose the right index.

## Native indexes

Native indexes allow querying data based on a given property. There are two kinds of native indexes: tag index and edge type index. Native indexes must be updated manually. You can use the `REBUILD INDEX` statement to update native indexes. Native indexes support indexing multiple properties on a tag or an edge type (composite indexes), but do not support indexing across multiple tags or edge types.

You can do partial match search by using composite indexes. Only use composite indexes for partial match searches when the declared fields in the composite index are used from left to right. For more information, see [LOOKUP FAQ](../7.general-query-statements/5.lookup.md#FAQ).

String operators like `CONTAINS`, `STARTS WITH` are not allowed in native index searching. Use full-text indexes to search.

### Operations against native indexes

You can do the following operations against native indexes:

- [Create index](1.create-native-index.md)
- [Show index](2.show-native-indexes.md)
- [Describe index](3.describe-native-index.md)
- [Rebuild index](4.rebuild-native-index.md)
- [Show index status](5.show-native-index-status.md)
- [Drop index](6.drop-native-index.md)
- [Query index](../7.general-query-statements/5.lookup.md)

## Full-text indexes

Full-text indexes are used to index the string properties for vertices or edges. A full-text index allows you to write queries to retrieve data within the contents of indexed string properties. You can use full-text index to do prefix, wildcard, regexp, and fuzzy search on string property. Full-text indexes do not support indexing multiple properties a tag or an edge type.

### Operations against full-text indexes

At this time, full-text indexes are created automatically in the Elasticsearch cluster. And rebuilding or altering full-text indexes are not supported. To drop full-text indexes, you need to drop them on the Elasticsearch cluster manually. To query full-text indexes, see [Search with full-text indexes](7.search-with-text-based-index.md)

## Null values

Indexes do not support indexing null values at this time.

## Range queries

In addition to querying single results from native indexes, you can also do range queries. Not all the native indexes support range queries. You can only do range search for numeric, date, and time type properties.
