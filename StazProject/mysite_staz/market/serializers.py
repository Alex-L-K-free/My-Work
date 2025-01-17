#market/serializers.py
from rest_framework import serializers
from .models import Product, Cart, CartProduct, Order, Service

class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()  # Обработчик для генерации полного URL
    class Meta:
        model = Product
        fields = '__all__'

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None

class CartProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartProduct
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    products = CartProductSerializer(many=True, source='cartproduct_set')

    class Meta:
        model = Cart
        fields = '__all__'




class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

class ExampleSerializer(serializers.Serializer):
    key = serializers.CharField(max_length=100)