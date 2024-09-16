# JUSTPAID

## Finder service Features

- Companies looking for financial experts(accounting firm / solo expert)
- create account (company account , service provider account)
- Search for providers, add filters
- Extra focus on search bar eg, suggestions, more filters,location
- categorise the providers
- financial providers can be of different types , ie they work on different niches/sectors of finance

- Review provider ratings, services offered,custom calendar booking, map/location

## Services

<!-- - File upload - Amazon s3
- Database - AWS RDS -->
- Auth - OAuth

### AI

- Add a bot to be fed with a description, then it generates filters, applies and displays new results

- See and filter results without logging in.
- Login to actually connect with providers (maintain search and filter state to resume after login/signup)

## USER(normal user) ROUTES

- / (landing)
- /search
- (auth pages)
- appointments
- my account
- provider-details

## PROVIDER ROUTES

- appointments
- provider account

### TODO

- Make appointment in forms, view appts in client side and provider side
- Fetch all data from concerned api routes
- Auth (https://developer.auth0.com/resources/code-samples/full-stack/hello-world/basic-access-control/spa/react-typescript/django-python)
- AI(Google gemini)
- Filtering on backend
- AWS(S3)
