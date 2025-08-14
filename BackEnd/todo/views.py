from django.shortcuts import render
from .models import TODO
from rest_framework import viewsets,permissions
from .serializer import TodoSerializer,RegisterSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User

# Create your views here.
class Todoviewset(viewsets.ModelViewSet):
    serializer_class=TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return TODO.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RegisterView(viewsets.ModelViewSet):
    queryset=User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self,request,*args,**kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'message':'"User registered successfully"'},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)