#backend/books/views.py
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from .models import Book, Cart
from .serializers import BookSerializer, CartSerializer
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the homepage!")

# Список книг
class BookListView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

# Работа с корзиной
class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def post(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        book_id = request.data.get('book_id')
        if book_id:
            book = Book.objects.get(id=book_id)
            cart.books.add(book)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def delete(self, request):
        cart = Cart.objects.get(user=request.user)
        book_id = request.data.get('book_id')
        if book_id:
            book = Book.objects.get(id=book_id)
            cart.books.remove(book)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

