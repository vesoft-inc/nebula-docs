# CREATE SPACE Syntax

```ngql
CREATE SPACE [IF NOT EXISTS] <space_name>
   [(partition_num = <part_num>, replica_factor = <raft_copy>, charset = <charset>, collate = <collate>)]
```

This statement creates a new space with the given name. SPACE is a region that provides physically isolated graphs in **Nebula Graph**. An error occurs if the database exists.

## IF NOT EXISTS

You can use the `If NOT EXISTS` keywords when creating spaces. This keyword automatically detects if the corresponding space exists. If it does not exist, a new one is created. Otherwise, no space is created.

**Note:** The space existence detection here only compares the space name (excluding properties).

## Space Name

* **space_name**

    The name uniquely identifies the space in a cluster. The rules for the naming are given in [Schema Object Names](../../3.language-structure/schema-object-names.md)

## Customized Space Options

When creating a space, the following two customized options can be given:

* _partition_num_

    _partition_num_ specifies the number of partitions in one replica. The default value is 100. It is usually 5 times the number of hard disks in the cluster.

* _replica_factor_

    _replica_factor_ specifies the number of replicas in the cluster. The default replica factor is 1. The suggested number is 3 in cluster. It is usually 3 in production.

* _charset_

    _charset_ is short for character set. A character set is a set of symbols and encodings. The default value is utf8.

* _collate_

    A _collation_ is a set of rules for comparing characters in a character set. The default value is utf8_bin.

However, if no option is given, **Nebula Graph** will create the space with the default partition number, replica factor, charset and collate.

## Example

```ngql
nebula> CREATE SPACE my_space_1; -- create space with default partition number and replica factor
nebula> CREATE SPACE my_space_2(partition_num=10); -- create space with default replica factor
nebula> CREATE SPACE my_space_3(replica_factor=1); -- create space with default partition number
nebula> CREATE SPACE my_space_4(partition_num=10, replica_factor=1);
```

## Checking Partition Distribution

On some large clusters, due to the different startup time, the partition distribution may be unbalanced. You can check the machine and distribution by the following command (SHOW HOSTS).

```ngql
nebula> SHOW HOSTS;
================================================================================================
| Ip            | Port  | Status | Leader count | Leader distribution | Partition distribution |
================================================================================================
| 192.168.8.210 | 34600 | online | 13           | test: 13            | test: 37               |
------------------------------------------------------------------------------------------------
| 192.168.8.210 | 34900 | online | 12           | test: 12            | test: 38               |
------------------------------------------------------------------------------------------------
```

If all the machines are online status, but the partition distribution is unbalanced, you can use the following command (BALANCE LEADER) to redistribute the partitions.

```ngql
nebula> BALANCE LEADER;
```

Details see [SHOW HOSTS](../3.utility-statements/show-statements/show-hosts-syntax.md) and [BALANCE](../../../3.build-develop-and-administration/5.storage-service-administration/storage-balance.md).
