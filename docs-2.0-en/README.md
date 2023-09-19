# Welcome to NebulaGraph {{ nebula.release }} Documentation

!!! caution

    Documents of version {{ nebula.release }} are only for NebulaGraph Community Edition {{ nebula.release }} and the corresponding tools. NebulaGraph Enterprise Edition {{ nebula.release }} is not released ([the release cycle for NebulaGraph Enterprise Edition is usually 6 months](20.appendix/6.eco-tool-version.md)). For details, see [Release notes](20.appendix/release-notes/nebula-comm-release-note.md).

!!! note

    This manual is revised on {{ now().year }}-{{ now().month }}-{{ now().day }}, with GitHub commit [{{ git.short_commit }}](https://github.com/vesoft-inc/nebula-docs/commits/v{{nebula.release}}).

!!! Compatibility

    In the version of NebulaGraph 3.2, the vertex without tags is allowed. But since NebulaGraph 3.3.0, the vertex without tags is not supported by default.

NebulaGraph is a distributed, scalable, and lightning-fast graph database. It is the optimal solution in the world capable of hosting graphs with dozens of billions of vertices (nodes) and trillions of edges (relationships) with millisecond latency.

## Getting started

* [Learning path](20.appendix/learning-path.md) & [Get NebulaGraph Certifications](https://academic.nebula-graph.io/?lang=EN_US)
* [What is Nebula Graph](1.introduction/1.what-is-nebula-graph.md)
* [Quick start](2.quick-start/1.quick-start-workflow.md)
* [Preparations before deployment](4.deployment-and-installation/1.resource-preparations.md)
* [nGQL cheatsheet](2.quick-start/6.cheatsheet-for-ngql.md)
* [FAQ](20.appendix/0.FAQ.md)
* [Ecosystem Tools](20.appendix/6.eco-tool-version.md)
  

## Release notes

- [NebulaGraph Community Edition {{ nebula.release }}](20.appendix/release-notes/nebula-comm-release-note.md)
<!-- - [NebulaGraph Enterprise Edition {{ nebula.release }}](20.appendix/release-notes/nebula-ent-release-note.md)。
- [NebulaGraph Studio](20.appendix/release-notes/studio-release-note.md)
- [NebulaGraph Explorer](20.appendix/release-notes/explorer-release-note.md)
- [NebulaGraph Dashboard Community Edition](20.appendix/release-notes/dashboard-comm-release-note.md)
- [NebulaGraph Dashboard Enterprise Edition](20.appendix/release-notes/dashboard-ent-release-note.md) -->


## Other Sources

- [To cite NebulaGraph](https://arxiv.org/abs/2206.07278)
- [NebulaGraph Homepage](https://nebula-graph.io/)
- [Forum](https://github.com/vesoft-inc/nebula/discussions)
- [Blogs](https://nebula-graph.io/posts/)
- [Videos](https://www.youtube.com/channel/UC73V8q795eSEMxDX4Pvdwmw)
- [Chinese Docs](https://docs.nebula-graph.com.cn/)

## Symbols used in this manual

<!-- 
This manual has over 40 cautions.
This manual has over 30 dangers.
This manual has over 80 compatibilities and corresponding tips.
-->

!!! note

    Additional information or operation-related notes.

!!! caution

    Cautions that need strict observation. If not, systematic breakdown, data loss, and security issues may happen.

!!! danger

    Operations that may cause danger. If not observed, systematic breakdown, data loss, and security issues will happen.

!!! performance

    Operations that merit attention as for performance enhancement.

!!! faq

    Frequently asked questions.

!!! compatibility

    The compatibility notes between nGQL and openCypher, or between the current version of nGQL and its prior ones. 

!!! enterpriseonly

    Differences between the NebulaGraph Community and Enterprise editions.

## Modify errors
 
This NebulaGraph manual is written in the Markdown language. Users can click the pencil sign on the upper right side of each document title and modify errors.
