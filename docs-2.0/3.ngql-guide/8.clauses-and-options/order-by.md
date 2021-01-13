# ORDER BY

The `ORDER BY` clause specifies the order of the rows in the output. You can use a pipe and an `ORDER BY` clause after a `RETURN` or `YIELD` clause to do the sorting.

## Syntax

```nGQL
{<RETURN clause> | <YIELD clause>} ORDER BY <expression> [ASC | DESC] [, <expression> [ASC | DESC] ...]
```

There are two order options:

* `ASC`: Ascending. `ASC` is the default order.
* `DESC`: Descending.

An order option takes effect only when the expression before it is used for sorting the results.

## Order output by one expression

You can sort rows in the output by a specific expression.

```nGQL
nebula> MATCH (v:player) RETURN v.name AS Name, v.age AS Age | ORDER BY Name DESC | LIMIT 5;
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
Got 5 rows (time spent 2908/3751 us)
```

## Order output by multiple expressions

You can sort rows in the output by multiple expressions. nGQL will order the rows by the sequence of the expressions listed in the statement.

```nGQL
nebula> MATCH (v:player) RETURN v.age AS Age, v.name AS Name | ORDER BY Age DESC, Name ASC | LIMIT 10
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
| 43  | "Ray Allen"       |
+-----+-------------------+
| 42  | "Tim Duncan"      |
+-----+-------------------+
| 42  | "Vince Carter"    |
+-----+-------------------+
| 41  | "Manu Ginobili"   |
+-----+-------------------+
| 40  | "Dirk Nowitzki"   |
+-----+-------------------+
| 40  | "Kobe Bryant"     |
+-----+-------------------+
Got 10 rows (time spent 2697/3360 us)
```

In the preceding example, nGQL sorts the rows by `Age` first. If multiple people are of the same age, nGQL sorts them by `Name`.

## Order by NULL values

nGQL lists NULL values at the end of the output for ascending sorting, and at the start for descending sorting.

```nGQL
nebula> MATCH (v:player{name:"Tim Duncan"}) --> (v2) \
        RETURN v2.name AS Name, v2.age AS Age | \
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

```nGQL
nebula> MATCH (v:player{name:"Tim Duncan"}) --> (v2) \
        RETURN v2.name AS Name, v2.age AS Age | \
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
