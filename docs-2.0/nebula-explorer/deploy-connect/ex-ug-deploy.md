# Deploy Explorer

This topic describes how to deploy Explorer locally by RPM and tar packages.

## Nebula Graph version

!!! Note

    Explorer is released separately, not synchronized with Nebula Graph. And the version naming of Explorer is different from that of Nebula Graph. The version correspondence between Nebula Graph and Explorer is as follows.

| Nebula Graph version | Explorer version |
| --- | --- |
| 2.5.x | 2.0.0 |
| 2.6.x | 2.1.0 |

## RPM-based Explorer

### Prerequisites

Before you deploy Explorer, you must do a check of these:

- The Nebula Graph services are deployed and started. For more information, see [Nebula Graph Database Manual](../../2.quick-start/1.quick-start-workflow.md).

- Before the installation starts, the following ports are not occupied.

   | Port | Description |
   | ---- | ---- |
   | 7002 | Web service provided by Explorer |

  !!! caution

        By default, Explorer uses the port `7002`. You can modify the `httpport` in the `conf/app.conf` file in the installation directory and restart the service.

- The Linux distribution is CentOS.
- GO of version above 1.13 is installed.

### Install

1. Select and download the RPM package according to your needs. It is recommended to select the latest version. Common links are as follows:

  !!! enterpriseonly

        Explorer is only available in the enterprise version. Click [Pricing](https://nebula-graph.io/pricing/) to see more.

2. Use `sudo rpm -i <rpm>` to install RPM package.

   For example, use the following command to install Explorer. The default installation path is `/usr/local/nebula-explorer`.

   ```bash
   $ sudo rpm -i nebula-explorer-<version>.x86_64.rpm
   ```

   You can also install it to the specified path using the following command:
   ```bash
   $ sudo rpm -i nebula-explorer-xxx.rpm --prefix=<path> 
   ```

3. Copy the license to the installation path.

   ```bash
   $ cp -r <license> <explorer_path>
   ```

   For example:
   ```bash
   $ cp -r nebula.license /usr/local/nebula-explorer
   ```

  !!! enterpriseonly

        License is only available in the Enterprise Edition. For more information, send email to inquiry@vesoft.com.

4. After adding the license, you need to stop and restart the service using the following command.

   ```bash
   $ systemctl stop nebula-explorer #Stop the service
   $ systemctl start nebula-explorer #Start the service
   ```

### Start and stop

You can use SystemCTL to start and stop the service.

   ```bash
   $ systemctl status nebula-explorer #Check the status
   $ systemctl stop nebula-explorer #Stop the service
   $ systemctl start nebula-explorer #Start the service
   ```

You can also start or stop the service manually using the following command in the installation directory.

   ```bash
   $ cd ./scripts/rpm
   $ bash ./start.sh #Start the service
   $ bash ./stop.sh #Stop the service
   ```

### Uninstall

You can uninstall Explorer using the following command:

```bash
$ sudo rpm -e nebula-graph-explorer-<version>.x86_64
```

## tar-based Explorer

### Prerequisites

Before deploying Explorer, you must check the following information:

- The Nebula Graph services are deployed and started. For more information, see [Nebula Graph Database Manual](../../2.quick-start/1.quick-start-workflow.md).

- Before the installation starts, the following ports are not occupied.

   | Port | Description |
   | ---- | ---- |
   | 7002 | Web service provided by Explorer |

  !!! caution

        By default, Explorer uses the port `7002`. You can modify the `httpport` in the `conf/app.conf` file in the installation directory and restart the service.

- The Linux distribution is CentOS.
- GO of version above 1.13 is installed.

### Install and deploy

1. Select and download the tar package according to your needs. It is recommended to select the latest version. Common links are as follows:

  !!! enterpriseonly

        Explorer is only available in the Enterprise Edition. Click [Pricing](https://nebula-graph.io/pricing/) to see more.

2. Use `tar -xvf` to decompress the tar package.

   ```bash
   $ tar -xvf nebula-graph-explorer-<version>.tar.gz
   ```

3. Copy the license to the `nebula-explorer` directory.

   ```bash
   $ cp -r <license> <explorer_path>
   ```

   For example:
   ```bash
   $ cp -r nebula.license /usr/local/nebula-explorer
   ```

  !!! enterpriseonly

        License is only available in the Enterprise Edition. For more information, send email to inquiry@vesoft.com.

4. Enter the `nebula-explorer` folder to start Explorer.

  ```bash
  $ cd nebula-explorer
  $ ./nebula-httpd &
  ```

### Stop Service

You can use `kill pid` to stop the service.

```bash
$ kill $(lsof -t -i :7002)
```

## Next to do

When Explorer is started, use `http://<ip_address>:7002` to get access to Explorer.

Seeing the following login interface, Explorer is successfully connected to Nebula Graph.

![Nebula Explorer](../figs/ex-ug-002-1.png)

After entering the Explorer login interface, you need to connect to Nebula Graph. For more information, refer to [Connecting to the Nebula Graph](../deploy-connect/ex-ug-connect.md).
