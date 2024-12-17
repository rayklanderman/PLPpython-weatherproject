#!/bin/bash
chmod +x .railway/build.sh
python manage.py collectstatic --noinput --clear
