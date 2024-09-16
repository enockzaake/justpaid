import django_filters
from .models import Provider

class ProviderFilter(django_filters.FilterSet):
    company_name = django_filters.CharFilter(lookup_expr='icontains')
    type = django_filters.CharFilter(lookup_expr='icontains')
    location = django_filters.CharFilter(lookup_expr='icontains')
    rating = django_filters.NumberFilter(lookup_expr='gte')
    licence_verified = django_filters.BooleanFilter()
    speciality = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Provider
        fields = ['company_name','type', 'location', 'rating', 'licence_verified', 'speciality']