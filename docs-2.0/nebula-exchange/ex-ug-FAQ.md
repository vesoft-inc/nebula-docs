# Exchange FAQ

## Compilation

### Some packages not in central repository failed to download, error: `Could not resolve dependencies for project xxx`

Please check the `mirror` part of Maven installation directory `libexec/conf/settings.xml`:

```text
<mirror>
    <id>alimaven</id>
    <mirrorOf>central</mirrorOf>
    <name>aliyun maven</name>
    <url>http://maven.aliyun.com/nexus/content/repositories/central/</url>
</mirror>
```

Check whether the value of `mirrorOf` is configured to `*`. If it is, change it to `central` or `*,!SparkPackagesRepo,!bintray-streamnative-maven`.

**Reason**: There are two dependency packages in Exchange's `pom.xml` that are not in Maven's central repository. `pom.xml` configures the repository address for these two dependencies. If the `mirrorOf` value for the mirror address configured in Maven is `*`, all dependencies will be downloaded from the Central repository, causing the download to fail.

## Execution

### How to submit in Yarn-Cluster mode?

To submit a task in Yarn-Cluster mode, run the following command:

```bash
$SPARK_HOME/bin/spark-submit --class com.vesoft.nebula.exchange.Exchange \
--master yarn-cluster \
--files application.conf \
--conf spark.driver.extraClassPath=./ \
--conf spark.executor.extraClassPath=./ \
nebula-exchange-2.0.0.jar \
-c application.conf
```

### Error: `method name xxx not found`

Generally, the port configuration is incorrect. Check the port configuration of the Meta service, Graph service, and Storage service.

### Error: NoSuchMethod, MethodNotFound (`Exception in thread "main" java.lang.NoSuchMethodError`, etc)

Most errors are caused by JAR package conflicts or version conflicts. Check whether the version of the error reporting service is the same as that used in Exchange, especially Spark, Scala, and Hive.

### When Exchange imports Hive data, error: `Exception in thread "main" org.apache.spark.sql.AnalysisException: Table or view not found`

Check whether the `-h` parameter is omitted in the command for submitting the Exchange task and whether the table and database are correct, and run the user-configured exec statement in spark-SQL to verify the correctness of the exec statement.

### Run error: `com.facebook.thrift.protocol.TProtocolException: Expected protocol id xxx`

Check that the Nebula Graph service port is configured correctly.

- For source, RPM, or DEB installations, configure the port number corresponding to `--port` in the configuration file for each service.

- For docker installation, configure the docker mapped port number as follows:

    Execute `docker-compose ps` in the `nebula-docker-compose` directory, for example:

    ```bash
    $ docker-compose ps
                  Name                             Command                  State                                                         Ports
    ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    nebula-docker-compose_graphd_1      /usr/local/nebula/bin/nebu ...   Up (healthy)   0.0.0.0:33205->19669/tcp, 0.0.0.0:33204->19670/tcp, 0.0.0.0:9669->9669/tcp
    nebula-docker-compose_metad0_1      ./bin/nebula-metad --flagf ...   Up (healthy)   0.0.0.0:33165->19559/tcp, 0.0.0.0:33162->19560/tcp, 0.0.0.0:33167->9559/tcp, 9560/tcp
    nebula-docker-compose_metad1_1      ./bin/nebula-metad --flagf ...   Up (healthy)   0.0.0.0:33166->19559/tcp, 0.0.0.0:33163->19560/tcp, 0.0.0.0:33168->9559/tcp, 9560/tcp
    nebula-docker-compose_metad2_1      ./bin/nebula-metad --flagf ...   Up (healthy)   0.0.0.0:33161->19559/tcp, 0.0.0.0:33160->19560/tcp, 0.0.0.0:33164->9559/tcp, 9560/tcp
    nebula-docker-compose_storaged0_1   ./bin/nebula-storaged --fl ...   Up (healthy)   0.0.0.0:33180->19779/tcp, 0.0.0.0:33178->19780/tcp, 9777/tcp, 9778/tcp, 0.0.0.0:33183->9779/tcp, 9780/tcp
    nebula-docker-compose_storaged1_1   ./bin/nebula-storaged --fl ...   Up (healthy)   0.0.0.0:33175->19779/tcp, 0.0.0.0:33172->19780/tcp, 9777/tcp, 9778/tcp, 0.0.0.0:33177->9779/tcp, 9780/tcp
    nebula-docker-compose_storaged2_1   ./bin/nebula-storaged --fl ...   Up (healthy)   0.0.0.0:33184->19779/tcp, 0.0.0.0:33181->19780/tcp, 9777/tcp, 9778/tcp, 0.0.0.0:33185->9779/tcp, 9780/tcp
    ```

    Check the `Ports` column to find the docker mapped port number, for example:

    - The port number available for Graph service is 9669.

    - The port number for Meta service are 33167, 33168, 33164.

    - The port number for Storage service are 33183, 33177, 33185.

