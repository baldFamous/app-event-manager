from datetime import date
from rest_framework import serializers
from .models import Comment, Event
from django.contrib.auth import get_user_model


User = get_user_model()

class CommentSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=True)
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all(), required=True)

    class Meta:
        model = Comment
        fields = '__all__'
        extra_kwargs = {
            'comment': {'required': True},
            'comment_date': {'read_only': True}
        }

    def create(self, validated_data):
        validated_data['comment_date'] = date.today()
        return Comment.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.comment = validated_data.get('comment', instance.comment)
        instance.save()
        return instance
