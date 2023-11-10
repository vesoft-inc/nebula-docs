# Port guide for company products

The following are the default ports used by NebulaGraph core and peripheral tools.

| No. | Product / Service          | Type | Default                      | Description                                                    |
| :--- | :--------------------- | :--- | :---------------------------- | :----------------------------------------------------------- |
| 1    | NebulaGraph            | TCP  | 9669                          | Graph service RPC daemon listening port. Commonly used for client connections to the Graph service. |
| 2    | NebulaGraph            | TCP  | 19669                         | Graph service HTTP port.                                     |
| 3    | NebulaGraph            | TCP  | 19670                         | Graph service HTTP/2 port. (Deprecated after version 3.x)                    |
| 4    | NebulaGraph            | TCP  | 9559, 9560                          | `9559` is the RPC daemon listening port for Meta service. Commonly used by Graph and Storage services for querying and updating metadata in the graph database. <br/>The neighboring `+1` (`9560`) port is used for Raft communication between Meta services.|
| 5    | NebulaGraph            | TCP  | 19559                         | Meta service HTTP port.                                      |
| 6    | NebulaGraph            | TCP  | 19560                         | Meta service HTTP/2 port. (Deprecated after version 3.x)                     |
| 7   | NebulaGraph            | TCP  | 9779, 9778, 9780                          | `9779` is the RPC daemon listening port for Storage service. Commonly used by Graph services for data storage-related operations, such as reading, writing, or deleting data. <br/>The neighboring ports `-1` (`9778`) and `+1` (`9780`) are also used. <br/>`9778`: The port used by the Admin service, which receives Meta commands for Storage. <br/>`9780`: The port used for Raft communication between Storage services. |
| 8   | NebulaGraph            | TCP  | 19779                         | Storage service HTTP port.                                   |
| 9   | NebulaGraph            | TCP  | 19780                         | Storage service HTTP/2 port. (Deprecated after version 3.x)                  |
| 10   | NebulaGraph            | TCP  | 8888                          | Backup and restore Agent service port. The Agent is a daemon running on each machine in the cluster, responsible for starting and stopping NebulaGraph services and uploading and downloading backup files. |
| 11   | NebulaGraph            | TCP  | 9789, 9788, 9790 | `9789` is the Raft Listener port for Full-text index, which reads data from Storage services and writes it to the Elasticsearch cluster.<br/>Also the port for Storage Listener in inter-cluster data synchronization, used for synchronizing Storage data from the primary cluster. <br/>The neighboring ports `-1` (`9788`) and `+1` (`9790`) are also used.<br/>`9788`: An internal port.<br/>`9790`: The port used for Raft communication. |
| 12   | NebulaGraph            | TCP  | 9200                          | NebulaGraph uses this port for HTTP communication with Elasticsearch to perform full-text search queries and manage full-text indexes. |
| 13   | NebulaGraph            | TCP  | 9569, 9568, 9570| `9569` is the Meta Listener port in inter-cluster data synchronization, used for synchronizing Meta data from the primary cluster. <br/>The neighboring ports `-1` (`9568`) and `+1` (`9570`) are also used.<br/>`9568`: An internal port.<br/>`9570`: The port used for Raft communication. |
| 14   | NebulaGraph            | TCP  | 9889, 9888, 9890 |Drainer service port in inter-cluster data synchronization, used for synchronizing Storage and Meta data to the primary cluster. <br/>The neighboring ports `-1` (`9888`) and `+1` (`9890`) are also used.<br/>`9888`: An internal port.<br/>`9890`: The port used for Raft communication. |
| 15 | NebulaGraph Studio | TCP | 7001 | Studio web service port. |
| 16   | NebulaGraph Dashboard | TCP  | 8090                          | Nebula HTTP Gateway dependency service port. Provides an HTTP interface for cluster services to interact with the NebulaGraph database using nGQL statements.0 |
| 17 | NebulaGraph Dashboard | TCP | 9200 | Nebula Stats Exporter dependency service port. Collects cluster performance metrics, including service IP addresses, versions, and monitoring metrics (such as query count, query latency, heartbeat latency, etc.). |
| 18 | NebulaGraph Dashboard | TCP | 9100 | Node Exporter dependency service port. Collects resource information for machines in the cluster, including CPU, memory, load, disk, and traffic. |
| 19 | NebulaGraph Dashboard | TCP | 9090 | Prometheus service port. Time-series database for storing monitoring data. |
| 20 | NebulaGraph Dashboard | TCP | 7003 | Dashboard Community Edition web service port. |
