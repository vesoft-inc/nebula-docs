# String Comparison Functions and Operators

| Name     | Description          |
|:-----    | :------------------: |
| CONTAINS | Perform case-insensitive inclusion searching in strings |

* CONTAINS

The `CONTAINS` operator is used to perform case-insensitive matching regardless of location within a string. All non-string type are forced to convert to strings.

```ngql
nebula> GO FROM 107 OVER serve WHERE $$.team.name CONTAINS "riors" \
        YIELD $^.player.name, serve.start_year, serve.end_year, $$.team.name;
=====================================================================
| $^.player.name | serve.start_year | serve.end_year | $$.team.name |
=====================================================================
| Aron Baynes    | 2001             | 2009           | Warriors     |
---------------------------------------------------------------------
```

```ngql
nebula> GO FROM 107 OVER serve WHERE serve.start_year CONTAINS "07" && \
        $^.player.name CONTAINS "Aron" \
        YIELD $^.player.name, serve.start_year, serve.end_year, $$.team.name;
=====================================================================
| $^.player.name | serve.start_year | serve.end_year | $$.team.name |
=====================================================================
| Aron Baynes    | 2007             | 2010           | Nuggets      |
---------------------------------------------------------------------
```

```ngql
nebula> GO FROM 107 OVER serve WHERE !($$.team.name CONTAINS "riors") \
        YIELD $^.player.name, serve.start_year, serve.end_year, $$.team.name;
=====================================================================
| $^.player.name | serve.start_year | serve.end_year | $$.team.name |
=====================================================================
| Aron Baynes    | 2007             | 2010           | Nuggets      |
---------------------------------------------------------------------
```
