This topic provides basic instruction on how to use the native CLI client Nebula Console to connect to Nebula Graph.

!!! caution

    When connecting to Nebula Graph for the first time, you must [register the Storage Service](../2.quick-start/3.1add-storage-hosts.md) before querying data.

Nebula Graph supports multiple types of clients, including a CLI client, a GUI client, and clients developed in popular programming languages. For more information, see the [client list](../14.client/1.nebula-client.md).

## Prerequisites

* You have started [Nebula Graph services](https://docs.nebula-graph.io/{{nebula.release}}/4.deployment-and-installation/manage-service/).<!--Use the external link here because this file is a source for reuse and using internal links creates errors.-->

* The machine on which you plan to run Nebula Console has network access to the Graph Service of Nebula Graph.

* The Nebula Console version is compatible with the Nebula Graph version.

  !!! note
  
        Nebula Console and Nebula Graph of the same version number are the most compatible. There may be compatibility issues when connecting to Nebula Graph with a different version of Nebula Console. The error message `incompatible version between client and server` is displayed when there is such an issue.

### Steps

1. On the Nebula Console [releases page](https://github.com/vesoft-inc/nebula-console/releases "the nebula-console Releases page"), select a Nebula Console version and click **Assets**.

  !!! note

        It is recommended to select the **latest** version.

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

  Parameter descriptions are as follows:
  
  | Parameter | Description |
  | - | - |
  | `-h/-help` | Shows the help menu. |
  | `-addr/-address` | Sets the IP address of the Graph service. The default address is 127.0.0.1. <!--If Nebula Graph is deployed on [Nebula Cloud](https://docs.nebula-graph.io/2.6.2/nebula-cloud/1.what-is-cloud/), you need to create a Private Link and set the IP address of the Private Endpoint as the parameter value.--> |
  | `-P/-port` | Sets the port number of the graphd service. The default port number is 9669. |
  | `-u/-user` | Sets the username of your Nebula Graph account. Before enabling authentication, you can use any existing username. The default username is `root`. |
  | `-p/-password` | Sets the password of your Nebula Graph account. Before enabling authentication, you can use any characters as the password. |
  | `-t/-timeout`  | Sets an integer-type timeout threshold of the connection. The unit is second. The default value is 120. |
  | `-e/-eval` | Sets a string-type nGQL statement. The nGQL statement is executed once the connection succeeds. The connection stops after the result is returned. |
  | `-f/-file` | Sets the path of an nGQL file. The nGQL statements in the file are executed once the connection succeeds. The result will be returned and the connection stops then. |
  | `-enable_ssl` | Enables SSL encryption when connecting to Nebula Graph. |
  | `-ssl_root_ca_path` | Sets the storage path of the certification authority file. |
  | `-ssl_cert_path` | Sets the storage path of the certificate file. |
  | `-ssl_private_key_path` | Sets the storage path of the private key file. |

  For information on more parameters, see the [project repository](https://github.com/vesoft-inc/nebula-console/tree/{{console.branch}}).
