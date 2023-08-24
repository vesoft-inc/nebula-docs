# NebulaGraph {{ nebula.release }} release notes

## Optimizations

- A full scan is not performed when the `MATCH` statement queries for non-existent properties.
- Support for the push down of the `MATCH...STARTS WITH` statement.

## Bug fixes

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
- Fix the bug that the `CREATE SPACE...AS` statement clones a graph space, the new index will overwrite the old index.
- Fix the bug where the `GO...UNION ALL` statement reported an error in some scenarios.

## Legacy versions

[Release notes of legacy versions](https://www.nebula-graph.io/tags/release-notes)
