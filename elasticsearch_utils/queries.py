# elasticsearch_utils/queries.py
from .utils import get_es_client

# Search documents in Elasticsearch
def search_documents(data_middle_1, query):
    es_client = get_es_client()
    es_response = es_client.search(index=data_middle_1, body=query)
    return es_response['hits']['hits']
