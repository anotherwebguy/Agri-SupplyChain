from django.shortcuts import render
import os
import json
import pickle
import numpy as np
from scipy import stats
from . import data
from rest_framework.response import Response
from rest_framework.views import APIView
from . models import *
from . serializer import *


# Loading all Crop Recommendation Models

crop_label_dict = pickle.load(
    open("media/models/label_dictionary.pkl", "rb")
)
crop_knn_pipeline = pickle.load(
    open("media/models/knn_pipeline.pkl", "rb")
)

# Loading all Fertilizer Recommendation Models
fertilizer_xgb_pipeline = pickle.load(
    open("media/models/fertilizer_recommendation/xgb_pipeline.pkl", "rb")
)
fertilizer_rf_pipeline = pickle.load(
    open("media/models/fertilizer_recommendation/rf_pipeline.pkl", "rb")
)
fertilizer_svm_pipeline = pickle.load(
    open("media/models/fertilizer_recommendation/svm_pipeline.pkl", "rb")
)
fertilizer_label_dict = pickle.load(
    open("media/models/fertilizer_recommendation/fertname_dict.pkl", "rb")
)
soiltype_label_dict = pickle.load(
    open("media/models/fertilizer_recommendation/soiltype_dict.pkl", "rb")
)
croptype_label_dict = pickle.load(
    open("media/models/fertilizer_recommendation/croptype_dict.pkl", "rb")
)


crop_label_name_dict = {}
for crop_value in croptype_label_dict:
    print(crop_value)
    crop_label_name_dict[croptype_label_dict[crop_value]] = crop_value

soil_label_dict = {}
for soil_value in soiltype_label_dict:
    print(soil_value)
    soil_label_dict[soiltype_label_dict[soil_value]] = soil_value

print(crop_label_name_dict)
print(soil_label_dict)


def convert(o):
    if isinstance(o, np.generic):
        return o.item()
    raise TypeError


def crop_prediction(input_data):
    prediction_data = []
    prediction_data.append((crop_label_dict[
        crop_knn_pipeline.predict(input_data)[0]
    ], max(crop_knn_pipeline.predict_proba(input_data)[0])
        * 100))
    print(crop_label_dict[
        crop_knn_pipeline.predict(input_data)[0]
    ])
    return prediction_data


def fertilizer_prediction(input_data):
    prediction_data = []
    prediction_data.append((fertilizer_label_dict[
        fertilizer_rf_pipeline.predict(input_data)[0]
    ], max(fertilizer_rf_pipeline.predict_proba(input_data)[0])
        * 100))

    return prediction_data

# ---------------------Fertilzer Recommendation API---------------------


class FertilizerApiEndPoint(APIView):

    serializer_class = FertilizerRecommenderSerializer

    def post(self, request, format=None):
        serializer = FertilizerRecommenderSerializer(data=request.data)
        if serializer.is_valid():
            print(serializer.data)
            form_values = serializer.data
            print(form_values)
            column_names = [
                "temperature",
                "humidity",
                "moisture",
                "nitrogen",
                "potassium",
                "phosphorus",
                "soil_type",
                "crop_type",
            ]
            for key in form_values:
                form_values[key] = form_values[key].strip()

            form_values["soil_type"] = soil_label_dict[form_values["soil_type"]]
            form_values["crop_type"] = crop_label_name_dict[form_values["crop_type"]]
            input_data = np.asarray([float(form_values[i]) for i in column_names]).reshape(
                1, -1
            )
            print(input_data)
            predictiondata = fertilizer_prediction(input_data)
            resultdata = data.fertilizer(predictiondata[0][0])
            print(resultdata)
            return Response(resultdata)

# ---------------------Crop Recommendation API---------------------


class CropApiEndPoint(APIView):

    serializer_class = CropRecommenderSerializer

    def post(self, request, format=None):
        serializer = CropRecommenderSerializer(data=request.data)
        if serializer.is_valid():
            print(serializer.data)
            form_values = serializer.data
            column_names = ["N", "P", "K", "temperature",
                            "humidity", "ph", "rainfall"]
            input_data = np.asarray([float(form_values[i].strip()) for i in column_names]).reshape(
                1, -1
            )
            print(input_data)
            print("hii")
            predictiondata = crop_prediction(input_data)
            resultdata = data.crop(predictiondata[0][0])
            return Response(resultdata)
