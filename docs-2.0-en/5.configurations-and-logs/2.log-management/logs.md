# Runtime logs

Runtime logs are provided for DBAs and developers to locate faults when the system fails.

**NebulaGraph** uses [glog](https://github.com/google/glog) to print runtime logs, uses [gflags](https://gflags.github.io/gflags/) to control the severity level of the log, and provides an HTTP interface to dynamically change the log level at runtime to facilitate tracking.

## Log directory

The default runtime log directory is `/usr/local/nebula/logs/`.

If the log directory is deleted while NebulaGraph is running, the log would not continue to be printed. However, this operation will not affect the services. To recover the logs, restart the services.

## Parameter descriptions

- `minloglevel`: Specifies the minimum level of the log. That is, no logs below this level will be printed. Optional values are `0` (INFO), `1` (WARNING), `2` (ERROR), `3` (FATAL). It is recommended to set it to `0` during debugging and `1` in a production environment. If it is set to `4`, NebulaGraph will not print any logs.

- `v`: Specifies the detailed level of the log. The larger the value, the more detailed the log is. Optional values are `0`, `1`, `2`, `3`.

The default severity level for the metad, graphd, and storaged logs can be found in their respective configuration files. The default path is `/usr/local/nebula/etc/`.

## Check the severity level

Check all the flag values (log values included) of the current gflags with the following command.

```bash
$ curl <ws_ip>:<ws_port>/flags
```

|Parameter|Description|
|:---|:---|
|`ws_ip`|The IP address for the HTTP service, which can be found in the configuration files above. The default value is `127.0.0.1`.|
|`ws_port`|The port for the HTTP service, which can be found in the configuration files above. The default values are `19559`(Meta), `19669`(Graph), and `19779`(Storage) respectively.|

Examples are as follows:

- Check the current `minloglevel` in the Meta service:

    ```bash
    $ curl 127.0.0.1:19559/flags | grep 'minloglevel'
    ```

- Check the current `v` in the Storage service:
  
    ```bash
    $ curl 127.0.0.1:19779/flags | grep -w 'v'
    ```

## Change the severity level

Change the severity level of the log with the following command.

```bash
$ curl -X PUT -H "Content-Type: application/json" -d '{"<key>":<value>[,"<key>":<value>]}' "<ws_ip>:<ws_port>/flags"
```

|Parameter|Description|
|:---|:---|
|`key`|The type of the log to be changed. For optional values, see [Parameter descriptions](#parameter_descriptions).|
|`value`|The level of the log. For optional values, see [Parameter descriptions](#parameter_descriptions).|
|`ws_ip`|The IP address for the HTTP service, which can be found in the configuration files above. The default value is `127.0.0.1`.|
|`ws_port`|The port for the HTTP service, which can be found in the configuration files above. The default values are `19559`(Meta), `19669`(Graph), and `19779`(Storage) respectively.|

Examples are as follows:

```bash
$ curl -X PUT -H "Content-Type: application/json" -d '{"minloglevel":0,"v":3}' "127.0.0.1:19779/flags" # storaged
$ curl -X PUT -H "Content-Type: application/json" -d '{"minloglevel":0,"v":3}' "127.0.0.1:19669/flags" # graphd
$ curl -X PUT -H "Content-Type: application/json" -d '{"minloglevel":0,"v":3}' "127.0.0.1:19559/flags" # metad

```

If the log level is changed while NebulaGraph is running, it will be restored to the level set in the configuration file after restarting the service. To permanently modify it, see [Configuration files](../1.configurations/1.configurations.md).

## RocksDB runtime logs

RocksDB runtime logs are usually used to debug RocksDB parameters and stored in `/usr/local/nebula/data/storage/nebula/$id/data/LOG`. `$id` is the ID of the example.

## Log recycling

Glog does not inherently support log recycling. To implement this feature, you can either use [cron jobs](https://man7.org/linux/man-pages/man1/crontab.1.html) in Linux to regularly remove old log files or use the log management tool, [logrotate](https://github.com/logrotate/logrotate), to rotate logs for regular archiving and deletion.

### Log recycling using cron jobs

This section provides an example of how to use cron jobs to regularly delete old log files from the Graph service's runtime logs.

1. In the Graph service configuration file, apply the following settings and restart the service:

  ```bash
  timestamp_in_logfile_name = true
  max_log_size = 500
  ```

  - By setting `timestamp_in_logfile_name` to `true`, the log file name includes a timestamp, allowing regular deletion of old log files.
  - The `max_log_size` parameter sets the maximum size of a single log file in MB, such as `500`. Once this size is exceeded, a new log file is automatically created. The default value is `1800`.

2. Use the following command to open the cron job editor.

  ```bash
  crontab -e
  ```

3. Add a cron job command to the editor to regularly delete old log files.

  ```bash
  * * * * * find <log_path> -name "<YourProjectName>" -mtime +7 -delete
  ```

  !!! caution

        The `find` command in the above command should be executed by the root user or a user with sudo privileges.

  - `* * * * *`: This cron job time field signifies that the task is executed every minute. For other settings, see [Cron Expression](https://crontab.cronhub.io/).
  - `<log_path>`: The path of the service runtime log file, such as `/usr/local/nebula/logs`.
  - `<YourProjectName>`: The log file name, such as `nebula-graphd.*`.
  - `-mtime +7`: This deletes log files that are older than 7 days. Alternatively, use `-mmin +n` to delete log files older than `n` minutes. For details, see the find command.
  - `-delete`: This deletes log files that meet the conditions.

  For example, to automatically delete the Graph service runtime log files older than 7 days at 3 o'clock every morning, use:

  ```bash
  0 3 * * * find /usr/local/nebula/logs -name nebula-graphd.* -mtime +7 -delete
  ```

4. Save the cron job and exit the editor.


### Log recycling using logrotate

Logrotate is a tool that can rotate specified log files for archiving and recycling.

!!! note

    You must be the root user or a user with sudo privileges to install or run logrotate.

This section provides an example of how to use logrotate to manage the Graph service's `INFO` level log file (`/usr/local/nebula/logs/nebula-graphd.INFO.impl`). 

1. In the Graph service configuration file, set `timestamp_in_logfile_name` to `false` so that the logrotate tool can recognize the log file name. Then, restart the service.

  ```bash
  timestamp_in_logfile_name = false
  ```

2. Install logrotate.
   
  - For Debian/Ubuntu:

    ```bash
    sudo apt-get install logrotate
    ```

  - For CentOS/RHEL:

    ```bash
    sudo yum install logrotate
    ```

3. Create a logrotate configuration file, add log rotation rules, and save the configuration file.

  In the `/etc/logrotate.d` directory, create a new logrotate configuration file `nebula-graphd.INFO`.

    ```bash
    sudo vim /etc/logrotate.d/nebula-graphd.INFO
    ```

  Then, add the following content:
  
    ```bash
    # The absolute path of the log file needs to be configured
    # And the file name cannot be a symbolic link file, such as `nebula-graph.INFO`
    /usr/local/nebula/logs/nebula-graphd.INFO.impl {
        daily
        rotate 2
        copytruncate
        nocompress
        missingok
        notifempty
        create 644 root root
        dateext
        dateformat .%Y-%m-%d-%s
        maxsize 1k
    }
    ``` 

  | Parameter       | Description                                                  |
  | --------------- | ------------------------------------------------------------ |
  | `daily`         | Rotate the log daily. Other available time units include `hourly`, `daily`, `weekly`, `monthly`, and `yearly`. |
  | `rotate 2`      | Keep the most recent 2 log files before deleting the older one. |
  | `copytruncate`  | Copy the current log file and then truncate it, ensuring no disruption to the logging process. |
  | `nocompress`    | Do not compress the old log files.                           |
  | `missingok`     | Do not report errors if the log file is missing.             |
  | `notifempty`    | Do not rotate the log file if it's empty.                    |
  | `create 644 root root` | Create a new log file with the specified permissions and ownership. |
  | `dateext`       | Add a date extension to the log file name. <br/>The default is the current date in the format `-%Y%m%d`. <br/>You can extend this using the `dateformat` option. |
  | `dateformat .%Y-%m-%d-%s` | This must follow immediately after `dateext` and defines the file name after log rotation. <br/>Before V3.9.0, only `%Y`, `%m`, `%d`, and `%s` parameters were supported. <br/>Starting from V3.9.0, the `%H` parameter is also supported.|
  | `maxsize 1k`   | Rotate the log when it exceeds 1 kilobyte (`1024` bytes) in size or when the specified time unit (e.g., `daily`) passes. <br/>You can use size units like `k` and `M`, with the default unit being bytes. |

  Modify the parameters in the configuration file according to actual needs. For more information about parameter configuration, see [logrotate](https://github.com/logrotate/logrotate).

4. Test the logrotate configuration.

  To verify whether the logrotate configuration is correct, use the following command for testing.

  ```bash
  sudo logrotate --debug /etc/logrotate.d/nebula-graphd.INFO
  ```

5. Execute logrotate.

  Although `logrotate` is typically executed automatically by cron jobs, you can manually execute the following command to perform log rotation immediately.

  ```bash
  sudo logrotate -fv /etc/logrotate.d/nebula-graphd.INFO
  ```

  `-fv`: `f` stands for forced execution, `v` stands for verbose output.

6. Verify the log rotation results.

  After log rotation, new log files are found in the `/usr/local/nebula/logs` directory, such as `nebula-graphd.INFO.impl.2024-01-04-1704338204`. The original log content is cleared, but the file is retained for new log entries. When the number of log files exceeds the value set by `rotate`, the oldest log file is deleted. 
  
  For example, `rotate `2` means keeping the 2 most recently generated log files. When the number of log files exceeds 2, the oldest log file is deleted.

  ```bash
  [test@test logs]$ ll
  -rw-r--r-- 1 root root        0 Jan  4 11:18 nebula-graphd.INFO.impl 
  -rw-r--r-- 1 root root     6894 Jan  4 11:16 nebula-graphd.INFO.impl.2024-01-04-1704338204 # This file is deleted when a new log file is generated
  -rw-r--r-- 1 root root      222 Jan  4 11:18 nebula-graphd.INFO.impl.2024-01-04-1704338287
  [test@test logs]$ ll
  -rw-r--r-- 1 root root        0 Jan  4 11:18 nebula-graphd.INFO.impl
  -rw-r--r-- 1 root root      222 Jan  4 11:18 nebula-graphd.INFO.impl.2024-01-04-1704338287
  -rw-r--r-- 1 root root      222 Jan  4 11:18 nebula-graphd.INFO.impl.2024-01-04-1704338339 # The new log file is generated
  ```

If you need to rotate multiple log files, create multiple configuration files in the `/etc/logrotate.d` directory, with each configuration file corresponding to a log file. For example, to rotate the `INFO` level log file and the `WARNING` level log file of the Meta service, create two configuration files `nebula-metad.INFO` and `nebula-metad.WARNING`, and add log rotation rules in them respectively.