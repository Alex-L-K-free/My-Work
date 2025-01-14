#market/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, CartViewSet, OrderViewSet, ServiceViewSet, register, home, UserProfileView
from . import views

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'cart', CartViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'services', ServiceViewSet)

urlpatterns = [
    # path('', views.home, name='home'),
    # path('', home, name='home'),
    path('', home, name='home'),  # Это маршрут для главной страницы
    path('api/', include(router.urls)),  # Это маршрут для API
    path('api/register/', register, name='register'),
    path('api/profile/', UserProfileView.as_view(), name='user_profile'),
    path('', include(router.urls)),
]
