# Compact

This document will walk you through the concept of Compact.

1. Start or stop compact. This method calls the default RocksDB compact. You can use it to merge sst files in small scale during data writing to ensure the read speed in a short time. This kind of compact is usually performed in the day time.

```ngql
nebula> UPDATE CONFIG storage:disable_auto_compactions=false/true;
```

2. Start compact with the `SUBMIT JOB COMPACT` command. This method calls the customized compact of **Nebula Graph**. You can use it to perform large scale background operations such as sst files merging in large scale or TTL. This kind of compact is usually performed after midnight.

In addition, you can modify the number of threads in both methods by the following command. You can decrease the threads during daytime and increase it at night.

```ngql
nebula> UPDATE CONFIGS storage:rocksdb_db_options  = \
        { max_subcompactions = 4, max_background_jobs = 4};
```
