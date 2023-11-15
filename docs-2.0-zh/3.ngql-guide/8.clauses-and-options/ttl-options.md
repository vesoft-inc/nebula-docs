# TTL

TTL（Time To Live）是一个定义数据生存期的机制。当数据达到其预设的生存时间后，它会被自动从图数据库中删除。这种功能尤其适合于只需要暂时存储的数据，例如临时会话或缓存数据。

## openCypher 兼容性

本文操作仅适用于原生 nGQL。

## 注意事项

- 不能修改带有 TTL 选项的属性的 Schema。

- TTL 和 INDEX 共存问题：

  - 如果一个 Tag/Edge type 的其中一属性已有 INDEX，则不能为其设置 TTL，也不能为该 Tag 的其他属性设置 TTL。    

  - 如果已有 TTL，可以再添加 INDEX。

## TTL 选项

nGQL 支持的 TTL 选项如下。

|选项|说明|
|:---|:---|
|`ttl_col`|指定一个现有的要设置存活时间的属性。属性的数据类型必须是`int`或者`timestamp`。|
|`ttl_duration`|指定时间戳差值，默认单位：秒。时间戳差值必须为 64 位非负整数。属性值和时间戳差值之和如果小于当前时间戳，属性就会过期。如果`ttl_duration`为`0`，属性永不过期。<br/>可在配置文件`nebula-storaged.conf`（默认路径`/usr/local/nightly/etc/`）中设置`ttl_use_ms`为`true`将默认单位设为毫秒。|

!!! warning

    - 在设置`ttl_use_ms`为`true`前，请确保没有为属性设置 TTL，否则会因为过期时间缩短，导致数据被错误地删除。
    - 在设置`ttl_use_ms`为`true`后，即设置`ttl_duration`的默认单位为毫秒后，`ttl_col`的默认单位仍然为秒，它的数据类型必须是`int`，并且需要手动转换属性值为毫秒。例如设置`ttl_col`为`a`，则需要将`a`的值转换为毫秒，如当`a`的值为`now()`，则需要将`a`的值设置为`now() * 1000`。

## 使用 TTL 选项

在使用 TTL 功能之前，必须先创建一个时间戳或整数属性，并在 TTL 选项中指定了它。数据库不会自动为您创建或管理这个时间戳属性。

在插入时间戳或整数属性的值时，建议使用`now()`函数或者当前时间戳来代表当前时间。

### Tag 或 Edge type 已存在

如果 Tag 和 Edge type 已经创建，请使用`ALTER`语句更新 Tag 或 Edge type。

```ngql
# 创建 Tag。
nebula> CREATE TAG IF NOT EXISTS t1 (a timestamp);

# ALTER 修改 Tag，添加 TTL 选项。
nebula> ALTER TAG t1 TTL_COL = "a", TTL_DURATION = 5;

# 插入点，插入后 5 秒过期。
nebula> INSERT VERTEX t1(a) VALUES "101":(now());
```

### Tag 或 Edge type 不存在

创建 Tag 或 Edge type 时可以同时设置 TTL 选项。详情请参见 [CREATE TAG](../10.tag-statements/1.create-tag.md) 和 [CREATE EDGE](../11.edge-type-statements/1.create-edge.md)。

```ngql
# 创建 Tag 并设置 TTL 选项。
nebula> CREATE TAG IF NOT EXISTS t2(a int, b int, c string) TTL_DURATION= 100, TTL_COL = "a";

# 插入点。过期时间戳为 1648197238（1648197138 + 100）。
nebula> INSERT VERTEX t2(a, b, c) VALUES "102":(1648197138, 30, "Hello");
```

## 属性过期

!!! caution 

    - 当为一个 Tag 或 Edge type 的属性设置 TTL 并该属性的值为`NULL`时，TTL 功能不会生效，即该属性永不过期。
      
    - 如果为一个 Tag 或 Edge type 新增默认值为`now()`的属性并且该属性设置了 TTL，该 Tag 或 Edge type 相关的历史数据不会过期，因为历史数据的该属性值为当前时间戳。

### 点属性过期

点属性过期有如下影响：

- 如果一个点仅有一个 Tag，点上的一个属性过期，点也会过期。

- 如果一个点有多个 Tag，点上的一个属性过期，和该属性相同 Tag 的其他属性也会过期，但是点不会过期，点上其他 Tag 的属性保持不变。

### 边属性过期

因为一条边仅有一个 Edge type，边上的一个属性过期，边也会过期。

## 过期处理

属性过期后，对应的过期数据仍然存储在硬盘上，但是查询时会过滤过期数据。

 {{nebula.name}} 自动删除过期数据后，会在下一次 [Compaction](../../8.service-tuning/compaction.md) 过程中回收硬盘空间。

!!! note

    如果[关闭 TTL 选项](#ttl_1)，上一次 Compaction 之后的过期数据将可以被查询到。

## 删除存活时间

删除存活时间可以使用如下几种方法：

- 删除设置存活时间的属性。

    ```ngql
    nebula> ALTER TAG t1 DROP (a);
    ```

- 设置`ttl_col`为空字符串。

    ```ngql
    nebula> ALTER TAG t1 TTL_COL = "";
    ```

- 设置`ttl_duration`为`0`。本操作可以保留 TTL 选项，属性永不过期，且属性的 Schema 无法修改。

    ```ngql
    nebula> ALTER TAG t1 TTL_DURATION = 0;
    ```
