from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Property, TokenHolding
from .serializers import PropertySerializer, TokenHoldingSerializer

class PropertyListView(APIView):
    def get(self, request):
        props = Property.objects.all()
        serializer = PropertySerializer(props, many=True)
        return Response(serializer.data)

class BuyTokenView(APIView):
    def post(self, request):
        property_id = request.data.get('property_id')
        tokens = int(request.data.get('tokens', 1))
        prop = Property.objects.get(id=property_id)
        holding, created = TokenHolding.objects.get_or_create(
            user=request.user if request.user.is_authenticated else None,
            real_estate=prop,
            defaults={'tokens_owned': 0}
        )
        # demo without auth
        if holding.user is None:
            from django.contrib.auth.models import User
            demo_user, _ = User.objects.get_or_create(username='demo')
            holding.user = demo_user
        holding.tokens_owned += tokens
        holding.save()
        return Response({'message': f'{tokens} tokens purchased'}, status=status.HTTP_200_OK)

class MyHoldingsView(APIView):
    def get(self, request):
        from django.contrib.auth.models import User
        demo_user, _ = User.objects.get_or_create(username='demo')
        holdings = TokenHolding.objects.filter(user=demo_user)
        serializer = TokenHoldingSerializer(holdings, many=True)
        return Response(serializer.data)