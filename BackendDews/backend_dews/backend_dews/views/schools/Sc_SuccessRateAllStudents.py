from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from elasticsearch import Elasticsearch

ELASTIC_PASSWORD = "+TQ3lG=S3jAfZb7RE59j"
es_client = Elasticsearch( "https://localhost:9200/",  basic_auth=("elastic", ELASTIC_PASSWORD), verify_certs=False,  ssl_show_warn=False )


class Sc_SuccessRateAllStudents(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        cd_etab = request.GET.get('cd_etab', '02063S')
        try:
            body = {
                "size": 0,
                "aggs": {
                    "levels": {
                        "terms": {"field": "target_i1"}
                    }
                }
            }

            if cd_etab:
                body["query"] = {
                    "bool": {
                        "filter": [
                            {"term": {"cd_etab.keyword": cd_etab}}
                        ]
                    }
                }
            else:
                body["query"] = {"match_all": {}}

            response = es_client.search(index="data_middle_*", body=body)
            results = response['aggregations']['levels']['buckets']
            table_data = [{"rate": result['key'], "count": result['doc_count']} for result in results]
            return JsonResponse(table_data, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
