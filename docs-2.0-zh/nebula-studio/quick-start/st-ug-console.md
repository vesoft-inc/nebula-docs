# 控制台界面

本文介绍 Studio 的控制台界面。

## 入口

在顶部导航栏里，单击**控制台**。

## 页面介绍

<img src="https://docs-cdn.nebula-graph.com.cn/figures/std_console_240131_cn.png" width="1200" alt="控制台界面截屏">

下表列出了控制台界面上的各种功能。

| 编号  |  功能 | 说明  |
| :-- | :--|   :--   |
|  1  |  查看 Schema  | 展示图空间的 Schema。 |
|  2  |  选择图空间  | 选择执行 nGQL 的图空间。不支持在控制台执行`USE <space_name>`语句切换图空间。  |
|  3  | 收藏夹 | 点击![save](https://docs-cdn.nebula-graph.com.cn/figures/studio-btn-save.png) 按钮，展开收藏夹，点击其中一个语句，该语句会自动输入到输入框中。 |
|  4  |  历史清单   |  点击 ![history](https://docs-cdn.nebula-graph.com.cn/figures/studio-btn-history.png) 按钮，在语句运行记录列表里，点击其中一个语句，输入框中即自动输入该语句。列表里提供最近 15 次语句运行记录。</br>在输入框中输入`/`可以快速选择历史查询语句。  |
|  5  |  清空输入框  | 点击 ![clear](https://docs-cdn.nebula-graph.com.cn/figures/studio-btn-clear.png) 按钮，清空输入框中已经输入的内容。   |
|  6  |  运行  |  在输入框中输入 nGQL 语句后，点击 ![play](https://docs-cdn.nebula-graph.com.cn/figures/studio-btn-play.png) 按钮即开始运行语句。   |
|  7  |  输入框   |  输入 nGQL 语句的区域。语句会根据 Schema 或字符串展示不同颜色。</br>支持代码补全，可以根据 Schema 快速输入 Tag 或者 Edge type。</br>可以同时输入多个语句按顺序执行，语句之间以`;`分隔。可以用`//`添加注释。</br>支持对选中的语句单击右键，然后执行剪切、复制、运行等操作。 |
|  8  |  自定义参数展示   | 点击 ![查询](https://docs-cdn.nebula-graph.com.cn/figures/down.png)按钮可展开查看自定义参数，用于参数化查询。详情信息可见[管理参数](../../nebula-console.md)。|
|  9  |  语句运行状态   |  运行 nGQL 语句后，这里显示语句运行状态。如果语句运行成功，语句以绿色显示。如果语句运行失败，语句以红色显示。   |
|  10  | 添加到收藏夹 | 点击![save](https://docs-cdn.nebula-graph.com.cn/figures/studio-btn-save.png) 按钮，将语句存入收藏夹中，已收藏的语句该按钮以黄色展示。|
|  11  |  导出 CSV 文件或 PNG 格式图片 |  运行 nGQL 语句返回结果后，返回结果为表格形式时，点击 ![download](https://docs-cdn.nebula-graph.com.cn/figures/studio-btn-download.png) 按钮即能将结果以 CSV 文件的形式导出。</br>切换到可视化窗口，点击 ![download](https://docs-cdn.nebula-graph.com.cn/figures/studio-btn-download.png) 按钮即能将结果以 CSV 文件或 PNG 图片的形式导出。   |
|  12  |  展开/隐藏执行结果  | 点击 ![up](https://docs-cdn.nebula-graph.com.cn/figures/studio-btn-up.png) 按钮，隐藏此条 nGQL 语句返回的结果。 |
|  13  |  关闭执行结果  | 点击 ![close](https://docs-cdn.nebula-graph.com.cn/figures/studio-btn-close.png)按钮，关闭此条 nGQL 语句返回的结果。 |
|  14  |  表格窗口 |  在表格中显示语句的运行结果。 |
|  15  |  执行计划窗口 |  显示执行计划。如果执行的是`EXPLAIN`或`PROFILE`语句，窗口会以可视化形式呈现执行计划。如何理解执行计划请参见下文说明。 |
|  16  |  可视化窗口 | 显示语句运行结果。如果结果包含完整的点边信息，窗口会以可视化形式呈现返回的结果。点击右方 ![expand](https://docs-cdn.nebula-graph.com.cn/figures/studio-btn-back.png)按钮，展开数据概览面板。 |
|  17  |  AI 查询语句助手 |  用户可以和助手聊天，将自然语言转换为 nGQL 查询语句，并支持一键复制 nGQL 语句到输入框中。使用前需要在[系统设置](../system-settings.md)里设置和启用该功能。</br>注意：</br>和助手交互时，会将当前图空间的 Schema 信息发送给大规模语言模型，请注意信息安全。</br>开关**text2match**用于切换普通问答和查询问答。查询问答可以输入自然语言转换为 nGQL 查询语句。|

## 执行计划说明

Studio 可以展示语句的执行计划，界面说明如下。

<img src="https://docs-cdn.nebula-graph.com.cn/figures/ec_expl_excutionPlan_231226_cn.png" width="1000" alt="执行计划截屏">

|序号|说明|
|:---|:---|
|1   |`EXPLAIN`或`PROFILE`语句。|
|2   |执行计划涉及的算子并根据执行耗时排序。耗时前三的算子分别标记为为红色、橘红色和黄色。单击算子可以直接选中执行流程中的对应算子并展示算子信息。</br>注意：`PROFILE`语句会实际执行语句，所以能得到实际的耗时并排序。`EXPLAIN`不会执行语句，所有算子耗时视为相同并标记为红色。|
|3   |算子执行流程。每个算子都会显示该算子的入参、出参和耗时。</br>`Select`、`Loop`、`PassThrough`和`Start`算子有独立配色。</br>箭头展示数据流向和行数，行数越多，箭头越粗。</br>单击算子会在右侧展示算子的详细信息。|
|4   |算子详细信息。分为`Profiling data`和`Operator info`两部分。</br>`Profiling data`展示算子的性能数据，包括接收到的数据行数、执行耗时、总耗时等。</br>`Operator info`展示算子的具体操作信息。|
|5   |放大或缩小界面，还可以倒序显式算子执行流程。|
|6   |语句耗时。|
|7   |全屏展示或取消全屏。|

关于算子和优化规则的介绍以及如何调优，可以参考论坛[执行计划详解与调优](https://discuss.nebula-graph.com.cn/t/topic/12010)。