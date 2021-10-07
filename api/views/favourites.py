from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework import status
from django.contrib.auth.models import User
from api.models.favourites import Favourites
from api.serializers.favourites import AddFavouriteLocationSerializer


class AddFavouriteLocation(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = AddFavouriteLocationSerializer(data=request.data)

        if serializer.is_valid():
            data = request.data
            user = request.user
            
            if self.checkIfAlreadyInFavourite(user, data):
                return Response({"message": "Location is already in favourites"}, status=status.HTTP_201_CREATED)
            
            self.addToFavourites(user, data)
            return Response({"message": "Location added to favourites"}, status=status.HTTP_201_CREATED)
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def addToFavourites(self, user, data):
        if not Favourites.objects.filter(location=data['location'], user=user).exists():
            new_location = Favourites(
                location=data.get('location'),
                user=user
            )
            new_location.save()
    
    def checkIfAlreadyInFavourite(self, user, data):
        check_location = Favourites.objects.filter(location=data['location'], user=user).exists()
        if check_location:
            return True
        return False


