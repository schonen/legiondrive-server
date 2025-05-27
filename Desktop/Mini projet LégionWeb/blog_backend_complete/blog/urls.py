from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, RegisterView

router = DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', RegisterView.as_view(), name='register'),
]
