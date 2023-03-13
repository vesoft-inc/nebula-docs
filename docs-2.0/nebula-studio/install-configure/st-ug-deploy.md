# Deploy Studio

This article introduces how to deploy Docker-based Studio v2.x.  

## Prerequisites

Before you deploy Docker-based Studio v2.x, you must do a check of these:

- The NebulaGraph v2.x services are deployed and started. For more information, see [NebulaGraph Database Manual](https://docs.nebula-graph.io/2.0/2.quick-start/1.quick-start-workflow/).
  > **NOTE**: Different methods are available for you to deploy NebulaGraph. If this is your first time to use NebulaGraph, we recommend that you use Docker Compose to deploy NebulaGraph. For more information, see [Deploy NebulaGraph with Docker Compose](https://docs.nebula-graph.io/2.0/2.quick-start/2.deploy-nebula-graph-with-docker-compose/).

- On the machine where Studio v2.x will run, Docker Compose is installed and started. For more information, see [Docker Compose Documentation](https://docs.docker.com/compose/install/ "Click to go to Docker Documentation").

## Procedure

To deploy and start Docker-based Studio v2.x, run these commands one by one:

1. Download the configuration files for the deployment.

    ```bash
    git clone https://github.com/vesoft-inc/nebula-web-docker.git
    ```

2. Change to the `nebula-web-docker/v2` directory.

    ```bash
    cd nebula-web-docker/v2
    ```

3. Pull the Docker image of Studio v2.x.

    ```bash
    docker-compose pull
    ```

4. Build and start Docker-based Studio v2.x. In this command, `-d` is to run the containers in the background.

   ```bash
   docker-compose up -d
   ```

    If these lines return, Docker-based Studio v2.x is deployed and started.

    ```bash
    Creating docker_importer_1 ... done
    Creating docker_client_1   ... done
    Creating docker_web_1      ... done
    Creating docker_nginx_1    ... done
    ```

5. When Docker-based Studio v2.x is started, use `http://ip address:7001` to get access to Studio v2.x.
   > **NOTE**: Run `ifconfig` or `ipconfig` to get the IP address of the machine where Docker-based Studio is running. On the machine running Docker-based Studio, you can use `http://localhost:7001` to get access to Studio.

    If you can see the **Config Server** page on the browser, Docker-based Studio is started successfully.

    ![The Config Server page shows that Docker-based Studio is started successfully](https://docs-cdn.nebula-graph.com.cn/nebula-studio-docs/st-ug-052.png "Docker-based Studio is started")

## Next to do

On the **Config Server** page, connect Docker-based Studio to NebulaGraph. For more information, see [Connect to NebulaGraph](st-ug-connect.md).
