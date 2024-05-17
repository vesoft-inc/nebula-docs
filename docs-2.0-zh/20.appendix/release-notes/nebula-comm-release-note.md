# {{nebula.name}} 更新说明

## v3.8.0


- 功能：

  - 现已支持 SINGLE SHORTEST PATH 功能。 [#5664](https://github.com/vesoft-inc/nebula/pull/5664)

  - 已实现 INNER JOIN 功能。 [#5664](https://github.com/vesoft-inc/nebula/pull/5664)

  - ROUND() 函数现已支持舍入模式。[#5680](https://github.com/vesoft-inc/nebula/pull/5680)

- 增强：

  - 性能：

    - SHORTEST PATH 现已支持 LIMIT 下推，以提升性能。 [#5657](https://github.com/vesoft-inc/nebula/pull/5657)

    - 优化了部分逻辑，以避免 follower 宕机后对写性能的影响。 [#5673](https://github.com/vesoft-inc/nebula/pull/5673)

    - 优化了 meta service 对 session 的管理，以减少高并发场景下的延迟。 [#5762](https://github.com/vesoft-inc/nebula/pull/5762)

    - 优化了 LIMIT 下推规则以提升性能。[#5883](https://github.com/vesoft-inc/nebula/pull/5883)

  - 易用性：

    - 优化了删除 graph space 的过程，减少了阻塞时间。 [#5754](https://github.com/vesoft-inc/nebula/pull/5754)

  - 稳定性：

    - 优化了 LEADER BALANCE 算法，以实现更均衡的负载分配。 [#5670](https://github.com/vesoft-inc/nebula/pull/5670)

    - 增加了对最大语句条数的限制，以增强系统的保护机制。 [#5790](https://github.com/vesoft-inc/nebula/pull/5790)

- 缺陷修复：

  - DQL：

    - 修复了多次执行 LOOKUP 语句时，结果不一致的问题。 [#5662](https://github.com/vesoft-inc/nebula/pull/5662)

    - 修复了 UNION ALL 报语法错误的问题。 [#5674](https://github.com/vesoft-inc/nebula/pull/5674)

    - 修复了在 SHORTEST PATH、ALL PATH、NOLOOP PATH 场景下 LIMIT 结果错误、崩溃等问题。 [#5679](https://github.com/vesoft-inc/nebula/pull/5787)、[#5699](https://github.com/vesoft-inc/nebula/pull/5699)、[#5787](https://github.com/vesoft-inc/nebula/pull/5787)、[#5789](https://github.com/vesoft-inc/nebula/pull/5789)

    - 修复了在设置 memory tracker 的情况下，多次重复执行 SHORTEST PATH 导致的崩溃问题。[#5720](https://github.com/vesoft-inc/nebula/pull/5720)

    - 修复了 Filter 错误，避免 Graph Service 崩溃。 [#5740](https://github.com/vesoft-inc/nebula/pull/5740)

    - 修复了多变量场景下执行失败的问题。 [#5734](https://github.com/vesoft-inc/nebula/pull/5734)

    - 修复了 MATCH SHORTEST PATH 不支持自环检测的问题。 [#5738](https://github.com/vesoft-inc/nebula/pull/5738)

    - 修复了在过滤条件永远不成立时，部分场景下的崩溃问题。 [#5740](https://github.com/vesoft-inc/nebula/pull/5740)

    - 修复了 ROUND 函数的崩溃问题。 [#5773](https://github.com/vesoft-inc/nebula/pull/5773)

    - 修复了 FIND PATH WITH PROP 在一跳查询时，结果错误的问题。 [#5759](https://github.com/vesoft-inc/nebula/pull/5759)

    - 修复了在执行 USE SPACE + 查询时，性能变慢的问题。 [#5793](https://github.com/vesoft-inc/nebula/pull/5793)

    - 修复了 FIND NOLOOP PATH 未排除自环的问题。 [#5805](https://github.com/vesoft-inc/nebula/pull/5805)

  - 其他：

    - 修复了在执行 CLONE SPACE 时的错误。 [#3005](https://github.com/vesoft-inc/nebula/pull/3005)、[#5781](https://github.com/vesoft-inc/nebula/pull/5781)

    - 修复了在存在索引时，num_vertices_inserted 监控指标无数据的问题。 [#5756](https://github.com/vesoft-inc/nebula/pull/5756)

    - 修复了在进行查询和 Schema 的变更同时进行时可能出现崩溃的问题。 [#5855](https://github.com/vesoft-inc/nebula/pull/5855)