### Error: `Exception in thread "main" com.facebook.thrift.protocol.TProtocolException: The field 'code' has been assigned the invalid value -4`

Check whether the version of Exchange is the same as that of Nebula Graph. For more information, see [Limitations](../nebula-exchange/about-exchange/ex-ug-limitations.md).

### How to correct the messy code when importing Hive data into Nebula Graph?

It may happen if the property value of the data in Hive contains Chinese characters. The solution is to add the following options before the JAR package path in the import command:

```bash
--conf spark.driver.extraJavaOptions=-Dfile.encoding=utf-8
--conf spark.executor.extraJavaOptions=-Dfile.encoding=utf-8
```

Namely:

```bash
<spark_install_path>/bin/spark-submit --master "local" \
--conf spark.driver.extraJavaOptions=-Dfile.encoding=utf-8 \
--conf spark.executor.extraJavaOptions=-Dfile.encoding=utf-8 \
--class com.vesoft.nebula.exchange.Exchange \
<nebula-exchange-2.x.y.jar_path> -c <application.conf_path>
```

In YARN, use the following command:

```bash
<spark_install_path>/bin/spark-submit \
--class com.vesoft.nebula.exchange.Exchange \
--master yarn-cluster \
--files <application.conf_path> \
--conf spark.driver.extraClassPath=./ \
--conf spark.executor.extraClassPath=./ \
--conf spark.driver.extraJavaOptions=-Dfile.encoding=utf-8 \
--conf spark.executor.extraJavaOptions=-Dfile.encoding=utf-8 \
<nebula-exchange-2.x.y.jar_path> \
-c application.conf
```

## Configuration

### Which configuration fields will affect import performance?

- batch: The number of data contained in each nGQL statement sent to the Nebula Graph service.

- partition: The number of Spark data partitions, indicating the number of concurrent data imports.

- nebula.rate: Get a token from the token bucket before sending a request to Nebula Graph.

    - limit: Represents the size of the token bucket.

    - timeout: Represents the timeout period for obtaining the token.

The values of these four parameters can be adjusted appropriately according to the machine performance. If the leader of the Storage service changes during the import process, you can adjust the values of these four parameters to reduce the import speed.

## Others

### Which versions of Nebula Graph are supported by Exchange?

See [Limitations](about-exchange/ex-ug-limitations.md).

### What is the relationship between Exchange and Spark Writer?

Exchange is the Spark application developed based on Spark Writer. Both are suitable for bulk migration of cluster data to Nebula Graph in a distributed environment, but later maintenance work will be focused on Exchange. Compared with Spark Writer, Exchange has the following improvements:

- It supports more abundant data sources, such as MySQL, Neo4j, Hive, HBase, Kafka, Pulsar, etc.

- It fixed some problems of Spark Writer. For example, when Spark reads data from HDFS, the default source data is String, which may be different from the Nebula Graph's Schema. So Exchange adds automatic data type matching and type conversion. When the data type in the Nebula Graph's Schema is non-String (e.g. double), Exchange converts the source data of String type to the corresponding type.
