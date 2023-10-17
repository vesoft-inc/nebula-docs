# Deploy Explorer

This topic describes how to deploy Explorer locally by RPM, DEB, and tar packages.

## Prerequisites

Before deploying Explorer, you must check the following information:

- The [license key](../../9.about-license/2.license-management-suite/3.license-manager.md) is loaded.

- The NebulaGraph services are deployed and started. For more information, see [NebulaGraph Database Manual](../../2.quick-start/1.quick-start-workflow.md).

- Before the installation starts, the following ports are not occupied.

   | Port | Description |
   | ---- | ---- |
   | 7002 | Web service provided by Explorer |

  !!! caution

        By default, Explorer uses the port `7002`. You can modify the `httpport` in the `conf/app.conf` file in the installation directory and restart the service.

- The Linux distribution is CentOS.

## Precautions

The Dag Controller installation package is built in Explorer starting from version 3.2.0, which provides graph computing services. The user can decide whether or not to start the Dag Controller service. If the Dag Controller service is not started, the **Workflow** menu in Explorer will appear gray and cannot be clicked.

In addition, if you need to use **Workflow** for complex graph computing, you need to configure NFS or HDFS after installing Explorer. Namenode uses port 8020 by default, and datanode uses port 50010 by default. For details, see [Prepare resources](../../nebula-explorer/workflow/1.prepare-resources.md) of **Workflow**.

<!--  !!! caution

       If the HDFS port is unavailable, the connection timeout message may be displayed. -->

