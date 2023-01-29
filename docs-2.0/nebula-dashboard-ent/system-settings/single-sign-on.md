# Single sign-on

NebulaGraph Dashboard Enterprise Edition supports general accounts, LDAP accounts, and OAuth2.0 accounts. This article introduces how to configure the protocols of LDAP and OAuth2.0.

!!! note

    - After the configuration is complete, you can create the account and activate the invitation. For details，see [Authority management](../5.account-management.md).
    - You can quickly switch on or off LDAP or OAuth2.0 in the left navigation bar.

## LDAP configuration

### Entry

1. At the top navigation bar of the Dashboard Enterprise Edition page, click **System Settings**.
2. On the left-side navigation bar of the page, click **Single Sign-on**->**LDAP**.

### Configuration description

|Parameter|Example|Description|
|:--|:--|:--|
|`LDAP Server Address` | `ldap://192.168.10.100` | The LDAP server address. |  
|`Bind DN` | `cn=admin,dc=vesoft,dc=com`| The LDAP login username.  |
|`Password` |`123456` | The LDAP login password. |
|`Base DN` | `dc=vesoft,dc=com`| Set the path to query user data. |
|`User Filter` | `&(objectClass=*)` | Set a filter to LDAP search queries. |
|`Email Key` | `mail`| Set the field name used to restore email in LDAP. |

### Instruction

After LDAP is enabled, you can register an LDAP account in two ways:

- [Email invitation](../5.account-management.md): When creating an account on the **Members** page, you can invite others to register by email. The advantage is that you can set the role permissions of the account.

- Automatic registration: When you enter an unregistered account in LDAP mode on the login page, the Dashboard automatically registers the account, but the [role permission](../5.account-management.md) is `user`.

## OAuth2.0 configuration

!!! caution

    The feature is still in beta. It will continue to be optimized.

### Entry

1. At the top navigation bar of the Dashboard Enterprise Edition page, click **System Settings**.
2. On the left-side navigation bar of the page, click **Single Sign-on**->**OAuth2.0**.

### Configuration description

|Parameter|Example|Description|
|:--|:--|:--|
|`ClientID` | `4953xxx-mmnoge13xx.apps.googleusercontent.com`| The application's ClientId. |
|`ClientSecret` | `GOCxxx-xaytomFexxx` | The application's ClientSecret. |
|`RedirectURL` | `http://dashboard.vesoft-inc.com/login` |The URL that redirects to Dashboard.   |
|`AuthURL` | `https://accounts.google.com/o/oauth2/auth` | The URL used for authentication.  |
|`TokenURL` | `https://oauth2.googleapis.com/token`| The URL used to get the access_token. |
|`UserInfoURL` | `https://www.googleapis.com/oauth2/v1/userinfo`| The URL used to get the user information. |
|`Username Key` | `email`| The key of user name. |
|`Organization` |  `vesoft company`       |  The organization name.             |
|`Requested scopes for OAuth`| `email`| Scope of OAuth permissions. The scope of permissions needs to be a subset of the scope configured by the vendor's OAuth2.0 platform, otherwise, the request will fail. Make sure the `Username Key` is accessible within the requested scope. |

### Instruction

After OAuth2.0 is enabled, you can invite others to register by [email](../5.account-management.md).
