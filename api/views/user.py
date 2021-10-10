from django.db.models import Q
from django.shortcuts import get_list_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from api.serializers.user import UserSerializer


class Users(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

# return the current user's details
class UserMyself(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        return Response({
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'id': user.id,
        })

# update the email of the current user
class UpdateUser(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request):
        serializer = UserUpdateSerializer(data=request.data)

        if serializer.is_valid():
            self.update_details(request.user, request.data)
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update_details(self, user, data):
        modified = False

        if data.get('email'):
            user.email = data.get('email')
            modified = True

        if modified:
            user.save()