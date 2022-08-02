from django.db import models


class Flight(models.Model):
    seats = models.IntegerField()
    booked_seats = models.IntegerField()
    departure = models.TextField()
    destination = models.TextField()
    time = models.DateTimeField()

    def _str_(self):
        return self.name


class Airport(models.Model):
    name = models.CharField(max_length=120)
    code = models.CharField(max_length=120)
    city = models.CharField(max_length=120)
    country = models.CharField(max_length=120)

    def _str_(self):
        return self.name


class User(models.Model):
    first_name = models.CharField(max_length=120)
    last_name = models.CharField(max_length=120)
    email = models.EmailField()
    password = models.TextField()
    trips = models.TextField()

    def _str_(self):
        return self.first_name
