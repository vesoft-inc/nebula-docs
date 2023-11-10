# Index overview

Indexes are built to fast process graph queries. Nebula Graph supports two kinds of indexes: native indexes and full-text indexes. This topic introduces the index types and helps choose the right index.

## Usage Instructions

- Indexes can improve query performance but may reduce write performance.

- An index is a prerequisite for locating data when executing a `LOOKUP `statement. If there is no index, an error will be reported when executing the `LOOKUP` statement.
  
- When using an index, NebulaGraph will automatically select the most optimal index.
  
- Indexes with high selectivity, that is, when the ratio of the number of records with unique values in the index column to the total number of records is high (for example, the ratio for `ID numbers` is `1`), can significantly improve query performance. For indexes with low selectivity (such as `country`), query performance might not experience a substantial improvement.


## Native indexes

Native indexes allow querying data based on a given property. Features are as follows.

- There are two kinds of native indexes: tag index and edge type index.

- Native indexes must be updated manually. You can use the `REBUILD INDEX` statement to update native indexes.

- Native indexes support indexing multiple properties on a tag or an edge type (composite indexes), but do not support indexing across multiple tags or edge types.

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

- [Geography index](../3.data-types/10.geography.md)

## Full-text indexes

Full-text indexes are used to do prefix, wildcard, regexp, and fuzzy search on a string property. Features are as follows.

- Full-text indexes allow indexing just one property.

- Full-text indexes do not support logical operations such as `AND`, `OR`, and `NOT`.

!!! note

    To do complete string matches, use native indexes.

## Null values

Indexes do not support indexing null values.

## Range queries

In addition to querying single results from native indexes, you can also do range queries. Not all the native indexes support range queries. You can only do range searches for numeric, date, and time type properties.
