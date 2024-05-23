# NebulaGraph Console

NebulaGraph Console is a native CLI client for NebulaGraph. It can be used to connect a NebulaGraph cluster and execute queries. It also supports special commands to manage parameters, export query results, import test datasets, etc.

## Compatibility with NebulaGraph

See [github](https://github.com/vesoft-inc/nebula-console/tree/{{console.branch}}#compatibility-matrix).

## Obtain NebulaGraph Console

You can obtain NebulaGraph Console in the following ways:

<!-- - Obtain the binary file of NebulaGraph Console from the `bin` directory in the NebulaGraph installation path. -->

- Download the binary file from the [GitHub releases page](https://github.com/vesoft-inc/nebula-console/releases "the nebula-console Releases page").

- Compile the source code to obtain the binary file. For more information, see [Install from source code](https://github.com/vesoft-inc/nebula-console#from-source-code).

## NebulaGraph Console functions

### Connect to NebulaGraph

To connect to NebulaGraph with the `nebula-console` file, use the following syntax:

```bash
<path_of_console> -addr <ip> -port <port> -u <username> -p <password>
```

- `path_of_console` indicates the storage path of the NebulaGraph Console binary file.
- When two-way authentication is required after SSL encryption is enabled, you need to specify SSL-related parameters when connecting.

For example:

- Connect to NebulaGraph over HTTP/1.1

  ```bash
  ./nebula-console -addr 192.168.8.100 -port 9669 -u root -p nebula
  ```

- Enable SSL encryption with a private CA certificate

  ```bash
  ./nebula-console -addr 192.168.8.100 -port 9669 -u root  -p nebula -enable_ssl -ssl_root_ca_path /home/xxx/cert/root.crt -ssl_cert_path /home/xxx/cert/client.crt -ssl_private_key_path /home/xxx/cert/client.key
  ```

- Enable SSL encryption with a trusted CA certificate

  ```bash
  ./nebula-console -addr nebula-graph-ncnj7ss1ssfnnb4eqq88g.aws.dev.cloud.nebula-graph.io -port 9669 -u root -p nebula -enable_ssl 
  ```

Parameter descriptions are as follows:

| Parameter | Description |
| - | - |
| `-h/-help` | Shows the help menu. |
| `-addr/-address` | Sets the IP or hostname of the Graph service. The default address is 127.0.0.1. <!--If NebulaGraph is deployed on [NebulaGraph Cloud](https://docs.nebula-graph.io/3.1.0/nebula-cloud/1.what-is-cloud/), you need to create a Private Link and set the IP or hostname of the Private Endpoint as the parameter value.--> |
| `-P/-port` | Sets the port number of the graphd service. The default port number is 9669. |
| `-u/-user` | Sets the username of your NebulaGraph account. Before enabling authentication, you can use any existing username. The default username is `root`. |
| `-p/-password` | Sets the password of your NebulaGraph account. Before enabling authentication, you can use any characters as the password. If not specified, a prompt appears requesting the password.|
| `-t/-timeout`  | Sets an integer-type timeout threshold of the connection. The unit is millisecond. The default value is 120. |
| `-e/-eval` | Sets a string-type nGQL statement. The nGQL statement is executed once the connection succeeds. The connection stops after the result is returned. |
| `-f/-file` | Sets the path of an nGQL file. The nGQL statements in the file are executed once the connection succeeds. The result will be returned and the connection stops then. |
| `-enable_ssl` | Enables SSL encryption when connecting to NebulaGraph. |
| `-ssl_root_ca_path` | Sets the path to the root cerificate signed by a private Certifcate Authority (CA). |
| `-ssl_cert_path` | Sets the path to the certificate of the client. |
| `-ssl_private_key_path` | Sets the path to the private key of the client. |
|`-ssl_insecure_skip_verify`| Specifies whether the client skips verifying the server's certificate chain and hostname. The default is `false`. If set to `true`, any certificate chain and hostname provided by the server is accepted.|

For information on more parameters, see the [project repository](https://github.com/vesoft-inc/nebula-console/tree/{{console.branch}}).

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

Export query results,  which can be saved as a CSV file, DOT file, and a format of Profile or Explain.

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

- The command to export a PROFILE or EXPLAIN format is as follows: 

  ```ngql
  nebula> :profile <file_name>;
  ```
  or

  ```ngql
  nebula> :explain <file_name>;
  ```

  !!! note

        The text file output by the above command is the preferred way to report issues in GitHub and execution plans in forums, and for graph query tuning because it has more information and is more readable than a screenshot or CSV file in Studio.

  The example is as follows:

  ```ngql
  nebula> :profile profile.log
  nebula> PROFILE GO FROM "player102" OVER serve YIELD dst(edge);
  nebula> :profile profile.dot
  nebula> PROFILE FORMAT="dot" GO FROM "player102" OVER serve YIELD dst(edge);
  nebula> :explain explain.log
  nebula> EXPLAIN GO FROM "player102" OVER serve YIELD dst(edge);
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

This command will make NebulaGraph Console sleep for N seconds. The schema is altered in an async way and takes effect in the next heartbeat cycle. Therefore, this command is usually used when altering schema. The command is as follows:

```ngql
nebula> :sleep N
```

### Disconnect NebulaGraph Console from NebulaGraph

You can use `:EXIT` or `:QUIT` to disconnect from NebulaGraph. For convenience, NebulaGraph Console supports using these commands in lower case without the colon (":"), such as `quit`.

The example is as follows:

```ngql
nebula> :QUIT

Bye root!
```
