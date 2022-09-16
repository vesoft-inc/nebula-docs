# NebulaGraph {{ nebula.release }} release notes

## Bug fix

- Fix the crash caused by LOOKUP statements with AND and IN operators.[#4551](https://github.com/vesoft-inc/nebula/issues/4551)

- Fix the crash caused by invalid filter in GetProp. [#4568](https://github.com/vesoft-inc/nebula/pull/4568)

- Fix the crash caused by evaluating an expression with wrong a syntax. [#4607](https://github.com/vesoft-inc/nebula/pull/4607)

- Fix concurrent exception related to multi-match statement. [#4605](https://github.com/vesoft-inc/nebula/pull/4605)

- Fix the bug that scan vertex or edge don't filter the expired data out.[#4578](https://github.com/vesoft-inc/nebula/pull/4578)

- Fix the bug that properties function returns UNKNOWN_PROP. [#4604](https://github.com/vesoft-inc/nebula/pull/4604)

- Fix the split brain in raft. [#4479](https://github.com/vesoft-inc/nebula/pull/4479)

- Replace obsolete RocksDB API. [#4395](https://github.com/vesoft-inc/nebula/pull/4395) 

## Legacy versions

[Release notes of legacy versions](https://nebula-graph.io/posts/)
