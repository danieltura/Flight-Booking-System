from django.db import models

# Create your models here.


class Flight(models.Model):
    name = models.CharField(max_length=120)
    departure = models.TextField()
    destination = models.TextField()

    def _str_(self):
        return self.name


class User(models.Model):
    first_name = models.CharField(max_length=120)
    last_name = models.CharField(max_length=120)
    email = models.EmailField()
    password = models.TextField()
    trips = models.BooleanField(default=False)

    def _str_(self):
        return self.title
