from django.urls import path
from api.views.userProfile import UserProfile
from api.views.favourites import AddFavouriteLocation, getAllFavourites
BASE_API_URL = 'api'

urlpatterns = [
    path(f'{BASE_API_URL}/user/', UserProfile.as_view()),
    path(f'{BASE_API_URL}/favourites/', AddFavouriteLocation.as_view()),
    path(f'{BASE_API_URL}/favourites/all', getAllFavourites.as_view()),
]
