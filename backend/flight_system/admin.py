from django.contrib import admin
from .models import User, Flight, Airport


class FlightsAdmin(admin.ModelAdmin):
    list_display = ('seats', 'booked_seats',
                    'departure', 'destination', 'time', 'cost')


class UsersAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name',
                    'email', 'password', 'trips')


class AirportAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'city', 'country')

# Register your models here.


admin.site.register(Flight, FlightsAdmin)
admin.site.register(User, UsersAdmin)
admin.site.register(Airport, AirportAdmin)
