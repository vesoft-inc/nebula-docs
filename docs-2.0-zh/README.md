# 欢迎阅读 {{nebula.name}} {{ nebula.release }} 文档

!!! note
    
    本文档更新时间{{ now().year }}-{{ now().month }}-{{ now().day }}，GitHub commit [{{ git.short_commit }}](https://github.com/vesoft-inc/nebula-docs/commits/v{{nebula.release}})。该版本主色系为"桑色"，色号为 #55295B。

<!--
    
NebulaGraph 是一款开源的、分布式的、易扩展的原生图数据库，能够承载数千亿个点和数万亿条边的超大规模数据集，并且提供毫秒级查询。


<a href="https://www.bilibili.com/video/BV12R4y1e7U7"><img src="https://docs-cdn.nebula-graph.com.cn/figures/picture1.png" alt="3.4.0发布"></a>
-->

## 快速开始


* [快速开始](2.quick-start/1.quick-start-overview.md)
* [部署要求](4.deployment-and-installation/1.resource-preparations.md)
* [nGQL 命令汇总](2.quick-start/6.cheatsheet-for-ngql-command.md)
* [FAQ](20.appendix/0.FAQ.md)
* [生态工具](20.appendix/6.eco-tool-version.md)
* [Academy 课程](https://academic.nebula-graph.io/intro/)

## 最新发布

- [{{nebula.name}}  {{nebula.release}}](20.appendix/release-notes/nebula-comm-release-note.md)
- [NebulaGraph Dashboard Community](20.appendix/release-notes/dashboard-comm-release-note.md)
- [NebulaGraph Studio](20.appendix/release-notes/studio-release-note.md)


## 其他资料

- [学习路径](https://academic.nebula-graph.io/?lang=ZH_CN)
- [引用 NebulaGraph](https://arxiv.org/abs/2206.07278)
- [论坛](https://discuss.nebula-graph.com.cn/)
- [主页](https://nebula-graph.com.cn/)
- [系列视频](https://space.bilibili.com/472621355)
- [英文文档](https://docs.nebula-graph.io/)
   

## 图例说明

<!-- 
本文有 40+ 个 caution。
本文有 30+ 个 danger。
本文有 80+ 个 compatibility 和兼容性提示。
-->

!!! note

    额外的信息或者操作相关的提醒等。

!!! caution

    可能会产生不良影响，例如导致性能下降或引发已知的小问题。

!!! warning

    可能导致严重后果，例如数据丢失、系统崩溃。

!!! danger

    可能导致极其严重的后果，例如系统损坏、信息泄露。

!!! compatibility

    nGQL 与 openCypher 的兼容性或 nGQL 当前版本与历史版本的兼容性。

!!! enterpriseonly

    描述社区版和企业版的差异。

## 修改文档中的错误
 
{{nebula.name}} 文档以 Markdown 语言编写。单击文档标题右上侧的铅笔图标即可提交修改建议。
