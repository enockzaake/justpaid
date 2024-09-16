from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):
    
    response = exception_handler(exc, context)

    # custom behavior for JSON error responses
    if response is not None:
        response.data = {
            'status_code': response.status_code,
            'errors': response.data,
        }

    return response

