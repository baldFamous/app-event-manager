from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Event(models.Model):

    event_name = models.CharField(max_length=200)
    organizer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    event_date = models.DateField()
    description = models.TextField()
    location = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.event_name
