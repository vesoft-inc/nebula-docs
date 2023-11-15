本文介绍如何使用原生命令行客户端 NebulaGraph Console 连接 {{nebula.name}} 。

<!--本文中的链接必须用外链，因为这篇文档是复用的，用内部链接会出错。-->

!!! caution

    首次连接到 {{nebula.name}} 后，必须先[注册 Storage 服务](https://docs.nebula-graph.com.cn/{{nebula.release}}/2.quick-start/3.quick-start-on-premise/3.1add-storage-hosts/)，才能正常查询数据。

 {{nebula.name}} 支持多种类型的客户端，包括命令行客户端、可视化界面客户端和流行编程语言客户端。详情参见[客户端列表](https://docs.nebula-graph.com.cn/{{nebula.release}}/14.client/1.nebula-client/)。

## 前提条件

-  {{nebula.name}} 服务已[启动](https://docs.nebula-graph.com.cn/{{nebula.release}}/4.deployment-and-installation/manage-service/)。

- 运行 NebulaGraph Console 的机器和运行 {{nebula.name}} 的服务器网络互通。

- NebulaGraph Console 的版本兼容 {{nebula.name}} 的版本。

  !!! note
  
        版本相同的 NebulaGraph Console 和 {{nebula.name}} 兼容程度最高，版本不同的 NebulaGraph Console 连接 {{nebula.name}} 时，可能会有兼容问题，或者无法连接并报错`incompatible version between client and server`。

## 操作步骤

1. 在 NebulaGraph Console [下载页面](https://github.com/vesoft-inc/nebula-console/releases "the nebula-console Releases page")，确认需要的版本，单击 **Assets**。

  !!! note

        建议选择**最新**版本。

2. 在 **Assets** 区域找到机器运行所需的二进制文件，下载文件到机器上。


3. （可选）为方便使用，重命名文件为`nebula-console`。

  !!! note

        在 Windows 系统中，请重命名为`nebula-console.exe`。

4. 在运行 NebulaGraph Console 的机器上执行如下命令，为用户授予 nebula-console 文件的执行权限。

  !!! note

       Windows 系统请跳过此步骤。

    ```bash
    $ chmod 111 nebula-console
    ```

5. 在命令行界面中，切换工作目录至 nebula-console 文件所在目录。

6. 执行如下命令连接 {{nebula.name}} 。

  - Linux 或 macOS

    ```bash
    $ ./nebula-console -addr <ip> -port <port> -u <username> -p <password>
      [-t 120] [-e "nGQL_statement" | -f filename.nGQL]
    ```

  - Windows

    ```powershell
    > nebula-console.exe -addr <ip> -port <port> -u <username> -p <password>
      [-t 120] [-e "nGQL_statement" | -f filename.nGQL]
    ```

  参数说明如下。

  | 参数 | 说明 |
  | - | - |
  | `-h/-help` | 显示帮助菜单。 |
  | `-addr/-address` | 设置要连接的 Graph 服务的 IP 地址。默认地址为 127.0.0.1。<!-- 如果 {{nebula.name}} 部署在 [Nebula Cloud](https://docs.nebula-graph.com.cn/2.6.2/nebula-cloud/1.what-is-cloud/) 上，需要创建 [Private Link](https://docs.nebula-graph.com.cn/2.6.2/nebula-cloud/5.solution/5.2.connection-configuration-and-use)，并设置该参数的值为专用终结点的 IP 地址。 -->|
  | `-P/-port` | 设置要连接的 Graph 服务的端口。默认端口为 9669。|
  | `-u/-user` | 设置 {{nebula.name}} 账号的用户名。未启用身份认证时，可以使用任意已存在的用户名（默认为`root`）。 |
  | `-p/-password` | 设置用户名对应的密码。未启用身份认证时，密码可以填写任意字符。 |
  | `-t/-timeout`  | 设置整数类型的连接超时时间。单位为毫秒，默认值为 120。 |
  | `-e/-eval` | 设置字符串类型的 nGQL 语句。连接成功后会执行一次该语句并返回结果，然后自动断开连接。 |
  | `-f/-file` | 设置存储 nGQL 语句的文件的路径。连接成功后会执行该文件内的 nGQL 语句并返回结果，执行完毕后自动断开连接。 |
  | `-enable_ssl` | 连接 {{nebula.name}} 时使用 SSL 加密。 |
  | `-ssl_root_ca_path` | 指定 CA 证书的存储路径。 |
  | `-ssl_cert_path` | 指定 CRT 证书的存储路径。 |
  | `-ssl_private_key_path` | 指定私钥文件的存储路径。 |

  更多参数参见[项目仓库](https://github.com/vesoft-inc/nebula-console/tree/{{console.branch}})。




