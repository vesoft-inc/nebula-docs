# Deploy a NebulaGraph cluster with RPM/DEB package on multiple servers

You can deploy a NebulaGraph cluster with RPM or DEB package manually. This topic provides an example of deploying a NebulaGraph cluster across multiple servers (machines).

!!! note

    You can also deploy a NebulaGraph cluster with official tools. For more information, see [Install NebulaGraph with ecosystem tools](6.deploy-nebula-graph-with-peripherals.md)

## Deployment

| Machine name |       IP address | Number of graphd | Number of storaged | Number of metad   |
| :-----       | :--------------- |   :------------- | :----------------- | :---------------- |
| A            |   192.168.10.111 |                1 |                  1 | 1                 |
| B            |   192.168.10.112 |                1 |                  1 | 1                 |
| C            |   192.168.10.113 |                1 |                  1 | 1                 |
| D            |   192.168.10.114 |                1 |                  1 | None              |
| E            |   192.168.10.115 |                1 |                  1 | None              |

## Prerequisites

- Prepare 5 machines for deploying the cluster.
- Use the NTP service to synchronize time in the cluster.

## Manual deployment process

### Install NebulaGraph

Install NebulaGraph on each machine in the cluster. Available approaches of installation are as follows.

* [Install NebulaGraph with RPM or DEB package](2.install-nebula-graph-by-rpm-or-deb.md)

* [Install NebulaGraph by compiling the source code](1.install-nebula-graph-by-compiling-the-source-code.md)

### Modify the configurations

To deploy NebulaGraph according to your requirements, you have to modify the configuration files.

All the configuration files for NebulaGraph, including `nebula-graphd.conf`, `nebula-metad.conf`, and `nebula-storaged.conf`, are stored in the `etc` directory in the installation path. You only need to modify the configuration for the corresponding service on the machines. The configurations that need to be modified for each machine are as follows.

| Machine name | The configuration to be modified                                  |
| :-----       | :---------------                                                  |
| A            | `nebula-graphd.conf`, `nebula-storaged.conf`, `nebula-metad.conf` |
| B            | `nebula-graphd.conf`, `nebula-storaged.conf`, `nebula-metad.conf` |
| C            | `nebula-graphd.conf`, `nebula-storaged.conf`, `nebula-metad.conf` |
| D            | `nebula-graphd.conf`, `nebula-storaged.conf`                      |
| E            | `nebula-graphd.conf`, `nebula-storaged.conf`                      |

Users can refer to the content of the following configurations, which only show part of the cluster settings. The hidden content uses the default setting so that users can better understand the relationship between the servers in the NebulaGraph cluster.

!!! note

    The main configuration to be modified is `meta_server_addrs`. All configurations need to fill in the IP addresses and ports of all Meta services. At the same time, `local_ip` needs to be modified as the network IP address of the machine itself. For detailed descriptions of the configuration parameters, see:

    - [Meta Service configurations](../../5.configurations-and-logs/1.configurations/2.meta-config.md)

    - [Graph Service configurations](../../5.configurations-and-logs/1.configurations/3.graph-config.md)

    - [Storage Service configurations](../../5.configurations-and-logs/1.configurations/4.storage-config.md)

- Deploy machine A

  - `nebula-graphd.conf`

    ```bash
    ########## networking ##########
    # Comma separated Meta Server Addresses
    --meta_server_addrs=192.168.10.111:9559,192.168.10.112:9559,192.168.10.113:9559
    # Local IP used to identify the nebula-graphd process.
    # Change it to an address other than loopback if the service is distributed or
    # will be accessed remotely.
    --local_ip=192.168.10.111
    # Network device to listen on
    --listen_netdev=any
    # Port to listen on
    --port=9669
    ```

  - `nebula-storaged.conf`

    ```bash
    ########## networking ##########
    # Comma separated Meta server addresses
    --meta_server_addrs=192.168.10.111:9559,192.168.10.112:9559,192.168.10.113:9559
    # Local IP used to identify the nebula-storaged process.
    # Change it to an address other than loopback if the service is distributed or
    # will be accessed remotely.
    --local_ip=192.168.10.111
    # Storage daemon listening port
    --port=9779
    ```

  - `nebula-metad.conf`

    ```bash
    ########## networking ##########
    # Comma separated Meta Server addresses
    --meta_server_addrs=192.168.10.111:9559,192.168.10.112:9559,192.168.10.113:9559
    # Local IP used to identify the nebula-metad process.
    # Change it to an address other than loopback if the service is distributed or
    # will be accessed remotely.
    --local_ip=192.168.10.111
    # Meta daemon listening port
    --port=9559
    ```

