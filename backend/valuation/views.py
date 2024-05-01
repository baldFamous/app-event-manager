from django.http import Http404
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Valuation
from .serializers import ValuationSerializer

class ValuationList(APIView):
    """
    This view handles the retrieval and creation of valuations.

    It inherits from the APIView class provided by Django Rest Framework.
    It requires the user to be authenticated to access, hence the IsAuthenticated permission class.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Handles the GET request to retrieve all valuations.

        Args:
            request (Request): The request object.

        Returns:
            Response: A response object containing the serialized valuation data.
                      The data is a list of all valuations, each represented as a dictionary.
                      If the request is successful, it returns a 200 status code.
        """

        valuations = Valuation.objects.all()
        serializer = ValuationSerializer(valuations, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        Handles the POST request to create a new valuation.

        Args:
            request (Request): The request object containing the valuation data.

        Returns:
            Response: A response object containing the serialized valuation data and status code.
                      If the valuation data is valid and the valuation is created successfully, it returns a 201 status code.
                      If the valuation data is not valid, it returns a 400 status code along with the error messages.
        """

        serializer = ValuationSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class ValuationDetail(APIView):
    """
    This view handles the retrieval, update, and deletion of a specific valuation.

    It inherits from the APIView class provided by Django Rest Framework.
    It requires the user to be authenticated to access, hence the IsAuthenticated permission class.
    """

    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        """
        Retrieves a valuation by its primary key (pk).

        Args:
            pk (int): The primary key of the valuation to retrieve.

        Returns:
            Valuation: The valuation object.

        Raises:
            Http404: If a valuation with the provided primary key does not exist.
        """

        try:
            return Valuation.objects.get(pk=pk)
        except Valuation.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        """
        Handles the GET request to retrieve a specific valuation.

        Args:
            request (Request): The request object.
            pk (int): The primary key of the valuation to retrieve.

        Returns:
            Response: A response object containing the serialized valuation data.
                      If the request is successful, it returns a 200 status code.
        """

        valuation = self.get_object(pk)
        serializer = ValuationSerializer(valuation)
        return Response(serializer.data)

    def put(self, request, pk):
        """
        Handles the PUT request to update a specific valuation.

        Args:
            request (Request): The request object containing the new valuation data.
            pk (int): The primary key of the valuation to update.

        Returns:
            Response: A response object containing the serialized valuation data and status code.
                      If the valuation data is valid and the valuation is updated successfully, it returns a 200 status code.
                      If the valuation data is not valid, it returns a 400 status code along with the error messages.
        """

        valuation = self.get_object(pk)
        serializer = ValuationSerializer(valuation, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """
        Handles the DELETE request to delete a specific valuation.

        Args:
            request (Request): The request object.
            pk (int): The primary key of the valuation to delete.

        Returns:
            Response: A response object containing a success message and a 204 status code.
        """

        valuation = self.get_object(pk)
        valuation.delete()
        return Response({'message': 'Successfully deleted Valuation'}, status=status.HTTP_204_NO_CONTENT)