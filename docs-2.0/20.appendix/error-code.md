# Error code

NebulaGraph returns an error code when an error occurs. This topic describes the details of the error code returned.  


!!! note

    - If an error occurs but no error code is returned, or if the error code description is unclear, we welcome your feedback or suggestions on the [forum](https://discuss.nebula-graph.com.cn/) or [GitHub](https://github.com/vesoft-inc/nebula/issues). 

    - When the code returned is `0`, it means that the operation is successful.


|Error name|Error Code|Description|
|:---|:---|:---|
|`E_DISCONNECTED`|`-1`| Lost connection |
|`E_FAIL_TO_CONNECT`|`-2`| Unable to establish connection  |
|`E_RPC_FAILURE`|`-3`| RPC failure |
|`E_LEADER_CHANGED`|`-4`| Raft leader has been changed|
|`E_SPACE_NOT_FOUND`|`-5`| Graph space does not exist |
|`E_TAG_NOT_FOUND`|`-6`| Tag does not exist |
|`E_EDGE_NOT_FOUND`|`-7`| Edge type does not exist |
|`E_INDEX_NOT_FOUND`|`-8`| Index does not exist|
|`E_EDGE_PROP_NOT_FOUND`|`-9`| Edge type property does not exist|
|`E_TAG_PROP_NOT_FOUND`|`-10`| Tag property does not exist|
|`E_ROLE_NOT_FOUND`|`-11`| The current role does not exist|
|`E_CONFIG_NOT_FOUND`|`-12`| The current configuration does not exist|
|`E_MACHINE_NOT_FOUND`|`-13`| The current host does not exist|
|`E_LISTENER_NOT_FOUND`|`-15`| Listener does not exist|
|`E_PART_NOT_FOUND`|`-16`| The current partition does not exist|
|`E_KEY_NOT_FOUND`|`-17`| Key does not exist|
|`E_USER_NOT_FOUND`|`-18`| User does not exist|
|`E_STATS_NOT_FOUND`|`-19`| Statistics do not exist|
|`E_SERVICE_NOT_FOUND`|`-20`| No current service found|
|`E_DRAINER_NOT_FOUND`|`-21`| Drainer does not exist|
 |`E_DRAINER_CLIENT_NOT_FOUND`|`-22`| Drainer client does not exist|
 |`E_PART_STOPPED`|`-23`| The current partition has already been stopped|
|`E_BACKUP_FAILED`|`-24`| Backup failed|
|`E_BACKUP_EMPTY_TABLE`|`-25`| The backed-up table is empty|
|`E_BACKUP_TABLE_FAILED`|`-26`| Table backup failure|
|`E_PARTIAL_RESULT`|`-27`| MultiGet could not get all data|
|`E_REBUILD_INDEX_FAILED`|`-28`| Index rebuild failed|
|`E_INVALID_PASSWORD`|`-29`| Password is invalid|
|`E_FAILED_GET_ABS_PATH`|`-30`| Unable to get absolute path|
|`E_BAD_USERNAME_PASSWORD`|`-1001`| Authentication failed|
|`E_SESSION_INVALID`|`-1002`| Invalid session|
|`E_SESSION_TIMEOUT`|`-1003`| Session timeout|
|`E_SYNTAX_ERROR`|`-1004`| Syntax error|
|`E_EXECUTION_ERROR`|`-1005`| Execution error|
|`E_STATEMENT_EMPTY`|`-1006`| Statement is empty|
|`E_BAD_PERMISSION`|`-1008`| Permission denied|
|`E_SEMANTIC_ERROR`|`-1009`| Semantic error|
|`E_TOO_MANY_CONNECTIONS`|`-1010`| Maximum number of connections exceeded|
|`E_PARTIAL_SUCCEEDED`|`-1011`| Access to storage failed (only some requests succeeded)|
|`E_NO_HOSTS`|`-2001`| Host does not exist|
|`E_EXISTED`|`-2002`| Host already exists|
|`E_INVALID_HOST`|`-2003`| Invalid host|
|`E_UNSUPPORTED`|`-2004`| The current command, statement, or function is not supported|
|`E_NOT_DROP`|`-2005`|Not allowed to drop|
|`E_CONFIG_IMMUTABLE`|`-2007`| Configuration items cannot be changed|
|`E_CONFLICT`|`-2008`| Parameters conflict with meta data|
|`E_INVALID_PARM`|`-2009`| Invalid parameter|
|`E_WRONGCLUSTER`|`-2010`| Wrong cluster|
|`E_ZONE_NOT_ENOUGH`|`-2011`| Listener conflicts|
|`E_ZONE_IS_EMPTY`|`-2012`| Host not exist|
|`E_SCHEMA_NAME_EXISTS`|`-2013`| Schema name already exists|
|`E_RELATED_INDEX_EXISTS`|`-2014`| There are still indexes related to tag or edge, cannot drop it|
|`E_RELATED_SPACE_EXISTS`|`-2015`| There are still some space on the host, cannot drop it|
|`E_STORE_FAILURE`|`-2021`| Failed to store data|
|`E_STORE_SEGMENT_ILLEGAL`|`-2022`| Illegal storage segment|
|`E_BAD_BALANCE_PLAN`|`-2023`| Invalid data balancing plan|
|`E_BALANCED`|`-2024`| The cluster is already in the data balancing status|
|`E_NO_RUNNING_BALANCE_PLAN`|`-2025`| There is no running data balancing plan|
|`E_NO_VALID_HOST`|`-2026`| Lack of valid hosts|
|`E_CORRUPTED_BALANCE_PLAN`|`-2027`| A data balancing plan that has been corrupted|
|`E_IMPROPER_ROLE`|`-2030`| Failed to recover user role|
|`E_INVALID_PARTITION_NUM`|`-2031`| Number of invalid partitions|
|`E_INVALID_REPLICA_FACTOR`|`-2032`| Invalid replica factor|
|`E_INVALID_CHARSET`|`-2033`| Invalid character set|
|`E_INVALID_COLLATE`|`-2034`| Invalid character sorting rules|
|`E_CHARSET_COLLATE_NOT_MATCH`|`-2035`| Character set and character sorting rule mismatch|
|`E_SNAPSHOT_FAILURE`|`-2040`| Failed to generate a snapshot|
|`E_BLOCK_WRITE_FAILURE`|`-2041`| Failed to write block data|
|`E_ADD_JOB_FAILURE`|`-2044`| Failed to add new task|
|`E_STOP_JOB_FAILURE`|`-2045`| Failed to stop task|
|`E_SAVE_JOB_FAILURE`|`-2046`| Failed to save task information|
|`E_BALANCER_FAILURE`|`-2047`| Data balancing failed|
|`E_JOB_NOT_FINISHED`|`-2048`| The current task has not been completed|
|`E_TASK_REPORT_OUT_DATE`|`-2049`| Task report failed|
|`E_JOB_NOT_IN_SPACE`|`-2050`| The current task is not in the graph space|
|`E_JOB_NEED_RECOVER`|`-2051`| The current task needs to be resumed|
|`E_JOB_ALREADY_FINISH`|`-2052`| The job status has already been failed or finished |
|`E_JOB_SUBMITTED`|`-2053`| Job default status|
|`E_JOB_NOT_STOPPABLE`|`-2054`| The given job do not support stop|
|`E_JOB_HAS_NO_TARGET_STORAGE`|`-2055`| The leader distribution has not been reported, so can't send task to storage|
|`E_INVALID_JOB`|`-2065`| Invalid task|
|`E_BACKUP_BUILDING_INDEX`|`-2066`| Backup terminated (index being created)|
|`E_BACKUP_SPACE_NOT_FOUND`|`-2067`| Graph space does not exist at the time of backup|
|`E_RESTORE_FAILURE`|`-2068`| Backup recovery failed|
|`E_SESSION_NOT_FOUND`|`-2069`| Session does not exist|
|`E_LIST_CLUSTER_FAILURE`|`-2070`| Failed to get cluster information|
|`E_LIST_CLUSTER_GET_ABS_PATH_FAILURE`|`-2071`| Failed to get absolute path when getting cluster information|
|`E_LIST_CLUSTER_NO_AGENT_FAILURE`|`-2072`| Unable to get an agent when getting cluster information|
|`E_QUERY_NOT_FOUND`|`-2073`| Query not found|
|`E_AGENT_HB_FAILUE`|`-2074`| Failed to receive heartbeat from agent|
|`E_HOST_CAN_NOT_BE_ADDED`|`-2082`|The host can not be added for it's not a storage host|
|`E_ACCESS_ES_FAILURE`|`-2090`|Failed to access elasticsearch|
|`E_GRAPH_MEMORY_EXCEEDED`|`-2600`| Graph memory exceeded|
|`E_CONSENSUS_ERROR`|`-3001`| Consensus cannot be reached during an election|
|`E_KEY_HAS_EXISTS`|`-3002`| Key already exists|
|`E_DATA_TYPE_MISMATCH`|`-3003`| Data type mismatch|
|`E_INVALID_FIELD_VALUE`|`-3004`| Invalid field value|
|`E_INVALID_OPERATION`|`-3005`| Invalid operation|
|`E_NOT_NULLABLE`|`-3006`| Current value is not allowed to be empty|
|`E_FIELD_UNSET`|`-3007`| Field value must be set if the field value is `NOT NULL` or has no default value|
|`E_OUT_OF_RANGE`|`-3008`| The value is out of the range of the current type|
|`E_DATA_CONFLICT_ERROR`|`-3010`| Data conflict|
|`E_WRITE_STALLED`|`-3011`| Writes are delayed|
|`E_IMPROPER_DATA_TYPE`|`-3021`| Incorrect data type|
|`E_INVALID_SPACEVIDLEN`|`-3022`| Invalid VID length|
|`E_INVALID_FILTER`|`-3031`| Invalid filter|
|`E_INVALID_UPDATER`|`-3032`| Invalid field update|
|`E_INVALID_STORE`|`-3033`| Invalid KV storage|
|`E_INVALID_PEER`|`-3034`| Peer invalid|
|`E_RETRY_EXHAUSTED`|`-3035`| Out of retries|
|`E_TRANSFER_LEADER_FAILED`|`-3036`| Leader change failed|
|`E_INVALID_STAT_TYPE`|`-3037`| Invalid stat type|
|`E_INVALID_VID`|`-3038`| VID is invalid|
|`E_LOAD_META_FAILED`|`-3040`| Failed to load meta information|
|`E_FAILED_TO_CHECKPOINT`|`-3041`| Failed to generate checkpoint|
|`E_CHECKPOINT_BLOCKED`|`-3042`| Generating checkpoint is blocked|
|`E_FILTER_OUT`|`-3043`| Data is filtered|
|`E_INVALID_DATA`|`-3044`| Invalid data|
|`E_MUTATE_EDGE_CONFLICT`|`-3045`| Concurrent write conflicts on the same edge|
|`E_MUTATE_TAG_CONFLICT`|`-3046`| Concurrent write conflict on the same vertex |
|`E_OUTDATED_LOCK`|`-3047`| Lock is invalid|
|`E_INVALID_TASK_PARA`|`-3051`| Invalid task parameter|
|`E_USER_CANCEL`|`-3052`| The user canceled the task|
|`E_TASK_EXECUTION_FAILED`|`-3053`| Task execution failed|
|`E_PLAN_IS_KILLED`|`-3060`| Execution plan was cleared|
|`E_NO_TERM`|`-3070`| The heartbeat process was not completed when the request was received|
|`E_OUTDATED_TERM`|`-3071`| Out-of-date heartbeat received from the old leader (the new leader has been elected)|
|`E_WRITE_WRITE_CONFLICT`|`-3073`| Concurrent write conflicts with later requests|
|`E_RAFT_UNKNOWN_PART`|`-3500`| Unknown partition|
|`E_RAFT_LOG_GAP`|`-3501`| Raft logs lag behind|
|`E_RAFT_LOG_STALE`|`-3502`| Raft logs are out of date|
|`E_RAFT_TERM_OUT_OF_DATE`|`-3503`| Heartbeat messages are out of date|
|`E_RAFT_UNKNOWN_APPEND_LOG`|`-3504`| Unknown additional logs|
|`E_RAFT_WAITING_SNAPSHOT`|`-3511`| Waiting for the snapshot to complete|
|`E_RAFT_SENDING_SNAPSHOT`|`-3512`| There was an error sending the snapshot|
|`E_RAFT_INVALID_PEER`|`-3513`| Invalid receiver|
|`E_RAFT_NOT_READY`|`-3514`| Raft did not start|
|`E_RAFT_STOPPED`|`-3515`| Raft has stopped|
|`E_RAFT_BAD_ROLE`|`-3516`| Wrong role|
|`E_RAFT_WAL_FAIL`|`-3521`| Write to a WAL failed|
|`E_RAFT_HOST_STOPPED`|`-3522`| The host has stopped|
|`E_RAFT_TOO_MANY_REQUESTS`|`-3523`| Too many requests|
|`E_RAFT_PERSIST_SNAPSHOT_FAILED`|`-3524`| Persistent snapshot failed|
|`E_RAFT_RPC_EXCEPTION`|`-3525`| RPC exception|
|`E_RAFT_NO_WAL_FOUND`|`-3526`| No WAL logs found|
|`E_RAFT_HOST_PAUSED`|`-3527`| Host suspended|
|`E_RAFT_WRITE_BLOCKED`|`-3528`| Writes are blocked|
|`E_RAFT_BUFFER_OVERFLOW`|`-3529`| Cache overflow|
|`E_RAFT_ATOMIC_OP_FAILED`|`-3530`| Atomic operation failed|
|`E_LEADER_LEASE_FAILED`|`-3531`| Leader lease expired|
|`E_RAFT_CAUGHT_UP`|`-3532`| Data has been synchronized on Raft|
|`E_STORAGE_MEMORY_EXCEEDED`|`-3600`|Storage memory exceeded|
|`E_LOG_GAP`|`-4001`| Drainer logs lag behind|
|`E_LOG_STALE`|`-4002`| Drainer logs are out of date|
|`E_INVALID_DRAINER_STORE`|`-4003`| The drainer data storage is invalid|
|`E_SPACE_MISMATCH`|`-4004`| Graph space mismatch|
|`E_PART_MISMATCH`|`-4005`| Partition mismatch|
|`E_DATA_CONFLICT`|`-4006`| Data conflict|
|`E_REQ_CONFLICT`|`-4007`| Request conflict|
|`E_DATA_ILLEGAL`|`-4008`| Illegal data|
|`E_CACHE_CONFIG_ERROR`|`-5001`| Cache configuration error|
|`E_NOT_ENOUGH_SPACE`|`-5002`| Insufficient space|
|`E_CACHE_MISS`|`-5003`| No cache hit|
|`E_CACHE_WRITE_FAILURE`|`-5005`| Write cache failed|
|`E_NODE_NUMBER_EXCEED_LIMIT`|`-7001`| Number of machines exceeded the limit|
|`E_PARSING_LICENSE_FAILURE`|`-7002`| Failed to resolve certificate|
|`E_UNKNOWN`|`-8000`| Unknown error|

<!--
|``|`-14`| Zone does not exist |
|``|`-2012`| The number of zones is sufficient|
|``|`-2013`| Zone is empty|
|``|`-5004`| |
|``|`-2043`| |
|``|`-2006`| |
|``|`-2029`| Lack of valid drainers|
|``|`-2080`| Invalid variable|
|``|`-2081`| Variable value and type do not match|
|``|`-3061`| Client and server versions are not compatible|
|``|`-3062`| Failed to get ID serial number|

-->
