from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone

from .managers import CustomUserManager

class CustomUser(AbstractBaseUser, PermissionsMixin):
    INDIVIDUAL = 'individual'
    COMPANY = 'company'

    USER_TYPE_CHOICES = [
        (INDIVIDUAL, 'Individual'),
        (COMPANY, 'Company'),
    ]

    is_admin = models.BooleanField(default=False)

    auth0_id = models.CharField(max_length=256) 

    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    date_of_birth = models.DateField(null=True,blank=True)
    profile_photo = models.CharField(max_length=30, blank=True)
    type = models.CharField(max_length=10,choices=USER_TYPE_CHOICES)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    email_verified = models.BooleanField(default=False)
    date_verified = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email

class Provider(models.Model):
    INDIVIDUAL = 'individual'
    COMPANY = 'company'

    SERVICE_PROVIDER_TYPES = [
        (INDIVIDUAL, 'Individual'),
        (COMPANY, 'Company'),
    ]

    SERVICE_PROVIDER_CATEGORIES = [

    ]

    owner = models.OneToOneField(CustomUser,on_delete=models.CASCADE)
    company_name = models.CharField(max_length=50)
    type = models.CharField(max_length=10,choices=SERVICE_PROVIDER_TYPES)
    description = models.TextField()
    location = models.CharField(max_length=256)
    category = models.CharField(max_length=30,choices=SERVICE_PROVIDER_CATEGORIES)
    phone_numbers = models.CharField(max_length=15)
    rating = models.DecimalField(decimal_places=1,max_digits=3)
    service_fee = models.IntegerField(blank=True)
    non_fixed_fee = models.BooleanField(default=False)
    licence_verified = models.BooleanField(default=False)
    website = models.CharField(max_length=100,blank=True)
    cover_image = models.CharField(max_length=256,blank=True)
    speciality = models.CharField(max_length=30)

    # extra services


    def __str__(self) -> str:
        return self.company_name

class Reviews(models.Model):
    provider = models.ForeignKey(Provider,on_delete=models.CASCADE,related_name="provider_reviews")
    reviewer = models.ForeignKey(CustomUser,on_delete=models.CASCADE,related_name="user_reviews")
    content = models.TextField()
    date_created = models.DateTimeField(default=timezone.now)
    up_votes = models.IntegerField()
    down_votes = models.IntegerField()

    def __str__(self) -> str:
        return f"Review for {self.provider.company_name or self.provider.owner.first_name} by {self.reviewer.first_name or ""}"

class Appointments(models.Model):
    PENDING = "pending"
    CANCELLED = "cancelled"
    PAST= "past"

    STATUS_CHOICES = [
        (PENDING,"pending"),
        (CANCELLED,"cancelled"),
        (PAST,"past")
    ]

    client = models.ForeignKey(CustomUser,on_delete=models.CASCADE,related_name="appointments")
    provider = models.ForeignKey(Provider,on_delete=models.CASCADE,related_name="appointments")
    date = models.DateField()
    time = models.TimeField()
    status = models.CharField(max_length=20,choices=STATUS_CHOICES,default="pending")
    description = models.TextField(blank=True)
    appointment_link  = models.CharField(max_length=256) 

    def __str__(self) -> str:
        return f"Appointment for client {self.client.first_name + self.client.last_name} with  provider {self.provider.owner.first_name + self.provider.owner.last_name}"

class ProviderPortfolio(models.Model):
    pass

class Endorsements(models.Model):
    pass