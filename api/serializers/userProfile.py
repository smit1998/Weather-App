from rest_framework import serializers
from django.contrib.auth.models import User

from api.models.profile import Profile

class ProfileSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150) 
    password = serializers.CharField(max_length=128)
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)
    
    class Meta:
        model = User
        fields =  '__all__'