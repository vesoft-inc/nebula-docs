You can use the `nebula.service` script to start, stop, restart, terminate, and check the NebulaGraph services. This topic takes starting, stopping and checking the NebulaGraph services for examples.

`nebula.service` is stored in the `/usr/local/nebula/scripts` directory by default, which is also the default installation path of NebulaGraph. If you have customized the path, use the actual path in your environment.

## Syntax

```bash
$ sudo /usr/local/nebula/scripts/nebula.service
[-v] [-c <config_file_path>]
<start|stop|restart|kill|status>
<metad|graphd|storaged|all>
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

### In non-container environment

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

### In docker container (deployed with docker-compose)

Run the following command in the `nebula-docker-compose/` directory to start NebulaGraph.

```bash
[nebula-docker-compose]$ docker-compose up -d
Building with native build. Learn about native build in Compose here: https://docs.docker.com/go/compose-native-build/
Creating network "nebula-docker-compose_nebula-net" with the default driver
Creating nebula-docker-compose_metad0_1 ... done
Creating nebula-docker-compose_metad2_1 ... done
Creating nebula-docker-compose_metad1_1 ... done
Creating nebula-docker-compose_storaged2_1 ... done
Creating nebula-docker-compose_graphd1_1   ... done
Creating nebula-docker-compose_storaged1_1 ... done
Creating nebula-docker-compose_storaged0_1 ... done
Creating nebula-docker-compose_graphd2_1   ... done
Creating nebula-docker-compose_graphd_1    ... done
```

## Stop NebulaGraph

!!! danger

    Do not run `kill -9` to forcibly terminate the processes. Otherwise, there is a low probability of data loss.

### In non-container environment

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

### In docker container (deployed with docker-compose)

Run the following command in the `nebula-docker-compose/` directory to stop NebulaGraph.

```bash
nebula-docker-compose]$ docker-compose down
Stopping nebula-docker-compose_graphd_1    ... done
Stopping nebula-docker-compose_graphd2_1   ... done
Stopping nebula-docker-compose_storaged0_1 ... done
Stopping nebula-docker-compose_storaged1_1 ... done
Stopping nebula-docker-compose_graphd1_1   ... done
Stopping nebula-docker-compose_storaged2_1 ... done
Stopping nebula-docker-compose_metad1_1    ... done
Stopping nebula-docker-compose_metad2_1    ... done
Stopping nebula-docker-compose_metad0_1    ... done
Removing nebula-docker-compose_graphd_1    ... done
Removing nebula-docker-compose_graphd2_1   ... done
Removing nebula-docker-compose_storaged0_1 ... done
Removing nebula-docker-compose_storaged1_1 ... done
Removing nebula-docker-compose_graphd1_1   ... done
Removing nebula-docker-compose_storaged2_1 ... done
Removing nebula-docker-compose_metad1_1    ... done
Removing nebula-docker-compose_metad2_1    ... done
Removing nebula-docker-compose_metad0_1    ... done
Removing network nebula-docker-compose_nebula-net
```

!!! Note

    If you are using a developing or nightly version for testing and have compatibility issues, try to run `docker-compose down -v` to **DELETE** all data stored in NebulaGraph and import data again.

## Check the service status

### In non-container environment

Run the following command to check the service status of NebulaGraph.

```bash
$ sudo /usr/local/nebula/scripts/nebula.service status all
```

* NebulaGraph is running normally if the following information is returned.

    ```bash
    [INFO] nebula-metad(02b2091): Running as 26601, Listening on 9559
    [INFO] nebula-graphd(02b2091): Running as 26644, Listening on 9669
    [INFO] nebula-storaged(02b2091): Running as 26709, Listening on 9779
    ```

  !!! note

        After starting NebulaGraph, the port of the `nebula-storaged` process is shown in red. Because the `nebula-storaged` process waits for the `nebula-metad` to add the current Storage service during the startup process. The Storage works after it receives the ready signal. Starting from NebulaGraph 3.0.0, the Meta service cannot directly read or write data in the Storage service that you add in the configuration file. The configuration file only registers the Storage service to the Meta service. You must run the `ADD HOSTS` command to enable the Meta to read and write data in the Storage service. For more information, see [Manage Storage hosts](../4.deployment-and-installation/manage-storage-host.md).

* If the returned result is similar to the following one, there is a problem. You may also go to the [NebulaGraph community](https://discuss.nebula-graph.io/) for help.

    ```bash
    [INFO] nebula-metad: Running as 25600, Listening on 9559
    [INFO] nebula-graphd: Exited
    [INFO] nebula-storaged: Running as 25646, Listening on 9779
    ```

The NebulaGraph services consist of the Meta Service, Graph Service, and Storage Service. The configuration files for all three services are stored in the `/usr/local/nebula/etc/` directory by default. You can check the configuration files according to the returned result to troubleshoot problems.

### In docker container (deployed with docker-compose)

Run the following command in the `nebula-docker-compose/` directory to check the service status of NebulaGraph.

```bash
nebula-docker-compose]$ docker-compose ps
            Name                             Command                  State                                             Ports
