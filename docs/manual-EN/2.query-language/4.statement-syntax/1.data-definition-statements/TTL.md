# TTL (time-to-live)

With **TTL**, **Nebula Graph** provides the ability to delete the expired vertices or edges automatically. The system will automatically delete the expired data during the compaction phase. Before compaction, query will filter the expired data.

TTl requires `ttl_col` and `ttl_duration` together. `ttl_col` indicates the TTL column, while `ttl_duration` indicates the duration of the TTL. When the sum of the TTL column and the ttl_duration is less than the current time, we consider the data as expired. The `ttl_col` type is integer or timestamp, and is set in seconds. `ttl_duration` is also set in seconds.

## TTL configurations

- The `ttl_duration` is set in seconds. If it is set to -1 or 0, the vertex property in the tag does not expire.

- If TTL is set, when the sum of the `ttl_col` and the `ttl_duration` is less than the current time, we consider the the vertex property in the tag as expired.

- -When the vertex has multiple tags, the ttl of each tag is processed separately.

## Setting a TTL Value

- Setting a TTL value for the existed tag.

```ngql
nebula> CREATE TAG t1(a timestamp);
nebula> ALTER TAG t1 ttl_col = "a", ttl_duration = 5; -- Setting ttl
nebula> INSERT VERTEX t1(a) values 101:(now());
```

The vertex 101 property in tag t1 will expire after 5 seconds since specified by now().

- Or you can set the TTL attribute when creating the tag.

```ngql
nebula> CREATE TAG t(a int, b int, c string) ttl_duration= 100, ttl_col = "a";
```

## Dropping TTL

If you have set a TTL value for a field and later decide do not want it to ever automatically expire, you can drop the TTL value or invalidate it. For example, using the previous example.

Drop the TTL attribute:

```ngql
nebula> ALTER TAG t ttl_col = ""; -- drop ttl attribute
```

Drop the field a with the ttl attribute:

```ngql
nebula> ALTER TAG t DROP a; -- drop field a with the ttl attribute
```

Invalidate the TTL:

```ngql
nebula> ALTER TAG t ttl_duration = 0; -- keep the ttl but the data never expires
```

## Tips on TTL

- If a field contains a TTL value, you can't make any change on the field.

``` ngql
nebula> ALTER TAG t ADD ttl_col = "b", ttl_duration = 1000;
nebula> ALTER TAG t CHANGE (b string); -- failed
```

- Note that the a tag or an edge cannot have both the TTL attribute and index at the same time.

``` ngql
nebula> CREATE TAG t(a int, b int, c string) ttl_duration = 100, ttl_col = "a";
nebula> CREATE TAG INDEX id1 ON t(a); -- failed
```

```ngql
nebula> CREATE TAG t1(a int, b int, c string);
nebula> CREATE TAG INDEX id1 ON t1(a);
nebula> ALTER TAG t1 ADD ttl_col = "a", ttl_duration = 100; -- failed
```

- Adding TTL to an edge is similar to a tag.
