# CREATE TAG Syntax

```ngql
CREATE TAG [IF NOT EXISTS] <tag_name>
    ([<create_definition>, ...])
    [tag_options]

<create_definition> ::=
    <prop_name> <data_type>

<tag_options> ::=
    <option> [, <option> ...]

<option> ::=
    TTL_DURATION [=] <ttl_duration>
    | TTL_COL [=] <prop_name>
    | DEFAULT <default_value>
```

**Nebula Graph**'s schema is composed of tags and edges, either of which may have properties. `CREATE TAG` statement defines a tag with the given name.

The features of this syntax are described in the following sections:

## IF NOT EXISTS

You can use the `If NOT EXISTS` keywords when creating tags. This keyword automatically detects if the corresponding tag exists. If it does not exist, a new one is created. Otherwise, no tag is created.

> **NOTE**: The tag existence detection here only compares the tag name (excluding properties).

## Tag Name

* **tag_name**

    The name of tags must be **unique** within the space. Once the name is defined, it can not be altered. The rules of tag names are the same as those for names of spaces. See [Schema Object Name](../../3.language-structure/schema-object-names.md) for detail.

### Property Name and Data Type

* **prop_name**

    prop_name indicates the name of properties. It must be unique for each tag.

* **data_type**

    data_type represents the data type of each property. For more information about data types that **Nebula Graph** supports, see [data-type](../../1.data-types/data-types.md) section.

    > NULL and NOT NULL constrain are not supported yet when creating tags (comparing with relational databases).

* **Default Constraint**

    You can set the default value of a property when creating a tag with the `DEFAULT` constraint. The default value will be added to all new vertices if no other value is specified. The default value can be any of the data type supported by  **Nebula Graph** or  expressions. Also you can write a user-specified value if you don't want to use the default one.

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
nebula> CREATE TAG course(name string, credits int);
nebula> CREATE TAG notag();  -- empty properties

nebula> CREATE TAG player_with_default(name string, age int DEFAULT 20);  -- age is set to 20 by default
```

```ngql
nebula> CREATE TAG woman(name string, age int,
   married bool, salary double, create_time timestamp)
   TTL_DURATION = 100, TTL_COL = "create_time"; -- time interval is 100s, starting from the create_time filed

nebula> CREATE TAG icecream(made timestamp, temperature int)
   TTL_DURATION = 100, TTL_COL = "made",
   --  Data expires after TTL_DURATION
```
