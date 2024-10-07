from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from elasticsearch import Elasticsearch

ELASTIC_PASSWORD = "ZkgiSTdIgawzh8--ogdY"
es_client = Elasticsearch("http://localhost:9200", http_auth=("elastic", ELASTIC_PASSWORD))

class SchoolData(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        try:
            body = {
                "size": 0,
                "aggs": {
                    "schools": {
                        "terms": {
                            "field": "cd_etab.keyword",
                            "size": 10000  # Adjust this size according to your needs
                        },
                        "aggs": {
                            "address": {
                                "terms": {
                                    "field": "Adress.keyword",
                                    "size": 1
                                }
                            }
                        }
                    }
                }
            }

            response = es_client.search(index="data_middle_*", body=body)
            results = [
                {
                    "school_name": bucket['key'],
                    "students_count": bucket['doc_count'],
                    "address": bucket['address']['buckets'][0]['key'] if bucket['address']['buckets'] else None
                }
                for bucket in response['aggregations']['schools']['buckets']
            ]
            
            return JsonResponse(results, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
