# Nebula Graph {{ nebula.release }} release notes

## Feature

- Support [Backup and Restore](../7.data-security/2.backup-restore/1.what-is-br.md). [#3469](https://github.com/vesoft-inc/nebula/pull/3469) [#1](https://github.com/vesoft-inc/nebula-agent/pull/1) [#22](https://github.com/vesoft-inc/nebula-br/pull/22)

- Support [openCypher queries with multiple MATCH statements](../3.ngql-guide/7.general-query-statements/2.match.md). [#3519](https://github.com/vesoft-inc/nebula/pull/3519) [#3318](https://github.com/vesoft-inc/nebula/pull/3318)

- Support [Standalone Nebula Graph](../4.deployment-and-installation/standalone-deployment.md). [#3310](https://github.com/vesoft-inc/nebula/pull/3310)

- Support [key-value separation for the storage engine](../5.configurations-and-logs/1.configurations/4.storage-config.md). [#3281](https://github.com/vesoft-inc/nebula/pull/3281)

- Support topN pushdown for `LOOKUP`. [#3499](https://github.com/vesoft-inc/nebula/pull/3499)

- Support [vertices without tags](../3.ngql-guide/12.vertex-statements/1.insert-vertex.md). [#3316](https://github.com/vesoft-inc/nebula/pull/3316) [#3335](https://github.com/vesoft-inc/nebula/pull/3335) [#3328](https://github.com/vesoft-inc/nebula/pull/3328) [#3286](https://github.com/vesoft-inc/nebula/pull/3286)

- Support [parameterized queries](../nebula-console.md). [#3379](https://github.com/vesoft-inc/nebula/pull/3379)

- Support [queries without specifying VIDs but a `LIMIT` clause must be used to restrict the number of results](../3.ngql-guide/7.general-query-statements/2.match.md) [#3320](https://github.com/vesoft-inc/nebula/pull/3320) [#3329](https://github.com/vesoft-inc/nebula/pull/3329) [#3262](https://github.com/vesoft-inc/nebula/pull/3262)

- Support [duration](../3.ngql-guide/3.data-types/4.date-and-time.md). [#3338](https://github.com/vesoft-inc/nebula/pull/3338)

- Support most [UTF-8 encoded characters](../3.ngql-guide/1.nGQL-overview/keywords-and-reserved-words.md) of 1 to 4 bytes. [#3380](https://github.com/vesoft-inc/nebula/pull/3380)  [#3440](https://github.com/vesoft-inc/nebula/pull/3440)

- Support [DESCRIBE USER](../7.data-security/1.authentication/2.management-user.md). [#3300](https://github.com/vesoft-inc/nebula/pull/3300)

<!--
- 支持Snowflake IDs。 [#3500](https://github.com/vesoft-inc/nebula/pull/3500)
-->

## Enhancement

- Refactor cluster management. [#3343](https://github.com/vesoft-inc/nebula/pull/3343)

- Add log monitor to check free bytes for log disks, change log level when your graph space is almost full. [#3576](https://github.com/vesoft-inc/nebula/pull/3576)

- Support any string for tag names in apostrophe. [#3424](https://github.com/vesoft-inc/nebula/pull/3424)

- Support that the storage service sends partition disk paths to the meta. [#3369](https://github.com/vesoft-inc/nebula/pull/3369) [#3416](https://github.com/vesoft-inc/nebula/pull/3416)

- Add constraints on invalid password attempts. [#3573](https://github.com/vesoft-inc/nebula/pull/3573) [#3629](https://github.com/vesoft-inc/nebula/pull/3629)

- Support `DELETE` in TOSS. [#3374](https://github.com/vesoft-inc/nebula/pull/3374)

- Support to use logrotate. [#3541](https://github.com/vesoft-inc/nebula/pull/3541)

- Support more metrics. [#3446](https://github.com/vesoft-inc/nebula/pull/3446) [#3605](https://github.com/vesoft-inc/nebula/pull/3605) [#3590](https://github.com/vesoft-inc/nebula/pull/3590)

- Enhancement date and time parser. [#3179](https://github.com/vesoft-inc/nebula/pull/3179)

- Remove read lock in the meta service to reduce the side effect of read-write locks. [#3256](https://github.com/vesoft-inc/nebula/pull/3256)

- Refactor storage indexes to solve the coupling problem between services. [#3196](https://github.com/vesoft-inc/nebula/pull/3196)

- Support specifying the floating point accuracy of the `round()` function. [#3178](https://github.com/vesoft-inc/nebula/pull/3178)ß

- Support HTTPS for the ES client. [#3150](https://github.com/vesoft-inc/nebula/pull/3150)

- Move version info outside of heartbeat.  [#3378](https://github.com/vesoft-inc/nebula/pull/3378)

- Support empty list, set, and map. [#3302](https://github.com/vesoft-inc/nebula/pull/3302)

- Support specifying s2 region coverage parameters when creating a geo index. [#3396](https://github.com/vesoft-inc/nebula/pull/3396)

- Add version info for `SHOW HOSTS`. [#3702](https://github.com/vesoft-inc/nebula/pull/3702)

## Bugfix

- Fix the bug that memory is not released when a default value is used and no value is specified in nGQL. [#3666](https://github.com/vesoft-inc/nebula/pull/3666)

- Fix the bug that the function `coalesce()` cannot be used. [#3653](https://github.com/vesoft-inc/nebula/pull/3653)

- Fix the bug that using multiple INSERT on an indexed tag will lead to incorrect LOOKUP results. [#3627](https://github.com/vesoft-inc/nebula/pull/3627)

- Fix the crash when the expression exceeds the depth. [#3606](https://github.com/vesoft-inc/nebula/pull/3606)

- Disable the aggregate function in the `YIELD` and `WHERE` clauses of nGQL. [#3597](https://github.com/vesoft-inc/nebula/pull/3597)

- Fix the crash when using the aggregate function in `UNWILD` and `WHERE` clauses. [#3397](https://github.com/vesoft-inc/nebula/pull/3397) [#3355](https://github.com/vesoft-inc/nebula/pull/3355)

- Fix the bug that the tag index is rebuilt with an old schema version value. [#3332](https://github.com/vesoft-inc/nebula/pull/3332)

- Fix the bug that the query results will still contain the expired edges if we use `GO...REVERSELY`. [#3536](https://github.com/vesoft-inc/nebula/pull/3536)

- Fix the memory estimation error info in CentOS 6.0. [#3534](https://github.com/vesoft-inc/nebula/pull/3534)

- Fix the crash when the `LOOKUP` statement contains a filter that consists of a logical And expression and an IN expression with only one element. [#3525](https://github.com/vesoft-inc/nebula/pull/3525)

- Fix the bug that metad progress is suspended under heavy load. [#3482](https://github.com/vesoft-inc/nebula/pull/3482)

- Fix the unwinding subgraph crash. [#3506](https://github.com/vesoft-inc/nebula/pull/3506)

- Fix the `DROP SPACE` crash when rebuilding an index. [#3406](https://github.com/vesoft-inc/nebula/pull/3406)

- Fix the bug of reading memory stats under cgroup v2. [#3419](https://github.com/vesoft-inc/nebula/pull/3419)

- Fix the bug that `DROP TAG INDEX` deletes the edge index with the same name unexpectedly, and vice versa for the deletion of the tag index. [#3413](https://github.com/vesoft-inc/nebula/pull/3413)

- Fix the bug that edges are not shown after a graph space is cloned. [#3351](https://github.com/vesoft-inc/nebula/pull/3351)

- Fix the index existence check problem. [#3315](https://github.com/vesoft-inc/nebula/pull/3315)

- Fix a bug that running the `ALTER` statement to query the type property may lead to a null pointer obtained by the graph service. [#3325](https://github.com/vesoft-inc/nebula/pull/3325)

- Optimized the Raft to make the system more stable. [#3172](https://github.com/vesoft-inc/nebula/pull/3172) [#3435](https://github.com/vesoft-inc/nebula/pull/3435) [#3358](https://github.com/vesoft-inc/nebula/pull/3358) [#3322](https://github.com/vesoft-inc/nebula/pull/3322) [#3031](https://github.com/vesoft-inc/nebula/pull/3031)

- Cancel memory check when the ratio is greater than 1.0. [#3289](https://github.com/vesoft-inc/nebula/pull/3289)

- Fix the error with ninja-build. [#3195](https://github.com/vesoft-inc/nebula/pull/3195)

- Fix the bug that creating tag and edge with the same name at the same time may both succeed. [#3735](https://github.com/vesoft-inc/nebula/pull/3735)

- Fix the full-text index creation failure when there are the same tags or edges in different spaces. [#3747](https://github.com/vesoft-inc/nebula/pull/3747)

- Fix variable inconsistency in `YIELD` clauses and `GO` statements. [#3430](https://github.com/vesoft-inc/nebula/pull/3430)

- Fix the crash when schema version is greater than 256. [#3893](https://github.com/vesoft-inc/nebula/pull/3893)

## Incompatibility

Nebula Graph {{ nebula.release }} does not support the most ecosystem tools of v2.x, please upgrade the [ecosystem tools](6.eco-tool-version.md).

- The storage services added in the configuration files cannot be read or written directly. The configuration files only register the storage services into the meta services. You must run the `ADD HOSTS` command to read and write data on storage servers. [#3343](https://github.com/vesoft-inc/nebula/pull/3343)

- Disable ZONE and GROUP. [#3776](https://github.com/vesoft-inc/nebula/pull/3776) [#3825](https://github.com/vesoft-inc/nebula/pull/3825)  [#3330](https://github.com/vesoft-inc/nebula/pull/3330)

- Disable `BALANCE DATA`.  [#3756](https://github.com/vesoft-inc/nebula/pull/3756)

- Modify the default session timeout from `0` to `28800` seconds, limit the value to between `1` and `604800` seconds. [#3357](https://github.com/vesoft-inc/nebula/pull/3357) [#3807](https://github.com/vesoft-inc/nebula/pull/3807)

- Add `SHOW LOCAL SESSIONS` and `SHOW LOCAL QUERIES` commands, and deprecate `SHOW ALL QUERIES`. [#3488](https://github.com/vesoft-inc/nebula/pull/3488)

- A tag is not required for a vertex. `DELETE VERTEX` only deletes the vertices and does not delete the related outgoing and incoming edges of the vertices. At this time, there will be hanging edges by default. [#3316](https://github.com/vesoft-inc/nebula/pull/3316) [#3335](https://github.com/vesoft-inc/nebula/pull/3335) [#3328](https://github.com/vesoft-inc/nebula/pull/3328) [#3286](https://github.com/vesoft-inc/nebula/pull/3286)

- Disable the `YIELD` clause to return custom variables. [#3271](https://github.com/vesoft-inc/nebula/pull/3271)

- The `YIELD` clause is required in the `FETCH`, `GO`, `LOOKUP`, `FIND PATH` and `GET SUBGRAPH` statements. [#2957](https://github.com/vesoft-inc/nebula/pull/2957) [#3056](https://github.com/vesoft-inc/nebula/pull/3056) [#3139](https://github.com/vesoft-inc/nebula/pull/3139)

- Add non-reserved keywords: `s2_max_level`, `s2_max_cells`. [#3396](https://github.com/vesoft-inc/nebula/pull/3396)

- It is required to specify a tag to query properties of a vertex in a `MATCH` statement. For example, from `return v.name` to `return v.player.name`. [#3255](https://github.com/vesoft-inc/nebula/pull/3255)
## Legacy versions

[Release notes of legacy versions](https://nebula-graph.com.cn/tags/release-note/)

