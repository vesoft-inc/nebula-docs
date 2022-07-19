# Cancel a running job

This topic describes how to use an API to cancel a running job.

## API path

`api-open/v1/jobs/<job_id>/cancel`

`<job_id>`: The job ID. See request parameters below.

## Request parameters

### Path parameters

|Parameters|Type|If required|Default value|Example| Description|
|:---|:---|:---|:---|:---|:---|
|`job_id`|number|yes|-|`1964`|The job ID. It can be queried through the API [Get a list of all jobs](api-get-jobs.md) or viewed on the job list page.|

### Headers parameters

|Parameters|Type|If required|Default value|Example| Description|
|:---|:---|:---|:---|:---|:---|
|`Content-Type`|string|yes|-|`application/x-www-form-urlencoded`|The content type.|
|`explorer_token`|string|yes|-|`eyJhbxxx`|The authorization token that is used to verify account information. For details, see [Workflow API overview](workflow-api-overview.md).|

### Body parameters

None.

### Request example

```bash
curl -i -X PUT -H "Content-Type: application/x-www-form-urlencoded" -H "Cookie: "explorer_token=eyJhbxxx"" http://192.168.8.145:7002/api-open/v1/jobs/30600/cancel
```

## Response parameters

|Parameters|Type|Example|Description|
|:---|:---|:---|:---|
|`code`    | number | `0`       |  The result code of the request. Return `0` if the request is successful, and return an error code if the request is unsuccessful. For details, see [Workflow API overview](workflow-api-overview.md).            |
|`message`   | string | `Success` | The result information of the execution. |
|`data`    | object | -        | The list of returned data. |
|&nbsp;&nbsp;&nbsp; - `success`         | bool   | `true` | Whether the job was canceled successfully.|

### Response example

```http
{
  "cookie": [],
  "Content-Type": "application/json",
  "Traceparent": "00-8b4b47413a211d9b5e0839aadc712052-4a98bae37fe5948a-00",
  "Date": "Mon, 18 Jul 2022 01:45:08 GMT",
  "Content-Length": "54"
}
{
  "code": 0,
  "data": {
    "success": true
  },
  "message": "Success"
}
```