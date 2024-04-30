from django.http import Http404
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Valuation
from .serializers import ValuationSerializer

class ValuationList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        valuations = Valuation.objects.all()
        serializer = ValuationSerializer(valuations, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ValuationSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ValuationDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Valuation.objects.get(pk=pk)
        except Valuation.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        valuation = self.get_object(pk)
        serializer = ValuationSerializer(valuation)
        return Response(serializer.data)

    def put(self, request, pk):
        valuation = self.get_object(pk)
        serializer = ValuationSerializer(valuation, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        valuation = self.get_object(pk)
        valuation.delete()
        return Response({'message': 'Successfully deleted Valuation'}, status=status.HTTP_204_NO_CONTENT)
