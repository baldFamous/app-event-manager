from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Event
from .serializers import EventSerializer
from rest_framework.permissions import IsAuthenticated


class EventList(APIView):
    """
    This view handles the retrieval and creation of events.

    It inherits from the APIView class provided by Django Rest Framework.
    It requires the user to be authenticated to access, hence the IsAuthenticated permission class.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Handles the GET request to retrieve all events.

        Args:
            request (Request): The request object.

        Returns:
            Response: A response object containing the serialized event data.
                      The data is a list of all events, each represented as a dictionary.
                      If the request is successful, it returns a 200 status code.
        """

        # Retrieve all events
        events = Event.objects.all()

        # Create an EventSerializer with the events and set many=True to serialize a queryset
        serializer = EventSerializer(events, many=True)

        # Return a response with the serialized event data
        return Response(serializer.data)

    def post(self, request):
        """
        Handles the POST request to create a new event.

        Args:
            request (Request): The request object containing the event data.

        Returns:
            Response: A response object containing the serialized event data and status code.
                      If the event data is valid and the event is created successfully, it returns a 201 status code.
                      If the event data is not valid, it returns a 400 status code along with the error messages.
        """

        # Create an EventSerializer with the data provided in the request
        serializer = EventSerializer(data=request.data)

        # Check if the provided data is valid
        if serializer.is_valid():
            # Try to save the event
            serializer.save()

            # If successful, return a 201 status code along with the serialized event data
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # If the provided data is not valid, return a 400 status code along with the error messages
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EventDetail(APIView):
    """
    This view handles the retrieval, update, and deletion of a specific event.

    It inherits from the APIView class provided by Django Rest Framework.
    It requires the user to be authenticated to access, hence the IsAuthenticated permission class.
    """

    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        """
        Retrieves an event by its primary key (pk).

        Args:
            pk (int): The primary key of the event to retrieve.

        Returns:
            Event: The event object.

        Raises:
            Http404: If an event with the provided primary key does not exist.
        """

        try:
            return Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        """
        Handles the GET request to retrieve a specific event.

        Args:
            request (Request): The request object.
            pk (int): The primary key of the event to retrieve.
            format (str, optional): The format of the response. Defaults to None.

        Returns:
            Response: A response object containing the serialized event data.
                      If the request is successful, it returns a 200 status code.
        """

        event = self.get_object(pk)
        serializer = EventSerializer(event)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        """
        Handles the PUT request to update a specific event.

        Args:
            request (Request): The request object containing the new event data.
            pk (int): The primary key of the event to update.
            format (str, optional): The format of the response. Defaults to None.

        Returns:
            Response: A response object containing the serialized event data and status code.
                      If the event data is valid and the event is updated successfully, it returns a 200 status code.
                      If the event data is not valid, it returns a 400 status code along with the error messages.
        """

        event = self.get_object(pk)
        serializer = EventSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        """
        Handles the DELETE request to delete a specific event.

        Args:
            request (Request): The request object.
            pk (int): The primary key of the event to delete.
            format (str, optional): The format of the response. Defaults to None.

        Returns:
            Response: A response object containing a success message and a 204 status code.
        """

        event = self.get_object(pk)
        event.delete()
        return Response({'message': 'Successfully deleted event'}, status=status.HTTP_204_NO_CONTENT)