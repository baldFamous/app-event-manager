from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class Register(APIView):
    permission_classes = []

    def post(self, request):

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                # Generar tokens de acceso y actualización para el usuario recién creado

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as ex:
                return Response({'message': str(ex)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)