from rest_framework import serializers
from .models import Event
from django.contrib.auth import get_user_model

User = get_user_model()

class EventSerializer(serializers.ModelSerializer):
    organizer = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Event
        fields = '__all__'
        extra_kwargs = {
            'event_name': {'required': True},
            'event_date': {'required': True},
            'description': {'required': True},
            'location': {'required': True},
            'price': {'required': True, 'min_value': 0.01}
        }

    def create(self, validated_data):
        # Asumimos que 'organizer' ya es una instancia de User porque usamos PrimaryKeyRelatedField
        return Event.objects.create(**validated_data)


    def validate(self, data):
        if data['price'] <= 0:
            raise serializers.ValidationError({"price": "El precio debe ser mayor a cero."})
        return data