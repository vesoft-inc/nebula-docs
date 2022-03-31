# What is Nebula Explorer

Nebula Explorer (Explorer in short) is a browser-based visualization tool. It is used with the Nebula Graph core to visualize interaction with graph data. Even if there is no experience in graph database, you can quickly become a graph exploration expert.

!!! enterpriseonly

    Explorer is only available in the enterprise version.
    
!!! Note

    You can also try some functions online in [Explorer](https://explorer.nebula-graph.io/).


## Scenarios

You can use Explorer in one of these scenarios:

- You need to quickly find neighbor relationships from complex relationships, analyze suspicious targets, and display graph data in a visual manner.
- For large-scale data sets, the data needs to be filtered, analyzed, and explored in a visual manner.

## Features

Explorer has these features:

- [Easy to use](../deploy-connect/ex-ug-deploy.md): Explorer can be deployed in simple steps. And 

- [User-friendly](../ex-ug-shortcuts.md): Explorer uses simple visual interaction, no need to conceive nGQL sentences, easy to realize graph exploration.

- [Flexible](../ex-ug-query-exploration.md): Explorer supports querying data through visual query builder, VID, Tag, and Subgraph.

- [Exploration operations](../ex-ug-graph-exploration.md): Explorer supports exploration operations on multiple vertices, querying the common neighbors of multiple vertices, and querying the path between the source vertex and the destination vertex.

- [Various display](../canvas-operations/canvas-overview.md): Explorer supports modifying the color and icon of the vertex in the canvas to highlight key nodes. Data can also be displayed in different modes.

- [Data storage](../canvas-operations/canvas-snapshot.md): Data on a canvas can be stored and exported.

## Authentication

Authentication is not enabled in Nebula Graph by default. Users can log into Studio with the `root` account and any password.

When Nebula Graph enables authentication, users can only sign into Studio with the specified account. For more information, see [Authentication](../../7.data-security/1.authentication/1.authentication.md).
