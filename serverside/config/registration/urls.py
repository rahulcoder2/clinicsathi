from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import (
    UserRegistrationView, 
    CustomTokenObtainPairView, 
    PatientRegistrationView, 
    DoctorRegistrationView, 
    ProtectedView, 
    LogoutView, 
    UnregisteredUserView, 
    AppointmentBookingView, 
    DoctorManageAppointmentsView, 
    PatientCompleteAppointmentView,
    AppointmentRescheduleView,
    PasswordResetConfirmView,
    PasswordResetRequestView,
)
urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', UserRegistrationView.as_view(), name='register'), 
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/patient/', PatientRegistrationView.as_view(), name='register_patient'),
    path('register/doctor/', DoctorRegistrationView.as_view(), name='register_doctor'),
    path('protected/', ProtectedView.as_view(), name='protected'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('restricted/', UnregisteredUserView.as_view(), name='restricted'),
    path('appointments/book/', AppointmentBookingView.as_view(), name='book-appointment'),
    path('appointments/reschedule/<int:appointment_id>/', AppointmentRescheduleView.as_view(), name='reschedule-appointment'),
    path('appointments/manage/', DoctorManageAppointmentsView.as_view(), name='manage-appointments'),
    path('appointments/manage/<int:appointment_id>/', DoctorManageAppointmentsView.as_view(), name='update-appointment'),
    path('appointments/complete/<int:appointment_id>/', PatientCompleteAppointmentView.as_view(), name='complete-appointment'),
    path('password-reset/request/', PasswordResetRequestView.as_view(), name='password-reset-request'),
    path('password-reset/confirm/<str:uidb64>/<str:token>/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),

]
