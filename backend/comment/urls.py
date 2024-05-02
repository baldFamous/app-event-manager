from django.urls import path
from .views import CommentList, CommentDetail

urlpatterns = [
    path('comment/', CommentList.as_view(), name='comment-list'),
    path('comment/<int:pk>/', CommentDetail.as_view(), name='comment-detail'),
]