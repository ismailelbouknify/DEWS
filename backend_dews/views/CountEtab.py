from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from elasticsearch import Elasticsearch

ELASTIC_PASSWORD = "ZkgiSTdIgawzh8--ogdY"
es_client = Elasticsearch("http://localhost:9200", http_auth=("elastic", ELASTIC_PASSWORD))

class CountAllStudents(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        try:
            # Get the cd_etab parameter from the request
            cd_etab = request.GET.get('cd_etab')

            # Construct the body with a filter if cd_etab is provided
            body = {
                "size": 0,
                "query": {
                    "bool": {
                        "filter": [
                            {"term": {"cd_etab.keyword": cd_etab}} if cd_etab else {}
                        ]
                    }
                },
                "aggs": {
                    "total_students": {
                        "value_count": {"field": "id_eleve"}
                    },
                    "unique_classes": {
                        "cardinality": {"field": "id_classe.keyword"}
                    }
                }
            }
            
            # Remove empty filter if cd_etab is not provided
            if not cd_etab:
                body["query"] = {"match_all": {}}
            
            response = es_client.search(index="data_middle*", body=body)
            
            def format_number(value):
                return f'{value / 1000:.1f}K' if value >= 1000 else str(value)
            
            results = {
                "total_students": format_number(response['aggregations']['total_students']['value']),
                "number_of_unique_establishments": format_number(response['aggregations']['unique_establishments']['value']),
                "number_of_unique_classes": format_number(response['aggregations']['unique_classes']['value'])
            }
            return JsonResponse(results, safe=False)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
