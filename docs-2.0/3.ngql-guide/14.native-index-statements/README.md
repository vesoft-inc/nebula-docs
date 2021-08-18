# Index overview

Indexes are built to fast process graph queries. Nebula Graph supports two kinds of indexes: native indexes and full-text indexes. This topic introduces the index types and helps choose the right index.

## Native indexes

Native indexes allow querying data based on a given property. Features are as follows.

- There are two kinds of native indexes: tag index and edge type index.

- Native indexes must be updated manually. You can use the `REBUILD INDEX` statement to update native indexes.

- Native indexes support indexing multiple properties on a tag or an edge type (composite indexes), but do not support indexing across multiple tags or edge types.

- You can do partial match searches by using composite indexes. The declared fields in the composite index are used from left to right. For more information, see [LOOKUP FAQ](../7.general-query-statements/5.lookup.md#FAQ).

- String operators like `CONTAINS` and `STARTS WITH` are not allowed in [LOOKUP](../7.general-query-statements/5.lookup.md) for native index searching. Use full-text indexes to do fuzzy searches.

### Operations on native indexes

- [CREATE INDEX](1.create-native-index.md)

- [SHOW CREATE INDEX](2.1.show-create-index.md)

- [SHOW INDEXES](2.show-native-indexes.md)

- [DESCRIBE INDEX](3.describe-native-index.md)

- [REBUILD INDEX](4.rebuild-native-index.md)

- [SHOW INDEX STATUS](5.show-native-index-status.md)

- [DROP INDEX](6.drop-native-index.md)

- [LOOKUP](../7.general-query-statements/5.lookup.md)

- [MATCH](../7.general-query-statements/2.match.md)

## Full-text indexes

Full-text indexes are used to do prefix, wildcard, regexp, and fuzzy search on a string property. Features are as follows.

- Full-text indexes allow indexing just one property.

- Only strings within a specified length (no longer than 256 bytes) are indexed.

- Full-text indexes do not support logical operations such as `AND`, `OR`, and `NOT`.

!!! Note

    To do complete string matches, use native indexes.

### Operations on full-text indexes

Before doing any operations on full-text indexes, please make sure that you deploy full-text indexes. Details on full-text indexes deployment, see [Deploy Elasticsearch](../../4.deployment-and-installation/6.deploy-text-based-index/2.deploy-es.md) and [Deploy Listener](../../4.deployment-and-installation/6.deploy-text-based-index/3.deploy-listener.md).

At this time, full-text indexes are created automatically on the Elasticsearch cluster. And rebuilding or altering full-text indexes are not supported. To drop full-text indexes, you need to drop them on the Elasticsearch cluster manually.

To query full-text indexes, see [Search with full-text indexes](../15.full-text-index-statements/1.search-with-text-based-index.md).

## Null values

Indexes do not support indexing null values.

## Range queries

In addition to querying single results from native indexes, you can also do range queries. Not all the native indexes support range queries. You can only do range searches for numeric, date, and time type properties.
