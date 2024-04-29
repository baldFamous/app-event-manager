from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('user.urls')),
    path('events/', include('event.urls')),
    path('reservations/', include('reservation.urls')),
    #path('event/comment/', include('comment.urls')),
    #path('event/valuation/', include('valuation.urls')),
]
