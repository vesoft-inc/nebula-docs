# Processing super vertices

## Principle introduction

In graph theory, a super vertex, also known as a dense vertex, is a vertex with an extremely high number of adjacent edges. The edges can be outgoing or incoming.

Super vertices are very common because of the power-law distribution. For example, popular leaders in social networks (Internet celebrities), top stocks in the stock market, Big Four in the banking system, hubs in transportation networks, websites with high clicking rates on the Internet, and best sellers in E-commerce.

In Nebula Graph {{ nebula.release }}, a `vertex` and its `properties` form a `key-value pair`, with its `VID` and other meta information as the `key`. Its `Out-Edge Key-Value` and `In-Edge Key-Value` are stored in [the same partition](../1.introduction/3.nebula-graph-architecture/4.storage-service.md) in the form of LSM-trees in hard disks and caches.

Therefore, `directed traversals from this vertex` and `directed traversals ending at this vertex` both involve either `a large number of sequential IO scans` (ideally, after [Compaction](../8.service-tuning/compaction.md) or a large number of `random IO` (frequent writes to `the vertex` and its `ingoing and outgoing edges`).

As a rule of thumb, a vertex is considered dense when the number of its edges exceeds 10,000. Some special cases require additional consideration。

!!! Note

    In Nebula Graph {{ nebula.release }}, there is not any data structure to store the out/in degree for each vertex. Therefore, there is no direct method to know whether it is a super vertex or not. You can try to use Spark to count the degrees periodically. 

### Indexes for duplicate properties

In a property graph, there is another class of cases similar to super vertices: **a property has a very high duplication rate**, i.e., many vertices with the same `tag` but different `VIDs` have identical property and property values.

Property indexes in Nebula Graph {{ nebula.release }} are designed to reuse the functionality of RocksDB in the Storage Service, in which case indexes are modeled as `keys with the same prefix`. If the lookup of a property fails to hit the cache, it is processed as a random seek and a sequential prefix scan on the hard disk to find the corresponding VID. After that, the graph is usually traversed from this vertex, so that another random read and sequential scan for the corresponding key-value of this vertex will be triggered. The higher the duplication rate, the larger the scan range.

For more information about property indexes, see [How indexing works in Nebula Graph](https://nebula-graph.io/posts/how-indexing-works-in-nebula-graph/).

Usually, special design and processing are required when the number of duplicate property values exceeds 10,000.

### Suggested solutions

#### Solutions at the database end

1. [Truncation](../5.configurations-and-logs/1.configurations/4.storage-config.md): Only return a certain number (a threshold) of edges, and do not return other edges exceeding this threshold.
2. [Compact](../8.service-tuning/compaction.md): Reorganize the order of data in RocksDB to reduce random reads and increase sequential reads.

#### Solutions at the application end

Break up some of the super vertices according to their business significance:

- Delete multiple edges and merge them into one.

  For example, in the transfer scenario `(Account_A)-[TRANSFER]->(Account_B)`, each transfer record is modeled as an edge between account A and account B, then there may be tens of thousands of transfer records between `(Account_A)` and `(Account_B)`.

  In such scenarios, merge obsolete transfer details on a daily, weekly, or monthly basis. That is, batch-delete old edges and replace them with a small number of edges representing `monthly total` and `times`. And keep the transfer details of the latest month.

- Split an edge into multiple edges of different types.

  For example, in the `(Airport)<-[DEPART]-(Flight)` scenario, the departure of each flight is modeled as an edge between a flight and an airport. Departures from a big airport might be enormous.

  According to different airlines, divide the `DEPART` edge type into finer edge types, such as `DEPART_CEAIR`, `DEPART_CSAIR`, etc. Specify the departing airline in queries (graph traversal).

- Split vertices.

  For example, in the loan network `(person)-[BORROW]->(bank)`, large bank A will have a very large number of loans and borrowers.

  In such scenarios, you can split the large vertex A into connected sub-vertices A1, A2, and A3.

  ```text
  (Person1)-[BORROW]->(BankA1), (Person2)-[BORROW]->(BankA2), (Person2)-[BORROW]->(BankA3);
  (BankA1)-[BELONGS_TO]->(BankA), (BankA2)-[BELONGS_TO]->(BankA), (BankA3)-[BELONGS_TO]->(BankA).
  ```

  A1, A2, and A3 can either be three real branches of bank A, such as Beijing branch, Shanghai branch, and Zhejiang branch, or three virtual branches set up according to certain rules, such as `A1: 1-1000, A2: 1001-10000 and A3: 10000+` according to the number of loans. In this way, any operation on A is converted into three separate operations on A1, A2, and A3.
