# NebulaGraph Studio release notes

<!--
## v3.8.0
- Enhancements
  - Compatibility
    Since the database table structure has changed, you need to set `DB.AutoMigrate` to `true` in the configuration file, and the system will automatically upgrade and adapt the existing historical data.

    If the tables were created manually after you consulted our after-sales staff, please modify these tables manually: `task_infos`, `task_effects`, `sketches`, `schema_snapshots`, `favorites`, `files`, and `datasources`.
    
    For example:

    ```mysql
    ALTER TABLE `task_infos` ADD COLUMN `b_id` CHAR(32) NOT NULL DEFAULT '';
    UPDATE TABLE `task_infos` SET `b_id` = `id`;
    CREATE UNIQUE INDEX `idx_task_infos_id` ON `task_infos`(`b_id`);

    ALTER TABLE `task_effects` ADD COLUMN `b_id` CHAR(32) NOT NULL DEFAULT '';
    UPDATE TABLE `task_effects` SET `b_id` = `id`;
    CREATE UNIQUE INDEX `idx_task_effects_id` ON `task_effects`(`b_id`);
    ...
    ```
-->

## v3.7.0

- Enhancements

  - Supported importing SFTP, Amazon S3 data files.
  - The import page is supported to configure more import parameters, such as concurrency, retries, etc.
  - Supported re-running tasks.
  - Supported saving tasks as drafts.
  - Supported ARM architecture.

## v3.6.0

- Feature
  - Support viewing the [creation statements](../../nebula-studio/manage-schema/st-ug-view-schema.md) of the schema.
  - Add a product feedback page.

- Enhancement
  - Remove the timeout limit for slow queries.
  - Display browser compatibility hints.
  - Optimize the login page.
  - Support adding comments with `#` on the console page.
  - Optimize the console page.

- Bugfix

  - Fix the bug that the list has not been refreshed after uploading files.
  - Fix the invalid error message of the schema drafting.
  - Fix the bug that the **view schema** data has not been cleared after switching the login user.
  - Fix the presentation problem of the thumbnail in the schema drafting.
