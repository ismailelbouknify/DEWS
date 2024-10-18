# elasticsearch_utils/utils.py
from elasticsearch import Elasticsearch

# Define Elasticsearch connection
def get_es_client():
    ELASTIC_PASSWORD = "+TQ3lG=S3jAfZb7RE59j"  # Define ELASTIC_PASSWORD before using it
    es_client = Elasticsearch( "https://localhost:9200/",  basic_auth=("elastic", ELASTIC_PASSWORD), verify_certs=False,  ssl_show_warn=False )

    return es_client

# Error handling
def handle_es_error(exception):
    print(f"An error occurred: {exception}")
    # Additional error handling logic as needed

# Data processing
def process_es_data(es_data):
    processed_data = [hit['_source'] for hit in es_data['hits']['hits']]
    return processed_data
