# Generated by Django 5.1.4 on 2025-01-13 08:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='name_ru',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
