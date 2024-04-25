from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    #username
    #email
    #password
    role = models.CharField(max_length=200) # admin, assistant, organizer

    def __str__(self):
        return self.username + ' ' + self.role


