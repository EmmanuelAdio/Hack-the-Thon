from openai import AzureOpenAI

endpoint = "https://app-uoaihack6zs3w.azurewebsites.net"
model_name = "gpt-5.4"

api_key = "yk226Hj6hcfs3IwIzo78I4PIEsq9CPO3v1o8ovcfbHmR9mnW"
api_version = "2024-12-01-preview"

client = AzureOpenAI(
    api_version=api_version,
    azure_endpoint=endpoint,
    api_key=api_key,
)

