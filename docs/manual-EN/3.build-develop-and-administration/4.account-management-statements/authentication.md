# Authentication

Whenever a client connects to **Nebula Graph**, a session is created. The session stores various contextual information about the connection. Each session is always associated with a single user.

Authentication is the process of mapping this session to a specific user. Once the session is mapped to a user, a set of permissions can be associated with it, using authorization.

**Nebula Graph** supports two authentication methods, explained in detail below - local and LDAP.

## Local authentication

The local database stores usernames, encrypted passwords, local user settings and remote LDAP user settings. When a user tries to access the database, they will be met with a security challenge.

To enable the local authentication, follow these steps:

1. Set the `--enable_authorize` property in the `nebula-graphd.conf` configuration file (the directory is `/usr/local/nebula/etc/` by default) to `true`.
2. Save your modification in step one and close the `nebula-graphd.conf` configuration file.
3. Restart the Nebula Graph services.

## LDAP authentication

Lightweight Directory Access Protocol (LDAP) is a lightweight client-server protocol for accessing directory services. Users stored inside LDAP take precedence over the local database users. For example, if both providers have a user called “Amber”, the settings and roles for this user will be sourced from LDAP.

Unlike local authentication, besides enabling the `--enable_authorize` parameter, LDAP needs to be configured in the `nebula-graphd.conf` file (the directory is `/usr/local/nebula/etc/` by default). Refer to the [Integrating LDAP Document](LDAP.md) for details.

### LDAP parameters

| Parameter            | Type   | Default Value                                                             | Description                                                                                            |
| -------------------- | ------ | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| ldap_server          | string | ""                                                                        | A list of ldap server addresses. Multiple addresses are separated with commas.                         |
| ldap_port            | INT32  | Ldap server port. If no port is specified, the default port will be used. |
| ldap_scheme          | string | "ldap"                                                                    | Only supports ldap.                                                                                    |
| ldap_tls             | bool   | false                                                                     | Enable/disable the TLS encryption between graphd and the LDAP server.                                  |
| ldap_suffix          | string | ""                                                                        | Specifies the root suffix (naming context) to use for all LDAP operations.                             |
| ldap_basedn          | string | ""                                                                        | The LDAP distinguished name (DN) of the search base.                                                   |
| ldap_binddn          | string | ""                                                                        | The LDAP user who is allowed to search the base DN.                                                    |
| ldap_bindpasswd      | string | ""                                                                        | The password of the user who is mentioned in the bind DN.                                              |
| ldap_searchattribute | string | ""                                                                        | An array of the required attributes.                                                                   |
| ldap_searchfilter    | string | ""                                                                        | Specifies a search filter by defining what to search for. It is more flexible than the searchattribut. |

## FAQ

### Error information: Authentication fails, Invalid data length

Authentication fails because you had not enable the authentication. Follow the preceding steps to enable the authentication.

<!-- restrict the attributes and values returned by the server to just those required. -->
<!-- When LDAP is turned on, the following security settings can be used to configure it:

### ObjectClass

ObjectClass attribute specifies the object classes of an entry, which (among other things) are used in conjunction with the controlling schema to determine the permitted attributes of an entry.

| objectClass        | Description                                                                        |
| ------------------ | ---------------------------------------------------------------------------------- |
| olcGlobal          | Type of the global configuration file. `cn=config.ldif`                            |
| top                | Top objects                                                                        |
| organization       | Organization may be Organizational Entity like a Company or an Employer.           |
| organizationalUnit | Generally assumed to be a relatively static grouping within a larger organization. |
| inetOrgPerson      | Real user type.  In Active Directory, this class has user as a parent class.       |
| groupOfNames       | A LDAP group.                                                                      |
| olcModuleList      | Object of the configured module list.                                              |

### LDAP Keywords

| Keywords | Full Name          | Description                                                                                                                                                                    |
| -------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| dc       | Domain Component   | The dc refers to each component of the domain. For example example.com can be written as dc=example,dc=com                                                                     |
| uid      | User Id            | uid is an LDAP attribute that means user id. For example “tom”.                                                                                                                |
| ou       | Organization Unit  | The organizational unit attribute refers to the organizational unit (or sometimes the user group) that the user is part of.                                                    |
| cn       | Common Name        | Common Names. For example “Thomas Johnson”.                                                                                                                                    |
| sn       | Surname            | Surnames. For example “Johnson”.                                                                                                                                               |
| dn       | Distinguished Name | The unique identifier for an entry in the tree, similar to the absolute path in the Linux file system. For example “uid= tom,ou=market,dc=example,dc=com” is unique in a tree. |
| rdn      | Relative dn        | Each entry has a unique name relative to its parent called RDN. For example “uid=tom” or “cn= Thomas Johnson”.                                                                 |
| c        | Country            | c is an LDAP attribute that means country name. For example "CN" and "US".                                                                                                     |
| o        | Organization       | Organization name. For example “Example, Inc.”                                                                                                                                 |  | -->
