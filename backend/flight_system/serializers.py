from rest_framework import serializers
from .models import Flight, User


class FlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = ('name', 'destination', 'departure')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email',
                  'password', 'trips')
