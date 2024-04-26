from django.db import models
from event.models import Event
from django.contrib.auth import get_user_model

User = get_user_model()

class Comment(models.Model):

    event = models.ForeignKey(Event, on_delete=models.PROTECT)
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    comment = models.TextField()
    comment_date = models.DateField()

    def __str__(self):
        return f"Comment {self.id}"