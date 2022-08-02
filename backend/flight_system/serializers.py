from rest_framework import serializers
from .models import Flight, User, Airport


class FlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = ('seats', 'booked_seats',
                  'departure', 'destination', 'time')


class AirportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Airport
        fields = ('name', 'code', 'city', 'country')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email',
                  'password', 'trips')
