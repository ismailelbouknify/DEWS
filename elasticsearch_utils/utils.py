# elasticsearch_utils/utils.py
from elasticsearch import Elasticsearch

# Define Elasticsearch connection
def get_es_client():
    ELASTIC_PASSWORD = "ZkgiSTdIgawzh8--ogdY"  # Define ELASTIC_PASSWORD before using it
    es_client = Elasticsearch("http://localhost:9200", http_auth=("elastic", ELASTIC_PASSWORD))
    return es_client

# Error handling
def handle_es_error(exception):
    print(f"An error occurred: {exception}")
    # Additional error handling logic as needed

# Data processing
def process_es_data(es_data):
    processed_data = [hit['_source'] for hit in es_data['hits']['hits']]
    return processed_data
