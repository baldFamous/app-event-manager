from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
from event.models import Event
from event.serializers import EventSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password



class UserCreateView(APIView):
    """
    This view handles the creation of a new user.

    It inherits from the APIView class provided by Django Rest Framework.
    It does not require any permission to access, hence the empty permission_classes list.
    """

    permission_classes = []

    def post(self, request):
        """
        Handles the POST request to create a new user.

        Args:
            request (Request): The request object containing the user data.

        Returns:
            Response: A response object containing the serialized user data and status code.
                      If the user data is valid and the user is created successfully, it returns a 201 status code.
                      If the user data is not valid, it returns a 400 status code along with the error messages.
                      If an exception occurs during the creation of the user, it returns a 400 status code along with the exception message.
        """

        # Create a UserSerializer with the data provided in the request
        serializer = UserSerializer(data=request.data)

        # Check if the provided data is valid
        if serializer.is_valid():
            try:
                # Try to save the user
                serializer.save()

                # If successful, return a 201 status code along with the serialized user data
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as ex:
                # If an exception occurs, return a 400 status code along with the exception message
                return Response({'message': str(ex)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            # If the provided data is not valid, return a 400 status code along with the error messages
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserListView(APIView):
    """
    This view handles the retrieval of all users.

    It inherits from the APIView class provided by Django Rest Framework.
    It requires the user to be authenticated to access, hence the IsAuthenticated permission class.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Handles the GET request to retrieve all users.

        Args:
            request (Request): The request object.

        Returns:
            Response: A response object containing the serialized user data.
                      The data is a list of all users, each represented as a dictionary.
                      If the request is successful, it returns a 200 status code.
        """

        # Get the user model
        User = get_user_model()

        # Retrieve all users
        users = User.objects.all()

        # Create a UserSerializer with the users and set many=True to serialize a queryset
        serializer = UserSerializer(users, many=True)

        # Return a response with the serialized user data
        return Response(serializer.data)


class UserDetailView(APIView):
    """
    This view handles the retrieval, update, and deletion of a specific user.

    It inherits from the APIView class provided by Django Rest Framework.
    It requires the user to be authenticated to access, hence the IsAuthenticated permission class.
    """

    permission_classes = [IsAuthenticated]

    def get_object(self, id):
        """
        Retrieves a user by their ID.

        Args:
            id (int): The ID of the user to retrieve.

        Returns:
            User: The user object.

        Raises:
            NotFound: If a user with the provided ID does not exist.
        """

        user = get_user_model()

        try:
            return user.objects.get(pk=id)
        except user.DoesNotExist:
            raise NotFound("User not found")

    def get(self, request, id=None):
        """
        Handles the GET request to retrieve a specific user.

        If no ID is provided, it retrieves the authenticated user.

        Args:
            request (Request): The request object.
            id (int, optional): The ID of the user to retrieve. Defaults to None.

        Returns:
            Response: A response object containing the serialized user data.
                      If the request is successful, it returns a 200 status code.
        """

        if not id:
            id = request.user.id
        user = self.get_object(id)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, id):
        """
        Handles the PUT request to update a specific user.

        Args:
            request (Request): The request object containing the new user data.
            id (int): The ID of the user to update.

        Returns:
            Response: A response object containing the serialized user data and status code.
                      If the user data is valid and the user is updated successfully, it returns a 200 status code.
                      If the user data is not valid, it returns a 400 status code along with the error messages.
        """

        user = self.get_object(id)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        """
        Handles the DELETE request to delete a specific user.

        Args:
            request (Request): The request object.
            id (int): The ID of the user to delete.

        Returns:
            Response: A response object containing a success message and a 204 status code.
        """

        user = self.get_object(id)
        user.delete()
        return Response({'message': 'Successfully deleted user'}, status=status.HTTP_204_NO_CONTENT)

class Organizers(APIView):
    """
    APIView for handling the retrieval of all organizers and their associated events.

    Inherits from the APIView class provided by Django Rest Framework.
    """

    def get(self, request):
        """
        Handles the GET request to retrieve all organizers and their associated events.

        Args:
            request (Request): The request object.

        Returns:
            Response: A response object containing the serialized organizer and event data.
                      The data is a list of dictionaries, each representing an organizer and their events.
                      If the request is successful, it returns a 200 status code.
        """

        # Get the user model
        User = get_user_model()

        # Retrieve all users with the role 'Organizador'
        organizers = User.objects.filter(role='Organizador')
        organizer_data = []

        # For each organizer, retrieve their associated events and serialize both the organizer and their events
        for organizer in organizers:
            events = Event.objects.filter(organizer=organizer)
            event_serializer = EventSerializer(events, many=True)
            organizer_serializer = UserSerializer(organizer)
            organizer_data.append({
                'organizer': organizer_serializer.data,
                'events': event_serializer.data
            })

        # Return a response with the serialized organizer and event data
        return Response(organizer_data)

class UpdateUsernameView(APIView):
    """
    APIView for handling the update of the authenticated user's username.

    Inherits from the APIView class provided by Django Rest Framework.
    Requires the user to be authenticated to access, hence the IsAuthenticated permission class.
    """

    permission_classes = [IsAuthenticated]

    def patch(self, request):
        """
        Handles the PATCH request to update the authenticated user's username.

        Args:
            request (Request): The request object containing the new username.

        Returns:
            Response: A response object containing the serialized user data and status code.
                      If the new username is provided and the username is updated successfully, it returns a 200 status code.
                      If the new username is not provided, it returns a 400 status code with an error message.
        """

        # Retrieve the authenticated user
        user = request.user

        # Retrieve the new username from the request data
        new_username = request.data.get('username', None)

        # If the new username is not provided, return a 400 status code with an error message
        if not new_username:
            return Response({"detail": "New username not provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Update the user's username
        user.username = new_username
        user.save()

        # Serialize the user data
        serializer = UserSerializer(user)

        # Return a response with the serialized user data
        return Response(serializer.data, status=status.HTTP_200_OK)

class UpdatePasswordView(APIView):
    """
    APIView for handling the update of the authenticated user's password.

    Inherits from the APIView class provided by Django Rest Framework.
    Requires the user to be authenticated to access, hence the IsAuthenticated permission class.
    """

    permission_classes = [IsAuthenticated]

    def patch(self, request):
        """
        Handles the PATCH request to update the authenticated user's password.

        Args:
            request (Request): The request object containing the old and new passwords.

        Returns:
            Response: A response object containing a success message and status code.
                      If the old password is correct and the new password is provided, it updates the password and returns a 200 status code.
                      If the old password is incorrect or the new password is not provided, it returns a 400 status code with an error message.
        """

        # Retrieve the authenticated user
        user = request.user

        # Retrieve the old and new passwords from the request data
        old_password = request.data.get('old_password', None)
        new_password = request.data.get('new_password', None)

        # If the old or new password is not provided, return a 400 status code with an error message
        if not old_password or not new_password:
            return Response({"detail": "Old and new passwords are required"}, status=status.HTTP_400_BAD_REQUEST)

        # If the old password is incorrect, return a 400 status code with an error message
        if not check_password(old_password, user.password):
            return Response({"detail": "Old password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)

        # Update the user's password
        user.set_password(new_password)
        user.save()

        # Return a response with a success message
        return Response({"detail": "Password updated successfully"}, status=status.HTTP_200_OK)