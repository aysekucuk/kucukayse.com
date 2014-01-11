"""
Django settings for testProject project.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/topics/settings/
yapilacaklar: pagination ve tweetlerin cekimi
For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.6/ref/settings/
"""
from django.conf.global_settings import TEMPLATE_CONTEXT_PROCESSORS as TCP
# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.6/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '36*3xk^+q%5*v7(%vnf(&1ygvcm48a96&2spy6%drxj(!4@$46'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True
THUMBNAIL_DEBUG = True
ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = (
    'grappelli',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'testApp',
    'south',
    'easy_thumbnails',
    'disqus',

)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)


DATABASE_OPTIONS = {'charset': 'utf8'}
DEFAULT_CHARSET = 'utf-8'

ROOT_URLCONF = 'testProject.urls'

WSGI_APPLICATION = 'testProject.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'hello',
    	'USER': 'root',
    	'PASSWORD':'abc123',
    	'HOST':'localhost',
    	'PORT':'',
    }
}
TEMPLATE_CONTEXT_PROCESSORS = TCP + (
    'django.core.context_processors.request',
)
# Internationalization
# https://docs.djangoproject.com/en/1.6/topics/i18n/

LANGUAGE_CODE = 'tr-TR'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.6/howto/static-files/

STATIC_URL = "/static/"
MEDIA_ROOT =BASE_DIR
MEDIA_URL = "/"
print MEDIA_URL
#TEMPLATE_URL = (BASE_DIR,"/templates/")

TEMPLATE_DIRS = os.path.join(BASE_DIR ,"templates/boxme/wide/")

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    'django.contrib.staticfiles.finders.FileSystemFinder',
)

THUMBNAIL_ALIASES = {
    '': {
        'bigpost': {'size': (250, 200), 'crop': True},
        'slpost': {'size':(70,50), 'crop':True}
    },
}

GRAPPELLI_ADMIN_TITLE = 'hello'

