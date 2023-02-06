# NebulaGraph {{ nebula.release }} release notes

## Feature

- Support [incremental backup](../../backup-and-restore/nebula-br-ent/1.br-ent-overview.md).
- Support [fine-grained permission management]((../../7.data-security/1.authentication/3.role-list.md)) at the Tag/Edge type level.
- Support [killing sessions](../../3.ngql-guide/17.query-tuning-statements/2.kill-session.md).
- Support [Memory Tracker](../../5.configurations-and-logs/1.configurations/4.storage-config.md) to optimize memory management.
- Support [black-box monitoring](../../6.monitor-and-metrics/3.bbox/3.1.bbox.md).
- Support function [json_extract](../../3.ngql-guide/6.functions-and-expressions/2.string.md).
- Support function [extract](../../3.ngql-guide/6.functions-and-expressions/2.string.md).

## Enhancement

- Support using `GET SUBGRAPH` to filter vertices.
- Support using `GetNeighbors` to filter vertices.
- Support the conversion between timestamp and date time.
- Support the reference of local variable in pattern expressions.
- Optimize job management.
- Optimize the full-text index.
- Optimize the treatment scheme when the pattern expressions are used as predicates.
- Optimize the join performance of the GO statement.
- Optimize the performance of k-hop.
- Optimize the performance of the shortest path query.
- Optimize the push-down of the filtering of the vertex property.
- Optimize the push-down of the edge filtering.
- Optimize the loop conditions of the subgraph query.
- Optimize the rules of the property cropping.
- Remove the invalid `Project` operators.
- Remove the invalid `AppendVertices` operators.
- Reduce the amount of data replication for connection operations.
- Reduce the amount of data replication for `Traverse` and `AppendVertices` operators.
- Modify the default value of the Graph service parameter `session_reclaim_interval_secs` to 60 seconds.
- Adjust the default level of `stderrthreshold` in the configuration file.
- Get the property values by subscript to reduce the time of property query.
- Limit the maximum depth of the plan tree in the optimizer to avoid stack overflows.

## Bugfix

- Fix the bug about query plan generation and optimization.

- Fix the bugs related to indexes:

  - Full-text indexes
  - String indexes

- Fix the bugs related to query statements:

  - Variables
  - Filter conditions and expressions
  - Properties of vertices or edges
  - parameters
  - Functions and aggregations
  - Using illegal data types
  - Time zone, date, time, etc
  - Clauses and operators

- Fix the bugs related to DDL and DML statements:

  - ALTER TAG
  - UPDATE

- Fix the bugs related to other functions:

  - TTL
  - Synchronization
  - Authentication
  - Services
  - Logs
  - Monitoring and statistics

## Change

- If you want to upgrade NebulaGraph from version 3.1 to 3.4, please follow the instructions in the [upgrade document](../../4.deployment-and-installation/3.upgrade-nebula-graph/upgrade-nebula-ent-from-3.x-3.4.md).
- The added property name can not be the same as an existing or deleted property name, otherwise, the operation of adding a property fails.
- Limit the type conversion when modifying the schema.
- The default value must be specified when creating a property of type `NOT NULL`.
- Add the multithreaded query parameter `query_concurrently` to  the configuration file with a default value of `true`.
- Remove the parameter `kv_separation` of the KV separation storage function from the configuration file, which is turned off by default.
- Modify the default value of `local_config` in the configuration file to `true`.
- Consistent use of `v.tag.property` to get property values, because it is necessary to specify the Tag. Using `v.property` to access the property of a Tag on `v` was incorrectly allowed in the previous version.
- Remove the column `HTTP port` from the command `SHOW HOSTS`.
- Disable the queries of the form `OPTIONAL MATCH <pattern> WHERE <condition>`.
- Disable the functions of the form `COUNT(DISTINCT *)`.
- Disable TOSS.
- Rename Listener's pid filename and log directory name.

## Legacy versions

[Release notes of legacy versions](https://nebula-graph.io/posts/)
