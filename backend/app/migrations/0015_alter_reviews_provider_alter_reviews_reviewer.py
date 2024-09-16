# Generated by Django 5.1 on 2024-09-12 23:20

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0014_remove_appointments_date_time_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reviews',
            name='provider',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='provider_reviews', to='app.provider'),
        ),
        migrations.AlterField(
            model_name='reviews',
            name='reviewer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_reviews', to=settings.AUTH_USER_MODEL),
        ),
    ]
