# NebulaGraph {{ nebula.release }} release notes

## Features

- Support UDF. [#4804](https://github.com/vesoft-inc/nebula/pull/4804) [#5391](https://github.com/vesoft-inc/nebula/pull/5391)
- Support expressions like `v.tag` in return statements. [#5440](https://github.com/vesoft-inc/nebula/pull/5440)
- Support `json_extract` function in UPDATE statements. [#5457](https://github.com/vesoft-inc/nebula/pull/5457)
- Support TCK format in EXPLAIN output. [#5414](https://github.com/vesoft-inc/nebula/pull/5414)
- DML supports parameters. [#5328](https://github.com/vesoft-inc/nebula/pull/5328)

## Optimizations

- Support TTL in milliseconds. [#5430](https://github.com/vesoft-inc/nebula/pull/5430)
- Enhance attribute trimming in aggregation functions. [#5301](https://github.com/vesoft-inc/nebula/pull/5301)
- Improve the performance of traversal executor. [#5308](https://github.com/vesoft-inc/nebula/pull/5308)
- Optimize FIND ALL PATH performance. [#5409](https://github.com/vesoft-inc/nebula/pull/5409)
- Removes some Raft locks to improve performance. [#5451](https://github.com/vesoft-inc/nebula/pull/5451)
- Optimize predicate function filtering for variable-length edges. [#5464](https://github.com/vesoft-inc/nebula/pull/5464) [#5470](https://github.com/vesoft-inc/nebula/pull/5470) [#5481](https://github.com/vesoft-inc/nebula/pull/5481) [#5503](https://github.com/vesoft-inc/nebula/pull/5503)
- Parallel traversal executor. [#5314](https://github.com/vesoft-inc/nebula/pull/5314)
- MATCH supports ID collection. [#5360](https://github.com/vesoft-inc/nebula/pull/5360)
- Refactor the GO planner. [#5369](https://github.com/vesoft-inc/nebula/pull/5369)
- Add some Graph performance options in the configuration file. [#5463](https://github.com/vesoft-inc/nebula/pull/5463)
- Add maximum connection number flag. [#5309](https://github.com/vesoft-inc/nebula/pull/5309)    

## Bug fixes

- Fix the defect where RocksDB data import invalidates the leader lease.  [#5271](https://github.com/vesoft-inc/nebula/pull/5271)
- Fix the error message when `DESC USER` does not exist. [#5345](https://github.com/vesoft-inc/nebula/pull/5345)
- Fix the defect where `CREATE IF NOT EXIST` fails when SPACE exists.  [#5375](https://github.com/vesoft-inc/nebula/pull/5375)
- Fix the incorrect edge direction in GetNeighbors plan. [#5386](https://github.com/vesoft-inc/nebula/pull/5386)
- Fix the client IP format in the `SHOW SESSIONS` command. [#5388](https://github.com/vesoft-inc/nebula/pull/5388)
- Fix the defect where attributes are pruned in USE and MATCH. [#5263](https://github.com/vesoft-inc/nebula/issues/5263)
- Fix the defect where the filter is not pushed down in some cases. [#5395](https://github.com/vesoft-inc/nebula/pull/5395)
- Fix the defect where the filter is incorrectly filtered in some cases. [#5422](https://github.com/vesoft-inc/nebula/pull/5422)
- Fix the incorrect handling of internal variables in pattern expressions. [#5424](https://github.com/vesoft-inc/nebula/pull/5424)
- Fix defects involving EMPTY comparisons. [#5433](https://github.com/vesoft-inc/nebula/pull/5433)
- Fix the defect where duplicate columns are returned when all columns are requested in MATCH. [#5443](https://github.com/vesoft-inc/nebula/pull/5443)
- Fix the error in comparing paths involving reflexive edges. [#5444](https://github.com/vesoft-inc/nebula/pull/5444)
- Fix the defect of redefining aliases in a MATCH path. [#5446](https://github.com/vesoft-inc/nebula/pull/5446)
- Fix the type check defect when inserting geographical location values. [#5460](https://github.com/vesoft-inc/nebula/pull/5460)
- Fix the crash in a shortest path. [#5472](https://github.com/vesoft-inc/nebula/pull/5472)
- Fix the crash in GEO. [#5475](https://github.com/vesoft-inc/nebula/pull/5475)
- Fix the error in `MATCH...contains`. [#5485](https://github.com/vesoft-inc/nebula/pull/5485)
- Fix the bug of incorrect session count in concurrency. [#5496](https://github.com/vesoft-inc/nebula/pull/5496)
- Fix the defect of SUBGRAPH and PATH parameters. [#5500](https://github.com/vesoft-inc/nebula/pull/5500)
- Fix the defect in regular expressions. [#5507](https://github.com/vesoft-inc/nebula/pull/5507)  

## Changes

- Disable `edge list join`, not supporting the use of edge list in multiple patterns. [#5268](https://github.com/vesoft-inc/nebula/pull/5268)
- Remove GLR parser, needs to change `YIELD 1–-1` to `YIELD 1– -1`. [#5290](https://github.com/vesoft-inc/nebula/pull/5290)

## Legacy versions

[Release notes of legacy versions](https://nebula-graph.io/posts/)




