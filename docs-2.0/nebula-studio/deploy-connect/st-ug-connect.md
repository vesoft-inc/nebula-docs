# Connect to NebulaGraph

After successfully launching Studio, you need to configure to connect to NebulaGraph. This topic describes how Studio connects to the NebulaGraph database.

## Prerequisites

Before connecting to the NebulaGraph database, you need to confirm the following information:

- The NebulaGraph services and Studio are started. For more information, see [Deploy Studio](st-ug-deploy.md).

- You have the local IP address and the port used by the Graph service of NebulaGraph. The default port is `9669`.  
  
  !!! note

        Run `ifconfig` or `ipconfig` on the machine to get the IP address.

- You have a NebulaGraph account and its password.

  !!! note

        If authentication is enabled in NebulaGraph and different role-based accounts are created, you must use the assigned account to connect to NebulaGraph. If authentication is disabled, you can use the `root` and any password to connect to NebulaGraph. For more information, see [NebulaGraph Database Manual](https://docs.nebula-graph.io/).


## Procedure

To connect Studio to NebulaGraph, follow these steps:

1. On the **Config Server** page of Studio, configure these fields:

  - **Host**: Enter the IP address and the port of the Graph service of NebulaGraph. The valid format is `IP:port`. The default port is `9669`.  

    !!! note

        When NebulaGraph and Studio are deployed on the same machine, you must enter the IP address of the machine, but not `127.0.0.1` or `localhost`, in the **Host** field.

  - **Username** and **Password**: Fill in the log in account according to the authentication settings of NebulaGraph.
 
    - If authentication is not enabled, you can use `root` and any password as the username and its password.

    - If authentication is enabled and no account information has been created, you can only log in as GOD role and use `root` and `nebula` as the username and its password.

    - If authentication is enabled and different users are created and assigned roles, users in different roles log in with their accounts and passwords.
    
    ![The Config Server page shows the fields to be configured for connection](../figs/st-ug-050-1.png "Config Server")

2. After the configuration, click the **Connect** button.

   If you can see the **Explore** page, Studio is successfully connected to NebulaGraph.

   ![The Console page shows that the connection is successful](../figs/st-ug-051.png "NebulaGraph is connected")

One session continues for up to 30 minutes. If you do not operate Studio within 30 minutes, the active session will time out and you must connect to NebulaGraph again.

## Next to do

When Studio is successfully connected to NebulaGraph, you can do these operations:

- If your account has GOD or ADMIN privilege, you can create a schema on the **[Console](../quick-start/st-ug-create-schema.md)** page or on the **[Schema](../manage-schema/st-ug-crud-space.md)** page.

- If your account has GOD, ADMIN, DBA, or USER privilege, you can batch import data on the **[Import](../quick-start/st-ug-import-data.md)** page or insert data with nGQL statements on the **Console** page.

- If your account has GOD, ADMIN, DBA, USER, or GUEST privilege, you can retrieve data with nGQL statements on the **Console** page or explore and analyze data on the **Explore** page.
