# NebulaGraph {{ nebula.release }} release notes

## Features

- Enhance the full-text index. [#5567](https://github.com/vesoft-inc/nebula/pull/5567) [#5575](https://github.com/vesoft-inc/nebula/pull/5575) [#5577](https://github.com/vesoft-inc/nebula/pull/5577) [#5580](https://github.com/vesoft-inc/nebula/pull/5580) [#5584](https://github.com/vesoft-inc/nebula/pull/5584) [#5587](https://github.com/vesoft-inc/nebula/pull/5587)

    The changes involved are listed below:

    - The original full-text indexing function has been changed from calling Elasticsearch's Term-level queries to Full text queries.
    - In addition to supporting wildcards, regulars, fuzzy matches, etc. (but the syntax has been changed), support for word splitting (relying on Elasticsearch's own word splitter) has been added, and the query results include scoring results. For more syntax, see [official Elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/full-text-queries.html).

## Enhancements

- Support variables when querying vertex id or property index in a match clause. [#5486](https://github.com/vesoft-inc/nebula/pull/5486) [#5553](https://github.com/vesoft-inc/nebula/pull/5553)
- Performance
  - Support parallel startup of RocksDB instances to speed up the startup of the Storage service. [#5521](https://github.com/vesoft-inc/nebula/pull/5521)
  - Optimize the prefix search performance of the RocksDB iterator after the `DeleteRange` operation. [#5525](https://github.com/vesoft-inc/nebula/pull/5525)
  - Optimize the appendLog sending logic to avoid impacting write performance when a follower is down. [#5571](https://github.com/vesoft-inc/nebula/pull/5571)
  - Optimize the performance of the `MATCH` statement when querying for non-existent properties. [#5634](https://github.com/vesoft-inc/nebula/pull/5634)

## Bug fixes

- DQL
  - Fix the crash of the Graph service when executing a single big query. [#5619](https://github.com/vesoft-inc/nebula/pull/5619)
  - Fix the crash of the Graph service when executing the `Find All Path` statement. [#5621](https://github.com/vesoft-inc/nebula/pull/5621) [#5640](https://github.com/vesoft-inc/nebula/pull/5640)
  - Fix the bug that some expired data is not recycled at the bottom level. [#5447](https://github.com/vesoft-inc/nebula/pull/5447) [#5622](https://github.com/vesoft-inc/nebula/pull/5622)
  - Fix the bug that adding a path variable in the `MATCH` statement causes the `all()` function push-down optimization to fail. [#5631](https://github.com/vesoft-inc/nebula/pull/5631)
  - Fix the bug in the `MATCH` statement that returns incorrect results when querying the self-loop by the shortest path. [#5636](https://github.com/vesoft-inc/nebula/pull/5636)
  - Fix the bug that deleting edges by pipe causes the Graph service to crash. [#5645](https://github.com/vesoft-inc/nebula/pull/5645)
  - Fix the bug in the `MATCH` statement that returns missing properties of edges when matching multiple hops. [#5646](https://github.com/vesoft-inc/nebula/pull/5646)
- Others
  - Fix the bug of meta data inconsistency. [#5517](https://github.com/vesoft-inc/nebula/pull/5517)
  - Fix the bug that RocksDB ingest causes the leader lease to be invalid. [#5534](https://github.com/vesoft-inc/nebula/pull/5534)
  - Fix the error in the statistics logic of storage. [#5547](https://github.com/vesoft-inc/nebula/pull/5547)
  - Fix the bug that causes the web service to crash if a flag is set for an invalid request parameter. [#5566](https://github.com/vesoft-inc/nebula/pull/5566)
  - Fix the bug that too many logs are printed when listing sessions. [#5618](https://github.com/vesoft-inc/nebula/pull/5618)
