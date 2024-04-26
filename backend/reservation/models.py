from django.db import models
from event.models import Event
from django.contrib.auth import get_user_model

User = get_user_model()

class Reservation(models.Model):

    event = models.ForeignKey(Event, on_delete=models.PROTECT)
    assistant = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    reservation_date = models.DateField()
    state = models.CharField(max_length=200) # reserved, confirmed, cancelled

    def __str__(self):
        return f"Reservation {self.id}"