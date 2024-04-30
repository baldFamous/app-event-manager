from rest_framework import serializers
from .models import Valuation
from django.contrib.auth import get_user_model

User = get_user_model()


class ValuationSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Valuation
        fields = '__all__'
        extra_kwargs = {
            'event': {'required': True},
            'user': {'required': True},
            'valuation': {'required': True, 'min_value': 0.01}
        }

    def validate(self, data):
        """
        Validates the user field to ensure the user has the 'user' role.

        Args:
            data (dict): The incoming data to validate.

        Returns:
            dict: The validated data if all checks pass.

        Raises:
            ValidationError: If the user does not have the 'user' role.
        """
        user = data.get('user')

        # Verifying the user's role is specifically 'user'
        if user.role != 'user':
            raise serializers.ValidationError(
                {"user": "Only users with the 'user' role are permitted to create valuations."})

        return data