- Deploy machine B

  - `nebula-graphd.conf`

    ```bash
    ########## networking ##########
    # Comma separated Meta Server Addresses
    --meta_server_addrs=192.168.10.111:9559,192.168.10.112:9559,192.168.10.113:9559
    # Local IP used to identify the nebula-graphd process.
    # Change it to an address other than loopback if the service is distributed or
    # will be accessed remotely.
    --local_ip=192.168.10.112
    # Network device to listen on
    --listen_netdev=any
    # Port to listen on
    --port=9669
    ```

  - `nebula-storaged.conf`

    ```bash
    ########## networking ##########
    # Comma separated Meta server addresses
    --meta_server_addrs=192.168.10.111:9559,192.168.10.112:9559,192.168.10.113:9559
    # Local IP used to identify the nebula-storaged process.
    # Change it to an address other than loopback if the service is distributed or
    # will be accessed remotely.
    --local_ip=192.168.10.112
    # Storage daemon listening port
    --port=9779
    ```

  - `nebula-metad.conf`

    ```bash
    ########## networking ##########
    # Comma separated Meta Server addresses
    --meta_server_addrs=192.168.10.111:9559,192.168.10.112:9559,192.168.10.113:9559
    # Local IP used to identify the nebula-metad process.
    # Change it to an address other than loopback if the service is distributed or
    # will be accessed remotely.
    --local_ip=192.168.10.112
    # Meta daemon listening port
    --port=9559
    ```

- Deploy machine C

  - `nebula-graphd.conf`

    ```bash
    ########## networking ##########
    # Comma separated Meta Server Addresses
    --meta_server_addrs=192.168.10.111:9559,192.168.10.112:9559,192.168.10.113:9559
    # Local IP used to identify the nebula-graphd process.
    # Change it to an address other than loopback if the service is distributed or
    # will be accessed remotely.
    --local_ip=192.168.10.113
    # Network device to listen on
    --listen_netdev=any
    # Port to listen on
    --port=9669
    ```

  - `nebula-storaged.conf`

    ```bash
    ########## networking ##########
    # Comma separated Meta server addresses
    --meta_server_addrs=192.168.10.111:9559,192.168.10.112:9559,192.168.10.113:9559
    # Local IP used to identify the nebula-storaged process.
    # Change it to an address other than loopback if the service is distributed or
    # will be accessed remotely.
    --local_ip=192.168.10.113
    # Storage daemon listening port
    --port=9779
    ```

  - `nebula-metad.conf`

    ```bash
    ########## networking ##########
    # Comma separated Meta Server addresses
    --meta_server_addrs=192.168.10.111:9559,192.168.10.112:9559,192.168.10.113:9559
    # Local IP used to identify the nebula-metad process.
    # Change it to an address other than loopback if the service is distributed or
    # will be accessed remotely.
    --local_ip=192.168.10.113
    # Meta daemon listening port
    --port=9559
    ```

- Deploy machine D

  - `nebula-graphd.conf`

    ```bash
    ########## networking ##########
    # Comma separated Meta Server Addresses
    --meta_server_addrs=192.168.10.111:9559,192.168.10.112:9559,192.168.10.113:9559
    # Local IP used to identify the nebula-graphd process.
    # Change it to an address other than loopback if the service is distributed or
    # will be accessed remotely.
    --local_ip=192.168.10.114
    # Network device to listen on
    --listen_netdev=any
    # Port to listen on
    --port=9669
    ```

  - `nebula-storaged.conf`

    ```bash
    ########## networking ##########
    # Comma separated Meta server addresses
    --meta_server_addrs=192.168.10.111:9559,192.168.10.112:9559,192.168.10.113:9559
    # Local IP used to identify the nebula-storaged process.
    # Change it to an address other than loopback if the service is distributed or
    # will be accessed remotely.
    --local_ip=192.168.10.114
    # Storage daemon listening port
    --port=9779
    ```

