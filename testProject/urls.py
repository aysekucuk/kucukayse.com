from django.conf.urls import patterns, include, url

from django.contrib import admin
from django.conf.urls.static import static
from testApp.templatetags import menu
import settings

admin.autodiscover()

urlpatterns = patterns('',
	# Examples:
	#url(r'^.*$', RedirectView.as_view(url='<url_to_home_view>', permanent=False), name='index'),
	url(r'^$', 'testApp.views.contents', name='home'),
	url(r'^grappelli/', include('grappelli.urls')), # grappelli URLS
	url(r'^admin/', include(admin.site.urls)),
	url(r'^arsiv/(?P<date>[-\d]+)$', 'testApp.views.archive', name='archive'),
	url(r'^post/(?P<slug>[-\w]+)/$', 'testApp.views.post_detail', name='detail'),
	url(r'^(?P<slug>[-\w]+)/$', 'testApp.views.pages', name='page'),
)+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
