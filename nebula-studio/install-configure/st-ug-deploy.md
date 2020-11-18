# Deploy Studio

Studio on Cloud can be used on Nebula Graph Cloud Service. When you create a Nebula Graph instance on Nebula Graph Cloud Service, Studio on Cloud is deployed automatically. For more information, see [Nebula Graph Cloud Service User Guide](https://cloud-docs.nebula-cloud.io/en/posts/manage-instances/dbaas-ug-connect-nebulastudio/ "Click to go to Nebula Graph Cloud Service User Guide"). For Docker-based Studio, you must deploy it. This article introduces how to deploy Docker-based Studio.  

## Prerequisites

Before you deploy Docker-based Studio, you must do a check of these:

- The Nebula Graph services are deployed and started. For more information, see [Nebula Graph Database Manual](https://docs.nebula-graph.io/manual-EN/3.build-develop-and-administration/2.install/1.install-with-rpm-deb/ "Click to go to Nebula Graph website").
  > **NOTE**: Different methods are available for you to deploy Nebula Graph. If this is your first time to use Nebula Graph, we recommend that you use Docker Compose to deploy Nebula Graph. For more information, see [Deploy Nebula Graph with Docker Compose](https://github.com/vesoft-inc/nebula-docker-compose/blob/master/README.md "Click to go to GitHub").

- On the machine where Studio will run, Docker Compose is installed and started. For more information, see [Docker Compose Documentation](https://docs.docker.com/compose/install/ "Click to go to Docker Documentation").

## Procedure

To deploy and start Docker-based Studio, run these commands one by one:

1. Download the configuration files for the deployment.

    ```bash
    git clone https://github.com/vesoft-inc/nebula-web-docker.git
    ```

2. Change to the `nebula-web-docker` directory.

    ```bash
    cd nebula-web-docker
    ```

3. Pull the Docker image of Studio.

    ```bash
    docker-compose pull
    ```

4. Build and start Docker-based Studio. In this command, `-d` is to run the containers in the background.

   ```bash
   docker-compose up -d
   ```

    If these lines return, Docker-based Studio is deployed and started.

    ```bash
    Creating docker_importer_1 ... done
    Creating docker_client_1   ... done
    Creating docker_web_1      ... done
    Creating docker_nginx_1    ... done
    ```

5. When Docker-based Studio is started, use `http://ip address:7001` to get access to Studio.
   > **NOTE**: You can use the public or private IP address of the machine where Docker-based Studio is running. On the machine running Docker-based Studio, you can use `http://localhost:7001` to get access to Studio.

    If you can see the **Config Server** page on the browser, Docker-based Studio is started successfully.

    ![The Config Server page shows that Docker-based Studio is started successfully](https://docs-cdn.nebula-graph.com.cn/nebula-studio-docs/st-ug-052.png "Docker-based Studio is started")

## Next to do

On the **Config Server** page, connect Docker-based Studio to Nebula Graph. For more information, see [Connect to Nebula Graph](st-ug-connect.md).
