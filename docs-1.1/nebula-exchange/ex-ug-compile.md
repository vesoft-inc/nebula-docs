# Compile Exchange

To compile Exchange, follow these steps:

1. Clone source code from the `nebula-java` repository.

   ```bash
   git clone -b v1.0 https://github.com/vesoft-inc/nebula-java.git
   ```

2. Change to the `nebula-java` directory and package Nebula Java 1.x.

   ```bash
   cd nebula-java
   mvn clean install -Dgpg.skip -Dmaven.javadoc.skip=true -Dmaven.test.skip=true
   ```

3. Change to the `tools/exchange` directory and compile Exchange.

   ```bash
   cd tools/exchange
   mvn package -DskipTests
   ```

After compiling, you can see the structure of the Exchange directory as follows.

```text
.
├── README.md
├── dependency-reduced-pom.xml
├── pom.xml
├── scripts
│   ├── README.md
│   ├── mock_data.py
│   ├── pulsar_producer.py
│   ├── requirements.txt
│   └── verify_nebula.py
├── src
│   └── main
│       ├── resources
│       ├── scala
│       └── test
└── target
    ├── classes
    │   ├── application.conf
    │   ├── com
    │   ├── server_application.conf
    │   └── stream_application.conf
    ├── classes.timestamp
    ├── exchange-1.x.y-javadoc.jar
    ├── exchange-1.x.y-sources.jar
    ├── exchange-1.x.y.jar
    ├── generated-test-sources
    │   └── test-annotations
    ├── maven-archiver
    │   └── pom.properties
    ├── maven-status
    │   └── maven-compiler-plugin
    ├── original-exchange-1.x.y.jar
    ├── site
    │   └── scaladocs
    ├── test-classes
    │   └── com
    └── test-classes.timestamp
```

In the `target` directory, you can see the `exchange-1.x.y.jar` file.
> **NOTE**: The version of the JAR file depends on the releases of Nebula Java Client. You can find the latest versions on the [Releases page of the nebula-java repository](https://github.com/vesoft-inc/nebula-java/releases "Click to go to GitHub").

To import data, you can refer to the example configuration in the `target/classes/application.conf`, `target/classes/server_application.conf`, and `target/classes/stream_application.conf` files.
