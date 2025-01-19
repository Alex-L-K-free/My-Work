#backend/books/urls.py
from django.urls import path
from .views import BookListView, CartView
from .views import home  # Импорт представления home

urlpatterns = [
    path('', home, name='home'),  # Главная страница
    path('books/', BookListView.as_view(), name='book-list'),
    path('cart/', CartView.as_view(), name='cart'),
]

