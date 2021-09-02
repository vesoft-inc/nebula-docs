# Logs

**Nebula Graph** uses [glog](https://github.com/google/glog) to print logs, uses [gflags](https://gflags.github.io/gflags/) to control the severity level of the log, and provides an HTTP interface to dynamically change the log level at runtime to facilitate tracking.

## Log directory

The default log directory is `/usr/local/nebula/logs/`.

If the log directory is deleted while Nebula Graph is running, the log would not continue to be printed. However, this operation will not affect the services. To recover the logs, restart the services.

## Parameter descriptions

- `minloglevel`: Specifies the minimum level of the log. That is, no logs below this level will be printed. Optional values are `0` (INFO), `1` (WARNING), `2` (ERROR), `3` (FATAL). It is recommended to set it to `0` during debugging and `1` in a production environment. If it is set to `4`, Nebula Graph will not print any logs.

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
|`key`|The type of the log to be changed. For optional values, see [Parameter descriptions](#_3).|
|`value`|The level of the log. For optional values, see [Parameter descriptions](#_3).|
|`ws_ip`|The IP address for the HTTP service, which can be found in the configuration files above. The default value is `127.0.0.1`.|
|`ws_port`|The port for the HTTP service, which can be found in the configuration files above. The default values are `19559`(Meta), `19669`(Graph), and `19779`(Storage) respectively.|

Examples are as follows:

```bash
$ curl -X PUT -H "Content-Type: application/json" -d '{"minloglevel":0,"v":3}' "127.0.0.1:19779/flags" # storaged
$ curl -X PUT -H "Content-Type: application/json" -d '{"minloglevel":0,"v":3}' "127.0.0.1:19669/flags" # graphd
$ curl -X PUT -H "Content-Type: application/json" -d '{"minloglevel":0,"v":3}' "127.0.0.1:19559/flags" # metad

```

If the log level is changed while Nebula Graph is running, it will be restored to the level set in the configuration file after restarting the service. To permanently modify it, see [Configuration files](../1.configurations/1.configurations.md).

## RocksDB logs

RocksDB logs are usually used to debug RocksDB parameters and stored in `/usr/local/nebula/data/storage/nebula/$id/data/LOG`. `$id` is the ID of the example.
