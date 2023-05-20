from django.urls import path
from . import views
from prediction_api.views import *

urlpatterns = [
    path('predict/', PredictionApiEndPoint.as_view(), name='predict'),
    path('sixmonths/', WinnersLoosersApiEndPoint.as_view(), name='sixmonths'),
]