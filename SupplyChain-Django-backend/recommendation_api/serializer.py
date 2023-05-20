from . models import *
from rest_framework import serializers

class FertilizerRecommenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = FertilizerRecommender
        fields = '__all__'

class CropRecommenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = CropRecommender
        fields = '__all__'