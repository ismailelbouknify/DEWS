from elasticsearch_utils.queries import search_documents
from django.http import JsonResponse

def student_list_view2(request):
    # Fetch student data from Elasticsearch
    es_query = {
        "query": {
            "match_all": {}
        },
        "size": 10000
    }
    es_results = search_documents('data_middle_2', es_query)  # Update index name accordingly
    student_data = [hit['_source'] for hit in es_results]

    # Render data in JSON response
    return JsonResponse(student_data, safe=False)
