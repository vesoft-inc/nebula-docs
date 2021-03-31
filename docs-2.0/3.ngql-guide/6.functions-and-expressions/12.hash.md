# Hash

This document gives some explain about the `hash()` function used in nGQL.

The source code of hashing function (`MurmurHash2`), seed (`0xc70f6907UL`) and other parameters can be found in [this C++ MurmurHahs2.h file](https://github.com/vesoft-inc/nebula-common/blob/master/src/common/base/MurmurHash2.h).

For Java, call like follows.

```Java
MurmurHash2.hash64("to_be_hashed".getBytes(),"to_be_hashed".getBytes().length, 0xc70f6907)
```

In nGQL text, call like follows.

```ngql
nebula> YIELD hash("to_be_hashed")
+----------------------+
| hash(to_be_hashed)   |
+----------------------+
| -1098333533029391540 |
+----------------------+
nebula> YIELD hash(-1)
+------------+
| hash(-(1)) |
+------------+
| -1         |
+------------+
```

> **NOTE**: Roughly, The chance of collision is about 1/10 in the case of 1 billion vertices. (The number of edges are irrelevant to the collision possibility).
