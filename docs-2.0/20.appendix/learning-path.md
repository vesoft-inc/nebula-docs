# NebulaGraph learning path

This topic is for anyone interested in learning more about NebulaGraph. You can master NebulaGraph from zero to hero through the documentation and videos in NebulaGraph learning path. 

 ![learning path](https://docs-cdn.nebula-graph.com.cn/figures/learning-path.png)

After completing the NebulaGraph learning path, taking [NebulaGraph Certification](https://www.bilibili.com/video/BV1Ga411x7RE) exams will earn you certifications. For more information, see the **Get NebulaGraph Certifications** section below.

<iframe width="560" height="315" src="https://www.youtube.com/embed/dZUKyw8L7uA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 1. About NebulaGraph

### 1.1 What is NebulaGraph?

| Document                                                         | Video                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [What is NebulaGraph](../1.introduction/1.what-is-nebula-graph.md) | [NebulaGraph](https://www.youtube.com/watch?v=LNwCzn2xdYI)|

### 1.2 Data models
  
  | Document                                                         |
  | ------------------------------------------------------------ |
  | [Data modeling](../1.introduction/2.data-model.md) |



### 1.3 Path
  
| Document   | 
| ------------ | 
| [Path](../1.introduction/2.1.path.md) | 



### 1.4 NebulaGraph architecture

  | Document                                                         | 
  | ------------------------------------------------------------ | 
  | [Meta service](../1.introduction/3.nebula-graph-architecture/2.meta-service.md) | 
  | [Graph service](../1.introduction/3.nebula-graph-architecture/3.graph-service.md) | 
  | [Storage service](../1.introduction/3.nebula-graph-architecture/4.storage-service.md) | 
  

## 2. Quick start

### 2.1 Install NebulaGraph

  | Document                                                         | Video                                                         |
  | ------------------------------------------------------------ | ------------------------------------------------------------ |
  | [Install with a RPM or DEB package](../4.deployment-and-installation/2.compile-and-install-nebula-graph/2.install-nebula-graph-by-rpm-or-deb.md) | -                                                            |
  | [Install with a TAR package](../4.deployment-and-installation/2.compile-and-install-nebula-graph/4.install-nebula-graph-from-tar.md) | -                                                            |
  | [Install with Docker](../2.quick-start/1.quick-start-workflow.md) | [Install NebulaGraph with Docker and Docker Compose](https://www.youtube.com/watch?v=yM5GDpJedEI) |
  | [Install from source](../4.deployment-and-installation/2.compile-and-install-nebula-graph/1.install-nebula-graph-by-compiling-the-source-code.md) | [Install NebulaGraph with Source Code](https://www.youtube.com/watch?v=x-I835eEBz0)                                                             |
  

### 2.2 Start NebulaGraph

  | Document                                                         |
  | ------------------------------------------------------------ |
  | [Start and stop NebulaGraph](../2.quick-start/5.start-stop-service.md) |

### 2.3 Connect to NebulaGraph

  | Document
  | ------------------------------------------------------------ |
  | [Connect to NebulaGraph](../2.quick-start/3.connect-to-nebula-graph.md) |

### 2.4 Use nGQL statements 

  | Document|
  | ------------------------------------------------------------ |
  | [nGQL cheatsheet](../2.quick-start/6.cheatsheet-for-ngql.md) |  

## 3. Hands-on practices

### 3.1 Deploy a multi-machine cluster

  | Document |
  | ------------------------------------------------------------ |
  | [Deploy a NebulaGraph cluster with RPM/DEB](../4.deployment-and-installation/2.compile-and-install-nebula-graph/deploy-nebula-graph-cluster.md) |  

### 3.2 Upgrade NebulaGraph

  | Document                                                         |
  | ------------------------------------------------------------ |
  | [Upgrade NebulaGraph to {{nebula.branch}}](../4.deployment-and-installation/3.upgrade-nebula-graph/upgrade-nebula-graph-to-latest.md) |
  
  <!-- | [Upgrade NebulaGraph from v2.0.x to {{nebula.branch}}](../4.deployment-and-installation/3.upgrade-nebula-graph/upgrade-nebula-from-200-to-latest.md) | -->

### 3.3 Configure NebulaGraph

  | Document                                                         |
  | ------------------------------------------------------------ |
  | [Configure Meta](../5.configurations-and-logs/1.configurations/2.meta-config.md) |
  | [Configure Graph](../5.configurations-and-logs/1.configurations/3.graph-config.md) |
  | [Configure Storage](../5.configurations-and-logs/1.configurations/4.storage-config.md) |
  | [Configure Linux kernel](../5.configurations-and-logs/1.configurations/6.kernel-config.md) |

### 3.4 Configure logs

| Document |
| ------------------------------------------------------------ |
|[Log managements](../5.configurations-and-logs/2.log-management/logs.md) |

### 3.5 O&M and Management

- Account authentication and authorization

  | Document                                                         |
  | ------------------------------------------------------------ |
  | [Local authentication](../7.data-security/1.authentication/1.authentication.md) |
  | [User management](../7.data-security/1.authentication/2.management-user.md) |
  | [Roles and privileges](../7.data-security/1.authentication/3.role-list.md) |

  {{ent.ent_begin}}
  !!! note
        The [OpenLDAP](../7.data-security/1.authentication/4.ldap.md) feature is only available in NebulaGraph Enterprise Edition.
  {{ent.ent_end}}

- Balance the distribution of partitions

  | Document |
  | ------------------------------------------------------------ |
  |[Storage load balancing](../8.service-tuning/load-balance.md)|

- Monitoring

  | Document                                                         |
  | ------------------------------------------------------------ |
  | [NebulaGraph metrics](../6.monitor-and-metrics/1.query-performance-metrics.md) |
  | [RocksDB statistics](../6.monitor-and-metrics/2.rocksdb-statistics.md) |

- Data snapshot

  | Document |
  | ------------------------------------------------------------ |
  |[Create snapshots](../backup-and-restore/3.manage-snapshot.md)|

- Backup & Restore

  | Document |
  | ------------------------------------------------------------ |
  |[Backup&Restore](../backup-and-restore/nebula-br/1.what-is-br.md)|

  {{ent.ent_begin}}
- Resource isolation

  | Document |
  | ------------------------------------------------------------ |
  |[Zone](../4.deployment-and-installation/5.zone.md)|
  {{ent.ent_end}}

- SSL encryption

  | Document|
  | ------------------------------------------------------------ |
  |[SSL](../7.data-security/4.ssl.md)|


### 3.6 Performance tuning

  | Document     |
  | ------------------- |
  | [Graph data modeling suggestions](../8.service-tuning/2.graph-modeling.md) |
  | [System design suggestions](../8.service-tuning/3.system-design.md) |
  | [Compaction](../8.service-tuning/compaction.md) |


 
### 3.7 Derivative software

- Visualization

  | Visualization tools     | Document                                                         | Video                                                         |
  | -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
  | Data visualization     | [NebulaGraph Studio](../nebula-studio/about-studio/st-ug-what-is-graph-studio.md) | [NebulaGraph Studio](https://www.youtube.com/watch?v=6V4salpkIbc&list=PL4ArMmsAnb86R2MfUKFjzTQizCZCrhu2p)|
  | Data monitoring and O&M | [NebulaGraph Dashboard Community Edition](../nebula-dashboard/1.what-is-dashboard.md) | -|

  {{ent.ent_begin}}
  !!! note
        The visualization tools [NebulaGraph Dashboard Enterprise](../nebula-dashboard-ent/1.what-is-dashboard-ent.md) and [NebulaGraph Explorer](../nebula-explorer/about-explorer/ex-ug-what-is-explorer.md) are only available in NebulaGraph Enterprise Edition.
  {{ent.ent_end}}


- Data import and export

  | Import and export | Document                                                         | Video                                                         |
  | -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
  | Data import       | [NebulaGraph Importer](../nebula-importer/use-importer.md) | [NebulaGraph Importer](https://www.bilibili.com/video/BV1ny4y1u7i4) |
  | Data import       | [NebulaGraph Spark Connector](../nebula-spark-connector.md) | -                                                            |
  | Data import       | [NebulaGraph Flink Connector](../nebula-flink-connector.md) | -                                                            |
  | Data import       | [NebulaGraph Exchange Community Edition](../nebula-exchange/about-exchange/ex-ug-what-is-exchange.md) | - |
  | Data export       | [NebulaGraph Exchange Enterprise Edition](../nebula-exchange/about-exchange/ex-ug-what-is-exchange.md) | -                                                            |
  
- Performance test

  | Document                                                         |
  | ------------------------------------------------------------ |
  | [NebulaGraph Bench](../nebula-bench.md) |

- Cluster O&M

  | Document  |
  | -------- |
  | [NebulaGraph Operator](../nebula-operator/1.introduction-to-nebula-operator.md) |

- Graph algorithm

  | Document   |
  | ------- |
  | [NebulaGraph Algorithm](../graph-computing/nebula-algorithm.md) |

- Clients

  | Document                                                         |
  | ------------------------------------------------------------ |
  | [NebulaGraph Console](../2.quick-start/3.connect-to-nebula-graph.md) |
  | [NebulaGraph CPP](../14.client/3.nebula-cpp-client.md) |
  | [NebulaGraph Java](../14.client/4.nebula-java-client.md) |
  | [NebulaGraph Python](../14.client/5.nebula-python-client.md) |
  | [NebulaGraph Go](../14.client/6.nebula-go-client.md) |


## 4. API & SDK

  | Document                                                         |
  | ------------------------------------------------------------ |
  | [API & SDK](6.eco-tool-version.md)|


## 5. Best practices

  | Document                                                         |
  | ------------------------------------------------------------ |
  | [Handling Tens of Billions of Threat Intelligence Data with Graph Database at Kuaishou](https://nebula-graph.io/posts/kuaishou-security-intelligence-platform-with-nebula-graph/) |
  | [Import data from Neo4j to NebulaGraph via NebulaGraph Exchange: Best Practices](https://nebula-graph.io/posts/neo4j-nebula-graph-import-best-practice/) |
  | [Hands-On Experience: Import Data to NebulaGraph with Spark](https://nebula-graph.io/posts/best-practices-import-data-spark-nebula-graph/) |
  | [How to Select a Graph Database: Best Practices at RoyalFlush](https://nebula-graph.io/posts/how-to-select-a-graph-database/) |
  | [Practicing NebulaGraph Operator on Cloud](https://nebula-graph.io/posts/nebula-operator-practice/) |
  | [Using Ansible to Automate Deployment of NebulaGraph Cluster](https://nebula-graph.io/posts/deploy-nebula-graph-with-ansible/) |


## 6. FAQ

  | Document                                                         |
  | ------------------------------------------------------------ |
  | [FAQ](../20.appendix/0.FAQ.md) |


## 7. Practical tasks

You can check if you have mastered NebulaGraph by completing the following practical tasks. 

  | Task                                                | Reference                                                         |
  | ------------------------------------------------------- | ------------------------------------------------------------ |
  | Compile the source code of NebulaGraph                                                | [Install NebulaGraph by compiling the source code](../4.deployment-and-installation/2.compile-and-install-nebula-graph/1.install-nebula-graph-by-compiling-the-source-code.md)                                                             |
  | Deploy Studio and Dashboard            | [Deploy Studio](../nebula-studio/deploy-connect/st-ug-deploy.md), [Deploy Dashboard](../nebula-dashboard/2.deploy-dashboard.md)                                                            |
  | Load test NebulaGraph with K6                               | [NebulaGraph Bench](../nebula-bench.md) |
  | Query LDBC data (such as queries for vertices, paths, or subgraphs.) | [LDBC](chrome-extension://gfbliohnnapiefjpjlpjnehglfpaknnc/pages/pdf_viewer.html?r=http://ldbcouncil.org/ldbc_snb_docs/ldbc-snb-specification.pdf) and [interactive-short-1.cypher](https://github.com/ldbc/ldbc_snb_interactive/blob/main/cypher/queries/interactive-short-1.cypher) |

  {{ent.ent_begin}}
!!! note

    [Deploy Explorer](../nebula-explorer/deploy-connect/ex-ug-deploy.md) can be used only in NebulaGraph Enterprise Edition.
  {{ent.ent_end}}

## 8. Get NebulaGraph Certifications

Now you could get NebulaGraph Certifications from [NebulaGraph Academy](https://academic.nebula-graph.io).

- NebulaGraph Certified Insider(NGCI): The NGCI certification provides a birdview to graph databases and the NebulaGraph database. Passing NGCI shows that you have a good understanding of NebulaGraph.

- NebulaGraph Certified Professional(NGCP): The NGCP certification drives you deep into the NebulaGraph database and its ecosystem, providing a 360-degree view of the leading-edge graph database. Passing NGCP proves that you are a professional with a profound understanding of NebulaGraph.

## Reference documents

- For an introduction to the principles of NebulaGraph, see [Nebula Graph: An open source distributed graph database](https://arxiv.org/pdf/2206.07278.pdf).

- For the principle description of [NebulaGraph indexes](../3.ngql-guide/14.native-index-statements/README.md), see Section 2.4 in the [Nebula Graph: An open source distributed graph database](https://arxiv.org/pdf/2206.07278.pdf) paper.

- For an overview of the NebulaGraph language, see Section 2.8 in the [Nebula Graph: An open source distributed graph database](https://arxiv.org/pdf/2206.07278.pdf) paper.