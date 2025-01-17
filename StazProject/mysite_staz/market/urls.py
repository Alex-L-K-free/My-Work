#market/urls.py
from . import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, CartViewSet, OrderViewSet, ServiceViewSet, register, home, UserProfileView

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'cart', CartViewSet,  basename='cart')
router.register(r'orders', OrderViewSet)
router.register(r'services', ServiceViewSet)

urlpatterns = [
    path('', home, name='home'),
    path('cart/', CartViewSet.as_view({'get': 'retrieve', 'post': 'add_product'})),
    path('api/data/', views.example_view, name='example_view'),  # Эндпоинт для обработки запросов
    path('api/', include(router.urls)),
    path('api/register/', register, name='register'),
    path('api/profile/', UserProfileView.as_view(), name='user_profile'),
    path('api/cart/add/', CartViewSet.as_view({'post': 'add_to_cart'}), name='add_to_cart'),
] + router.urls



