# WHERE

The `WHERE` clause filters the output by conditions.

The `WHERE` clause usually works in the following queries:

* Native nGQL: such as `GO` and `LOOKUP`.

* OpenCypher syntax: such as `MATCH` and `WITH`.

## OpenCypher compatibility

* Using patterns in `WHERE` is not supported (TODO: planning), for example `WHERE (v)-->(v2)`.

* [Filtering on edge rank](#filter_on_edge_rank) is a native nGQL feature. To retrieve the rank value in openCypher statements, use the rank() function, such as `MATCH (:player)-[e:follow]->() RETURN rank(e);`.

## Basic usage

!!! note
    In the following examples, `$$` and `$^` are reference operators. For more information, see [Operators](../5.operators/5.property-reference.md).

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
| "Aron Baynes"           | 32    |
| "LeBron James"          | 34    |
| "James Harden"          | 29    |
| "Manu Ginobili"         | 41    |
+-------------------------+-------+
...
```

```ngql
nebula> GO FROM "player100" \
        OVER follow \
        WHERE properties(edge).degree > 90 \
        OR properties($$).age != 33 \
        AND properties($$).name != "Tony Parker" \
        YIELD properties($$);
+----------------------------------+
| properties($$)                   |
+----------------------------------+
| {age: 41, name: "Manu Ginobili"} |
+----------------------------------+
```

### Filter on properties

Use vertex or edge properties to define conditions in `WHERE` clauses.

* Filter on a vertex property:

    ```ngql
    nebula> MATCH (v:player)-[e]->(v2) \
            WHERE v2.age < 25 \
            RETURN v2.name, v2.age;
    +----------------------+--------+
    | v2.name              | v2.age |
    +----------------------+--------+
    | "Luka Doncic"        | 20     |
    | "Kristaps Porzingis" | 23     |
    | "Ben Simmons"        | 22     |
    +----------------------+--------+
    ```

    ```ngql
    nebula> GO FROM "player100" \
            OVER follow \
            WHERE $^.player.age >= 42;
    +-------------+
    | follow._dst |
    +-------------+
    | "player101" |
    | "player125" |
    +-------------+
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
    | "Steve Nash"       | 45    |
    | "Ray Allen"        | 43    |
    | "Grant Hill"       | 46    |
    | "Tony Parker"      | 36    |
    +--------------------+-------+
    ...
    ```

    ```ngql
    nebula> GO FROM "player100" \
            OVER follow \
            WHERE follow.degree > 90;
    +-------------+
    | follow._dst |
    +-------------+
    | "player101" |
    | "player125" |
    +-------------+
    ```

### Filter on dynamically-calculated properties

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

### Filter on existing properties

```ngql
nebula> MATCH (v:player) \
        WHERE exists(v.age) \
        RETURN v.name, v.age;
+-------------------------+-------+
| v.name                  | v.age |
+-------------------------+-------+
| "Boris Diaw"            | 36    |
| "DeAndre Jordan"        | 30    |
+-------------------------+-------+
```

### Filter on edge rank

In nGQL, if a group of edges has the same source vertex, destination vertex, and properties, the only thing that distinguishes them is the rank. Use rank conditions in `WHERE` clauses to filter such edges.

```ngql
# The following example creates test data.
nebula> CREATE SPACE test (vid_type=FIXED_STRING(30));
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

# The following example use rank to filter edges and retrieves edges with a rank greater than 2.
nebula> GO FROM "1" \
        OVER e1 \
        WHERE rank(edge) > 2 \
        YIELD src(edge), dst(edge), rank(edge) AS Rank, properties(edge).p1 | \
        ORDER BY $-.Rank DESC;
+-----------+-----------+------+---------------------+
| src(EDGE) | dst(EDGE) | Rank | properties(EDGE).p1 |
+-----------+-----------+------+---------------------+
| "1"       | "2"       | 6    | 16                  |
| "1"       | "2"       | 5    | 15                  |
| "1"       | "2"       | 4    | 14                  |
| "1"       | "2"       | 3    | 13                  |
+-----------+-----------+------+---------------------+
```

## Filter on strings

Use `STARTS WITH`, `ENDS WITH`, or `CONTAINS` in `WHERE` clauses to match a specific part of a string. String matching is case-sensitive.

### `STARTS WITH`

`STARTS WITH` will match the beginning of a string.

The following example uses `STARTS WITH "T"` to retrieve the information of players whose name starts with `T`.

```ngql
nebula> MATCH (v:player) \
        WHERE v.name STARTS WITH "T" \
        RETURN v.name, v.age;
+------------------+-------+
| v.name           | v.age |
+------------------+-------+
| "Tracy McGrady"  | 39    |
| "Tony Parker"    | 36    |
| "Tim Duncan"     | 42    |
| "Tiago Splitter" | 34    |
+------------------+-------+
```

If you use `STARTS WITH "t"` in the preceding statement, an empty set is returned because no name in the dataset starts with the lowercase `t`.

```ngql
nebula> MATCH (v:player) \
        WHERE v.name STARTS WITH "t" \
        RETURN v.name, v.age;
Empty set (time spent 5080/6474 us)
```

### `ENDS WITH`

`ENDS WITH` will match the ending of a string.

The following example uses `ENDS WITH "r"` to retrieve the information of players whose name ends with `r`.

```ngql
nebula> MATCH (v:player) \
        WHERE v.name ENDS WITH "r" \
        RETURN v.name, v.age;
+------------------+-------+
| v.name           | v.age |
+------------------+-------+
| "Vince Carter"   | 42    |
| "Tony Parker"    | 36    |
| "Tiago Splitter" | 34    |
+------------------+-------+
```

### `CONTAINS`

`CONTAINS` will match a certain part of a string.

The following example uses `CONTAINS "Pa"` to match the information of players whose name contains `Pa`.

```ngql
nebula> MATCH (v:player) \
        WHERE v.name CONTAINS "Pa" \
        RETURN v.name, v.age;
+---------------+-------+
| v.name        | v.age |
+---------------+-------+
| "Paul George" | 28    |
| "Tony Parker" | 36    |
| "Paul Gasol"  | 38    |
| "Chris Paul"  | 33    |
+---------------+-------+
```

### Negative string matching

You can use the boolean operator `NOT` to negate a string matching condition.

```ngql
nebula> MATCH (v:player) \
        WHERE NOT v.name ENDS WITH "R" \
        RETURN v.name, v.age;
+-------------------------+-------+
| v.name                  | v.age |
+-------------------------+-------+
| "Rajon Rondo"           | 33    |
| "Rudy Gay"              | 32    |
| "Dejounte Murray"       | 29    |
| "Chris Paul"            | 33    |
| "Carmelo Anthony"       | 34    |
+-------------------------+-------+
...
```

<!--

[Not supported yet.]

## Use patterns in WHERE

### Filter on patterns

### Filter on patterns using NOT

### Filter on properties in patterns

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
| "Kristaps Porzingis"    | 23    |
| "Luka Doncic"           | 20    |
| "Kyle Anderson"         | 25    |
| "Giannis Antetokounmpo" | 24    |
| "Joel Embiid"           | 25    |
+-------------------------+-------+

nebula> LOOKUP ON player WHERE player.age IN [25,28]  YIELD properties(vertex).name, properties(vertex).age;
+-------------+-------------------------+------------------------+
| VertexID    | properties(VERTEX).name | properties(VERTEX).age |
+-------------+-------------------------+------------------------+
| "player106" | "Kyle Anderson"         | 25                     |
| "player135" | "Damian Lillard"        | 28                     |
| "player130" | "Joel Embiid"           | 25                     |
| "player131" | "Paul George"           | 28                     |
| "player123" | "Ricky Rubio"           | 28                     |
+-------------+-------------------------+------------------------+
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
| "Cory Joseph"       | 27  |
| "Damian Lillard"    | 28  |
| "Paul George"       | 28  |
| "Ricky Rubio"       | 28  |
+---------------------+-----+
...
```
