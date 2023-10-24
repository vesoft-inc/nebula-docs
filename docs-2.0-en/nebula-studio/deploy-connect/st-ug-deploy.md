# Deploy Studio
<!--
Studio on Cloud can be used on NebulaGraph Cloud Service. When you create a NebulaGraph instance on NebulaGraph Cloud Service, Studio on Cloud is deployed automatically. For more information, see [NebulaGraph Cloud Service User Guide](https://cloud-docs.nebula-graph.com.cn/en/posts/manage-instances/dbaas-ug-connect-nebulastudio/). For Docker-based and PRM-based Studio, you must deploy it. This article introduces how to deploy Docker-based and RPM-based Studio.
-->

This topic describes how to deploy Studio locally by RPM, DEB, tar package and Docker.

## RPM-based Studio

### Prerequisites

Before you deploy RPM-based Studio, you must confirm that:

- The NebulaGraph services are deployed and started. For more information, see [NebulaGraph Database Manual](../../2.quick-start/1.quick-start-workflow.md).

- The Linux distribution is CentOS, install `lsof`.

- Before the installation starts, the following ports are not occupied.

   | Port | Description |
   | ---- | ---- |
   | 7001 | Web service provided by Studio. |

### Install

1. Select and download the RPM package according to your needs. It is recommended to select the latest version. Common links are as follows:

   | Installation package | Checksum | NebulaGraph version |
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
   Start installing NebulaGraph Studio now...
   NebulaGraph Studio has been installed.
   NebulaGraph Studio started automatically.
   ```

3. When Studio is started, use `http://<ip address>:7001` to get access to Studio.

   If you can see the **Config Server** page on the browser, Studio is started successfully.

   <img src="https://docs-cdn.nebula-graph.com.cn/figures/std_login_230912_en.png" width="1200" alt="A screenshot that shows the login UI of studio">

### Uninstall

You can uninstall Studio using the following command:

```bash
$ sudo rpm -e nebula-graph-studio-{{studio.release}}.x86_64
```

If these lines are returned, PRM-based Studio has been uninstalled.

```bash
NebulaGraph Studio removed, bye~
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

If the port is occupied and the process on that port cannot be terminated, you can modify the startup port within the studio configuration and restart the service.

```bash
//Modify the studio service configuration. The default path to the configuration file is `/usr/local/nebula-graph-studio`.
$ vi etc/studio-api.yam

//Modify this port number and change it to any 
Port: 7001

//Restart service
$ systemctl restart nebula-graph-studio.service
```

## DEB-based Studio

### Prerequisites

Before you deploy DEB-based Studio, you must do a check of these:

- The NebulaGraph services are deployed and started. For more information, see [NebulaGraph Database Manual](../../2.quick-start/1.quick-start-workflow.md).

- The Linux distribution is Ubuntu.

- Before the installation starts, the following ports are not occupied.

   | Port | Description |
   | ---- | ---- |
   | 7001 | Web service provided by Studio |
   
 - The path `/usr/lib/systemd/system` exists in the system. If not, create it manually.

### Install

1. Select and download the DEB package according to your needs. It is recommended to select the latest version. Common links are as follows:

   | Installation package | Checksum | NebulaGraph version|
   | ----- | ----- | ----- |
   | [nebula-graph-studio-{{studio.release}}.x86_64.deb](https://oss-cdn.nebula-graph.io/nebula-graph-studio/{{studio.release}}/nebula-graph-studio-{{studio.release}}.x86_64.deb) |  [nebula-graph-studio-{{studio.release}}.x86_64.deb.sha256](https://oss-cdn.nebula-graph.io/nebula-graph-studio/{{studio.release}}/nebula-graph-studio-{{studio.release}}.x86_64.deb.sha256) | {{ nebula.release }} |

2. Use `sudo dpkg -i <deb_name>` to install DEB package.

  For example, install Studio {{studio.release}}, use the following command:

  ```bash
  $ sudo dpkg -i nebula-graph-studio-{{ studio.release }}.x86_64.deb
  ```

3. When Studio is started, use `http://<ip address>:7001` to get access to Studio.

   If you can see the **Config Server** page on the browser, Studio is started successfully.

   <img src="https://docs-cdn.nebula-graph.com.cn/figures/std_login_230912_en.png" width="1200" alt="A screenshot that shows the login UI of studio">

### Uninstall

You can uninstall Studio using the following command:

```bash
$ sudo dpkg -r nebula-graph-studio

```

## tar-based Studio

### Prerequisites

Before you deploy tar-based Studio, you must do a check of these:

- The NebulaGraph services are deployed and started. For more information, see [NebulaGraph Database Manual](../../2.quick-start/1.quick-start-workflow.md).

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

   <img src="https://docs-cdn.nebula-graph.com.cn/figures/std_login_230912_en.png" width="1200" alt="A screenshot that shows the login UI of studio">

### Stop Service

You can use `kill pid` to stop the service:
```bash
$ kill $(lsof -t -i :7001) #stop nebula-graph-studio
```

## Docker-based Studio

### Prerequisites

Before you deploy Docker-based Studio, you must do a check of these:

- The NebulaGraph services are deployed and started. For more information, see [NebulaGraph Database Manual](../../2.quick-start/1.quick-start-workflow.md).

- On the machine where Studio will run, Docker Compose is installed and started. For more information, see [Docker Compose Documentation](https://docs.docker.com/compose/install/ "Click to go to Docker Documentation").

- Before the installation starts, the following ports are not occupied.

   | Port | Description |
   | ---- | ---- |
   | 7001 | Web service provided by Studio |


### Procedure

To deploy and start Docker-based Studio, run the following commands. Here we use NebulaGraph v{{nebula.release}} for demonstration:

1. Download the configuration files for the deployment.
   
   | Installation package | NebulaGraph version |
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

   <img src="https://docs-cdn.nebula-graph.com.cn/figures/std_login_230912_en.png" width="1200" alt="A screenshot that shows the login UI of studio">

## Helm-based Studio

This section describes how to deploy Studio with Helm.

### Prerequisites

Before installing Studio, you need to install the following software and ensure the correct version of the software:

| Software                                                     | Requirement  |
| ------------------------------------------------------------ | --------- |
| [Kubernetes](https://kubernetes.io)                          | \>= 1.14  |
| [Helm](https://helm.sh)                                      | \>= 3.2.0 |

### Install

1. Use Git to clone the source code of Studio to the host.

   ```bash
   $ git clone https://github.com/vesoft-inc/nebula-studio.git
   ```

2. Make the `nebula-studio` directory the current working directory.
   
   ```bash
    $ cd nebula-studio
    ```

3. Assume using release name:`my-studio`, installed Studio in Helm Chart.
    
   ```bash
   $ helm upgrade --install my-studio --set service.type=NodePort --set service.port=30070deployment/helm
   ```

  The configuration parameters of the Helm Chart are described below.

  | Parameter | Default value | Description |
  |-----------|-------------|---------|
  | replicaCount  | 0 | The number of replicas for Deployment.   |
  | image.nebulaStudio.name  |  vesoft/nebula-graph-studio  | The image name of   nebula-graph-studio. |
  | image.nebulaStudio.version  | {{studio.tag}} |  The image version of nebula-graph-studio.  |
  | service.type  | ClusterIP |  The service type, which should be one of `NodePort`, `ClusterIP`,   and `LoadBalancer`. |
  | service.port  | 7001 |  The expose port for nebula-graph-studio's web.  |
  | service.nodePort | 32701 | The proxy port for accessing nebula-studio outside kubernetes   cluster. |
  | resources.nebulaStudio  | {} |  The resource limits/requests for nebula-studio. |
  | persistent.storageClassName  | ""  |  The name of storageClass. The default value will be used   if not specified. |
  | persistent.size  | 5Gi |  The persistent volume size. |

4. When Studio is started, use `http://<node_address>:30070/` to get access to Studio.

   If you can see the **Config Server** page on the browser, Studio is started successfully.

   <img src="https://docs-cdn.nebula-graph.com.cn/figures/std_login_230912_en.png" width="1200" alt="A screenshot that shows the login UI of studio">

### Uninstall

```bash
 $ helm uninstall my-studio
```

## Next to do

On the **Config Server** page, connect Docker-based Studio to NebulaGraph. For more information, see [Connect to NebulaGraph](st-ug-connect.md).
