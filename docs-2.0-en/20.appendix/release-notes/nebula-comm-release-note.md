# NebulaGraph {{ nebula.release }} release notes


- Features:

  - Introduced the SINGLE SHORTEST PATH statement. [#5664](https://github.com/vesoft-inc/nebula/pull/5664)

  - Introduced the INNER JOIN statement. [#5664](https://github.com/vesoft-inc/nebula/pull/5664)

  - The ROUND() function now supports various rounding modes. [#5680](https://github.com/vesoft-inc/nebula/pull/5680)

- Enhancements:

  - Performance:

    - The SHORTEST PATH statement now supports LIMIT pushdown to improve performance. [#5657](https://github.com/vesoft-inc/nebula/pull/5657)

    - Optimized certain logic to mitigate the impact on write performance after a follower crashes. [#5673](https://github.com/vesoft-inc/nebula/pull/5673)

    - The session management of the meta service has been optimized to reduce latency in high concurrency scenarios. [#5762](https://github.com/vesoft-inc/nebula/pull/5762)

  - Usability:

    - Optimized the process of graph space deletion to reduce blocking time. [#5754](https://github.com/vesoft-inc/nebula/pull/5754)

  - Stability:

    - Optimized the LEADER BALANCE algorithm for a more balanced load distribution. [#5670](https://github.com/vesoft-inc/nebula/pull/5670)

    - Introduced a limit on the maximum number of statements to enhance system protection mechanisms. [#5790](https://github.com/vesoft-inc/nebula/pull/5790)

- Bug Fixes:

  - DQL:

    - Fixed inconsistent results when executing the LOOKUP statement multiple times. [#5662](https://github.com/vesoft-inc/nebula/pull/5662)

    - Fixed the UNION ALL syntax error issue. [#5674](https://github.com/vesoft-inc/nebula/pull/5674)

    - Fixed issues with incorrect LIMIT results and crashes in SHORTEST PATH, ALL PATH, and NOLOOP PATH scenarios. [#5679](https://github.com/vesoft-inc/nebula/pull/5787), [#5699](https://github.com/vesoft-inc/nebula/pull/5699), [#5787](https://github.com/vesoft-inc/nebula/pull/5787), [#5789](https://github.com/vesoft-inc/nebula/pull/5789)

    - Fixed the crash issue when executing the SHORTEST PATH statement multiple times with a memory tracker set. [#5720](https://github.com/vesoft-inc/nebula/pull/5720)

    - Fixed a filtering error to prevent the Graph service from crashing. [#5740](https://github.com/vesoft-inc/nebula/pull/5740)

    - Fixed execution failure in multi-variable scenarios. [#5734](https://github.com/vesoft-inc/nebula/pull/5734)

    - Fixed the issue of MATCH SHORTEST PATH not supporting self-loop detection. [#5738](https://github.com/vesoft-inc/nebula/pull/5738)

    - Fixed the crash issue in some scenarios when the filter condition is never met. [#5740](https://github.com/vesoft-inc/nebula/pull/5740)

    - Fixed the crash issue with the ROUND function. [#5773](https://github.com/vesoft-inc/nebula/pull/5773)

    - Fixed the incorrect result issue when executing FIND PATH WITH PROP in a one-hop query. [#5759](https://github.com/vesoft-inc/nebula/pull/5759)

    - Fixed the performance degradation issue when the USE SPACE clause is included in a query statement. [#5793](https://github.com/vesoft-inc/nebula/pull/5793)

    - Fixed the issue of FIND NOLOOP PATH not excluding self-loops. [#5805](https://github.com/vesoft-inc/nebula/pull/5805)

  - Others:

    - Fixed errors when executing the CLONE SPACE statement. [#3005](https://github.com/vesoft-inc/nebula/pull/3005), [#5781](https://github.com/vesoft-inc/nebula/pull/5781)

    - Fixed the issue of no data for the num_vertices_inserted metric when an index exists. [#5756](https://github.com/vesoft-inc/nebula/pull/5756)

    - Fixed a potential crash issue when queries and schema changes are performed simultaneously. [#5855](https://github.com/vesoft-inc/nebula/pull/5855)