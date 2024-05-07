# NebulaGraph Studio release notes

## v3.10.0 (2024.5)

- Enhancements

  - Adjusted the default maximum length of the context for AI Assistant.
  - Adjusted certain copywriting and styles in the UI.

- Bug fixes
  - Fixed the error in the example file that was provided in the Import Template section.
  - Fixed the bug where the default value was non-null when creating tags or edge types.
  - Fixed the page crash when editing a large number of properties on the import task page.

## v3.9.1 (2024.2)

- Bug fixes
  - Fixed the bug where the parameter `NOT NULL` is used as property values in schema drafting. Replaced it with the default parameter `NULL`.

## v3.9.0 (2024.1)

- Features
  - Supported importing data using [AI](../../nebula-studio/quick-start/st-ug-import-data.md).
  - Supported the generation of nGQL statements using the [AI Assistant](../../nebula-studio/quick-start/st-ug-console.md).

- Enhancements
  - Optimized the [console feature](../../nebula-studio/quick-start/st-ug-console.md), including automatic completion of a tag or edge type, quick selection of the historical statements, quick viewing of the schema, etc.
  - Optimized the presentation style of the [execution plan](../../nebula-studio/quick-start/st-ug-console.md).