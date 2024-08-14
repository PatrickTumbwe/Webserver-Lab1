from django.urls import path
from .views import TemperatureReadingList, TemperatureReadingDetail, LatestTemperatureAPIView, temperature_monitor

urlpatterns = [
    path('temperature/', TemperatureReadingList.as_view(), name='temperature-list'),
    path('temperature/<int:pk>/', TemperatureReadingDetail.as_view(), name='temperature-detail'),
    path('api/latest-temperature/', LatestTemperatureAPIView.as_view(), name='latest-temperature'),
    path('temperature-monitor/', temperature_monitor, name='temperature-monitor'),

]
