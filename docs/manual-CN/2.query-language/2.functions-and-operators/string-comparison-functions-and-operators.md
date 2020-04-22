# 字符比较函数和运算符

| 名称      | 描述                 |
|:-----    | :------------------: |
| CONTAINS | 搜索包含指定字段的字符串，大小写敏感 |

* CONTAINS

`CONTAINS` 运算符用来搜索包含指定字段的字符串，且大小写敏感。所有非字符串数据均强制转换为字符串。

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
