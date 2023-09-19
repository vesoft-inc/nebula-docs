# Standalone NebulaGraph

Standalone NebulaGraph merges the Meta, Storage, and Graph services into a single process deployed on a single machine. This topic introduces scenarios, deployment steps, etc. of standalone NebulaGraph.

!!! danger

    Do not use standalone NebulaGraph in production environments. 

## Background

The traditional NebulaGraph consists of three services, each service having executable binary files and the corresponding process. Processes communicate with each other by RPC. In standalone NebulaGraph, the three processes corresponding to the three services are combined into one process. For more information about NebulaGraph, see [Architecture overview](../1.introduction/3.nebula-graph-architecture/1.architecture-overview.md).

## Scenarios

Small data sizes and low availability requirements. For example, test environments that are limited by the number of machines, scenarios that are only used to verify functionality.

## Limitations

- Single service instance per machine.
- High availability and reliability not supported.

## Resource requirements

For information about the resource requirements for standalone NebulaGraph, see [Software requirements for compiling NebulaGraph](1.resource-preparations.md).

## Steps 

Currently, you can only install standalone NebulaGraph with the source code. The steps are similar to those of the multi-process NebulaGraph. You only need to modify the step **Generate Makefile with CMake** by adding `-DENABLE_STANDALONE_VERSION=on` to the command. For example:

```bash
cmake -DCMAKE_INSTALL_PREFIX=/usr/local/nebula -DENABLE_TESTING=OFF -DENABLE_STANDALONE_VERSION=on -DCMAKE_BUILD_TYPE=Release .. 
``` 

For more information about installation details, see [Install NebulaGraph by compiling the source code](2.compile-and-install-nebula-graph/1.install-nebula-graph-by-compiling-the-source-code.md).

After installing standalone NebulaGraph, see the topic [connect to Service](connect-to-nebula-graph.md) to connect to NebulaGraph databases.

## Configuration file

The path to the configuration file for standalone NebulaGraph is `/usr/local/nebula/etc` by default.

You can run `sudo cat nebula-standalone.conf.default` to see the file content. The parameters and the corresponding descriptions in the file are generally the same as the configurations for multi-process NebulaGraph except for the following parameters.

| Parameter             | Predefined value     | Description                  |
| ---------------- | ----------- | --------------------- |
| `meta_port`      | `9559`      | The port number of the Meta service.    |
| `storage_port`   | `9779`      | The port number of the Storage Service. |
| `meta_data_path` | `data/meta` | The path to Meta data.  |

You can run commands to check configurable parameters and the corresponding descriptions. For details, see [Configurations](../5.configurations-and-logs/1.configurations/1.configurations.md).
