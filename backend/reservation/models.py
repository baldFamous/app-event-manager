from django.db import models
from event.models import Event
from user.models import User

# Create your models here.
class Reservation(models.Model):

    event = models.ForeignKey(Event, on_delete=models.PROTECT)
    assistant = models.ForeignKey(User, on_delete=models.PROTECT)
    reservation_date = models.DateField()
    state = models.CharField(max_length=200) # reserved, confirmed, cancelled

    def __str__(self):
        return f"Reservation {self.id}"