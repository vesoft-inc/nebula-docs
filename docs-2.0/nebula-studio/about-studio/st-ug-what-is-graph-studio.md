# What is Nebula Graph Studio

Nebula Graph Studio (Studio in short) is a browser-based visualization tool to manage Nebula Graph. It provides you with a graphical user interface to manipulate graph schemas, import data, explore graph data, and run nGQL statements to retrieve data. With Studio, you can quickly become a graph exploration expert from scratch.

## Release distributions

For now, Studio has three release versions:

- Docker-based. You can deploy Studio with Docker and connect it to Nebula Graph. For more information, see [Deploy Studio](../install-configure/st-ug-deploy.md).

- RPM-based. You can deploy Studio with RPM and connect it to Nebula Graph. For more information, see [Deploy Studio](../install-configure/st-ug-deploy.md).

- Cloud Service. You can connect to Nebula Graph Cloud Service with one click and create Nebula Graph instance. For more information, see [Nebula Graph Cloud Service User Guide](https://cloud-docs.nebula-cloud.io/en/posts/toc/dbaas-ug-toc/).

The functions of the three releases are about the same. But because of different deployment methods, there will be different usage limitations. For more information, see [Limitations](../about-studio/st-ug-limitations.md).

## Features

Studio provides these features:

- Graphical user interface (GUI) makes Nebula Graph management more user-friendly:

   - On the **Schema** page, you can manage schemas with a graphical user interface. It helps you quickly get started with Nebula Graph.

   - On the **Console** page, you can run nGQL statements and read the results in a human-friendly way.

   - On the **Import** page, you can operate batch import of vertex and edge data with clicks, and view a real-time import log.

- On the **Explore** page, you can explore the graph data. It helps you dig the relationships among data and improves the efficiency of data analysis.

## Scenarios

You can use Studio in one of these scenarios:

- You have a dataset, and you want to explore and analyze data in a visualized way. You can use Docker Compose or Nebula Graph Cloud Service to deploy Nebula Graph and then use Studio to explore or analyze data in a visualized way.  

- You have deployed Nebula Graph and imported a dataset. You want to use a GUI to run nGQL statements or explore and analyze graph data in a visualized way.  

- You are a beginner of nGQL (Nebula Graph Query Language) and you prefer to use a GUI rather than a command-line interface (CLI) to learn the language.  

## Authentication

For Studio on Cloud, only the instance creator and the Nebula Graph Cloud Service accounts that are authorized to manipulate data in Nebula Graph can connect to Studio. For more information, see [Nebula Graph Cloud Service User Guide](https://cloud-docs.nebula-cloud.io/en/posts/toc/dbaas-ug-toc/).

For Docker-based and RPM-based Studio, authentication is not enabled in Nebula Graph by default. You can sign into Studio with the default account (`user` and `password`). When Nebula Graph enables authentication, users can only sign into Studio with the specified account. For more information, see [Authentication](../../7.data-security/1.authentication/1.authentication.md).
