# NebulaGraph {{ nebula.release }} release notes

## Enhancement 

- Patterns can now be used in `WHERE` statements. For example: `MATCH (v:player) WHERE (v)-[:like]->() RETURN v`. [#3997](https://github.com/vesoft-inc/nebula/pull/3997) 
- `CLEAR SPACE` can be used to clear graph space and index data, but the graph space schema and index names are reserved. [#3989](https://github.com/vesoft-inc/nebula/pull/3989) 
- The vertex alias can be repeated in match patterns, like `MATCH (v)-->(v)`. [#3929](https://github.com/vesoft-inc/nebula/pull/3929) 
- Optimized `SUBGRAPH` and `FIND PATH` for better performance. [#3871](https://github.com/vesoft-inc/nebula/pull/3871) [#4095](https://github.com/vesoft-inc/nebula/pull/4095)  
- Optimized query paths to reduce redundant paths and time complexity.[4126](https://github.com/vesoft-inc/nebula/pull/4162) 
- Optimized the method to get properties for better performance of `MATCH` statements. [#3750](https://github.com/vesoft-inc/nebula/pull/3750) 
- Optimized `GO` and `YIELD` clauses to avoid extracting redundant properties. [#3974](https://github.com/vesoft-inc/nebula/pull/3974) 
- Support for filter and limit pushdown when getting properties. [3844](https://github.com/vesoft-inc/nebula/pull/3844) [3839](https://github.com/vesoft-inc/nebula/pull/3839) 
- `maxHop` is optional in MATCH variable-length paths.[#3881](https://github.com/vesoft-inc/nebula/pull/3881) 
- Graph spaces are physically deleted after using `DROP SPACE`. [#3913](https://github.com/vesoft-inc/nebula/pull/3913) 
- Optimized number parsing in date time, date, time. [#3797](https://github.com/vesoft-inc/nebula/pull/3797) 
- Added the `toSet` function which converts `LIST` or `SET` to `SET`. [#3594](https://github.com/vesoft-inc/nebula/pull/3594) 
- nGQL statements can be used to display the HTTP port of NebulaGraph services and the HTTP2 port has been disabled. [#3808](https://github.com/vesoft-inc/nebula/pull/3808) 
- The number of sessions for connections to each graphd with the same client IP and the same user is limited. [#3729](https://github.com/vesoft-inc/nebula/pull/3729) 
- Optimized the waiting mechanism to ensure a timely connection to the metad after the storaged starts. [#3971](https://github.com/vesoft-inc/nebula/pull/3971) 
- When a node has multiple paths and an error of the disk corresponding to a particular path occurs, it is no longer to rebuild the node. [#4131](https://github.com/vesoft-inc/nebula/pull/4131)
- Optimized the job manager. [#3976](https://github.com/vesoft-inc/nebula/pull/3976) [#4045](https://github.com/vesoft-inc/nebula/pull/4045) [#4001](https://github.com/vesoft-inc/nebula/pull/4001)  
- The `DOWNLOAD` and `INGEST` SST files are now managed with the job manager. [#3994](https://github.com/vesoft-inc/nebula/pull/3994)
- Support for error code display when a job fails. [#4067](https://github.com/vesoft-inc/nebula/pull/4067) 
- The OS page cache can be disabled and the block cache and NebulaGraph storage cache can only be used in a shared environment, to avoid memory usage interference between applications. [#3890](https://github.com/vesoft-inc/nebula/pull/3890) 
- Updated the default value of the KV separation threshold from 0 to 100. [#3879](https://github.com/vesoft-inc/nebula/pull/3879) 
- Support for using gflag to set the upper limit of expression depth for a better fit of different machine environments. [#3722](https://github.com/vesoft-inc/nebula/pull/3722) 
- Added a permission check for `KILL QUERY`. When the authorization is enabled, the GOD user can kill any query and the users with other roles can only kill queries that they own. [#3896](https://github.com/vesoft-inc/nebula/pull/3896) 
- Support for more complier launchers, including distcc and sccache. [#3896](https://github.com/vesoft-inc/nebula/pull/3896) 
- More dumping tables are supported with the meta dump tool. [#3870](https://github.com/vesoft-inc/nebula/pull/3870) 
- The storage layer controls the concurrency of write operations (INSERT VERTEX or EDGE) from reporting an error and requiring a client retry to using the internal queueing mechanism. [#3926](https://github.com/vesoft-inc/nebula/pull/3926)

## Bugfix

- Fixed the crash when using a function call as part of a filter in a `LOOKUP` statement. [#4111](https://github.com/vesoft-inc/nebula/pull/4111) 
- Fixed the crash when there were non-indexed properties in an `IN` clause. [#3986](https://github.com/vesoft-inc/nebula/pull/3986) 
- Fixed the storage service crash when concurrently scanning vertices and edges. [#4190](https://github.com/vesoft-inc/nebula/pull/4190) 
- Fixed the crash when performing aggregation queries with patterns in a `MATCH` statement. [#4180](https://github.com/vesoft-inc/nebula/pull/4180) 
- Fixed the crash when getting the JSON results of a `profile` query. [#3998](https://github.com/vesoft-inc/nebula/pull/3998) 
- Fixed the crash when the `async` interface in the Lambda function finished running and the task in `threadManager` was not executed. [#4000](https://github.com/vesoft-inc/nebula/pull/4000) 
- Fixed the `GROUP BY` output bug. [#4128](https://github.com/vesoft-inc/nebula/pull/4128) 
- Fixed the bug that the version wasn't displayed with `SHOW HOSTS` sometimes. [#4116](https://github.com/vesoft-inc/nebula/pull/4116) 
- Fixed the bug on parameters for `id(n) == $var`, `id(n) IN [$var]`, `id(n) == $var.foo.bar`, and `id(n) IN $var.foo.bar`. [#4024](https://github.com/vesoft-inc/nebula/pull/4024) 
- Fixed the bug that an incorrect path direction occurred in `MATCH...WHERE`. [#4091](https://github.com/vesoft-inc/nebula/pull/4091) 
- Fixed the bug that the result of referencing multiple `MATCH` variables in a `WHERE` clause was incorrect. [#4143](https://github.com/vesoft-inc/nebula/pull/4143) 
- Fixed the optimizer bug. [#4146](https://github.com/vesoft-inc/nebula/pull/4146) 
- Fixed the bug that the storage service failed to handle Raft snapshots. [#4019](https://github.com/vesoft-inc/nebula/pull/4019) 
- Fixed the bug that the storage service would not accept more logs after receiving a snapshot. [#3909](https://github.com/vesoft-inc/nebula/pull/3909)
- Fixed the bug that snapshots did not contain the vertices without tags. [#4189](https://github.com/vesoft-inc/nebula/pull/4189) 
- Fixed the latest schema version read failure when the schema version is greater than 255. [#4023](https://github.com/vesoft-inc/nebula/pull/4023) 
- Fixed the bug that `SHOW STATS` did not count the vertices that had no tags. [#3967](https://github.com/vesoft-inc/nebula/pull/3967) 
- Fixed the bug that the timestamp was fetched incorrectly sometimes. [#3958](https://github.com/vesoft-inc/nebula/pull/3958) 
- Fixed the bug that the `root` user could be granted with other roles in the graph space. [#3868](https://github.com/vesoft-inc/nebula/pull/3868) 
- Fixed the duplicate count of column indexes in the lexical parser bug. [#3626](https://github.com/vesoft-inc/nebula/pull/3626) 


## Legacy versions

[Release notes of legacy versions](https://nebula-graph.io/posts/)
