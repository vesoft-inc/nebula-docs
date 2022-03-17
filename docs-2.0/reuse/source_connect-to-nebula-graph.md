This topic provides basic instruction on how to use the native CLI client Nebula Console to connect to Nebula Graph.

Nebula Graph supports multiple types of clients, including a CLI client, a GUI client, and clients developed in popular programming languages. For more information, see the [client list](../14.client/1.nebula-client.md).

## Prerequisites

* You have started [Nebula Graph services](https://docs.nebula-graph.io/{{nebula.release}}/4.deployment-and-installation/manage-service/).<!--Use the external link here because this file is a source for reuse and using internal links creates errors.-->

* The machine on which you plan to run Nebula Console has network access to the Graph Service of Nebula Graph.

* The Nebula Console version is compatible with the Nebula Graph version.

  !!! note
  
        Nebula Console and Nebula Graph of the same version number are the most compatible. There may be compatibility issues when connecting to Nebula Graph with a different version of Nebula Console. The error message `incompatible version between client and server` is displayed when there is such an issue.

### Steps

1. Enter the `bin` directory in the installation path of Nebula Graph and find the binary file `nebula-console`.

  !!! note
        Only the binary file for Linux systems exists in the `bin` directory. For how to obtain the binary file for Windows systems, see [Obtain Nebula Console](../nebula-console.md).

2. Run the following command to connect to Nebula Graph.

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
  | `-addr/-address` | Sets the IP address of the Graph service. The default address is 127.0.0.1. If Nebula Graph is deployed on [Nebula Cloud](https://docs.nebula-graph.io/2.6.2/nebula-cloud/1.what-is-cloud/), you need to create a Private Link and set the IP address of the Private Endpoint as the parameter value. |
  | `-P/-port` | Sets the port number of the graphd service. The default port number is 9669. |
  | `-u/-user` | Sets the username of your Nebula Graph account. Before enabling authentication, you can use any existing username. The default username is `root`. |
  | `-p/-password` | Sets the password of your Nebula Graph account. Before enabling authentication, you can use any characters as the password. |
  | `-t/-timeout`  | Sets an integer-type timeout threshold of the connection. The unit is second. The default value is 120. |
  | `-e/-eval` | Sets a string-type nGQL statement. The nGQL statement is executed once the connection succeeds. The connection stops after the result is returned. |
  | `-f/-file` | Sets the path of an nGQL file. The nGQL statements in the file are executed once the connection succeeds. The result will be returned and the connection stops then. |
  | `-enable_ssl` | Enable SSL encryption when connecting to Nebula Graph. |
  | `-ssl_root_ca_path` | Set the storage path of the certification authority file. |
  | `-ssl_cert_path` | Set the storage path of the certificate file. |
  | `-ssl_private_key_path` | Set the storage path of the private key file. |

  For information on more parameters, see the [project repository](https://github.com/vesoft-inc/nebula-console/tree/{{console.branch}}).