# Nebula Graph {{ nebula.release }} release notes

## Enterprise edition

### Feature

- Support the [Elasticsearch query functions](../3.ngql-guide/6.functions-and-expressions/17.ES-function.md) to send a GET request to an independently deployed Elasticsearch to read data. [#924](https://github.com/vesoft-inc/nebula-ent/pull/924)

- Support the [extract() function](../3.ngql-guide/6.functions-and-expressions/2.string.md). [#4098](https://github.com/vesoft-inc/nebula/pull/4098)

### Enhancement

- Optimized the configuration file and added some configurations. [#4310](https://github.com/vesoft-inc/nebula/pull/4310)

- Added optimization rule to remove useless AppendVertices operator. [#4277](https://github.com/vesoft-inc/nebula/pull/4277)

- Added optimization rule for pushing down the filter of edge. [#4270](https://github.com/vesoft-inc/nebula/pull/4270)

- Added optimization rule for pushing down the filter of vertex properties. [#4260](https://github.com/vesoft-inc/nebula/pull/4260)

- Eliminate VID predication filter. [#4249](https://github.com/vesoft-inc/nebula/pull/4249)

- Reduce data copying for join operation when moving data. [#4283](https://github.com/vesoft-inc/nebula/pull/4283)

- Obtain property values ​​through subscripts to reduce the time-consuming of property query. [#4242](https://github.com/vesoft-inc/nebula/pull/4242)

- Optimize the performance of `SHORTEST PATH`. [#4071](https://github.com/vesoft-inc/nebula/pull/4071)

- Optimize the performance of `SUBGRAPH`. [#4226](https://github.com/vesoft-inc/nebula/pull/4226)

- Reduce data copying of Traverse and AppendVertices operators when moving data. [#4176](https://github.com/vesoft-inc/nebula/pull/4176)

- Enhance optimization rules for removing invalid project operators. [#4157](https://github.com/vesoft-inc/nebula/pull/4157)

- Optimize memory allocation with Arena Allocator. [#4239](https://github.com/vesoft-inc/nebula/pull/4239)

### Bugfix

- Fix the web service crash when receiving some special attack messages. [#4334](https://github.com/vesoft-inc/nebula/pull/4334)

- Fix the storage service crash when scanning properties concurrently. [#4268](https://github.com/vesoft-inc/nebula/pull/4268)

- Fix the storage service crash when the name length of the inserting edge that exceeds the limit. [#4305](https://github.com/vesoft-inc/nebula/pull/4305)

- Fix the crash when enabling the concurrent querry mode. [#4288](https://github.com/vesoft-inc/nebula/pull/4288)

- Fix the storage service crash when lookup indexes with nullable property. [#4234](https://github.com/vesoft-inc/nebula/pull/4234)

- Fix the bug that standalone daemon exits after restart. [#4269](https://github.com/vesoft-inc/nebula/pull/4269)

- Fix the bug that the result of the Join dot format explanation is incorrect for GraphViz online tool, which caused by twice JSON conversions. [#4280](https://github.com/vesoft-inc/nebula/pull/4280)

- Fix the bug in property queries that the use of dot in schema is disabled. [#4194](https://github.com/vesoft-inc/nebula/pull/4194)

- Fix the bug that the machine lost the key when restoring data. [#4311](https://github.com/vesoft-inc/nebula/pull/4311)

- Fix the bug that using the same statement to return same vertex different properties, the results show `BAD TYPE`. [#4151](https://github.com/vesoft-inc/nebula/pull/4151)

- Fix the error message in statement `MATCH p=(:team)-->() RETURN p LIMIT 1` without indexes. [#4053](https://github.com/vesoft-inc/nebula/pull/4053)

- Enhance the error message for operators `AND` and `OR`. [#4304](https://github.com/vesoft-inc/nebula/pull/4304)

- Fix the bug that there are no stats under the condition of using indexes. [#4353](https://github.com/vesoft-inc/nebula/pull/4353)

## Legacy versions

[Release notes of legacy versions](https://nebula-graph.io/posts/)
