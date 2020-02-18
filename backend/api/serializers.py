from .models import Pizza, Topping
from rest_framework import serializers


class PizzaSerializer(serializers.ModelSerializer):

    #toppings = serializers.StringRelatedField(many=True)

    class Meta:
        model = Pizza
        fields = ('id', 'name', 'description', 'toppings', 'pizza_size')


class ToppingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topping
        fields = ('id', 'name')
