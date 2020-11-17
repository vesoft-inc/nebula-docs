# What is Nebula Graph Studio

Studio (short for Nebula Graph Studio) is a browser-based visualization tool to manage Nebula Graph databases. It provides graphical user interface for you manipulate graph schemas, import data, explore graph data, and run nGQL statements to query data. With Studio, you can quickly become graph exploration expert from scratch.

## Release distributions

Studio has two release distributions:

- Local release: You can deploy Studio on your own machine and connect it to manually deployed Nebula Graph. For more information, see [Deploy Studio](../install-configure/st-ug-install.md).  

- Cloud release: You can create a Nebula Graph instance on Nebula Graph Cloud Service and then connect it to the Cloud release of Studio with one click. For more information, see [Nebula Graph Cloud Service User Guide](https://cloud-docs.nebula-cloud.io/en/posts/manage-instances/dbaas-ug-connect-nebulastudio/ "Click to go to Nebula Graph Cloud Service User Guide").

Both release distributions have the same features except in the usage limitations. For more information, see [Limitations](st-ug-limitations.md).

## Features

Studio provides these features:

- Flexible deployment to meet your different requirements. You can deploy Studio manually on your machine and connect it to manually deployed Nebula Graph. Alternatively, you can use Studio deployed on Nebula Graph Cloud Service.

- Graphical user interface (GUI) makes management of Nebula Graph more user-friendly:

  - With the **Schema** module, you can operate schemas on a graphical user interface. It helps you quickly get started with Nebula Graph.

  - With the **Console** module, you can run nGQL statements and read the results in a human-friendly way.

  - With the **Import** module, you can operate bulk import of vertex and edge data with clicks, and view the import log in real-time.

- The **Explore** module supports visualized representation of graph data. It helps you dig the relationships among data and improves the efficiency of data analysis.

## Scenarios

You can use Studio in one of these scenarios:

- You have a dataset and exploration and analysis of data in a visualized way is necessary. You can use Docker Compose or Nebula Graph Cloud Service to deploy Nebula Graph and then use Studio to explore or analyze data in a visualized way.  

- You have deployed Nebula Graph and imported your dataset. You want to use a GUI to run nGQL statements and explore and analyze graph data in a visualized way.  

- You are a beginner of nGQL (Nebula Graph Query Language) and you prefer to use a GUI rather than a command-line interface (CLI) to learn the language.  

## Authentication

By default, authentication is not enabled in Nebula Graph and you can sign in to Studio with the default account and password (`user` and `password`). When authentication is enabled, you can only sign in to Studio with the assigned account and password.

For more information about authentication, see [Nebula Graph Database Manual](https://docs.nebula-graph.io/manual-EN/3.build-develop-and-administration/4.account-management-statements/authentication/ "Click to go to Neubla Graph website").
