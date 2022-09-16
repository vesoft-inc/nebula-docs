# NebulaGraph {{ nebula.release }} release notes

## Bug fix

- Fixed the crash caused by LOOKUP statements with AND and IN operators.[#4551](https://github.com/vesoft-inc/nebula/issues/4551)

- Fixed the crash caused by an invalid filter in GetProp. [#4568](https://github.com/vesoft-inc/nebula/pull/4568)

- Fixed the crash caused by handling a wrong syntax expression. [#4607](https://github.com/vesoft-inc/nebula/pull/4607)

- Fixed concurrent exceptions related to the multi-match statements. [#4605](https://github.com/vesoft-inc/nebula/pull/4605)

- Fixed the bug that expired data could not be filtered out when scanning vertices or edges.[#4578](https://github.com/vesoft-inc/nebula/pull/4578)

- Fixed the bug that the `properties` function returned UNKNOWN_PROP. [#4604](https://github.com/vesoft-inc/nebula/pull/4604)

- Fixed the split brain in raft. [#4479](https://github.com/vesoft-inc/nebula/pull/4479)

- Replaced obsolete RocksDB API. [#4395](https://github.com/vesoft-inc/nebula/pull/4395) 

## Legacy versions

[Release notes of legacy versions](https://nebula-graph.io/posts/)
