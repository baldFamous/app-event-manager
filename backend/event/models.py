from django.db import models
from user.models import User

# Create your models here.
class Event(models.Model):

    event_name = models.CharField(max_length=200)
    organizer = models.ForeignKey(User, on_delete=models.PROTECT)
    event_date = models.DateField()
    description = models.TextField()
    location = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.event_name