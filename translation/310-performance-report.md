# Nebula Graph v3.1.0 Performance Report

This is a performance report for Nebula Graph [v3.1.0](https://github.com/vesoft-inc/nebula/tree/release-3.1).

## Test result

The query and data import performance of Nebula Graph v3.1.0 is almost the same as that of v3.0.0. Some new test cases have been added to this test for `MATCH` statements that have been optimized for property reading, and the property reading performance is significantly improved compared to v3.0.0.

## Test environment

The server and the pressure test server are all physical computer servers.

![test environment](https://docs-cdn.nebula-graph.com.cn/figures/image2021-8-23_10-38-55.png)

## Test data

The test data is the LDBC-SNB SF100 data set with a size of 100 GB, a total of 282,386,021 vertexes, and 1,775,513,185 edges. The number of partitions of the test graph space is 24, and the number of replicas is 3.

## About LDBC-SNB

The Linked Data Benchmark Council (LDBC) is a project that aims to develop benchmarks for graph and RDF data management systems. Social Network Benchmark (SNB) is one of the software benchmarks developed by LDBC. For details about the LDBC-SNB data set, refer to the following documents:

- [LDBC-SNB Specification](https://ldbcouncil.org/ldbc_snb_docs/ldbc-snb-specification.pdf)
- [LDBC-SNB DOCs](https://github.com/ldbc/ldbc_snb_docs)
- [LDBC-SNB Data Generator (Datagen)](https://github.com/ldbc/ldbc_snb_datagen_spark)

## Nebula Commit

- nebula-graphd version 33fd35e
- nebula-storaged version 33fd35e

## Test description

1. [K6](https://k6.io/), developed based on Golang, is used as the load testing tool, and [nebula-go](https://github.com/vesoft-inc/nebula-go) is used as the client.

2. The `vu` in `50_vu` and `100_vu` on the horizontal axis indicates `virtual user`, i.e. the number of concurrent users in the performance test. `50_vu` indicates 50 concurrent users, `100_vu` indicates 100 concurrent users, and so on...

3. Nebula Graph v3.0.0 is used as the performance baseline.

4. ResponseTime =server-side processing time + network delay time + client-side deserializing time.

## Test cases and results

Only the newly added test cases for `MATCH` statements are listed.

### MatchTest1

match (v:Person) where id(v) == {} return count(v.Person.firstName)

### MatchTest2

match (v:Person)-[e:KNOWS]-(v2) where id(v) == {} and v2.Person.locationIP != 'yyy' return length(v.Person.browserUsed) + length(v2.Person.gender)

### MatchTest3

match (v:Person)-[e:KNOWS]-(v2) where id(v) == {} and v2.Person.locationIP != 'yyy' with v, v2 as v3 return length(v.Person.browserUsed) + (v3.Person.gender)

### MatchTest4

MATCH (m)-[:KNOWS]-(n) WHERE id(m)=={} OPTIONAL MATCH (n)<-[:KNOWS]-(l) RETURN length(m.Person.lastName) AS n1, length(n.Person.lastName) AS n2, l.Person.creationDate AS n3 ORDER BY n1, n2, n3 LIMIT 10

### MatchTest5

MATCH (m)-[:KNOWS]-(n) WHERE id(m)=={} MATCH (n)-[:KNOWS]-(l) WITH m AS x, n AS y, l RETURN x.Person.firstName AS n1, y.Person.firstName AS n2, CASE WHEN l.Person.firstName is not null THEN l.Person.firstName WHEN l.Person.gender is not null THEN l.Person.birthday ELSE 'null' END AS n3 ORDER BY n1, n2, n3 LIMIT 10

## 3.1.0 vs 3.0.0（Baseline）

The following test data selects the value of P99.

### MatchTest1

match (v:Person) where id(v) == {} return count(v.Person.firstName)

### MatchTest2

match (v:Person)-[e:KNOWS]-(v2) where id(v) == {} and v2.Person.locationIP != 'yyy' return length(v.Person.browserUsed) + length(v2.Person.gender)

### MatchTest3

match (v:Person)-[e:KNOWS]-(v2) where id(v) == {} and v2.Person.locationIP != 'yyy' with v, v2 as v3 return length(v.Person.browserUsed) + (v3.Person.gender)

### MatchTest4

MATCH (m)-[:KNOWS]-(n) WHERE id(m)=={} OPTIONAL MATCH (n)<-[:KNOWS]-(l) RETURN length(m.Person.lastName) AS n1, length(n.Person.lastName) AS n2, l.Person.creationDate AS n3 ORDER BY n1, n2, n3 LIMIT 10

### MatchTest5

MATCH (m)-[:KNOWS]-(n) WHERE id(m)=={} MATCH (n)-[:KNOWS]-(l) WITH m AS x, n AS y, l RETURN x.Person.firstName AS n1, y.Person.firstName AS n2, CASE WHEN l.Person.firstName is not null THEN l.Person.firstName WHEN l.Person.gender is not null THEN l.Person.birthday ELSE 'null' END AS n3 ORDER BY n1, n2, n3 LIMIT 10

You are welcome to check out GitHub for [Nebula Graph v3.1.0](https://github.com/vesoft-inc/nebula/releases/tag/v3.1.0). 