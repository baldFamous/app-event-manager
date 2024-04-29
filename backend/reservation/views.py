from django.http import Http404
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Reservation
from .serializers import ReservationSerializer

class ReservationList(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = ReservationSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        reservations = Reservation.objects.all()
        serializer = ReservationSerializer(reservations, many=True, context={'request': request})
        return Response(serializer.data)

class ReservationDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Reservation.objects.get(pk=pk)
        except Reservation.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        reservation = self.get_object(pk)
        serializer = ReservationSerializer(reservation)
        return Response(serializer.data)

    def put(self, request, pk):
        reservation = self.get_object(pk)
        serializer = ReservationSerializer(reservation, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        reservation = self.get_object(pk)
        reservation.delete()
        return Response({'message': 'Successfully deleted reservation'}, status=status.HTTP_204_NO_CONTENT)
