# SHOW ROLES Syntax

```ngql
SHOW ROLES IN <space_name>
```

`SHOW ROLES` statement displays the roles that are assigned to a user account. `SHOW ROLES` output has these columns: account and role type.

If the user is `GOD` or `ADMIN`, **Nebula Graph** shows all roles limited to its authorized space.
If the user is `DBA`, `USER` or `GUEST`, **Nebula Graph** shows only his own role.

For example:

```ngql
nebula> SHOW ROLES in NBA;
=======================
| Account | Role Type |
=======================
| userA   | ADMIN     |
-----------------------
```

See [Create User](../../../../3.build-develop-and-administration/4.account-management-statements/create-user-syntax.md) to create user. See [Grant Role](../../../../3.build-develop-and-administration/4.account-management-statements/grant-role-syntax.md) to grant roles to a user.
