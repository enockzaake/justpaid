# Generated by Django 5.1 on 2024-09-06 16:17

import datetime
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_customuser_auth0_id_alter_appointments_date_time'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='type',
        ),
        migrations.RemoveField(
            model_name='provider',
            name='id',
        ),
        migrations.RemoveField(
            model_name='provider',
            name='owner',
        ),
        migrations.AddField(
            model_name='provider',
            name='customuser_ptr',
            field=models.OneToOneField(auto_created=True, default=0, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='appointments',
            name='client',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='client_appointments', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='appointments',
            name='date_time',
            field=models.DateTimeField(default=datetime.datetime(2024, 9, 6, 19, 17, 22, 12393)),
        ),
        migrations.AlterField(
            model_name='appointments',
            name='provider',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='provider_appointments', to='app.provider'),
        ),
    ]
