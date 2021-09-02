# Compaction

This document gives some information about compaction.

## Introduction to compaction

In Nebula Graph, compaction is the most important background process. Compaction has an important effect on performance.

Compaction reads the data that is written on the hard disk, then re-organizes the data structure and the indexes to make the data easier to read. The read performance can increase by times after compaction. Thus, to get high read performance, trigger compaction manually when writing a large amount of data into Nebula Graph. Note that compaction leads to long time hard disk IO, we suggest that you do compaction during off-peak hours (for example, early morning).

Nebula Graph has two types of compaction: automatic compaction and full compaction.

## Automatic compaction

Automatic compaction is done when the system reads data, writes data, or the system restarts. Automatic compaction is enabled by default. 

<!--
But once triggered during peak hours, it can cause unexpected IO occupancy that has an unwanted effect on the performance. To disable automatic compaction, use this statement:

```ngql
nebula> UPDATE CONFIGS storage:rocksdb_column_family_options = {disable_auto_compactions = true};
```

!!! caution

    The command overwrites all `rocksdb_column_family_options` items. Other items besides `disable_auto_compactions` is overwritten to the default value. You may have to read all the items before the updates.

-->

## Full compaction

Full compaction enables large scale background operations for a graph space such as merging files, deleting the data expired by TTL. Use these statements to enable full compaction:

```ngql
nebula> USE <your_graph_space>;
nebula> SUBMIT JOB COMPACT;
```

The preceding statement returns a job_id. To show the compaction progress, use this statement:

```ngql
nebula> SHOW JOB <job_id>;
```

!!! note

    Do the full compaction during off-peak hours because full compaction has a lot of IO operations.

## Operation suggestions

These are some operation suggestions to keep Nebula Graph performing well.

<!--
- To avoid unwanted IO waste during data writing, set `disable_auto_compactions` to `true` before large amounts of data writing.
-->

- After data import is done, run `SUBMIT JOB COMPACT`.

- Run `SUBMIT JOB COMPACT` periodically during off-peak hours, for example, early morning.

<!--
- Set `disable_auto_compactions` to `false` during day time.
-->

- To control the read and write traffic limitation for compactions, set the following parameter in the `nebula-storaged.conf` configuration file.

    ```bash
    # Limit the read/write rate to 20MB/s.
    --rate_limit=20 (in MB/s)
    ```

## FAQ

Q: Can I do full compactions for multiple graph spaces at the same time?

A: Yes, you can. But the IO is much larger at this time.

Q: How much time does it take for full compactions?

A: When `rate_limit` is set to `20`, you can estimate the full compaction time by dividing the hard disk usage by the `rate_limit`. If you do not set the `rate_limit` value, the empirical value is around 50 MB/s.

Q: Can I modify `--rate_limit` dynamically?

A: No, you cannot.

Q: Can I stop a full compaction after it starts?

A: No you cannot. When you start a full compaction, you have to wait till it is done. This is the limitation of RocksDB.
