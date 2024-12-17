release: python manage.py collectstatic --noinput --clear
web: gunicorn weatherproject.wsgi --log-file -
