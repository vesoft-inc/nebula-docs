# NebulaGraph Studio release notes

## v3.8.0

- Features
  - Supported the use of MySQL databases as backend storage.

- Enhancements
  - Supported customizing the read and write parameters of the WebSocket.
  - Usability
    - Supported filtering tasks in the import task list based on the map space name.
  - Compatibility
    - Since the database table structure has changed, you need to set `DB.AutoMigrate` to `true` in the configuration file, and the system will automatically upgrade and adapt the existing historical data.

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


## v3.7.0

- Enhancements

  - Supported importing SFTP, Amazon S3 data files.
  - The import page is supported to configure more import parameters, such as concurrency, retries, etc.
  - Supported re-running tasks.
  - Supported saving tasks as drafts.
  - Supported ARM architecture.

