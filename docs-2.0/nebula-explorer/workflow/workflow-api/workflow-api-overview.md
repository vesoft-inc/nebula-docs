# Workflow API overview

NebulaGraph Explorer provides some APIs for using workflow.

The supported APIs are as follows:

- [Add a new job](api-post-jobs.md)
- [Get a list of all jobs](api-get-jobs.md)
- [Get a list of jobs for a specified workflow](api-get-workflow-jobs.md)
- [Query details for a specified job](api-desc-job.md)
- [Cancel a running job](api-cancel-job.md)
- [Get the result data of a specified task](api-desc-task.md)

## Request method

Users can use curl to call APIs to achieve corresponding functions.

The format is as follows:

```bash
curl <options> http://<explorer_address>:<explorer_port>/<api_path>?{<body>}
```

- `<options>`: Curl supports a large number of options. The most commonly used options for workflow are `-X`, `-H` and `-d`. For more information about options, see [curl official documentation](https://curl.se/docs/manpage.html).

- `<explorer_address>`: The access address of the NebulaGraph Explorer.

- `<explorer_port>`: The access port of the NebulaGraph Explorer.

- `<api_path>`: The call path of APIs. For example: `api-open/v1/jobs`.

- `<body>`: The body parameters that needs to be supplied when calling APIs.

## Get authorization token

Token information verification is required when calling an API. Run the following command to get the authorization token.

```bash
curl -i -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <account_base64_encode>" -d '{"address":"<nebula_address>","port":<nebula_port>}' http://<explorer_address>:<explorer_port>/api-open/v1/connect
```

- `<account_base64_encode>`: The character string of the base64 encoded NebulaGraph account and password. Take the username `root` and password `123` as an example, the serialized string is `["root", "123"]`. After the encoding, the result is `WyJyb290IiwiMTIzIl0=`.
- `<nebula_address>`: The access address of the NebulaGraph.
- `<nebula_port>`: The access port of the NebulaGraph.
- `<explorer_address>`: The access address of the NebulaGraph Explorer.
- `<explorer_port>`: The access port of the NebulaGraph Explorer.

Example: 

```bash
curl -i -X POST -H "Content-Type: application/json" -H "Authorization: Bearer WyJyb290IiwiMTIzIl0=" -d '{"address":"192.168.8.111","port":9669}' http://192.168.8.145:7002/api-open/v1/connect
```

Response:

```http
HTTP/1.1 200 OK
Content-Type: application/json
Set-Cookie: explorer_token=eyJhbxxx; Path=/; # Max-Age=259200; HttpOnly
Traceparent: 00-1c3f55cdbf81e13a2331ed88155ce0bf-2b97474943563f20-# 00
Date: Thu, 14 Jul 2022 06:47:01 GMT
Content-Length: 54

{
  "code": 0,
  "data": {
    "success": true
  },
  "message": "Success"
}
```

Note the following parameters:

- `explorer_token`: The authorization token.

- `Max-Age`: Token validity time. Unit: second. The default value is 259,200 seconds, that is 3 days. You can change the default validity time in the `config/app-config.yaml` file in the installation directory.

## Response

- If an API is called successfully, the system returns the following information:

  ```http
  {
    code: 0,
    message: 'Success',
    data: <ResponseData>   //Return the results based on the API.
  }
  ```

- If an API is called failed, the system returns the corresponding common error code. For example:

  ```http
  {
    code: 40004000,
    message: '<ErrBadRequest>',  //Display the error information.
  }
  ```

  For descriptions of common error codes, see the following sections.

### Common error codes

|Error code|Information|Description|
|:---|:---|:---|
|40004000 | `ErrBadRequest`  |  Request error. |
|40004001 | `ErrParam`  | Request parameter error.  |
|40104000 | `ErrUnauthorized`  | Request authorization error.  |
|40104001 | `ErrSession`  | Login session error.  |
|40304000 | `ErrForbidden`  | Request denied.  |
|40404000 | `ErrNotFound`  | Requested resource does not exist.  |
|50004000 | `ErrInternalServer`  | Internal service error.  |
|50004001 | `ErrInternalDatabase`  | Database error.  |
|50004002 | `ErrInternalController`  | Controller error.  |
|50004003 | `ErrInternalLicense`  | Certificate verification error.  |
|90004000 | `ErrUnknown`  | Unknown error.  |

### Job/Task status code

|Status code|Description|
|:---|:---|
|0  | Preparing|
|1  | Running|
|2  | Success|
|3  | Failed|
|4  | Interrupted|
|5  | Stopping|
