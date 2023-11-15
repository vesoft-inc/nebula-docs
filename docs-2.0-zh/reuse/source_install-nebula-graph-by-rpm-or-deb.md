RPM 和 DEB 是 Linux 系统下常见的两种安装包格式，本文介绍如何使用 RPM 或 DEB 文件在一台机器上快速安装 {{nebula.name}} 。

!!! note

    部署 {{nebula.name}} 集群的方式参见[使用 RPM/DEB 包部署集群](https://docs.nebula-graph.com.cn/{{nebula.release}}/2.quick-start/3.quick-start-on-premise/3.1add-storage-hosts/)。<!--这里用外链。-->


## 前提条件

- 安装`wget`工具。


## 下载安装包




!!! note

    - 当前仅支持在 Linux 系统下安装 {{nebula.name}}，且仅支持 CentOS 7.x、CentOS 8.x、Ubuntu 16.04、Ubuntu 18.04、Ubuntu 20.04 操作系统。
  
    - 如果用户使用的是国产化的 Linux 操作系统，请[安装企业版 {{nebula.name}} ](https://yueshu.com.cn/contact)。  




### 阿里云 OSS 下载

- 下载 release 版本

    URL 格式如下：

    ```bash
    //Centos 7
    https://oss-cdn.nebula-graph.com.cn/package/<release_version>/nebula-graph-<release_version>.el7.x86_64.rpm

    //Centos 8
    https://oss-cdn.nebula-graph.com.cn/package/<release_version>/nebula-graph-<release_version>.el8.x86_64.rpm

    //Ubuntu 1604
    https://oss-cdn.nebula-graph.com.cn/package/<release_version>/nebula-graph-<release_version>.ubuntu1604.amd64.deb

    //Ubuntu 1804
    https://oss-cdn.nebula-graph.com.cn/package/<release_version>/nebula-graph-<release_version>.ubuntu1804.amd64.deb

    //Ubuntu 2004
    https://oss-cdn.nebula-graph.com.cn/package/<release_version>/nebula-graph-<release_version>.ubuntu2004.amd64.deb
    ```

    例如要下载适用于`Centos 7.5`的`{{ nebula.release }}`安装包：

    ```bash
    wget https://oss-cdn.nebula-graph.com.cn/package/{{ nebula.release }}/nebula-graph-{{ nebula.release }}.el7.x86_64.rpm
    wget https://oss-cdn.nebula-graph.com.cn/package/{{ nebula.release }}/nebula-graph-{{ nebula.release }}.el7.x86_64.rpm.sha256sum.txt
    ```

    下载适用于`ubuntu 1804`的`{{ nebula.release }}`安装包：
    ```bash
    wget https://oss-cdn.nebula-graph.com.cn/package/{{ nebula.release }}/nebula-graph-{{ nebula.release }}.ubuntu1804.amd64.deb
    wget https://oss-cdn.nebula-graph.com.cn/package/{{ nebula.release }}/nebula-graph-{{ nebula.release }}.ubuntu1804.amd64.deb.sha256sum.txt
    ```

- 下载日常开发版本 (nightly)

  !!! danger
  
      - nightly 版本通常用于测试新功能、新特性，请**不要**在生产环境中使用 nightly 版本。
      - nightly 版本不保证每日都能完整发布，也不保证是否会更改文件名。

    URL 格式如下：

    ```bash
    //Centos 7
    https://oss-cdn.nebula-graph.com.cn/package/nightly/<yyyy.mm.dd>/nebula-graph-<yyyy.mm.dd>-nightly.el7.x86_64.rpm

    //Centos 8
    https://oss-cdn.nebula-graph.com.cn/package/nightly/<yyyy.mm.dd>/nebula-graph-<yyyy.mm.dd>-nightly.el8.x86_64.rpm

    //Ubuntu 1604
    https://oss-cdn.nebula-graph.com.cn/package/nightly/<yyyy.mm.dd>/nebula-graph-<yyyy.mm.dd>-nightly.ubuntu1604.amd64.deb

    //Ubuntu 1804
    https://oss-cdn.nebula-graph.com.cn/package/nightly/<yyyy.mm.dd>/nebula-graph-<yyyy.mm.dd>-nightly.ubuntu1804.amd64.deb

    //Ubuntu 2004
    https://oss-cdn.nebula-graph.com.cn/package/nightly/<yyyy.mm.dd>/nebula-graph-<yyyy.mm.dd>-nightly.ubuntu2004.amd64.deb
    ```

    例如要下载`2021.11.24`适用于`Centos 7.5`的`2.x`安装包：

    ```bash
    wget https://oss-cdn.nebula-graph.com.cn/package/nightly/2021.11.24/nebula-graph-2021.11.24-nightly.el7.x86_64.rpm
    wget https://oss-cdn.nebula-graph.com.cn/package/nightly/2021.11.24/nebula-graph-2021.11.24-nightly.el7.x86_64.rpm.sha256sum.txt
    ```

    要下载`2021.11.24`适用于`Ubuntu 1804`的`2.x`安装包：
    ```bash
    wget https://oss-cdn.nebula-graph.com.cn/package/nightly/2021.11.24/nebula-graph-2021.11.24-nightly.ubuntu1804.amd64.deb
    wget https://oss-cdn.nebula-graph.com.cn/package/nightly/2021.11.24/nebula-graph-2021.11.24-nightly.ubuntu1804.amd64.deb.sha256sum.txt
    ```



## 安装 {{nebula.name}} 

- 安装 RPM 包

  ```bash
  $ sudo rpm -ivh --prefix=<installation_path> <package_name>
  ```
  
  `--prefix`为可选项，用于指定安装路径。如不设置，系统会将 {{nebula.name}} 安装到默认路径`/usr/local/nebula/`。

  例如，要在默认路径下安装{{nebula.release}}版本的 RPM 包，运行如下命令：

  
  ```bash
  sudo rpm -ivh nebula-graph-{{nebula.release}}.el7.x86_64.rpm
  ``` 
  

  

- 安装 DEB 包

  ```bash
  $ sudo dpkg -i <package_name>
  ```

  !!! note
        使用 DEB 包安装 {{nebula.name}} 时不支持自定义安装路径。默认安装路径为`/usr/local/nebula/`。

  例如安装{{nebula.release}}版本的 DEB 包：

  
  ```bash
  sudo dpkg -i nebula-graph-{{nebula.release}}.ubuntu1804.amd64.deb
  ```
  

  




## 后续操作

- [启动 {{nebula.name}} ](https://docs.nebula-graph.com.cn/{{nebula.release}}/2.quick-start/3.quick-start-on-premise/5.start-stop-service/)<!--这里用外链。-->
- [连接 {{nebula.name}} ](https://docs.nebula-graph.com.cn/{{nebula.release}}/2.quick-start/3.quick-start-on-premise/3.connect-to-nebula-graph/)<!--这里用外链。-->
