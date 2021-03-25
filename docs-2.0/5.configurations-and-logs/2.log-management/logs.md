# Logs

**Nebula Graph** uses [glog](https://github.com/google/glog) to print logs, uses [gflag](https://gflags.github.io/gflags/) to control the severity level of the log, and provides an HTTP interface to dynamically change the log level at runtime to facilitate tracking.

## Log Directory

The default log directory is `/usr/local/nebula/logs/`.

> **NOTE**: If you deleted the log directory during runtime, the runtime log would not continue to be printed. However, this operation will not affect the services. Restart the services to recover the logs.

## Parameter Description

### Two most commonly used flags in glog

- minloglevel: The scale of minloglevel is 0-4. The numbers of severity levels INFO(DEBUG), WARNING, ERROR, and FATAL are 0, 1, 2, and 3, respectively. Usually specified as 0 for debug, 1 for production. If you set the minloglevel to 4, no logs are printed.
- v: The scale of v is 0-3. When the value is set to 0,  you can further set the severity level of the debug log. The greater the value is, the more detailed the log is.

### Configuration Files

The default severity level for the metad, graphd, and storaged logs can be found in the configuration files (usually in `/usr/local/nebula/etc/`).

## Check and Change the Severity Levels Dynamically

Check all the flag values (log values included) of the current gflags with the following command. Not all flags are listed because changing some flags can be dangerous. Read the response explanation and the source code before you change these not documented parameters. To get all the available flags for a process, use this command:

```bash
> curl ${ws_ip}:${ws_port}/flags
```

In the command:

- `ws_ip` is the IP address for the HTTP service, which can be found in the configuration files above. The default value is `127.0.0.1`.
- `ws_port` is the port for the HTTP service, the default values for `metad`, `storaged`, and `graphd` are `19559`, `19779`, and `19669`, respectively.

> **NOTE:** If you changed the runtime log level, then restart the services, the log level changes to the configuration file specifications. For more information, see [Storage Service configurations](../1.configurations/4.storage-config.md).

For example, check the minloglevel for the `storaged` service:

```bash
> curl 127.0.0.1:19559/flags | grep minloglevel
```

To change the log level for a process, use these commands. For example, you can change the log severity level the **the most detailed**.

```bash
$ curl -X PUT -H "Content-Type: application/json" -d '{"minloglevel":0,"v":3}' "127.0.0.1:19779/flags" # storaged
$ curl -X PUT -H "Content-Type: application/json" -d '{"minloglevel":0,"v":3}' "127.0.0.1:19669/flags" # graphd
$ curl -X PUT -H "Content-Type: application/json" -d '{"minloglevel":0,"v":3}' "127.0.0.1:19559/flags" # metad
```

<!-- In the Nebula Console, check the severity minloglevel of `graphd` and set it to **the most detailed** with the these commands.

```ngql
nebula> GET CONFIGS graph:minloglevel;
nebula> UPDATE CONFIGS graph:minloglevel=0;
``` 
-->

To change the severity of the storage log, replace the port in the preceding command with `storage` port.

> **NOTE**: Nebula Graph only supports modifying the graph and storage log severity by using the console. And the severity level of meta logs can only be modified with the `curl` command.

**Close** all logs print (FATAL only) with the following command.

```bash
$ curl -X PUT -H "Content-Type: application/json" -d '{"minloglevel":3,"v":0}' "127.0.0.1:19779/flags" # storaged
$ curl -X PUT -H "Content-Type: application/json" -d '{"minloglevel":3,"v":0}' "127.0.0.1:19669/flags" # graphd
$ curl -X PUT -H "Content-Type: application/json" -d '{"minloglevel":3,"v":0}' "127.0.0.1:19559/flags" # metad
```
