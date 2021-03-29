# Vertex identifier and partition ID

## VID

`VID` is short for vertex identifier.

In Nebula Graph, vertices are identified with vertex identifiers (i.e. `VID`s). 
The VID can be an int64 or a fixed length string.
When inserting a vertex, you must specify a `VID` for it. 

You can also call `hash()` to generate an int64 VID if the graph has less than one billion vertices.

> `VID` must be unique in a graph space.

That is, in the same graph space, two vertices that have the same `VID` are considered as the same vertex.

In addition, one `VID` can have multiple `TAG`s. E.g., One person (`VID`) can have two roles (`tags`).

Two `VID`s in two different graph spaces are totally independent of each other.

## Partition ID

When inserting into Nebula Graph, vertices and edges are distributed across different partitions. And the partitions are located on different machines. If you want certain vertices to locate on the same partition (i.e., on the same machine), you can control the generation of the `VID`s by using the following [formula / code](https://github.com/vesoft-inc/nebula-common/blob/master/src/common/clients/meta/MetaClient.cpp).

```C++
    // If the length of the id is 8, we will treat it as int64_t to be compatible
    // with the version 1.0
    uint64_t vid = 0;
    if (id.size() == 8) {
        memcpy(static_cast<void*>(&vid), id.data(), 8);
    } else {
        MurmurHash2 hash;
        vid = hash(id.data());
    }
    PartitionID pId = vid % numParts + 1;
```

Roughly say, after hashing a fixed string to int64, (the hashing of int64 is the number itself), do modulo and then plus one.

```C++
pId = vid % numParts + 1;
```

In the preceding formula,

- `%` is the modulo operation.
- `numParts` is the number of partition for the graph space where the `VID` is located, namely the value of `partition_num` in the [CREATE SPACE](../9.space-statements/1.create-space.md) statement.
- `pId` is the ID for the partition where the `VID` is located.

For example, if there are 100 partitions, the vertices with `VID` 1, 101, 1001 will be stored on the same partition.

But, the mapping between the `partition ID` and the machine address is random. Therefore, you can't assume that any two partitions are located on the same machine.
