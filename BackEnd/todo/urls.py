from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import Todoviewset,RegisterView

router = DefaultRouter()
router.register(r'todos', Todoviewset, basename='todo')
router.register(r'register', RegisterView, basename='register')  

urlpatterns = [
    path('',include(router.urls)),
]
