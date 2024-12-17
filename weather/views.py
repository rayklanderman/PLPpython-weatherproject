import requests
import os
from datetime import datetime
from dotenv import load_dotenv
from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings

load_dotenv()

def index(request):
    return render(request, 'weather/index.html')

def get_weather(request):
    if request.method == 'POST':
        city = request.POST.get('city')
        api_key = os.getenv('OPENWEATHER_API_KEY')
        
        if not api_key:
            print("Warning: OPENWEATHER_API_KEY not found in environment variables")
            return JsonResponse({'success': False, 'error': 'API key not configured'})
        
        # OpenWeather API endpoint
        url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric'
        
        try:
            response = requests.get(url)
            data = response.json()
            
            if response.status_code == 200:
                weather_data = {
                    'city': data['name'],
                    'temperature': round(data['main']['temp']),
                    'description': data['weather'][0]['description'],
                    'icon': data['weather'][0]['icon'],
                    'humidity': data['main']['humidity'],
                    'pressure': data['main']['pressure'],
                    'wind_speed': data['wind']['speed'],
                    'feels_like': round(data['main']['feels_like']),
                    'visibility': data.get('visibility', 0),
                    'clouds': data['clouds']['all'],
                    'sunrise': data['sys']['sunrise'],
                    'sunset': data['sys']['sunset']
                }
                return JsonResponse({'success': True, 'data': weather_data})
            else:
                return JsonResponse({'success': False, 'error': 'City not found'})
                
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    
    return JsonResponse({'success': False, 'error': 'Invalid request method'})
