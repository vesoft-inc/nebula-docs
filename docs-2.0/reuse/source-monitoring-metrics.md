### Graph

| Parameter                                           | Description                                                         |
| ---------------------------------------------- | ------------------------------------------------------------ |
| `num_active_queries`                             | The number of active query changes in the last 5 seconds.<br> Formula: The number of queries that started executing in the last 5 seconds minus the number of queries that finished executing in the last 5 seconds.              |
| `num_active_sessions`                            | The number of active session changes in the last 5 seconds.<br> Formula: The number of sessions logged in in the last 5 seconds minus the number of sessions logged out in the last 5 seconds.<br>For example: In the last 5 seconds, there were 10 sessions logged in and 30 sessions logged out, then the value of this metric is `-20` (10-30).                   |
| `num_aggregate_executors`                        | The number of executions for the Aggregation operator.       |
| `num_auth_failed_sessions_bad_username_password` | The number of sessions where authentication failed due to incorrect username and password. |
| `num_auth_failed_sessions_out_of_max_allowed` |  The number of sessions that failed to authenticate logins because the value of the parameter `FLAG_OUT_OF_MAX_ALLOWED_CONNECTIONS` was exceeded.|
| `num_auth_failed_sessions`                       | The number of sessions in which login authentication failed. |
| `num_indexscan_executors`                        | The number of executions for index scan operators.        |
| `num_killed_queries`                             | The number of killed queries.                                |
| `num_opened_sessions`                            | The number of sessions connected to the server.              |
| `num_queries`                                    | The number of queries.                                       |
| `num_query_errors_leader_changes`                | The number of the raft leader changes due to query errors.            |
| `num_query_errors`                               | The number of query errors.                                   |
| `num_reclaimed_expired_sessions`                 | The number of expired sessions actively reclaimed by the server. |
| `num_rpc_sent_to_metad_failed`                   | The number of failed RPC requests that the Graphd service sent to the Metad service. |
| `num_rpc_sent_to_metad`                          | The number of RPC requests that the Graphd service sent to the Metad service. |
| `num_rpc_sent_to_storaged_failed`                | The number of failed RPC requests that the Graphd service sent to the Storaged service. |
| `num_rpc_sent_to_storaged`                       | The number of RPC requests that the Graphd service sent to the Storaged service. |
| `num_sentences`                                  | The number of statements received by the Graphd service.     |
| `num_slow_queries`                               | The number of slow queries.                                  |
| `num_sort_executors`                             | The number of executions for the Sort operator.              |
| `optimizer_latency_us`                           | The latency of executing optimizer statements.                                             |
| `query_latency_us`                               | The average latency of queries.                                           |
| `slow_query_latency_us`                          | The average latency of slow queries.                                         |
| `num_queries_hit_memory_watermark` | The number of queries reached the memory watermark. |

### Meta

| Parameter                       | Description                                |
| -------------------------- | ----------------------------------- |
| `commit_log_latency_us`      | The latency of committing logs in Raft. |
| `commit_snapshot_latency_us` | The latency of committing snapshots in Raft. |
| `heartbeat_latency_us`       | The latency of heartbeats.                          |
| `num_heartbeats`             | The number of heartbeats.                          |
| `num_raft_votes`             | The number of votes in Raft.             |
| `transfer_leader_latency_us` | The latency of transferring the raft leader. |
| `num_agent_heartbeats`        | The number of heartbeats for the AgentHBProcessor.|
| `agent_heartbeat_latency_us`  | The average latency of the AgentHBProcessor.|
| `replicate_log_latency_us`   | The latency of replicating the log record to most nodes by Raft. |
| `num_send_snapshot`          | The number of times that Raft sends snapshots to other nodes.  |
| `append_log_latency_us`      | The latency of replicating the log record to a single node by Raft.  |
| `append_wal_latency_us`      | The Raft write latency for a single WAL.                            |
| `num_grant_votes`            | The number of times that Raft votes for other nodes.                            |
| `num_start_elect`            | The number of times that Raft starts an election.                            |

