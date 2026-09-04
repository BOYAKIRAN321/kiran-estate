from django.urls import path
from .views import PropertyListView, BuyTokenView, MyHoldingsView

urlpatterns = [
    path('properties/', PropertyListView.as_view(), name='property-list'),
    path('buy/', BuyTokenView.as_view(), name='buy-token'),
    path('my-holdings/', MyHoldingsView.as_view(), name='my-holdings'),
]