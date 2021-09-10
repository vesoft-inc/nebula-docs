# Compaction

This topic gives some information about compaction.

In Nebula Graph, `Compaction` is the most important background process and has an important effect on performance.

`Compaction` reads the data that is written on the hard disk, then re-organizes the data structure and the indexes, and then writes back to the hard disk. The read performance can increase by times after compaction. Thus, to get high read performance, trigger `compaction` (full `compaction`) manually when writing a large amount of data into Nebula Graph.

!!! Note

    Note that `compaction` leads to long-time hard disk IO. We suggest that users do compaction during off-peak hours (for example, early morning).

Nebula Graph has two types of `compaction`: automatic `compaction` and full `compaction`.

## Automatic `compaction`

Automatic `compaction` is automatically triggered when the system reads data, writes data, or the system restarts. The read performance can increase in a short time. Automatic `compaction` is enabled by default. But once triggered during peak hours, it can cause unexpected IO occupancy that has an unwanted effect on the performance.

<!--
To control `compaction` manually, users can disable automatic `compaction`.

### Disable automatic `compaction`

!!! danger

    The `UPDATE CONFIGS` command overwrites the unset parameters to the default value. Use `SHOW CONFIGS STORAGE` to check `rocksdb_column_family_options` before the updates and then overwrite the values.

```ngql
# Check the current value of rocksdb_column_family_options and copy the content of the value column.
nebula> SHOW CONFIGS STORAGE;
+-----------+-------------------------------------+-------+-----------+------------------------------------------------------------------------------------------------------+
| module    | name                                | type  | mode      | value                                                                                                |
+-----------+-------------------------------------+-------+-----------+------------------------------------------------------------------------------------------------------+
| "STORAGE" | "v"                                 | "int" | "MUTABLE" | 0                                                                                                    |
+-----------+-------------------------------------+-------+-----------+------------------------------------------------------------------------------------------------------+
...
+-----------+-------------------------------------+-------+-----------+------------------------------------------------------------------------------------------------------+
| "STORAGE" | "rocksdb_column_family_options"     | "map" | "MUTABLE" | {max_bytes_for_level_base: "268435456", max_write_buffer_number: "4", write_buffer_size: "67108864"} |
+-----------+-------------------------------------+-------+-----------+------------------------------------------------------------------------------------------------------+
...

# Modify the value of rocksdb_column_family_options. Add the following content in the content of value: disable_auto_compactions: true
nebula> UPDATE CONFIGS storage:rocksdb_column_family_options = {disable_auto_compactions: true, max_bytes_for_level_base: 268435456, max_write_buffer_number: 4, write_buffer_size: 67108864};

# Check whether the modification executes successfully.
nebula> SHOW CONFIGS STORAGE;
+-----------+-------------------------------------+-------+-----------+--------------------------------------------------------------------------------------------------------------------------------------+
| module    | name                                | type  | mode      | value                                                                                                                                |
+-----------+-------------------------------------+-------+-----------+--------------------------------------------------------------------------------------------------------------------------------------+
| "STORAGE" | "v"                                 | "int" | "MUTABLE" | 0                                                                                                                                    |
+-----------+-------------------------------------+-------+-----------+--------------------------------------------------------------------------------------------------------------------------------------+
...
+-----------+-------------------------------------+-------+-----------+--------------------------------------------------------------------------------------------------------------------------------------+
| "STORAGE" | "rocksdb_column_family_options"     | "map" | "MUTABLE" | {disable_auto_compactions: true, max_bytes_for_level_base: "268435456", max_write_buffer_number: "4", write_buffer_size: "67108864"} |
+-----------+-------------------------------------+-------+-----------+--------------------------------------------------------------------------------------------------------------------------------------+
...
```
-->

## Full `compaction`

Full `compaction` enables large-scale background operations for a graph space such as merging files, deleting the data expired by TTL. This operation needs to be initiated manually. Use the following statements to enable full `compaction`:

!!! note

    We recommend you to do the full compaction during off-peak hours because full compaction has a lot of IO operations.

```ngql
nebula> USE <your_graph_space>;
nebula> SUBMIT JOB COMPACT;
```

The preceding statement returns the job ID. To show the `compaction` progress, use the following statement:

```ngql
nebula> SHOW JOB <job_id>;
```

## Operation suggestions

These are some operation suggestions to keep Nebula Graph performing well.

<!--
- To avoid unwanted IO waste during data writing, set `disable_auto_compactions` to `true` before large amounts of data writing. For more information, see [Disable automatic `Compaction`](#compaction_2).
-->

- After data import is done, run `SUBMIT JOB COMPACT`.

- Run `SUBMIT JOB COMPACT` periodically during off-peak hours (e.g. early morning).

<!--
- Set `disable_auto_compactions` to `false` during daytime to improve read performance in a short time.
-->

- To control the read and write traffic limitation for `compactions`, set the following parameter in the `nebula-storaged.conf` configuration file.

    ```bash
    # Limit the read/write rate to 20MB/s.
    --rate_limit=20 (in MB/s)
    ```

## FAQ

### "Where are the logs related to `Compaction` stored?"

By default, the logs are stored under the `LOG` file in the `/usr/local/nebula/data/storage/nebula/{1}/data/` directory, or similar to `LOG.old.1625797988509303`. You can find the following content.

```text
** Compaction Stats [default] **
Level    Files   Size     Score Read(GB)  Rn(GB) Rnp1(GB) Write(GB) Wnew(GB) Moved(GB) W-Amp Rd(MB/s) Wr(MB/s) Comp(sec) CompMergeCPU(sec) Comp(cnt) Avg(sec) KeyIn KeyDrop
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  L0      2/0    2.46 KB   0.5      0.0     0.0      0.0       0.0      0.0       0.0   1.0      0.0      0.0      0.53              0.51         2    0.264       0      0
 Sum      2/0    2.46 KB   0.0      0.0     0.0      0.0       0.0      0.0       0.0   1.0      0.0      0.0      0.53              0.51         2    0.264       0      0
 Int      0/0    0.00 KB   0.0      0.0     0.0      0.0       0.0      0.0       0.0   0.0      0.0      0.0      0.00              0.00         0    0.000       0      0
```

If the number of `L0` files is large, the read performance will be greatly affected and compaction can be triggered.

### "Can I do full `compactions` for multiple graph spaces at the same time?"

Yes, you can. But the IO is much larger at this time and the efficiency may be affected.

### "How much time does it take for full `compactions`?"

When `rate_limit` is set to `20`, you can estimate the full compaction time by dividing the hard disk usage by the `rate_limit`. If you do not set the `rate_limit` value, the empirical value is around 50 MB/s.

### "Can I modify `--rate_limit` dynamically?"

No, you cannot.

### "Can I stop a full `compaction` after it starts?"

No, you cannot. When you start a full compaction, you have to wait till it is done. This is the limitation of RocksDB.
