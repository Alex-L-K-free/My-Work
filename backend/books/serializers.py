#backend/books/serializers.py
from rest_framework import serializers
from .models import Book, Cart

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    books = BookSerializer(many=True)

    class Meta:
        model = Cart
        fields = '__all__'
