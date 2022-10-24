# FAQ

This topic lists the frequently asked questions for using NebulaGraph Explorer. You can use the search box in the help center or the search function of the browser to match the questions you are looking for.

## Will the Dag Controller service crash if the Graph service returns too much result data?

The Dag Controller service only provides scheduling capabilities and will not crash, but the NebulaGraph Analytics service may crash due to insufficient memory when writing too much data to HDFS or NebulaGraph, or reading too much data from HDFS or NebulaGraph.

## Can I continue a job from a failed task?

Not supported. You can only re-execute the entire job.

## How can I speed it up if a task result is saved slowly or data is transferred slowly between tasks?

The Dag Controller contains graph query components and graph computing components. Graph queries send requests to a graph service for queries, so the graph queries can only be accelerated by increasing the memory of the graph service. Graph computing is performed on distributed nodes provided by NebulaGraph Analytics, so graph computing can be accelerated by increasing the size of the NebulaGraph Analytics cluster.

## The HDFS server cannot be connected and the task status is running.

Set the timeout period and times for HDFS connections as follows:

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

## How to resolve the error  `bash: /home/xxx/nebula-analytics/scripts/run_algo.sh: No such file or directory`?

Modify the configuration file `dag-ctrl/etc/tasks.yaml`to configure the algorithm execution path parameter `exec_file`.

## How to resolve the error `/lib64/libm.so.6: version 'GLIBC_2.29' not found (required by /home/vesoft/jdk-18.0.1/jre/lib/amd64/server/libjvm.so)`?

Because the operating system version does not support JDK18, the command `YUM` cannot download `GLIBC_2.29`, you can install JDK1.8. Does not forget to change the JDK address in `nebula-analytics/scripts/set_env.sh`.

## How to resolve the error `handshake failed: ssh: unable to authenticate, attempted methods [none publickey], no supported methods remain`?

Reconfigure the permissions to `744` on the folder `.ssh` and `600` on the file `.ssh/authorized_keys`.

## How to resolve the error `There are 0 NebulaGraph Analytics available. clusterSize should be less than or equal to it`?

The possible causes are as follows:

- The NebulaGraph Analytics has not been deployed. Configure the NebulaGraph Analytics as described in this document.

- The NebulaGraph Analytics has been deployed, but can not connect to the Dag Controller. For example, the IP address is incorrect, SSH is not configured, and the startup users of the two services are inconsistent (causing SSH login failures).

## How to resolve the error `broadcast.hpp:193] Check failed: (size_t)recv_bytes >= sizeof(chunk_tail_t) recv message too small: 0`?

The amount of data to be processed is too small, but the number of compute nodes and processes is too large. Smaller `clusterSize` and `processes` need to be set when submitting jobs.