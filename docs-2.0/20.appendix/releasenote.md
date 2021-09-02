# Nebula Graph {{ nebula.release }} release notes

## Feature

- Support management of session. [#280](https://github.com/vesoft-inc/nebula-graph/pull/280)
- Support terminate the slow queries, know issue: there is a delay in querying and terminating the query due to the implementation. [#1152](https://github.com/vesoft-inc/nebula-graph/pull/1152)
- Enhance the ability to extract the indices from expressions for the `LOOKUP` statement. [#1188](https://github.com/vesoft-inc/nebula-graph/pull/1188)
- Supports configuring machine memory watermarks to alleviate OOM issues to some extent. [1067](https://github.com/vesoft-inc/nebula-graph/pull/1067)
- Support filter the edges in the `FindPath` statement. [#1091](https://github.com/vesoft-inc/nebula-graph/pull/1091)
- Support return structure of a graph without properties in the `Subgraph` statement.[#1134](https://github.com/vesoft-inc/nebula-graph/pull/1134)
- Improve the usage of the `timestamp` function. [#515](https://github.com/vesoft-inc/nebula-common/pull/515)
- Support for querying the version of each service. [#944](https://github.com/vesoft-inc/nebula-graph/pull/944)
- `Index` and `TTL` can be supported together. [#382](https://github.com/vesoft-inc/nebula-storage/pull/382)
- Support the creation of full-text indexes on specified properties. [#460](https://github.com/vesoft-inc/nebula-storage/pull/460)
- Support make comment when create space or schema. [#895](https://github.com/vesoft-inc/nebula-graph/pull/895)
- Support for full-text index rebuild. [#1123](https://github.com/vesoft-inc/nebula-graph/pull/1123)

## Enhancement

- The Listener interface is optimized to support full data acquisition. [#465](https://github.com/vesoft-inc/nebula-storage/pull/465), [#484](https://github.com/vesoft-inc/nebula-storage/pull/484)
- The leader table of the meta is reorganized. [#439](https://github.com/vesoft-inc/nebula-storage/pull/439)
- Add a DiskManager to check disk capacity. [#461](https://github.com/vesoft-inc/nebula-storage/pull/461)
- Improve heartbeat of raft to avoid leader change. [#438](https://github.com/vesoft-inc/nebula-storage/pull/438)
- Support concurrently go/fetch/lookup in storage. [#503](https://github.com/vesoft-inc/nebula-storage/pull/503)
- Enhanced for the `EXISTS` function to the `MAP`. [#973](https://github.com/vesoft-inc/nebula-graph/pull/973)
- Enforce the use of aggregate functions, such as `COUNT(v)+AVG(v)`. [#968](https://github.com/vesoft-inc/nebula-graph/pull/968)

## Bug fix

- Fixed multiple statement execution problems caused by permissions. [#1165](https://github.com/vesoft-inc/nebula-graph/pull/1165)
- Fixed unwinding causing no results. [#1018](https://github.com/vesoft-inc/nebula-graph/pull/1018)
- Fixed crash problems caused by aggregation functions in some scenarios. [#1015](https://github.com/vesoft-inc/nebula-graph/pull/1015)
- Fixed index matching problems with `OR` expressions. [#1005](https://github.com/vesoft-inc/nebula-graph/pull/1005)
- Fixed case sensitivity of functions. [#927](https://github.com/vesoft-inc/nebula-graph/issues/927)
- Fixed issue where query index creation information was not checked for Tag/Edge type. [#933](https://github.com/vesoft-inc/nebula-graph/pull/933)
- Fixed a bug in the `Substring` function. [#491](https://github.com/vesoft-inc/nebula-common/pull/491)
- Fixed meta not returning leader change correctly. [#423](https://github.com/vesoft-inc/nebula-storage/pull/423)
- Fixed an issue with `LIMIT`, `ORDER`, `GROUP` statements using variables. [#1314](https://github.com/vesoft-inc/nebula-graph/pull/1314)
- Fixed issue with the `db_dump` tool printing VID of the `int` type. [#533](https://github.com/vesoft-inc/nebula-storage/pull/533)
- Fixed the issue that `FAILE` is still displayed after the `Balance` task is recovered. [#528](https://github.com/vesoft-inc/nebula-storage/pull/528)

## Changes & Known issues

- A little bit grammar change of Subgraph.

    ```ngql
    # Add the WITH PROP keyword to the output property in {{ nebula.release }}.
    GET SUBGRAPH WITH PROP FROM <vids>

    # The original syntax will only output the graph structure without properties.
    GET SUBGRAPH FROM <vids>#
    ```

- We must use the symbol `$-.` in `ORDER BY`. But in earlier releases, there is no need.

    ```ngql
    # We must use the symbol `$-.` in `ORDER BY` in {{ nebula.release }}.
    nebula> LOOKUP ON player \
            YIELD player.age As playerage \
            | GROUP BY $-.playerage \
            YIELD $-.playerage as age, count(*) AS number \
            | ORDER BY $-.number DESC, $-.age DESC;

    # There is no need to use the symbol `$-.` in earlier releases.
    nebula> LOOKUP ON player \
            YIELD player.age As playerage \
            | GROUP BY $-.playerage \
            YIELD $-.playerage as age, count(*) AS number \
            | ORDER BY number DESC, age DESC;
    ```

For the known bug/issue in {{ nebula.release }}, see [issues](https://github.com/vesoft-inc/nebula-graph/issues).
