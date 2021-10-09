from rest_framework import serializers

from api.models.profile import Profile

class ProfileSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150) 
    password = serializers.CharField(max_length=128)
    email = serializers.EmailField()
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)
    
    class Meta:
        model = Profile
        fields =  '__all__'