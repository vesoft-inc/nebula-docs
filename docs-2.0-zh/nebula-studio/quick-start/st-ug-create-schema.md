# 创建 Schema

在 {{nebula.name}} 中，用户必须先有 Schema，才能向其中写入点数据和边数据。本文描述如何使用 {{nebula.name}} 的**控制台**或 **Schema** 功能创建 Schema。

!!! note

    - 用户可以使用 nebula-console 创建 Schema。详情参见 [{{nebula.name}} 使用手册](../../README.md)和 [{{nebula.name}} 快速开始](../../2.quick-start/1.quick-start-overview.md)。
    - 用户可以使用 Schema 草图功能图形化设计 Schema。详情参见 [Schema 草图](draft.md)。

## 前提条件

在 Studio 上创建 Schema 之前，用户需要确认以下信息：

- Studio 已经连接到 {{nebula.name}} 数据库。

- 账号拥有 GOD、ADMIN 或 DBA 权限。详细信息，参考 [{{nebula.name}} 内置角色](../../7.data-security/1.authentication/3.role-list.md)。

- 已经规划 Schema 的要素。

- 已经创建图空间。

!!! note

    本示例已经创建图空间。如果账号拥有 GOD 权限，也可以在 **控制台** 或 **Schema** 上创建一个图空间。

## 使用 Schema 管理功能创建 Schema

按以下步骤使用 **Schema** 管理功能创建 Schema：

1. 创建 Tag。详细信息，参考[操作 Tag](../manage-schema/st-ug-crud-tag.md)。

2. 创建 Edge type。详细信息，参考[操作 Edge type](../manage-schema/st-ug-crud-edge-type.md)。

## 使用控制台创建 Schema

1. 在顶部导航栏里，点击 **控制台** 页签。

2. 在 **当前 Space** 中选择一个图空间。在本示例中，选择 **basketballplayer**。

   ![在当前 Space 中选择一个图空间](https://docs-cdn.nebula-graph.com.cn/figures/st-ug-009-cn.png "选择图空间")

3. 在命令行中，依次输入以下语句，并点击右侧的**运行**按钮。

   ```nGQL
   // 创建 Tag player，带有 2 个属性
   CREATE TAG player(name string, age int);

   // 创建 Tag team，带有 1 个属性
   CREATE TAG team(name string);

   // 创建 Edge type follow，带有 1 个属性
   CREATE EDGE follow(degree int);

   // 创建 Edge type serve，带有 2 个属性
   CREATE EDGE serve(start_year int, end_year int);
   ```

至此，用户已经完成了 Schema 创建。用户可以运行以下语句查看 Tag 与 Edge type 的定义是否正确、完整。

```nGQL
// 列出当前图空间中所有 Tag
SHOW TAGS;

// 列出当前图空间中所有 Edge type
SHOW EDGES;

// 查看每种 Tag 和 Edge type 的结构是否正确
DESCRIBE TAG player;
DESCRIBE TAG team;
DESCRIBE EDGE follow;
DESCRIBE EDGE serve;
```

## 后续操作

创建 Schema 后，用户可以开始[导入数据](st-ug-import-data.md)。
