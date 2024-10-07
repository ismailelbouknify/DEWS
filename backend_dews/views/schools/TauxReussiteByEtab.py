from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from elasticsearch import Elasticsearch
from django.http import JsonResponse
# from elasticsearch_utils.queries import search_documents

ELASTIC_PASSWORD = "ZkgiSTdIgawzh8--ogdY"  # Define ELASTIC_PASSWORD before using it
es_client = Elasticsearch("http://localhost:9200", http_auth=("elastic", ELASTIC_PASSWORD))

class TauxReussiteByEtab(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        try:
            body = {
                "size": 0,
                "aggs": {
                    "etab": {
                        "terms": {"field": "cd_etab.keyword"},
                        "aggs": {
                            "total": {"sum": {"field": "failure_i1"}},
                            "count": {"value_count": {"field": "failure_i1"}}
                        }
                    }
                }
            }
            response = es_client.search(index="data_middle_*", body=body)
            buckets = response['aggregations']['etab']['buckets']

            class_data = []
            for bucket in buckets:
                cd_etab = bucket['key']
                total_failures = bucket['total']['value']
                total_students = bucket['count']['value']
                success_rate = 1 - (total_failures / total_students) if total_students > 0 else 0
                class_data.append({"cd_etab": cd_etab, "success_rate": success_rate})

            return JsonResponse(class_data, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)