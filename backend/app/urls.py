from django.urls import path
from . import views
from .services.gemini import streaming_view

urlpatterns = [
    path('', views.index, name='index'),

    path('sign-up-callback/', views.signUpCallback),
    path('streaming', streaming_view),

    path('providers/', views.ListProviderView.as_view(), name='providers'),
    path('providers/create', views.AddProviderView.as_view(), name='providers-create'),
    path('provider/<int:pk>', views.ProviderDetails.as_view(), name='provider'),
    path('providers/update/<int:pk>', views.UpdateProviderView.as_view(), name='providers-update'),
    path('providers/delete/<int:pk>', views.DeleteProviderView.as_view(), name='providers-delete'),

    # user account urls
    path('accounts', views.ListUserView.as_view(), name='accounts'),
    path('accounts/create', views.CreateUserView.as_view(), name='accounts-create'),
    path('accounts/update/<int:pk>', views.UpdateUserView.as_view(), name='accounts-update'),
    path('accounts/delete/<int:pk>', views.DeleteUserView.as_view(), name='accounts-delete'),

    # Appointments
    path('client-appointments/<str:pk>', views.ListClientAppointmentsView.as_view(), name='client-appointments'),
    path('provider-appointments/<str:pk>', views.ListProviderAppointmentsView.as_view(), name='provider-appointments'),
    path('appointment/<int:pk>', views.SingleAppointmentView.as_view(), name='appointment'),
    path('appointments/create', views.NewAppointmentView.as_view()),

    path('provider/<int:provider_id>/booked-dates/', views.provider_booked_dates_and_times, name='provider_booked_dates'),

]
