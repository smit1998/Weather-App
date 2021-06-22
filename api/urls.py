from django.urls import path
from api.views.user import Users

BASE_API_URL = 'api'

urlpatterns = [
    path(f'{BASE_API_URL}/user/', Users.as_view()),
]
