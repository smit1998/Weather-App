from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework import status
from django.contrib.auth.models import User
from api.models.favourites import Favourites
from api.serializers.favourites import AddFavouriteLocationSerializer
from django.db.models import Q

# Add locations to favourites table
class AddFavouriteLocation(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        # check for the data to be in correct format
        serializer = AddFavouriteLocationSerializer(data=request.data)

        if serializer.is_valid():
            data = request.data
            user = request.user
            # test if the city is favourites list, if so it should not be added
            if checkIfAlreadyInFavourite(user, data):
                return Response({"message": "Location is already in favourites"}, status=status.HTTP_201_CREATED)
            
            self.addToFavourites(user, data)
            return Response({"message": "Location added to favourites"}, status=status.HTTP_201_CREATED)
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def addToFavourites(self, user, data):
        # check and add new city to favourites table
        if not Favourites.objects.filter(location=data['location'], user=user).exists():
            new_location = Favourites(
                location=data.get('location'),
                user=user
            )
            new_location.save()

# remove from the favourites table
class RemoveFromFavourite(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        # check for the data to be in correct format
        serializer = AddFavouriteLocationSerializer(data=request.data)

        if serializer.is_valid():
            data = request.data
            user = request.user
            
            # If the city is not in the table, it is an error and so this is the check for that
            if not checkIfAlreadyInFavourite(user, data):
                return Response({"message": "Location is not in favourites!"}, status=status.HTTP_400_BAD_REQUEST)
            
            self.removeFromFavourites(user, data)
            return Response({"message": "Location removed from favourites"}, status=status.HTTP_201_CREATED)
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def removeFromFavourites(self, user, data):
        # find and remove the city from the favourites table
        Favourites.objects.filter(location=data['location'], user=user).delete()

# get all the favourite locations of the current user
class getAllFavourites(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        try:
            query = Q(user=user)
            allLocations = Favourites.objects.filter(query)
            loc = []

            for i in allLocations:
                loc.append({
                    'locations': i.location
                })
            return Response(loc)
        except: 
            return Response({ "error": "No user with this username exists"}, status=status.HTTP_400_BAD_REQUEST)

# check if a city is in the favourites table or not
class CheckIfInFavourite(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = AddFavouriteLocationSerializer(data=request.data)
        
        if serializer.is_valid():
            data = request.data
            user = request.user
            
            if checkIfAlreadyInFavourite(user, data):
                return Response({"message": "True"}, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def checkIfAlreadyInFavourite(user, data):
        check_location = Favourites.objects.filter(location=data['location'], user=user).exists()
        if check_location:
            return True
        return False