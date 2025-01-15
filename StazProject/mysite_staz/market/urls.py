#market/urls.py
from . import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, CartViewSet, OrderViewSet, ServiceViewSet, register, home, UserProfileView

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'cart', CartViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'services', ServiceViewSet)

urlpatterns = [
    path('', home, name='home'),
    # path('api/data/', views.example_view, name='example_view'),  # Эндпоинт для обработки запросов
    path('api/', include(router.urls)),
    path('api/register/', register, name='register'),
    path('api/profile/', UserProfileView.as_view(), name='user_profile'),
] + router.urls





# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import ProductViewSet, CartViewSet, OrderViewSet, ServiceViewSet, register, home, UserProfileView
# from . import views
#
# router = DefaultRouter()
# router.register(r'products', ProductViewSet)
# router.register(r'cart', CartViewSet)
# router.register(r'orders', OrderViewSet)
# router.register(r'services', ServiceViewSet)
#
# urlpatterns = [
#     # path('', views.home, name='home'),
#     # path('', home, name='home'),
#     path('', home, name='home'),  # Это маршрут для главной страницы
#     path('api/', include(router.urls)),  # Это маршрут для API
#     path('api/register/', register, name='register'),
#     path('api/profile/', UserProfileView.as_view(), name='user_profile'),
#     path('', include(router.urls)),
# ] + router.urls
