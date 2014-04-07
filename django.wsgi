import os, sys
sys.path.append('/var/www/kucukayse.com')
os.environ['DJANGO_SETTINGS_MODULE'] = 'kucukayse.settings'

import django.core.handlers.wsgi

application = django.core.handlers.wsgi.WSGIHandler()
