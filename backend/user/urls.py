from django.urls import path
from .views import UserCreateView, UserListView, UserDetailView, Organizers, UpdateUsernameView, UpdatePasswordView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='register'),
    path('user/', UserListView.as_view(), name='users'),
    path('user/<int:id>/', UserDetailView.as_view(), name='user'),
    path('user/update/username/', UpdateUsernameView.as_view(), name='update_username'),
    path('user/update/password/', UpdatePasswordView.as_view(), name='update_password'),
    path('user/organizers/', Organizers.as_view(), name='organizers'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]