# WHERE

The `WHERE` clause filters the outputs by conditions.

`WHERE` works in the following queries:

* Native nGQL such as `GO` and `LOOKUP`.
* OpenCypher syntax such as `MATCH` and `WITH`.

## OpenCypher compatibility

* Using patterns in `WHERE` is not supported (TODO: planning), for example `WHERE (v)-->(v2)`.

* [Filtering on edge rank](#filter_on_edge_rank) is a native nGQL feature. It only applies to native nGQL such as `GO` and `LOOKUP` because the concept edge rank does not exist in openCypher.

## Basic usage

### Define conditions with boolean operators

Use the boolean operators `NOT`, `AND`, `OR`, and `XOR` to define conditions in `WHERE` clauses. For the precedence of the operators, see [Precedence](../5.operators/9.precedence.md).

```ngql
nebula> MATCH (v:player) \
        WHERE v.name == "Tim Duncan" \
        XOR (v.age < 30 AND v.name == "Yao Ming") \
        OR NOT (v.name == "Yao Ming" OR v.name == "Tim Duncan") \
        RETURN v.name, v.age;
+-------------------------+-------+
| v.name                  | v.age |
+-------------------------+-------+
| "Marco Belinelli"       | 32    |
+-------------------------+-------+
| "Aron Baynes"           | 32    |
+-------------------------+-------+
| "LeBron James"          | 34    |
+-------------------------+-------+
| "James Harden"          | 29    |
+-------------------------+-------+
| "Manu Ginobili"         | 41    |
+-------------------------+-------+
...
Got 50 rows (time spent 6152/6994 us)
```

```ngql
nebula> GO FROM "player100" \
        OVER follow \
        WHERE follow.degree > 90 \
        OR $$.player.age != 33 \
        AND $$.player.name != "Tony Parker";
+-------------+
| follow._dst |
+-------------+
| "player101" |
+-------------+
| "player125" |
+-------------+
Got 2 rows (time spent 3198/3877 us)
```

### Filter on properties

Use vertex or edge properties to define conditions in WHERE clauses.

* Filter on a vertex property:

    ```ngql
    nebula> MATCH (v:player)-[e]->(v2) \
            WHERE v2.age < 25 \
            RETURN v2.name, v2.age;
    +----------------------+--------+
    | v2.name              | v2.age |
    +----------------------+--------+
    | "Luka Doncic"        | 20     |
    +----------------------+--------+
    | "Kristaps Porzingis" | 23     |
    +----------------------+--------+
    | "Ben Simmons"        | 22     |
    +----------------------+--------+
    Got 3 rows (time spent 7382/8080 us)
    ```

    ```ngql
    nebula> GO FROM "player100" \
            OVER follow \
            WHERE $^.player.age >= 42;
    +-------------+
    | follow._dst |
    +-------------+
    | "player101" |
    +-------------+
    | "player125" |
    +-------------+
    Got 2 rows (time spent 1051/1668 us)
    ```

* Filter on an edge property:

    ```ngql
    nebula> MATCH (v:player)-[e]->() \
            WHERE e.start_year < 2000 \
            RETURN DISTINCT v.name, v.age;
    +--------------------+-------+
    | v.name             | v.age |
    +--------------------+-------+
    | "Shaquille O'Neal" | 47    |
    +--------------------+-------+
    | "Steve Nash"       | 45    |
    +--------------------+-------+
    | "Ray Allen"        | 43    |
    +--------------------+-------+
    | "Grant Hill"       | 46    |
    +--------------------+-------+
    | "Tony Parker"      | 36    |
    +--------------------+-------+
    ...
    Got 11 rows (time spent 7585/8154 us)
    ```

    ```ngql
    nebula> GO FROM "player100" \
            OVER follow \
            WHERE follow.degree > 90;
    +-------------+
    | follow._dst |
    +-------------+
    | "player101" |
    +-------------+
    | "player125" |
    +-------------+
    Got 2 rows (time spent 2815/3571 us)
    ```

### Filter on dynamically-calculated property

```ngql
nebula> MATCH (v:player) \
        WHERE v[toLower("AGE")] < 21 \
        RETURN v.name, v.age;
+---------------+-------+
| v.name        | v.age |
+---------------+-------+
| "Luka Doncic" | 20    |
+---------------+-------+
```

### Filter on the existence of a property

```ngql
nebula> MATCH (v:player) \
        WHERE exists(v.age) \
        RETURN v.name, v.age;
+-------------------------+-------+
| v.name                  | v.age |
+-------------------------+-------+
| "Boris Diaw"            | 36    |
+-------------------------+-------+
| "DeAndre Jordan"        | 30    |
+-------------------------+-------+
```

### Filter on edge rank

In nGQL, if a group of edges has the same source vertex, destination vertex, and properties, the only thing that distinguishes them is the rank. Use rank conditions in `WHERE` to filter such edges.

The following example creates a group of edges. The differences among the edges are their ranks and properties. Then the example uses a `GO` statement with a `WHERE` clause to filter the edges on ranks.

```ngql
nebula> CREATE SPACE test;
nebula> USE test;
nebula> CREATE EDGE e1(p1 int);
nebula> CREATE TAG person(p1 int);
nebula> INSERT VERTEX person(p1) VALUES "1":(1);
nebula> INSERT VERTEX person(p1) VALUES "2":(2);
nebula> INSERT EDGE e1(p1) VALUES "1"->"2"@0:(10);
nebula> INSERT EDGE e1(p1) VALUES "1"->"2"@1:(11);
nebula> INSERT EDGE e1(p1) VALUES "1"->"2"@2:(12);
nebula> INSERT EDGE e1(p1) VALUES "1"->"2"@3:(13);
nebula> INSERT EDGE e1(p1) VALUES "1"->"2"@4:(14);
nebula> INSERT EDGE e1(p1) VALUES "1"->"2"@5:(15);
nebula> INSERT EDGE e1(p1) VALUES "1"->"2"@6:(16);

// The return messages of the preceding statements are omitted in this example.

nebula> GO FROM "1" \
        OVER e1 \
        WHERE e1._rank>2 \
        YIELD e1._src, e1._dst, e1._rank AS Rank, e1.p1 | \
        ORDER BY Rank DESC;
====================================
| e1._src | e1._dst | Rank | e1.p1 |
====================================
| 1       | 2       | 6    | 16    |
------------------------------------
| 1       | 2       | 5    | 15    |
------------------------------------
| 1       | 2       | 4    | 14    |
------------------------------------
| 1       | 2       | 3    | 13    |
------------------------------------
```

## Filter on strings

Use `STARTS WITH`, `ENDS WITH`, or `CONTAINS` in `WHERE` to match a specific part of a string. String matching is case-sensitive.

### Match the beginning of a string

Use `STARTS WITH "T"` to match a player name that starts with `T`.

```ngql
nebula> MATCH (v:player) \
        WHERE v.name STARTS WITH "T" \
        RETURN v.name, v.age;
+------------------+-------+
| v.name           | v.age |
+------------------+-------+
| "Tracy McGrady"  | 39    |
+------------------+-------+
| "Tony Parker"    | 36    |
+------------------+-------+
| "Tim Duncan"     | 42    |
+------------------+-------+
| "Tiago Splitter" | 34    |
+------------------+-------+
Got 4 rows (time spent 5575/7203 us)
```

If you use `STARTS WITH "t"` in the preceding statement, an empty set is returned because no name in the dataset starts with the lowercase `t`.

```ngql
nebula> MATCH (v:player) \
        WHERE v.name STARTS WITH "t" \
        RETURN v.name, v.age;
Empty set (time spent 5080/6474 us)
```

### Match the ending of a string

Use `ENDS WITH "r"` to match a player name that ends with `r`.

```ngql
nebula> MATCH (v:player) \
        WHERE v.name ENDS WITH "r" \
        RETURN v.name, v.age;
+------------------+-------+
| v.name           | v.age |
+------------------+-------+
| "Vince Carter"   | 42    |
+------------------+-------+
| "Tony Parker"    | 36    |
+------------------+-------+
| "Tiago Splitter" | 34    |
+------------------+-------+
Got 3 rows (time spent 4934/5832 us)
```

### Match any part of a string

Use `CONTAINS "Pa"` to match a player name that contains `Pa`.

```ngql
nebula> MATCH (v:player) \
        WHERE v.name CONTAINS "Pa" \
        RETURN v.name, v.age;
+---------------+-------+
| v.name        | v.age |
+---------------+-------+
| "Paul George" | 28    |
+---------------+-------+
| "Tony Parker" | 36    |
+---------------+-------+
| "Paul Gasol"  | 38    |
+---------------+-------+
| "Chris Paul"  | 33    |
+---------------+-------+
Got 4 rows (time spent 3265/4113 us)
```

### Negative string matching

Use the boolean operator `NOT` to negate a string matching condition.

```ngql
nebula> MATCH (v:player) \
        WHERE NOT v.name ENDS WITH "R" \
        RETURN v.name, v.age;
+-------------------------+-------+
| v.name                  | v.age |
+-------------------------+-------+
| "Rajon Rondo"           | 33    |
+-------------------------+-------+
| "Rudy Gay"              | 32    |
+-------------------------+-------+
| "Dejounte Murray"       | 29    |
+-------------------------+-------+
| "Chris Paul"            | 33    |
+-------------------------+-------+
| "Carmelo Anthony"       | 34    |
+-------------------------+-------+
...
Got 51 rows (time spent 2622/3463 us)
```

<!--

[Not supported yet.]

## Use patterns in WHERE

### Filter on patterns

### Filter on patterns using NOT

### Filter on properties in patterns

### Filter on edge type

-->

## Filter on lists

### Match values in a list

Use the `IN` operator to check if a value is in a specific list.

```ngql
nebula> MATCH (v:player) \
        WHERE v.age IN range(20,25) \
        RETURN v.name, v.age;
+-------------------------+-------+
| v.name                  | v.age |
+-------------------------+-------+
| "Ben Simmons"           | 22    |
+-------------------------+-------+
| "Kristaps Porzingis"    | 23    |
+-------------------------+-------+
| "Luka Doncic"           | 20    |
+-------------------------+-------+
| "Kyle Anderson"         | 25    |
+-------------------------+-------+
| "Giannis Antetokounmpo" | 24    |
+-------------------------+-------+
| "Joel Embiid"           | 25    |
+-------------------------+-------+
Got 6 rows (time spent 5815/7220 us)
```

### Match values not in a list

Use `NOT` before `IN` to rule out the values in a list.

```ngql
nebula> MATCH (v:player) \
        WHERE v.age NOT IN range(20,25) \
        RETURN v.name AS Name, v.age AS Age \
        ORDER BY Age;
+---------------------+-----+
| Name                | Age |
+---------------------+-----+
| "Kyrie Irving"      | 26  |
+---------------------+-----+
| "Cory Joseph"       | 27  |
+---------------------+-----+
| "Damian Lillard"    | 28  |
+---------------------+-----+
| "Paul George"       | 28  |
+---------------------+-----+
| "Ricky Rubio"       | 28  |
+---------------------+-----+
...
Got 45 rows (time spent 2954/3725 us)
```

<!--
[Not supported yet.]
## Filter on null

-->
