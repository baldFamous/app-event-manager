from django.http import Http404
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Reservation
from .serializers import ReservationSerializer

class ReservationList(APIView):
    """
    This view handles the retrieval and creation of reservations.

    It inherits from the APIView class provided by Django Rest Framework.
    It requires the user to be authenticated to access, hence the IsAuthenticated permission class.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        Handles the POST request to create a new reservation.

        Args:
            request (Request): The request object containing the reservation data.

        Returns:
            Response: A response object containing the serialized reservation data and status code.
                      If the reservation data is valid and the reservation is created successfully, it returns a 201 status code.
                      If the reservation data is not valid, it returns a 400 status code along with the error messages.
        """

        serializer = ReservationSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        """
        Handles the GET request to retrieve all reservations.

        Args:
            request (Request): The request object.

        Returns:
            Response: A response object containing the serialized reservation data.
                      The data is a list of all reservations, each represented as a dictionary.
                      If the request is successful, it returns a 200 status code.
        """

        reservations = Reservation.objects.all()
        serializer = ReservationSerializer(reservations, many=True, context={'request': request})
        return Response(serializer.data)

class ReservationDetail(APIView):
    """
    This view handles the retrieval, update, and deletion of a specific reservation.

    It inherits from the APIView class provided by Django Rest Framework.
    It requires the user to be authenticated to access, hence the IsAuthenticated permission class.
    """

    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        """
        Retrieves a reservation by its primary key (pk).

        Args:
            pk (int): The primary key of the reservation to retrieve.

        Returns:
            Reservation: The reservation object.

        Raises:
            Http404: If a reservation with the provided primary key does not exist.
        """

        try:
            return Reservation.objects.get(pk=pk)
        except Reservation.DoesNotExist:
            raise Http404

    def get(self, request, pk, *args, **kwargs):
        """
        Handles the GET request to retrieve a specific reservation.

        Args:
            request (Request): The request object.
            pk (int): The primary key of the reservation to retrieve.
            *args, **kwargs: Additional arguments and keyword arguments.

        Returns:
            Response: A response object containing the serialized reservation data.
                      If the request is successful, it returns a 200 status code.
        """

        reservation = self.get_object(pk)
        serializer = ReservationSerializer(reservation)
        return Response(serializer.data)

    def put(self, request, pk):
        """
        Handles the PUT request to update a specific reservation.

        Args:
            request (Request): The request object containing the new reservation data.
            pk (int): The primary key of the reservation to update.

        Returns:
            Response: A response object containing the serialized reservation data and status code.
                      If the reservation data is valid and the reservation is updated successfully, it returns a 200 status code.
                      If the reservation data is not valid, it returns a 400 status code along with the error messages.
        """

        reservation = self.get_object(pk)
        serializer = ReservationSerializer(reservation, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """
        Handles the DELETE request to delete a specific reservation.

        Args:
            request (Request): The request object.
            pk (int): The primary key of the reservation to delete.

        Returns:
            Response: A response object containing a success message and a 204 status code.
        """

        reservation = self.get_object(pk)
        reservation.delete()
        return Response({'message': 'Successfully deleted reservation'}, status=status.HTTP_204_NO_CONTENT)