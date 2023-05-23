# NebulaGraph {{ nebula.release }} release notes

## Bugfix

- Fix the bug in the execution of the MATCH statement with incorrect filtering.
- Fix the crash that occurs when the lookup expression contains undefined parameters.
- Fix the bug where unary NOT expressions were being pushed down incorrectly.
- Fix the bug that occurs when combining USE SPACE with MATCH.
- Fix the bug related to comparisons involving EMPTY.
- Fix the crash when querying the shortest path.
- Fix the bug of eval contains filter on storaged.
- Fix the bug in the MATCH statement related to regular expressions.
- Fix the crash that occurs when using the GEO data type.
- Fix the bug that graphd cannot be stopped by signaling when the thrift server fails to start.

## Legacy versions

[Release notes of legacy versions](https://www.nebula-graph.io/tags/release-notes)
