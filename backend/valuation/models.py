from django.db import models
from event.models import Event
from django.contrib.auth import get_user_model

User = get_user_model()

class Valuation(models.Model):

    event = models.ForeignKey(Event, on_delete=models.PROTECT)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    valuation = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Valuation {self.id}"