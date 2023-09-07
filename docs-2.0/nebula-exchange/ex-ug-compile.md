# Get Exchange

This topic introduces how to get the JAR file of NebulaGraph Exchange.

## Download the JAR file directly

The JAR file of Exchange Community Edition can be [downloaded](https://github.com/vesoft-inc/nebula-exchange/releases) directly.

To download Exchange Enterprise Edition, [contact us](https://www.nebula-graph.io/contact).

## Get the JAR file by compiling the source code

You can get the JAR file of Exchange Community Edition by compiling the source code. The following introduces how to compile the source code of Exchange.

!!! enterpriseonly

    You can get Exchange Enterprise Edition in NebulaGraph Enterprise Edition Package only.

### Prerequisites

- Install [Maven](https://maven.apache.org/download.cgi).

- Install the correct version of Apache Spark. Exporting data from different sources requires different Spark versions. For more information, see [Software dependencies](about-exchange/ex-ug-limitations.md).

## Steps

1. Clone the repository `nebula-exchange` in the `/` directory.

  ```bash
  git clone -b {{exchange.branch}} https://github.com/vesoft-inc/nebula-exchange.git
  ```

2. Switch to the directory `nebula-exchange`.

  ```bash
  cd nebula-exchange
  ```

3. Package NebulaGraph Exchange. Run the following command based on the Spark version:

  - For Spark 2.2：

    ```bash
    mvn clean package -Dmaven.test.skip=true -Dgpg.skip -Dmaven.javadoc.skip=true \
    -pl nebula-exchange_spark_2.2 -am -Pscala-2.11 -Pspark-2.2
    ```

  - For Spark 2.4：

    ```bash
    mvn clean package -Dmaven.test.skip=true -Dgpg.skip -Dmaven.javadoc.skip=true \
    -pl nebula-exchange_spark_2.4 -am -Pscala-2.11 -Pspark-2.4
    ```

  - For Spark 3.0：

    ```bash
    mvn clean package -Dmaven.test.skip=true -Dgpg.skip -Dmaven.javadoc.skip=true \
    -pl nebula-exchange_spark_3.0 -am -Pscala-2.12 -Pspark-3.0
    ```

After the compilation is successful, you can find the `nebula-exchange_spark_x.x-{{exchange.branch}}.jar` file in the `nebula-exchange_spark_x.x/target/` directory. `x.x` indicates the Spark version, for example, `2.4`.

!!! note

    The JAR file version changes with the release of the NebulaGraph Java Client. Users can view the latest version on the [Releases page](https://github.com/vesoft-inc/nebula-java/releases).

When migrating data, you can refer to configuration file [`target/classes/application.conf`](https://github.com/vesoft-inc/nebula-exchange/blob/master/nebula-exchange_spark_2.4/src/main/resources/application.conf).

### Failed to download the dependency package

If downloading dependencies fails when compiling:

- Check the network settings and ensure that the network is normal.

- Modify the `mirror` part of Maven installation directory `libexec/conf/settings.xml`:

  ```text
  <mirror>
   <id>alimaven</id>
   <mirrorOf>central</mirrorOf>
   <name>aliyun maven</name>
   <url>http://maven.aliyun.com/nexus/content/repositories/central/</url>
  </mirror>
  ```
