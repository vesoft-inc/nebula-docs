# Deploy Studio with Helm

This topic describes how to deploy Studio with Helm.

## Prerequisites

Before installing Studio, you need to install the following software and ensure the correct version of the software:

| Software                                                     | Requirement  |
| ------------------------------------------------------------ | --------- |
| [Kubernetes](https://kubernetes.io)                          | \>= 1.14  |
| [Helm](https://helm.sh)                                      | \>= 3.2.0 |

## Install

1. Use Git to clone the source code of Studio to the host.

   ```bash
   $ git clone https://github.com/vesoft-inc/nebula-studio.git
   ```

2. Make the `nebula-studio` directory the current working directory.
   ```bash
    $ cd nebula-studio
    ```

3. Assume using release name:`my-studio`, installed Studio in Helm Chart.
    ```bash
    $ helm upgrade --install my-studio --set service.type=NodePort --set service.port=30070 deployment/helm
    ```

4. When Studio is started, use `http://address-of-node:30070/` to get access to Studio.

   If you can see the **Config Server** page on the browser, Studio is started successfully.

   ![The Config Server page shows that Studio is started successfully](../figs/st-ug-025.png "Studio is started")


## Uninstall

```bash
 $ helm uninstall my-studio
```

## Next to do

On the **Config Server** page, connect Docker-based Studio to Nebula Graph. For more information, see [Connect to Nebula Graph](st-ug-connect.md).

## Configuration

| Parameter | Default value | Description |
|-----------|-------------|---------|
| replicaCount  | 0 | The number of replicas for Deployment.   |
| image.httpGateway.name  | vesoft/nebula-http-gateway  | The image name of nebula-http-gateway. |
| image.nebulaStudio.name  |  vesoft/nebula-graph-studio  | The image name of nebula-graph-studio. |
| image.nginx.name  |  nginx   | The image name of nginx. |
| image.httpGateway.version  |  v2.1.1  | The image version of nebula-http-gateway.  |
| image.nebulaStudio.version  | v3.1.0 |  The image version of nebula-graph-studio.  |
| image.nginx.version  |  alpine  |  The image version of nginx. |
| service.type  | ClusterIP |  The service type, which should be one of 'NodePort', 'ClusterIP', and 'LoadBalancer'. |
| service.port  | 7001 |  The expose port for nebula-graph-studio's web.  |
| resources.httpGateway  | {} |  The resource limits/requests for nebula-http-gateway. |
| resources.nebulaStudio  | {} |  The resource limits/requests for nebula-studio. |
| resources.nginx  | {} |  The resource limits/requests for nginx. |
| persistent.storageClassName  | ""  |  The name of storageClass. The default value will be used if not specified. |
| persistent.size  | 5Gi |  The persistent volume size. |
