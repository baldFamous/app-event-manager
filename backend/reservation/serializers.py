from rest_framework import serializers
from .models import Reservation
from django.contrib.auth import get_user_model

User = get_user_model()

class ReservationSerializer(serializers.ModelSerializer):
    """
    This is a serializer for the Reservation model.

    It inherits from the ModelSerializer class provided by Django Rest Framework.
    It includes all fields of the Reservation model, and an additional field 'assistant' which is a foreign key to the User model.

    The serializer also includes a custom validate method, which checks if the assistant is present and has the correct role.
    And a custom create method, which is used to create a new reservation instance.
    """

    # The assistant field is a foreign key to the User model
    # We use PrimaryKeyRelatedField to ensure that the input is an existing user ID
    assistant = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)

    class Meta:
        """
        Meta class for the ReservationSerializer.

        Specifies the model to be serialized and the fields to be included in the serialized representation.
        Also specifies extra settings for the fields, in this case making certain fields required and not allowing null for the assistant field.
        """

        model = Reservation
        fields = '__all__'
        extra_kwargs = {
            'event': {'required': True},
            'reservation_date': {'required': True},
            'state': {'required': True},
            'assistant': {'required': True, 'allow_null': False},
        }

    def validate(self, data):
        """
        Validates the assistant field.

        Checks if the assistant is present and has the correct role.
        If not, raises a ValidationError.

        Args:
            data (dict): The data to validate.

        Returns:
            dict: The validated data.

        Raises:
            ValidationError: If the assistant is not present or does not have the correct role.
        """

        assistant = data.get('assistant')

        if not assistant:
            raise serializers.ValidationError({"assistant": "An assistant is required."})

        # We ensure that the 'assistant' has the correct role
        if assistant.role != 'assistant':
            raise serializers.ValidationError({"assistant": "The specified user is not an assistant."})

        return data

    def create(self, validated_data):
        """
        Creates a new reservation instance.

        Args:
            validated_data (dict): The validated data to create the reservation with.

        Returns:
            Reservation: The created reservation instance.
        """

        # The assistant instance is already correctly assigned thanks to PrimaryKeyRelatedField
        return Reservation.objects.create(**validated_data)