from django.http import Http404
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Comment
from .serializers import CommentSerializer

class CommentList(APIView):
    """
    APIView for handling Comment list operations.

    Attributes:
        permission_classes: A list of permission classes the view should use.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Handle GET requests for the list of Comment instances.

        Args:
            request: The request instance.

        Returns:
            A Response with the serialized Comment data.
        """
        comments = Comment.objects.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        Handle POST requests for creating a Comment instance.

        Args:
            request: The request instance.

        Returns:
            A Response with the serialized Comment data if the request data is valid.
            A Response with the serializer errors if the request data is not valid.
        """
        serializer = CommentSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class CommentDetail(APIView):
    """
    APIView for handling individual Comment instances.

    Attributes:
        permission_classes: A list of permission classes the view should use.
    """

    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        """
        Retrieve a Comment instance by its primary key.

        Args:
            pk: The primary key of the Comment instance.

        Returns:
            The Comment instance.

        Raises:
            Http404: If the Comment instance does not exist.
        """
        try:
            return Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        """
        Handle GET requests for a Comment instance.

        Args:
            request: The request instance.
            pk: The primary key of the Comment instance.

        Returns:
            A Response with the serialized Comment data.
        """
        comment = self.get_object(pk)
        serializer = CommentSerializer(comment)
        return Response(serializer.data)

    def put(self, request, pk):
        """
        Handle PUT requests for a Comment instance.

        Args:
            request: The request instance.
            pk: The primary key of the Comment instance.

        Returns:
            A Response with the serialized Comment data if the request data is valid.
            A Response with the serializer errors if the request data is not valid.
        """
        comment = self.get_object(pk)
        serializer = CommentSerializer(comment, data=request.data, context={'request': request}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """
        Handle DELETE requests for a Comment instance.

        Args:
            request: The request instance.
            pk: The primary key of the Comment instance.

        Returns:
            A Response with a success message.
        """
        comment = self.get_object(pk)
        comment.delete()
        return Response({'message': 'Successfully deleted comment'}, status=status.HTTP_204_NO_CONTENT)