# Connect to NebulaGraph

After successfully launching Explorer, you need to configure to connect to NebulaGraph. This topic describes how Explorer connects to the NebulaGraph database.

## Prerequisites

Before connecting to the NebulaGraph database, you need to confirm the following information:

- The NebulaGraph services and Explorer are started. For more information, see [Deploy Explorer](../deploy-connect/ex-ug-connect.md).

- You have the local IP address and the port used by the Graph service of NebulaGraph. The default port is `9669`.

- You have a NebulaGraph account and its password.

  !!! note
        
        If authentication is enabled in NebulaGraph and different role-based accounts are created, you must use the assigned account to connect to NebulaGraph. If authentication is disabled, you can use the `root` and any password to connect to NebulaGraph. For more information, see [NebulaGraph Database Manual](https://docs.nebula-graph.io/).

## Procedure

To connect Explorer to NebulaGraph, follow these steps:

1. On the **Config Server** page of Explorer, configure these fields:

   - **Host**: Enter the IP address and the port of the Graph service of NebulaGraph. The valid format is `IP:port`. The default port is `9669`.  

    !!! note

        When NebulaGraph and Explorer are deployed on the same machine, you must enter the IP address of the machine, but not `127.0.0.1` or `localhost`, in the **Host** field.

  - **Username** and **Password**: Fill in the log in account according to the authentication settings of NebulaGraph.

    - If authentication is not enabled, you can use `root` and any password as the username and its password.

    - If authentication is enabled and no account information has been created, you can only log in as GOD role and use `root` and `nebula` as the username and its password.

    - If authentication is enabled and different users are created and assigned roles, users in different roles log in with their accounts and passwords.

   ![The Config Server page shows the fields to be configured for connection](../figs/ex-ug-001-1.png)

2. After the configuration, click the **Login** button.

   If you can see the interface as shown in the below, it means you have successfully connected to the NebulaGraph database.

   ![The Console page shows that the connection is successful](../figs/ex-ug-051-1.png "NebulaGraph is connected")

One session continues for up to 30 minutes. If you do not operate Explorer within 30 minutes, the active session will time out and you must connect to NebulaGraph again.
