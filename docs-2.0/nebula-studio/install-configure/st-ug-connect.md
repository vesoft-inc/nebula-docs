# Connect to Nebula Graph

For Docker-based Studio v2.x, when it is started, you must configure it to connect to Nebula Graph. This article introduces how to connect Docker-based Studio v2.x to Nebula Graph v2.x.

## Prerequisites

Before you connect Docker-based Studio to Nebula Graph, you must do a check of these:

- The Nebula Graph v2.x services and Studio v2.x are started. For more information, see [Deploy Studio](st-ug-deploy.md).

- You have the IP address and the port used by the Graph service of Nebula Graph v2.x. The default port is `3699`.  
  > **NOTE**: Run `ifconfig` or `ipconfig` on the machine to get the IP address.

## Procedure

To connect Docker-based Studio to Nebula Graph, follow these steps:

1. On the **Config Server** page of Studio, configure these fields:
   - **Host**: Enter the IP address and the port of the Graph service of Nebula Graph. The valid format is `IP:port`. The default port is `3699`.  
     > **NOTE**: When Nebula Graph and Studio are deployed on the same machine, you must enter the IP address of the machine, but not `127.0.0.1` or `localhost`, in the **Host** field.
   - **Username** and **Password**: You can use `user` and `password` as the username and its password.

      ![The Config Server page shows the fields to be configured for connection](../figs/st-ug-050.png "Config Server")

2. After the configuration, click the **Connect** button.  
   If you can see the **Console** page, Docker-based Studio is successfully connected to Nebula Graph.

    ![The Console page shows and it means that the connection is successful](../figs/st-ug-051.png "Nebula Graph is connected")

One session continues up to 30 minutes. If you do not operate Studio within 30 minutes, the active session will time out and you must connect to Nebula Graph again.

## Next to do

When Studio is successfully connected to Nebula Graph v2.0.0, you can learn [nGQL v2.x](https://docs.nebula-graph.io/2.0/2.quick-start/4.nebula-graph-crud/) on the **Console** page or explore and analyze data on the **Explore** page.
