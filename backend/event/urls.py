from django.urls import path
from .views import EventList, EventDetail

urlpatterns = [
    path('event/', EventList.as_view(), name='event-list'),
    path('event/<int:pk>/', EventDetail.as_view(), name='event-detail'),
]