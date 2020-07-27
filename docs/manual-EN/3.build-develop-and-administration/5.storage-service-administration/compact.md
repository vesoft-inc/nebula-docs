# Compact

This document will walk you through the concept of Compact.

- The default RocksDB compact style. You can use the `UPDATE CONFIG` statement as follows to start or stop it.  It merges sst files in small scale during data writing to speed up the data reading in a short time. When enabled, this compaction is automatically performed during the daytime.

```ngql
nebula> UPDATE CONFIG storage:disable_auto_compactions=false/true;
```

- The customized compact style for **Nebula Graph**. You can run the `SUBMIT JOB COMPACT` command to start it. You can use it to perform large scale background operations such as sst files merging in large scale or TTL. This kind of compact is usually performed after midnight.

In addition, you can modify the number of threads in both methods by the following command. You can decrease the threads during daytime and increase it at night.

```ngql
nebula> UPDATE CONFIGS storage:rocksdb_db_options  = \
        { max_subcompactions = 4, max_background_jobs = 4};
```
