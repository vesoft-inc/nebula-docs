# Deploy Nebula Graph cluster

This topic describes how to manually deploy a Nebula Graph cluster.

!!! note

    For now, Nebula Graph does not have an official deployment tool.

## Prerequisites

[Prepare hardware](1.resource-preparations.md) for deploying the cluster.

## Step 1: Install Nebula Graph

Install Nebula Graph on each machine in the cluster. Available approaches of installation are as follows.

* [Install Nebula Graph with RPM or DEB package](2.compile-and-install-nebula-graph/2.install-nebula-graph-by-rpm-or-deb.md)
* [Install Nebula Graph by compiling the source code](2.compile-and-install-nebula-graph/1.install-nebula-graph-by-compiling-the-source-code.md)

## Step 2: Modify the configurations

To deploy Nebula Graph according to your requirements, you have to modify the configuration files. All the configuration files for Nebula Graph, including `nebula-graphd.conf`, `nebula-metad.conf`, and `nebula-storaged.conf`, are stored in the `etc` directory in the installation path.

You only need to modify the configuration for the corresponding service on the machines. For example, modify `nebula-graphd.conf` on the machines where you want to deploy the Graph Service.

For how to prepare the configuration files, see:

* [Meta Service configurations](../5.configurations-and-logs/1.configurations/2.meta-config.md)
* [Graph Service configurations](../5.configurations-and-logs/1.configurations/3.graph-config.md)
* [Storage Service configurations](../5.configurations-and-logs/1.configurations/4.storage-config.md)

## Step 3: Start the cluster

Start the corresponding service on each machine. The command to start the Nebula Graph services is as follows.

```ngql
sudo /usr/local/nebula/scripts/nebula.service start <metad|graphd|storaged|all>
```

`/usr/local/nebula` is the default installation path for Nebula Graph. Use the actual path if you have customized the path.

For more information about how to start and stop the services, see [Manage Nebula Graph services](../2.quick-start/5.start-stop-service.md).

## Connect to the cluster

Connect to the Graph Service with a Nebula Graph client, such as Nebula Console. For more information, see [Connect to Nebula Graph](../2.quick-start/3.connect-to-nebula-graph.md).

## Check the cluster status

After connecting to the Nebula Graph cluster, run [`SHOW HOSTS`](../3.ngql-guide/7.general-query-statements/6.show/6.show-hosts.md) to check the cluster status.
