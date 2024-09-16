# serializers.py
from rest_framework import serializers
from .models import CustomUser, Provider, Reviews, Appointments
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import UserDetailsSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user

class CustomRegisterSerializer(RegisterSerializer,serializers.ModelSerializer):
    type = serializers.ChoiceField(choices=CustomUser.USER_TYPE_CHOICES)

    class Meta:
        model = CustomUser
        fields = ('email','type', 'first_name', 'last_name', 'password1', 'password2')

    def custom_signup(self, request, user):
        user.email = self.validated_data['email']
        user.type = self.validated_data['type']
        user.first_name = self.validated_data['first_name']
        user.last_name = self.validated_data['last_name']
        user.password1 = self.validated_data['password1']
        user.password2 = self.validated_data['password2']
        user.save()

        if user.type == CustomUser.COMPANY:
            Provider.objects.create(
                owner=user,
                company_name=self.validated_data.get('company_name', ''),
                description=self.validated_data.get('description', ''),
                location=self.validated_data.get('location', ''),
                category=self.validated_data.get('category', ''),
                phone_numbers=self.validated_data.get('phone_numbers', ''),
                rating=self.validated_data.get('rating', 0),
                service_fee=self.validated_data.get('service_fee', 0),
                non_fixed_fee=self.validated_data.get('non_fixed_fee', False),
                licence_verified=self.validated_data.get('licence_verified', False),
                website=self.validated_data.get('website', ''),
                cover_image=self.validated_data.get('cover_image', ''),
                speciality=self.validated_data.get('speciality', ''),
            )           
        return user
    

class LimitedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'email', 'profile_photo']


class ProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provider
        fields = '__all__'


class LimitedProviderSerializer(serializers.ModelSerializer):
    owner = LimitedUserSerializer()

    class Meta:
        model = Provider
        fields = ['company_name', 'location', 'cover_image', 'owner']  # Use owner to access user details


class ReviewsSerializer(serializers.ModelSerializer):
    reviewer = LimitedUserSerializer()

    class Meta:
        model = Reviews
        fields = '__all__'


class AppointmentSerializer(serializers.ModelSerializer):
    client_auth0_id = serializers.CharField(write_only=True)

    class Meta:
        model = Appointments
        fields = ["id", "provider", "date", "time", "client_auth0_id", "description", "appointment_link"]

    def create(self, validated_data):
        auth0_id = validated_data.pop('client_auth0_id', None)

        if not auth0_id:
            raise serializers.ValidationError({"client_auth0_id": "This field is required."})

        try:
            client = CustomUser.objects.get(auth0_id=auth0_id)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError({"client_auth0_id": "Client with the provided auth0_id does not exist."})

        validated_data['client'] = client
        return super().create(validated_data)


class ClientAppointmentSerializer(serializers.ModelSerializer):
    provider = LimitedProviderSerializer()

    class Meta:
        model = Appointments
        fields = '__all__'


class DetailedAppointmentSerializer(serializers.ModelSerializer):
    client = LimitedUserSerializer()
    provider = LimitedProviderSerializer()

    class Meta:
        model = Appointments
        fields = ['id', 'client', 'provider', 'date', 'time', 'status', 'description']
