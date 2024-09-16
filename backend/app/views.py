from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework.generics import ListAPIView,UpdateAPIView,CreateAPIView,DestroyAPIView
from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404


from .models import Provider,CustomUser,Reviews,Appointments
from .serializers import ProviderSerializer,UserSerializer,ReviewsSerializer, \
AppointmentSerializer,DetailedAppointmentSerializer,ClientAppointmentSerializer,CustomRegisterSerializer

from rest_framework.generics import ListAPIView, UpdateAPIView, CreateAPIView, DestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
from django.http import JsonResponse
from .models import Provider, Reviews, Appointments, CustomUser
from .serializers import ProviderSerializer, ReviewsSerializer, AppointmentSerializer, ClientAppointmentSerializer, DetailedAppointmentSerializer


from dj_rest_auth.registration.views import RegisterView 

from .filters import ProviderFilter
from django_filters.rest_framework import DjangoFilterBackend


@csrf_exempt
def index(request):
    return JsonResponse({"data":"Hello from Justpaid"})


@api_view(['POST'])
def signUpCallback(request):
    try:
        query_dict = dict(request.GET)
        query_params = {key: query_dict.get(key)[0] for key in query_dict}
        p = Provider.objects.filter(**query_params)
        pp = ProviderSerializer(p,many=True)
        print("JSON BODY:",json.loads(request.body.decode('utf8')))
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    return JsonResponse({"message":"success","data":json.loads(request.body.decode('utf8'))},status=200)


class CustomRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer

# Provider views
class ListProviderView(ListAPIView):
    serializer_class = ProviderSerializer
    queryset = Provider.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProviderFilter

class AddProviderView(CreateAPIView):
    serializer_class = ProviderSerializer
    queryset = Provider.objects.all()

class UpdateProviderView(UpdateAPIView):
    serializer_class = ProviderSerializer
    queryset = Provider.objects.all()

class DeleteProviderView(DestroyAPIView):
    serializer_class = ProviderSerializer
    queryset = Provider.objects.all()

class ProviderDetails(APIView):
    def get(self, request, pk, *args, **kwargs):
        provider = get_object_or_404(Provider, pk=pk)
        provider_serializer = ProviderSerializer(provider)

        reviews = Reviews.objects.filter(provider_id=pk).select_related("provider")
        review_serializer = ReviewsSerializer(reviews, many=True)

        response_data = {
            'provider': provider_serializer.data,
            'reviews': review_serializer.data
        }

        return Response(response_data, status=status.HTTP_200_OK)



# User account views
class ListUserView(ListAPIView):
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()
    
class CreateUserView(CreateAPIView):
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()

class UpdateUserView(UpdateAPIView):
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()

class DeleteUserView(DestroyAPIView):
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()

# Manage appointments
class ListClientAppointmentsView(APIView):
    def get(self, request, pk, *args, **kwargs):
        print("PK:",pk)
        appointments = Appointments.objects.filter(client__auth0_id=pk)
        appointments_serializer = ClientAppointmentSerializer(appointments, many=True)

        return JsonResponse({'appointments': appointments_serializer.data}, status=status.HTTP_200_OK)

class ListProviderAppointmentsView(APIView):
    def get(self, request, pk, *args, **kwargs):
        appointments = Appointments.objects.filter(provider__auth0_id=pk).select_related('client', 'provider')
        appointments_serializer = DetailedAppointmentSerializer(appointments, many=True)

        return JsonResponse({'appointments': appointments_serializer.data}, status=status.HTTP_200_OK)
    
class SingleAppointmentView(APIView):
    def get(self, request, pk, *args, **kwargs):
        appointment = Appointments.objects.get(id = pk)
        appointment_serializer = AppointmentSerializer(appointment)
        response_data = {
            'appointment': appointment_serializer.data,
        }
        
        return JsonResponse(response_data, status=status.HTTP_200_OK)

class NewAppointmentView(CreateAPIView):
    serializer_class = AppointmentSerializer
    queryset = Appointments.objects.all()

class UpdateAppointmentView(UpdateAPIView):
    pass
class DeleteAppointmentView(DestroyAPIView):
    pass


def provider_booked_dates_and_times(request, provider_id):
    provider = get_object_or_404(Provider, id=provider_id)
    
    appointments = Appointments.objects.filter(provider=provider).exclude(status=Appointments.CANCELLED)

    booked_data = {}

    for appointment in appointments:
        date = appointment.date.isoformat()
        time = appointment.time.strftime("%H:%M")

        if date not in booked_data:
            booked_data[date] = []
        booked_data[date].append(time)

    return JsonResponse({
        'provider': provider.id,
        'booked_dates_and_times': booked_data
    })
