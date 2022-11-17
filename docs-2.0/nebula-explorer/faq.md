# FAQ

This topic lists the frequently asked questions for using NebulaGraph Explorer. You can use the search box in the help center or the search function of the browser to match the questions you are looking for.

## Will the Dag Controller service crash if the Graph service returns too much result data?

The Dag Controller service only provides scheduling capabilities and will not crash, but the NebulaGraph Analytics service may crash due to insufficient memory when writing too much data to HDFS or NebulaGraph, or reading too much data from HDFS or NebulaGraph.

## Can I continue a job from a failed task?

Not supported. You can only re-execute the entire job.

## How can I speed it up if a task result is saved slowly or data is transferred slowly between tasks?

The Dag Controller contains graph query components and graph computing components. Graph queries send requests to a graph service for queries, so the graph queries can only be accelerated by increasing the memory of the graph service. Graph computing is performed on distributed nodes provided by NebulaGraph Analytics, so graph computing can be accelerated by increasing the size of the NebulaGraph Analytics cluster.

## The HDFS server cannot be connected and the task status is running.

Set the timeout period for HDFS connections as follows:

```bash
<configuration>
<property>
    <name>ipc.client.connect.timeout</name>
    <value>3000</value>
</property>

<property>
    <name>ipc.client.connect.max.retries.on.timeouts</name>
    <value>3</value>
</property>
</configuration>
```

## How to resolve the error `Err:dial unix: missing address`?

Modify the configuration file `dag-ctrl/etc/dag-ctrl-api.yaml` to configure the `UserName` of the SSH.

## How to resolve the error `bash: /home/xxx/nebula-analytics/scripts/run_algo.sh: No such file or directory`?

Modify the configuration file `dag-ctrl/etc/tasks.yaml`to configure the algorithm execution path parameter `exec_file`.

## How to resolve the error `/lib64/libm.so.6: version 'GLIBC_2.29' not found (required by /home/vesoft/jdk-18.0.1/jre/lib/amd64/server/libjvm.so)`?

Because the operating system version does not support JDK18, the command `YUM` cannot download `GLIBC_2.29`, you can install JDK1.8. Does not forget to change the JDK address in `nebula-analytics/scripts/set_env.sh`.

## How to resolve the error `handshake failed: ssh: unable to authenticate, attempted methods [none publickey], no supported methods remain`?

Reconfigure the permissions to `744` on the folder `.ssh` and `600` on the file `.ssh/authorized_keys`.

## How to resolve the error `There are 0 NebulaGraph Analytics available. clusterSize should be less than or equal to it`?

Check according to the following procedure:

1. Check whether the configuration of SSH password-free login between nodes is successful. You can run the `ssh <user_name>@<node_ip>` command on the Dag Controller machine to check whether the login succeeds.

  !!! note

        If the Dag Controller and Analytics are on the same machine, you also need to configure SSH password-free login.

2. Check the configuration file of the Dag Controller.

  - Check whether the SSH user in `etc/dag-ctrl-api.yaml` is the same as the user who starts the Dag Controller service and the user who configs SSH password-free login.

  - Check whether the algorithm path in `etc/tasks.yaml` is correct.

  - Check whether Hadoop and Java paths in `scripts/set_env.sh` are correct.

3. Restart the Dag Controller for the settings to take effect.

## How to resolve the error  `no available namenodes: dial tcp xx.xx.xx.xx:8020: connect: connection timed out`?

Check whether the HDFS namenode port 8020 is open.

## How to resolve the error  `org.apache.hadoop.net.ConnectTimeoutException: 60000 millis timeout`?

Check whether the HDFS datanode port 50010 is open.

If the port is not opened, an error similar to the following may be reported:

- `Check failed: false close hdfs-file failed`
- `org.apache.hadoop.ipc.RemoteException(java.io.IOException): File /analytics/xx/tasks/analytics_xxx/xxx.csv could only be replicated to 0 nodes instead of minReplication`

## How to resolve the error `broadcast.hpp:193] Check failed: (size_t)recv_bytes >= sizeof(chunk_tail_t) recv message too small: 0`?

The amount of data to be processed is too small, but the number of compute nodes and processes is too large. Smaller `clusterSize` and `processes` need to be set when submitting jobs.
