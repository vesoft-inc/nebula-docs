# Nebula Console

Nebula Console is a native CLI client for Nebula Graph. It can be used to connect a Nebula Graph cluster and execute queries. It can also support special commands to manage parameters, export CSV files, export DOT files, import test datasets, etc. This topic describes these special commands.

To connect Nebula Graph using Nebula Console, see [Step 3: Connect to Nebula Graph](2.quick-start/3.connect-to-nebula-graph.md).

!!! note

    The commands are case insensitive.

## Manage parameters

You can save parameters for parameterized queries.

!!! note

    - Parameters are not supported in VID.

    - Parameters are not supported in sample clause.

    - Saving multiple parameters at a time is not supported.

    - Parameters are not retained after the session is released.

The command to save a parameter is as follows:

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

The command to view the saved parameters is as follows:

```ngql
nebula> :params;
```

## Export a CSV file

CSV files save the returned result of a executed command.

!!! note

    - A CSV file will be saved in the working directory, i.e., what the linux command `pwd` shows.

    - This command only works for the next query statement.

The command to export a csv file is as follows:

```ngql
nebula> :CSV <file_name.csv>;
```

## Export a DOT file

DOT files save the returned result of a executed command, and the resulted information is different from that of CSV files.

!!! Note

    - A DOT file will be saved in the working directory, i.e., what the linux command `pwd` shows.

    - You can copy the contents of the DOT file and paste them in [GraphvizOnline](https://dreampuf.github.io/GraphvizOnline/) to generate a visualized execution plan.

    - This command only works for the next query statement.

The command to export a DOT file is as follows:

```ngql
nebula> :dot <file_name.dot>
```

The example is as follows:

```ngql
nebula> :dot a.dot
nebula> PROFILE FORMAT="dot" GO FROM "player100" OVER follow;
```

## Import a testing dataset

The testing dataset is named `nba`. To view details about the schema and data, use the corresponding `SHOW` command.

The command to import a testing dataset is as follows:

```ngql
nebula> :play nba
```

## Run a command multiple times

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

## Sleep to wait

This command will make Nebula Graph services sleep and wait for N seconds. The schema is altered in an async way and takes effect in the next heartbeat cycle. Therefore, this command is usually used when altering schema. The command is as follows:

```ngql
nebula> :sleep N
```

## Disconnect Nebula Console from Nebula Graph

You can use `:EXIT` or `:QUIT` to disconnect from Nebula Graph. For convenience, Nebula Console supports using these commands in lower case without the colon (":"), such as `quit`.

The example is as follows:

```ngql
nebula> :QUIT

Bye root!
```

## FAQ

### "How can I install Nebula Console from the source code?"

To download and compile the latest source code of Nebula Console, follow the instructions on [the nebula console GitHub page](https://github.com/vesoft-inc/nebula-console#build-nebula-graph-console).
