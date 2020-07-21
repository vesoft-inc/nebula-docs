# Comparison Between SQL and nGQL

## Conceptual Comparisons

|Items               | SQL | nGQL          |
| --- | --- | --- |
| vertex      | \  | vertex        |
| edge | \    | edge          |
| vertex type        | \   | tag           |
| edge type          | \  | edge type     |
| vertex identifier          | primary key | vid           |
| edge identifier        | composite primary key   | src, dst, rank  |
| column | column | properties of vertices or edges |
| row | row | one vertex or edge |

## Syntax Comparisons

### Data Definition Language (DDL)

Data Definition Language (DDL) can be used to define a database schema. DDL statements create and modify the structure of a database.

Items                    | SQL                   | nGQL
-------------------------| ------------------------ | -----------
Create (graph) database              | CREATE DATABASE `<database_name>`                    | CREATE SPACE `<space_name>`
Show (graph) database              | SHOW DATABASES | SHOW SPACES
Use (graph) database  | USE `<database_name>` | USE `<space_name>`
Drop (graph) database | DROP DATABASE `<database_name>` | DROP SPACE `<space_name>`
Alter (graph) database | ALTER DATABASE `<database_name>` alter_option | \
Create tags/edges | \ | CREATE TAG \| EDGE `<tag_name>`
Create a table | CREATE TABLE `<tbl_name>` (create_definition,...) | \
Show columns | SHOW COLUMNS FROM `<tbl_name>` | \
Show tags/edges | \ | SHOW TAGS \| EDGES
Describe tags/edge | \ | DESCRIBE TAG \| EDGE `<tag_name | edge_name>`
Alter a tag/edge | \ | ALTER TAG \| EDGE `<tag_name | edge_name>`
Alter a table | ALTER TABLE `<tbl_name>` | \

#### Index

Items                    | SQL                   | nGQL
-------------------------| ------------------------ | -----------
Create index | CREATE INDEX | CREATE {TAG \| EDGE} INDEX
Drop index | DROP INDEX | DROP {TAG \| EDGE} INDEX
Show index | SHOW INDEX FROM | SHOW {TAG \| EDGE} INDEXES
Rebuild index | ANALYZE TABLE | REBUILD {TAG \| EDGE} INDEX `<index_name>` [OFFLINE]

### Data Manipulation Language (DML)

Data Manipulation Language (DML) is used to manipulate data in a database.

