# ORDER BY

The `ORDER BY` clause specifies the order of the rows in the output.

- NGQL-extension: You must use a pipe (`|`) and an `ORDER BY` clause after `YIELD` clause.
- OpenCypher style: no pipe is permitted. `ORDER BY` follows a `RETURN` clause.

There are two order options:

* `ASC`: Ascending. `ASC` is the default order.
* `DESC`: Descending.

An order option takes effect only when the expression before it is used for sorting the results.

## nGQL-extension Syntax

```ngql
<YIELD clause>
ORDER BY <expression> [ASC | DESC] [, <expression> [ASC | DESC] ...]
```

### Examples

```ngql
nebula> FETCH PROP ON player "player100", "player101", "player102", "player103" YIELD player.age AS age, player.name AS name \
| ORDER BY age ASC, name DESC;
+-------------+-----+---------------------+
| VertexID    | age | name                |
+-------------+-----+---------------------+
| "player103" | 32  | "Rudy Gay"          |
+-------------+-----+---------------------+
| "player102" | 33  | "LaMarcus Aldridge" |
+-------------+-----+---------------------+
| "player101" | 36  | "Tony Parker"       |
+-------------+-----+---------------------+
| "player100" | 42  | "Tim Duncan"        |
+-------------+-----+---------------------+
```

## OpenCypher Syntax

```ngql
<RETURN clause>
ORDER BY <expression> [ASC | DESC] [, <expression> [ASC | DESC] ...]
```

An order option takes effect only when the expression before it is used for sorting the results.

### Examples

```ngql
nebula> MATCH (v:player) RETURN v.name AS Name, v.age AS Age  ORDER BY Name DESC;
+-----------------+-----+
| Name            | Age |
+-----------------+-----+
| "Yao Ming"      | 38  |
+-----------------+-----+
| "Vince Carter"  | 42  |
+-----------------+-----+
| "Tracy McGrady" | 39  |
+-----------------+-----+
| "Tony Parker"   | 36  |
+-----------------+-----+
| "Tim Duncan"    | 42  |
+-----------------+-----+
...
```

```ngql
nebula> MATCH (v:player) RETURN v.age AS Age, v.name AS Name  ORDER BY Age DESC, Name ASC
+-----+-------------------+
| Age | Name              |
+-----+-------------------+
| 47  | "Shaquille O'Neal" |
+-----+-------------------+
| 46  | "Grant Hill"      |
+-----+-------------------+
| 45  | "Jason Kidd"      |
+-----+-------------------+
| 45  | "Steve Nash"      |
+-----+-------------------+
...
```

In the preceding example, nGQL sorts the rows by `Age` first. If multiple people are of the same age, nGQL sorts them by `Name`.

## Order by NULL values

nGQL lists NULL values at the end of the output for ascending sorting, and at the start for descending sorting.

```ngql
nebula> MATCH (v:player{name:"Tim Duncan"}) --> (v2) \
        RETURN v2.name AS Name, v2.age AS Age  \
        ORDER BY Age;
+-----------------+----------+
| Name            | Age      |
+-----------------+----------+
| "Tony Parker"   | 36       |
+-----------------+----------+
| "Manu Ginobili" | 41       |
+-----------------+----------+
| "Spurs"         | __NULL__ |
+-----------------+----------+
Got 3 rows (time spent 3089/3719 us)
```

```ngql
nebula> MATCH (v:player{name:"Tim Duncan"}) --> (v2) \
        RETURN v2.name AS Name, v2.age AS Age  \
        ORDER BY Age DESC;
+-----------------+----------+
| Name            | Age      |
+-----------------+----------+
| "Spurs"         | __NULL__ |
+-----------------+----------+
| "Manu Ginobili" | 41       |
+-----------------+----------+
| "Tony Parker"   | 36       |
+-----------------+----------+
Got 3 rows (time spent 2851/3360 us)
```
