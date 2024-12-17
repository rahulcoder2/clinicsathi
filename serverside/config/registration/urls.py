from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import UserRegistrationView, CustomTokenObtainPairView, PatientRegistrationView, DoctorRegistrationView, ProtectedView

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', UserRegistrationView.as_view(), name='register'), 
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/patient/', PatientRegistrationView.as_view(), name='register_patient'),
    path('register/doctor/', DoctorRegistrationView.as_view(), name='register_doctor'),
    path('protected/', ProtectedView.as_view(), name='protected'),

]
