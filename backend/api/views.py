from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Pizza, Topping
from api.serializers import PizzaSerializer, ToppingSerializer, PizzaSerializerNotRel
from rest_framework.decorators import authentication_classes, permission_classes

# The BE should be able to do the following:
# getPizzas.
# getpizza.
# GetToppings.
# AddTopping.
# DeleteTopping.
# DeletePizza.
# addPizza.
# addToppingToPizza.
# getToppingsForPizza.

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getPizzas(request):
    """
    Get Menu
    """
    print('get pizzas!')
    pizzas = Pizza.objects.all()
    serializer = PizzaSerializer(pizzas, many=True)
    print(serializer.data)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
def getAddPizzas(request):
    """
    Get and Add Pizzas
    """
    if request.method == 'GET':
        print('get pizzas!')
        pizzas = Pizza.objects.all()
        serializer = PizzaSerializerNotRel(pizzas, many=True)
        print(serializer.data)
        return Response(serializer.data)

    elif request.method == 'POST':
        print('add pizzas!')
        serializer = PizzaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def pizza_detail(request, pk):
    """
    Retrieve, update or delete a pizza.
    """
    try:
        pizza = Pizza.objects.get(pk=pk)
    except Pizza.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PizzaSerializer(pizza)
        return Response(serializer.data)

    elif request.method == 'PUT':
        print('update')
        serializer = PizzaSerializer(pizza, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        pizza.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def topping_list(request):
    """
    List all code topping, or create a new topping.
    """
    if request.method == 'GET':
        toppings = Topping.objects.all()
        serializer = ToppingSerializer(toppings, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ToppingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def topping_detail(request, pk):
    """
    Retrieve, update or delete a topping.
    """
    try:
        topping = Topping.objects.get(pk=pk)
    except Topping.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ToppingSerializer(topping)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ToppingSerializer(topping, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        topping.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
