# Database user management

NebulaGraph Explorer supports managing the users in the NebulaGraph database, including creating users, deleting users, changing passwords, etc.

## Prerequisites

The user who logs in to Explorer must have permissions for related operations. For example, users with `God` permission can perform all operations, and users with `Admin` permission can authorize the permission of a graph space within their permission to other users. For details about role privileges, see [Roles and privileges](../..//7.data-security/1.authentication/3.role-list.md).

## Entry

At the top navigation bar, click ![db_user_management](https://docs-cdn.nebula-graph.com.cn/figures/db_user_management_221024.png) .

## Create user

!!! note

    - Only the `root` user can create users.
    - Since there is a compatibility issue with the nGQL syntax, the IP whitelist modification function is disabled when connecting to the graph database of version 3.5.x and below. You can modify the IP whitelist by executing the nGQL statement for the corresponding database version.

1. In the tab **User list**, click **Create User** and set the following parameters.

  |Parameters|Description|
  |:--|:--|
  |Account| The user name.|
  |Password| The password corresponding to the user name.|
  |IP Whitelist| The user can connect to NebulaGraph only from IP addresses in the list. Use commas to separate multiple IP addresses. Only NebulaGraph Enterprise Edition supports the parameter.|

  !!! note

        Click **Add** in the upper left corner to create users in batches.

2. Click **Confirm**.

## Authorize user

1. Switch the tab to **Authorization**, and select the name of the graph space that you want to authorize to a user in the upper left corner. The page shows all users (except `root` user) who have permission on the graph space.

2. Click **Grant Role** and set the following parameters.

  |Parameters|Description|
  |:--|:--|
  |Username| Set the user name to be authorized. If you log in as the `root` user, select the user from the drop-down menu. If you log in with the `Admin` permission, fill in the user name manually.|
  |Role| Select the role to be authorized from the drop-down menu. For details about role privileges, see [Roles and privileges](../..//7.data-security/1.authentication/3.role-list.md).|

3. Click **Confirm**.

## Other operations in the user list

!!! note

    Only the `root` user can view the **User List**.

- View: View the user permissions in each space.
- Edit: Change the password or IP whitelist of the user. You do not need to provide the old password when changing the password. If the user is not `root`, you can change the password in ![clear_connection](https://docs-cdn.nebula-graph.com.cn/figures/session_221024.png) on the upper right corner of the page.
- Delete User: Only the `root` user can delete other users.
- Search user: Search for the account by keyword.

## Other operations in the authorization

- Edit: Change the role of the user.
- Revoke Role: Revoke the role of the user.
- Search user: Search for the account by keyword.

!!! note

    After a user is modified or revoked, the modification takes effect only after the user logs in next time.
