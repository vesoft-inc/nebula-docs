# Standalone Nebula Graph

Standalone Nebula Graph refers that you can run Nebula Graph within a single process on a single machine. This topic introduces scenarios, deployment steps, etc. of standalone Nebula Graph.

## Background

The traditional Nebula Graph consists of 3 services, each service having executable binary files and the corresponding process. Processes communicate with each other by RPC. You can deploy a Nebula Graph cluster on single or multiple machines using these binary files. For more information about Nebula Graph, see [Architecture overview](../1.introduction/3.nebula-graph-architecture/1.architecture-overview.md).

## Scenarios

Small data sizes and low availability requirements. For example, test environments that are limited by the number of machines, scenarios that are only used to verify functionality.

!!! danger

    Do not use standalone Nebula Graph in production environments. 

## Limitations

- Single service instance per machine.
- High availability and reliability not supported.

## Resource requirements

For information about the resource requirements for standalone Nebula Graph, see [Resource preparations](1.resource-preparations.md).

## Steps 

Currently, you can only install standalone Nebula Graph with the source code. The steps are similar to those of the multi-process Nebula Graph. You only need to modify the step **Generate Makefile with CMake** by adding `-DENABLE_STANDALONE_VERSION=on` to the command. For example:

```bash
cmake -DCMAKE_INSTALL_PREFIX=/usr/local/nebula -DENABLE_TESTING=OFF -DENABLE_STANDALONE_VERSION=on -DCMAKE_BUILD_TYPE=Release .. 
``` 

For more information about installation details, see [Install Nebula Graph by compiling the source code](2.compile-and-install-nebula-graph/1.install-nebula-graph-by-compiling-the-source-code.md).

After installing standalone Nebula Graph, see the topic [connect to Service](connect-to-nebula-graph.md) to connect to Nebula Graph databases.

## Configuration file

The path to the configuration file for standalone Nebula Graph is `/usr/local/nebula/etc` by default.

You can run `sudo cat nebula-standalone.conf.default` to see the file content. The parameters and the corresponding descriptions in the file are generally the same as the configurations for multi-process Nebula Graph except for the following parameters.

| Parameter             | Predefined value     | Description                  |
| ---------------- | ----------- | --------------------- |
| `meta_port`      | `9559`      | The port number of the Meta service.    |
| `storage_port`   | `9779`      | The port number of the Storage Service. |
| `meta_data_path` | `data/meta` | The path to Meta data.  |

You can run commands to check configurable parameters and the corresponding descriptions. For details, see [Configurations](../5.configurations-and-logs/1.configurations/1.configurations.md).