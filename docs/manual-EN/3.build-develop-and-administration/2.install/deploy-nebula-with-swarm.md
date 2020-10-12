# Deploy Nebula Graph cluster with Docker Swarm

This document gives the introduction on deploying a Nebula Graph cluster with Docker Swarm.

## Prerequisites

Before deploying cluster, make sure that you have installed Nebula Graph, Docker, Docker Compose. To customize load balancing and high availability, you need to install HAProxy, and Keepalived.

The hosts used in this document are as follow:

| IP            | Memory (GB) | CPU (CORES) | Role    |
| ------------- | ----------- | ----------- | ------- |
| 192.168.1.166 | 16          | 4           | manager |
| 192.168.1.167 | 16          | 4           | worker  |
| 192.168.1.168 | 16          | 4           | worker  |

## Create Nebula Graph cluster

### Initialize the Docker Swarm cluster

Execute the following command on host `192.168.1.166`:

```bash
$ docker swarm init --advertise-addr 192.168.1.166
```

The following information is returned:

```bash
Swarm initialized: current node (dxn1zf6l61qsb1josjja83ngz) is now a manager.
To add a worker to this swarm, run the following command:
 docker swarm join \
 --token SWMTKN-1-49nj1cmql0jkz5s954yi3oex3nedyz0fb0xx14ie39trti4wxv-8vxv8rssmk743ojnwacrr2e7c \
 192.168.1.166:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```

### Add a worker node

Add a Swarm worker node based on the notification message of the preceding `docker swarm init` command. Execute the following command on `192.168.1.167` and `192.168.1.168` respectively.

```bash
$ docker swarm join \
 --token SWMTKN-1-49nj1cmql0jkz5s954yi3oex3nedyz0fb0xx14ie39trti4wxv-8vxv8rssmk743ojnwacrr2e7c \
 192.168.1.166:2377
```

The following information is returned:

```bash
This node joined a swarm as a worker.
```

### Authenticate the cluster

Execute the following command on the manager node to list the Docker Swarm nodes:

```bash
$ docker node ls
```

The following information is returned:

```bash
ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
h0az2wzqetpwhl9ybu76yxaen *   KF2-DATA-166        Ready               Active              Reachable           18.06.1-ce
q6jripaolxsl7xqv3cmv5pxji     KF2-DATA-167        Ready               Active              Leader              18.06.1-ce
h1iql1uvm7123h3gon9so69dy     KF2-DATA-168        Ready               Active                                  18.06.1-ce
```

### Configure Docker Stack

Execute the following command on the manager node to add the Docker Stack configuration file:

```bash
vi docker-stack.yml
```

You must configure with your own IPs and port numbers. For the sample configuration file, refer to [here](docker-stack.yml).

Execute the following command on the manager node to add the `nebula.env` file:

```bash
$ vi nebula.env
```

Add the following content to the `nebula.env` file:

```yml
TZ=UTC
USER=root
```

### Start the cluster

Execute the following command on the manager node to start the Nebula Graph cluster:

```bash
$ docker stack deploy nebula -c docker-stack.yml
```

## Configure cluster for load balancing and high availability (optional)

Currently, the Nebula Graph clients (1.X) do not provide load balancing. The clients select any graphd to connect the database randomly. Therefore, you need to configure load balancing and high availability for production environment. The load balancing and high availability solution in this document is only for demonstration. Add other third party solutions based on your requirements.

### Configure load balancing

HAProxy uses Docker compose for configuration. Edit the following three files respectively:

Add the following content in the `Dockerfile` file:

```bash
FROM haproxy:1.7
COPY haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg
EXPOSE 3640
```

Add the following content in the `docker-compose.yml` file:

```yml
version: "3.2"
services:
  haproxy:
    container_name: haproxy
    build: .
    volumes:
      - ./haproxy.cfg:/usr/local/etc/haproxy/haproxy.cfg
    ports:
      - 3640:3640
    restart: always
    networks:
      - app_net
networks:
  app_net:
    external: true
```

Add the following content in the `haproxy.cfg` file:

You must configure with your own IPs and port numbers.

```cfg
global
    daemon
    maxconn 30000
    log 127.0.0.1 local0 info
    log 127.0.0.1 local1 warning

defaults
    log-format %hr\ %ST\ %B\ %Ts
    log  global
    mode http
    option http-keep-alive
    timeout connect 5000ms
    timeout client 10000ms
    timeout server 50000ms
    timeout http-request 20000ms

# custom your own frontends && backends && listen conf
#CUSTOM

listen graphd-cluster
    bind *:3640
    mode tcp
    maxconn 300
    balance roundrobin
    server server1 192.168.1.166:3699 maxconn 300 check
    server server2 192.168.1.167:3699 maxconn 300 check
    server server3 192.168.1.168:3699 maxconn 300 check

listen stats
    bind *:1080
    stats refresh 30s
    stats uri /stats
```

### Start HAProxy

```bash
$ docker-compose up -d
```

### Configure high availability

Do the following operations on `192.168.1.166`, `192.168.1.167`, and `192.168.1.168`.

#### Install Keepalived

Execute the following command to install Keepalived:

```bash
apt-get update && apt-get upgrade && apt-get install keepalived -y
```

#### Configure Keepalived

Modify the Keepalived configuration file `/etc/keepalived/keepalived.conf`. To ensure that there is a priority in the three hosts, you must set the priority parameters to different values. For the sample configuration file, refer to [here](keepalived.conf).

**NOTE**: To configure Keepalive, you need a virtual IP. In the sample configurations, `192.168.1.99` is the virtual IP.

Relevant commands used in Keepalived:

```bash
# Start Keepalived
systemctl start keepalived
# Start Keepalived automatically
systemctl enable keeplived
# Re-start Keepalived
systemctl restart keepalived
```

## FAQ

### How to deploy offline

Changing the Docker image to private image repo.
