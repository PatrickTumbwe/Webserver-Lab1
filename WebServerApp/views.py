from django.shortcuts import render
from rest_framework import generics
from .models import TemperatureReading
from .serializer import TemperatureReadingSerializer
from rest_framework.response import Response
from rest_framework.views import APIView

class TemperatureReadingList(generics.ListAPIView):
    queryset = TemperatureReading.objects.all()
    serializer_class = TemperatureReadingSerializer

class TemperatureReadingDetail(generics.RetrieveAPIView):
    queryset = TemperatureReading.objects.all()
    serializer_class = TemperatureReadingSerializer

class LatestTemperatureAPIView(APIView):
    def get(self, request):
        latest_temperature = Temperature.objects.latest('id')
        return Response({"temperature": latest_temperature.data})
    def temperature_monitor(request):
        return render(request, 'home.html')