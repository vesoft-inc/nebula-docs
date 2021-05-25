# TTL

TTL indicates time to live. Use the [TTL options](#ttl_options) to specify a timeout for a property. Once timed out, the property expires.

## OpenCypher Compatibility

This topic applies to native nGQL only.

## Precautions

* You CANNOT modify a property schema with TTL options on it.

* TTL options and indexes CANNOT coexist on a tag or an edge type. Not even if you try to set them on different properties.

## Data expiration and deletion

### Vertex property expiration

Vertex property expiration has the following impact.

* If a vertex has only one tag, once a property of the vertex expires, the vertex expires.

* If a vertex has multiple tags, once a property of the vertex expires, properties bound to the same tag with the expired property also expires, but the vertex does not expire and other properties of it remain untouched.

### Edge property expiration

Since an edge can have only one edge type, once an edge property expires, the edge expires.

### Data deletion

The expired data are still stored on the disk, but queries will filter them out.

Nebula Graph automatically deletes the expired data and reclaims the disk space during the next [compaction](../../8.service-tuning/compaction.md).

!!! note

    If TTL is [disabled](#remove_a_timeout), the corresponding data deleted after the last compaction can be queried again.

## TTL options

The native nGQL TTL feature has the following options.

|Option|Description|
|-|-|
|`ttl_col`|Specifies the property to set a timeout on. The data type of the property must be int or timestamp.|
|`ttl_duration`|Specifies the timeout adds-on value in seconds. The value must be a non-negative int64 number. A property expires if the sum of its value and the `ttl_duration` value is smaller than the current timestamp. If the `ttl_duration` value is 0, the property never expires.|

## Use TTL options

You must use the TTL options together to set a valid timeout on a property.

### Set a timeout if a tag or an edge type exists

If a tag or an edge type is already created, to set a timeout on a property bound to the tag or edge type, use `ALTER` to update the tag or edge type.

```ngql
// Create a tag.
nebula> CREATE TAG t1 (a timestamp);
Execution succeeded (time spent 4172/5377 us)

// Use ALTER to update the tag and set the TTL options.
nebula> ALTER TAG t1 ttl_col = "a", ttl_duration = 5;
Execution succeeded (time spent 2975/3700 us)

// Insert a vertex with tag t1. The vertex expires 5 seconds after the insertion.
nebula> INSERT VERTEX t1(a) values "101":(now());
Execution succeeded (time spent 1902/2642 us)
```

### Set a timeout when creating a tag or an edge type

Use TTL options in the `CREATE` statement to set a timeout when creating a tag or an edge type. For more information, see [CREATE TAG](../10.tag-statements/1.create-tag.md) or [CREATE EDGE](../11.edge-type-statements/1.create-edge.md).

```ngql
// Create a tag and set the TTL options.
nebula> CREATE TAG t2(a int, b int, c string) ttl_duration= 100, ttl_col = "a";
Execution succeeded (time spent 3173/3753 us)

// Insert a vertex with tag t2.
// The timeout timestamp is 1612778164774 (1612778164674 + 100).
nebula> INSERT VERTEX t2(a, b, c) values "102":(1612778164674, 30, "Hello");
Execution succeeded (time spent 1254/1921 us)
```

## Remove a timeout

To disable TTL and remove the timeout on a property, use the following approaches.

* Set `ttl_col` to an empty string.

    ```ngql
    nebula> ALTER TAG t1 ttl_col = "";
    ```

* Drop the property with the timeout.

    ```ngql
    nebula> ALTER TAG t1 DROP (a);
    ```

* Set `ttl_duration` to 0. This operation keeps the TTL options and prevents the property from expiring and the property schema from being modified.

    ```ngql
    nebula> ALTER TAG t1 ttl_duration = 0;
    ```

