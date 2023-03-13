# NebulaGraph {{ nebula.release }} release notes

## Feature

- Support [TOSS](../5.configurations-and-logs/1.configurations/3.graph-config.md). [#2525](https://github.com/vesoft-inc/nebula/pull/2525)
- Support [Group&Zone](../7.data-security/5.zone.md). [#181](https://github.com/vesoft-inc/nebula-storage/pull/181)
- Support [Geo Spatial](../3.ngql-guide/6.functions-and-expressions/14.geo.md). [#2954](https://github.com/vesoft-inc/nebula/pull/2954), [#2979](https://github.com/vesoft-inc/nebula/pull/2979), [#3043](https://github.com/vesoft-inc/nebula/pull/3043)
- Support [SSL encryption](../7.data-security/4.ssl.md). [#2584](https://github.com/vesoft-inc/nebula/pull/2584)
- Support returning the query result in the [JSON format](../14.client/1.nebula-client.md). [#2824](https://github.com/vesoft-inc/nebula/pull/2824)
- Support cloning the [meta data](../3.ngql-guide/9.space-statements/1.create-space.md) of SPACE. [#2763](https://github.com/vesoft-inc/nebula/pull/2763)
- Support [indexScan when using IN expressions in LOOKUP](../3.ngql-guide/7.general-query-statements/5.lookup.md). [#2906](https://github.com/vesoft-inc/nebula/pull/2906)
- Support integrating Breakpad. [#2536](https://github.com/vesoft-inc/nebula/pull/2536)
- Support copying the local folder of metad to [remote](../20.appendix/0.FAQ.md). [#2532](https://github.com/vesoft-inc/nebula/pull/2532)
- Support [`DELETE TAG`](../3.ngql-guide/10.tag-statements/6.delete-tag.md). [#2520](https://github.com/vesoft-inc/nebula/pull/2520)
- Support the [concat](../3.ngql-guide/6.functions-and-expressions/13.concat.md) function. [#2540](https://github.com/vesoft-inc/nebula/pull/2540)
- Support [`SHOW META LEADER`](../3.ngql-guide/7.general-query-statements/6.show/19.show-meta-leader.md). [#2542](https://github.com/vesoft-inc/nebula/pull/2542)

## Enhancement

- Optimize the limit pushdown computation of index scan. [#2905](https://github.com/vesoft-inc/nebula/pull/2905), [#2823](https://github.com/vesoft-inc/nebula/pull/2823), [#2796](https://github.com/vesoft-inc/nebula/pull/2796)
- Optimize the sampling at each step and the limit pushdown computation of the go statement. [#2904](https://github.com/vesoft-inc/nebula/pull/2904), [#2853](https://github.com/vesoft-inc/nebula/pull/2853), [#2831](https://github.com/vesoft-inc/nebula/pull/2831)
- Optimize the YIELD data format. [#2555](https://github.com/vesoft-inc/nebula/pull/2555), [#2572](https://github.com/vesoft-inc/nebula/pull/2572), [#2779](https://github.com/vesoft-inc/nebula/pull/2779), [#2895](https://github.com/vesoft-inc/nebula/pull/2895), [#2944](https://github.com/vesoft-inc/nebula/pull/2944)
- Enable prefix bloom filter by default to improve performance. [#2860](https://github.com/vesoft-inc/nebula/pull/2860)
- Support server to verify client version to make sure the connection reliability (client version start from v2.6.0). [#2965](https://github.com/vesoft-inc/nebula/pull/2965)
- Optimize flow control when pulling the entire partition. [#2557](https://github.com/vesoft-inc/nebula/pull/2557)
- `SHOW JOBS` only shows SPACE related. [#2872](https://github.com/vesoft-inc/nebula/pull/2872)
- Grant job permission for all roles except GUEST. [#2928](https://github.com/vesoft-inc/nebula/pull/2928)
- Improve memory watermark detection. [#2885](https://github.com/vesoft-inc/nebula/pull/2885)
- Support to kill the slow queries of storage. [#2534](https://github.com/vesoft-inc/nebula/pull/2534)

## Bug fix

- Fixed the bug that part of RocksDB data is cleaned when executing `raftpart::reset`. [#2522](https://github.com/vesoft-inc/nebula/pull/2522)
- Fixed the bug that mismatched dates are inserted. [#2527](https://github.com/vesoft-inc/nebula/pull/2527)
- Fixed the bug that setting millisecond failed but microsecond worked. [#2781](https://github.com/vesoft-inc/nebula/pull/2781)
- Fixed the bug that the Meta service crashed when too much data (millions of lines) are inserted in batches. [#2813](https://github.com/vesoft-inc/nebula/pull/2813)
- Fixed the bug that getting edges crashed when no edge schema exists in SPACE. [#2571](https://github.com/vesoft-inc/nebula/pull/2571)
- Fixed the bug that GO with WHERE clause expression eval when the property data type is `FIXED_STRING`. [#2762](https://github.com/vesoft-inc/nebula/pull/2762)
- Fixed the bug of FIND ALL PATH. [#2773](https://github.com/vesoft-inc/nebula/pull/2773)
- Fixed the bug that users without roles have the permission to find all roles of SPACE. [#2778](https://github.com/vesoft-inc/nebula/pull/2778)
- Fixed the bug of the CASE expression. [#2819](https://github.com/vesoft-inc/nebula/pull/2819)
- Fixed the bug that the infinite loop is returned when using time(). [#2820](https://github.com/vesoft-inc/nebula/pull/2820)
- Fixed the bug that the JOB is still running when the node is already shut down. [#2843](https://github.com/vesoft-inc/nebula/pull/2843)
- Fixed the bug that `INSERT` statements may cause inconsistent property values between replicas in the case of multiple replicas. [#2862](https://github.com/vesoft-inc/nebula/pull/2862)
- Fixed the bug that SPACE goes wrong when submitting job after USE. [#3010](https://github.com/vesoft-inc/nebula/pull/3010)
- Fixed the bug that getting properties of the thrift structure failed when the column is not null. [#3012](https://github.com/vesoft-inc/nebula/pull/3012)
- Fixed the bug that graphd is still running even if the meta service is not ready. [#3069](https://github.com/vesoft-inc/nebula/pull/3069)
- Fixed the bug that dangling edge returns a null vertex when using `FIND PATH WITH PROP`. [#3008](https://github.com/vesoft-inc/nebula/pull/3008)
- Fixed the bug that executing `YIELD DISTINCT` map crashed. [#3051](https://github.com/vesoft-inc/nebula/pull/3051)
- Fixed the bug that the service can still start with a wrong ip/host. [#3057](https://github.com/vesoft-inc/nebula/pull/3057)
- Fixed the bug that repeatedly modifying the same property in one statement returns an error. [#3036](https://github.com/vesoft-inc/nebula/pull/3036)
- Fixed the bug that the multi-step filtering on edge is invalid. [#3144](https://github.com/vesoft-inc/nebula/pull/3144)

## Legacy versions

[Release notes of legacy versions](https://nebula-graph.com.cn/tags/release-note/)
