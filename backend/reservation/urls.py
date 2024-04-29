from django.urls import path
from .views import ReservationList, ReservationDetail

urlpatterns = [
    path('reservation/', ReservationList.as_view(), name='reservation-list'),
    path('reservation/<int:pk>/', ReservationDetail.as_view(), name='reservation-detail'),
]