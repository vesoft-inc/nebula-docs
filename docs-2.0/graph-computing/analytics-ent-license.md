# NebulaGraph Analytics license

A license is a software authorization certificate used to authorize the use of a software product. When deploying NebulaGraph Analytics, you need to add a license to start it. This document describes the license information on NebulaGraph Analytics.

## Precautions

- If the license file is not deployed, NebulaGraph Analytics cannot be started.

- Do not modify the license file, otherwise the license will become invalid.

- If the license is about to expire, send email to `inquiry@vesoft.com` to apply for renewal.

- The transition period after the license expires is 14 days:

  - If you start NebulaGraph Analytics within 30 days before the license expires or on the day the license expires, a log will be printed as a reminder.

  - The license can still be used for 14 days after it expires.

  - If the license has expired for 14 days, you will not be able to start the NebulaGraph Analytics, and a log will be printed as a reminder.


## Obtain a NebulaGraph Analytics license

Send email to `inquiry@vesoft.com` to apply for a NebulaGraph Analytics license.

!!! note

    You can [apply online](https://nebula-graph.io/visualization-tools-free-trial) for a 30-day free trial of NebulaGraph Analytics.

## License description

NebulaGraph Analytics license is a file named `nebula.license` that contains the following information:

```bash
----------License Content Start----------
{
  "vendor": "vesoft",
  "organization": "vesoft",
  "issuedDate": "2022-11-01T16:00:00.000Z",
  "expirationDate": "2023-11-01T15:59:59.000Z",
  "product": "nebula_graph_analytics",
  "version": ">3.0.0",
  "licenseType": "enterprise",
  "gracePeriod": 14,
  "analytics": {
    "nodes": 3,
    "vcpu": 3
  }
  "clusterCode": "BAIAEAiAQAAG"
}
----------License Content End----------

----------License Key Start----------
Rrjip5c+xxxxxxxxxxxxxk5Yg==
----------License Key End----------
```

The license file contains information such as `issuedDate` and `expirationDate`. The description is as follows.

|Parameter|Description|
|:---|:---|
|`vendor`|The supplier.|
|`organization`|The username.|
|`issuedDate`|The date that the license is issued. |
|`expirationDate`|The date that the license expires.|
|`product`|The product type. The product type of NebulaGraph Analytics is `nebula_graph_analytics`.|
|`version`|The version information.|
|`licenseType`|The license type (a reserved parameter), including `enterprise`, `samll_bussiness`, `pro`, and `individual`. |
|`gracePeriod`| The buffer time (in days) for the service to continue to be used after the license expires, and the service will be stopped after the buffer period. The trial version of license has no buffer period after expiration and the default value of this parameter is 0. |
|`nodes`|The max number of Analytics services in the cluster. |
|`vcpu`|The max number of threads for the Analytics services in the cluster.|
|`clusterCode`| The user's hardware information, which is also the unique identifier of the cluster. This parameter is not available in the trial version of the license. |

## Use a NebulaGraph Analytics license

For how to use a NebulaGraph Analytics license, see [NebulaGraph Analytics](nebula-analytics.md).

## Renew a NebulaGraph Analytics license

Follow the steps below to renew your NebulaGraph Analytics license.

1. Email us at `inquiry@vesoft.com` to apply for a new NebulaGraph Analytics license file `nebula.license`.

2. In the NebulaGraph Analytics installation directory, such as `/usr/local/nebula-analytics/scripts/`, replace the old license file with the new one. 

!!! note

    You cannot use NebulaGraph Analytics once the license expires. To avoid business interruptions, please renew your license in time. 
    
