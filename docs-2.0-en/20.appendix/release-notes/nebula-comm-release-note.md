# NebulaGraph {{ nebula.release }} release notes

- Features:

  - Introduced SINGLE SHORTEST PATH functionality. [#5664](https://github.com/vesoft-inc/nebula/pull/5664)

  - Implemented INNER JOIN functionality. [#5664](https://github.com/vesoft-inc/nebula/pull/5664)

  - ROUND() function now supports rounding modes. [#5680](https://github.com/vesoft-inc/nebula/pull/5680)

- Enhancements:

  - Performance:

    - SHORTEST PATH now supports limit pushdown for performance improvement. [#5657](https://github.com/vesoft-inc/nebula/pull/5657)

    - Optimized some logic to mitigate the impact on write performance after a follower crashes. [#5673](https://github.com/vesoft-inc/nebula/pull/5673)

    - Optimized meta service's session management to reduce latency in high concurrency scenarios. [#5762](https://github.com/vesoft-inc/nebula/pull/5762)

  - Usability:

    - Optimized the process of deleting graph spaces, reducing blockage time. [#5754](https://github.com/vesoft-inc/nebula/pull/5754)

  - Stability:

    - Optimized LEADER BALANCE algorithm for more balanced load distribution. [#5670](https://github.com/vesoft-inc/nebula/pull/5670)

    - Added a limit for the maximum number of statements to enhance system protection mechanisms. [#5790](https://github.com/vesoft-inc/nebula/pull/5790)

- Bug Fixes:

  - DQL:

    - Fixed inconsistent results when executing the LOOKUP statement multiple times. [#5662](https://github.com/vesoft-inc/nebula/pull/5662)

    - Fixed UNION ALL syntax error issue. [#5674](https://github.com/vesoft-inc/nebula/pull/5674)

    - Fixed issues with incorrect LIMIT results, crashes, etc., in SHORTEST PATH, ALL PATH, NOLOOP PATH scenarios. [#5679](https://github.com/vesoft-inc/nebula/pull/5787), [#5699](https://github.com/vesoft-inc/nebula/pull/5699), [#5787](https://github.com/vesoft-inc/nebula/pull/5787), [#5789](https://github.com/vesoft-inc/nebula/pull/5789)

    - Fixed crash issue when executing SHORTEST PATH multiple times with memory tracker set. [#5720](https://github.com/vesoft-inc/nebula/pull/5720)

    - Fixed Filter error to prevent Graph Service crash. [#5740](https://github.com/vesoft-inc/nebula/pull/5740)

    - Fixed execution failure in multi-variable scenarios. [#5734](https://github.com/vesoft-inc/nebula/pull/5734)

    - Fixed MATCH SHORTEST PATH not supporting self-loop detection issue. [#5738](https://github.com/vesoft-inc/nebula/pull/5738)

    - Fixed crash issue in some scenarios when filter condition is never met. [#5740](https://github.com/vesoft-inc/nebula/pull/5740)

    - Fixed crash issue with ROUND function. [#5773](https://github.com/vesoft-inc/nebula/pull/5773)

    - Fixed incorrect result issue when executing FIND PATH WITH PROP in one-hop query. [#5759](https://github.com/vesoft-inc/nebula/pull/5759)

    - Fixed performance degradation issue when executing USE SPACE + query. [#5793](https://github.com/vesoft-inc/nebula/pull/5793)

    - Fixed FIND NOLOOP PATH not excluding self-loop issue. [#5805](https://github.com/vesoft-inc/nebula/pull/5805)

  - Others:

    - Fixed errors when executing CLONE SPACE. [#3005](https://github.com/vesoft-inc/nebula/pull/3005), [#5781](https://github.com/vesoft-inc/nebula/pull/5781)

    - Fixed issue with no data for num_vertices_inserted metric when index exists. [#5756](https://github.com/vesoft-inc/nebula/pull/5756)

    - Fixed potential crash issue when query and Schema changes are performed simultaneously. [#5855](https://github.com/vesoft-inc/nebula/pull/5855)