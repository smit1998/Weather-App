from django.db import models
from django.conf import settings
from api.models.userProfile import UserProfile

class Favourites(models.Model):
    class Meta:
        db_table = "favourites"
    
    id = models.AutoField(primary_key=True)
    location = models.CharField(max_length=90)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='User_id', on_delete=models.CASCADE)