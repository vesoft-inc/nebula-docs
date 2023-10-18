# NebulaGraph release notes

## v3.6.0

- Features
  - Added support for [zone](../../4.deployment-and-installation/5.zone.md). The zone is a logical rack of storage nodes in NebulaGraph that separates multiple Storage nodes into manageable logical zones for resource isolation.
  - Supported [HTTP2](../../5.configurations-and-logs/1.configurations/3.graph-config.md) protocol.
  - Supported SSL two-way authentication ([mTLS](../../7.data-security/4.ssl.md)).
  - Supported [automatic monitoring](../../7.data-security/4.ssl.md) of SSL certificate updates.
  - Supported join queries using [INNER JOIN](../../3.ngql-guide/8.clauses-and-options/joins.md).
  - Supported single shortest path using [FIND SINGLE SHORTEST PATH](../../3.ngql-guide/16.subgraph-and-path/2.find-path.md).
  - Supported logging slow queries (excluding DML) using the [enable_record_slow_query](../../5.configurations-and-logs/1.configurations/3.graph-config.md) parameter.

- Enhancements
  - Performance
    - Optimized performance for deep queries.
    - Optimized performance of the Aggregate operator.
  - High availability
    - Added monitoring metric `resp_part_completeness` to partial success.
    - Supported recording the duration of the last successful access to LM, so that you can easily check the time when LM is down.
    - When the hard disk of a node fails to write, it triggers a re-election to ensure that the cluster can provide services normally.
  - Usability
    - When modifying users, you can change the password or whitelist individually.

- Bug fixes
  - Fixed the bug of meta data consistency.
  - Fixed the bug where some expired data would not be recycled at the bottom level.
  - Fixed the bug where incorrect results were returned when querying all paths from a self-loop vertex.
  - Fixed the logging error of requests sent to the follower of a meta service.
  - Fixed the bug of the OOM when explaining statements with multiple variables.
  - Fixed the bug that caused the graph service to crash when executing multiple MATCH statements with an empty filter.
