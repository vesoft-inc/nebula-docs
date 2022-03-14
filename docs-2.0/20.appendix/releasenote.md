# Nebula Graph {{ nebula.release }} release notes

## Bug fix

- Fix the bug that it maybe take a long time for storage online after `ADD HOSTS`.  [#3950](https://github.com/vesoft-inc/nebula/pull/3950)

- Fix the crash of the graph service when clients lower than v2.6 connect to Nebula service. [#3942](https://github.com/vesoft-inc/nebula/pull/3942)

- Fix the crash of the upgrade tool when upgrading with no tag defined in the graph space. [#3920](https://github.com/vesoft-inc/nebula/pull/3920)

- Fix the crash of the graph service when nGQL like `MATCH <node>, <node>, <path>`. [#3915](https://github.com/vesoft-inc/nebula/pull/3915)

## Legacy versions

[Release notes of legacy versions](https://nebula-graph.com.cn/tags/release-note/)
