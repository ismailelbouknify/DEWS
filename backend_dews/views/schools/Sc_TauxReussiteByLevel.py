from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from elasticsearch import Elasticsearch

# Elasticsearch configuration
ELASTIC_PASSWORD = "ZkgiSTdIgawzh8--ogdY"
es_client = Elasticsearch("http://localhost:9200", http_auth=("elastic", ELASTIC_PASSWORD))

class Sc_TauxReussiteByLevel(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        try:
            # Specify the school identifier
            cd_etab = request.GET.get('cd_etab', '02063S')

            # Build the Elasticsearch query with a filter for cd_etab
            body = {
                "size": 0,
                "query": {
                    "term": {
                        "cd_etab.keyword": cd_etab
                    }
                },
                "aggs": {
                    "classes": {
                        "terms": {"field": "Level"},
                        "aggs": {
                            "total": {"sum": {"field": "failure_i1"}},
                            "count": {"value_count": {"field": "failure_i1"}}
                        }
                    }
                }
            }
            
            # Execute the search query
            response = es_client.search(index="data_middle_*", body=body)
            buckets = response['aggregations']['classes']['buckets']

            # Process the aggregation results
            class_data = []
            for bucket in buckets:
                Level = bucket['key']
                total_failures = bucket['total']['value']
                total_students = bucket['count']['value']
                success_rate = 1 - (total_failures / total_students) if total_students > 0 else 0
                class_data.append({"Level": Level, "success_rate": success_rate})

            # Return the response as JSON
            return JsonResponse(class_data, safe=False)
        except Exception as e:
            # Handle exceptions and return error response
            return JsonResponse({'error': str(e)}, status=500)
