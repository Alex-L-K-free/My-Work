#market/views.py
from django.shortcuts import render
from rest_framework import viewsets
from .models import Product, Cart, Order, Service
from .serializers import ProductSerializer, CartSerializer, OrderSerializer, ServiceSerializer
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Home view
def home(request):
    products = Product.objects.all()
    return render(request, 'home.html', {'products': products})
    # return render(request, 'home.html')

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if username and password:
        user = User.objects.create_user(username=username, password=password)
        return Response({'message': 'User created successfully!'}, status=201)
    return Response({'error': 'Invalid data'}, status=400)
