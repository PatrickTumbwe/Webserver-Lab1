from django.shortcuts import render
from rest_framework import generics
from .models import TemperatureReading
from .serializer import TemperatureReadingSerializer

class TemperatureReadingList(generics.ListAPIView):
    queryset = TemperatureReading.objects.all()
    serializer_class = TemperatureReadingSerializer

class TemperatureReadingDetail(generics.RetrieveAPIView):
    queryset = TemperatureReading.objects.all()
    serializer_class = TemperatureReadingSerializer
