# Error code

Nebula Graph returns an error code when an error occurs. This topic describes the details of the error code returned.  


!!! note

    - If an error occurs but no error code is returned, or if the error code description is unclear, we welcome your feedback or suggestions on the [forum](https://discuss.nebula-graph.com.cn/) or [GitHub](https://github.com/vesoft-inc/nebula/issues). 

    - When the code returned is `0`, it means that the operation is successful.


|Error Code|Description|
|:---|:---|
|`-1`| Lost connection |
|`-2`| Unable to establish connection  |
|`-3`| RPC failure |
|`-4`| Raft leader has been changed|
|`-5`| Graph space does not exist |
|`-6`| Tag does not exist |
|`-7`| Edge type does not exist |
|`-8`| Index does not exist|
|`-9`| Edge type property does not exist|
|`-10`| Tag property does not exist|
|`-11`| The current role does not exist|
|`-12`| The current configuration does not exist|
|`-13`| The current host does not exist|
|`-15`| Listener does not exist|
|`-16`| The current partition does not exist|
|`-17`| Key does not exist|
|`-18`| User does not exist|
|`-19`| Statistics do not exist|
|`-20`| No current service found|
|`-21`| Drainer does not exist|
|`-22`| Drainer client does not exist|
|`-24`| Backup failed|
|`-25`| The backed-up table is empty|
|`-26`| Table backup failure|
|`-27`| MultiGet could not get all data|
|`-28`| Index rebuild failed|
|`-29`| Password is invalid|
|`-30`| Unable to get absolute path|
|`-1001`| Authentication failed|
|`-1002`| Invalid session|
|`-1003`| Session timeout|
|`-1004`| Syntax error|
|`-1005`| Execution error|
|`-1006`| Statement is empty|
|`-1008`| Wrong license|
|`-1009`| Semantic error|
|`-1010`| Maximum number of connections exceeded|
|`-1011`| Access to storage failed (only some requests succeeded)|
|`-2001`| Host does not exist|
|`-2002`| Host already exists|
|`-2003`| Invalid host|
|`-2004`| The current command, statement, or function is not supported|
|`-2007`| Configuration items cannot be changed|
|`-2008`| Parameters conflict with meta data|
|`-2009`| Invalid parameter|
|`-2010`| Wrong cluster|
|`-2011`| Listener conflicts|
|`-2021`| Failed to store data|
|`-2022`| Illegal storage segment|
|`-2023`| Invalid data balancing plan|
|`-2024`| The cluster is already in the data balancing status|
|`-2025`| There is no running data balancing plan|
|`-2026`| Lack of valid hosts|
|`-2027`| A data balancing plan that has been corrupted|
|`-2029`| Lack of valid drainer|
|`-2030`| Failed to recover user role|
|`-2031`| Number of invalid partitions|
|`-2032`| Invalid replica factor|
|`-2033`| Invalid character set|
|`-2034`| Invalid character sorting rules|
|`-2035`| Character set and character sorting rule mismatch|
|`-2040`| Failed to generate a snapshot|
|`-2041`| Failed to write block data|
|`-2044`| Failed to add new task|
|`-2045`| Failed to stop task|
|`-2046`| Failed to save task information|
|`-2047`| Data balancing failed|
|`-2048`| The current task has not been completed|
|`-2049`| Task report failed|
|`-2050`| The current task is not in the graph space|
|`-2051`| The current task needs to be resumed|
|`-2065`| Invalid task|
|`-2066`| Backup terminated (index being created)|
|`-2067`| Graph space does not exist at the time of backup|
|`-2068`| Backup recovery failed|
|`-2069`| Session does not exist|
|`-2070`| Failed to get cluster information|
|`-2071`| Failed to get absolute path when getting cluster information|
|`-2072`| Unable to get an agent when getting cluster information|
|`-2073`| Query not found|
|`-2074`| Agent does not report heartbeat|
|`-2080`| Invalid variable|
|`-2081`| Variable value and type do not match|
|`-3001`| Consensus cannot be reached during an election|
|`-3002`| Key already exists|
|`-3003`| Data type mismatch|
|`-3004`| Invalid field value|
|`-3005`| Invalid operation|
|`-3006`| Current value is not allowed to be empty|
|`-3007`| Field value must be set if the field value is `NOT NULL` or has no default value|
|`-3008`| The value is out of the range of the current type|
|`-3010`| Data conflict|
|`-3011`| Writes are delayed|
|`-3021`| Incorrect data type|
|`-3022`| Invalid VID length|
|`-3031`| Invalid filter|
|`-3032`| Invalid field update|
|`-3033`| Invalid KV storage|
|`-3034`| Peer invalid|
|`-3035`| Out of retries|
|`-3036`| Leader change failed|
|`-3037`| Invalid stat type|
|`-3038`| VID is invalid|
|`-3040`| Failed to load meta information|
|`-3041`| Failed to generate checkpoint|
|`-3042`| Generating checkpoint is blocked|
|`-3043`| Data is filtered|
|`-3044`| Invalid data|
|`-3045`| Concurrent write conflicts on the same edge|
|`-3046`| Concurrent write conflict on the same vertex |
|`-3047`| Lock is invalid|
|`-3051`| Invalid task parameter|
|`-3052`| The user canceled the task|
|`-3053`| Task execution failed|
|`-3060`| Execution plan was cleared|
|`-3070`| The heartbeat process was not completed when the request was received|
|`-3071`| Out-of-date heartbeat received from the old leader (the new leader has been elected)|
|`-3073`| Concurrent write conflicts with later requests|
|`-3061`| Client and server versions are not compatible|
|`-3062`| Failed to get ID serial number|
|`-3500`| Unknown partition|
|`-3501`| Raft logs lag behind|
|`-3502`| Raft logs are out of date|
|`-3503`| Heartbeat messages are out of date|
|`-3504`| Unknown additional logs|
|`-3511`| Waiting for the snapshot to complete|
|`-3512`| There was an error sending the snapshot|
|`-3513`| Invalid receiver|
|`-3514`| Raft did not start|
|`-3515`| Raft has stopped|
|`-3516`| Wrong role|
|`-3521`| Write to a WAL failed|
|`-3522`| The host has stopped|
|`-3523`| Too many requests|
|`-3524`| Persistent snapshot failed|
|`-3525`| RPC exception|
|`-3526`| No WAL logs found|
|`-3527`| Host suspended|
|`-3528`| Writes are blocked|
|`-3529`| Cache overflow|
|`-3530`| Atomic operation failed|
|`-3531`| Leader lease expired|
|`-3532`| Data has been synchronized on Raft|
|`-4001`| Drainer logs lag behind|
|`-4002`| Drainer logs are out of date|
|`-4003`| The drainer data storage is invalid|
|`-4004`| Graph space mismatch|
|`-4005`| Partition mismatch|
|`-4006`| Data conflict|
|`-4007`| Request conflict|
|`-4008`| Illegal data|
|`-5001`| Cache configuration error|
|`-5002`| Insufficient space|
|`-5003`| No cache hit|
|`-5005`| Write cache failed|
|`-7001`| Number of machines exceeded limit|
|`-7002`| Failed to resolve certificate|
|`-8000`| Unknown error|

<!--
|`-14`| Zone does not exist |
|`-2012`| The number of zones is sufficient|
|`-2013`| Zone is empty|
|`-5004`| |
|`-2043`| |
|`-2006`| |
-->
