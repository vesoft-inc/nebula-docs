

{{nebula.name}}支持通过脚本管理服务。




## 使用脚本管理服务

使用脚本`nebula.service`管理服务，包括启动、停止、重启、中止和查看。

!!! note
  
    `nebula.service`的默认路径是`/usr/local/nebula/scripts`，如果修改过安装路径，请使用实际路径。

### 语法

```bash
$ sudo /usr/local/nebula/scripts/nebula.service
[-v] [-c <config_file_path>]
<start | stop | restart | kill | status>
<metad | graphd | storaged | all>
```

|参数|说明|
|:---|:---|
|`-v`|显示详细调试信息。|
|`-c`|指定配置文件路径，默认路径为`/usr/local/nebula/etc/`。|
|`start`|启动服务。|
|`stop`|停止服务。|
|`restart`|重启服务。|
|`kill`|中止服务。|
|`status`|查看服务状态。|
|`metad`|管理 Meta 服务。|
|`graphd`|管理 Graph 服务。|
|`storaged`|管理 Storage 服务。|
|`all`|管理所有服务。|



## 启动{{nebula.name}}服务

执行如下命令启动服务：

```bash
$ sudo /usr/local/nebula/scripts/nebula.service start all
[INFO] Starting nebula-metad...
[INFO] Done
[INFO] Starting nebula-graphd...
[INFO] Done
[INFO] Starting nebula-storaged...
[INFO] Done
```




## 停止{{nebula.name}}服务

!!! danger

    请勿使用`kill -9` 命令强制终止进程，否则可能较小概率出现数据丢失。
  
执行如下命令停止{{nebula.name}}服务：

```bash
$ sudo /usr/local/nebula/scripts/nebula.service stop all
[INFO] Stopping nebula-metad...
[INFO] Done
[INFO] Stopping nebula-graphd...
[INFO] Done
[INFO] Stopping nebula-storaged...
[INFO] Done
```



## 查看{{nebula.name}}服务

执行如下命令查看{{nebula.name}}服务状态：

```bash
$ sudo /usr/local/nebula/scripts/nebula.service status all
```

- 如果返回如下结果，表示{{nebula.name}}服务正常运行。

    ```bash
    [INFO] nebula-metad(33fd35e): Running as 29020, Listening on 9559
    [INFO] nebula-graphd(33fd35e): Running as 29095, Listening on 9669
    [WARN] nebula-storaged after v3.0.0 will not start service until it is added to cluster.
    [WARN] See Manage Storage hosts:ADD HOSTS in https://docs.nebula-graph.io/
    [INFO] nebula-storaged(33fd35e): Running as 29147, Listening on 9779
    ```

  !!! note

        正常启动{{nebula.name}}后，`nebula-storaged`进程的端口显示红色。这是因为`nebula-storaged`在启动流程中会等待`nebula-metad`添加当前 Storage 服务，当前 Storage 服务收到 Ready 信号后才会正式启动服务。从 3.0.0 版本开始，在配置文件中添加的 Storage 节点无法直接读写，配置文件的作用仅仅是将 Storage 节点注册至 Meta 服务中。必须使用`ADD HOSTS`命令后，才能正常读写 Storage 节点。更多信息，参见[管理 Storage 主机](https://docs.nebula-graph.com.cn/{{nebula.release}}/4.deployment-and-installation/manage-storage-host/)。


- 如果返回类似如下结果，表示{{nebula.name}}服务异常，可以根据异常服务信息进一步排查，或者在 [{{nebula.name}}社区](https://discuss.nebula-graph.com.cn/)寻求帮助。

    ```bash
    [INFO] nebula-metad: Running as 25600, Listening on 9559
    [INFO] nebula-graphd: Exited
    [INFO] nebula-storaged: Running as 25646, Listening on 9779
    ```



{{nebula.name}}服务由 Meta 服务、Graph 服务和 Storage 服务共同提供，这三种服务的配置文件都保存在安装目录的`etc`目录内，默认路径为`/usr/local/nebula/etc/`，用户可以检查相应的配置文件排查问题。

## 下一步

- [连接{{nebula.name}}](https://docs.nebula-graph.com.cn/{{nebula.release}}/2.quick-start/3.quick-start-on-premise/3.connect-to-nebula-graph/)<!--这里用外链。-->
