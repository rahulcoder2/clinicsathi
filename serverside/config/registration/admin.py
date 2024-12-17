from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, DoctorProfile, PatientProfile
# Register your models here.

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    # Fields to display in the admin list view
    list_display = ('username', 'email', 'role', 'is_active', 'is_staff')
    list_filter = ('role', 'is_active', 'is_staff', 'is_superuser')
    search_fields = ('username', 'email', 'phone')
    ordering = ('role', 'username')

    # Fields to display when editing a user
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal Info', {'fields': ('email', 'role')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

    # Fields to display when creating a new user
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'role', 'password1', 'password2'),
        }),
    )


# DoctorProfile Admin
@admin.register(DoctorProfile)
class DoctorProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'specialization', 'license_number')
    list_filter = ('specialization',)
    search_fields = ('user__username', 'user__email', 'license_number')

    def get_queryset(self, request):
        # Ensure only doctor profiles appear here
        return super().get_queryset(request).filter(user__role='doctor')


# PatientProfile Admin
@admin.register(PatientProfile)
class PatientProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'date_of_birth', 'address')
    search_fields = ('user__username', 'user__email')

    def get_queryset(self, request):
        # Ensure only patient profiles appear here
        return super().get_queryset(request).filter(user__role='patient')



