from rest_framework import serializers
from .models import Reservation
from django.contrib.auth import get_user_model

User = get_user_model()

class ReservationSerializer(serializers.ModelSerializer):
    # Usamos PrimaryKeyRelatedField para asegurar que el input sea un ID de usuario existente
    assistant = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)

    class Meta:
        model = Reservation
        fields = '__all__'
        extra_kwargs = {
            'event': {'required': True},
            'reservation_date': {'required': True},
            'state': {'required': True},
            'assistant': {'required': True, 'allow_null': False},
        }

    def validate(self, data):
        assistant = data.get('assistant')

        if not assistant:
            raise serializers.ValidationError({"assistant": "An assistant is required."})

        # Aseguramos que el 'assistant' tenga el rol adecuado
        if assistant.role != 'assistant':
            raise serializers.ValidationError({"assistant": "The specified user is not an assistant."})

        return data

    def create(self, validated_data):
        # La instancia de assistant ya está correctamente asignada gracias a PrimaryKeyRelatedField
        return Reservation.objects.create(**validated_data)
