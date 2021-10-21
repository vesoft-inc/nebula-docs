# What is Nebula Explorer

Nebula Explorer (Explorer in short) is a browser-based visualization tool. It is used with the Nebula Graph core to visualize interaction with graph data. Even if there is no experience in graph database, you can quickly become a graph exploration expert.

!!! enterpriseonly

    Explorer is only available in the enterprise version.
    
!!! Note

    You can also try some functions online in [Explorer](https://explorer.nebula-graph.io/).

![explorer](../figs/explorer-en.png)

## Scenarios

You can use Explorer in one of these scenarios:

- You need to quickly find neighbor relationships from complex relationships, analyze suspicious targets, and display graph data in a visual manner.
- For large-scale data sets, the data needs to be filtered, analyzed, and explored in a visual manner.

## Features

Explorer has these features:

- Easy to use and user-friendly: Explorer can be deployed in simple steps. And use simple visual interaction, no need to conceive nGQL sentences, easy to realize graph exploration.

- Flexible: Explorer supports querying data through VID, Tag, Subgraph.

- Multiple operations: Explorer supports operations such as expanding operations on multiple vertexes, querying the common neighbors of multiple vertexes, and querying the path between the start vertex and the end vertex.

- Various display: Explorer supports modifying the color and icon of the vertex in the canvas to highlight key nodes. You can also freely choose the data display mode in `dagre`, `force`, and `circular`.

## Authentication

Authentication is not enabled in Nebula Graph by default. Users can log into Studio with the `root` account and any password.

When Nebula Graph enables authentication, users can only sign into Studio with the specified account. For more information, see [Authentication](../../7.data-security/1.authentication/1.authentication.md).
