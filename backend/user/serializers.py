from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    """
    This is a serializer for the User model.

    It inherits from the ModelSerializer class provided by Django Rest Framework.
    It includes four fields: username, password, email, and role. All of these fields are required.

    The password field is write-only, meaning it can be used for user input, but won't be included in serialized representations.

    The serializer also includes a custom create method, which is used to create a new user instance.
    And a custom validate method, which checks if the role is one of the allowed roles ('admin', 'assistant', 'organizer').
    """

    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    role = serializers.CharField(required=True)

    class Meta:
        """
        Meta class for the UserSerializer.

        Specifies the model to be serialized and the fields to be included in the serialized representation.
        Also specifies extra settings for the fields, in this case making the password field write-only.
        """

        model = User
        fields = ('id', 'username', 'password', 'email', 'role')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        """
        Creates a new user instance.

        Args:
            validated_data (dict): The validated data to create the user with.

        Returns:
            User: The created user instance.
        """

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data['role']
        )
        return user

    def validate(self, data):
        """
        Validates the role field.

        Checks if the role is one of the allowed roles ('admin', 'assistant', 'organizer', 'user').
        If not, raises a ValidationError.

        Args:
            data (dict): The data to validate.

        Returns:
            dict: The validated data.

        Raises:
            ValidationError: If the role is not one of the allowed roles.
        """

        if data['role'] not in ['Administrador', 'Asistente', 'Organizador', 'Usuario']:
            raise serializers.ValidationError("The role must be ""Administrador"", ""Asistente"", ""Organizador"" or ""Usuario"".")
        return data
