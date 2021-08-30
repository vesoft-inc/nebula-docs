Nebula Graph supports multiple types of clients, including a CLI client, a GUI client, and clients developed in popular programming languages. This topic provides an overview of Nebula Graph clients and basic instructions on how to use the native CLI client, Nebula Console.

## Nebula Graph clients

You can use supported [clients or console](../20.appendix/6.eco-tool-version.md) to connect to Nebula Graph.

<!-- TODO cloud service can't be provided together with v2.0.0.
If you don't have a Nebula Graph database yet, we recommend that you try the cloud service. [Nebula Graph Cloud Service](https://www.nebula-cloud.io/) supports on-demand deployment and fast building, and uses Nebula Graph Studio as its default client.
-->

## Use Nebula Console to connect to Nebula Graph

### Prerequisites

* You have started the Nebula Graph services. For how to start the services, see [Start and Stop Nebula Graph](./5.start-stop-service.md).
* The machine you plan to run Nebula Console on has network access to the Nebula Graph services.

### Steps

1. On the [nebula-console](https://github.com/vesoft-inc/nebula-console/releases "the nebula-console Releases page") page, select a Nebula Console version and click **Assets**.

  !!! note

        We recommend that you select the **latest** release.

    ![Select a Nebula Graph version and click **Assets**](https://docs-cdn.nebula-graph.com.cn/docs-2.0/2.quick-start/nebula-console-releases-1.png "Click Assets to show the available Nebula Graph binary files")

2. In the **Assets** area, find the correct binary file for the machine where you want to run Nebula Console and download the file to the machine.

    ![Click to download the package according to your hardware architecture](https://docs-cdn.nebula-graph.com.cn/docs-2.0/2.quick-start/nebula-console-releases-2-1.png "Click the package name to download it")

3. (Optional) Rename the binary file to `nebula-console` for convenience.

  !!! note

        For Windows, rename the file to `nebula-console.exe`.

4. On the machine to run Nebula Console, grant the execute permission of the nebula-console binary file to the user.

  !!! note

        For Windows, skip this step.

    ```bash
    $ chmod 111 nebula-console
    ```

5. In the command line interface, change the working directory to the one where the nebula-console binary file is stored.

6. Run the following command to connect to Nebula Graph.

   * For Linux or macOS:

   ```bash
   $ ./nebula-console -addr <ip> -port <port> -u <username> -p <password>
   [-t 120] [-e "nGQL_statement" | -f filename.nGQL]
   ```

   * For Windows:

   ```powershell
   > nebula-console.exe -addr <ip> -port <port> -u <username> -p <password>
   [-t 120] [-e "nGQL_statement" | -f filename.nGQL]
   ```

   The description of the parameters is as follows.

   | Option | Description |
   | - | - |
   | `-h` | Shows the help menu. |
   | `-addr` | Sets the IP address of the graphd service. The default address is 127.0.0.1. |
   | `-port` | Sets the port number of the graphd service. The default port number is 9669.<!-- If you have deployed Nebula Graph in a docker container but Nebula Console is working outside the container, check the [source port](2.deploy-nebula-graph-with-docker-compose.md/#check_the_nebula_graph_service_status_and_port) of any nebula-graphd process and use it for connection. -->|
   | `-u/-user` | Sets the username of your Nebula Graph account. Before enabling authentication, you can use any characters as the username. |
   | `-p/-password` | Sets the password of your Nebula Graph account. Before enabling authentication, you can use any characters as the password. |
   | `-t/-timeout`  | Sets an integer-type timeout threshold of the connection. The unit is second. The default value is 120. |
   | `-e/-eval` | Sets a string-type nGQL statement. The nGQL statement is executed once the connection succeeds. The connection stops after the result is returned. |
   | `-f/-file` | Sets the path of an nGQL file. The nGQL statements in the file are executed once the connection succeeds. You'll get the return messages and the connection stops then. |

You can find more details in the [Nebula Console Repository](https://github.com/vesoft-inc/nebula-console/tree/v2.0.0-ga).

## Nebula Console export mode

When the export mode is enabled, Nebula Console exports all the query results into a CSV file. When the export mode is disabled, the export stops. The syntax is as follows.

!!! note

    * The following commands are case insensitive.
    * The CSV file is stored in the working directory. Run the Linux command `pwd` to show the working directory.

* Enable Nebula Console export mode:

```ngql
nebula> :SET CSV <your_file.csv>
```

* Disable Nebula Console export mode:

```ngql
nebula> :UNSET CSV
```

## Disconnect Nebula Console from Nebula Graph

You can use `:EXIT` or `:QUIT` to disconnect from Nebula Graph. For convenience, Nebula Console supports using these commands in lower case without the colon (":"), such as `quit`.

```ngql
nebula> :QUIT

Bye root!
```

## FAQ

### How can I install Nebula Console from the source code

To download and compile the latest source code of Nebula Console, follow the instructions on [the nebula console GitHub page](https://github.com/vesoft-inc/nebula-console#build-nebula-graph-console).
