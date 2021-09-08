# Upgrade Nebula Graph v2.0.x to v{{nebula.release}}

To upgrade Nebula Graph v2.0.x to v{{nebula.release}}, you only need to use the RPM/DEB package of v{{nebula.release}} for the upgrade, or [compile it](../2.compile-and-install-nebula-graph/1.install-nebula-graph-by-compiling-the-source-code.md) and then reinstall.

!!! note

    Nebula Graph v2.0.x refers to v2.0.0-GA and v2.0.1 releases. If your Nebula Graph version is too low (v2.0.0-RC, v2.0.0-beta, v1.x), see [Upgrade Nebula Graph to v{{nebula.release}}](upgrade-nebula-graph-to-250.md).

## Upgrade steps with RPM/DEB packages

1. Download the [RPM/DEB package](https://github.com/vesoft-inc/nebula-graph/releases/tag/v{{nebula.release}}).

2. Stop all Nebula Graph services. For details, see [Manage Nebula Graph Service](../../2.quick-start/5.start-stop-service.md). It is recommended to back up the configuration file before updating.

3. Execute the following command to upgrade:

   - RPM package

      ```bash
      $ sudo rpm -Uvh <package_name>
      ```

      If you specify the path during installation, you also need to specify the path during upgrade.

      ```bash
      $ sudo rpm -Uvh --prefix=<installation_path> <package_name>
      ```

   - DEB package

      ```bash
      $ sudo dpkg -i <package_name>
      ```

4. Start the required services on each server. For details, see [Manage Nebula Graph Service](../../2.quick-start/5.start-stop-service.md#_1).

## Upgrade steps by compiling the new source code

1. Back up the old version of the configuration file. The configuration file is saved in the `etc` directory of the Nebula Graph installation path.

2. Update the repository and compile the source code. For details, see [Install Nebula Graph by compiling the source code](../2.compile-and-install-nebula-graph/1.install-nebula-graph-by-compiling-the-source-code.md).

  !!! note

        When compiling, set the installation path, which is the same as the installation path of the old version.

## Upgrade steps by deploying Docker Compose

See [How to update the Docker image of Nebula Graph services](../2.compile-and-install-nebula-graph/3.deploy-nebula-graph-with-docker-compose.md#nebula_graphdocker).
