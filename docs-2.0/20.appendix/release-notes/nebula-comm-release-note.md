# NebulaGraph {{ nebula.release }} release notes

## Enhancement

- Support the [extract() function](../3.ngql-guide/6.functions-and-expressions/2.string.md). [#4098](https://github.com/vesoft-inc/nebula/pull/4098)

- Optimized the configuration file and added some configurations. [#4310](https://github.com/vesoft-inc/nebula/pull/4310)

- Added optimization rules to remove the useless AppendVertices operator. [#4277](https://github.com/vesoft-inc/nebula/pull/4277)

- Added optimization rules for pushing down the filter of edges. [#4270](https://github.com/vesoft-inc/nebula/pull/4270)

- Added optimization rules for pushing down the filter of vertex properties. [#4260](https://github.com/vesoft-inc/nebula/pull/4260)

- Eliminated the VID predication filter. [#4249](https://github.com/vesoft-inc/nebula/pull/4249)

- Reduced the amount of data to be copied for Join operations when moving data. [#4283](https://github.com/vesoft-inc/nebula/pull/4283)

- Obtained property values through subscripts to reduce the time-consuming of property queries. [#4242](https://github.com/vesoft-inc/nebula/pull/4242)

- Optimized the performance of `SHORTEST PATH`. [#4071](https://github.com/vesoft-inc/nebula/pull/4071)

- Optimized the performance of `SUBGRAPH`. [#4226](https://github.com/vesoft-inc/nebula/pull/4226)

- Reduced the amount of data to be copied for Traverse and AppendVertices operators when moving data. [#4176](https://github.com/vesoft-inc/nebula/pull/4176)

- Enhanced optimization rules for removing invalid project operators. [#4157](https://github.com/vesoft-inc/nebula/pull/4157)

- Optimized memory allocation with Arena Allocator. [#4239](https://github.com/vesoft-inc/nebula/pull/4239)

## Bugfix

- Fixed the web service crash when receiving some special attack messages. [#4334](https://github.com/vesoft-inc/nebula/pull/4334)

- Fixed the storage service crash when scanning properties concurrently. [#4268](https://github.com/vesoft-inc/nebula/pull/4268)

- Fixed the storage service crash when the name length of the inserting edge that exceeded the limit. [#4305](https://github.com/vesoft-inc/nebula/pull/4305)

- Fixed the crash when enabling the concurrent querry mode. [#4288](https://github.com/vesoft-inc/nebula/pull/4288)

- Fixed the storage service crash when querying for indexes with the NULL property. [#4234](https://github.com/vesoft-inc/nebula/pull/4234)

- Fixed the bug that standalone daemon exited after a restart. [#4269](https://github.com/vesoft-inc/nebula/pull/4269)

- Fixed the bug that the result of the Join dot format explanation was incorrect for GraphViz online tool, which caused by twice JSON conversions. [#4280](https://github.com/vesoft-inc/nebula/pull/4280)

- Fixed the bug in property queries. The use of dots in schema is now disabled. [#4194](https://github.com/vesoft-inc/nebula/pull/4194)

- Fixed the bug that the machine lost the key when restoring data. [#4311](https://github.com/vesoft-inc/nebula/pull/4311)

- Fixed the bug that using the same statement to return same vertex different properties, and the results showed `BAD TYPE`. [#4151](https://github.com/vesoft-inc/nebula/pull/4151)

- Fixed the error message in statement `MATCH p=(:team)-->() RETURN p LIMIT 1` without indexes. [#4053](https://github.com/vesoft-inc/nebula/pull/4053)

- Enhanced the error message for operators `AND` and `OR`. [#4304](https://github.com/vesoft-inc/nebula/pull/4304)

- Fixed the bug that there were no stats under the condition of using indexes. [#4353](https://github.com/vesoft-inc/nebula/pull/4353)

- Fixed the crash when having a put request with no body.[#4405](https://github.com/vesoft-inc/nebula/pull/4405)

- Fixed the storage service crash when the length of the VID in a vertex or edge deletion statement exceeds the defined length on an indexed base.[#4406](https://github.com/vesoft-inc/nebula/pull/4406)

## Legacy versions

[Release notes of legacy versions](https://nebula-graph.io/posts/)
