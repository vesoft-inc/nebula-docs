# NebulaGraph Studio 更新说明

## v3.10.0（2024.5）

- 增强
  - 调整 AI Assistant 默认最大上下文长度。
  - 调整部分文案与样式。

- 缺陷修复
  - 修复导入模板的示例文件中的错误。
  - 修复创建 Tag 或 Edge type 时默认值为非 NULL 的问题。
  - 修复在导入任务页面编辑大量属性时页面崩溃的问题。

## v3.9.1（2024.2）

- 缺陷修复
  - 修复 Schema 草图中属性值使用参数`NOT NULL`的问题，替换为默认参数`NULL`。

## v3.9.0（2024.1）

- 功能
  - 支持[使用 AI 导入数据](../../nebula-studio/quick-start/st-ug-import-data.md)。
  - 支持[使用 AI 查询语句助手](../../nebula-studio/quick-start/st-ug-console.md)生成 nGQL 语句。

- 增强
  - 优化[控制台功能](../../nebula-studio/quick-start/st-ug-console.md)，包括自动补全 Tag/Edge type、快速选择历史语句、快速查看 Schema 等。
  - 优化[执行计划](../../nebula-studio/quick-start/st-ug-console.md)展示样式。