# Options for import

After editing the configuration file, run the following commands to import specified source data into the NebulaGraph database.

## Import data

```bash
<spark_install_path>/bin/spark-submit --master "spark://HOST:PORT" --class com.vesoft.nebula.exchange.Exchange <nebula-exchange-2.x.y.jar_path> -c <application.conf_path> 
```

The following table lists command parameters.

| Parameter | Required | Default value | Description |
| :--- | :--- | :--- | :--- |
| `--class`  | Yes | - | Specify the main class of the driver.|
| `--master`  | Yes | - | Specify the URL of the master process in a Spark cluster. For more information, see [master-urls](https://spark.apache.org/docs/latest/submitting-applications.html#master-urls). Optional values are:</br>`local`: Local Mode. Run Spark applications on a single thread. Suitable for importing small data sets in a test environment.</br>`yarn`: Run Spark applications on a YARN cluster. Suitable for importing large data sets in a production environment.</br>`spark://HOST:PORT`: Connect to the specified Spark standalone cluster.</br>`mesos://HOST:PORT`: Connect to the specified Mesos cluster.</br>`k8s://HOST:PORT`: Connect to the specified Kubernetes cluster.</br>|
| `-c`/`--config`  | Yes | - | Specify the path of the configuration file. |
| `-h`/`--hive`  | No | `false` | Specify whether importing Hive data is supported. |
| `-D`/`--dry`  | No | `false` | Specify whether to check the format of the configuration file. This parameter is used to check the format of the configuration file only, it does not check the validity of `tags` and `edges` configurations and does not import data. Don't add this parameter if you need to import data. |
| `-r`/`--reload` | No  |  -  |  Specify the path of the reload file that needs to be reloaded. |

For more Spark parameter configurations, see [Spark Configuration](https://spark.apache.org/docs/latest/configuration.html#runtime-environment).

!!! note

    - The version number of a JAR file is subject to the name of the JAR file that is actually compiled.

    - If users use the [yarn mode](https://spark-reference-doc-cn.readthedocs.io/zh_CN/latest/deploy-guide/running-on-yarn.html) to submit a job, see the following command, **especially the two '--conf' commands in the example**.

    ```bash
    $SPARK_HOME/bin/spark-submit     --master yarn \
    --class com.vesoft.nebula.exchange.Exchange \
    --files application.conf \
    --conf spark.driver.extraClassPath=./ \
    --conf spark.executor.extraClassPath=./ \
    nebula-exchange-{{exchange.release}}.jar \
    -c application.conf
    ```

## Import the reload file

If some data fails to be imported during the import, the failed data will be stored in the reload file. Use the parameter `-r` to import the data in reload file.

```bash
<spark_install_path>/bin/spark-submit --master "spark://HOST:PORT" --class com.vesoft.nebula.exchange.Exchange <nebula-exchange-2.x.y.jar_path> -c <application.conf_path> -r "<reload_file_path>" 
```

If the import still fails, go to [Official Forum](https://github.com/vesoft-inc/nebula/discussions) for consultation.