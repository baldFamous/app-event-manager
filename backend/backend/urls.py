from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('user.urls')),
    path('events/', include('event.urls')),
    path('reservations/', include('reservation.urls')),
    #path('comments/', include('comment.urls')),
    path('valuations/', include('valuation.urls')),
]
