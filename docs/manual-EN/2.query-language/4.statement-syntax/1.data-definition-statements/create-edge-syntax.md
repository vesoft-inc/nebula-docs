# CREATE EDGE Syntax

```ngql
CREATE EDGE [IF NOT EXISTS] <edge_name>
    ([<create_definition>, ...])
    [edge_options]

<create_definition> ::=
    <prop_name> <data_type>

<edge_options> ::=
    <option> [, <option> ...]

<option> ::=
    TTL_DURATION [=] <ttl_duration>
    | TTL_COL [=] <prop_name>
    | DEFAULT <default_value>
```

The schema for Nebula Graph is composed of tags and edges, either of which can have properties. `CREATE EDGE` statement defines an edge type with the given name.

The features of this syntax are described in the following sections:

## IF NOT EXISTS

You can use the `If NOT EXISTS` keywords when creating edge types. This keyword automatically detects if the corresponding edge type exists. If it does not exist, a new one is created. Otherwise, no edge type is created.

> **NOTE**: The edge type existence detection here only compares the edge edge name (excluding properties).

## Edge Type Name

* **edge_name**

    The name of edge types must be **unique** within the space. Once the name is defined, it can not be altered. The rules of edge type names are the same as those for names of spaces. See [Schema Object Name](../../3.language-structure/schema-object-names.md) for detail.

### Property Name and Data Type

* **prop_name**

    prop_name indicates the name of properties. It must be unique for each edge type.

* **data_type**

    data_type represents the data type of each property. For more information about data types that Nebula Graph supports, see [data-type](../../1.data-types/data-types.md) section.

    > NULL and NOT NULL constrain are not supported yet when creating edge types (comparing with relational databases).

* **Default Constraint**

    You can set the default value of a property when creating an edge type with the `DEFAULT` constraint. The default value will be added to all new edges if no other value is specified. The default value can be any of the data type supported by Nebula Graph or expressions. Also you can write a user-specified value if you don't want to use the default one.

    > Using `Alter` to change the default value is not supported.

    <!-- > Since it's so error-prone to modify the default value with new one, using `Alter` to change the default value is not supported. -->

### Time-to-Live (TTL) Syntax

* TTL_DURATION

    ttl_duration specifies the life cycle of vertices (or edges). Data that exceeds the specified TTL will expire. The expiration threshold is the specified TTL_COL value plus the TTL_DURATION.

    > If the value for ttl_duration is zero or negative, the vertices or edges will not expire.

* TTL_COL

    The data type of prop_name must be either int64 or timestamp.

* single TTL definition

    Only a single TTL_COL field can be specified.

Details about TTL refer to the [TTL Doc](TTL.md).

### Examples

```ngql

nebula> CREATE EDGE follow(start_time timestamp, grade double);
nebula> CREATE EDGE noedge();  -- empty properties

nebula> CREATE EDGE follow_with_default(start_time timestamp DEFAULT 0, grade double DEFAULT 0.0);  -- start_time is set to 0 by default, grade is set to 0.0 by default
```

```ngql
nebula> CREATE EDGE marriage(location string, since timestamp)
    TTL_DURATION = 0, TTL_COL = "since"; -- negative or zero, will not expire
```
