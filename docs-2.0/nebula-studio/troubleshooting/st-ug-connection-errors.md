# Cannot access to Studio

## Problem description

I follow the document description and visit `127.0.0.1:7001` or `0.0.0.0:7001` after starting Studio, why can’t I open the page?

## Possible causes and solutions

You can troubleshoot the problem by following the steps below.

### Step1: Confirm system architecture

It is necessary to confirm whether the machine where the Studio service is deployed is of x86_64 architecture. Currently, Studio only supports x86_64 architecture.

### Step2: Check if the Studio service starts normally

Run `docker-compose ps` to check if the service has started normally.

If the service is normal, the return result is as follows. Among them, the `State` column should all be displayed as `Up`.

```bash
      Name                          Command               State               Ports
 ------------------------------------------------------------------------------------------------------
 nebula-web-docker_client_1     ./nebula-go-api                  Up      0.0.0.0:32782->8080/tcp
 nebula-web-docker_importer_1   nebula-importer --port=569 ...   Up      0.0.0.0:32783->5699/tcp
 nebula-web-docker_nginx_1      /docker-entrypoint.sh ngin ...   Up      0.0.0.0:7001->7001/tcp, 80/tcp
 nebula-web-docker_web_1        docker-entrypoint.sh npm r ...   Up      0.0.0.0:32784->7001/tcp
```

If the above result is not returned, stop Studio and restart it first. For details, refer to [Deploy Studio](../deploy-connect/st-ug-deploy.md).

!!! note

    If you used `docker-compose up -d` to satrt Nebula Graph before, you must run the `docker-compose down` to stop Nebula Graph.

### Step3: Confirm address

If Studio and the browser are on the same machine, users can use `localhost:7001`, `127.0.0.1:7001` or `0.0.0.0:7001` in the browser to access Studio.

If Studio and the browser are not on the same machine, you must enter `<studio_server_ip>:7001` in the browser. Among them, `studio_server_ip` refers to the IP address of the machine where the Studio service is deployed.

### Step4: Confirm network connection

Run `curl <studio_server_ip>:7001` -I to confirm if it is normal. If it returns `HTTP/1.1 200 OK`, it means that the network is connected normally.

If the connection is refused, check according to the following steps:

If the connection fails, check according to the following steps:

- If Studio and Nebula Graph are on the same machine, check if the port is exposed.

- If Studio and Nebula Graph are not on the same machine, check the network configuration of the Nebula Graph server, such as firewall, gateway, and port.

If you cannot connect to the Nebula Graph service after troubleshooting with the above steps, please go to the [Nebula Graph forum](https://discuss.nebula-graph.io) for consultation.