import random
from faker import Faker
from django.core.management.base import BaseCommand
from django.utils import timezone
from app.models import CustomUser, Provider, Reviews, Appointments

fake = Faker()

class Command(BaseCommand):
    help = 'Seed the database with dummy data'

    def add_arguments(self, parser):
        parser.add_argument(
            '--users',
            type=int,
            default=10,
            help='Number of users to seed'
        )
        parser.add_argument(
            '--providers',
            type=int,
            default=5,
            help='Number of providers to seed'
        )
        parser.add_argument(
            '--reviews',
            type=int,
            default=20,
            help='Number of reviews to seed'
        )
        parser.add_argument(
            '--appointments',
            type=int,
            default=20,
            help='Number of appointments to seed'
        )

    def handle(self, *args, **options):
        user_count = options['users']
        provider_count = options['providers']
        review_count = options['reviews']
        appointment_count = options['appointments']

        users = self.create_users(user_count)

        providers = self.create_providers(provider_count, users)

        self.create_reviews(review_count, users, providers)

        self.create_appointments(appointment_count, users, providers)

        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {user_count} users, {provider_count} providers, {review_count} reviews, and {appointment_count} appointments'))

    def create_users(self, count):
        users = []
        for _ in range(count):
            user = CustomUser.objects.create(
                email=fake.email(),
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                date_of_birth=fake.date_of_birth(),
                profile_photo=fake.image_url(),
                type=random.choice([CustomUser.INDIVIDUAL, CustomUser.COMPANY]),
                email_verified=fake.boolean(),
                date_verified=fake.boolean(),
                date_joined=timezone.now(),
                auth0_id=fake.uuid4()
            )
            users.append(user)
        return users

    def create_providers(self, count, users):
        providers = []
        available_users = users[:] 

        for _ in range(min(count, len(available_users))):
            owner = random.choice(available_users)
            available_users.remove(owner) 
            
            provider = Provider.objects.create(
                owner=owner,
                company_name=fake.company(),
                type=random.choice([Provider.INDIVIDUAL, Provider.COMPANY]),
                description=fake.text(),
                location=fake.address(),
                category=fake.job(),
                phone_numbers=fake.phone_number(),
                rating=round(random.uniform(1.0, 5.0), 1),
                service_fee=random.randint(100, 5000),
                non_fixed_fee=fake.boolean(),
                licence_verified=fake.boolean(),
                website=fake.url(),
                cover_image=fake.image_url(),
                speciality=fake.job()
            )
            providers.append(provider)

        return providers


    def create_reviews(self, count, users, providers):
        for _ in range(count):
            provider = random.choice(providers)
            reviewer = random.choice(users)
            Reviews.objects.create(
                provider=provider,
                reviewer=reviewer,
                content=fake.text(),
                up_votes=random.randint(0, 50),
                down_votes=random.randint(0, 50),
                date_created=timezone.now()
            )

    def create_appointments(self, count, users, providers):
        for _ in range(count):
            client = random.choice(users)
            provider = random.choice(providers)
            Appointments.objects.create(
                client=client,
                provider=provider,
                date_time=fake.date_time_this_year(),
                status=random.choice([Appointments.PENDING, Appointments.CANCELLED, Appointments.PAST]),
                description=fake.text()
            )
