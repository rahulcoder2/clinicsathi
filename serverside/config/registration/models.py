from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.contrib.auth.models import BaseUserManager
# Create your models here.


class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        #adminuser = User.objects.filter(role="admin")
        # if extra_fields.role=="admin":
        #     raise Exception('Admin already exist.')
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, email, password, **extra_fields)

    def get_by_natural_key(self, username):
        return self.get(username=username)



class UserManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset()

    def patients(self):
        return self.get_queryset().filter(role='patient')

    def doctors(self):
        return self.get_queryset().filter(role='doctor')

class User(AbstractUser):
    ROLE_CHOICES = (
        ('patient', 'Patient'),
        ('doctor', 'Doctor'),
        ('admin', 'Admin')
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    #phone = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)

    objects = CustomUserManager()

    REQUIRED_FIELDS = ['email']
    
    def __str__(self):
        return f"{self.username} ({self.role})"
    
    # def save(self, *args, **kwargs):
    #     if self.objects.filter(role='admin').count()>1:
    #         raise Exception("Multiple admin cant exist")
    #     super().save(*args, **kwargs)

class PatientProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='patient_profile')
    date_of_birth = models.DateField()
    phone = models.CharField(max_length=15, unique=True)
    address = models.TextField()

    def __str__(self):
        return f"{self.user.username} (Patient)"

class DoctorProfile(models.Model):
    SPECIALIZATION_CHOICES = [
        ('Family Physician', 'Family Physician'),
        ('Internist', 'Internist'),
        ('Pediatrician', 'Pediatrician'),
        ('Cardiologist', 'Cardiologist'),
        ('Dermatologist', 'Dermatologist'),
        ('Neurologist', 'Neurologist'),
        ('Psychiatrist', 'Psychiatrist'),
        ('Orthopedist', 'Orthopedist'),
        ('OB-GYN', 'Obstetrician-Gynecologist (OB-GYN)'),
        ('Radiologist', 'Radiologist'),
    ]

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='doctor_profile'
    )
    specialization = models.CharField(
        max_length=50,
        choices=SPECIALIZATION_CHOICES
    )
    profile_picture = models.ImageField(upload_to='doctor_profiles/')
    certificate_picture = models.ImageField(upload_to='doctor_certificates/')
    license_number = models.CharField(max_length=50)
    phone = models.CharField(max_length=15)

    def __str__(self):
        return f"Dr. {self.user.username} - {self.specialization}"
    
