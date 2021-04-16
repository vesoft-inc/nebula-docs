# SHOW HOSTS Syntax

```ngql
SHOW HOSTS
```

`SHOW HOSTS` statement lists storage hosts registered by the meta server. `SHOW HOSTS` output has these columns:: ip, port, status (online/offline), leader count, leader distribution, partition distribution.

```ngql
nebula> SHOW HOSTS;
==============================================================================================
| Ip         | Port  | Status | Leader count | Leader distribution  | Partition distribution |
==============================================================================================
| 172.28.2.1 | 44500 | online | 9            | basketballplayer: 9  | basketballplayer: 10   |
----------------------------------------------------------------------------------------------
| 172.28.2.2 | 44500 | online | 0            |                      | basketballplayer: 10   |
----------------------------------------------------------------------------------------------
| 172.28.2.3 | 44500 | online | 1            | basketballplayer: 1  | basketballplayer: 10   |
----------------------------------------------------------------------------------------------
| Total      |       |        | 10           | basketballplayer: 10 | basketballplayer: 30   |
----------------------------------------------------------------------------------------------
```
