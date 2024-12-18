from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .api.serializers import UserRegistrationSerializer, PatientRegistrationSerializer, DoctorRegistrationSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .api.serializers import CustomTokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
import json

# Create your views here.

class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PatientRegistrationView(APIView):
    def post(self, request):
        serializer = PatientRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Patient registered successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DoctorRegistrationView(APIView):
    def post(self, request):
    # Convert QueryDict to a standard Python dictionary
        data = request.data.dict()  # Converts all key-value pairs to a mutable dictionary

        # Parse the `user` field if it's a JSON string
        if isinstance(data.get('user'), str):
            try:
                userdata = json.loads(data['user'])
                data['user'] = userdata
                print(type(data['user']))
                print(data['user'])
            except json.JSONDecodeError:
                return Response({'error': 'Invalid user data format'}, status=status.HTTP_400_BAD_REQUEST)

        # Debugging logs
        print("Processed Data:", data)

        # Pass processed data to the serializer
        serializer = DoctorRegistrationSerializer(data=data)
        print("Initial Data:", serializer.initial_data)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Doctor registered successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def post(self, request):
    #     data = request.data.copy()

    #     # # Ensure `user` is parsed into a dictionary if it's a string or list
    #     # if isinstance(data.get('user'), list):
    #     #     data['user'] = json.loads(data['user'][0])  # Extract the first item and parse it
    #     # elif isinstance(data.get('user'), str):
    #     #     data['user'] = json.loads(data['user'])
    #     if isinstance(data.get('user'), str):
    #         try:
    #             userdata = json.loads(data['user'])  # Convert the first item in the list to a dictionary
    #             print(type(data['user']))
    #             data["user"]=userdata
    #             print(userdata)
    #         except json.JSONDecodeError:
    #             return Response({'error': 'Invalid user data format'}, status=status.HTTP_400_BAD_REQUEST)
            

    #     # Debugging logs (optional)
    #     print("Processed Data:", data)

    #     serializer = DoctorRegistrationSerializer(data=data)
    #     print("Initial Data:", serializer.initial_data)

    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response({'message': 'Doctor registered successfully!'}, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # def post(self, request):
    #     #print(request.data)
    #     import json
    #     data=request.data.copy()
    #     if isinstance(data.get('user'),str):
    #         data["user"]=json.loads(data.get('user'))
    #         # print(type(data["user"]))
    #     # print(data)
    #     serializer = DoctorRegistrationSerializer(data=data)
    #     print(serializer.initial_data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response({'message': 'Doctor registered successfully!'}, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "You are authenticated!"})
    
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh_token')
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Successfully logged out."}, status=200)
        except Exception as e:
            return Response({"error": "Invalid token."}, status=400)
        
class UnregisteredUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role not in ['doctor', 'patient']:
            return Response({
                "message": "You need to register as a doctor or patient to access the system.",
                "actions": {
                    "register_as_patient": "/register/patient/",
                    "register_as_doctor": "/register/doctor/",
                    "logout": "/logout/"
                }
            }, status=403)
        return Response({"message": "Welcome to the system!"})