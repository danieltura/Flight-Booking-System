from django.shortcuts import render
from rest_framework import viewsets
from .serializers import FlightSerializer, UserSerializer, AirportSerializer
from .models import Airport, Flight, User

# Create your views here.


class FlightView(viewsets.ModelViewSet):
    serializer_class = FlightSerializer
    queryset = Flight.objects.all()


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class AirportView(viewsets.ModelViewSet):
    serializer_class = AirportSerializer
    queryset = Airport.objects.all()
