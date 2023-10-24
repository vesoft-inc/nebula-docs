# Connect to NebulaGraph

After successfully launching Studio, you need to configure to connect to NebulaGraph. This topic describes how Studio connects to the NebulaGraph database.

## Prerequisites

Before connecting to the NebulaGraph database, you need to confirm the following information:

- The NebulaGraph services and Studio are started. For more information, see [Deploy Studio](st-ug-deploy.md).

- You have the local IP address and the port used by the Graph service of NebulaGraph. The default port is `9669`.  

- You have a NebulaGraph account and its password.

## Procedure

To connect Studio to NebulaGraph, follow these steps:

1. Type `http://<ip_address>:7001` in the address bar of your browser.

  The following login page shows that Studio starts successfully.

  <img src="https://docs-cdn.nebula-graph.com.cn/figures/std_login_230912_en.png" width="1200" alt="A screenshot that shows the login UI of studio">

2. On the **Config Server** page of Studio, configure these fields:

  - **Graphd IP address**: Enter the IP address of the Graph service of NebulaGraph. For example, `192.168.10.100`.

    !!! note

        - When NebulaGraph and Studio are deployed on the same machine, you must enter the IP address of the machine, instead of `127.0.0.1` or `localhost`.
        - When connecting to a NebulaGraph database on a new browser tab, a new session will overwrite the sessions of the old tab. If you need to log in to multiple NebulaGraph databases simultaneously, you can use a different browser or non-trace mode.

  - **Port**: The port of the Graph service. The default port is `9669`.

  - **Username** and **Password**: Fill in the log in account according to the authentication settings of NebulaGraph.
 
    - If authentication is not enabled, you can use `root` and any password as the username and its password.

    - If authentication is enabled and no account information has been created, you can only log in as GOD role and use `root` and `nebula` as the username and its password.

    - If authentication is enabled and different users are created and assigned roles, users in different roles log in with their accounts and passwords.

3. After the configuration, click the **Connect** button.

  !!! note

        One session continues for up to 30 minutes. If you do not operate Studio within 30 minutes, the active session will time out and you must connect to NebulaGraph again.

A welcome page is displayed on the first login, showing the relevant functions according to the usage process, and the test datasets can be automatically downloaded and imported.

To visit the welcome page, click ![help](https://docs-cdn.nebula-graph.com.cn/figures/navbar-help.png).

## Next to do

When Studio is successfully connected to NebulaGraph, you can do these operations:

- Create a schema on the **[Console](../quick-start/st-ug-create-schema.md)** page or on the **[Schema](../manage-schema/st-ug-crud-space.md)** page.
- Batch import data on the **[Import](../quick-start/st-ug-import-data.md)** page.
- Execute nGQL statements on the **Console** page.
- Design the schema visually on the **Schema drafting** page.

!!! note

    The permissions of an account determine the operations that can be performed. For details, see [Roles and privileges](../../7.data-security/1.authentication/3.role-list.md).

### Log out
<!--
On NebulaGraph Cloud Service, users cannot clear the connection.
-->
If you want to reconnect to NebulaGraph, you can log out and reconfigure the database.

Click the user profile picture in the upper right corner, and choose **Log out**.