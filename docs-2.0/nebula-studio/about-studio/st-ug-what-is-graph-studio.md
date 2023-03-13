# What is NebulaGraph Studio

NebulaGraph Studio (Studio in short) is a browser-based visualization tool to manage NebulaGraph. It provides you with a graphical user interface to manipulate graph schemas, import data, explore graph data, and run nGQL statements to retrieve data. With Studio, you can quickly become a graph exploration expert from scratch. Users can view the latest source code in the NebulaGraph GitHub repository, see [nebula-studio](https://github.com/vesoft-inc/nebula-studio) for details.

## Released versions

You can deploy Studio using the following methods:

- Docker-based. You can deploy Studio with Docker and connect it to NebulaGraph. For more information, see [Docker-based Studio](../deploy-connect/st-ug-deploy.md).
- RPM-based. You can deploy Studio with RPM and connect it to NebulaGraph. For more information, see [RPM-based Studio](../deploy-connect/st-ug-deploy.md).
- Tar-based. You can deploy Studio with tar and connect it to NebulaGraph. For more information, see [tar-based Studio](../deploy-connect/st-ug-deploy.md).
- Helm-based. You can deploy Studio with Helm in the Kubernetes cluster and connect it to NebulaGraph. For more information, see [Helm-based Studio](../deploy-connect/st-ug-deploy-by-helm.md).

<!--
- Cloud Service: You can create NebulaGraph database instances in NebulaGraph Cloud Service and connect Cloud Service Studio with one click. For more information, see [NebulaGraph Cloud Service Manual](https://cloud-docs.nebula-graph.com.cn/cn/posts/manage-instances/dbaas-ug-connect-nebulastudio/ "Click to go to NebulaGraph Cloud Service Manual").
-->

The functions of the above four deployment methods are the same and may be restricted when using Studio. For more information, see [Limitations](../about-studio/st-ug-limitations.md).

## Features

Studio provides these features:

- Graphical user interface (GUI) makes NebulaGraph management more user-friendly:

   - On the **Schema** page, you can manage schemas with a graphical user interface. It helps you quickly get started with NebulaGraph.

   - On the **Console** page, you can run nGQL statements and read the results in a human-friendly way.

   - On the **Import** page, you can operate batch import of vertex and edge data with clicks, and view a real-time import log.

- On the **Explore** page, you can explore the graph data. It helps you dig the relationships among data and improves the efficiency of data analysis.

## Scenarios

You can use Studio in one of these scenarios:

- You have a dataset, and you want to explore and analyze data in a visualized way. You can use Docker Compose to deploy NebulaGraph and then use Studio to explore or analyze data in a visualized way.  

- You have deployed NebulaGraph and imported a dataset. You want to use a GUI to run nGQL statements or explore and analyze graph data in a visualized way.  

- You are a beginner of nGQL (NebulaGraph Query Language) and you prefer to use a GUI rather than a command-line interface (CLI) to learn the language.  

## Authentication

Authentication is not enabled in NebulaGraph by default. Users can log into Studio with the `root` account and any password.

When NebulaGraph enables authentication, users can only sign into Studio with the specified account. For more information, see [Authentication](../../7.data-security/1.authentication/1.authentication.md).
