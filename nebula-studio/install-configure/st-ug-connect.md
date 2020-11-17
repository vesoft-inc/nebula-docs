# Connect to Nebula Graph

When Studio is deployed and started successfully, you must connect it to Nebula Graph. This article introduces how to connect to Nebula Graph that is manually deployed.

For Studio on Nebula Graph Cloud Service, deployment is automatic. For more information, see [Nebula Graph Cloud Service User Guide](https://cloud-docs.nebula-cloud.io/en/posts/manage-instances/dbaas-ug-connect-nebulastudio/ "Click to go to Nebula Graph Cloud Service User Guide").

## Prerequisites

Before you connect Studio to Nebula Graph, you must do a check of these:

- The Nebula Graph services and Studio are started. For more information, see [Deploy Studio](st-ug-install.md).  

- You have the real IP address and the port used by the Graph service of Nebula Graph.

- You have a Nebula Graph account and its password.
  > **NOTE**: If authentication is enabled in Nebula Graph and different role-based accounts are created, you must use the assigned account to sign in to Nebula Graph. If not, you can use the default username (`user`) and the default password (`password`) to connect to Nebula Graph. For more information, see [Nebula Graph Database Manual](https://docs.nebula-graph.io/manual-EN/3.build-develop-and-administration/4.account-management-statements/authentication/ "Click to go to Nebula Graph website").

## Procedure

To connect Studio to Nebula Graph, follow these steps:

1. On the **Config Server** page of Studio, configure these fields:
   - **Host**: Enter the real IP address and the port of the Graph service of Nebula Graph. The valid format is `IP address:port`. By default, the port is `3699`.  
     > **NOTE**: If Nebula Graph and Studio are deployed on the same machine, you must enter the real IP address of the machine, but not `127.0.0.1`, in the **Host** field.
   - **Username** and **Password**: Enter a valid Nebula Graph account and its password.
     - If authentication is not enabled, you can use `user` and `password` to sign in.
     - If authentication is enabled and no accounts are created, you must use `root` and its password `nebula` to sign in.
     - If authentication is enabled and different role-based accounts are created, you must use the assigned account and its password to sign in.

      ![The Config Server page shows the fields to be configured for connection](https://docs-cdn.nebula-graph.com.cn/nebula-studio-docs/st-ug-050.png "Config Server")

2. After the configuration, click the **Connect** button.  
   If you can see the **Console** page, Studio is connected to Nebula Graph successfully.

    ![The Console page shows and it means that the connection is successful](https://docs-cdn.nebula-graph.com.cn/nebula-studio-docs/st-ug-051.png "Studio is connected")

One session continues up to 30 minutes. If you do not operate Studio within 30 minutes, the active session will time out and you must connect to Nebula Graph again.

## Next to do

When Studio is connected to Nebula Graph successfully, you can do these operations:

- If your account has GOD or ADMIN privilege, you can create a schema on the **[Console](../quick-start/st-ug-create-schema.md)** page or on the **[Schema](../manage-schema/st-ug-crud-space.md)** page.

- If your account has GOD, ADMIN, DBA, or USER privilege, you can bulk import data on the **[Import](../quick-start/st-ug-import-data.md)** page or insert data one by one on the **Console** page.

- If your account has GOD, ADMIN, DBA, USER, or GUEST privilege, you can operate queries on the **Console** page or analyze data on the **Explore** page.
