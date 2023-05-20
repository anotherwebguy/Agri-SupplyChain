from django.urls import path
from . import views
from recommendation_api.views import *

urlpatterns = [
    path('fertilizer/', FertilizerApiEndPoint.as_view(), name='fertilzer'),
    path('crop/', CropApiEndPoint.as_view(), name='crop'),
]