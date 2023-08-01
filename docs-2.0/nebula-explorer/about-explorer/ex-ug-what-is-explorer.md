# What is NebulaGraph Explorer

NebulaGraph Explorer (Explorer in short) is a browser-based visualization tool. It is used with the NebulaGraph core to visualize interaction with graph data. Even if there is no experience in graph database, you can quickly become a graph exploration expert.

!!! enterpriseonly

    - To purchase the NebulaGraph Explorer, [contact us](https://www.nebula-graph.io/contact). 
    - New users can [apply for a 30-day trial](https://www.nebula-graph.io/visualization-tools-free-trial). You can also try some functions online in [Explorer](https://explorer.nebula-graph.io/).

!!! Note

    

## Scenarios

You can use Explorer in one of these scenarios:

- You need to quickly find neighbor relationships from complex relationships, analyze suspicious targets, and display graph data in a visual manner.
- For large-scale data sets, the data needs to be filtered, analyzed, and explored in a visual manner.

## Features

Explorer has these features:

- [Easy to use](../deploy-connect/ex-ug-deploy.md): Explorer can be deployed in simple steps.

- [User-friendly](../12.query-visually.md): Explorer uses simple visual interaction, no need to conceive nGQL sentences, easy to realize graph exploration.

- [Flexible](../graph-explorer/ex-ug-query-exploration.md): Explorer supports querying data through VID, Tag, and Subgraph.

- [Exploration operations](../graph-explorer/ex-ug-graph-exploration.md): Explorer supports exploration operations on multiple vertices, querying the common neighbors of multiple vertices, and querying the path between the source vertex and the destination vertex.

- [Various display](../canvas-operations/canvas-overview.md): Explorer supports modifying the color and icon of the vertex in the canvas to highlight key nodes. Data can also be displayed in different modes.

- [Data storage](../canvas-operations/canvas-snapshot.md): Data on a canvas can be stored and exported.

- [Inline frame](../iframe.md): Explorer supports embedding the canvas on third-party pages.

## Authentication

Authentication is not enabled in NebulaGraph by default. Users can log into Studio with the `root` account and any password.

When NebulaGraph enables authentication, users can only sign into Studio with the specified account. For more information, see [Authentication](../../7.data-security/1.authentication/1.authentication.md).


## Version compatibility

!!! Note

    Explorer is released separately, not synchronized with NebulaGraph. And the version naming of Explorer is different from that of NebulaGraph. The version correspondence between NebulaGraph and Explorer is as follows.

| NebulaGraph version | Explorer version |
| --- | --- |
| 3.5.0         | 3.5.1、3.5.0、3.4.0   |
| 3.4.0 ~ 3.4.1 | 3.5.1、3.5.0、3.4.0、3.2.1、3.2.0   |
| 3.3.0 | 3.2.1, 3.2.0|
| 3.1.0 ~ 3.2.x| 3.1.0|
| 3.0.0 ~ 3.1.0 | 3.0.0  |
| 2.5.x ~ 3.0.0| 2.2.0|
| 2.6.x | 2.1.0 |
| 2.5.x | 2.0.0 |


## Video

- [NebulaGraph Explorer Intro Demo](https://www.youtube.com/watch?v=1Hj5puN9jeg)(5 minutes 22 seconds)

<iframe width="560" height="315" src="https://www.youtube.com/embed/1Hj5puN9jeg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
