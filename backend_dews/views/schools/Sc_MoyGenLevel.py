from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from elasticsearch import Elasticsearch
from django.http import JsonResponse
# from elasticsearch_utils.queries import search_documents

ELASTIC_PASSWORD = "ZkgiSTdIgawzh8--ogdY"  # Define ELASTIC_PASSWORD before using it
es_client = Elasticsearch("http://localhost:9200", http_auth=("elastic", ELASTIC_PASSWORD))

class Sc_MoyGenLevel(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        cd_etab = request.GET.get('cd_etab', '02063S')
        try:
            body = {
                "size": 0,
                "aggs": {
                    "classes": {
                        "terms": {"field": "Level"},
                        "aggs": {
                            "average_grade": {
                                "avg": {"field": "MoyenneGen_i1"}
                            }
                        }
                    }
                }
            }
            filters = []
            if cd_etab:
                filters.append({"term": {"cd_etab.keyword": cd_etab}})

            if filters:
                body["query"] = {
                    "bool": {
                        "filter": filters
                    }
                }
            else:
                body["query"] = {"match_all": {}}
            response = es_client.search(index="data_middle*", body=body)
            results = response['aggregations']['classes']['buckets']
            table_data = [{"class": result['key'], "average": result['average_grade']['value']} for result in results]
            return JsonResponse(table_data, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
