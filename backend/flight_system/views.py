from django.shortcuts import render
from rest_framework import viewsets
from .serializers import FlightSerializer, UserSerializer
from .models import Flight, User

# Create your views here.


class FlightView(viewsets.ModelViewSet):
    serializer_class = FlightSerializer
    queryset = Flight.objects.all()


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
