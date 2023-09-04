# NebulaGraph {{ nebula.release }} release notes

## Optimizations

    -  Optimized the performance of reading tags of destination vertices. 

## Bugfix

- Fix the bug where drainer failed to stop normally after consecutive restarts.
- Fix the bug where graphd crashed when a large query was performed.
- Fix the bug where schema was overwritten during cluster switchover.
- Fix the bug where graphd crashed when `FIND ALL PATH` was executed repeatedly after `GraphMemoryExceeded` occurred.
- Fix the bug where graphd crashed when the pipe character (`|`) was used to delete edges.
- Fix the bug where errors were reported when earlier Linux kernels use Boost to generate UUIDs.
- Fix the bug where the new index overwrote the old index in a graph space that was cloned by using the `CREATE SPACE...AS` statement.
- Fix the bug where errors were reported when executing the `GO...UNION ALL` statement in certain scenarios.
- Fix the bug where self-loop is not returned when executing the `FIND ALL PATH` statement to query the self-loop of a vertex.
- Fix the bug where graphd crashed when running the `shortestPath` function.
- Fix the bug where the `GetDstBySrc` operator failed to truncate super vertices.

## Legacy versions

[Release notes of legacy versions](https://www.nebula-graph.io/tags/release-notes)
