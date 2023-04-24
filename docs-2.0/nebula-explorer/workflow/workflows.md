# Workflow overview

NebulaGraph Explorer supports visual and complex graph computing with custom workflows.

## Background

NebulaGraph Explorer provides multiple components, including graph query and graph computing components. Users can combine these components based on the scheduling tool Dag Controller for free. For example, using the output of a graph query component as an input to a graph computing component. The whole process is a directed acyclic workflow.

![workflow-example](https://docs-cdn.nebula-graph.com.cn/figures/ex-workflow-example-220621.png)

Instantiate the workflow when performing graph computing. The instantiated component is called **task**, and the instantiated workflow is called **job**. A job can consist of multiple tasks. The NebulaGraph Explorer sends the job to NebulaGraph Analytics for graph computing, and you can view the result in the job list.

## Features

- Add, view, modify, delete, compare, clone and rename workflows.
- A workflow supports one query component and multiple graph computing components. You can search for, add, configure, and rename component.
- View the lists, progresses, results and logs of the jobs, and rerun jobs.
- Search for workflows or jobs.

## Precautions

- The **Workflow** page can be displayed only when **Workflow** is enabled in ![setting](https://docs-cdn.nebula-graph.com.cn/figures/navbar-setting-0105.png).

- Additional deployment of the Dag Controller and the NebulaGraph Analytics is required to use a workflow. For details, see [NebulaGraph Analytics](../..//graph-computing/nebula-analytics.md) and [Deploy Explorer](../deploy-connect/ex-ug-deploy.md).

- The input to the graph query component can only be the nGQL.

- The results of a graph query component can be stored in the NFS by default and also in HDFS, which is convenient to be called by multiple algorithms.

- The input to the graph computing component can be the specified data in the NebulaGraph, NFS or HDFS, or can depend on the results of the graph query component.
  If an input depends on the results of the previous graph query component, the graph computing component must be fully connected to the graph query component, that is, the white output anchors of the previous graph query component are all connected to the white input anchors of the graph compute component.

- The parameters of some algorithms can also depend on the upstream components.

- The result of the graph computing components can be stored in the NebulaGraph, NFS or HDFS, but not all algorithm results are suitable to be stored in NebulaGraph. Some algorithms can only be saved in NFS or HDFS when configuring the save results page.

## Algorithm description

See [Algorithm description](../../graph-computing/algorithm-description.md).
