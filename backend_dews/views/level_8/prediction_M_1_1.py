# backend_dews/views.py

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import mlflow.sklearn
import pandas as pd
from elasticsearch_utils.utils import get_es_client
from Feature_engineering import Feature_engineering

@csrf_exempt
def make_predictions(request, model_path, index_name):
    # Load the ML model
    loaded_model = mlflow.sklearn.load_model(model_path)

    # Retrieve data from Elasticsearch index
    es_client = get_es_client()
    es_query = {"query": {"match_all": {}}}
    es_response = es_client.search(index=index_name, body=es_query)

    # Process Elasticsearch data
    es_data = es_response['hits']['hits']
    df = pd.DataFrame([hit['_source'] for hit in es_data])

    # Apply feature engineering
    df = Feature_engineering(df)

    # Make predictions
    predictions = loaded_model.predict(df)
    probabilities = loaded_model.predict_proba(df)
    predicted_probabilities = probabilities[:, 1]

    # Convert predictions to response format
    response_data = [{'student_id': hit['_source']['id_eleve'],
                      'prediction': "Success" if prediction == 1 else "Not Success",
                      'probability': round(probability, 2)} 
                     for prediction, probability, hit in zip(predictions, predicted_probabilities, es_data)]



    # Return HTML response
    return HttpResponse(response_data)

@csrf_exempt
def single_student_prediction(request, model_path, index_name, student_id):
    # Load the ML model
    loaded_model = mlflow.sklearn.load_model(model_path)

    # Retrieve data from Elasticsearch index for the specified student
    es_client = get_es_client()
    es_query = {"query": {"match": {"id_eleve": student_id}}}
    es_response = es_client.search(index=index_name, body=es_query)

    # Process Elasticsearch data
    es_data = es_response['hits']['hits']
    df = pd.DataFrame([hit['_source'] for hit in es_data])

    # Apply feature engineering
    df = Feature_engineering(df)

    # Make prediction
    prediction = loaded_model.predict(df)

    # Convert prediction to response format
    prediction_result = "Success" if prediction[0] == 0 else "Not Success"

  

    # Return HTML response
    return HttpResponse(prediction_result)

# Define views for different models and endpoints
predictions_M_1_1Baseline2 = lambda request: make_predictions(request, "./Models/level_8/M_1_1/Baseline", "data_middle_2")
single_student_prediction_M_1_1Baseline2 = lambda request, student_id: single_student_prediction(request, "./Models/level_8/M_1_2/Baseline", "data_middle_2", student_id)
predictions_M_1_1Undrsampling2 = lambda request: make_predictions(request, "./Models/level_8/M_1_1/Undersampling", "data_middle_2")
single_student_prediction_M_1_1Undrsampling2 = lambda request, student_id: single_student_prediction(request, "./Models/level_8/M_1_1/Undersampling", "data_middle_2", student_id)
