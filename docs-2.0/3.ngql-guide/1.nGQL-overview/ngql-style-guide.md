# nGQL style guide

nGQL does not have strict formatting requirements, but creating nGQL statements according to an appropriate and uniform style can improve readability and avoid ambiguity. Using the same nGQL style in the same organization or project helps reduce maintenance costs and avoid problems caused by format confusion or misunderstanding. This topic will provide a style guide for writing nGQL statements.

!!! compatibility

    The styles of nGQL and [Cypher Style Guide](https://s3.amazonaws.com/artifacts.opencypher.org/M15/docs/style-guide.pdf) are different.

## Newline

1. Start a new line to write a clause.

  Not recommended:

  ```ngql
  GO FROM "player100" OVER follow REVERSELY YIELD follow._dst AS id;
  ```

  Recommended:

  ```ngql
  GO FROM "player100" \
  OVER follow REVERSELY \
  YIELD follow._dst AS id;
  ```

2. Start a new line to write different statements in a composite statement.

  Not recommended:

  ```ngql
  GO FROM "player100" OVER follow REVERSELY YIELD follow._dst AS id | GO FROM $-.id \
  OVER serve WHERE $^.player.age > 20 YIELD $^.player.name AS FriendOf, $$.team.name AS Team;
  ```

  Recommended:

  ```ngql
  GO FROM "player100" \
  OVER follow REVERSELY \
  YIELD follow._dst AS id | \
  GO FROM $-.id OVER serve \
  WHERE $^.player.age > 20 \
  YIELD $^.player.name AS FriendOf, $$.team.name AS Team;
  ```

3. If the clause exceeds 80 characters, start a new line at the appropriate place.

  Not recommended:

  ```ngql
  MATCH (v:player{name:"Tim Duncan"})-[e]->(v2) \
  WHERE (v2.name STARTS WITH "Y" AND v2.age > 35 AND v2.age < v.age) OR (v2.name STARTS WITH "T" AND v2.age < 45 AND v2.age > v.age) \
  RETURN v2;
  ```

  Recommended:

  ```ngql
  MATCH (v:player{name:"Tim Duncan"})-[e]->(v2) \
  WHERE (v2.name STARTS WITH "Y" AND v2.age > 35 AND v2.age < v.age) \
  OR (v2.name STARTS WITH "T" AND v2.age < 45 AND v2.age > v.age) \
  RETURN v2;
  ```

!!! note

    If needed, you can also start a new line for better understanding, even if the clause does not exceed 80 characters. 

## Identifier naming

In nGQL statements, characters other than keywords, punctuation marks, and blanks are all identifiers. Recommended methods to name the identifiers are as follows.

1. Use singular nouns to name tags, and use the base form of verbs or verb phrases to form Edge types.

  Not recommended:

  ```ngql
  MATCH p=(v:players)-[e:are_following]-(v2) \
  RETURN nodes(p);
  ```

  Recommended:

  ```ngql
  MATCH p=(v:player)-[e:follow]-(v2) \
  RETURN nodes(p);
  ```

2. Use the snake case to name identifiers, and connect words with underscores (_) with all the letters lowercase.

  Not recommended:

  ```ngql
  MATCH (v:basketballTeam) \
  RETURN v;
  ```

  Recommended:

  ```ngql
  MATCH (v:basketball_team) \
  RETURN v;
  ```

3. Use uppercase keywords and lowercase variables.

  Not recommended:

  ```ngql
  go from "player100" over Follow
  ```
  
  Recommended:
    
  ```ngql
  GO FROM "player100" OVER follow
  ```

## Pattern

1. Start a new line on the right side of the arrow indicating an edge when writing patterns.

  Not recommended:

  ```ngql
  MATCH (v:player{name: "Tim Duncan", age: 42}) \
  -[e:follow]->()-[e:serve]->()<--(v3) \
  RETURN v, e, v2;
  ```

  Recommended:

  ```ngql
  MATCH (v:player{name: "Tim Duncan", age: 42})-[e:follow]-> \
  ()-[e:serve]->()<--(v3) \
  RETURN v, e, v2;
  ```

2. Anonymize the vertices and edges that do not need to be queried.

  Not recommended:

  ```ngql
  MATCH (v:player)-[e:follow]->(v2) \
  RETURN v;
  ```

  Recommended:

  ```ngql
  MATCH (v:player)-[:follow]->() \
  RETURN v;
  ```

3. Place named vertices in front of anonymous vertices.

  Not recommended:

  ```ngql
  MATCH ()-[:follow]->(v) \
  RETURN v;
  ```

  Recommended:

  ```ngql
  MATCH (v)<-[:follow]-() \
  RETURN v;
  ```

## String

The strings should be surrounded by double quotes.

  Not recommended:

  ```ngql
  RETURN 'Hello Nebula!';
  ```

  Recommended:

  ```ngql
  RETURN "Hello Nebula!\"123\"";
  ```

!!! note

    When single or double quotes need to be nested in a string, use a backslash (\) to escape. For example:

    ```ngql
    RETURN "\"Nebula Graph is amazing,\" the user says.";
    ```

<!--## 空格 TODO-->

## Statement termination

1. End the nGQL statements with an English semicolon (;).

  Not recommended:

  ```ngql
  FETCH PROP ON player "player100"
  ```

  Recommended:

  ```ngql
  FETCH PROP ON player "player100";
  ```

2. Use a pipe (|) to separate a composite statement, and end the statement with an English semicolon at the end of the last line. Using an English semicolon before a pipe will cause the statement to fail.

  Not supported:

  ```ngql
  GO FROM "player100" \
  OVER follow \
  YIELD follow._dst AS id; | \
  GO FROM $-.id \
  OVER serve \
  YIELD $$.team.name AS Team, $^.player.name AS Player;
  ```

  Supported:

  ```ngql
  GO FROM "player100" \
  OVER follow \
  YIELD follow._dst AS id | \
  GO FROM $-.id \
  OVER serve \
  YIELD $$.team.name AS Team, $^.player.name AS Player;
  ```

3. In a composite statement that contains user-defined variables, use an English semicolon to end the statements that define the variables. If you do not follow the rules to add a semicolon or use a pipe to end the composite statement, the execution will fail.

  Not supported:

  ```ngql
  $var = GO FROM "player100" \
  OVER follow \
  YIELD follow._dst AS id \
  GO FROM $var.id \
  OVER serve \
  YIELD $$.team.name AS Team, $^.player.name AS Player;
  ```

  Not supported:

  ```ngql
  $var = GO FROM "player100" \
  OVER follow \
  YIELD follow._dst AS id | \
  GO FROM $var.id \
  OVER serve \
  YIELD $$.team.name AS Team, $^.player.name AS Player;
  ```

  Supported:

  ```ngql
  $var = GO FROM "player100" \
  OVER follow \
  YIELD follow._dst AS id; \
  GO FROM $var.id \
  OVER serve \
  YIELD $$.team.name AS Team, $^.player.name AS Player;
  ```
