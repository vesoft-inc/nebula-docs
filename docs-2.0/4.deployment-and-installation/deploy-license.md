# Deploy a license for Nebula Graph Enterprise Edition

Nebula Graph Enterprise Edition requires the user to deploy a license file before starting the Enterprise Edition. This topic describes how to deploy a license file for the Enterprise Edition.

!!! enterpriseonly

    License is a software authorization certificate provided for users of the Enterprise Edition. Users of the Enterprise Edition can send email to `inquiry@vesoft.com` to apply for a license file.

## Precautions

- If the license file is not deployed, Nebula Graph Enterprise Edition cannot be started.

- Do not modify the license file, otherwise the license will become invalid.

- If the license is about to expire, send email to `inquiry@vesoft.com` to apply for renewal.

- The transition period after the license expires is 14 days:

  - If you start the Enterprise Edition within 30 days before the license expires or on the day the license expires, a log will be printed as a reminder.

  - The license can still be used for 14 days after it expires.

  - If the license has expired for 14 days, you will not be able to start the Enterprise Edition, and a log will be printed as a reminder.

## License description

The example of the content of the license file (`nebula.license`) is as follows:

```bash
----------License Content Start----------
{
  "vendor": "vesoft",
  "organization": "doc",
  "issuedDate": "2022-04-06T16:00:00.000Z",
  "expirationDate": "2022-05-31T15:59:59.000Z",
  "product": "nebula_graph",
  "version": ">3.0.0",
  "licenseType": "enterprise",
  "gracePeriod": 14,
  "graphdSpec": {
    "nodes": 3
  },
  "storagedSpec": {
    "nodes": 3
  },
  "clusterCode": "BAIAEAiAQAAG"
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
|`gracePeriod`| The buffer time (in days) for the service to continue to be used after the license expires, and the service will be stopped after the buffer period. The trial version of license has no buffer period after expiration and the default value of this parameter is 0. |
|`graphdSpec`| The max number of graph services in a cluster. Nebula Graph detects the number of active graph services in real-time. You are unable to connect to the cluster once the max number is reached. |
|`storagedSpec`| The max number of storage services in a cluster. Nebula Graph detects the number of active storage services in real-time. You are unable to connect to the cluster once the max number is reached. |
|`clusterCode`| The user's hardware information, which is also the unique identifier of the cluster. This parameter is not available in the trial version of the license. |

## Deploy the license

1. Send email to `inquiry@vesoft.com` to apply for the Nebula Graph Enterprise Edition package.

2. Install Nebula Graph Enterprise Edition. The installation method is the same as the Community Edition. See [Install Nebula Graph with RPM or DEB package](2.compile-and-install-nebula-graph/2.install-nebula-graph-by-rpm-or-deb.md).

3. Send email to `inquiry@vesoft.com` to apply for the license file `nebula.license`.

4. Upload the license file to all hosts that contain Meta services. The path is in the `share/resources/` of each Meta service installation directory.

  !!! note

        For the upload address of the license file for ecosystem tools, refer to the document of [Ecosystem tools overview](../20.appendix/6.eco-tool-version.md).

## Renew a Nebula Graph Enterprise Edition license

1. Email us at `inqury@vesoft.com` to apply for a new license file `nebula.license`.
2. In `share/resources/` under the installation directory of each Meta service, replace the old license file with the new one.
3. Restart Storage and Graph services. For information about how to restart services, see [Start Nebula Graph](manage-service.md). If your license expires within the buffer period (14 days by default), you do not have to restart Storage and Graph services.

  !!! note

        The Graph and Storage services are automatically stopped when your license expires beyond the buffer period after expiration. To ensure that the service is running properly, please renew your license in time.

## View the license

- View the License file directly

  You can use `cat` to view the content of the license file directly. For example: `cat share/resources/nebula.license`.

- View the License file with HTTP port

  When the Nebula Graph cluster is running normally, you can view the license file with the HTTP port (default port is 19559) of the meta service. For example: `curl -G "http://192.168.10.101:19559/license"`.
