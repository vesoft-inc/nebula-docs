# Get a list of jobs for a specified workflow

This topic describes how to use an API to get the list of jobs for a specified workflow.

## API path

`api-open/v1/workflows/<workflow_id>/jobs`

`<workflow_id>`: The workflow ID. See request parameters below.

## Request parameters

### Path parameters

|Parameters|Type|If required|Default value|Example| Description|
|:---|:---|:---|:---|:---|:---|
|`workflow_id`|number|yes|-|`4216617528`|The workflow ID. The system instantiates a specified workflow as a job. The ID can be viewed in the upper left corner of the specified workflow page.|

### Headers parameters

|Parameters|Type|If required|Default value|Example| Description|
|:---|:---|:---|:---|:---|:---|
|`Content-Type`|string|yes|-|`application/json`|The content type.|
|`explorer_token`|string|yes|-|`eyJhbxxx`|The authorization token that is used to verify account information. For details, see [Workflow API overview](workflow-api-overview.md).|

### Body parameters

|Parameters|Type|If required|Default value|Example| Description|
|:---|:---|:---|:---|:---|:---|
|`filter` | object| no|-|-| The filter settings.|
|&nbsp;&nbsp;&nbsp;- `name` |string |no |-|`workflow_q745a_20220715092236`| The job name. |
|&nbsp;&nbsp;&nbsp;- `status` |number |no |-|`2`| The job status code. For details, see [Workflow API overview](workflow-api-overview.md).|
|&nbsp;&nbsp;&nbsp;- `fromCreateTime` | number| no|-|`1657848036000`| Start time stamp. Filtering based on the job creation time.|
|&nbsp;&nbsp;&nbsp;- `toCreateTime` |number |no |-|`1657848157000`| End time stamp. Filtering based on the job creation time.|
|&nbsp;&nbsp;&nbsp;- `orderByCreateTime` | string| no|`desc`|-| Sorting mode. The available value are `desc` and `asc`. |
|`pageSize` |number |no| `10`| -| The number of entries to return on each page.|
|`page` |number |no| `1`| -| The number of the page to return.|

### Request example

!!! note

    The content after `jobs?` is the body parameter, and the content of `filter` is the result of URL encoding. The original content of `filter` was `{"status": 2, "fromCreateTime": 1657874100000}`.

```bash
curl -i -X GET -H "Content-Type: application/json" -H "Cookie: "explorer_token=eyJhbxxx"" http://192.168.8.145:7002/api-open/v1/workflows/4216617528/jobs?filter=%7B%22status%22%3A%202%2C%20%20%22fromCreateTime%22%3A%201657874100000%7D&pageSize=10&page=1
```

## Response parameters

|Parameters|Type|Example|Description|
|:---|:---|:---|:---|
|`code`    | number | `0`       |  The result code of the request. Return `0` if the request is successful, and return an error code if the request is unsuccessful. For details, see [Workflow API overview](workflow-api-overview.md).            |
|`message`   | string | `Success` | The result information of the execution. |
|`data`    | object | -        | The list of returned data. |
|&nbsp;&nbsp;&nbsp;- `total`  | number | `2`      |The total number of records. |
|&nbsp;&nbsp;&nbsp;- `Page`   | number | `1`      | The number of the page to return. |
|&nbsp;&nbsp;&nbsp;- `PageSize`  | number | `10`  | The number of entries to return on each page. |
|&nbsp;&nbsp;&nbsp;- `items`     | object | -     | The list of record details.  |
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - `id`         | number   | `105` | The job ID.|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - `name`       | string   | `workflow_q745a_20220715090915` | The job name. |
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - `workflowId` | string   | `4216617528` | The workflow ID. |
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - `workflowName` | string | `workflow_q745a` | The workflow name. |
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - `status`      | number  | `2`  | The job status code. For details, see [Workflow API overview](workflow-api-overview.md). |
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - `runBeginTime` | number | `1657847358000` | The start time of the job execution. |
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - `runEndTime` | number | `1657847364000` | The end time of the job execution. |
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - `createTime` | number  | `1657847355906`  | The creation time of the job. |

### Response example

```http
{
  "cookie": [],
  "Content-Type": "application/json",
  "Traceparent": "00-008c3056686dd3f3be38b8eda42a917e-b5616e30434cb803-00",
  "Date": "Fri, 15 Jul 2022 08:44:06 GMT",
  "Content-Length": "297"
}
{
  "code": 0,
  "data": {
    "items": [
      {
        "id": 115,
        "name": "workflow_q745a_20220715163650",
        "workflowId": "4216617528",
        "workflowName": "workflow_q745a",
        "status": 2,
        "runBeginTime": 1657874212000,
        "runEndTime": 1657874218000,
        "createTime": 1657874210088
      }
    ],
    "total": 1,
    "Page": 1,
    "PageSize": 10
  },
  "message": "Success"
}
```
