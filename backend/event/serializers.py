from rest_framework import serializers
from .models import Event
from django.contrib.auth import get_user_model

User = get_user_model()

class EventSerializer(serializers.ModelSerializer):
    """
    This is a serializer for the Event model.

    It inherits from the ModelSerializer class provided by Django Rest Framework.
    It includes all fields of the Event model, and an additional field 'organizer' which is a foreign key to the User model.

    The serializer also includes a custom create method, which is used to create a new event instance.
    And a custom validate method, which checks if the price is greater than zero.
    """

    # The organizer field is a foreign key to the User model
    organizer = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        """
        Meta class for the EventSerializer.

        Specifies the model to be serialized and the fields to be included in the serialized representation.
        Also specifies extra settings for the fields, in this case making certain fields required and setting a minimum value for the price.
        """

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
        """
        Creates a new event instance.

        Args:
            validated_data (dict): The validated data to create the event with.

        Returns:
            Event: The created event instance.
        """

        return Event.objects.create(**validated_data)

    def validate(self, data):
        """
        Validates the price field.

        Checks if the price is greater than zero.
        If not, raises a ValidationError.

        Args:
            data (dict): The data to validate.

        Returns:
            dict: The validated data.

        Raises:
            ValidationError: If the price is not greater than zero.
        """

        if data['price'] <= 0:
            raise serializers.ValidationError({"price": "The price must be greater than zero."})
        return data