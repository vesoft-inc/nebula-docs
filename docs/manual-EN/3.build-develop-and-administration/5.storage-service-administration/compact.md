# Compact

This document will walk you through the concept of Compact.

- The default RocksDB compact style. You can use the `UPDATE CONFIG` statement as follows to start or stop it.  It merges sst files in small scale during data writing to speed up the data reading in a short time. When enabled, this compaction is automatically performed during the daytime.

```ngql
nebula> UPDATE CONFIGS storage:rocksdb_column_family_options = {disable_auto_compactions = true};
```

By default, the `disable_auto_compactions` parameter is set to `false`. Before data import, we recommend that you set the parameter to `true`. When the data is imported, you must set the parameter to its default value, and then run the `SUBMIT JOB COMPACT` command to perform the customized compaction.

- The customized compact style for **Nebula Graph**. You can run the `SUBMIT JOB COMPACT` command to start it. You can use it to perform large scale background operations such as sst files merging in large scale or TTL. This kind of compact is usually performed after midnight.

In addition, you can modify the number of threads in both methods by the following command.

```ngql
nebula> UPDATE CONFIGS storage:rocksdb_db_options  = \
        { max_subcompactions = 4, max_background_jobs = 4};
```

## Compact rate limiter

RocksDB runs the compact operation in the background in real time. The compact operation produces a lot of write operations on the disk. To avoid read latency caused by these write operations, use the rate limiter to limit the maximum write speed.

Modify the following rate limiter parameters in the RocksEngineConfig file:

- num_compaction_threads: Total number of compact threads. When set to 0, there is no threshold.
- rate_limit: Write limit. The unit is MB per second. When set to 0, there is no threshold.
