# Generated by Django 5.1 on 2024-09-12 22:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0013_alter_appointments_date_time'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appointments',
            name='date_time',
        ),
        migrations.AddField(
            model_name='appointments',
            name='end_date_time',
            field=models.DateTimeField(default='2024-09-13'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='appointments',
            name='start_date_time',
            field=models.DateTimeField(default='2024-09-13'),
            preserve_default=False,
        ),
    ]
