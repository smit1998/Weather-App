from django.urls import path
from api.views.user import UserMyself, UpdateUser
from api.views.userProfile import UserProfile
from api.views.favourites import AddFavouriteLocation, getAllFavourites, RemoveFromFavourite, CheckIfInFavourite
BASE_API_URL = 'api'

urlpatterns = [
    path(f'{BASE_API_URL}/user/', UserProfile.as_view()),
    path(f'{BASE_API_URL}/user/me', UserMyself.as_view()),
    path(f'{BASE_API_URL}/user/update', UpdateUser.as_view()),
    path(f'{BASE_API_URL}/favourites/', AddFavouriteLocation.as_view()),
    path(f'{BASE_API_URL}/favourites/all', getAllFavourites.as_view()),
    path(f'{BASE_API_URL}/favourites/remove', RemoveFromFavourite.as_view()),
    path(f'{BASE_API_URL}/favourites/check', CheckIfInFavourite.as_view()),

]
