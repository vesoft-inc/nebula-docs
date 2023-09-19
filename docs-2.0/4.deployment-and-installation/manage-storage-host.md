# Manage Storage hosts

Starting from NebulaGraph 3.0.0, setting Storage hosts in the configuration files only registers the hosts on the Meta side, but does not add them into the cluster. You must run the `ADD HOSTS` statement to add the Storage hosts.

!!! note

    NebulaGraph Cloud clusters add Storage hosts automatically. Cloud users do not need to manually run `ADD HOSTS`.

## Prerequisites

- [You have connected to the NebulaGraph database](connect-to-nebula-graph.md).

## Add Storage hosts

Add the Storage hosts to a NebulaGraph cluster.

```ngql
nebula> ADD HOSTS <ip>:<port> [,<ip>:<port> ...];
nebula> ADD HOSTS "<hostname>":<port> [,"<hostname>":<port> ...];
```

!!! note

    - To make sure the follow-up operations work as expected, wait for two heartbeat cycles, i.e., 20 seconds, and then run `SHOW HOSTS` to check whether the host is online.

    - Make sure that the IP address and port number are the same as those in the configuration file. For example, the default IP address and port number in standalone deployment are `127.0.0.1:9779`.

    - When using a domain name, enclose it in quotation marks, for example, `ADD HOSTS "foo-bar":9779`.

    - Ensure that the storage host to be added is not used by any other cluster, otherwise, the storage adding operation will fail.

{{ent.ent_begin}}

When adding a Storage host to a cluster with the Zone feature enabled, you must specify the `INTO ZONE` option; otherwise, the addition of the Storage node will fail. For more details, see [Managing Zones](5.zone.md).

{{ent.ent_end}}

## Drop Storage hosts

Delete the Storage hosts from cluster.

!!! note

    You can not delete an in-use Storage host directly. Delete the associated graph space before deleting the Storage host.

```ngql
nebula> DROP HOSTS <ip>:<port> [,<ip>:<port> ...];
nebula> DROP HOSTS "<hostname>":<port> [,"<hostname>":<port> ...];
```


## View Storage hosts

View the Storage hosts in the cluster.

```ngql
nebula> SHOW HOSTS STORAGE;
+-------------+------+----------+-----------+--------------+---------+
| Host        | Port | Status   | Role      | Git Info Sha | Version |
+-------------+------+----------+-----------+--------------+---------+
| "storaged0" | 9779 | "ONLINE" | "STORAGE" | "3ba41bd"    | "{{nebula.release}}" |
| "storaged1" | 9779 | "ONLINE" | "STORAGE" | "3ba41bd"    | "{{nebula.release}}" |
| "storaged2" | 9779 | "ONLINE" | "STORAGE" | "3ba41bd"    | "{{nebula.release}}" |
+-------------+------+----------+-----------+--------------+---------+
```
