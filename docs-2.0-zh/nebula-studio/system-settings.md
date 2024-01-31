# 全局设置

本文介绍 Studio 的全局设置，包含语言切换和 Beta 功能。

- 语言：支持切换中文和英文。

- Beta 功能：Beta 功能开关。Beta 功能目前包括[查看 Schema](manage-schema/st-ug-view-schema.md)、[文本转查询](quick-start/st-ug-console.md)和 [AI 导入](quick-start/st-ug-import-data.md)。

  文本转查询和 AI 导入需要设置人工智能相关的配置。详细设置参见下文。

## 文本转查询和 AI 导入

文本转查询和 AI 导入是基于大规模语言模型（LLM）实现的人工智能，需要配置以下参数才能正常使用。

|参数|说明|
|:---------|:--|
|**API type**  | API 接口类型。支持`OpenAI`和`Aliyun`。     |
|**URL**       | API URL。请按照对应接口类型填写正确的 URL 格式。例如`https://{your-resource-name}.openai.azure.com/openai/deployments/{deployment-id}/chat/completions?api-version={api-version}`。  |
|**key**       | 用于验证 API 的 key。使用在线大语言模型时必填，使用离线大语言模型时根据实际设置选填。  |
|**model**     | 大语言模型版本。使用在线大语言模型时必填，使用离线大语言模型时根据实际设置选填。     |
|**文本最大长度**| 接收或生成一段文本的最大长度限制。单位：字节。     |