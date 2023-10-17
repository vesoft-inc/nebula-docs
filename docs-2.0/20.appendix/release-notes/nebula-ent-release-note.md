# NebulaGraph {{ nebula.release }} release notes

## v3.6.0

- Features
  - Supported to manage [zone](../../4.deployment-and-installation/5.zone.md). Zone is a logical rack of storage nodes in NebulaGraph that separates multiple Storage nodes into manageable logical zones for resource isolation.
  - Supported [HTTP2](../../5.configurations-and-logs/1.configurations/3.graph-config.md) protocol.
  - Supported SSL two-way authentication ([mTLS](../../7.data-security/4.ssl.md)).
  - Supported [automatic monitoring](../../7.data-security/4.ssl.md) of SSL certificate updates.
  - Supported join queries using [INNER JOIN](../../3.ngql-guide/8.clauses-and-options/joins.md).
  - Supported single shortest path using [FIND SINGLE SHORTEST PATH](../../3.ngql-guide/16.subgraph-and-path/2.find-path.md).
  - Supported for logging slow queries (excluding DML) using the [enable_record_slow_query](../../5.configurations-and-logs/1.configurations/3.graph-config.md) parameter.

- Enhancements
  - Performance
    - Optimized performance for deep queries.
    - Optimized performance of the Aggregate operator.
  - High availability
    - Added statistics in partial success.
    - Supported to record the duration of the last successful access to LM, so that you can easily check the time when LM is down.
    - When the hard disk of a node fails to write, it triggers a re-election to ensure that the cluster can provide services normally.
  - Usability
    - When modifying users, you can change the password or whitelist list individually.

- Bug fixes
  - Fixed the bug of Meta data consistency.
  - Fixed the bug where some expired data would not be recycled at the bottom level.
  - Fixed the bug with incorrect results when querying all paths from a self-loop vertex.
  - Fixed the bug with incorrect logging of requests sent to the follower of a meta service.

## v3.5.1

- Enhancements

  - A full scan is not performed when the `MATCH` statement queries for non-existent properties.
  - Support for the push down of the `MATCH...STARTS WITH` statement.

- Bug fixes

  - Fix the bug that the Drainer failed to stop appropriately as a result of continuous restarting.
  - Fix the bug where a single large query could cause the Graph service to crash.
  - Fix the out of memory bug in the `FIND ALL PATH` statement.
  - Fix the bug that adding a path variable to the `MATCH` statement prevented push-down optimization of the `all()` function.
  - Fix the UUID generation using Boost in the low-version Linux kernel.
  - Fix the bug in the `MATCH...shortestpath()` statement for loop detection.
  - Fix the bug where the Graph service crashes when deleting an edge using a pipe character (`|`).
  - Fix the bug that the properties of edge are not displayed when the `MATCH` statement executes a multi-hop query.
  - Fix the bug where the `shortestPath()` function causes the Graph service to crash.
  - Fix the bug that the `FIND ALL PATH` statement does not return the path of the self-loop when looking up the self-loop of a vertex.
  - Fix the bug where repeated execution of a `GO` compound statement returned different results when multiple clauses in the compound statement used the same variable.
  - Fix the bug that cloning a graph space using the `CREATE SPACE...AS` statement resulted in the overwriting of the old index with the new index.
  - Fix the bug where the `GO...UNION ALL` statement reported an error in some scenarios.

## v3.5.0

- Features

  - Support managing licenses through License Center and License Manager.
  - Support full table scan without index.
  - Support expressions like `v.tag` in return statements.
  - Support `json_extract` function in UPDATE statements.
  - Support TCK format in EXPLAIN output.
  - DML supports parameters.
  - Enhance full-text index.

- Enhancements

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

- Bug fixes

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

- Deprecated

  - Disable `edge list join`, not supporting the use of edge list in multiple patterns.
  - Remove GLR parser, needs to change `YIELD 1–-1` to `YIELD 1– -1`.

## Legacy versions

[Release notes of legacy versions](https://www.nebula-graph.io/tags/release-notes)
