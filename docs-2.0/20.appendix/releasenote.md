# Nebula Graph {{ nebula.release }} release notes

## Feature

- Support [backup and restore](../7.data-security/2.backup-restore/1.what-is-br.md). [#3469](https://github.com/vesoft-inc/nebula/pull/3469) [#1](https://github.com/vesoft-inc/nebula-agent/pull/1) [#22](https://github.com/vesoft-inc/nebula-br/pull/22)

- Support [the multi MATCH query parts of openCypher](../3.ngql-guide/7.general-query-statements/2.match.md). [#3519](https://github.com/vesoft-inc/nebula/pull/3519) [#3318](https://github.com/vesoft-inc/nebula/pull/3318)

- Support traverse executor. [#3308](https://github.com/vesoft-inc/nebula/pull/3308)

- Support [Standalone Nebula Graph](../4.deployment-and-installation/standalone-deployment.md). [#3310](https://github.com/vesoft-inc/nebula/pull/3310)

- Support [key value separation for storage engine](../5.configurations-and-logs/1.configurations/4.storage-config.md). [#3281](https://github.com/vesoft-inc/nebula/pull/3281)

- Support topN push down for `LOOKUP`. [#3499](https://github.com/vesoft-inc/nebula/pull/3499)

- Support [vertex without tag](../3.ngql-guide/12.vertex-statements/1.insert-vertex.md). [#3316](https://github.com/vesoft-inc/nebula/pull/3316) [#3335](https://github.com/vesoft-inc/nebula/pull/3335) [#3328](https://github.com/vesoft-inc/nebula/pull/3328) [#3286](https://github.com/vesoft-inc/nebula/pull/3286)

- Support [cypher parameter](../nebula-console.md). [#3379](https://github.com/vesoft-inc/nebula/pull/3379)

- Support to [view sample data for tags and edges](../3.ngql-guide/7.general-query-statements/2.match.md). [#3320](https://github.com/vesoft-inc/nebula/pull/3320) [#3329](https://github.com/vesoft-inc/nebula/pull/3329) [#3262](https://github.com/vesoft-inc/nebula/pull/3262)

- Support [duration](../3.ngql-guide/3.data-types/4.date-and-time.md). [#3338](https://github.com/vesoft-inc/nebula/pull/3338)

- Support [Chinese schema](../3.ngql-guide/1.nGQL-overview/keywords-and-reserved-words.md). [#3380](https://github.com/vesoft-inc/nebula/pull/3380)  [#3440](https://github.com/vesoft-inc/nebula/pull/3440)

- Support [DESCRIBE USER](../7.data-security/1.authentication/2.management-user.md). [#3300](https://github.com/vesoft-inc/nebula/pull/3300)

<!--
- 支持Snowflake IDs。 [#3500](https://github.com/vesoft-inc/nebula/pull/3500)
-->

## Enhancement

- Refactor cluster management. [#3343](https://github.com/vesoft-inc/nebula/pull/3343)

- Add log monitor to check freeBytes of log disk, change log level when space is almost full. [#3576](https://github.com/vesoft-inc/nebula/pull/3576)

- Upgrade third party 3.0. [#3554](https://github.com/vesoft-inc/nebula/pull/3554) [#3511](https://github.com/vesoft-inc/nebula/pull/3511)

- Support any string in apostrophe for tag name. [#3424](https://github.com/vesoft-inc/nebula/pull/3424)

- Storage use heartbeat to send partition's disk path info to meta. [#3369](https://github.com/vesoft-inc/nebula/pull/3369) [#3416](https://github.com/vesoft-inc/nebula/pull/3416)

- Add constraints on invalid password attempts. [#3573](https://github.com/vesoft-inc/nebula/pull/3573) [#3629](https://github.com/vesoft-inc/nebula/pull/3629)

- Support delete in TOSS. [#3374](https://github.com/vesoft-inc/nebula/pull/3374)

- Support to use logrotate. [#3541](https://github.com/vesoft-inc/nebula/pull/3541)

- Support more metrics. [#3446](https://github.com/vesoft-inc/nebula/pull/3446) [#3605](https://github.com/vesoft-inc/nebula/pull/3605) [#3590](https://github.com/vesoft-inc/nebula/pull/3590)

- Support properties function in `WHERE` clause of `GO` statement. [#3443](https://github.com/vesoft-inc/nebula/pull/3443)

- Enhancement date time parser. [#3179](https://github.com/vesoft-inc/nebula/pull/3179)

- Remove read lock in meta client to reduce the side effect of read-write locks. [#3256](https://github.com/vesoft-inc/nebula/pull/3256)

- Refactor storage index to solve the serious coupling between nodes. [#3196](https://github.com/vesoft-inc/nebula/pull/3196)

- Support to specify the floating point accuracy of the `round()` function. [#3178](https://github.com/vesoft-inc/nebula/pull/3178)ß

- Support https for ES client. [#3150](https://github.com/vesoft-inc/nebula/pull/3150)

- Move version info outside of heartbeat.  [#3378](https://github.com/vesoft-inc/nebula/pull/3378)

- Support empty list, set and map. [#3302](https://github.com/vesoft-inc/nebula/pull/3302)

- Support to specify s2 region coverer params when create geo index. [#3396](https://github.com/vesoft-inc/nebula/pull/3396)

- Add version info for `SHOW HOSTS`. [#3702](https://github.com/vesoft-inc/nebula/pull/3702)

## Bug fix

- Fixed the bug that memory wasn’t released when default value was used ​​when no value was specified in nGQL. [#3666](https://github.com/vesoft-inc/nebula/pull/3666)

- Fixed the bug of unknown function `coalesce()`. [#3653](https://github.com/vesoft-inc/nebula/pull/3653)

- Fixed the bug that using multi insert on an indexed tag will cause incorrect LOOKUP results. [#3627](https://github.com/vesoft-inc/nebula/pull/3627)

- Fixed the crash when the expression exceeds the depth. [#3606](https://github.com/vesoft-inc/nebula/pull/3606)

- Disable aggregate function in `YIELD` clause and `WHERE` clause of nGQL. [#3597](https://github.com/vesoft-inc/nebula/pull/3597)

- Fixed the crash when use aggregate function in `UNWILD` clause and `WHERE` clause. [#3397](https://github.com/vesoft-inc/nebula/pull/3397) [#3355](https://github.com/vesoft-inc/nebula/pull/3355)

- Fixed the bug that rebuild tag index with old schema version value. [#3332](https://github.com/vesoft-inc/nebula/pull/3332)

- Fixed the bug that the query results will still contain the expired edges if we use `GO...REVERSELY`. [#3536](https://github.com/vesoft-inc/nebula/pull/3536)

- Fixed the bug of estimate memory info in CentOS6. [#3534](https://github.com/vesoft-inc/nebula/pull/3534)

- Fixed the crash when the `LOOKUP` statement contains a filter which is consist of a LogicalAnd expression and an IN expression with only one element. [#3525](https://github.com/vesoft-inc/nebula/pull/3525)

- Fixed the bug that metad hang under high load. [#3482](https://github.com/vesoft-inc/nebula/pull/3482)

- Fixed the crash of unwinding subgraph. [#3506](https://github.com/vesoft-inc/nebula/pull/3506)

- Fixed the crash that `DROP SPACE` when rebuilding Index. [#3406](https://github.com/vesoft-inc/nebula/pull/3406)

- Fixed the bug of reading memory stats under cgroup v2. [#3419](https://github.com/vesoft-inc/nebula/pull/3419)

- Fixed the bug that `DROP TAG INDEX` deletes the edge index with same name unexpectedly, and vice versa for the deletion of the tag index. [#3413](https://github.com/vesoft-inc/nebula/pull/3413)

- Fixed the bug which can't show edge after clone space. [#3351](https://github.com/vesoft-inc/nebula/pull/3351)

- Fixed the bug of index existence check. [#3315](https://github.com/vesoft-inc/nebula/pull/3315)

- Fixed a bug that after `ALTER` statement there maybe cause the storage to obtain a null pointer when obtaining the type property. [#3325](https://github.com/vesoft-inc/nebula/pull/3325)

- Optimized raft to make the system more stable. [#3172](https://github.com/vesoft-inc/nebula/pull/3172) [#3435](https://github.com/vesoft-inc/nebula/pull/3435) [#3358](https://github.com/vesoft-inc/nebula/pull/3358) [#3322](https://github.com/vesoft-inc/nebula/pull/3322) [#3031](https://github.com/vesoft-inc/nebula/pull/3031)

- Cancel memory check when the ratio greater than 1.0. [#3289](https://github.com/vesoft-inc/nebula/pull/3289)

- Fixed the error when building with ninja. [#3195](https://github.com/vesoft-inc/nebula/pull/3195)

- Fixed the bug that concurrent create tag and edge with same name may be both succeed. [#3735](https://github.com/vesoft-inc/nebula/pull/3735)

- Fixed the bug that failed to create full-text index for the same tag or edge internal id in different space. [#3747](https://github.com/vesoft-inc/nebula/pull/3747)

- Fixed the inconsistent variable in `YIELD` clause and `GO` statement. [#3430](https://github.com/vesoft-inc/nebula/pull/3430)

## Incompatibility

Nebula Graph {{ nebula.release }} didn‘t support the most ecosystem tools of v2.x, please upgrade the [ecosystem tools](6.eco-tool-version.md).

- The storage services added in the configuration files cannot be read or written directly. The configuration files only register the storage services into the meta services. You must run the `ADD HOSTS` command to read and write data on storage servers. [#3343](https://github.com/vesoft-inc/nebula/pull/3343)

- Disable ZONE and GROUP. [#3776](https://github.com/vesoft-inc/nebula/pull/3776) [#3825](https://github.com/vesoft-inc/nebula/pull/3825)  [#3330](https://github.com/vesoft-inc/nebula/pull/3330)

- Disable `BALANCE DATA`.  [#3756](https://github.com/vesoft-inc/nebula/pull/3756)

- Modify default session timeout second from `0` to `28800` seconds, limit the value between `1` and `604800` seconds. [#3357](https://github.com/vesoft-inc/nebula/pull/3357) [#3807](https://github.com/vesoft-inc/nebula/pull/3807)

- Add `SHOW LOCAL SESSIONS` and `SHOW LOCAL QUERIES` command, and deprecate `SHOW ALL QUERIES`. [#3488](https://github.com/vesoft-inc/nebula/pull/3488)

- A tag is not required for a vertex. `DELETE VERTEX` only deletes the vertices, and does not delete the related outgoing and incoming edges of the vertices. At this time, there will be dangling edges by default. [#3316](https://github.com/vesoft-inc/nebula/pull/3316) [#3335](https://github.com/vesoft-inc/nebula/pull/3335) [#3328](https://github.com/vesoft-inc/nebula/pull/3328) [#3286](https://github.com/vesoft-inc/nebula/pull/3286)

- Disable `YIELD` var. [#3271](https://github.com/vesoft-inc/nebula/pull/3271)

- Must add `YIELD` clause in the `FETCH`, `GO`, `LOOKUP`, `FIND PATH` and `GET SUBGRAPH` statement. [#2957](https://github.com/vesoft-inc/nebula/pull/2957) [#3056](https://github.com/vesoft-inc/nebula/pull/3056) [#3139](https://github.com/vesoft-inc/nebula/pull/3139)

- Add non-reserved keywords: `s2_max_level`, `s2_max_cells`. [#3396](https://github.com/vesoft-inc/nebula/pull/3396)

- We must specify the tag to query properties of a vertex in a `MATCH` statement. For example, from `return v.name` to `return v.player.name`. [#3255](https://github.com/vesoft-inc/nebula/pull/3255)
## Legacy versions

[Release notes of legacy versions](https://nebula-graph.com.cn/tags/release-note/)

