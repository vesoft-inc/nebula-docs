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

## Uninstall

```bash
 $ helm uninstall my-studio
```

## Next to do

On the **Config Server** page, connect Docker-based Studio to Nebula Graph. For more information, see [Connect to Nebula Graph](st-ug-connect.md).

## Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| replicaCount  | Replicas for Deployment  | 0  |
| image.httpGateway.name  |  The image name of nebula-http-gateway  | vesoft/nebula-http-gateway  |
| image.nebulaImporter.name  |  The image name of nebula-importer  | vesoft/nebula-importer  |
| image.nebulaStudio.name  |  The image name of nebula-graph-studio  | vesoft/nebula-graph-studio |
| image.nginx.name  |  The image name of nginx  | nginx  |
| image.httpGateway.version  |  The image version nebula-http-gateway  | v2  |
| image.nebulaImporter.version  |  The image version nebula-importer  | v2  |
| image.nebulaStudio.version  |  The image version nebula-graph-studio  | v3  |
| image.nginx.version  |  The image version of nginx  | alpine  |
| service.type  | The service type, should be one of ['NodePort', 'ClusterIP', 'LoadBalancer'] |  ClusterIP  |
| service.port  | The expose port for nebula-graph-studio's web |  7001  |
| resources.httpGateway  | The resource limits/requests for nebula-http-gateway | {}  |
| resources.nebulaImporter  | The resource limits/requests for nebula-importer | {}  |
| resources.nebulaStudio  | The resource limits/requests for nebula-studio | {}  |
| resources.nginx  | The resource limits/requests for nginx | {}  |
| persistent.storageClassName  | The storageClassName for PVC if not using default  | ""  |
| persistent.size  | The persistent volume size | 5Gi  |
