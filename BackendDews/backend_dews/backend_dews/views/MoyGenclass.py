from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from elasticsearch import Elasticsearch
from django.http import JsonResponse
# from elasticsearch_utils.queries import search_documents

ELASTIC_PASSWORD = "+TQ3lG=S3jAfZb7RE59j"  # Define ELASTIC_PASSWORD before using it
es_client = Elasticsearch( "https://localhost:9200/",  basic_auth=("elastic", ELASTIC_PASSWORD), verify_certs=False,  ssl_show_warn=False )


class MoyGenClassView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        try:
            body = {
                "size": 0,
                "aggs": {
                    "classes": {
                        "terms": {"field": "id_classe.keyword"},
                        "aggs": {
                            "average_grade": {
                                "avg": {"field": "MoyenneGen_i1"}
                            }
                        }
                    }
                }
            }
            response = es_client.search(index="data_middle*", body=body)
            results = response['aggregations']['classes']['buckets']
            table_data = [{"class": result['key'], "average": result['average_grade']['value']} for result in results]
            return JsonResponse(table_data, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
