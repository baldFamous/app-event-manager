from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('event/user/', include('user.urls')),
    #path('event/event/', include('event.urls')),
    #path('event/reservation/', include('reservation.urls')),
    #path('event/comment/', include('comment.urls')),
    #path('event/valuation/', include('valuation.urls')),
]
