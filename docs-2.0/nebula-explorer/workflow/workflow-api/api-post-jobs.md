# Add a new job

This topic describes how to use an API to add a new job.

## API path

`api-open/v1/workflows/<workflow_id>/jobs`

`<workflow_id>`: The workflow ID. See request parameters below.

## Request parameters

### Path parameters

|Parameters|Type|If required|Default value|Example| Description|
|:---|:---|:---|:---|:---|:---|
|`workflow_id`|number|yes|-|`4216617528`| The workflow ID. The system instantiates a specified workflow as a job. The ID can be viewed in the upper left corner of the specified workflow page.|

### Headers parameters

|Parameters|Type|If required|Default value|Example| Description|
|:---|:---|:---|:---|:---|:---|
|`Content-Type`|string|yes|-|`application/json`| The content type.|
|`explorer_token`|string|yes|-|`eyJhbxxx`| The authorization token that is used to verify account information. For details, see [Workflow API overview](workflow-api-overview.md).|

### Body parameters

!!! note

    Users must ensure the rationality and correctness of the user-defined input parameters. Otherwise, the operation will fail.

|Parameters|Type|If required|Default value|Example| Description|
|:---|:---|:---|:---|:---|:---|
|`input`|object|no|-|-| The user-defined input parameters.|
|&nbsp;&nbsp;&nbsp;- `task_id`|object|no|-|`query_1`|The task ID. Users can view the ID in the upper right corner of the component settings page. A task can set multiple parameters represented by key-value pairs. |
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- `param_name: param_value`|string: {string or number}|no|-|`param0: player100`|`param_name` is the parameter key, that is, the parameter name. `param_value` is the parameter value.|

### Request example

The following is an example of using the user-defined input parameter `name` in an nGQL statement. Pass in the parameter value `Tim Duncan` when creating a job.

![api-postjob](https://docs-cdn.nebula-graph.com.cn/figures/api-postjob-220715-en.png)

```bash
curl -i -X POST -H "Content-Type: application/json" -H "Cookie: "explorer_token=eyJhbxxx"" -d '{"input":{"query_1":{"name":"Tim Duncan"}}}' http://192.168.8.145:7002/api-open/v1/workflows/4216617528/jobs
```

## Response parameters

|Parameters|Type|Example|Description|
|:---|:---|:---|:---|
|`code`    | number | `0`       |  The result code of the request. Return `0` if the request is successful, and return an error code if the request is unsuccessful. For details, see [Workflow API overview](workflow-api-overview.md).            |
|`message`   | string | `Success` | The result information of the execution. |
|`data`    | object | -        | The list of returned data. |
|&nbsp;&nbsp;&nbsp;- `id`|string|`107`| The ID of the new job.|

### Response example

```http
{
  "cookie": [],
  "Content-Type": "application/json",
  "Traceparent": "00-1ba128615cdc2226c921973a689e9f1b-7630b12963494672-00",
  "Date": "Fri, 15 Jul 2022 07:19:25 GMT",
  "Content-Length": "48"
}

{
  "code": 0,
  "data": {
    "id": 107
  },
  "message": "Success"
}
```
