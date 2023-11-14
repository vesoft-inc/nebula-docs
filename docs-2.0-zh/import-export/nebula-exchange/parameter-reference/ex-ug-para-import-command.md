# 导入命令参数

完成配置文件修改后，可以运行以下命令将指定来源的数据导入{{nebula.name}}数据库。

## 导入数据

```bash
<spark_install_path>/bin/spark-submit --master "spark://HOST:PORT" --class com.vesoft.nebula.exchange.Exchange <nebula-exchange-2.x.y.jar_path> -c <application.conf_path> 
```

参数说明如下。

| 参数 | 是否必需 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `--class`  | 是 | 无 | 指定驱动的主类。 |
| `--master`  | 是 | 无 | 指定 Spark 集群的 master URL。详情请参见 [master-urls](https://spark.apache.org/docs/latest/submitting-applications.html#master-urls)。可选值为：</br>`local`：本地模式，使用单个线程运行 Spark 应用程序。适合在测试环境进行小数据量导入。</br>`yarn`：在 YARN 集群上运行 Spark 应用程序。适合在线上环境进行大数据量导入。</br>`spark://HOST:PORT`：连接到指定的 Spark standalone 集群。</br>`mesos://HOST:PORT`：连接到指定的 Mesos 集群。</br>`k8s://HOST:PORT`：连接到指定的 Kubernetes 集群。</br> |
| `-c`/`--config`  | 是 | 无 | 指定配置文件的路径。 |
| `-h`/`--hive`  | 否 | `false` | 添加这个参数表示支持从 Hive 中导入数据。 |
| `-D`/`--dry`  | 否 | `false` | 指定是否检查配置文件的格式。该参数仅用于检查配置文件的格式，不检查`tags`和`edges`配置项的有效性，也不会导入数据。需要导入数据时不要添加这个参数。 |
|`-r`/`--reload` | 否  |  无  |   指定需要重新加载的 reload 文件路径。 |

更多 Spark 的参数配置说明请参见 [Spark Configuration](https://spark.apache.org/docs/latest/configuration.html#runtime-environment)。

!!! note

    - JAR 文件版本号以实际编译得到的 JAR 文件名称为准。

    - 如果使用 [yarn 模式](https://spark-reference-doc-cn.readthedocs.io/zh_CN/latest/deploy-guide/running-on-yarn.html)提交任务，请参考如下示例，**尤其是示例中的两个**`--conf`。

    ```bash
    $SPARK_HOME/bin/spark-submit     --master yarn \
    --class com.vesoft.nebula.exchange.Exchange \
    --files application.conf \
    --conf spark.driver.extraClassPath=./ \
    --conf spark.executor.extraClassPath=./ \
    nebula-exchange-{{exchange.release}}.jar \
    -c application.conf
    ```

## 导入 reload 文件
  
如果导入数据时有一些数据导入失败，会将导入失败的数据存入 reload 文件，可以用参数`-r`尝试导入 reload 文件中的数据。

```bash
<spark_install_path>/bin/spark-submit --master "spark://HOST:PORT" --class com.vesoft.nebula.exchange.Exchange <nebula-exchange-2.x.y.jar_path> -c <application.conf_path> -r "<reload_file_path>" 
```

如果仍然导入失败，请到[论坛](https://discuss.nebula-graph.com.cn/)寻求帮助。