---------------------------------------------------------------------------------------------------------------------------------------------------------------------
nebula-docker-compose_graphd1_1     /usr/local/nebula/bin/nebu ...   Up (healthy)   0.0.0.0:49223->19669/tcp, 0.0.0.0:49222->19670/tcp, 0.0.0.0:49224->9669/tcp
nebula-docker-compose_graphd2_1     /usr/local/nebula/bin/nebu ...   Up (healthy)   0.0.0.0:49229->19669/tcp, 0.0.0.0:49228->19670/tcp, 0.0.0.0:49230->9669/tcp
nebula-docker-compose_graphd_1      /usr/local/nebula/bin/nebu ...   Up (healthy)   0.0.0.0:49221->19669/tcp, 0.0.0.0:49220->19670/tcp, 0.0.0.0:9669->9669/tcp
nebula-docker-compose_metad0_1      ./bin/nebula-metad --flagf ...   Up (healthy)   0.0.0.0:49212->19559/tcp, 0.0.0.0:49211->19560/tcp, 0.0.0.0:49213->9559/tcp,
                                                                                    9560/tcp
nebula-docker-compose_metad1_1      ./bin/nebula-metad --flagf ...   Up (healthy)   0.0.0.0:49209->19559/tcp, 0.0.0.0:49208->19560/tcp, 0.0.0.0:49210->9559/tcp,
                                                                                    9560/tcp
nebula-docker-compose_metad2_1      ./bin/nebula-metad --flagf ...   Up (healthy)   0.0.0.0:49206->19559/tcp, 0.0.0.0:49205->19560/tcp, 0.0.0.0:49207->9559/tcp,
                                                                                    9560/tcp
nebula-docker-compose_storaged0_1   ./bin/nebula-storaged --fl ...   Up (healthy)   0.0.0.0:49218->19779/tcp, 0.0.0.0:49217->19780/tcp, 9777/tcp, 9778/tcp,
                                                                                    0.0.0.0:49219->9779/tcp, 9780/tcp
nebula-docker-compose_storaged1_1   ./bin/nebula-storaged --fl ...   Up (healthy)   0.0.0.0:49215->19779/tcp, 0.0.0.0:49214->19780/tcp, 9777/tcp, 9778/tcp,
                                                                                     0.0.0.0:49216->9779/tcp, 9780/tcp
nebula-docker-compose_storaged2_1   ./bin/nebula-storaged --fl ...   Up (healthy)   0.0.0.0:49226->19779/tcp, 0.0.0.0:49225->19780/tcp, 9777/tcp, 9778/tcp,
                                                                                    0.0.0.0:49227->9779/tcp, 9780/tcp
