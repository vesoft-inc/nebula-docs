# Audit logs

The audit logs store all operations received by graph service in categories, then provide the logs for users to track specific types of operations as needed.

!!! enterpriseonly

    Only available for the Nebula Graph Enterprise Edition.

## Log categories

|Category|Statement|Description|
|:--|:--|:--|
|`login` |-| Logs the information when the client tries to connect to graph service. |
|`exit`  |-| Logs the information when the client disconnect from graph service. |
|`ddl` |`CREATE SPACE`、`DROP SPACE`、`CREATE TAG`、`DROP TAG`、`ALTER TAG`、`DELETE TAG`、`CREATE EDGE`、`DROP EDGE`、`ALTER EDGE`、`CREATE INDEX`、`REBUILD INDEX`、`DROP INDEX`、`CREATE FULLTEXT INDEX`、`REBUILD FULLTEXT INDEX`、`DROP FULLTEXT INDEX`|Logs the information about DDL statements. |
|`dql` |`MATCH`、`LOOKUP`、`GO`、`FETCH`、`GET SUBGRAPH`、`FIND PATH`、`UNWIND`、`GROUP BY`、`ORDER BY`、`YIELD`、`LIMIT`、`RETURN`|Logs the information about DQL statements.|
|`dml` |`INSERT VERTEX`、`DELETE VERTEX`、`UPDATE VERTEX`、`UPSERT VERTEX`、`INSERT EDGE`、`DELETE EDGE`、`UPDATE EDGE`、`UPSERT EDGE`|Logs the information about DML statements. |
|`dcl`|`CREATE USER`、`GRANT ROLE`、`REVOKE ROLE`、`CHANGE PASSWORD`、`ALTER USER`、`DROP USER`、`CREATE SNAPSHOT`、`DROP SNAPSHOT`、`ADD LISTENER`、`REMOVE LISTENER`、`BALANCE`、`SUBMIT JOB`、`STOP JOB`、`RECOVER JOB`、`ADD DRAINER`、`REMOVE DRAINER`|Logs the information about DCL statements.|
|`util`|`SHOW HOSTS`、`SHOW USERS`、`SHOW ROLES`、`SHOW SNAPSHOTS`、`SHOW SPACES`、`SHOW PARTS`、`SHOW TAGS`、`SHOW EDGES`、`SHOW INDEXES`、`SHOW CREATE SPACE`、`SHOW CREATE TAG/EDGE`、`SHOW CREATE INDEX`、`SHOW INDEX STATUS`、`SHOW LISTENER`、`SHOW TEXT SEARCH CLIENTS`、`SHOW DRAINER CLIENTS`、`SHOW FULLTEXT INDEXES`、`SHOW CONFIGS`、`SHOW CHARSET`、`SHOW COLLATION`、`SHOW STATS`、`SHOW SESSIONS`、`SHOW META LEADER`、`SHOW DRAINERS`、`SHOW QUERIES`、`SHOW JOB`、`SHOW JOBS`、`DESCRIBE INDEX`、`DESCRIBE EDGE`、`DESCRIBE TAG`、`DESCRIBE SPACE`、`DESCRIBE USER`、`USE SPACE`、`SIGN IN TEXT SERVICE`、`SIGN OUT TEXT SERVICE`、`SIGN IN DRAINER SERVICE`、`SIGN OUT DRAINER SERVICE`、`EXPLAIN`、`PROFILE`、`KILL QUERY`、`DOWNLOAD HDFS`、`INGEST`|Logs the information about util statements. |
|`unknown`|-|Logs the information about unrecognized statements.|

## Configure audit logs

You need to configure the configuration of the graph service to view audit logs. The default file path of configuration is `/usr/local/nebula/etc/nebula-graphd.conf`.

!!! note

    After modifying the configuration, you need to restart the graph service to take effect.

Parameter descriptions are as follows:

|Parameter|Predefined value|Description|
|:--|:--|:--|
| `enable_audit` | `false` | Whether or not to enable audit logs. |
| `audit_log_handler` | `file` | Where the audit logs will be written. Optional values are `file`（local file） and `es`(Elasticsearch). |
| `audit_log_file` | `./logs/audit/audit.log` | Takes effect only when `audit_log_handler=file`. The path for storing audit logs. The value can be absolute or relative. |
| `audit_log_strategy` | `synchronous` | Takes effect only when `audit_log_handler=file`. The strategy of the audit logs. Optional values are `asynchronous` and `synchronous`. When set to `asynchronous`, the log using memory buffer does not block the main thread, but the log may be missing due to insufficient cache. When set to `synchronous`, the log directly to file, flush and sync every event. |
| `audit_log_max_buffer_size` | `1048576` |Take effect only when `audit_log_handler=file` and `audit_log_strategy=asynchronous`. The size of the memory buffer used for logging. Unit: bytes.  |
| `audit_log_format` | `xml` | Takes effect only when `audit_log_handler=file`. The format of the the audit logs. Optional values are `xml`, `json` and `csv`. |
| `audit_log_es_address` | - | Takes effect only when `audit_log_handler=es`. The address of Elasticsearch server. The format is `IP1:port1, IP2:port2, ...`. |
| `audit_log_es_user` | - | Takes effect only when `audit_log_handler=es`. The user name of the Elasticsearch. |
| `audit_log_es_password`     | -  | Takes effect only when `audit_log_handler=es`. The user password of the Elasticsearch.  |
| `audit_log_es_batch_size`      | `1000`  | Takes effect only when `audit_log_handler=es`. The number of logs sent to Elasticsearch at one time.  |
| `audit_log_exclude_spaces`      | -  |  The list of spaces for not tracking. Multiple graph spaces are separated by commas.  |
| `audit_log_categories`      | `login,exit`  | The list of log categories for tracking. Multiple categories are separated by commas.   |
|       |   |   |

## Audit logs format

The fields of audit logs are the same for different handlers and formats. For example, when the audit logs are stored in the default path `logs/audit/audit.log` and in the format of XML, the fields in the audit logs are described as follows:


```bash
<AUDIT_RECORD
  CATEGORY="util"
  TIMESTAMP="2022-04-07 02:31:38"
  TERMINAL=""
  CONNECTION_ID="1649298693144580"
  CONNECTION_STATUS="0"
  CONNECTION_MESSAGE=""
  USER="root"
  CLIENT_HOST="127.0.0.1"
  HOST="192.168.8.111"
  SPACE=""
  QUERY="use basketballplayer1"
  QUERY_STATUS="-1005"
  QUERY_MESSAGE="SpaceNotFound: "
/>
<AUDIT_RECORD
  CATEGORY="util"
  TIMESTAMP="2022-04-07 02:31:39"
  TERMINAL=""
  CONNECTION_ID="1649298693144580"
  CONNECTION_STATUS="0"
  CONNECTION_MESSAGE=""
  USER="root"
  CLIENT_HOST="127.0.0.1"
  HOST="192.168.8.111"
  SPACE=""
  QUERY="use basketballplayer"
  QUERY_STATUS="0"
  QUERY_MESSAGE=""
/>
```

|Field|Description|
|:--|:--|
|`CATEGORY`| The category of the audit logs.|
|`TIMESTAMP`| The generation time of the audit logs. |
|`TERMINAL`| The reserved field.|
|`CONNECTION_ID`| The session ID of the connection. |
|`CONNECTION_STATUS`| The status of the connection. `0` indicates success, and other numbers indicate different error messages.|
|`CONNECTION_MESSAGE`| An error message is displayed when the connection fails.|
|`USER`| The user name of the connection. |
|`CLIENT_HOST`| The IP address of the client.|
|`HOST`| The IP address of the host. |
|`SPACE`| The graph space to perform the query.|
|`QUERY`| The query statement.|
|`QUERY_STATUS`| The status of the query. `0` indicates success, and other numbers indicate different error messages.|
|`QUERY_MESSAGE`| An error message is displayed when the query fails.|