### Storage

| Parameter                         | Description                                                |
| ---------------------------- | --------------------------------------------------- |
| `add_edges_atomic_latency_us` | The average latency of adding edge single. |
| `add_edges_latency_us`         | The average latency of adding edges.                                  |
| `add_vertices_latency_us`      | The average latency of adding vertices.                                 |
| `commit_log_latency_us`        | The latency of committing logs in Raft.                 |
| `commit_snapshot_latency_us`   | The latency of committing snapshots in Raft.                 |
| `delete_edges_latency_us`      | The average latency of deleting edges.                                  |
| `delete_vertices_latency_us`   | The average latency of deleting vertices.                                  |
| `get_neighbors_latency_us`     | The average latency of querying neighbor vertices.                                  |
| `num_get_prop`                 | The number of executions for the GetPropProcessor.                       |
| `num_get_neighbors_errors`     | The number of execution errors for the GetNeighborsProcessor.             |
| `get_prop_latency_us`          | The average latency of executions for the GetPropProcessor.|
| `num_edges_deleted`            | The number of deleted edges.                                      |
| `num_edges_inserted`           | The number of inserted edges.                                      |
| `num_raft_votes`               | The number of votes in Raft.                             |
| `num_rpc_sent_to_metad_failed` | The number of failed RPC requests that the Storage service sent to the Meta service. |
| `num_rpc_sent_to_metad`        | The number of RPC requests that the Storaged service sent to the Metad service.       |
| `num_tags_deleted`             | The number of deleted tags.                                   |
| `num_vertices_deleted`         | The number of deleted vertices.                                      |
| `num_vertices_inserted`        | The number of inserted vertices.      |
| `transfer_leader_latency_us`   | The latency of transferring the raft leader.                 |
| `lookup_latency_us`            | The average latency of executions for the LookupProcessor.                       |
| `num_lookup_errors`            | The number of execution errors for the LookupProcessor.|
| `num_scan_vertex`              | The number of executions for the ScanVertexProcessor.|
| `num_scan_vertex_errors`       | The number of execution errors for the ScanVertexProcessor.|
| `update_edge_latency_us`       | The average latency of executions for the UpdateEdgeProcessor.|
| `num_update_vertex`            | The number of executions for the UpdateVertexProcessor.|
| `num_update_vertex_errors`     | The number of execution errors for the UpdateVertexProcessor.|
| `kv_get_latency_us`            | The average latency of executions for the Getprocessor.|
| `kv_put_latency_us`            | The average latency of executions for the PutProcessor.|
| `kv_remove_latency_us`         | The average latency of executions for the RemoveProcessor.|
| `num_kv_get_errors`            | The number of execution errors for the GetProcessor.|
| `num_kv_get`                   | The number of executions for the GetProcessor.|
| `num_kv_put_errors`            | The number of execution errors for the PutProcessor.|
| `num_kv_put`                   | The number of executions for the PutProcessor.|
| `num_kv_remove_errors`         | The number of execution errors for the RemoveProcessor.|
| `num_kv_remove`                | The number of executions for the RemoveProcessor.|
| `forward_tranx_latency_us`     | The average latency of transmission.|
| `scan_edge_latency_us`         | The average latency of executions for the ScanEdgeProcessor.                  |
| `num_scan_edge_errors`         | The number of execution errors for the ScanEdgeProcessor.                  |
| `num_scan_edge`                | The number of executions for the ScanEdgeProcessor.                  |
| `scan_vertex_latency_us`       | The latency of executions for the ScanVertexProcessor.                |
| `num_add_edges`                | The number of times that edges are added.                 |
| `num_add_edges_errors`         | The number of errors when adding edges.                   |
| `num_add_vertices`             | The number of times that vertices are added.                  |
| `num_start_elect`              | The number of times that Raft starts an election.                  |
| `num_add_vertices_errors`      | The number of errors when adding vertices.             |
| `num_delete_vertices_errors`   | The number of errors when deleting vertices.                  |
| `append_log_latency_us`        | The latency of replicating the log record to a single node by Raft.                 |
| `num_grant_votes`              | The number of times that Raft votes for other nodes.                 |
| `replicate_log_latency_us`     | The latency of replicating the log record to most nodes by Raft.                  |
| `num_delete_tags`              | The number of times that tags are deleted.                  |
| `num_delete_tags_errors`       | The number of errors when deleting tags.                  |
| `num_delete_edges`             | The number of edge deletions.                |
| `num_delete_edges_errors`      | The number of errors when deleting edges                 |
| `num_send_snapshot`            | The number of times that snapshots are sent.                 |
| `update_vertex_latency_us`     | The latency of executions for the UpdateVertexProcessor.                 |
| `append_wal_latency_us`        | The Raft write latency for a single WAL.              |
| `num_update_edge`              | The number of executions for the UpdateEdgeProcessor.                  |
| `delete_tags_latency_us`       | The average latency of deleting tags.                 |
| `num_update_edge_errors`       | The number of execution errors for the UpdateEdgeProcessor.                   |
| `num_get_neighbors`            | The number of executions for the GetNeighborsProcessor.                  |
| `num_get_prop_errors`          | The number of execution errors for the GetPropProcessor.                  |
| `num_delete_vertices`          | The number of times that vertices are deleted.                  |
| `num_lookup`                   | The number of executions for the LookupProcessor.                  |
| `num_sync_data`                | The number of times the Storage service synchronizes data from the Drainer.            |
| `num_sync_data_errors`         | The number of errors that occur when the Storage service synchronizes data from the Drainer.              |


