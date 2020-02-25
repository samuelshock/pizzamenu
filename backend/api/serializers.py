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

    # def update(self, data):
    #     print("entro update serializer!!!")
    #     toppings_data = data['toppings']
    #     pizza = Pizza.objects.
    #     del data['toppings']
        
    #     for toping in toppings_data:
    #         Topping.objects.create(pizza=, **toping)

class PizzaSerializerNotRel(serializers.ModelSerializer):

    class Meta:
        model = Pizza
        fields = ('id', 'name', 'toppings')
