# NebulaGraph release notes

## v3.6.0

- Features
  - Supported to manage [zone](../../4.deployment-and-installation/5.zone.md). Zone is a logical rack of storage nodes in NebulaGraph that separates multiple Storage nodes into manageable logical zones for resource isolation.
  - Supported [HTTP2](../../5.configurations-and-logs/1.configurations/3.graph-config.md) protocol.
  - Supported SSL two-way authentication ([mTLS](../../7.data-security/4.ssl.md)).
  - Supported [automatic monitoring](../../7.data-security/4.ssl.md) of SSL certificate updates.
  - Supported join queries using [INNER JOIN](../../3.ngql-guide/8.clauses-and-options/joins.md).
  - Supported single shortest path using [FIND SINGLE SHORTEST PATH](../../3.ngql-guide/16.subgraph-and-path/2.find-path.md).
  - Supported for logging slow queries (excluding DML) using the [enable_record_slow_query](../../5.configurations-and-logs/1.configurations/3.graph-config.md) parameter.

- Enhancements
  - Performance
    - Optimized performance for deep queries.
    - Optimized performance of the Aggregate operator.
  - High availability
    - Added statistics in partial success.
    - Supported to record the duration of the last successful access to LM, so that you can easily check the time when LM is down.
    - When the hard disk of a node fails to write, it triggers a re-election to ensure that the cluster can provide services normally.
  - Usability
    - When modifying users, you can change the password or whitelist list individually.

- Bug fixes
  - Fixed the bug of Meta data consistency.
  - Fixed the bug where some expired data would not be recycled at the bottom level.
  - Fixed the bug with incorrect results when querying all paths from a self-loop vertex.
  - Fixed the bug with incorrect logging of requests sent to the follower of a meta service.