### Graph space

| Parameter                                           | Description                                      |
| ---------------------------------------------- | ----------------------------------------- |
| `num_active_queries`                             | The number of queries currently being executed.                    |
| `num_queries`                                    | The number of queries.                                |
| `num_sentences`                                  | The number of statements received by the Graphd service.                        |
| `optimizer_latency_us`                           | The latency of executing optimizer statements.                          |
| `query_latency_us`                               | The average latency of queries.                             |
| `num_slow_queries`                               | The number of slow queries.                              |
| `num_query_errors`                               | The number of query errors.                            |
| `num_query_errors_leader_changes`                | The number of raft leader changes due to query errors.      |
| `num_killed_queries`                             | The number of killed queries.                        |
| `num_aggregate_executors`                        | The number of executions for the Aggregation operator.               |
| `num_sort_executors`                             | The number of executions for the Sort operator.                     |
| `num_indexscan_executors`                        | The number of executions for index scan operators.           |
| `num_oom_queries`                                | The number of queries that caused memory to run out.         |
| `num_auth_failed_sessions_bad_username_password` | The number of sessions where authentication failed due to incorrect username and password.  |
| `num_auth_failed_sessions`     | The number of sessions in which login authentication failed.                            |
| `num_opened_sessions`          | The number of sessions connected to the server.                          |
| `num_queries_hit_memory_watermark`  |  The number of queries reached the memory watermark.                           |
| `num_reclaimed_expired_sessions` |  The number of expired sessions actively reclaimed by the server.                           |
| `num_rpc_sent_to_metad_failed` |  The number of failed RPC requests that the Graphd service sent to the Metad service.  |
| `num_rpc_sent_to_metad`        |  The number of RPC requests that the Graphd service sent to the Metad service.                            |
| `num_rpc_sent_to_storaged_failed` |  The number of failed RPC requests that the Graphd service sent to the Storaged service.                           |
| `num_rpc_sent_to_storaged`     |  The number of RPC requests that the Graphd service sent to the Storaged service.                           |
| `slow_query_latency_us`        |  The average latency of slow queries.                           |
