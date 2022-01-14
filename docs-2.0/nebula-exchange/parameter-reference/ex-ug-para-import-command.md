# Options for import

After editing the configuration file, run the following commands to import specified source data into the Nebula Graph database.

- First import

  ```bash
  <spark_install_path>/bin/spark-submit --master "local" --class com.vesoft.nebula.exchange.Exchange <nebula-exchange-2.x.y.jar_path> -c <application.conf_path> 
  ```

- Import the reload file

  If some data fails to be imported during the first import, the failed data will be stored in the reload file. Use the parameter `-r` to import the reload file.

  ```bash
  <spark_install_path>/bin/spark-submit --master "local" --class com.vesoft.nebula.exchange.Exchange <nebula-exchange-2.x.y.jar_path> -c <application.conf_path> -r "<reload_file_path>" 
  ```

!!! note

    The version number of a JAR file is subject to the name of the JAR file that is actually compiled.

!!! note

    If users use the [yarn-cluster mode](https://spark-reference-doc-cn.readthedocs.io/zh_CN/latest/deploy-guide/running-on-yarn.html) to submit a job, see the following command:

    ```bash
    $SPARK_HOME/bin/spark-submit     --master yarn-cluster \
    --class com.vesoft.nebula.exchange.Exchange \
    --files application.conf \
    --conf spark.driver.extraClassPath=./ \
    --conf spark.executor.extraClassPath=./ \
    nebula-exchange-{{exchange.release}}.jar \
    -c application.conf
    ```

The following table lists command parameters.

| Parameter | Required | Default value | Description |
| :--- | :--- | :--- | :--- |
| `--class`  | Yes | - | Specify the main class of the driver.|
| `--master`  | Yes | - | Specify the URL of the master process in a Spark cluster. For more information, see [master-urls](https://spark.apache.org/docs/latest/submitting-applications.html#master-urls "click to open Apache Spark documents"). |
| `-c`  / `--config`  | Yes | - | Specify the path of the configuration file. |
| `-h`  / `--hive`  | No | `false` | Indicate support for importing Hive data. |
| `-D`  / `--dry`  | No | `false` | Check whether the format of the configuration file meets the requirements, but it does not check whether the configuration items of `tags` and `edges` are correct. This parameter cannot be added when users import data. |
| `-r` / `--reload` | No  |  -  |  Specify the path of the reload file that needs to be reloaded. |

For more Spark parameter configurations, see [Spark Configuration](https://spark.apache.org/docs/latest/configuration.html#runtime-environment).
