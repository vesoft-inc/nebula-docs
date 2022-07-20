# Deploy Studio
<!--
Studio on Cloud can be used on Nebula Graph Cloud Service. When you create a Nebula Graph instance on Nebula Graph Cloud Service, Studio on Cloud is deployed automatically. For more information, see [Nebula Graph Cloud Service User Guide](https://cloud-docs.nebula-graph.com.cn/en/posts/manage-instances/dbaas-ug-connect-nebulastudio/). For Docker-based and PRM-based Studio, you must deploy it. This article introduces how to deploy Docker-based and RPM-based Studio.
-->

This topic describes how to deploy Studio locally by RPM, DEB, tar package and Docker.

## RPM-based Studio

### Prerequisites

Before you deploy RPM-based Studio, you must confirm that:

- The Nebula Graph services are deployed and started. For more information, see [Nebula Graph Database Manual](../../2.quick-start/1.quick-start-workflow.md).

- The Linux distribution is CentOS, install `lsof`.

- Before the installation starts, the following ports are not occupied.

   | Port | Description |
   | ---- | ---- |
   | 7001 | Web service provided by Studio. |

### Install

1. Select and download the RPM package according to your needs. It is recommended to select the latest version. Common links are as follows:

   | Installation package | Checksum | Nebula version |
   | ----- | ----- | ----- |
   | [nebula-graph-studio-{{studio.release}}.x86_64.rpm](https://oss-cdn.nebula-graph.io/nebula-graph-studio/{{studio.release}}/nebula-graph-studio-{{studio.release}}.x86_64.rpm) |  [nebula-graph-studio-{{studio.release}}.x86_64.rpm.sha256](https://oss-cdn.nebula-graph.io/nebula-graph-studio/{{studio.release}}/nebula-graph-studio-{{studio.release}}.x86_64.rpm.sha256) | {{nebula.release}} |


2. Use `sudo rpm -i <rpm_name>` to install RPM package.
   
   For example, install Studio {{studio.release}}, use the following command. The default installation path is `/usr/local/nebula-graph-studio`.
   ```bash
   $ sudo rpm -i nebula-graph-studio-{{studio.release}}.x86_64.rpm
   ```

   You can also install it to the specified path using the following command:
   ```bash
   $ sudo rpm -i nebula-graph-studio-{{studio.release}}.x86_64.rpm --prefix=<path> 
   ```

   When the screen returns the following message, it means that the PRM-based Studio has been successfully started.

   ```bash
   Start installing Nebula Studio now...
   Nebula Studio has been installed.
   Nebula Studio started automatically.
   ```

3. When Studio is started, use `http://<ip address>:7001` to get access to Studio.

   If you can see the **Config Server** page on the browser, Studio is started successfully.

   ![The Config Server page shows that Studio is started successfully](https://docs-cdn.nebula-graph.com.cn/figures/st-ug-000-en.png)

### Uninstall

You can uninstall Studio using the following command:

```bash
$ sudo rpm -e nebula-graph-studio-{{studio.release}}.x86_64
```

If these lines are returned, PRM-based Studio has been uninstalled.

```bash
Nebula Studio removed, bye~
```
### Exception handling

If the automatic start fails during the installation process or you want to manually start or stop the service, use the following command:

- Start the service manually
```bash
$ bash /usr/local/nebula-graph-studio/scripts/rpm/start.sh
```

- Stop the service manually
```bash
$ bash /usr/local/nebula-graph-studio/scripts/rpm/stop.sh
```

If you encounter an error `bind EADDRINUSE 0.0.0.0:7001` when starting the service, you can use the following command to check port 7001 usage.

```bash
$ lsof -i:7001
```

If the port is occupied and the process on that port cannot be terminated, you can use the following command to change Studio service port and restart the service.

```bash
//Open the configuration file
$ vi config/config.default.js

//Change the port
web:
#  task_id_path:
#  upload_dir:
#  tasks_dir:
#  sqlitedb_file_path:
#  ip:
  port: 7001 // Modify this port number and change it to any 

//Restart service
$ systemctl restart nebula-graph-studio.service
```

## DEB-based Studio

### Prerequisites

Before you deploy DEB-based Studio, you must do a check of these:

- The Nebula Graph services are deployed and started. For more information, see [Nebula Graph Database Manual](../../2.quick-start/1.quick-start-workflow.md).

- The Linux distribution is Ubuntu.

- Before the installation starts, the following ports are not occupied.

   | Port | Description |
   | ---- | ---- |
   | 7001 | Web service provided by Studio |
   
 - The path `/usr/lib/systemd/system` exists in the system. If not, create it manually.

### Install

1. Select and download the DEB package according to your needs. It is recommended to select the latest version. Common links are as follows:

   | Installation package | Checksum | Nebula version|
   | ----- | ----- | ----- |
   | [nebula-graph-studio-{{studio.release}}.x86_64.deb](https://oss-cdn.nebula-graph.io/nebula-graph-studio/{{studio.release}}/nebula-graph-studio-{{studio.release}}.x86_64.deb) |  [nebula-graph-studio-{{studio.release}}.x86_64.deb.sha256](https://oss-cdn.nebula-graph.io/nebula-graph-studio/{{studio.release}}/nebula-graph-studio-{{studio.release}}.x86_64.deb.sha256) | {{ nebula.release }} |

2. Use `sudo dpkg -i <deb_name>` to install DEB package.

  For example, install Studio {{studio.release}}, use the following command:

  ```bash
  $ sudo dpkg -i nebula-graph-studio-{{ studio.release }}.x86_64.deb
  ```

3. When Studio is started, use `http://<ip address>:7001` to get access to Studio.

   If you can see the **Config Server** page on the browser, Studio is started successfully.

   ![The Config Server page shows that Studio is started successfully](https://docs-cdn.nebula-graph.com.cn/figures/st-ug-000-en.png)

### Uninstall

You can uninstall Studio using the following command:

```bash
$ sudo dpkg -r nebula-graph-studio

```

## tar-based Studio

### Prerequisites

Before you deploy tar-based Studio, you must do a check of these:

- The Nebula Graph services are deployed and started. For more information, see [Nebula Graph Database Manual](../../2.quick-start/1.quick-start-workflow.md).

- Before the installation starts, the following ports are not occupied.

   | Port | Description |
   | ---- | ---- |
   | 7001 | Web service provided by Studio |

### Install and deploy

1. Select and download the tar package according to your needs. It is recommended to select the latest version. Common links are as follows:

   | Installation package | Studio version |
   | --- | --- |
   | [nebula-graph-studio-{{studio.release}}.x86_64.tar.gz](https://oss-cdn.nebula-graph.io/nebula-graph-studio/{{studio.release}}/nebula-graph-studio-{{studio.release}}.x86_64.tar.gz) | {{studio.release}} |

2. Use `tar -xvf` to decompress the tar package.

   ```bash
   $ tar -xvf nebula-graph-studio-{{studio.release}}.x86_64.tar.gz
   ```

3. Deploy and start nebula-graph-studio.

   ```bash
   $ cd nebula-graph-studio
   $ ./server
   ```

4. When Studio is started, use `http://<ip address>:7001` to get access to Studio.

   If you can see the **Config Server** page on the browser, Studio is started successfully.

   ![The Config Server page shows that Studio is started successfully](https://docs-cdn.nebula-graph.com.cn/figures/st-ug-000-en.png)

### Stop Service

You can use `kill pid` to stop the service:
```bash
$ kill $(lsof -t -i :7001) #stop nebula-graph-studio
```

## Docker-based Studio

### Prerequisites

Before you deploy Docker-based Studio, you must do a check of these:

- The Nebula Graph services are deployed and started. For more information, see [Nebula Graph Database Manual](../../2.quick-start/1.quick-start-workflow.md).

- On the machine where Studio will run, Docker Compose is installed and started. For more information, see [Docker Compose Documentation](https://docs.docker.com/compose/install/ "Click to go to Docker Documentation").

- Before the installation starts, the following ports are not occupied.

   | Port | Description |
   | ---- | ---- |
   | 7001 | Web service provided by Studio |


### Procedure

To deploy and start Docker-based Studio, run the following commands. Here we use Nebula Graph v{{nebula.release}} for demonstration:

1. Download the configuration files for the deployment.
   
   | Installation package | Nebula Graph version |
   | ----- | ----- |
   | [nebula-graph-studio-{{studio.release}}.tar.gz](https://oss-cdn.nebula-graph.io/nebula-graph-studio/{{studio.release}}/nebula-graph-studio-{{studio.release}}.tar.gz) | {{nebula.release}} |

2. Create the `nebula-graph-studio-{{studio.release}}` directory and decompress the installation package to the directory.

    ```bash
    $ mkdir nebula-graph-studio-{{studio.release}} -zxvf nebula-graph-studio-{{studio.release}}.gz -C nebula-graph-studio-{{studio.release}}
    ```

3. Change to the `nebula-graph-studio-{{studio.release}}` directory.
   ```bash
   $ cd nebula-graph-studio-{{studio.release}}
   ```

4. Pull the Docker image of Studio.

    ```bash
    $ docker-compose pull
    ```

5. Build and start Docker-based Studio. In this command, `-d` is to run the containers in the background.

   ```bash
   $ docker-compose up -d
   ```

    If these lines are returned, Docker-based Studio v3.x is deployed and started.

    ```bash
    Creating docker_web_1      ... done
    ```

6. When Docker-based Studio is started, use `http://<ip address>:7001` to get access to Studio.
  
  !!! note

        Run `ifconfig` or `ipconfig` to get the IP address of the machine where Docker-based Studio is running. On the machine running Docker-based Studio, you can use `http://localhost:7001` to get access to Studio.

   If you can see the **Config Server** page on the browser, Docker-based Studio is started successfully.

   ![The Config Server page shows that Docker-based Studio is started successfully](https://docs-cdn.nebula-graph.com.cn/figures/st-ug-000-en.png "Docker-based Studio is started")

## Next to do

On the **Config Server** page, connect Docker-based Studio to Nebula Graph. For more information, see [Connect to Nebula Graph](st-ug-connect.md).
