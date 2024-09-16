import os
from dotenv import load_dotenv
load_dotenv()

from django.http import StreamingHttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework import status
import google.generativeai as genai
os.environ['GEMINI_API_KEY']

import json
import time
import datetime


genai.configure(api_key=os.environ['GEMINI_API_KEY'])

def get_date():
    """
    Returns the current date 
    """
    return datetime.date.today().strftime('%Y-%m-%d')

model = genai.GenerativeModel(model_name='gemini-1.5-flash',
                              tools=[get_date],
                              generation_config={"response_mime_type": "text/plain"})



def stream_data(input):
    # response = model.generate_content(input,stream=True)
    chat = model.start_chat()
    response = chat.send_message(input,stream=True)
    for chunk in response:
        print("CANDIDATES",chunk.candidates)
        if fn := chunk.candidates[0].content.parts[0].function_call:
            res = chat.send_message(
            genai.protos.Content(
            parts=[genai.protos.Part(
                function_response = genai.protos.FunctionResponse(
                name=fn.name,
                response={'result': get_date()}))]),stream=True)
            for chunk2 in res:
                yield chunk2.text
        else:
            yield chunk.text




history = []

@csrf_exempt
async def streaming_view(request):
    request.session['gemini-chat-id'] = 'sample-chat-id'
  
    print("SESSION:",dict(request.session.items()))

    try:
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        response = StreamingHttpResponse(stream_data(body['input']),content_type="text/plain")
        response['Cache-Control'] = 'no-cache'
        response['X-Accel-Buffering'] = 'no'  # Disable buffering in reverse proxy
        return response
    except:
        response = {
            "message":"An error occurred"
        }
        return JsonResponse(response,safe=False, status=status.HTTP_400_BAD_REQUEST)


    # response = {
    #     "message":"Hello from django"
    # }
    # return JsonResponse(response,safe=False, status=status.HTTP_200_OK)


