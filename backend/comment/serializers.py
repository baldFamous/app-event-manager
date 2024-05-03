from datetime import date
from rest_framework import serializers
from .models import Comment, Event
from django.contrib.auth import get_user_model

# Import the user model from Django's authentication system
User = get_user_model()

class CommentSerializer(serializers.ModelSerializer):
    """
    A serializer for the Comment model.

    Attributes:
        author: A foreign key to the User model.
        event: A foreign key to the Event model.
    """

    author = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=True)
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all(), required=True)

    class Meta:
        """
        Meta class for additional serializer configuration.

        Attributes:
            model: The model to be serialized.
            fields: The fields to be included in the serialized representation.
            extra_kwargs: Additional field options.
        """

        model = Comment
        fields = '__all__'
        extra_kwargs = {
            'comment': {'required': True},
            'comment_date': {'read_only': True}
        }

    def create(self, validated_data):
        """
        Define the behavior for creating a new Comment instance.

        Args:
            validated_data: The validated data to be used to create the Comment instance.

        Returns:
            The created Comment instance.
        """

        validated_data['comment_date'] = date.today()
        return Comment.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Define the behavior for updating an existing Comment instance.

        Args:
            instance: The Comment instance to be updated.
            validated_data: The validated data to be used to update the Comment instance.

        Returns:
            The updated Comment instance.
        """

        instance.comment = validated_data.get('comment', instance.comment)
        instance.save()
        return instance