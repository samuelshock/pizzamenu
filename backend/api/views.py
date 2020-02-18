from .models import Pizza, Topping
from rest_framework import viewsets
from api.serializers import PizzaSerializer, ToppingSerializer


class PizzaViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Pizza.objects.all().order_by('name')
    serializer_class = PizzaSerializer

class ToppingViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Topping.objects.all().order_by('name')
    serializer_class = ToppingSerializer
