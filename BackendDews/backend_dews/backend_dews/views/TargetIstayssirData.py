from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from elasticsearch import Elasticsearch

ELASTIC_PASSWORD = "+TQ3lG=S3jAfZb7RE59j"
es_client = Elasticsearch( "https://localhost:9200/",  basic_auth=("elastic", ELASTIC_PASSWORD), verify_certs=False,  ssl_show_warn=False )


class TargetIstayssirData(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        cd_etab = request.GET.get('cd_etab', None)
        id_annee = request.GET.get('id_annee', None)
        try:
            body = {
                "size": 0,
                "query": {
                    "bool": {
                        "must": [
                            {"terms": {"target_i1": [1, 2]}}
                        ]
                    }
                },
                "aggs": {
                    "istayssir_aggregation": {
                        "terms": {"field": "istayssir_i1"}
                    }
                }
            }

            filters = []
            if cd_etab:
                filters.append({"term": {"cd_etab.keyword": cd_etab}})
            if id_annee:
                filters.append({"term": {"id_annee": id_annee}})

            if filters:
                body["query"]["bool"]["filter"] = filters

            response = es_client.search(index="data_middle_*", body=body)
            results = response['aggregations']['istayssir_aggregation']['buckets']
            table_data = [
                {
                    "istayssir_i1": result['key'],
                    "count": result['doc_count']
                }
                for result in results
            ]
            return JsonResponse(table_data, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
