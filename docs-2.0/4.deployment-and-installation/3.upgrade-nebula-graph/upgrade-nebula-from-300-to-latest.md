# Upgrade NebulaGraph v3.x to v{{nebula.release}}

To upgrade NebulaGraph v3.x to v{{nebula.release}}, you only need to use the RPM/DEB package of v{{nebula.release}} for the upgrade, or [compile it](../2.compile-and-install-nebula-graph/1.install-nebula-graph-by-compiling-the-source-code.md) and then reinstall.

!!! caution

    Before upgrading a NebulaGraph cluster with full-text indexes deployed, you must manually delete the full-text indexes in Elasticsearch, and then run the `SIGN IN` command to log into ES and recreate the indexes after the upgrade is complete. To manually delete the full-text indexes in Elasticsearch, you can use the curl command `curl -XDELETE -u <es_username>:<es_password> '<es_access_ip>:<port>/<fullindex_name>'`, for example, `curl -XDELETE -u elastic:elastic 'http://192.168.8.223:9200/nebula_index_2534'`. If no username and password are set for Elasticsearch, you can omit the `-u <es_username>:<es_password>` part.

## Upgrade steps with RPM/DEB packages

1. Download the [RPM/DEB package](https://www.nebula-graph.io/download).

2. Stop all NebulaGraph services. For details, see [Manage NebulaGraph Service](../../2.quick-start/5.start-stop-service.md). It is recommended to back up the configuration file before updating.

  !!! caution

        If you want to use the vertex without tags, add `--graph_use_vertex_key=true` to the configuration files (`nebula-graphd.conf`) of all Graph services in the cluster, add `--use_vertex_key=true` to the configuration files (`nebula-storaged.conf`) of all Storage services in the cluster.

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

4. Start the required services on each server. For details, see [Manage NebulaGraph Service](../../2.quick-start/5.start-stop-service.md).

## Upgrade steps by compiling the new source code

1. Back up the old version of the configuration file. The configuration file is saved in the `etc` directory of the NebulaGraph installation path.

2. Update the repository and compile the source code. For details, see [Install NebulaGraph by compiling the source code](../2.compile-and-install-nebula-graph/1.install-nebula-graph-by-compiling-the-source-code.md).

  !!! note

        When compiling, set the installation path, which is the same as the installation path of the old version.

## Upgrade steps by deploying Docker Compose

1. Modify the file `docker-compose.yaml` in the directory `nebula-docker-compose`, and modify all versions after `image` to `{{nebula.branch}}`.

2. Execute the command `docker-compose pull` in the directory `nebula-docker-compose` to update the images of all services.

3. Execute the command `docker-compose down` to stop the NebulaGraph service.

4. Execute the command `docker-compose up -d` to start the NebulaGraph service.
