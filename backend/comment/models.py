from django.db import models
from event.models import Event
from user.models import User

# Create your models here.
class Comment(models.Model):

    event = models.ForeignKey(Event, on_delete=models.PROTECT)
    author = models.ForeignKey(User, on_delete=models.PROTECT)
    comment = models.TextField()
    comment_date = models.DateField()

    def __str__(self):
        return f"Comment {self.id}"