from django.db import models

# Create your models here.
class FertilizerRecommender(models.Model):
    temperature = models.CharField(max_length=100)
    humidity = models.CharField(max_length=100)
    moisture = models.CharField(max_length=100)
    nitrogen = models.CharField(max_length=100)
    potassium = models.CharField(max_length=100)
    phosphorus = models.CharField(max_length=100)
    soil_type = models.CharField(max_length=100)
    crop_type = models.CharField(max_length=100)


class CropRecommender(models.Model):
    N = models.CharField(max_length=100)
    P = models.CharField(max_length=100)
    K = models.CharField(max_length=100)
    temperature = models.CharField(max_length=100)
    humidity = models.CharField(max_length=100)
    ph = models.CharField(max_length=100)
    rainfall = models.CharField(max_length=100)