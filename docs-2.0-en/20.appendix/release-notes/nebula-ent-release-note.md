# NebulaGraph {{ nebula.release }} release notes

## Features

- Support managing licenses through License Center and License Manager.
- Support full table scan without index.
- Support expressions like `v.tag` in return statements.
- Support `json_extract` function in UPDATE statements.
- Support TCK format in EXPLAIN output.
- DML supports parameters.
- Enhance full-text index.

## Optimizations

- Support TTL in milliseconds.
- Enhance attribute trimming in aggregation functions.
- Improve the performance of traversal executor.
- Optimize FIND ALL PATH performance.
- Removes some Raft locks to improve performance.
- Optimize predicate function filtering for variable-length edges.
- Parallel traversal executor.
- MATCH supports ID collection.
- Refactor the GO planner.
- Add some Graph performance options in the configuration file.
- Add maximum connection number flag.
- Support variable when seeking vertex id or property index in match clause.

## Bug fixes

- Fix the defect where RocksDB data import invalidates the leader lease.
- Fix the error message when `DESC USER` does not exist.
- Fix the defect where `CREATE IF NOT EXIST` fails when SPACE exists.
- Fix the incorrect edge direction in GetNeighbors plan.
- Fix the client IP format in the `SHOW SESSIONS` command.
- Fix the defect where attributes are pruned in USE and MATCH.
- Fix the defect where the filter is not pushed down in some cases.
- Fix the defect where the filter is incorrectly filtered in some cases.
- Fix the incorrect handling of internal variables in pattern expressions.
- Fix defects involving EMPTY comparisons.
- Fix the defect where duplicate columns are returned when all columns are requested in MATCH.
- Fix the error in comparing paths involving reflexive edges.
- Fix the defect of redefining aliases in a MATCH path.
- Fix the type check defect when inserting geographical location values.
- Fix the crash in a shortest path.
- Fix the crash in GEO.
- Fix the bug that caused storage crash during logical expression evaluation.
- Fix the error in `MATCH...contains`.
- Fix the bug of incorrect session count in concurrency.
- Fix the defect of SUBGRAPH and PATH parameters.
- Fix the defect in regular expressions.
- Fix the issue with non-expression pushing down.
- Fixed the bug of slaving cluster.

## Changes

- Disable `edge list join`, not supporting the use of edge list in multiple patterns.
- Remove GLR parser, needs to change `YIELD 1–-1` to `YIELD 1– -1`.

## Legacy versions

[Release notes of legacy versions](https://www.nebula-graph.io/tags/release-notes)
