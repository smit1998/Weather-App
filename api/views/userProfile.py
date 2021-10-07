from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth.models import User

from api.serializers.userProfile import ProfileSerializer


class UserProfile(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        users = User.objects.all()
        serializer = ProfileSerializer(users, many=True)
        return Response(serializer.data)