from django.contrib import admin
from django.urls import path
from django.conf.urls import include, url
from api import views
# from rest_framework.permissions import IsAuthenticated

from rest_framework.urlpatterns import format_suffix_patterns

# Custom authentication
from .customAuth import CustomAuthToken


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path(r'admin/', admin.site.urls),
    # path(r'pizzas/', views.pizza_list),
    path(r'pizzas', views.getAddPizzas),
    path(r'toppings', views.topping_list),
    path(r'pizzas/<int:pk>', views.pizza_detail),
    path(r'toppings/<int:pk>', views.topping_detail),
    url(r'api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^rest-auth/', CustomAuthToken.as_view())
]
