# Nebula Graph {{ nebula.release }} release notes

## Changes

- Vertices cannot be inserted without a tag by default. To insert a vertex without a tag, add the `--graph_use_vertex_key=true` option to the `nebula-graphd.conf` configuration files of all Graph services, and add `--use_vertex_key=true` to the `nebula-storaged.conf` configuration files of all Storage services in the cluster.

## Enhancement

- Supported the status show of the [synchronization between two clusters](../synchronization-and-migration/replication-between-clusters.md).

- Enhanced memory usage of `AtomicLogBuffer` to avoid OOM problems when rebuilding indexes and data synchronization.

- Unified the configuration file.

- Adjusted the level of the heartbeat log.

## Bugfix

- Fixed the web service crash when receiving some special attack messages.
- Fixed the crash due to the full-text index dropping.
- Fixed the crash due to map concurrency.
- Fixed the raft crash in certain cases.
- Fixed the storage service crash when the length of the VID in a vertex or edge deletion statement exceeds the defined length on an indexed base.
- Fixed the crash caused by a wrong expression syntax.
- Fixed the crash when running a `LOOKUP` statement.
- Fixed the crash when running a complex `MATCH` statement.
- Fixed the crash in the optimization phase of multiple `MATCH`.
- Fixed the crash when collecting variable types.
- Fixed the crash caused by an illegal expression.
- Fixed the bug that storage would hang when there is only the space path but no part path.
- Fixed the deadlock of leader balance job executor.
- Fixed the infinite loop when building a balance plan.
- Fixed the failure of rebuilding a full-text index.
- Fixed the logrotate usage problem.
- Fixed the bug that the machine key is lost when restoring.
- Fixed the bug that the host can't stop when canceling the progress of sending snapshots.
- Fixed the cache size overflow and deadlock bug.
- Fixed the bug of missing the `RETURN` clause in MetaDaemon.
- Fixed the raft split brain problem.
- Fixed the bug that the meta listener validated the license.
- Fixed the bug that the meta listener didn't clean data.
- Fixed the bug that the drainer synchronized dirty data.
- Fixed the bug that the drainer daemon can't exit normally.
- Fixed the problem that audit log cannot be used asynchronously.
- Fixed the concurrent exception when executing multiple `MATCHES` .
- Fixed the bug that the tag index rebuilding task could not be re-executed properly.
- Fixed the bug that the tag index rebuilding task always failed after stopping a running job.
- Fixed the bug that the ElasticSearch writing error caused by truncation of UTF8 characters.
- Fixed the bug that the truncated text was removed before writing into ElasticSearch.
- Fixed the bug that the audit logs of DML and DQL types are not recorded when using ElasticSearch to store audit logs.
- Fixed the bug that the service could not be started if the log directory did not exist when `ENABLE_BREAKPAD` was enabled.
- Fixed the bug that when there was a GOD whose name was not `root`, the root user were created when the meta initiated.

## Legacy versions

[Release notes of legacy versions](https://nebula-graph.io/posts/)
