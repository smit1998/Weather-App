from rest_framework import serializers

class AddFavouriteLocationSerializer(serializers.Serializer):
    class Meta:
        feilds = '__all__'
    
    id = serializers.ReadOnlyField()
    location = serializers.CharField(max_length=90, required=True)