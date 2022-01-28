# Manage Storage host

From Nebula Graph version 3.0.0, the Storage hosts added in the configuration files **CANNOT** be read or written directly. The configuration files only register the Storage hosts into the Meta services. You must run the `ADD HOSTS` command to read and write data on Storage hosts.

## Add Storage host

Add the Storage hosts to a Nebula Graph cluster.

```ngql
ADD HOSTS <ip>:<port> [,<ip>:<port> ...];
```

## Drop Storage host

Delete the Storage hosts from cluster.

!!! note

    You can not delete an in-use Storage host directly. Delete the associated graph space before deleting the Storage host.

```ngql
DROP HOSTS <ip>:<port> [,<ip>:<port> ...];
```