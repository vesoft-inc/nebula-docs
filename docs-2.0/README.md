# Welcome to Nebula Graph {{ nebula.release }} Documentation

!!! note "Check the manual version"

    This manual is revised on {{ now().year }}-{{ now().month }}-{{ now().day }}, with [GitHub commit](https://github.com/vesoft-inc/nebula-docs/commits/v{{nebula.release}}) {{ git.short_commit }}.

<!--
!!! note "This manual is revised on {{ now().year }}-{{ now().month }}-{{ now().day }}, with [GitHub commit](https://github.com/vesoft-inc/nebula-docs/commits/master) {{ git.short_commit }}."
-->

Nebula Graph is a distributed, scalable, and lightning-fast graph database. It is the optimal solution in the world capable of hosting graphs with dozens of billions of vertices (nodes) and trillions of edges (relationships) with millisecond latency.

## Getting started

* [Learning path](20.appendix/learning-path.md)
* [What is Nebula Graph](1.introduction/1.what-is-nebula-graph.md)
* [Quick start workflow](2.quick-start/1.quick-start-workflow.md)
* [Configuration](4.deployment-and-installation/1.resource-preparations.md)
* [FAQ](20.appendix/0.FAQ.md)
* [Ecosystem Tools](20.appendix/6.eco-tool-version.md)
  
## Other Sources

- [Nebula Graph Homepage](https://nebula-graph.io/)
- [Release note](20.appendix/releasenote.md)
- [Forum](https://discuss.nebula-graph.io/)
- [Blog](https://nebula-graph.io/posts/)
- [Video](https://www.youtube.com/channel/UC73V8q795eSEMxDX4Pvdwmw)
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

    Common questions.

!!! compatibility

    The compatibility between nGQL and openCypher, or between the current version of nGQL and its prior ones. 

!!! enterpriseonly

    Differences between the Nebula Graph Open Source and Enterprise editions.

## Modify errors
 
This Nebula Graph manual is written in the Markdown language. Users can click the pencil sign on the upper right side of each document title and modify errors.