Items                    | SQL                   | nGQL
-------------------------| ------------------------ | -----------
Insert data | INSERT IGNORE INTO `<tbl_name>` [(col_name [, col_name] ...)] {VALUES \| VALUE} [(value_list) [, (value_list)] | INSERT VERTEX `<tag_name>` (prop_name_list[, prop_name_list]) {VALUES \| VALUE} vid: (prop_value_list[, prop_value_list]) <br/> INSERT EDGE `<edge_name>` ( `<prop_name_list>` ) VALUES \| VALUE `<src_vid>` -> `<dst_vid>`[`@<rank>`] : ( `<prop_value_list>` )
Query data | SELECT | GO, FETCH
Update data | UPDATE `<tbl_name>` SET field1=new-value1, field2=new-value2 [WHERE Clause] | UPDATE VERTEX `<vid>` SET `<update_columns>` [WHEN `<condition>`] <br/> UPDATE EDGE `<edge>` SET `<update_columns>` [WHEN `<condition>`]
Delete data | DELETE FROM `<tbl_name>` [WHERE Clause] | DELETE EDGE `<edge_type>` `<vid>` -> `<vid>`[`@<rank>`] [, `<vid>` -> `<vid>` ...] <br/> DELETE VERTEX `<vid_list>`
Join data| JOIN | `|` |

### Data Query Language (DQL)

Data Query Language (DQL) statements are used for performing queries on the data. This section shows how you can query data with SQL statements and nGQL statements.

```sql
SELECT
 [DISTINCT]
 select_expr [, select_expr] ...
 [FROM table_references]
 [WHERE where_condition]
 [GROUP BY {col_name | expr | position}]
 [HAVING  where_condition]
 [ORDER BY {col_name | expr | position} [ASC | DESC]]
```

```SQL
GO [[<M> TO] <N> STEPS ] FROM <node_list>
 OVER <edge_type_list> [REVERSELY] [BIDIRECT]
 [WHERE where_condition]
 [YIELD [DISTINCT] <return_list>]
 [| ORDER BY <expression> [ASC | DESC]]
 [| LIMIT [<offset_value>,] <number_rows>]
 [| GROUP BY {col_name | expr | position} YIELD <col_name>]

<node_list>
   | <vid> [, <vid> ...]
   | $-.id

<edge_type_list>
   edge_type [, edge_type ...]

<return_list>
    <col_name> [AS <col_alias>] [, <col_name> [AS <col_alias>] ...]
```

### Data Control Language (DCL)

Data Control Language (DCL) includes commands such as `GRANT` and `REVOKE` that mainly deals with the rights, permissions, and other controls of the database system.

Items                    | SQL                   | nGQL
-------------------------| ------------------------ | -----------
Create user | CREATE USER | CREATE USER
Drop user | DROP USER | DROP USER
Change password | SET PASSWORD | CHANGE PASSWORD
Grant privilege | GRANT `<priv_type>` ON [object_type] TO `<user>`| GRANT ROLE `<role_type>` ON `<space>` TO `<user>`
Revoke privilege | REVOKE `<priv_type>` ON [object_type] TO `<user>` | REVOKE ROLE `<role_type>` ON `<space>` FROM `<user>`

## Data Model

The queries are based on the data model below:

### MySQL

![image](https://user-images.githubusercontent.com/42762957/87523043-f7afd800-c6b8-11ea-9e68-2ff4ef009ed0.png)

### Nebula Graph

![image](https://user-images.githubusercontent.com/42762957/87525281-da303d80-c6bb-11ea-8357-b4aecfe40922.png)

## CRUD

This section describes how to create (C), read (R), update (U), and delete (D) data with SQL and nGQL statements.

### Inserting Data

```sql
mysql> INSERT INTO player VALUES (100, 'Tim Duncan', 42);

nebula> INSERT VERTEX player(name, age) VALUES 100: ('Tim Duncan', 42);
```

### Querying Data

Find the player whose id is 100 and output the `name` property:

```sql
mysql> SELECT player.name FROM player WHERE player.id = 100;

nebula> FETCH PROP ON player 100 YIELD player.name;
```

### Updating Data

```sql
mysql> UPDATE player SET name = 'Tim';

nebula> UPDATE VERTEX 100 SET player.name = "Tim";
```

### Deleting Data

```sql
mysql> DELETE FROM player WHERE name = 'Tim';

nebula> DELETE VERTEX 121;
nebula> DELETE EDGE follow 100 -> 200;
```

## Sample Queries

### Query 1

Find players who are younger than 36.

```sql
mysql> SELECT player.name
FROM player
WHERE player.age < 36;
```

The query in nGQL is a bit different because you must create an index before filtering a property. For more information, see [Index Doc](https://docs.nebula-graph.io/manual-EN/2.query-language/4.statement-syntax/1.data-definition-statements/).

```ngql
nebula> CREATE TAG INDEX player_age ON player(age);
nebula> REBUILD TAG INDEX player_age OFFLINE;
nebula> LOOKUP ON player WHERE player.age < 36;
```

### Query 2

Find Tim Duncan and list all the teams that he served.

```sql
mysql> SELECT a.id, a.name, c.name
FROM player a
JOIN serve b ON a.id=b.player_id
JOIN team c ON c.id=b.team_id
WHERE a.name = 'Tim Duncan';
```

```ngql
nebula> CREATE TAG INDEX player_name ON player(name);
nebula> REBUILD TAG INDEX player_name OFFLINE;
nebula> LOOKUP ON player WHERE player.name == 'Tim Duncan' YIELD player.name AS name | GO FROM $-.VertexID OVER serve YIELD $-.name, $$.team.name;
```

### Query 3

Find Tim Duncan's teammates.

```sql
mysql> SELECT a.id, a.name, c.name
FROM player a
JOIN serve b ON a.id=b.player_id
JOIN team c ON c.id=b.team_id
WHERE c.name IN (SELECT c.name
FROM player a
JOIN serve b ON a.id=b.player_id
JOIN team c ON c.id=b.team_id
WHERE a.name = 'Tim Duncan');
```

In nGQL we use pipes to pass the output of the previous statement as the input for the next statement.

```ngql
nebula> GO FROM 100 OVER serve YIELD serve._dst AS Team | GO FROM $-.Team OVER serve REVERSELY YIELD $$.player.name;
```
