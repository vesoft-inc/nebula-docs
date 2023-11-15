# 部署 Studio

本文介绍如何在本地通过 RPM、DEB、tar 包和 Docker 部署 Studio。

## RPM 部署 Studio

### 前提条件

在部署 RPM 版 Studio 之前，用户需要确认以下信息：

-  {{nebula.name}} 服务已经部署并启动。详细信息，参考 [{{nebula.name}} 安装部署](../../4.deployment-and-installation/1.resource-preparations.md "点击前往 {{nebula.name}} 安装部署")。

- 使用的 Linux 发行版为 CentOS ，已安装 lsof。

- 确保以下端口未被占用。
  
  | 端口号 | 说明 |
  | ---- | ---- |
  | 7001 | Studio 提供 web 服务使用。 |

### 安装

1. 根据需要选择并下载 RPM 包，建议选择最新版本。常用下载链接如下：

   | 安装包 | 检验和 | 适用 {{nebula.name}} 版本 |
   | ----- | ----- | ----- |
   | [nebula-graph-studio-{{studio.release}}.x86_64.rpm](https://oss-cdn.nebula-graph.com.cn/nebula-graph-studio/{{studio.release}}/nebula-graph-studio-{{studio.release}}.x86_64.rpm) |  [nebula-graph-studio-{{studio.release}}.x86_64.rpm.sha256](https://oss-cdn.nebula-graph.com.cn/nebula-graph-studio/{{studio.release}}/nebula-graph-studio-{{studio.release}}.x86_64.rpm.sha256) | {{ nebula.release }} |

2. 使用`sudo rpm -i <rpm_name>`命令安装 RPM 包。

   例如，安装 Studio {{studio.release}} 版本需要运行以下命令，默认安装路径为`/usr/local/nebula-graph-studio`：

   ```bash
   $ sudo rpm -i nebula-graph-studio-{{studio.release}}.x86_64.rpm
   ```
   也可以使用以下命令安装到指定路径：
   ```bash
   $ sudo rpm -i nebula-graph-studio-{{studio.release}}.x86_64.rpm --prefix=<path> 
   ```

   当屏幕返回以下信息时，表示 PRM 版 Studio 已经成功启动。

   ```bash
   Start installing NebulaGraph Studio now...
   NebulaGraph Studio has been installed.
   NebulaGraph Studio started automatically.
   ```

3. 启动成功后，在浏览器地址栏输入 `http://<ip address>:7001`。
   
   如果在浏览器窗口中能看到以下登录界面，表示已经成功部署并启动 Studio。

   <img src="https://docs-cdn.nebula-graph.com.cn/figures/std_login_230912_cn.png" width="1200" alt="Studio 登录界面截屏">

### 卸载

用户可以使用以下的命令卸载 Studio。

```bash
$ sudo rpm -e nebula-graph-studio-{{studio.release}}.x86_64
```

当屏幕返回以下信息时，表示 PRM 版 Studio 已经卸载。
```bash
NebulaGraph Studio removed, bye~
```

### 异常处理

如果在安装过程中自动启动失败或是需要手动启动或停止服务，请使用以下命令：

- 手动启动服务
```bash
$ bash /usr/local/nebula-graph-studio/scripts/rpm/start.sh
```

- 手动停止服务
```bash  
$ bash /usr/local/nebula-graph-studio/scripts/rpm/stop.sh
```

如果启动服务时遇到报错 `ERROR: bind EADDRINUSE 0.0.0.0:7001`，用户可以通过以下命令查看端口 7001 是否被占用。
```bash
$ lsof -i:7001
```

如果端口被占用，且无法结束该端口上进程，用户可以修改 studio 配置内的启动端口，并重新启动服务。
```bash
//修改 studio 服务配置。配置文件默认路径为`/usr/local/nebula-graph-studio`。
$ vi etc/studio-api.yaml

//修改端口号，改成任意一个当前可用的即可。
Port: 7001

//重启服务
$ systemctl restart nebula-graph-studio.service
```

## DEB 部署 Studio

### 前提条件

在通过 DEB 部署安装 Studio 之前，用户需要确认以下信息：

-  {{nebula.name}} 服务已经部署并启动。详细信息，参考 [{{nebula.name}} 安装部署](../../4.deployment-and-installation/1.resource-preparations.md "点击前往 {{nebula.name}} 安装部署")。

- 使用的 Linux 发行版为 Ubuntu。

- 确保以下端口未被占用。

   | 端口号 | 说明 |
   | ---- | ---- |
   | 7001 | Studio 提供的 web 服务 |

- 确保系统中存在`/usr/lib/systemd/system`目录。如没有该目录，需手动创建。

### 安装

1. 根据需要选择并下载 DEB 包，建议选择最新版本。常用下载链接如下：

   | 安装包 | 检验和 | 适用 {{nebula.name}} 版本 |
   | ----- | ----- | ----- |
   | [nebula-graph-studio-{{studio.release}}.x86_64.deb](https://oss-cdn.nebula-graph.com.cn/nebula-graph-studio/{{studio.release}}/nebula-graph-studio-{{studio.release}}.x86_64.deb) |  [nebula-graph-studio-{{studio.release}}.x86_64.deb.sha256](https://oss-cdn.nebula-graph.com.cn/nebula-graph-studio/{{studio.release}}/nebula-graph-studio-{{studio.release}}.x86_64.deb.sha256) | {{ nebula.release }} |

2. 使用`sudo dpkg -i <deb_name>`命令安装 DEB 包。

   例如，安装 Studio {{studio.release}} 版本需要运行以下命令：

   ```bash
   $ sudo dpkg -i nebula-graph-studio-{{studio.release}}.x86_64.deb
   ```

3. 启动成功后，在浏览器地址栏输入 `http://<ip address>:7001`。
   
   如果在浏览器窗口中能看到以下登录界面，表示已经成功部署并启动 Studio。

   <img src="https://docs-cdn.nebula-graph.com.cn/figures/std_login_230912_cn.png" width="1200" alt="Studio 登录界面截屏">

### 卸载

用户可以使用以下的命令卸载 Studio。

```bash
$ sudo dpkg -r nebula-graph-studio
```

## tar 包部署 Studio

### 前提条件

在部署 tar 包安装的 Studio 之前，用户需要确认以下信息：

-  {{nebula.name}} 服务已经部署并启动。详细信息，参考 [{{nebula.name}} 安装部署](../../4.deployment-and-installation/1.resource-preparations.md "点击前往 {{nebula.name}} 安装部署")。

- 确保以下端口未被占用。

   | 端口号 | 说明 |
   | ---- | ---- |
   | 7001 | Studio 提供的 web 服务 |

### 安装部署

1. 根据需要下载 tar 包，建议选择最新版本。

   | 安装包 | Studio 版本 |适用 {{nebula.name}} 版本 |
   | --- | --- |---|
   | [nebula-graph-studio-{{studio.release}}.x86_64.tar.gz](https://oss-cdn.nebula-graph.com.cn/nebula-graph-studio/{{studio.release}}/nebula-graph-studio-{{studio.release}}.x86_64.tar.gz) | {{studio.release}} | {{ nebula.release }} |

2. 解压 tar 包。

   ```bash
   tar -xvf nebula-graph-studio-{{studio.release}}.x86_64.tar.gz
   ```

3. 部署 nebula-graph-studio 并启动。
   
   ```bash
   $ cd nebula-graph-studio
   $ ./server
   ```

4. 启动成功后，在浏览器地址栏输入 `http://<ip address>:7001`。
   
   如果在浏览器窗口中能看到以下登录界面，表示已经成功部署并启动 Studio。

   <img src="https://docs-cdn.nebula-graph.com.cn/figures/std_login_230912_cn.png" width="1200" alt="Studio 登录界面截屏">
### 停止服务

用户可以采用 `kill <pid>` 的方式来关停服务：
```bash
$ kill $(lsof -t -i :7001) # stop nebula-graph-studio
```

## Docker 部署 Studio

### 前提条件

在部署 Docker 版 Studio 之前，用户需要确认以下信息：

-  {{nebula.name}} 服务已经部署并启动。详细信息，参考 [{{nebula.name}} 安装部署](../../4.deployment-and-installation/1.resource-preparations.md "点击前往 {{nebula.name}} 安装部署")。

- 在即将运行 Docker 版 Studio 的机器上安装并启动 Docker Compose。详细信息参考 [Docker Compose 文档](https://docs.docker.com/compose/install/ "点击前往 Docker 文档中心")。
- 确保以下端口未被占用。

   | 端口号 | 说明 |
   | ---- | ---- |
   | 7001 | Studio 提供的 web 服务 |

- （可选）在中国大陆从 Docker Hub 拉取 Docker 镜像的速度可能比较慢，用户可以使用 `registry-mirrors` 参数配置加速镜像。例如，如果要使用 Docker 中国区官方镜像、网易镜像和中国科技大学的镜像，则按以下格式配置 `registry-mirrors` 参数：

   ```json
   {
   "registry-mirrors": [
     "https://registry.docker-cn.com",
     "http://hub-mirror.c.163.com",
     "https://docker.mirrors.ustc.edu.cn"
     ]
   }
   ```

   配置文件的路径和方法因操作系统和/或 Docker Desktop 版本而异。详细信息参考 [Docker Daemon 配置文档](https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-configuration-file "点击前往 Docker 文档中心")。

### 操作步骤

在命令行工具中按以下步骤依次运行命令，部署并启动 Docker 版 Studio，这里我们用 {{nebula.name}} 版本为 {{nebula.release}} 的进行演示：

1. 下载 Studio 的部署配置文件。

   | 安装包 | 适用 {{nebula.name}} 版本 |
   | ----- | ----- |
   | [nebula-graph-studio-{{studio.release}}.tar.gz](https://oss-cdn.nebula-graph.com.cn/nebula-graph-studio/{{studio.release}}/nebula-graph-studio-{{studio.release}}.tar.gz) | {{nebula.release}} |

2. 创建`nebula-graph-studio-{{studio.release}}`目录，并将安装包解压至目录中。

   ```bash
   mkdir nebula-graph-studio-{{studio.release}} && tar -zxvf nebula-graph-studio-{{studio.release}}.tar.gz -C nebula-graph-studio-{{studio.release}}
   ```

3. 解压后进入 `nebula-graph-studio-{{studio.release}}` 目录。

   ```bash
   cd nebula-graph-studio-{{studio.release}}
   ```

4. 拉取 Studio 的 Docker 镜像。

   ```bash
   docker-compose pull
   ```

5. 构建并启动 Studio 服务。其中，`-d` 表示在后台运行服务容器。

   ```bash
   docker-compose up -d
   ```

   当屏幕返回以下信息时，表示 Docker 版 Studio 已经成功启动。

   ```bash
   Creating docker_web_1      ... done
   ```

6. 启动成功后，在浏览器地址栏输入 `http://<ip address>:7001`。

  !!! note

        在运行 Docker 版 Studio 的机器上，用户可以运行 `ifconfig` 或者 `ipconfig` 获取本机 IP 地址。如果使用这台机器访问 Studio，可以在浏览器地址栏里输入 `http://localhost:7001`。

   如果在浏览器窗口中能看到以下登录界面，表示已经成功部署并启动 Studio。

   <img src="https://docs-cdn.nebula-graph.com.cn/figures/std_login_230912_cn.png" width="1200" alt="Studio 登录界面截屏">

## Helm 部署 Studio

本小节介绍如何在 Kubernetes 中使用 Helm 部署并启动 Studio。

### 前提条件

安装 Studio 前，用户需要安装以下软件并确保安装版本的正确性：

| 软件                                                         | 版本要求  |
| ------------------------------------------------------------ | --------- |
| [Kubernetes](https://kubernetes.io)                          | \>= 1.14  |
| [Helm](https://helm.sh)                                      | \>= 3.2.0 |

### 操作步骤

1. 克隆 Studio 的源代码到主机。

  ```bash
  $ git clone https://github.com/vesoft-inc/nebula-studio.git
  ```

2. 进入`nebula-studio`目录。

  ```bash
  $ cd nebula-studio
  ```

3. 更新并安装 Helm Chart，命名为`my-studio`。

  ```bash
  $ helm upgrade --install my-studio --set service.type=NodePort --set service.port={30070} deployment/helm
  ```

  Helm Chart 配置参数说明如下。

  | 参数 | 默认值 | 描述 |
  |:---|:---|:---|
  | replicaCount | 0 | Deployment 的副本数。 |
  | image.nebulaStudio.name | vesoft/nebula-graph-studio | nebula-graph-studio 镜像的仓库地址。 |
  | image.nebulaStudio.version | {{studio.tag}} | nebula-graph-studio 的版本。 |
  | service.type | ClusterIP | 服务类型，必须为`NodePort`，`ClusterIP`或`LoadBalancer`其中之一。 |
  | service.port | 7001 | nebula-graph-studio 中 web 服务的端口。 |
  | service.nodePort | 32701 | Kubernetes 集群外部访问 nebula-studio 的代理端口。 |
  | resources.nebulaStudio | {} | nebula-studio 的资源限制/请求。 |
  | persistent.storageClassName | "" | storageClass 名称，如果不指定就使用默认值。 |
  | persistent.size | 5Gi | 存储盘大小。 |

4. 启动成功后，在浏览器地址栏输入`http://<node_address>:30070`。
   如果在浏览器窗口中能看到以下登录界面，表示已经成功部署并启动 Studio。

   <img src="https://docs-cdn.nebula-graph.com.cn/figures/std_login_230912_cn.png" width="1200" alt="Studio 登录界面截屏">

### 卸载

```bash
$ helm uninstall my-studio
```

## 后续操作

进入 Studio 登录界面后，用户需要连接 {{nebula.name}} 。详细信息，参考[连接数据库](st-ug-connect.md)。
