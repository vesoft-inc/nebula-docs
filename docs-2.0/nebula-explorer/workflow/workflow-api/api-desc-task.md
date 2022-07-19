# Get the result data of a specified task

This topic describes how to use an API to get the result data of a specified task.

## API path

`api-open/v1/jobs/<job_id>/tasks/<task_id>/sample_result`

- `<job_id>`: The job ID. See request parameters below.

- `<task_id>`: The task ID. See request parameters below.

## Request parameters

### Path parameters

|Parameters|Type|If required|Default value|Example| Description|
|:---|:---|:---|:---|:---|:---|
|`job_id`|number|yes|-|`29987`| The job ID. It can be queried through the API [Get a list of all jobs](api-get-jobs.md) or viewed on the job list page.|
|`task_id`|number|yes|-|`8c171f70fb6f11ecac7e6da0662c195b`|The task ID. It can be queried through the API [Query details for a specified job](api-desc-job.md) or viewed in the upper right corner of the specified job page by clicking the component.|

### Headers parameters

|Parameters|Type|If required|Default value|Example| Description|
|:---|:---|:---|:---|:---|:---|
|`Content-Type`|string|yes|-|`application/x-www-form-urlencoded`|The content type.|
|`explorer_token`|string|yes|-|`eyJhbxxx`|The authorization token that is used to verify account information. For details, see [Workflow API overview](workflow-api-overview.md).|

### Body parameters

|Parameters|Type|If required|Default value|Example| Description|
|:---|:---|:---|:---|:---|:---|
|`limit`|number|yes|`10`|-| Limit the number of rows to return results.|

### Request example

```bash
curl -i -X GET -H "Content-Type: application/x-www-form-urlencoded" -H "Cookie: "explorer_token=eyJhbxxx"" http://192.168.8.145:7002/api-open/v1/jobs/29987/tasks/8c171f70fb6f11ecac7e6da0662c195b/sample_result?limit=1000
```

## Response parameters

|Parameters|Type|Example|Description|
|:---|:---|:---|:---|
|`code`    | number | `0`       |  The result code of the request. Return `0` if the request is successful, and return an error code if the request is unsuccessful. For details, see [Workflow API overview](workflow-api-overview.md).            |
|`message`   | string | `Success` | The result information of the execution. |
|`data`    | object | -        | The list of returned data. |
|&nbsp;&nbsp;&nbsp; - `items`|list|-| The list of detailed results.|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - `result`         | string   | `"player110","0.150000"` | Depending on the algorithm, the result could be 2 or 3 columns.|

### Response example

```http
{
  "cookie": [],
  "Content-Type": "application/json",
  "Traceparent": "00-14047b04b6810be06be22e010f500506-4c310a844b824a7f-00",
  "Date": "Fri, 15 Jul 2022 09:36:56 GMT",
  "Content-Length": "2014"
}
{
  "code": 0,
  "data": {
    "items": [
      [
        "player110",
        "0.150000"
      ],
      [
        "team219",
        "0.452126"
      ],
      ......
      [
        "player121",
        "0.262148"
      ]
    ]
  },
  "message": "Success"
}
```
