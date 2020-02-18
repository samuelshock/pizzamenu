# Generated by Django 2.2.10 on 2020-02-18 00:55

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Topping',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=45, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Pizza',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=200)),
                ('pizza_size', models.CharField(choices=[('sm', 'small'), ('md', 'medium'), ('lg', 'large')], max_length=2)),
                ('toppings', models.ManyToManyField(blank=True, to='api.Topping')),
            ],
        ),
    ]
