# Limitations

This article introduces the limitations of Studio v2.x.

## Nebula Graph versions

Only Nebula Graph v2.x is supported.

If you are using Nebula Graph v1.x, please use Studio v1.x. For more information, see [Studio v1.x User Guide](https://docs.nebula-graph.io/1.1/nebula-studio/about-studio/st-ug-what-is-graph-studio/).

## Architecture

For now, Docker-based Studio supports x86_64 architecture only.

## Upload data

On Docker-based Studio, only CSV files without headers and comma-separated data can be uploaded, but no limitations are applied to the size and store period for a single file. The maximum data volume depends on the storage capacity of your machine.

## Data backup

For now, you can export the queried results in the CSV format on the **Console** page. No other backup methods are available.

## nGQL statements

On the **Console** page of Docker-based Studio, all the nGQL syntaxes except these are supported:

- `USE <space_name>`: You cannot run such a statement on the **Console** page to select a graph space. As an alternative, you can click a graph space name in the drop-down list of **Current Graph Space**.
- You cannot use line breaks (\\). As an alternative, you can use the Enter key to split a line.

## Browser

We recommend that you use Chrome to get access to Studio.
