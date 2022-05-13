# Manage Storage hosts

Starting from Nebula Graph 3.0.0, setting Storage hosts in the configuration files only registers the hosts on the Meta side, but does not add them into the cluster. You must run the `ADD HOSTS` statement to add the Storage hosts.

## Add Storage hosts

Add the Storage hosts to a Nebula Graph cluster.

```ngql
ADD HOSTS <ip>:<port> [,<ip>:<port> ...];
```

!!! note

  - To make sure the follow-up operations work as expected, wait for two heartbeat cycles, i.e., 20 seconds, and then run `SHOW HOSTS` to check whether the host is online.

  - Make sure that the IP address and port number are the same as those in the configuration file. For example, the default IP address and port number in standalone deployment are `127.0.0.1:9779`.

## Drop Storage hosts

Delete the Storage hosts from cluster.

!!! note

    You can not delete an in-use Storage host directly. Delete the associated graph space before deleting the Storage host.

```ngql
DROP HOSTS <ip>:<port> [,<ip>:<port> ...];
```
