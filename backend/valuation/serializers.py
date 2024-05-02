from rest_framework import serializers
from .models import Valuation
from django.contrib.auth import get_user_model

User = get_user_model()


class ValuationSerializer(serializers.ModelSerializer):
    """
    This is a serializer for the Valuation model.

    It inherits from the ModelSerializer class provided by Django Rest Framework.
    It includes all fields of the Valuation model, and an additional field 'user' which is a foreign key to the User model.

    The serializer also includes a custom validate method, which checks if the user is present and has the correct role.
    """

    # The user field is a foreign key to the User model
    # We use PrimaryKeyRelatedField to ensure that the input is an existing user ID
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        """
        Meta class for the ValuationSerializer.

        Specifies the model to be serialized and the fields to be included in the serialized representation.
        Also specifies extra settings for the fields, in this case making certain fields required and setting a minimum value for the valuation field.
        """

        model = Valuation
        fields = '__all__'
        extra_kwargs = {
            'event': {'required': True},
            'user': {'required': True},
            'valuation': {'required': True, 'min_value': 0.01}
        }

    def validate(self, data):
        """
        Validates the user field.

        Checks if the user is present and has the correct role.
        If not, raises a ValidationError.

        Args:
            data (dict): The data to validate.

        Returns:
            dict: The validated data.

        Raises:
            ValidationError: If the user is not present or does not have the correct role.
        """

        user = data.get('user')

        # Verifying the user's role is specifically 'user'
        if user.role != 'user':
            raise serializers.ValidationError(
                {"user": "Only users with the 'user' role are permitted to create valuations."})

        return data