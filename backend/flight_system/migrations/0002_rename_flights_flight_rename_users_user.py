# Generated by Django 4.0.6 on 2022-08-01 01:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('flight_system', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Flights',
            new_name='Flight',
        ),
        migrations.RenameModel(
            old_name='Users',
            new_name='User',
        ),
    ]