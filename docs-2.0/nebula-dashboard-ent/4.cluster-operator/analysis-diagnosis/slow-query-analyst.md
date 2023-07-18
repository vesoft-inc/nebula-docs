# Slow query analyst

DBAs need to analyze and manage the execution of query statements in a cluster as part of their daily work. NebulaGraph Dashboard provides a feature that allows users to view slow queries, including the statements, duration, categories, execution plans, and more.

## Features

- Display the information about current slow queries. Users can filter slow queries by keywords and graph space.
- Display the history of slow queries. Users can filter the records according to keywords, graph space, category, and time range.

## Prerequisites

`enable_record_slow_query`=`true` is set in the graph service configuration of NebulaGraph. For details, see [Graph service configuration](../../../5.configurations-and-logs/1.configurations/3.graph-config.md).

## Entry

1. In the top navigation bar of the Dashboard Enterprise Edition page, click **Cluster Management**.
2. On the right side of the target cluster, click **Detail**.
3. In the left navigation bar, click **Analysis**->**Slow Query Analyst**.

## View current slow queries

Clicking the **Running** tab will display the current slow queries. The parameters are described as follows.

|Parameter|Description|
|:--|:--|
|Query|The statement of the slow query.|
|Duration(μs)|The duration that the slow query has been executed.|
|Start Time|The time that the slow query starts executing.|
|Status|The status of the slow query, including `running` and `killing`.|
|User|The user name to execute the query. |
|Host|The address and port of the server that the user connected to.|
|Action| Supports killing the slow query.|

## View slow query history

Clicking the **History** tab will display the slow query history. The parameters are described as follows.

|Parameter|Description|
|:--|:--|
|nGQL|The statement of the slow query.|
|Duration(μs)|The duration of the slow query.|
|Category|The type of the slow query statement, including `DDL`, `DQL`, `DML`, `DCL`, `UTIL` and `UNKNOWN`.|
|Space|The name of the graph space where the slow query was executed.|
|Record Time|The time to record the statement into memory as a slow query.|
|Action|Supports viewing the execution plan, making it easy for the DBA to optimize slow query statements based on the execution plan.|

!!! note

    Turning off the slow query analyst function **will not** clear the slow query history.