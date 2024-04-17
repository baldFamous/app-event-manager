from django.db import models
from event.models import Event
from user.models import User

# Create your models here.
class Valuation(models.Model):

    event = models.ForeignKey(Event, on_delete=models.PROTECT)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    valuation = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Valuation {self.id}"