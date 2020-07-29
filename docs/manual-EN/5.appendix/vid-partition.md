# Vertex Identifier and Partition

This document provides some introductions on vertex identifier (`VID` for short) and partition.

In **Nebula Graph**, vertices are identified with vertex identifiers (i.e. VIDs). When inserting a vertex, you can either assign an id manually or use the hash function to generate an id for the vertex. The `VID` must be unique in the graph space.

When querying in a **Nebula Graph** cluster, data has to be exchanged between different cluster nodes if the data is sharded into different partitions and therefore residing on multiple nodes. In particular graph traversals are usually executed on a Coordinator, because they need global information. This results in a lot of network traffic and potentially slow query execution.

To achieve single-server alike query execution times for graph queries in a cluster, you need to shard vertices based on their tags so that vertices with the same tags are stored on the same partition. This can improve data locality and reduce the number of network hops between cluster nodes.

If you want all the vertices with the same tag to store on the same partition, you need to make sure that all the vertex VIDs have the same modulus. And all edges connecting these vertices are stored on this partition as well.
