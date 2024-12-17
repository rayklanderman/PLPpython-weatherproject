# Weather Project

A Django web application that displays weather information for cities. Users can search for cities and view current weather conditions.

## Live Demo

The application is live and can be accessed at: [https://web-production-6b89f.up.railway.app/](https://web-production-6b89f.up.railway.app/)

## Features

- Search for cities
- Display current weather conditions
- Responsive design
- Clean and intuitive interface

## Technologies Used

- Django
- Python
- HTML/CSS
- JavaScript
- Weather API
- Railway (Deployment Platform)

## Setup

1. Clone the repository
2. Install requirements: `pip install -r requirements.txt`
3. Set up environment variables
4. Run migrations: `python manage.py migrate`
5. Start server: `python manage.py runserver`

## Deployment

The application is deployed on Railway and automatically deploys from the main branch. The deployment includes:
- Automatic HTTPS
- Environment variables management
- Static files serving
- Production-grade server (Gunicorn)
