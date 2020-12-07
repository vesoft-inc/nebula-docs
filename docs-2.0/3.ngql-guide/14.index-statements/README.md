# Index overview

Indexes are built to fast process graph queries. Nebula Graph supports two kinds of indexes: native indexes and full-text indexes. This topic introduces the index types and helps choose the right index.

## Native indexes

Native indexes allow querying data based on a given property. There are two kinds of native indexes: tag index and edge type index. Native indexes must be updated manually. You can use the `REBUILD INDEX` statement to update native indexes. Native indexes support indexing multiple properties on a tag or an edge type (composite indexes), but do not support indexing across multiple tags or edge types.

You can do partial match search by using composite indexes. Use composite indexes only for partial match searches when the declared fields in the composite index are used from left to right. For more information, see [LOOKUP FAQ](../7.general-query-statements/5.lookup.md#FAQ).

String operators like `CONTAINS` and `STARTS WITH` are not allowed in native index searching. Use full-text indexes to do fuzzy search.

### Operations on native indexes

You can do the following operations against native indexes:

- [Create index](1.create-native-index.md)
- [Show index](2.show-native-indexes.md)
- [Describe index](3.describe-native-index.md)
- [Rebuild index](4.rebuild-native-index.md)
- [Show index status](5.show-native-index-status.md)
- [Drop index](6.drop-native-index.md)
- [Query index](../7.general-query-statements/5.lookup.md)

## Full-text indexes

Full-text indexes are used to do prefix, wildcard, regexp, and fuzzy search on a string property. Full-text indexes allow indexing just one property. Only strings within a specified length (no longer than 256 bytes) are indexed. Full-text indexes do not support logical operations such as `AND`, `OR` and `NOT`. To do complete text match, use native indexes.

### Operations on full-text indexes

Before doing any operations on full-text indexes, please mak sure that you deploy full-text indexes. Details on full-text indexes deployment, see [Deploy full-text index](../../4.deployment-and-installation/6.deploy-text-based-index/2.deploy.md). At this time, full-text indexes are created automatically on the Elasticsearch cluster. And rebuilding or altering full-text indexes are not supported. To drop full-text indexes, you need to drop them on the Elasticsearch cluster manually. To query full-text indexes, see [Search with full-text indexes](7.search-with-text-based-index.md).

## Null values

Indexes do not support indexing null values at this time.

## Range queries

In addition to querying single results from native indexes, you can also do range queries. Not all the native indexes support range queries. You can only do range search for numeric, date, and time type properties.
