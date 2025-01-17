#market/views.py
import json
from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status
from .models import Product, Cart, CartProduct, Order, Service
from .serializers import ProductSerializer, CartSerializer, OrderSerializer, ServiceSerializer, ExampleSerializer
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.db.models import ObjectDoesNotExist

# Home view
def home(request):
    products = Product.objects.all()
    return render(request, 'home.html', {'products': products})

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return {'request': self.request}

class CartViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['post'], url_path='add-product', permission_classes=[IsAuthenticated])
    def add_product(self, request):
        product_id = request.data.get('product_id')
        if not product_id:
            return Response({'error': 'Product ID is required'}, status=400)
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=404)

        cart, created = Cart.objects.get_or_create(user=request.user)
        cart.products.add(product)
        cart.save()

        return Response({'message': 'Product added to cart'}, status=200)

    @action(detail=False, methods=['post'], url_path='add-to-cart')
    def add_to_cart(self, request):
        # Получить данные из запроса
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)

        # Логика добавления товара в корзину (например, добавить в модель Cart)
        # cart = Cart.objects.get(user=request.user)
        if not request.user.is_authenticated:
            return Response({"detail": "Authentication credentials were not provided."}, status=401)

        try:
            cart = Cart.objects.get(user=request.user)
        except Cart.DoesNotExist:
            cart = Cart.objects.create(user=request.user)
        product = Product.objects.get(id=product_id)
        cart.add_product(product, quantity)

        return Response({'status': 'product added to cart'})

# class CartViewSet(viewsets.ViewSet):
#     @action(detail=False, methods=['post'], url_path='add-product', permission_classes=[IsAuthenticated])
#     def add_product(self, request):
#         product_id = request.data.get('product_id')
#         if not product_id:
#             return Response({'error': 'Product ID is required'}, status=400)
#         try:
#             product = Product.objects.get(id=product_id)
#         except Product.DoesNotExist:
#             return Response({'error': 'Product not found'}, status=404)
#
#         cart, created = Cart.objects.get_or_create(user=request.user)
#         cart.products.add(product)
#         cart.save()
#
#         return Response({'message': 'Product added to cart'}, status=200)

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        orders = Order.objects.filter(user=user)
        order_data = [{
            'id': order.id,
            'status': order.status,
            'total_price': order.total_price,
        } for order in orders]
        return Response({
            'username': user.username,
            'email': user.email,
            'orders': order_data
        })

class DataView(APIView):
    def post(self, request, *args, **kwargs):
        # Ваша логика здесь
        return Response({"message": "Данные получены"})


@api_view(['GET', 'POST'])
def register(request):
    if request.method == 'GET':
        return Response({'message': 'Please send a POST request to register.'})

    if request.method == 'POST':
        # Обработка POST-запроса для регистрации пользователя
        username = request.data.get('username')
        password = request.data.get('password')

        if username and password:
            if User.objects.filter(username=username).exists():
                return Response({'error': 'User already exists'}, status=400)
            user = User.objects.create_user(username=username, password=password)
            return Response({'message': 'User created successfully!'}, status=201)

        return Response({'error': 'Invalid data'}, status=400)

# @api_view(['POST'])
# def register(request):
#     username = request.data.get('username')
#     password = request.data.get('password')
#     if username and password:
#         if User.objects.filter(username=username).exists():
#             return Response({'error': 'User already exists'}, status=400)
#         user = User.objects.create_user(username=username, password=password)
#         return Response({'message': 'User created successfully!'}, status=201)
#     return Response({'error': 'Invalid data'}, status=400)

# @api_view(['POST'])
# def register(request):
#     username = request.data.get('username')
#     password = request.data.get('password')
#     if username and password:
#         if User.objects.filter(username=username).exists():
#             return Response({'error': 'User already exists'}, status=400)
#         user = User.objects.create_user(username=username, password=password)
#         return Response({'message': 'User created successfully!'}, status=201)
#     return Response({'error': 'Invalid data'}, status=400)

#декоратор DRF для обработки POST-запроса
def example_view(request):
    # В DRF request.data будет доступен
    if request.method == 'POST':
        # обработка JSON данные
        try:
            data = request.data  # DRF автоматически обрабатывает данные из запроса
        except Exception as e:
            return Response({"error": str(e)}, status=400)

        # Сериализуем данные
        serializer = ExampleSerializer(data=data)
        if serializer.is_valid():
            return Response(serializer.data, status=200)
        else:
            return Response(serializer.errors, status=400)

# Если нужно обработать обычный Django-запрос (не DRF)
@csrf_exempt
def example_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)  # Преобразуем тело запроса в JSON
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

        # Сериализуем данные
        serializer = ExampleSerializer(data=data)
        if serializer.is_valid():
            return JsonResponse(serializer.data, status=200)
        else:
            return JsonResponse(serializer.errors, status=400)