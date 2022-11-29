# Nebula Graph {{ nebula.release }} release notes

## Changes

- Vertex without tag is not supported by default. If you want to use the vertex without tags, add --graph_use_vertex_key=true to the configuration files (nebula-graphd.conf) of all Graph services in the cluster, and add --use_vertex_key=true to the configuration files (nebula-storaged.conf) of all Storage services in the cluster.

## Enhancement

- Support to show the status of [synchronize between two clusters]((../synchronization-and-migration/replication-between-clusters.md)).

- Enhanced memory usage of `AtomicLogBuffer` to avoid OOM problems when rebuilding indexes and data synchronization.

- Unify the configuration file.

- Adjust the level of the heartbeat log.

## Bugfix

- Fixed the crash of web service when receiving some special attack messages.
- Fixed the crash on dropping the full-text index.
- Fixed the crash of map concurrency.
- Fixed the crash of raft in certain cases.
- Fixed the storage service crash when the length of the VID in a vertex or edge deletion statement exceeds the defined length on an indexed base.
- Fixed the crash caused by a wrong expression syntax.
- Fixed the crash of `LOOKUP`.
- Fixed the crash of complex `MATCH`.
- Fixed the crash in the optimization phase of multiple `MATCH`.
- Fixed the crash of variable types collected.
- Fixed the crash caused by an illegal expression.
- Fixed the bug that storage would hang when there is only the space path but no part path.
- Fixed the deadlock of leader balance job executor.
- Fixed the infinite loop when building a balance plan.
- Fixed the bug of rebuilding full-text index failure.
- Fixed the bug of using logrotate.
- Fixed the bug that the machine key is lost when restoring.
- Fixed the bug that the host can't stop when canceling the future of the snapshot.
- Fixed the bug of cache size overflow and deadlock.
- Fixed the bug of missing the `RETURN` clause in MetaDaemon.
- Fixed the split brain in the raft.
- Fixed the bug that the meta listener validated the license.
- Fixed the bug that the meta listener didn't clean data.
- Fixed the bug of the drainer syncing dirty data.
- Fixed the bug that the drainer daemon can't exit normally.
- Fixed the bug to keep the audit log async available.
- Fixed the concurrent exception of multiple `MATCH`.
- Fixed the bug that the rebuild tag index task could not be re-executed properly.
- Fixed the bug that the rebuild tag index job always failed after stopping a running job.
- Fixed the bug that the ElasticSearch writing error caused by truncation of UTF8 characters.
- Fixed the bug to remove the truncated text before writing into ElasticSearch.
- Fixed the bug when using ElasticSearch for audit logs, the audit logs of DML and DQL types are not recorded.
- Fixed the bug where the service could not be started if the log directory did not exist when `ENABLE_BREAKPAD` was enabled.
- Fixed the bug that If there is a GOD whose name is not root, the root user will be created when meta init.

## Legacy versions

[Release notes of legacy versions](https://nebula-graph.io/posts/)
