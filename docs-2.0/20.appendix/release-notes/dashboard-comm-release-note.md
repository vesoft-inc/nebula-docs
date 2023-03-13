# NebulaGraph Dashboard Community Edition {{ nebula.release }} release notes

## Feature

- Support [killing sessions](../../3.ngql-guide/17.query-tuning-statements/2.kill-session.md). [#5146](https://github.com/vesoft-inc/nebula/pull/5146)
- Support [Memory Tracker](../../5.configurations-and-logs/1.configurations/4.storage-config.md) to optimize memory management. [#5082](https://github.com/vesoft-inc/nebula/pull/5082)

## Enhancement

- Optimize job management. [#5212](https://github.com/vesoft-inc/nebula/pull/5212) [#5093](https://github.com/vesoft-inc/nebula/pull/5093) [#5099](https://github.com/vesoft-inc/nebula/pull/5099) [#4872](https://github.com/vesoft-inc/nebula/pull/4872)

- Modify the default value of the Graph service parameter `session_reclaim_interval_secs` to 60 seconds. [#5246](https://github.com/vesoft-inc/nebula/pull/5246)

- Adjust the default level of `stderrthreshold` in the configuration file. [#5188](https://github.com/vesoft-inc/nebula/pull/5188)

- Optimize the full-text index. [#5077](https://github.com/vesoft-inc/nebula/pull/5077) [#4900](https://github.com/vesoft-inc/nebula/pull/4900) [#4925](https://github.com/vesoft-inc/nebula/pull/4925)

- Limit the maximum depth of the plan tree in the optimizer to avoid stack overflows. [#5050](https://github.com/vesoft-inc/nebula/pull/5050)

- Optimize the treatment scheme when the pattern expressions are used as predicates. [#4916](https://github.com/vesoft-inc/nebula/pull/4916)

## Bugfix

- Fix the bug about query plan generation and optimization. [#4863](https://github.com/vesoft-inc/nebula/pull/4863) [#4813](https://github.com/vesoft-inc/nebula/pull/4813)

- Fix the bugs related to indexes:

  - Full-text indexes [#5214](https://github.com/vesoft-inc/nebula/pull/5214) [#5260](https://github.com/vesoft-inc/nebula/pull/5260)
  - String indexes [5126](https://github.com/vesoft-inc/nebula/pull/5126)

- Fix the bugs related to query statements:

  - Variables [#5192](https://github.com/vesoft-inc/nebula/pull/5192)
  - Filter conditions and expressions [#4952](https://github.com/vesoft-inc/nebula/pull/4952) [#4893](https://github.com/vesoft-inc/nebula/pull/4893) [#4863](https://github.com/vesoft-inc/nebula/pull/4863)
  - Properties of vertices or edges [#5230](https://github.com/vesoft-inc/nebula/pull/5230) [#4846](https://github.com/vesoft-inc/nebula/pull/4846) [#4841](https://github.com/vesoft-inc/nebula/pull/4841) [#5238](https://github.com/vesoft-inc/nebula/pull/5238)
  - Functions and aggregations [#5135](https://github.com/vesoft-inc/nebula/pull/5135) [#5121](https://github.com/vesoft-inc/nebula/pull/5121) [#4884](https://github.com/vesoft-inc/nebula/pull/4884)
  - Using illegal data types [#5242](https://github.com/vesoft-inc/nebula/pull/5242)
  - Clauses and operators [#5241](https://github.com/vesoft-inc/nebula/pull/5241) [#4965](https://github.com/vesoft-inc/nebula/pull/4965)

- Fix the bugs related to DDL and DML statements:

  - ALTER TAG [#5105](https://github.com/vesoft-inc/nebula/pull/5105) [#5136](https://github.com/vesoft-inc/nebula/pull/5136)
  - UPDATE [#4933](https://github.com/vesoft-inc/nebula/pull/4933)

- Fix the bugs related to other functions:

  - TTL [#4961](https://github.com/vesoft-inc/nebula/pull/4961)
  - Authentication [#4885](https://github.com/vesoft-inc/nebula/pull/4885)
  - Services [#4896](https://github.com/vesoft-inc/nebula/pull/4896)

## Change

- The added property name can not be the same as an existing or deleted property name, otherwise, the operation of adding a property fails. [#5130](https://github.com/vesoft-inc/nebula/pull/5130)
- Limit the type conversion when modifying the schema. [#5098](https://github.com/vesoft-inc/nebula/pull/5098)
- The default value must be specified when creating a property of type `NOT NULL`. [#5105](https://github.com/vesoft-inc/nebula/pull/5105)
- Add the multithreaded query parameter `query_concurrently` to  the configuration file with a default value of `true`. [#5119](https://github.com/vesoft-inc/nebula/pull/5119)
- Remove the parameter `kv_separation` of the KV separation storage function from the configuration file, which is turned off by default. [#5119](https://github.com/vesoft-inc/nebula/pull/5119)
- Modify the default value of `local_config` in the configuration file to `true`. [#5119](https://github.com/vesoft-inc/nebula/pull/5119)
- Consistent use of `v.tag.property` to get property values, because it is necessary to specify the Tag. Using `v.property` to access the property of a Tag on `v` was incorrectly allowed in the previous version. [#5230](https://github.com/vesoft-inc/nebula/pull/5230)
- Remove the column `HTTP port` from the command `SHOW HOSTS`. [#5056](https://github.com/vesoft-inc/nebula/pull/5056)
- Disable the queries of the form `OPTIONAL MATCH <pattern> WHERE <condition>`. [#5273](https://github.com/vesoft-inc/nebula/pull/5273)
- Disable TOSS. [#5119](https://github.com/vesoft-inc/nebula/pull/5119)
- Rename Listener's pid filename and log directory name. [#5119](https://github.com/vesoft-inc/nebula/pull/5119)

## Legacy versions

[Release notes of legacy versions](https://nebula-graph.io/posts/)