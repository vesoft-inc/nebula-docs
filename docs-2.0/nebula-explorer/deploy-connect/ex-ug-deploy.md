# Deploy Explorer

This topic describes how to deploy Explorer locally by RPM and tar packages.

## Nebula Graph version

!!! Note

    Explorer is released separately, not synchronized with Nebula Graph. And the version naming of Explorer is different from that of Nebula Graph. The version correspondence between Nebula Graph and Explorer is as follows.

| Nebula Graph version | Explorer version |
| --- | --- |
| 3.1.0 ~ 3.2.0| 3.1.0|
| 3.0.0 ~ 3.1.0 | 3.0.0  |
| 2.5.x ~ 3.0.0| 2.2.0|
| 2.6.x | 2.1.0 |
| 2.5.x | 2.0.0 |

## Prerequisites

Before deploying Explorer, you must check the following information:

- The Nebula Graph services are deployed and started. For more information, see [Nebula Graph Database Manual](../../2.quick-start/1.quick-start-workflow.md).

- Before the installation starts, the following ports are not occupied.

   | Port | Description |
   | ---- | ---- |
   | 7002 | Web service provided by Explorer |

  !!! caution

        By default, Explorer uses the port `7002`. You can modify the `httpport` in the `conf/app.conf` file in the installation directory and restart the service.

- The Linux distribution is CentOS.
- The [license](3.explorer-license.md) is ready.

  !!! enterpriseonly

        License is only available in the Enterprise Edition. To obtain the license, apply for [Nebula Explorer Free Trial](https://nebula-graph.io/visualization-tools-free-trial).

## RPM-based deployment

### Installation

1. Select and download the RPM package according to your needs. It is recommended to select the latest version. 

  !!! enterpriseonly

        You can [apply online](https://nebula-graph.io/visualization-tools-free-trial) for Explorer free trial. To purchase, contact our sales team via email (inquiry@vesoft.com). For features of Explorer, see [Pricing](https://nebula-graph.io/pricing/).

2. Use `sudo rpm -i <rpm>` to install RPM package.

   For example, use the following command to install Explorer. The default installation path is `/usr/local/nebula-explorer`.

   ```bash
   sudo rpm -i nebula-explorer-<version>.x86_64.rpm
   ```

   You can also install it to the specified path using the following command:
   ```bash
   sudo rpm -i nebula-explorer-<version>.x86_64.rpm --prefix=<path>
   ```

3. Copy the license to the installation path.

   ```bash
   cp -r <license> <explorer_path>
   ```

   For example:
   ```bash
   cp -r nebula.license /usr/local/nebula-explorer
   ```

4. Start the service using the following command.

   ```bash
   systemctl start nebula-explorer
   ```

### Start and stop

You can use SystemCTL to start and stop the service.

```bash
systemctl status nebula-explorer #Check the status
systemctl stop nebula-explorer #Stop the service
systemctl start nebula-explorer #Start the service
```

You can also start or stop the service manually using the following command in the installation directory.

  ```bash
  cd ./scripts/rpm
  bash ./start.sh #Start the service
  bash ./stop.sh #Stop the service
  ```

### Uninstallation

You can uninstall Explorer using the following command:

```bash
sudo rpm -e nebula-graph-explorer-<version>.x86_64
```

## DEB-based deployment

### Installation

1. Select and download the RPM package according to your needs. It is recommended to select the latest version. Common links are as follows:

  !!! enterpriseonly

        You can [apply online](https://nebula-graph.io/visualization-tools-free-trial) for Explorer free trial. To purchase, contact our sales team via email (inquiry@vesoft.com). For features of Explorer, see [Pricing](https://nebula-graph.io/pricing/).


2. Run `sudo dpkg -i <package_name>` to unpack the DEB package.

  For example, run the following command to install Explorer (The default installation path is `/usr/local/nebula-explorer`).

  ```bash
  sudo dpkg -i nebula-explorer-{{explorer.release}}.x86_64.deb
  ```

  !!! note

        You cannot customize the installation path of Explorer when installing a DEB package.

3. Copy the license to the Explorer installation path.

   ```bash
   Sudo cp -r <license> <explorer_path>
   ```

   For example:

   ```bash
   Sudo cp -r nebula.license /usr/local/nebula-explorer
   ```

4. Run the following command to start the service.

  ```bash
  sudo systemctl start nebula-explorer.service
  ```

  You can also start the service manually using the following command in the `nebula-explorer/lib` directory.

   ```bash
   sudo bash ./start.sh
   ```

### View the status


```bash
sudo systemctl status nebula-explorer.service
```

### Stop the service

```bash
sudo systemctl stop nebula-explorer.service
```

### Uninstallation

Run the following command to uninstall Explorer:

```bash
sudo dpkg -r nebula-explorer
```

## TAR-based deployment

### Installation

1. Select and download the TAR package according to your needs. It is recommended to select the latest version. Common links are as follows:

  !!! enterpriseonly

        Explorer is only available in the Enterprise Edition. Click [Pricing](https://nebula-graph.io/pricing/) to see more.

2. Use `tar -xvf` to decompress the TAR package.

   ```bash
   tar -xvf nebula-explorer-<version>.tar.gz
   ```

3. Copy the license to the `nebula-explorer` directory.

   ```bash
   cp -r <license> <explorer_path>
   ```

   For example:
   ```bash
   cp -r nebula.license /usr/local/nebula-explorer
   ```

4. Enter the `nebula-explorer` folder to start Explorer.

  ```bash
  cd nebula-explorer
  nohup ./nebula-explorer-server &
  ```

### Stop Service

You can use `kill pid` to stop the service.

```bash
kill $(lsof -t -i :7002)
```

## Next to do

When Explorer is started, use `http://<ip_address>:7002` to get access to Explorer.

The following login page shows that Explorer is successfully connected to Nebula Graph.

![Nebula Explorer Login page](https://docs-cdn.nebula-graph.com.cn/figures/explorer_deploy.png)

!!! note

    When logging into Nebula Explorer for the first time, the content of *END USER LICENSE AGREEMENT* is displayed on the login page. Please read it and then click **I agree**.

After entering the Explorer login interface, you need to connect to Nebula Graph. For more information, refer to [Connecting to the Nebula Graph](../deploy-connect/ex-ug-connect.md).
