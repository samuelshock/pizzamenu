from .models import Pizza, Topping
from rest_framework import serializers

class ToppingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topping
        fields = ('id', 'name')

class PizzaSerializer(serializers.ModelSerializer):

    toppings = ToppingSerializer(many=True, read_only=True)

    class Meta:
        model = Pizza
        fields = ('id', 'name', 'toppings')
