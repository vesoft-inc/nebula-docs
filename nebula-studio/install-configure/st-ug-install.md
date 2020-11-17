# Deploy Studio

Studio can be manually deployed on a machine or automatically deployed on Nebula Graph Cloud Service. This article introduces how to deploy Studio manually on a machine.  

For Studio on Nebula Graph Cloud Service, deployment is automatic. For more information, see [Nebula Graph Cloud Service User Guide](https://cloud-docs.nebula-cloud.io/en/posts/manage-instances/dbaas-ug-connect-nebulastudio/ "Click to go to Nebula Graph Cloud Service User Guide").

## Prerequisites

Before you manually deploy Studio, you must do a check of these:

- The Nebula Graph services are deployed and started. For more information, see [Nebula Graph Database Manual](https://docs.nebula-graph.io/manual-EN/3.build-develop-and-administration/2.install/1.install-with-rpm-deb/ "Click to go to Nebula Graph website").
  > **NOTE**: Multiple methods are available for you to deploy Nebula Graph. If this is your first time to use Nebula Graph, we recommend that you use Docker Compose to deploy Nebula Graph. For more information, see [Deploy Nebula Graph with Docker Compose](https://github.com/vesoft-inc/nebula-docker-compose/blob/master/README.md "Click to go to GitHub").

- On the machine on which Studio will run, Docker Compose is installed and started. For more information, see [Docker Compose Documentation](https://docs.docker.com/compose/install/ "Click to go to Docker Documentation").

## Procedure

To deploy and start Studio, follow these steps:

1. Download the Studio deployment source code.

    ```bash
    git clone https://github.com/vesoft-inc/nebula-web-docker.git
    ```

2. Change to the `nebula-web-docker` directory.

    ```bash
    cd path/to/nebula-web-docker
    ```

3. Deploy and start Studio.

    ```bash
    docker-compose pull && docker-compose up
    ```

    If these lines return, Studio is deployed and started.

    ```bash
    Creating docker_importer_1 ... done
    Creating docker_client_1   ... done
    Creating docker_web_1      ... done
    Creating docker_nginx_1    ... done
    ```

4. When Studio is started, in the address bar of the browser, enter `http://localhost:7001`.

    If you can see this sign-in page on the browser, Studio is started successfully.

    ![Nebula Graph Studio sign-in page](https://docs-cdn.nebula-graph.com.cn/nebula-studio-docs/st-ug-052.png "Nebula Graph Studio sign-in page")

## Next to do

On the Studio sign-in page, connect it to Nebula Graph. For more information, see [Connect to Nebula Graph](st-ug-connect.md).
