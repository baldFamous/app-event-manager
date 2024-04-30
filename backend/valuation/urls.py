from django.urls import path
from .views import ValuationList, ValuationDetail

urlpatterns = [
    path('valuation/', ValuationList.as_view(), name='valuation-list'),
    path('valuation/<int:pk>/', ValuationDetail.as_view(), name='valuation-detail'),
]