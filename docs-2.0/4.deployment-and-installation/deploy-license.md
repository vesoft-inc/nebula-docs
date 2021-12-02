# Deploy license

Nebula Graph Enterprise Edition requires the user to deploy a license file before starting the Enterprise Edition. This topic describes how to deploy a license file for the Enterprise Edition.

!!! enterpriseonly

    License is a software authorization certificate provided for users of the Enterprise Edition. Users of the Enterprise Edition can send email to `inquiry@vesoft.com` to apply for a license file.

## Precautions

- If the license file is not deployed, Nebula Graph Enterprise Edition cannot be started.

- Do not modify the license file, otherwise the license will become invalid.

- If the license is about to expire, send email to `inquiry@vesoft.com` to apply for renewal.

- The transition period after the license expires is 3 days:

  - If you start the Enterprise Edition within 7 days before the license expires or on the day the license expires, a log will be printed as a reminder.

  - The license can still be used for 3 days after it expires.

  - If the license has expired for 3 days, you will not be able to start the Enterprise Edition, and a log will be printed as a reminder.

## License description

You can use `cat` to view the content of the license file (`nebula.license`). The example is as follows:

```bash
----------License Content Start----------
{
  "vendor": "Vesoft_Inc",
  "organization": "doc",
  "issuedDate": "2021-11-07T16:00:00.000Z",
  "expirationDate": "2021-11-30T15:59:59.000Z",
  "product": "nebula_graph",
  "version": ">2.6.1",
  "licenseType": "enterprise"
}
----------License Content End----------

----------License Key Start----------
cofFcOxxxxxxxxxxxxxhnZgaxrQ==
----------License Key End----------
```

The license file contains information such as `issuedDate` and `expirationDate`. The description is as follows.

|Parameter|Description|
|:---|:---|
|`vendor`|The supplier.|
|`organization`|The username.|
|`issuedDate`|The date that the license is issued. |
|`expirationDate`|The date that the license expires.|
|`product`|The product type. The product type of Nebula Graph is `nebula_graph`.|
|`version`|The version information.|
|`licenseType`|The license type, including `enterprise`, `samll_bussiness`, `pro`, and `individual`. |

## Steps

1. Send email to `inquiry@vesoft.com` to apply for the Nebula Graph Enterprise Edition package.

2. Install Nebula Graph Enterprise Edition. The installation method is the same as the Community Edition. See [Install Nebula Graph with RPM or DEB package](2.compile-and-install-nebula-graph/2.install-nebula-graph-by-rpm-or-deb.md).

3. Send email to `inquiry@vesoft.com` to apply for the license file `nebula.license`.

4. Upload the license file to all hosts that contain Meta services. The path is in the `share/resources/` of each Meta service installation directory.

  !!! note

        For the upload address of the license file for ecosystem tools, refer to the document of [Ecosystem tools overview](../20.appendix/6.eco-tool-version.md).
