# Generated by Django 5.1 on 2024-09-14 09:12

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0015_alter_reviews_provider_alter_reviews_reviewer'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointments',
            name='date',
            field=models.DateField(default='2024-09-14'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='appointments',
            name='time',
            field=models.TimeField(default=datetime.datetime(2024, 9, 14, 9, 12, 59, 669838, tzinfo=datetime.timezone.utc)),
            preserve_default=False,
        ),
    ]
