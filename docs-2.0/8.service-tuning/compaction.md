# Compaction

This document gives some information to compaction.

## Introduction to compaction

In Nebula Graph, compaction is the most important background process. Compaction has an important effect on performance.

Compaction re-reads the data that is written on the hard disk, then re-organizes the data structure and the indexes to make the data more easier to read. The read performance can increase by times after compaction. Thus, to get high read performance, trigger compaction manually when writing a large amount of data into Nebula Graph. Note that compaction leads to long time hard disk IO, we suggest that you do compaction during business troughs (for example, early morning).

Nebula Graph has these two type of compaction:

- Automatic compaction
    Automatic compaction is done when the system reads, writes data, or the system restarts. The automatic compaction is enabled by default. But it can be enabled during business peaks, causing unexpected IO occupancy that has an unwanted effect on the performance. To get full manual control of compaction, use this statement:

    ```ngql
    nebula> UPDATE CONFIGS storage:rocksdb_column_family_options = {disable_auto_compactions = true};
    ```

- Full compaction
    The main function of full compaction is to merge files, enable TTL and other large scale background operations for a graph space. Use these statements to enable full compaction:

    ```ngql
    nebula> USE <your_graph_space>;
    nebula> SUBMIT JOB COMPACT;
    ```

    The preceding statement returns a job_id. To show the compaction progress, use this statement:

    ```ngql
    nebula> SHOW JOB <job_id>;
    ```

    > **NOTE:** Do the full compaction during business troughs because full compaction has a lot of IO operations.

## Operation suggestions

These are some operation suggestions to keep Nebula Graph performing well.

1. To avoid unwanted IO waste during data writing, set `disable_auto_compactions` to `true` before large amounts of data writing.
2. After data import is done, run `SUBMIT JOB COMPACT`.
3. Run `SUBMIT JOB COMPACT` periodically during business troughs, for example, early morning.
4. Set `disable_auto_compactions` to `false` during day time.
5. To control the read and write traffic limitation for compactions, set these two parameters in the `nebula-storaged.conf` configuration file.

    ```bash
    --local-config=true (read from the local configuration file and     start)
    --rate_limit=20 (in MB/s)
    ```

## FAQ

Q: Can I do full compactions for multiple graph spaces at the same time?
A: Yes, you can. But the IO is much larger at this time.

Q: How much time does it take for full compactions?
A: When `rate_limit` is set to `20`, you can estimate the full compaction time by dividing the hard disk usage by the `rate_limit`. If you do not set the `rate_limit` value, the empirical value is around 50 MB/s.

Q: Can I modify `--`rate_limit` dynamically?
A: No, you cannot.

Q: Can I stop full compaction after it starts?
A: No you cannot. When you start full compaction, you have to wait till it is done. This is the limitation of the RocksDB.