!!! enterpriseonly

    You can [apply online](https://nebula-graph.io/visualization-tools-free-trial) for Explorer free trial. NebulaGraph Explorer Enterprise Edition is available exclusively through our Enterprise Edition package and is not sold separately. [Contact us](https://www.nebula-graph.io/contact) for details.

## RPM-based deployment

### Installation

1. Select and download the RPM package according to your needs. It is recommended to select the latest version.

2. Use `sudo rpm -i <rpm>` to install RPM package.

    For example, use the following command to install Explorer. The default installation path is `/usr/local/nebula-explorer`.

    ```bash
    sudo rpm -i nebula-explorer-<version>.x86_64.rpm
    ```

    You can also install it to the specified path using the following command:
    ```bash
    sudo rpm -i nebula-explorer-<version>.x86_64.rpm --prefix=<path>
    ```

3. Enter the extracted folder, and modify the `app-config.yaml` file in the `config` directory, set the value of `LicenseManagerURL` to the host IP of LM and the port number `9119`, for example, `192.168.8.100:9119`.

    For more configuration descriptions, see the **Configuration file description** section at the end of the topic.

4. (Optional) Configure the Dag Controller. See the **Configure Dag Controller** section below.

5. Enter the folder `nebula-explorer`, and start the service using the following command.

   ```bash
   cd nebula-explorer
   # Start Explorer.
   sudo ./scripts/start.sh
   # (Optional) Start Dag Controller.
   sudo ./dag-ctrl/scripts/start.sh
   ```

### Start and stop

You can use SystemCTL to start and stop the service.

```bash
systemctl status nebula-explorer #Check the status
systemctl stop nebula-explorer #Stop the service
systemctl start nebula-explorer #Start the service
```

You can also start or stop the service manually using the following command in the installation directory.

```bash
sudo ./scripts/start.sh #Start Explorer
sudo ./scripts/stop.sh #Stop Explorer
sudo ./dag-ctrl/scripts/start.sh #Start Dag Controller
sudo ./dag-ctrl/scripts/stop.sh #Stop Dag Controller
```

### Uninstallation

You can uninstall Explorer using the following command:

```bash
sudo rpm -e nebula-graph-explorer-<version>.x86_64
```

## DEB-based deployment

### Installation

1. Select and download the RPM package according to your needs. It is recommended to select the latest version. Common links are as follows:


2. Run `sudo dpkg -i <package_name>` to unpack the DEB package.

  For example, run the following command to install Explorer (The default installation path is `/usr/local/nebula-explorer`).

  ```bash
  sudo dpkg -i nebula-explorer-{{explorer.release}}.x86_64.deb
  ```

  !!! note

        You cannot customize the installation path of Explorer when installing a DEB package.

3. Enter the extracted folder, and modify the `app-config.yaml` file in the `config` directory, set the value of `LicenseManagerURL` to the host IP of LM and the port number `9119`, for example, `192.168.8.100:9119`.

    For more configuration descriptions, see the **Configuration file description** section at the end of the topic.

4. (Optional) Configure the Dag Controller. See the **Configure Dag Controller** section below.

5. Enter the folder `nebula-explorer`, and start the service using the following command.

  ```bash
   cd nebula-explorer
   # Start Explorer.
   sudo ./lib/start.sh
   # (Optional) Start Dag Controller.
   sudo ./dag-ctrl/scripts/start.sh
   ```

### View the status

```bash
sudo systemctl status nebula-explorer.service
```

### Stop the service

```bash
sudo systemctl stop nebula-explorer.service
```

### Uninstallation

Run the following command to uninstall Explorer:

```bash
sudo dpkg -r nebula-explorer
```

## TAR-based deployment

### Installation

1. Select and download the TAR package according to your needs. It is recommended to select the latest version. Common links are as follows:


2. Use `tar -xvf` to decompress the TAR package.

   ```bash
   tar -xvf nebula-explorer-<version>.tar.gz
   ```

3. Enter the extracted folder, and modify the `app-config.yaml` file in the `config` directory, set the value of `LicenseManagerURL` to the host IP of LM and the port number `9119`, for example, `192.168.8.100:9119`.

    For more configuration descriptions, see the **Configuration file description** section at the end of the topic.

4. (Optional) Configure the Dag Controller. See the **Configure Dag Controller** section below.

5. Enter the folder `nebula-explorer`, and start the service using the following command.

  ```bash
  cd nebula-explorer
  # Start Explorer and Dag Controller.
  sudo ./scripts/start.sh
  # Start Explorer separately.
  sudo nohup ./nebula-explorer-server > explorer.log 2>&1 &
  ```

### Stop Service

You can use `kill pid` to stop the service.

```bash
kill $(lsof -t -i :7002)
```

## Configure Dag Controller

Dag Controller is a task scheduling tool that can schedule the jobs whose type is DAG (directed acyclic graph). The job consists of multiple tasks to form a directed acyclic graph, and there is a dependency between the tasks.

The Dag Controller can perform complex graph computing with NebulaGraph Analytics. For example, the Dag Controller sends an algorithm request to NebulaGraph Analytics, which saves the result to NebulaGraph or HDFS. The Dag Controller then takes the result as input to the next algorithmic task to create a new task.

### Steps

1. Complete the SSH password-free configurations so that the Dag Controller machine can log directly into the NebulaGraph Analytics machines and all machines within the NebulaGraph Analytics cluster can connect directly to each other without passwords.

  For example, the user in machine A (Dag Controller) logs directly into machine B-1 in the NebulaGraph Analytics cluster over SSH  without passwords. Run the following commands on machine A:

  ```
  //Press Enter to execute the default option to generate the key.
  ssh-keygen -t rsa

  //After the public key file of machine A is installed to the user of the machine B-1, you can log into the machine B-1 from the machine A without passwords.
  ssh-copy-id -i ~/.ssh/id_rsa.pub <B_user>@<B_IP>
  ```

  In the same way, complete the SSH password-free configurations so that the user in machine A can log directly into machines B-2, B-3, etc. and all machines within the NebulaGraph Analytics cluster can connect directly to each other without passwords.

2. Run `eval $(ssh-agent)` on the Dag Controller machine to start the ssh-agent, then run `ssh-add ~/.ssh/id_rsa` to give the private key to the ssh-agent to manage.

  !!! note

        ssh-agent is a key manager that manages multiple keys and provides proxies for other programs that need to use SSH key pairs.

3. Configure the username and port of the NebulaGraph Analytics in the file `dag-ctrl-api.yaml`, the file path is `dag-ctrl/etc/dag-ctrl-api.yaml`. If there are multiple machines, ensure that the usernames and ports are the same.

  ```
  # configuration name.
  Name: task-api

  Host: 0.0.0.0     # The IP address of Dag Controller.
  Port: 9002        # The port of Dag Controller.
  Timeout: 60000    # he timeout duration of HTTP interface requests.

  Log:              # The parameters related to log printing. For more Information, see https://go-zero.dev/cn/docs/blog/tool/logx/
    Mode: file      # The log printing method
    KeepDays: 7     # The maximum number of days to keep logs
    Path: logs      # The output path of the log file
    Level: info     # The log printing level
    Compress: false  #  Whether the log needs to be compressed

  # The user name and SSH port of the NebulaGraph Analytics machine.
  SSH:
   UserName: vesoft
   Port: 22  

  # The parallel thread pool sizes of the tasks and jobs.
  JobPool:
   Sleep: 3    # Check every 3 seconds for any outstanding jobs.
   Size: 3    # Up to 3 jobs can be executed in parallel.
  TaskPool:
   CheckStatusSleep: 1    # Check the task status every second.
   Size: 10    # Up to 10 tasks can be executed in parallel.
  Dag:
   VarDataListMaxSize: 100    # If HDFS columns are read, the number is limited to 100 at a time.

  # Other
  Debug:
    Enable: false  #  Whether to enable Debugging.

  # The key for the Explorer to communicate with the Dag Controller. No modification is required.
  RsaPriKey: |
    -----BEGIN RSA PRIVATE KEY-----
    MIICXAIBAAKBgQDcR0keIMmmV...
    -----END RSA PRIVATE KEY-----  
  RsaPubKey: |
    -----BEGIN RSA PUBLIC KEY-----
    MIGJAoGBANxHSR4gyaZX7uet7...
    -----END RSA PUBLIC KEY-----
  ```

4. Configure the algorithm file path (`exec_file`) only in the file `tasks.yaml`, the file path of which is `dag-ctrl/etc/tasks.yaml`. Currently, all `exec_file` parameters are set to the path of the `run_algo.sh` file.

  !!! note

      - The algorithm files are provided by NebulaGraph Analytics. Please find the `scripts` directory under the installation path of NebulaGraph Analytics above. All algorithm files are in this directory.  
      - If there are multiple machines, ensure that the algorithm file paths are the same.
      - The other parameters are the execution parameters of the algorithms and are configured later on the [visual workflow page](../workflow/2.create-workflow.md).

  ```bash
  exec_file: /home/xxx/nebula-analytics/scripts/run_algo.sh
  ```

## Directory structure

The structure of the Explorer Enterprise Edition is as follows:

```bash
├── CMakeLists.txt # CMake configuration files
|
├── config # Configuration files
│   
├── dag-ctrl # Dag Controller installation directory
│   
├── scripts # Scripts for managing services
│   
├── tmp # Temporary files
|
└── nebula-explorer-server # Explorer service application
```

## View logs

Users can view the Explorer Enterprise Edition logs in the `logs` directory.

For example:

```
cat logs/access.log
```

The descriptions of the log files are as follows.

|Log file| Description |
|:--|:--|
|`access.log`| Access log. Records all request messages for accessing the services, including request time, source address, requested URL, HTTP method, returned HTTP status code, etc.</br>It takes effect only when the `Log.Mode` in the Explorer configuration is `file`.   |
|`error.log`|  Error log. Records error messages that occur during service running. This may include runtime errors, system errors, service logic errors, etc.</br>It takes effect only when the `Log.Mode` in the Explorer configuration is `file`. |
|`severe.log`| Severe log. Records error messages that could cause the system to crash, or seriously affect the correct functioning of the system. This may include runtime errors, system errors, serious service logic errors, etc.</br>It takes effect only when the `Log.Mode` in the Explorer configuration is `file`.   |
|`slow.log`|  Slow log. Records requests or operations whose execution time exceeds a preset threshold, helping users identify performance bottlenecks.</br>It takes effect only when the `Log.Mode` in the Explorer configuration is `file`.  |
|`stat.log`|  Statistic log. Records statistical information about the service, the content of which depends on the needs of the application and may include a variety of performance metrics, usage statistics, etc.</br>It takes effect only when the `Log.Mode` in the Explorer configuration is `file`.  |

## Configuration file description

```yaml
Name: explorer
Version: {{explorer.release}}
Database: nebula
Host: 0.0.0.0  # Specifies the address where explorer can be accessed.
Port: 7002  # The default access port for explorer.

# The following parameters need to be configured when using SSL encrypted access or inline frames. Currently only self-signed certificates are supported, see the iframework section for how to do this.
# CertFile: "./config/Explorer.crt"  # The path to the SSL public key certificate.
# KeyFile: "./config/Explorer.key" # The path to the SSL key.

MaxBytes: 1073741824 # The maximum ContentLength that HTTP can accept, default is 1048576. range: 0 ~ 8388608.
Timeout: 30000 # Access timeout time.

# The deployment mode of explorer, supports single and multiple instances.The optional values are single and multi.
# In multi-instance mode, local storage service (data import) will be disabled to ensure data consistency between instances.
# AppInstance: "multi" 
Log:  # explorer run log settings. See https://go-zero.dev/en/docs/tutorials/go-zero/configuration/log/
  Mode: file  # Log saving method. The optional values are: console and file. console means the service log will be recorded in webserver.log; file means the service log will be recorded in access.log, error.log, sever.log, slow.log, and stat.log respectively.
  Level: error # Log output level. The optional values are: debug, info, error, and severe.
  KeepDays: 7  # The number of days the log is retained.
Env: "local"
Debug:  
  Enable: false # Whether to enable Debug mode.
Auth:
  TokenName: "explorer_token" # The name of the token after login.
  AccessSecret: "login_secret" # The secret of the token after login.
  AccessExpire: 259200 # The validity of the token after login, in seconds.
File:
  UploadDir: "./data/upload/"  # The path where the uploaded files are stored when importing data.
  TasksDir: "./data/tasks"  # Task file storage path. Includes imported tasks, workflow tasks, etc.
#  SqliteDbFilePath # Deprecated.
#  TaskIdPath: "./data/taskId.data" # Deprecated. Please use DB.SqliteDbFilePath instead.
DB:
  Enable: true
  LogLevel: 4  # Database runtime log levels. 1, 2, 3, and 4 correspond to Silent, ERROR, Warn, and INFO, respectively.
  IgnoreRecordNotFoundError: false  
  AutoMigrate: true  # Whether or not to automatically create database tables. The default is true.
  Type: "sqlite3"  # The type of database used in the backend. Supports mysql and sqlite3.
  Host: "127.0.0.1:3306"  # The IP and port of the database.
  Name: "nebula"  # Database name.
  User: "root"  # Database username.
  Password: "123456"  # Database password.
  SqliteDbFilePath: "./data/tasks.db"   # This parameter is required for sqlite3 only. The address of the database file.
  MaxOpenConns: 30  # Maximum number of active connections in the connection pool.
  MaxIdleConns: 10  # Maximum number of free connections in the connection pool.
Analytics:
  Host: "http://127.0.0.1:9002"  # The address of the DAG service for the workflow.
  # RPC_HDFS_PASSWORD: "passward" # The password for the HDFS RPC service.
# OAuth: # Deprecated. Continues to be compatible with version 3.x. Please use SSO instead.
#  Enable: false 
#  ClientID: "10274xxxx-v2kn8oe6xxxxx.apps.googleusercontent.com" # The client ID of the OAuth service.
#  ClientSecret: "GOCSPX-8Enxxxxx" # The client secret for the OAuth service.
#  AuthURL: "https://accounts.google.com/o/oauth2/v2/auth" # The URL of the OAuth service.
#  TokenURL: "https://oauth2.googleapis.com/token" # The URL to get the access token.
#  Scopes: "https://www.googleapis.com/auth/userinfo.email" # The scope of the OAuth service.
#  UserInfoURL: "https://www.googleapis.com/oauth2/v1/userinfo" # The URL to get the user information.
#  UsernameKey: "email" # Username field.
#  Organization: "vesoft"  # OAuth vendor name.
#  TokenName: "oauth_token" # The name of the token in the cookie.
#  RedirectURL: "http://127.0.0.1:7002/login" # The redirect URL for the OAuth service.
#  AvatarKey: "picture" # The key for the avatar in the user information.
SSO:
  Enable: false # Whether to enable single sign-on.
  Type: "CAS" # Single sign-on service type. The available values are OAuth2 and CAS. Configure this parameter and then configure the corresponding OAuthConfig or CASConfig below.
  OAuthConfig:
    ClientID: "1039194xxxxx-taufdxxxxx.apps.googleusercontent.com" # The client ID of the OAuth service.
    ClientSecret: "GOCSPX-F_xBzfitifMU7acySxxxxx" # The client secret for the OAuth service.
    AuthURL: "https://accounts.google.com/o/oauth2/v2/auth" # The URL of the OAuth service.
    TokenURL: "https://oauth2.googleapis.com/token" # The URL to get the access token.
    Scopes: "https://www.googleapis.com/auth/userinfo.email" # The scope of the OAuth service.
    UserInfoURL: "https://www.googleapis.com/oauth2/v1/userinfo" # The URL to get the user information.
    UsernameKey: "email" # Username field.
    Organization: "vesoft"  # OAuth vendor name. It will be displayed on the login page.
    TokenName: "oauth_token" # The name of the token in the cookie.
    RedirectURL: "http://127.0.0.1:7002/login" # The redirect URL for the OAuth service.
    AvatarKey: "picture" # The key for the avatar in the user information.
  CASConfig:
    Address: "" # The address of the CAS service.
    Organization: "vesoft"  # CAS vendor name. It will be displayed on the login page.
    AvatarKey: "avatar" # The key for the avatar in the user information.
    TokenName: "cas_token" # The name of the token in the cookie.
IframeMode:
  Enable: false  # Whether to enable iframe mode.
Any source is allowed by default.
  # Origins:     # The source whitelist of iframe. Any source is allowed by default.
  #   - "http://192.168.8.8"
LicenseManagerURL: http://192.168.8.100:9119 # License manager url.
CorsOrigins: [] # The list of domains that are allowed to initiate cross-domain requests.
```

## Next to do

[Connect to Explorer](ex-ug-connect.md)
