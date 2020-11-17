# Vertex Identifier and Partition

This document provides some introductions to vertex identifier (`VID` for short) and partition.

In **Nebula Graph**, vertices are identified with vertex identifiers (i.e. `VID`s). When inserting a vertex, you must specify a `VID` for it. You can generate `VID`s either with your own application or with the hash function provided by **Nebula Graph**.

`VID`s must be unique in a graph space. That is, in the same graph space, vertices with the same `VID` are considered as the same vertex. `VID`s in different graph spaces are independent of each other. In addition, one `VID` can have multiple `TAG`s.

When inserting data into **Nebula Graph**, vertices and edges are distributed across different partitions. And the partitions are located on different machines. If you want some certain vertices to locate on the same partition (i.e. on the same machine), you can control the generation of the `VID`s by using the following formula.

The relation between `VID` and partition is:

```text
VID mod partition_number = partition ID + 1
```

In the preceding formula,

- `mod` is the modulo operation.
- `partition_number` is the number of partition for the graph space where the `VID` is located, namely the value of `partition_num` in the [CREATE SPACE](../2.query-language/4.statement-syntax/1.data-definition-statements/create-space-syntax.md) statement.
- `partition ID` is the ID for the partition where the `VID` is located.

For example, if there are 100 partitions, the vertices with `VID` 1, 101, 1001 will be stored on the same partition.

In addition, the correspondence between the `partition ID` and the machines are random. Therefore, you can't assume that any two partitions are located on the same machine.
