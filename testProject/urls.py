from django.conf.urls import patterns, include, url

from django.contrib import admin
from django.conf.urls.static import static
from testApp.templatetags import menu
import settings

from django.views.generic import TemplateView

admin.autodiscover()

urlpatterns = patterns('',
	# Examples:
	#url(r'^.*$', RedirectView.as_view(url='<url_to_home_view>', permanent=False), name='index'),
	url(r'^$', 'testApp.views.contents', name='home'),
	url(r'^google3a86ba1c6ba9b80c\.html$', TemplateView.as_view(template_name="main/google3a86ba1c6ba9b80c.html"), name='google3a86ba1c6ba9b80c'),
	url(r'^grappelli/', include('grappelli.urls')), # grappelli URLS
	url(r'^admin/', include(admin.site.urls)),
	url(r'^search/$' , 'testApp.views.search', name='search'),
	url(r'^arsiv/(?P<date>[-\d]+)$', 'testApp.views.archive', name='archive'),
	url(r'^kategori/(?P<slug>[-\w]+)/$', 'testApp.views.category', name='category'),
	url(r'^etiket/(?P<slug>[-\w]+)/$', 'testApp.views.tag', name='tag'),
	url(r'^post/(?P<slug>[-\w]+)/$', 'testApp.views.post_detail', name='detail'),
	url(r'^(?P<slug>[-\w]+)/$', 'testApp.views.pages', name='page'),
    #url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
)+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

handler404 = 'testApp.views.page_not_found'
