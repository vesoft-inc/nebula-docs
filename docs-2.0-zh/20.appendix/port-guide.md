# 产品端口全集

以下是{{nebula.name}}内核及周边工具使用的默认端口信息：

| 序号 | 所属产品/服务          | 类型 | 默认端口                      | 说明                                                         |
| :--- | :--------------------- | :--- | :---------------------------- | :----------------------------------------------------------- |
| 1    | {{nebula.name}}            | TCP  | 9669                          | Graph 服务的 RPC 守护进程监听端口。通常用于客户端连接Graph服务。 |
| 2    | {{nebula.name}}            | TCP  | 19669                         | Graph 服务的 HTTP 端口。                                     |
| 3    | {{nebula.name}}            | TCP  | 19670                         | Graph 服务的 HTTP/2 端口。（3.x 后已弃用该端口）                    |
| 4    | {{nebula.name}}            | TCP  | 9559、9560                          | `9559`是 Meta 服务的 RPC 守护进程监听端口。通常由 Graph 服务和 Storage 服务发起请求，用于获取和更新图数据库的元数据信息。<br/>同时还会使用相邻的`+1`（`9560`）端口用于 Meta 服务之间的 Raft 通信。 |
| 5    | {{nebula.name}}            | TCP  | 19559                         | Meta 服务的 HTTP 端口。                                      |
| 6    | {{nebula.name}}            | TCP  | 19560                         | Meta 服务的 HTTP/2 端口。（3.x 后已弃用该端口）                     |
| 7   | {{nebula.name}}            | TCP  | 9779、9778、9780                          | `9779`是 Storage 服务的 RPC 守护进程监听端口。通常由 Graph 服务发起请求，用于执行数据存储相关的操作，例如读取、写入或删除数据。<br/>同时还会使用相邻的`-1`（`9778`）和`+1`（`9780`）端口。<br/>`9778`：Admin 服务（Storage 接收 Meta 命令的服务）占用的端口。<br/>`9780`：Storage 服务之间的 Raft 通信端口。 |
| 8   | {{nebula.name}}            | TCP  | 19779                         | Storage 服务的 HTTP 端口。                                   |
| 9   | {{nebula.name}}            | TCP  | 19780                         | Storage 服务的 HTTP/2 端口。（3.x 后已弃用该端口）                  |
| 10   | {{nebula.name}}            | TCP  | 8888                          | 备份和恢复功能的 Agent 服务端口。Agent 是集群中每台机器的一个守护进程，用于启停{{nebula.name}}服务和上传、下载备份文件。 |
| 11   | {{nebula.name}}            | TCP  | 9789、9788、9790 | `9789`是全文索引中 Raft Listener 的端口，从 Storage 服务读取数据，然后将它们写入 Elasticsearch 集群。<br/>也是集群间数据同步中 Storage Listener 的端口。用于同步主集群的 Storage 数据。<br/>同时还会使用相邻的`-1`（`9788`）和`+1`（`9790`）端口。<br/>`9788`：内部端口。<br/>`9790`：Raft 通信端口。 |
| 12   | {{nebula.name}}            | TCP  | 9200                          | {{nebula.name}}使用该端口与 Elasticsearch 进行 HTTP 通信，以执行全文搜索查询和管理全文索引。 |
| 13   | {{nebula.name}}            | TCP  | 9569、9568、9570| `9569`是集群间数据同步功能中 Meta Listener 的端口，用于同步主集群的 Meta 数据。<br/>同时还会使用相邻的`-1`（`9568`）和`+1`（`9570`）端口。<br/>`9568`：内部端口。<br/>`9570`：Raft 通信端口。 |
| 14   | {{nebula.name}}            | TCP  | 9889、9888、9890 | `9889`是集群间数据同步功能中 Drainer 服务端口。用于同步 Storage、Meta 数据给从集群。<br/>同时还会使用相邻的`-1`（`9888`）和`+1`（`9890`）端口。<br/>`9888`：内部端口。<br/>`9890`：Raft 通信端口。|
| 15   | NebulaGraph Studio     | TCP  | 7001                          | Studio 提供 Web 服务占用端口。                               |
| 16   | NebulaGraph Dashboard | TCP  | 8090                          | Nebula HTTP Gateway 依赖服务端口。为集群服务提供 HTTP 接口，执行 nGQL 语句与{{nebula.name}}数据库进行交互。 |
| 17   | NebulaGraph Dashboard | TCP  | 9200                          | Nebula Stats Exporter 依赖服务端口。收集集群的性能指标，包括服务 IP 地址、版本和监控指标（例如查询数量、查询延迟、心跳延迟 等）。 |
| 18   | NebulaGraph Dashboard | TCP  | 9100                          | Node Exporter 依赖服务端口。收集集群中机器的资源信息，包括 CPU、内存、负载、磁盘和流量。 |
| 19   | NebulaGraph Dashboard | TCP  | 9090                          | Prometheus 服务的端口。存储监控数据的时间序列数据库。        |
| 20   | NebulaGraph Dashboard | TCP  | 7003                          | Dashboard 社区版 提供 Web 服务占用端口。                     |
