# Workflow overview

NebulaGraphExplorer supports visual and complex graph computing with custom workflows.

## Background

NebulaGraphExplorer provides multiple components, including graph query and graph computing components. Users can combine these components based on the scheduling tool Dag Controller for free. For example, using the output of a graph query component as an input to a graph computing component. The whole process is a directed acyclic workflow.

![workflow-example](https://docs-cdn.nebula-graph.com.cn/figures/ex-workflow-example-220621.png)

Instantiate the workflow when performing graph computing. The instantiated component is called **task**, and the instantiated workflow is called **job**. A job can consist of multiple tasks. The NebulaGraphExplorer sends the job to NebulaGraphAnalytics for graph computing, and you can view the result in the job list.

## Features

- Add, view, modify, delete, compare, clone and rename workflows.
- A workflow supports one query component and multiple graph computing components. You can search for, add, configure, and rename component.
- View the lists, progresses, results and logs of the jobs, and rerun jobs.
- Search for workflows or jobs.

## Precautions

- Additional deployment of the Dag Controller and the NebulaGraphAnalytics is required to use a workflow. For details, see [Deploy dependent services](../../graph-computing/0.deploy-controller-analytics.md).

- The input to the graph query component can only be the nGQL.

- The results of a graph query component can only be stored in the HDFS, which is convenient to be called by multiple algorithms.

- The input to the graph computing component can be the specified data in the NebulaGraph or HDFS, or can depend on the results of the graph query component.
  If an input depends on the results of the previous graph query component, the graph computing component must be fully connected to the graph query component, that is, the white output anchors of the previous graph query component are all connected to the white input anchors of the graph compute component.

- The parameters of some algorithms can also depend on the upstream components.

- The result of the graph computing components can be stored in the NebulaGraph or HDFS, but not all algorithm results are suitable to be stored in NebulaGraph. Some algorithms can only be saved in HDFS when configuring the save results page.

## Algorithm description

See [Algorithm description](../../graph-computing/algorithm-description.md).
