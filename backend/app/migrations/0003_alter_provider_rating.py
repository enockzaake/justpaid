# Generated by Django 5.1 on 2024-08-23 17:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_appointments_endorsements_providerportfolio_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='provider',
            name='rating',
            field=models.DecimalField(decimal_places=1, max_digits=3),
        ),
    ]
