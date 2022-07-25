# Limitations

This topic introduces the limitations of Studio.

## Nebula Graph versions

!!! Note

    The Studio version is released independently of the Nebula Graph core. The correspondence between the versions of Studio and the Nebula Graph core, as shown in the table below.

| Nebula Graph version | Studio version |
| --- | --- |
| 1.x | 1.x|
| 2.0 & 2.0.1 | 2.x |
| 2.5.x | 3.0.0 |
| 2.6.x | 3.1.x |
| 3.0.0 | 3.2.x |
| 3.1.0 | 3.3.2 |
| 3.0.0 ～ 3.2.0| 3.4.0|

## Architecture

For now, Studio v3.x supports x86_64 architecture only.

## Upload data

<!--
During the public beta of Nebula Graph Cloud Service, Studio on Cloud has these limitations:

- Only CSV files without headers are supported, and only commas are separators separator.
- Each file of a maximum of 100 MB is supported.
- A total amount of a maximum of 1 GB is supported for each Nebula graph instance.
- Each file is stored for only one calendar day.

-->

Only CSV files without headers can be uploaded, but no limitations are applied to the size and store period for a single file. The maximum data volume depends on the storage capacity of your machine.

## nGQL statements

On the **Console** page of Docker-based and RPM-based Studio v3.x, all the nGQL syntaxes except these are supported:

- `USE <space_name>`: You cannot run such a statement on the **Console** page to choose a graph space. As an alternative, you can click a graph space name in the drop-down list of **Current Graph Space**.
- You cannot use line breaks (\\). As an alternative, you can use the Enter key to split a line.

<!--
For Studio on Cloud, besides the preceding syntax, you cannot run these account and role management statements on the Console page:

- `CREATE USER`
- `ALTER USER`
- `CHANGE PASSWORD`
- `DROP USER`
- `GRANT ROLE`
- `REVOKE ROLE`  
-->

For more information about the preceding statements, see[User management](../../7.data-security/1.authentication/2.management-user.md)

## Browser

We recommend that you use the latest version of Chrome to get access to Studio.