- Deploy machine E

  - `nebula-graphd.conf`

    ```bash
    ########## networking ##########
    # Comma separated Meta Server Addresses
    --meta_server_addrs=192.168.10.111:9559,192.168.10.112:9559,192.168.10.113:9559
    # Local IP used to identify the nebula-graphd process.
    # Change it to an address other than loopback if the service is distributed or
    # will be accessed remotely.
    --local_ip=192.168.10.115
    # Network device to listen on
    --listen_netdev=any
    # Port to listen on
    --port=9669
    ```

  - `nebula-storaged.conf`

    ```bash
    ########## networking ##########
    # Comma separated Meta server addresses
    --meta_server_addrs=192.168.10.111:9559,192.168.10.112:9559,192.168.10.113:9559
    # Local IP used to identify the nebula-storaged process.
    # Change it to an address other than loopback if the service is distributed or
    # will be accessed remotely.
    --local_ip=192.168.10.115
    # Storage daemon listening port
    --port=9779
    ```

### Start the cluster

Start the corresponding service on **each machine**. Descriptions are as follows.

| Machine name | The process to be started |
| :-----       | :---------------          |
| A            | graphd, storaged, metad   |
| B            | graphd, storaged, metad   |
| C            | graphd, storaged, metad   |
| D            | graphd, storaged          |
| E            | graphd, storaged          |

The command to start the NebulaGraph services is as follows.

```bash
sudo /usr/local/nebula/scripts/nebula.service start <metad|graphd|storaged|all>
```

!!! note

    - Make sure all the processes of services on each machine are started. Otherwise, you will fail to start NebulaGraph.

    - When the graphd process, the storaged process, and the metad process are all started, you can use `all` instead.

    - `/usr/local/nebula` is the default installation path for NebulaGraph. Use the actual path if you have customized the path. For more information about how to start and stop the services, see [Manage NebulaGraph services](../manage-service.md).

### Check the cluster status

Install the native CLI client [NebulaGraph Console](../../2.quick-start/3.connect-to-nebula-graph.md), then connect to any machine that has started the graphd process, run `ADD HOSTS` command to add storage hosts, and run `SHOW HOSTS` to check the cluster status. For example:

```bash
$ ./nebula-console --addr 192.168.10.111 --port 9669 -u root -p nebula

2021/05/25 01:41:19 [INFO] connection pool is initialized successfully
Welcome to NebulaGraph!

> ADD HOSTS 192.168.10.111:9779, 192.168.10.112:9779, 192.168.10.113:9779, 192.168.10.114:9779, 192.168.10.115:9779;
> SHOW HOSTS;
+------------------+------+----------+--------------+----------------------+------------------------+---------+
| Host             | Port | Status   | Leader count | Leader distribution  | Partition distribution | Version |
+------------------+------+----------+--------------+----------------------+------------------------+---------+
| "192.168.10.111" | 9779 | "ONLINE" | 0            | "No valid partition" | "No valid partition"   | "{{nebula.release}}" |
| "192.168.10.112" | 9779 | "ONLINE" | 0            | "No valid partition" | "No valid partition"   | "{{nebula.release}}" |
| "192.168.10.113" | 9779 | "ONLINE" | 0            | "No valid partition" | "No valid partition"   | "{{nebula.release}}" |
| "192.168.10.114" | 9779 | "ONLINE" | 0            | "No valid partition" | "No valid partition"   | "{{nebula.release}}" |
| "192.168.10.115" | 9779 | "ONLINE" | 0            | "No valid partition" | "No valid partition"   | "{{nebula.release}}" |
+------------------+------+-----------+----------+--------------+----------------------+------------------------+---------+
```
