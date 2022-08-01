from django.contrib import admin
from .models import User, Flight


class FlightsAdmin(admin.ModelAdmin):
    list_display = ('name', 'departure', 'destination')


class UsersAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name',
                    'email', 'password', 'trips')

# Register your models here.


admin.site.register(Flight, FlightsAdmin)
admin.site.register(User, UsersAdmin)
