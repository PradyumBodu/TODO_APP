from rest_framework import serializers
from .models import TODO
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model=TODO
        fields='__all__'
        read_only_fields = ['user']


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email','password']
        extra_kwargs = {
            'password':{'write_only':True}
        }

    def validate_email(self,value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('Email Already Exitss')
        return value
    
    def create(self,validate_data):
        validate_data['password'] = make_password(validate_data['password'])
        return super().create(validate_data)