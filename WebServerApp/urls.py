from django.urls import path
from .views import TemperatureReadingList, TemperatureReadingDetail

urlpatterns = [
    path('temperature/', TemperatureReadingList.as_view(), name='temperature-list'),
    path('temperature/<int:pk>/', TemperatureReadingDetail.as_view(), name='temperature-detail'),
]
