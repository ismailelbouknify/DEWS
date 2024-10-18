from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from elasticsearch import Elasticsearch
from django.http import JsonResponse
# from elasticsearch_utils.queries import search_documents

ELASTIC_PASSWORD = "+TQ3lG=S3jAfZb7RE59j"  # Define ELASTIC_PASSWORD before using it
es_client = Elasticsearch( "https://localhost:9200/",  basic_auth=("elastic", ELASTIC_PASSWORD), verify_certs=False,  ssl_show_warn=False )


class AbsenceEtab(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        try:
            body = {
                "size": 0,
                "aggs": {
                    "classes": {
                        "terms": {"field": "cd_etab.keyword"},
                        "aggs": {
                            "authorized_absences": {
                                "sum": {"field": "NbrJourAbsenceAutorise_i1"}
                            },
                            "unauthorized_absences": {
                                "sum": {"field": "NbrJourAbsenceNonAutorise_i1"}
                            }
                        }
                    }
                }
            }
            response = es_client.search(index="data_middle_*", body=body)
            def format_number(value):
                return f'{value / 1000:.1f}K' if value >= 1000 else str(value)
            results = response['aggregations']['classes']['buckets']
            table_data = [
                {
                    "etab": result['key'],
                    "authorized_absences": format_number(result['authorized_absences']['value']),
                    "unauthorized_absences": format_number(result['unauthorized_absences']['value'])
                }
                for result in results
            ]
            return JsonResponse(table_data, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)