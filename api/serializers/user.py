from rest_framework import serializers


class UserSerializer(serializers.Serializer):
   username = serializers.CharField(max_length=150) 
   password = serializers.CharField(max_length=128)
   email = serializers.EmailField()
   first_name = serializers.CharField(max_length=150)
   last_name = serializers.CharField(max_length=150)
