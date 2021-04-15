# Limitations

This article introduces the limitations on Studio.

## Nebula Graph versions

For now, only Nebula Graph v{{ nebula.release }} and earlier versions can be used with Studio. Nebula Graph v2.0.0-alpha is not supported.

## Architecture

For now, Docker-based Studio supports x86_64 architecture only.

## Upload data

During the public beta of Nebula Graph Cloud Service, Studio on Cloud has these limitations:

- Only CSV files without headers are supported, and only commas are acceptable separator.
- Each file of a maximum of 100 MB is supported.
- A total amount of a maximum of 1 GB is supported for each Nebula graph instance.
- Each file is stored for only one calendar day.

On Docker-based Studio, only CSV files without headers can be uploaded, but no limitations are applied to the size and store period for a single file. The maximum data volume depends on the storage capacity of your machine.

## Data backup

For now, you can export the queried results in the CSV format on the **Console** page. No other backup methods are available.

## nGQL statements

On the **Console** page of Docker-based Studio, all the nGQL syntaxes except these are supported:

- `USE <space_name>`: You cannot run such a statement on the **Console** page to select a graph space. As an alternative, you can click a graph space name in the drop-down list of **Current Graph Space**.
- You cannot use line breaks (\\). As an alternative, you can use the Enter key to split a line.

For Studio on Cloud, besides the preceding syntax, you cannot run these account and role management statements on the **Console** page:

- `CREATE USER`
- `ALTER USER`
- `CHANGE PASSWORD`
- `DROP USER`
- `GRANT ROLE`
- `REVOKE ROLE`

For more information about the preceding statements, see [Nebula Graph Database Manual](https://docs.nebula-graph.io/manual-EN/3.build-develop-and-administration/4.account-management-statements/alter-user-syntax/).

## Browser

We recommend that you use Chrome to get access to Studio.
