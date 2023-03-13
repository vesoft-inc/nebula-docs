# What is Nebula Studio

Nebula Studio (Studio in short) is a browser-based visualization tool to manage NebulaGraph. It provides you with a graphical user interface to manipulate graph schemas, import data, and run nGQL statements to retrieve data. With Studio, you can quickly become a graph exploration expert from scratch. You can view the latest source code in the NebulaGraph GitHub repository, see [nebula-studio](https://github.com/vesoft-inc/nebula-studio) for details.

!!! Note

    You can also try some [functions online](https://playground.nebula-graph.io/explorer) in Studio.

## Released versions

You can deploy Studio using the following methods:

- You can deploy Studio with Docker, RPM-based, Tar-based or DEB-based and connect it to NebulaGraph. For more information, see [Deploy Studio](../deploy-connect/st-ug-deploy.md).
- Helm-based. You can deploy Studio with Helm in the Kubernetes cluster and connect it to NebulaGraph. For more information, see [Helm-based Studio](../deploy-connect/st-ug-deploy-by-helm.md).

<!--
- Cloud Service: You can create NebulaGraph database instances in NebulaGraph Cloud Service and connect Cloud Service Studio with one click. For more information, see [NebulaGraph Cloud Service Manual](https://cloud-docs.nebula-graph.com.cn/cn/posts/manage-instances/dbaas-ug-connect-nebulastudio/ "Click to go to NebulaGraph Cloud Service Manual").
-->

The functions of the above four deployment methods are the same and may be restricted when using Studio. For more information, see [Limitations](../about-studio/st-ug-limitations.md).

## Features

Studio can easily manage NebulaGraph data, with the following functions:

- On the **Schema** page, you can use the graphical user interface to create the space, Tag, Edge Type, Index, and view the statistics on the graph. It helps you quickly get started with NebulaGraph.

- On the **Import** page, you can operate batch import of vertex and edge data with clicks, and view a real-time import log.

- On the **Console** page, you can run nGQL statements and read the results in a human-friendly way.

## Scenarios

You can use Studio in one of these scenarios:

- You have a dataset, and you want to explore and analyze data in a visualized way. You can use Docker Compose to deploy NebulaGraph and then use Studio to explore or analyze data in a visualized way. 

- You are a beginner of nGQL (NebulaGraph Query Language) and you prefer to use a GUI rather than a command-line interface (CLI) to learn the language.  

## Authentication

<!--
For Studio on Cloud, only the instance creator and the NebulaGraph Cloud Service accounts that are authorized to manipulate data in NebulaGraph can connect to Studio. For more information, see [NebulaGraph Cloud Service User Guide](https://cloud-docs.nebula-cloud.io/en/posts/toc/dbaas-ug-toc/).
-->

Authentication is not enabled in NebulaGraph by default. Users can log into Studio with the `root` account and any password.

When NebulaGraph enables authentication, users can only sign into Studio with the specified account. For more information, see [Authentication](../../7.data-security/1.authentication/1.authentication.md).

## Check updates

Studio is in development. Users can view the latest releases features through [Changelog](../about-studio/st-ug-release-note.md).

To view the Changelog, on the upper-right corner of the page, click the version and then **New version**.

![On the upper right corner of the page, click Version and then New Version](https://docs-cdn.nebula-graph.com.cn/figures/st-ug-001-en.png)
