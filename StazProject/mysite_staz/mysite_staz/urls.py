#mysite_staz/urls.py
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from market import views
# from .views import ProductViewSet
# from market.views import home  # Подключаем домашнюю страницу

router = DefaultRouter()
# router.register('products', ProductViewSet, basename='products')


urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', home, name='home'),  # Главная страница
    path('', include('market.urls')),  # Главная страница определяется в market.urls
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', views.register, name='register'),
    path('api/', include('market.urls')), # Все API-эндпоинты
    # path('api/', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



