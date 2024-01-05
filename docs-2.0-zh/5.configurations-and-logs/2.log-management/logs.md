# 运行日志

运行日志通常提供给 DBA 或开发人员查看，当系统出现故障，DBA 或开发人员可以根据运行日志定位问题。

 {{nebula.name}} 默认使用 [glog](https://github.com/google/glog) 打印运行日志，使用 [gflags](https://gflags.github.io/gflags/) 控制日志级别，并在运行时通过 HTTP 接口动态修改日志级别，方便跟踪问题。

## 运行日志目录

运行日志的默认目录为`/usr/local/nebula/logs/`。

如果在 {{nebula.name}} 运行过程中删除运行日志目录，日志不会继续打印，但是不会影响业务。重启服务可以恢复正常。

## 配置说明

- `minloglevel`：最小日志级别，即不会记录低于这个级别的日志。可选值为`0`（INFO）、`1`（WARNING）、`2`（ERROR）、`3`（FATAL）。建议在调试时设置为`0`，生产环境中设置为`1`。如果设置为`4`，{{nebula.name}} 不会记录任何日志。

- `v`：日志详细级别，值越大，日志记录越详细。可选值为`0`、`1`、`2`、`3`。

Meta 服务、Graph 服务和 Storage 服务的日志级别可以在各自的配置文件中查看，默认路径为`/usr/local/nebula/etc/`。

## 查看运行日志级别

使用如下命令查看当前所有的 gflags 参数（包括日志参数）：

```bash
$ curl <ws_ip>:<ws_port>/flags
```

|参数|说明|
|:---|:---|
|`ws_ip`|HTTP 服务的 IP 地址，可以在配置文件中查看。默认值为`127.0.0.1`。|
|`ws_port`|HTTP 服务的端口，可以在配置文件中查看。默认值分别为`19559`（Meta）、`19669`（Graph）`19779`（Storage）。|

示例如下：

- 查看 Meta 服务当前的最小日志级别：

    ```bash
    $ curl 127.0.0.1:19559/flags | grep 'minloglevel'
    ```

- 查看 Storage 服务当前的日志详细级别：
  
    ```bash
    $ curl 127.0.0.1:19779/flags | grep -w 'v'
    ```

## 修改运行日志级别

使用如下命令修改运行日志级别：

```bash
$ curl -X PUT -H "Content-Type: application/json" -d '{"<key>":<value>[,"<key>":<value>]}' "<ws_ip>:<ws_port>/flags"
```

|参数|说明|
|:---|:---|
|`key`|待修改的运行日志类型，可选值请参见[配置说明](#_3)。|
|`value`|运行日志级别，可选值请参见[配置说明](#_3)。|
|`ws_ip`|HTTP 服务的 IP 地址，可以在配置文件中查看。默认值为`127.0.0.1`。|
|`ws_port`|HTTP 服务的端口，可以在配置文件中查看。默认值分别为`19559`（Meta）、`19669`（Graph）`19779`（Storage）。|

示例如下：

```bash
$ curl -X PUT -H "Content-Type: application/json" -d '{"minloglevel":0,"v":3}' "127.0.0.1:19779/flags" # storaged
$ curl -X PUT -H "Content-Type: application/json" -d '{"minloglevel":0,"v":3}' "127.0.0.1:19669/flags" # graphd
$ curl -X PUT -H "Content-Type: application/json" -d '{"minloglevel":0,"v":3}' "127.0.0.1:19559/flags" # metad

```

如果在{{nebula.name}}运行时修改了运行日志级别，重启服务后会恢复为配置文件中设置的级别，如果需要永久修改，请修改[配置文件](../1.configurations/1.configurations.md)并重启服务。

## RocksDB 运行日志

RocksDB 的运行日志通常在 `/usr/local/nebula/data/storage/nebula/$id/data/LOG`, 其中 `$id` 为实例号。该日志通常用于调试 RocksDB 参数。

## 回收日志

glog 本身不支持回收日志，如果需要回收日志，可以使用 Linux 系统中[定时任务（Cron Jobs）](https://man7.org/linux/man-pages/man1/crontab.1.html)来定期删除旧的日志文件。或者，使用日志管理工具 [logrotate](https://github.com/logrotate/logrotate) 来轮转日志以定期归档和删除日志。

### 使用定时任务回收日志

本文以回收 Graph 服务的运行日志为例，说明如何使用定时任务来定期删除旧的日志文件。操作步骤如下：

1. 在 [Graph 服务配置文件](../1.configurations/3.graph-config.md)中，进行如下配置，然后重启服务。

  ```bash
  timestamp_in_logfile_name = true
  max_log_size = 500
  ```

  - 设置`timestamp_in_logfile_name`为`true`，这样日志文件名中会包含时间戳，以定期删除旧的日志文件。
  - 添加`max_log_size`参数，设置单个日志文件的最大大小，例如`500`。超过这个大小后，会自动创建新的日志文件，单位 MB，默认值为`1800`。

2. 在 Linux 系统中，使用如下命令编辑定时任务：

  ```bash
  crontab -e
  ```

3. 在定时任务中添加命令，以定期删除旧的日志文件。

  ```bash
  * * * * * find <log_path> -name "<YourProjectName>" -mtime +7 -delete
  ```

  !!! caution

        以上命令中的`find`命令需要使用 root 用户或者具有 sudo 权限的用户来执行。

  - `* * * * *`：定时任务的时间字段，五个星号表示这个任务每分钟都会执行。其他设置，参见[Cron Expression](https://crontab.cronhub.io/)。
  - `<log_path>`：服务运行日志文件的路径，例如`/usr/local/nebula/logs`。
  - `<YourProjectName>`：日志文件名，例如`nebula-graphd.*`。
  - `-mtime +7`：表示删除更新时间超过 7 天的日志文件。也可以使用`-mmin +n`，表示删除更新时间超过 n 分钟的日志文件。详情参见 [find 命令](https://man7.org/linux/man-pages/man1/find.1.html)。
  - `-delete`：表示删除满足条件的日志文件。

  例如，每天凌晨 3 点自动删除更新时间超过 7 天的 Graph 服务运行日志文件的命令：

  ```bash
  0 3 * * * find /usr/local/nebula/logs -name nebula-graphd.* -mtime +7 -delete
  ```

4. 保存定时任务。


### 使用 logrotate 回收日志

用户可以使用 logrotate 工具对指定的日志文件进行轮转，以达到归档和回收日志的目的。

!!! note

    需要使用 root 用户或者具有 sudo 权限的用户来安装 logrotate 或者运行 logrotate。

本文以回收 Graph 服务`INFO`级别的日志文件（`/usr/local/nebula/logs/nebula-graphd.INFO.impl`）为例说明如何使用 logrotate 工具。操作步骤如下：

1. 在 [Graph 服务配置文件](../1.configurations/3.graph-config.md)中，将`timestamp_in_logfile_name`设置为`false`，以便 logrotate 工具可以识别日志文件名。然后重启服务。

  ```bash
  timestamp_in_logfile_name = false
  ```

2. 安装 logrotate。
   
  - Debian/Ubuntu：

    ```bash
    sudo apt-get install logrotate
    ```

  - CentOS/RHEL：

    ```bash
    sudo yum install logrotate
    ```

3. 创建 logrotate 配置文件，添加日志轮转规则，然后保存配置文件。

  在`/etc/logrotate.d`目录下，创建一个新的 logrotate 配置文件`nebula-graphd.INFO`

    ```bash
    sudo vim /etc/logrotate.d/nebula-graphd.INFO
    ```

  添加以下内容：

    ```bash
    # 需配置日志文件的绝对路径
    # 并且文件名不能为软链接文件，如不能为`nebula-graph.INFO`
    /usr/local/nebula/logs/nebula-graphd.INFO.impl {
        daily
        rotate 2
        copytruncate
        nocompress
        missingok
        notifempty
        create 644 root root
        dateext
        dateformat .%Y-%m-%d-%s
        maxsize 1k
    }
    ``` 

  |参数|说明|
  |:--|:--|
  |`daily`| 每天轮转日志。可用的时间单位有：`hourly`、`daily`、`weekly`、`monthly`、`yearly`。|
  |`rotate 2`| 在删除前日志文件前，其被轮转的次数。即保留最近生成的 2 个日志文件。|
  |`copytruncate`| 将当前日志文件复制一份，然后清空当前日志文件。|
  |`nocompress`| 不压缩旧的日志文件。|
  |`missingok`| 如果日志文件丢失，不报告错误。|
  |`notifempty`| 如果日志文件为空，不进行轮转。|
  |`create 644 root root`| 创建新的日志文件，并设置适当的权限和所有者。|
  |`dateext`| 在日志文件名中添加日期后缀。<br/>默认是当前日期。默认是`-%Y%m%d`的后缀。可用`dateformat`选项扩展配置。|
  |`dateformat .%Y-%m-%d-%s`| 必须配合`dateext`使用，紧跟在下一行出现，定义文件切割后的文件名。<br/>在V3.9.0 之前，只支持`%Y`、`%m`、`%d`、`%s`参数。在 V3.9.0 及之后，支持 %H 参数。|
  |`maxsize 1k`| 当日志文件大小超过`1`千字节（`1024`字节）或者超过设定的周期（如`daily`）时，进行日志轮转。可用的大小单位有：`k`、`M`，默认单位为字节。|

  用户可以根据实际需求修改配置文件中的参数。更多关于参数的配置及解释，参见 [logrotate](https://man7.org/linux/man-pages/man8/logrotate.8.html)。

4. 测试 logrotate 配置。

  为了验证 logrotate 的配置是否正确，可以使用以下命令来进行测试：

  ```bash
  sudo logrotate --debug /etc/logrotate.d/nebula-graphd.INFO
  ```

5. 运行 logrotate。

  尽管`logrotate`通常由定时作业自动执行，但也可以手动执行以下命令，以立即进行日志轮转：

  ```bash
  sudo logrotate -fv /etc/logrotate.d/nebula-graphd.INFO
  ```

  `-fv`：`f`表示强制执行，`v`表示打印详细信息。

6. 查看日志轮转结果。

  日志轮转后，会在`/usr/local/nebula/logs`目录下看到新的日志文件，例如`nebula-graphd.INFO.impl.2024-01-04-1704338204`。原始日志内容会被清空，但文件会被保留，新日志继续写入。当日志文件数量超过`rotate`设置的值时，会删除最旧的日志文件。
  
  例如，`rotate 2`表示保留最近生成的 2 个日志文件，当日志文件数量超过 2 个时，会删除最旧的日志文件。

  ```bash
  [test@test logs]$ ll
  -rw-r--r-- 1 root root        0 Jan  4 11:18 nebula-graphd.INFO.impl 
  -rw-r--r-- 1 root root     6894 Jan  4 11:16 nebula-graphd.INFO.impl.2024-01-04-1704338204 # 当新的日志文件生成时，此文件被删除
  -rw-r--r-- 1 root root      222 Jan  4 11:18 nebula-graphd.INFO.impl.2024-01-04-1704338287
  [test@test logs]$ ll
  -rw-r--r-- 1 root root        0 Jan  4 11:18 nebula-graphd.INFO.impl
  -rw-r--r-- 1 root root      222 Jan  4 11:18 nebula-graphd.INFO.impl.2024-01-04-1704338287
  -rw-r--r-- 1 root root      222 Jan  4 11:18 nebula-graphd.INFO.impl.2024-01-04-1704338339 # 新生成的日志文件
  ```

如果用户需要对多个日志文件进行轮转，可以在`/etc/logrotate.d`目录下创建多个配置文件，每个配置文件对应一个日志文件。例如，用户需要对 Meta 服务的`INFO`级别日志文件和`WARNING`级别日志文件进行轮转，可以创建两个配置文件`nebula-metad.INFO`和`nebula-metad.WARNING`，并在其中分别添加日志轮转规则。