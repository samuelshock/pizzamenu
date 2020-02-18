from django.db import models

# Create your models here.
class Topping(models.Model):
    """ Topping class model."""
    name = models.CharField(max_length=45, unique=True)

    def __str__(self):
        return '"{}":"{}"'.format(self.id, self.name)


# Create your models here.
class Pizza(models.Model):
    """ Pizza class model."""
    # Todo: Maybe we need an extra class to modelate the type of pizza

    name = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    toppings = models.ManyToManyField(Topping, blank=True)
    pizza_size = models.CharField(
        max_length=2,
        choices=(
            ("sm", "small"),
            ("md", "medium"),
            ("lg", "large")
        ),
    )

    def __str__(self):
        return self.name
