NebulaGraph supports managing services with scripts. 

## Manage services with script

You can use the `nebula.service` script to start, stop, restart, terminate, and check the NebulaGraph services.

!!! note

    `nebula.service` is stored in the `/usr/local/nebula/scripts` directory by default. If you have customized the path, use the actual path in your environment.

### Syntax

```bash
$ sudo /usr/local/nebula/scripts/nebula.service
[-v] [-c <config_file_path>]
<start | stop | restart | kill | status>
<metad | graphd | storaged | all>
```

|Parameter|Description|
|-|-|
|`-v`|Display detailed debugging information.|
|`-c`|Specify the configuration file path. The default path is `/usr/local/nebula/etc/`.|
|`start`|Start the target services.|
|`stop`|Stop the target services.|
|`restart`|Restart the target services.|
|`kill`|Terminate the target services.|
|`status`|Check the status of the target services.|
|`metad`|Set the Meta Service as the target service.|
|`graphd`|Set the Graph Service as the target service.|
|`storaged`|Set the Storage Service as the target service.|
|`all`|Set all the NebulaGraph services as the target services.|

## Start NebulaGraph

Run the following command to start NebulaGraph.

```bash
$ sudo /usr/local/nebula/scripts/nebula.service start all
[INFO] Starting nebula-metad...
[INFO] Done
[INFO] Starting nebula-graphd...
[INFO] Done
[INFO] Starting nebula-storaged...
[INFO] Done
```

## Stop NebulaGraph

!!! danger

    Do not run `kill -9` to forcibly terminate the processes. Otherwise, there is a low probability of data loss.

Run the following command to stop NebulaGraph.

```bash
$ sudo /usr/local/nebula/scripts/nebula.service stop all
[INFO] Stopping nebula-metad...
[INFO] Done
[INFO] Stopping nebula-graphd...
[INFO] Done
[INFO] Stopping nebula-storaged...
[INFO] Done
```


## Check the service status

Run the following command to check the service status of NebulaGraph.

```bash
$ sudo /usr/local/nebula/scripts/nebula.service status all
```

* NebulaGraph is running normally if the following information is returned.

    ```bash
    INFO] nebula-metad(33fd35e): Running as 29020, Listening on 9559
    [INFO] nebula-graphd(33fd35e): Running as 29095, Listening on 9669
    [WARN] nebula-storaged after v3.0.0 will not start service until it is added to cluster.
    [WARN] See Manage Storage hosts:ADD HOSTS in https://docs.nebula-graph.io/
    [INFO] nebula-storaged(33fd35e): Running as 29147, Listening on 9779
    ```

  !!! note

        After starting NebulaGraph, the port of the `nebula-storaged` process is shown in red. Because the `nebula-storaged` process waits for the `nebula-metad` to add the current Storage service during the startup process. The Storage works after it receives the ready signal. Starting from NebulaGraph 3.0.0, the Meta service cannot directly read or write data in the Storage service that you add in the configuration file. The configuration file only registers the Storage service to the Meta service. You must run the `ADD HOSTS` command to enable the Meta to read and write data in the Storage service. For more information, see [Manage Storage hosts](../4.deployment-and-installation/manage-storage-host.md).

* If the returned result is similar to the following one, there is a problem. You may also go to the [NebulaGraph community](https://github.com/vesoft-inc/nebula/discussions) for help.

    ```bash
    [INFO] nebula-metad: Running as 25600, Listening on 9559
    [INFO] nebula-graphd: Exited
    [INFO] nebula-storaged: Running as 25646, Listening on 9779
    ```

The NebulaGraph services consist of the Meta Service, Graph Service, and Storage Service. The configuration files for all three services are stored in the `/usr/local/nebula/etc/` directory by default. You can check the configuration files according to the returned result to troubleshoot problems.

## Next to do

[Connect to NebulaGraph](https://docs.nebula-graph.io/{{nebula.release}}/2.quick-start/3.connect-to-nebula-graph/)<!--这里用外链。-->
