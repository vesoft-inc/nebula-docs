NebulaGraph supports multiple types of clients, including a CLI client, a GUI client, and clients developed in popular programming languages. This topic provides an overview of NebulaGraph clients and basic instructions on how to use the native CLI client, Nebula Console.

## NebulaGraph clients

You can use supported [clients or console](https://docs.nebula-graph.io/{{nebula.release}}/20.appendix/6.eco-tool-version/) to connect to NebulaGraph.<!--这里用外链。-->

<!-- TODO The cloud service cannot be provided together with v{{ nebula.release }}.
If you do not have a NebulaGraph database yet, we recommend that you try the cloud service. [NebulaGraph Cloud Service](https://www.nebula-cloud.io/) supports on-demand deployment and fast building with NebulaGraph Studio as its default client.
-->

## Use Nebula Console to connect to NebulaGraph

### Prerequisites

* You have started [NebulaGraph services](https://docs.nebula-graph.io/{{nebula.release}}/4.deployment-and-installation/manage-service/).<!--这里用外链。-->

* The machine you plan to run Nebula Console on has network access to NebulaGraph services.

* The Nebula Console version is compatible with the NebulaGraph version.

  !!! note
  
        The same version of Nebula Console and NebulaGraph is the most compatible. There may be compatibility issues when connecting to NebulaGraph with a different version of Nebula Console. You may be unable to connenct to NebulaGraph due to the compatibiltiy issue and an error message `incompatible version between client and server` is displayed.

### Steps

1. On the [nebula-console](https://github.com/vesoft-inc/nebula-console/releases "the nebula-console Releases page") page, select a Nebula Console version and click **Assets**.

  !!! note

        We recommend that you select the **latest** release.

2. In the **Assets** area, find the correct binary file for the machine where you want to run Nebula Console and download the file to the machine.

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

6. Run the following command to connect to NebulaGraph.

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

   Parameters and descriptions are as follows.

   | Parameter | Description |
   | - | - |
   | `-h` | Shows the help menu. |
   | `-addr` | Sets the IP address of the graphd service. The default address is 127.0.0.1. |
   | `-port` | Sets the port number of the graphd service. The default port number is 9669.<!-- If you have deployed NebulaGraph in a docker container but Nebula Console is working outside the container, check the [source port](2.deploy-nebula-graph-with-docker-compose.md/#check_the_nebula_graph_service_status_and_port) of any nebula-graphd process and use it for connection. -->|
   | `-u/-user` | Sets the username of your NebulaGraph account. Before enabling authentication, you can use any existing username. The default username is `root`. |
   | `-p/-password` | Sets the password of your NebulaGraph account. Before enabling authentication, you can use any characters as the password. |
   | `-t/-timeout`  | Sets an integer-type timeout threshold of the connection. The unit is second. The default value is 120. |
   | `-e/-eval` | Sets a string-type nGQL statement. The nGQL statement is executed once the connection succeeds. The connection stops after the result is returned. |
   | `-f/-file` | Sets the path of an nGQL file. The nGQL statements in the file are executed once the connection succeeds. The result will be returned and the connection stops then. |

You can find more details in the [Nebula Console Repository](https://github.com/vesoft-inc/nebula-console/tree/{{console.branch}}).
