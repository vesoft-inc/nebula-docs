# Global settings

This topic introduces the global settings of NebulaGraph Studio, including language switching and beta functions.

- Language: Switch between Chinese and English.

- Beta functions: Switch on/off beta features, which include [view schema](manage-schema/st-ug-view-schema.md), [text to query](quick-start/st-ug-console.md) and [AI import](quick-start/st-ug-import-data.md).

  The text to query and AI import features need to be configured with AI-related configurations. See below for detailed configurations.

## Text to query and AI import

The text to query and AI import are artificial intelligence features developed based on the large language model (LLM) and require the following parameters to be configured.

|Parameter|Description|
|:---------|:--|
|**API type**  | The API type for AI. Valid values are `OpenAI` and `Aliyun`.     |
|**URL**       | The API URL. Fill in the correct URL format according to the corresponding API type. For example, `https://{your-resource-name}.openai.azure.com/openai/deployments/{deployment-id}/chat/completions?api-version={api-version}`。  |
|**Key**       | The key used to validate the API. The key is required when using an online large language model, and is optional depending on the actual settings when using an offline large language model.  |
|**Model**     | The version of the large language model. The model is required when using an online large language model, and is optional depending on the actual settings when using an offline large language model.   |
|**Max text length**| The maximum length for receiving or generating a single piece of text. Unit: byte.     |