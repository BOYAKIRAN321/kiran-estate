from rest_framework import serializers
from .models import Property, TokenHolding

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'

class TokenHoldingSerializer(serializers.ModelSerializer):
    real_estate = PropertySerializer(read_only=True)
    current_value = serializers.ReadOnlyField()
    class Meta:
        model = TokenHolding
        fields = ['id', 'real_estate', 'tokens_owned', 'current_value', 'purchased_at']