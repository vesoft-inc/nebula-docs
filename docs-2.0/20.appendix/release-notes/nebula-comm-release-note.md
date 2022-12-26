# NebulaGraph {{ nebula.release }} release notes

## Enhancement

- Optimized the performance of k-hop. [#4560](https://github.com/vesoft-inc/nebula/pull/4560) [#4736](https://github.com/vesoft-inc/nebula/pull/4736)  [#4566](https://github.com/vesoft-inc/nebula/pull/4566) [#4582](https://github.com/vesoft-inc/nebula/pull/4582) [#4558](https://github.com/vesoft-inc/nebula/pull/4558) [#4556](https://github.com/vesoft-inc/nebula/pull/4556) [#4555](https://github.com/vesoft-inc/nebula/pull/4555) [#4516](https://github.com/vesoft-inc/nebula/pull/4516) [#4531](https://github.com/vesoft-inc/nebula/pull/4531) [#4522](https://github.com/vesoft-inc/nebula/pull/4522) [#4754](https://github.com/vesoft-inc/nebula/pull/4754) [#4762](https://github.com/vesoft-inc/nebula/pull/4762)

- Optimized `GO` statement join performance. [#4599](https://github.com/vesoft-inc/nebula/pull/4599) [#4750](https://github.com/vesoft-inc/nebula/pull/4750)

- Supported using `GET SUBGRAPH` to filter vertices. [#4357](https://github.com/vesoft-inc/nebula/pull/4357)

- Supported using `GetNeighbors` to filter vertices. [#4671](https://github.com/vesoft-inc/nebula/pull/4671)

- Optimized the loop handling of `FIND SHORTEST PATH`. [#4672](https://github.com/vesoft-inc/nebula/pull/4672)

- Supported the conversion between timestamp and date time. [#4626](https://github.com/vesoft-inc/nebula/pull/4526)

- Supported the reference of local variable in pattern expressions. [#4498](https://github.com/vesoft-inc/nebula/pull/4498)

- Optimized the job manager. [#4446](https://github.com/vesoft-inc/nebula/pull/4446) [#4442](https://github.com/vesoft-inc/nebula/pull/4442) [#4444](https://github.com/vesoft-inc/nebula/pull/4444) [#4460](https://github.com/vesoft-inc/nebula/pull/4460) [#4500](https://github.com/vesoft-inc/nebula/pull/4500) [#4633](https://github.com/vesoft-inc/nebula/pull/4633) [#4654](https://github.com/vesoft-inc/nebula/pull/4654) [#4663](https://github.com/vesoft-inc/nebula/pull/4663) [#4722](https://github.com/vesoft-inc/nebula/pull/4722) [#4742](https://github.com/vesoft-inc/nebula/pull/4742)

- Added flags of experimental features, <!-- `enable_toss` for `TOSS` and -->`enable_data_balance` for `BALANCE DATA`. [#4728](https://github.com/vesoft-inc/nebula/pull/4728)

- Stats log print to console when the process is started. [#4550](https://github.com/vesoft-inc/nebula/pull/4550)

- Supported the `JSON_EXTRACT` function. [#4743](https://github.com/vesoft-inc/nebula/pull/4743)

## Bugfix

- Fixed the crash of variable types collected. [#4724](https://github.com/vesoft-inc/nebula/pull/4724)

- Fixed the crash in the optimization phase of multiple `MATCH`. [#4780](https://github.com/vesoft-inc/nebula/pull/4780)

- Fixed the bug of aggregate expression type deduce. [#4706](https://github.com/vesoft-inc/nebula/pull/4706)

- Fixed the incorrect result of the `OPTIONAL MATCH` statement. [#4670](https://github.com/vesoft-inc/nebula/pull/4670)

- Fixed the bug of parameter expression in the `LOOKUP` statement. [#4664](https://github.com/vesoft-inc/nebula/pull/4664)

- Fixed the bug that `YIELD DISTINCT` returned a distinct result set in the `LOOKUP` statement. [#4651](https://github.com/vesoft-inc/nebula/pull/4651)

- Fixed the bug that `ColumnExpression` encode and decode are not matched. [#4413](https://github.com/vesoft-inc/nebula/pull/4413)

- Fixed the bug that `id($$)` filter was incorrect in the `GO` statement.  [#4768](https://github.com/vesoft-inc/nebula/pull/4768)

- Fixed the bug that full scan of `MATCH` statement when there is a relational `In` predicate. [#4748](https://github.com/vesoft-inc/nebula/pull/4748)

- Fixed the optimizer error of `MATCH` statement.[#4771](https://github.com/vesoft-inc/nebula/pull/4771)

- Fixed wrong output when using `pattern` expression as the filter in `MATCH` statement.  [#4778](https://github.com/vesoft-inc/nebula/pull/4778)

- Fixed the bug that tag, edge, tag index and edge index display incorrectly. [#4616](https://github.com/vesoft-inc/nebula/pull/4616)

- Fixed the bug of date time format. [#4524](https://github.com/vesoft-inc/nebula/pull/4524)

- Fixed the bug that the return value of the date time vertex was changed. [#4448](https://github.com/vesoft-inc/nebula/pull/4448)

- Fixed the bug that the startup service failed when the log directory not existed and `enable_breakpad` was enabled. [#4623](https://github.com/vesoft-inc/nebula/pull/4623)

- Fixed the bug that after the metad stopped, the status remained online. [#4610](https://github.com/vesoft-inc/nebula/pull/4610)

- Fixed the corruption of the log file. [#4409](https://github.com/vesoft-inc/nebula/pull/4409)

- Fixed the bug that `ENABLE_CCACHE` option didn't work. [#4648](https://github.com/vesoft-inc/nebula/pull/4648)

- Abandoned uppercase letters in full-text index names.  [#4628](https://github.com/vesoft-inc/nebula/pull/4628)

- Disable `COUNT(DISTINCT *)` . [#4553](https://github.com/vesoft-inc/nebula/pull/4553)

### Change

- Vertices without tags are not supported by default. If you want to use the vertex without tags, add `--graph_use_vertex_key=true` to the configuration files (`nebula-graphd.conf`) of all Graph services in the cluster, add `--use_vertex_key=true` to the configuration files (`nebula-storaged.conf`) of all Storage services in the cluster. [#4629](https://github.com/vesoft-inc/nebula/pull/4629) 

## Legacy versions

[Release notes of legacy versions](https://nebula-graph.io/posts/)