```

If the service is abnormal, you can first confirm the abnormal container name (such as `nebula-docker-compose_graphd2_1`).

Then you can execute `docker ps` to view the corresponding `CONTAINER ID` (such as `2a6c56c405f5`).

```bash
[nebula-docker-compose]$ docker ps
CONTAINER ID   IMAGE                               COMMAND                  CREATED          STATUS                    PORTS                                                                                                  NAMES
2a6c56c405f5   vesoft/nebula-graphd:nightly     "/usr/local/nebula/b…"   36 minutes ago   Up 36 minutes (healthy)   0.0.0.0:49230->9669/tcp, 0.0.0.0:49229->19669/tcp, 0.0.0.0:49228->19670/tcp                            nebula-docker-compose_graphd2_1
7042e0a8e83d   vesoft/nebula-storaged:nightly   "./bin/nebula-storag…"   36 minutes ago   Up 36 minutes (healthy)   9777-9778/tcp, 9780/tcp, 0.0.0.0:49227->9779/tcp, 0.0.0.0:49226->19779/tcp, 0.0.0.0:49225->19780/tcp   nebula-docker-compose_storaged2_1
18e3ea63ad65   vesoft/nebula-storaged:nightly   "./bin/nebula-storag…"   36 minutes ago   Up 36 minutes (healthy)   9777-9778/tcp, 9780/tcp, 0.0.0.0:49219->9779/tcp, 0.0.0.0:49218->19779/tcp, 0.0.0.0:49217->19780/tcp   nebula-docker-compose_storaged0_1
4dcabfe8677a   vesoft/nebula-graphd:nightly     "/usr/local/nebula/b…"   36 minutes ago   Up 36 minutes (healthy)   0.0.0.0:49224->9669/tcp, 0.0.0.0:49223->19669/tcp, 0.0.0.0:49222->19670/tcp                            nebula-docker-compose_graphd1_1
a74054c6ae25   vesoft/nebula-graphd:nightly     "/usr/local/nebula/b…"   36 minutes ago   Up 36 minutes (healthy)   0.0.0.0:9669->9669/tcp, 0.0.0.0:49221->19669/tcp, 0.0.0.0:49220->19670/tcp                             nebula-docker-compose_graphd_1
880025a3858c   vesoft/nebula-storaged:nightly   "./bin/nebula-storag…"   36 minutes ago   Up 36 minutes (healthy)   9777-9778/tcp, 9780/tcp, 0.0.0.0:49216->9779/tcp, 0.0.0.0:49215->19779/tcp, 0.0.0.0:49214->19780/tcp   nebula-docker-compose_storaged1_1
45736a32a23a   vesoft/nebula-metad:nightly      "./bin/nebula-metad …"   36 minutes ago   Up 36 minutes (healthy)   9560/tcp, 0.0.0.0:49213->9559/tcp, 0.0.0.0:49212->19559/tcp, 0.0.0.0:49211->19560/tcp                  nebula-docker-compose_metad0_1
3b2c90eb073e   vesoft/nebula-metad:nightly      "./bin/nebula-metad …"   36 minutes ago   Up 36 minutes (healthy)   9560/tcp, 0.0.0.0:49207->9559/tcp, 0.0.0.0:49206->19559/tcp, 0.0.0.0:49205->19560/tcp                  nebula-docker-compose_metad2_1
7bb31b7a5b3f   vesoft/nebula-metad:nightly      "./bin/nebula-metad …"   36 minutes ago   Up 36 minutes (healthy)   9560/tcp, 0.0.0.0:49210->9559/tcp, 0.0.0.0:49209->19559/tcp, 0.0.0.0:49208->19560/tcp                  nebula-docker-compose_metad1_1
```

Use the `CONTAINER ID` to log in the container and troubleshoot.

```bash
nebula-docker-compose]$ docker exec -it 2a6c56c405f5 bash
[root@2a6c56c405f5 nebula]#
```

## Next to do

[Connect to NebulaGraph](https://docs.nebula-graph.io/{{nebula.release}}/2.quick-start/3.connect-to-nebula-graph/)<!--这里用外链。-->
