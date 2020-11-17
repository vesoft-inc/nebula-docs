# Limitations

This article introduces the limitations on Studio.

## Nebula Graph versions

For now, only Nebula Graph V1.1.0 and earlier versions can be used with Studio. Nebula Graph V2.0.0-alpha is not supported.

## Upload data

With Nebula Graph Cloud Service, during the public beta, Studio has these limitations:

- Only CSV files without headers are supported.
- Each file of a maximum of 100 MB is supported.
- A total amount of a maximum of 1 GB is supported for each Nebula graph instance.
- Each file is stored for only one calendar day.

Manually deployed Studio has these limitations:

- Only CSV files without headers are supported.
- No limitations on the size and store period for a single file. The maximum data volume depends on the storage capacity of your machine.

## Data backup

For now, you can export the queried results in the CSV format on the **Console** page. No other backup methods are available.

## nGQL statements

On the **Console** page, you can run all the nGQL statements except these:

- `USE <space_name>`: You cannot run such a statement on the **Console** page to select a graph space. As an alternative, you can click a graph space name in the drop-down list of **Current Graph Space**.
- You cannot use line break (\\). As an alternative, you can use the Enter key.

## Browser

We recommend that you use Chrome to get access to Studio.
