from rest_framework import serializers
from .models import Valuation, Event, User

class ValuationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Valuation
        fields = '__all__'
        extra_kwargs = {
            'event': {'required': True},
            'user': {'required': True},
            'valuation': {'required': True, 'min_value': 0.01}
        }
