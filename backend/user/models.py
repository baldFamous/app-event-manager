from django.db import models

# Create your models here.
class User(models.Model):

    name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    role = models.CharField(max_length=200) # admin, assistant, organizer

    def __str__(self):
        return self.name + ' ' + self.role