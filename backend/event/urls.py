from django.urls import path
from .views import EventList, EventDetail, EventsOrdering

urlpatterns = [
    path('event/', EventList.as_view(), name='event-list'),
    path('event/<int:pk>/', EventDetail.as_view(), name='event-detail'),
    path('event/recent/', EventsOrdering.as_view(), name='event-recent'),
]
