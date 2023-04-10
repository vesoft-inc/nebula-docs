# TTL

TTL (Time To Live) specifies a timeout for a property. Once timed out, the property expires.

## OpenCypher Compatibility

This topic applies to native nGQL only.

## Precautions

* You CANNOT modify a property schema with TTL options on it.

* TTL options and indexes have coexistence issues.

  + TTL options and indexes CANNOT coexist on a tag or an edge type. If there is an index on a property, you cannot set TTL options on other properties.

  + If there are TTL options on a tag, an edge type, or a property, you can still add an index on them.

## TTL options

The native nGQL TTL feature has the following options.

|Option|Description|
|:---|:---|
|`ttl_col`|Specifies the property to set a timeout on. The data type of the property must be `int` or `timestamp`.|
|`ttl_duration`|Specifies the timeout adds-on value in seconds. The value must be a non-negative int64 number. A property expires if the sum of its value and the `ttl_duration` value is smaller than the current timestamp. If the `ttl_duration` value is `0`, the property never expires.<br/>You can set `ttl_use_ms` to `true` in the configuration file `nebula-storaged.conf` (default path: `/usr/local/nightly/etc/`) to set the default unit to milliseconds.|

!!! caution

    - Before setting `ttl_use_ms` to `true`, make sure that no TTL has been set for any property, as shortening the expiration time may cause data to be erroneously deleted.
 
    - After setting `ttl_use_ms` to `true`, which sets the default TTL unit to milliseconds, the data type of the property specified by `ttl_col` must be `int`, and the property value needs to be manually converted to milliseconds. For example, when setting `ttl_col` to `a`, you need to convert the value of `a` to milliseconds, such as when the value of `a` is `now()`, you need to set the value of `a` to `now() * 1000`.


## Data expiration and deletion

!!! caution

    - When the TTL options are set for a property of a tag or an edge type and the property's value is `NULL`, the property never expires. 
    - If a property with a default value of `now()` is added to a tag or an edge type and the TTL options are set for the property, the history data related to the tag or the edge type will never expire because the value of that property for the history data is the current timestamp.
  
### Vertex property expiration

Vertex property expiration has the following impact.

* If a vertex has only one tag, once a property of the vertex expires, the vertex expires.

* If a vertex has multiple tags, once a property of the vertex expires, properties bound to the same tag with the expired property also expire, but the vertex does not expire and other properties of it remain untouched.

### Edge property expiration

Since an edge can have only one edge type, once an edge property expires, the edge expires.

### Data deletion

The expired data are still stored on the disk, but queries will filter them out.

NebulaGraph automatically deletes the expired data and reclaims the disk space during the next [compaction](../../8.service-tuning/compaction.md).

!!! note

    If TTL is [disabled](#remove_a_timeout), the corresponding data deleted after the last compaction can be queried again.

## Use TTL options

You must use the TTL options together to set a valid timeout on a property.

### Set a timeout if a tag or an edge type exists

If a tag or an edge type is already created, to set a timeout on a property bound to the tag or edge type, use `ALTER` to update the tag or edge type.

```ngql
# Create a tag.
nebula> CREATE TAG IF NOT EXISTS t1 (a timestamp);

# Use ALTER to update the tag and set the TTL options.
nebula> ALTER TAG t1 TTL_COL = "a", TTL_DURATION = 5;

# Insert a vertex with tag t1. The vertex expires 5 seconds after the insertion.
nebula> INSERT VERTEX t1(a) VALUES "101":(now());
```

### Set a timeout when creating a tag or an edge type

Use TTL options in the `CREATE` statement to set a timeout when creating a tag or an edge type. For more information, see [CREATE TAG](../10.tag-statements/1.create-tag.md) and [CREATE EDGE](../11.edge-type-statements/1.create-edge.md).

```ngql
# Create a tag and set the TTL options.
nebula> CREATE TAG IF NOT EXISTS t2(a int, b int, c string) TTL_DURATION= 100, TTL_COL = "a";

# Insert a vertex with tag t2. The timeout timestamp is 1648197238 (1648197138 + 100).
nebula> INSERT VERTEX t2(a, b, c) VALUES "102":(1648197138, 30, "Hello");
```

## Remove a timeout

To disable TTL and remove the timeout on a property, you can use the following approaches.

* Drop the property with the timeout.

    ```ngql
    nebula> ALTER TAG t1 DROP (a);
    ```

* Set `ttl_col` to an empty string.

    ```ngql
    nebula> ALTER TAG t1 TTL_COL = "";
    ```

* Set `ttl_duration` to `0`. This operation keeps the TTL options and prevents the property from expiring and the property schema from being modified.

    ```ngql
    nebula> ALTER TAG t1 TTL_DURATION = 0;
    ```
