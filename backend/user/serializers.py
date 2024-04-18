from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):

    name = serializers.CharField(required=True)
    email = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    role = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = '__all__'


    def create(self, validated_data):
        pass

    def validate(self, data):
        pass