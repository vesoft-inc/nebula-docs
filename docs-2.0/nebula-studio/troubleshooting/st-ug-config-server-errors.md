# Connecting to the database error

## Problem description

According to the [connect Studio](../deploy-connect/st-ug-connect.md) operation, it prompts **failed**.

## Possible causes and solutions

You can troubleshoot the problem by following the steps below.

### Step1: Confirm that the format of the **Host** field is correct

You must fill in the IP address (`graph_server_ip`) and port of the Nebula Graph database Graph service. If no changes are made, the port defaults to `9669`. Even if Nebula Graph and Studio are deployed on the current machine, you must use the local IP address instead of `127.0.0.1`, `localhost` or `0.0.0.0`.

### Step2: Confirm that the **username** and **password** are correct

If authentication is not enabled, you can use root and any password as the username and its password.

If authentication is enabled and different users are created and assigned roles, users in different roles log in with their accounts and passwords.

### Step3: Confirm that Nebula Graph service is normal

Check Nebula Graph service status. Regarding the operation of viewing services:

- If you compile and deploy Nebula Graph on a Linux server, refer to the [Nebula Graph service](../../4.deployment-and-installation/2.compile-and-install-nebula-graph/deploy-nebula-graph-cluster.md).

- If you use Nebula Graph deployed by Docker Compose and RPM, refer to the [Nebula Graph service status and ports](../deploy-connect/st-ug-deploy.md).

If the Nebula Graph service is normal, proceed to Step4 to continue troubleshooting. Otherwise, please restart Nebula Graph service.

!!! Note

    If you used `docker-compose up -d` to satrt Nebula Graph before, you must run the `docker-compose down` to stop Nebula Graph.

### Step4: Confirm the network connection of the Graph service is normal

Run a command (for example, telnet <graph_server_ip> 9669) on the Studio machine to confirm whether Nebula Graph's Graph service network connection is normal.

If the connection fails, check according to the following steps:

- If Studio and Nebula Graph are on the same machine, check if the port is exposed.

- If Studio and Nebula Graph are not on the same machine, check the network configuration of the Nebula Graph server, such as firewall, gateway, and port.

If you cannot connect to the Nebula Graph service after troubleshooting with the above steps, please go to the [Nebula Graph forum](https://discuss.nebula-graph.io) for consultation.