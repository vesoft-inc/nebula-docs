# Get Exchange

This topic introduces how to get the JAR file of Nebula Exchange.

## Download the JAR file directly

The JAR file of Exchange Community Edition can be [downloaded](https://repo1.maven.org/maven2/com/vesoft/nebula-exchange/) directly.

To download Exchange Enterprise Edition, [get Nebula Graph Enterprise Edition Package](https://nebula-graph.com.cn/pricing/) first.

## Get the JAR file by compiling the source code

You can get the JAR file of Exchange Community Edition by compiling the source code. The following introduces how to compile the source code of Exchange.

!!! enterpriseonly

    You can get Exchange Enterprise Edition in Nebula Graph Enterprise Edition Package only.

### Prerequisites

- Install [Maven](https://maven.apache.org/download.cgi).

<!-- The Maven library where Pulsar is located was officially closed on May 31st, and the migration location has not been found yet. You can delete it once you find it-->
- Download [pulsar-spark-connector_2.11](https://oss-cdn.nebula-graph.com.cn/jar-packages/pulsar-spark-connector_2.11.zip), and unzip it to `io/streamnative/connectors` directory of the local Maven library.

## Steps

1. Clone the repository `nebula-exchange` in the `/` directory.

   ```bash
   git clone -b {{exchange.branch}} https://github.com/vesoft-inc/nebula-exchange.git
   ```

2. Switch to the directory `nebula-exchange`.

   ```bash
   cd nebula-exchange/nebula-exchange
   ```

3. Package Nebula Exchange.

   ```bash
   mvn clean package -Dmaven.test.skip=true -Dgpg.skip -Dmaven.javadoc.skip=true
   ```

After the compilation is successful, you can view a directory structure similar to the following in the current directory.

```text
.
├── README-CN.md
├── README.md
├── pom.xml
├── src
│   ├── main
│   └── test
└── target
    ├── classes
    ├── classes.timestamp
    ├── maven-archiver
    ├── nebula-exchange-2.x.y-javadoc.jar
    ├── nebula-exchange-2.x.y-sources.jar
    ├── nebula-exchange-2.x.y.jar
    ├── original-nebula-exchange-2.x.y.jar
    └── site
```

In the `target` directory, users can find the `exchange-2.x.y.jar` file.

!!! note

    The JAR file version changes with the release of the Nebula Java Client. Users can view the latest version on the [Releases page](https://github.com/vesoft-inc/nebula-java/releases).

When migrating data, you can refer to configuration file [`target/classes/application.conf`](https://github.com/vesoft-inc/nebula-exchange/blob/master/nebula-exchange/src/main/resources/application.conf).

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
