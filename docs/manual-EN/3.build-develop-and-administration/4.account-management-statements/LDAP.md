# Integrating LDAP

This document describes how to connect **Nebula Graph** to a LDAP server for authentication (only available with the Enterprise Edition).

## About LDAP Integration

LDAP integration allows you to share user identity information and passwords defined in LDAP with **Nebula Graph**.

## Installing LDAP Plugin

1. Build the LDAP server and insert the corresponding record.

    For example, insert the username `test2`  with the corresponding password `passwdtest2`. Then check the user by the following command:

    ```bash
    ldapsearch -x -b 'uid=test2,ou=it,dc=sys,dc=com'
    ```

2. Put the `auth_ldap.so` file in the shared directory of the installation path.
3. Create a shadow account to install the `auth_ldap` plugin.

    Login to **Nebula Graph** as root with password `nebula` and the `auth_type` is `password`:

    ```bash
    ./bin/nebula -u root  -p nebula   --port 3699 --addr="127.0.0.1"
    ```

    Create a shadow account:

    ```ngql
    # You need to authorize the shadow account test2 first
    nebula> CREATE USER test2 WITH PASSWORD "";
    ```

    Install the `auth_ldap` plugin:

    ```ngql
    nebula> INSTALL PLUGIN auth_ldap SONMAE "auth_ldap.so";
    ```

    Check whether the plugin is installed successfully:

    ```ngql
    nebula> SHOW PLUGINS;
    ```

## Uninstalling LDAP Plugin

1. Login to **Nebula Graph** as root with password `nebula` and the `auth_type` is `password`:

    ```bash
    ./bin/nebula -u root  -p nebula   --port 3699 --addr="127.0.0.1"
    ```

2. Run the following command to uninstall the `auth_ldap` plugin:

    ```ngql
    nebula> UNINSTALL PLUGIN auth_ldap;
    ```

## Enabling LDAP Authentication in Nebula Graph

LDAP authentication in **Nebula Graph** is disabled by default. To enable LDAP authentication in **Nebula Graph**:

### Enabling the Authorization

First, enable the authorization. Open the `nebula-graphd.conf` file (the directory is `/usr/local/nebula/etc/` by default), and locate the `--enable_authorize` property. Change the value of the property to true:

```conf
########## Authorization ##########
# Enable authorization
--enable_authorize=true
```

### Configuring Nebula Graph

Then configure **Nebula Graph** to use LDAP. There are two LDAP methods that you use to authenticate your **Nebula Graph** services against an LDAP server.

- **Simple bind authentication**. Open the `nebula-graphd.conf` file (the directory is `/usr/local/nebula/etc/` by default), and locate the `Authentication` section. Change the value of the `auth_type` to `ldap` and add the following properties:

    ```conf
    ########## Authentication ##########
    # User login authentication type, password for nebula authentication, ldap for ldap authentication, cloud for cloud authentication
    --auth_type=ldap
    --ldap_server=127.0.0.1
    --ldap_port=389
    --ldap_scheme=ldap
    --ldap_prefix=uid=
    --ldap_suffix=,ou=it,dc=sys,dc=com
    ```

- **Search and bind authentication**. Open the `nebula-graphd.conf` file (the directory is `/usr/local/nebula/etc/` by default), and locate the `Authentication` section. Change the value of the `auth_type` to `ldap` and add the following properties:

    ```conf
    ########## Authentication ##########
    # User login authentication type, password for nebula authentication, ldap for ldap authentication, cloud for cloud authentication
    --auth_type=ldap
    --ldap_server=127.0.0.1
    --ldap_port=389
    --ldap_scheme=ldap
    --ldap_prefix=uid=
    --ldap_suffix=,ou=it,dc=sys,dc=com
    ```

### Restart Services

Save and close the file. Restart the services:

```bash
/usr/local/nebula/scripts/nebula.service restart all
```

## Disabling LDAP Authentication in Nebula Graph

You can disable LDAP authentication in **Nebula Graph** by setting the  `--enable_authorize` parameter to `false` in the `nebula-graphd.conf` file and restarting the services.

## Connecting to Nebula Graph Through LDAP Authentication

Once configuration completes, you can connect to **Nebula Graph** through LDAP authentication with the following command:

```bash
./bin/nebula -u test2 -p passwdtest2 --port 3699 --addr="127.0.0.1"
```
