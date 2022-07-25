# Nebula Console

Nebula Console is a native CLI client for Nebula Graph. It can be used to connect a Nebula Graph cluster and execute queries. It also supports special commands to manage parameters, export query results, import test datasets, etc.

## Obtain Nebula Console

You can obtain Nebula Console in the following ways:

<!-- - Obtain the binary file of Nebula Console from the `bin` directory in the Nebula Graph installation path. -->

- Download the binary file from the [GitHub releases page](https://github.com/vesoft-inc/nebula-console/releases "the nebula-console Releases page").

- Compile the source code to obtain the binary file. For more information, see [Install from source code](https://github.com/vesoft-inc/nebula-console#from-source-code).

## Nebula Console functions

### Connect to Nebula Graph

To connect to Nebula Graph with the `nebula-console` file, use the following syntax:

```bash
<path_of_console> -addr <ip> -port <port> -u <username> -p <password>
```

`path_of_console` indicates the storage path of the Nebula Console binary file.

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

For example, to connect to the Graph Service deployed on 192.168.10.8, run the following command:

```bash
./nebula-console -addr 192.168.10.8 -port 9669 -u root -p thisisapassword
```

### Manage parameters

You can save parameters for parameterized queries.

!!! note

    - Setting a parameter as a VID in a query is not supported.

    - Parameters are not supported in `SAMPLE` clauses.

    - Parameters are deleted when their sessions are released.

- The command to save a parameter is as follows:

  ```ngql
  nebula> :param <param_name> => <param_value>;
  ```

  The example is as follows:

  ```ngql
  nebula> :param p1 => "Tim Duncan";
  nebula> MATCH (v:player{name:$p1})-[:follow]->(n)  RETURN v,n;
  +----------------------------------------------------+-------------------------------------------------------+
  | v                                                  | n                                                     |
  +----------------------------------------------------+-------------------------------------------------------+
  | ("player100" :player{age: 42, name: "Tim Duncan"}) | ("player125" :player{age: 41, name: "Manu Ginobili"}) |
  | ("player100" :player{age: 42, name: "Tim Duncan"}) | ("player101" :player{age: 36, name: "Tony Parker"})   |
  +----------------------------------------------------+-------------------------------------------------------+
  nebula> :param p2 => {"a":3,"b":false,"c":"Tim Duncan"};
  nebula> RETURN $p2.b AS b;
  +-------+
  | b     |
  +-------+
  | false |
  +-------+
  ```

- The command to view the saved parameters is as follows:

  ```ngql
  nebula> :params;
  ```

- The command to view the specified parameters is as follows:

  ```ngql
  nebula> :params <param_name>;
  ```

- The command to delete a specified parameter is as follows:

  ```ngql
  nebula> :param <param_name> =>;
  ```

### Export query results

Export query results,  which can be saved as a CSV file or DOT file.

!!! note

    - The exported file is stored in the working directory, i.e., what the linux command `pwd` shows.

    - This command only works for the next query statement.

    - You can copy the contents of the DOT file and paste them in [GraphvizOnline](https://dreampuf.github.io/GraphvizOnline/) to generate a visualized execution plan.

- The command to export a csv file is as follows:

  ```ngql
  nebula> :CSV <file_name.csv>;
  ```

- The command to export a DOT file is as follows:

  ```ngql
  nebula> :dot <file_name.dot>
  ```

  The example is as follows:

  ```ngql
  nebula> :dot a.dot
  nebula> PROFILE FORMAT="dot" GO FROM "player100" OVER follow;
  ```

### Import a testing dataset

The testing dataset is named `basketballplayer`. To view details about the schema and data, use the corresponding `SHOW` command.

The command to import a testing dataset is as follows:

```ngql
nebula> :play basketballplayer
```

### Run a command multiple times

To run a command multiple times, use the following command:

```ngql
nebula> :repeat N
```

The example is as follows:

```ngql
nebula> :repeat 3
nebula> GO FROM "player100" OVER follow YIELD dst(edge);
+-------------+
| dst(EDGE)   |
+-------------+
| "player101" |
| "player125" |
+-------------+
Got 2 rows (time spent 2602/3214 us)

Fri, 20 Aug 2021 06:36:05 UTC

+-------------+
| dst(EDGE)   |
+-------------+
| "player101" |
| "player125" |
+-------------+
Got 2 rows (time spent 583/849 us)

Fri, 20 Aug 2021 06:36:05 UTC

+-------------+
| dst(EDGE)   |
+-------------+
| "player101" |
| "player125" |
+-------------+
Got 2 rows (time spent 496/671 us)

Fri, 20 Aug 2021 06:36:05 UTC

Executed 3 times, (total time spent 3681/4734 us), (average time spent 1227/1578 us)
```

### Sleep

This command will make Nebula Console sleep for N seconds. The schema is altered in an async way and takes effect in the next heartbeat cycle. Therefore, this command is usually used when altering schema. The command is as follows:

```ngql
nebula> :sleep N
```

### Disconnect Nebula Console from Nebula Graph

You can use `:EXIT` or `:QUIT` to disconnect from Nebula Graph. For convenience, Nebula Console supports using these commands in lower case without the colon (":"), such as `quit`.

The example is as follows:

```ngql
nebula> :QUIT

Bye root!
```
