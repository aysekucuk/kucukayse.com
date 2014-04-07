from django.conf.urls import patterns, include, url

from django.contrib import admin
from django.conf.urls.static import static
from blog.templatetags import menu
import settings

from django.views.generic import TemplateView

admin.autodiscover()

urlpatterns = patterns('',
	# Examples:
	#url(r'^.*$', RedirectView.as_view(url='<url_to_home_view>', permanent=False), name='index'),
	url(r'^$', 'blog.views.contents', name='home'),
	url(r'^google3a86ba1c6ba9b80c\.html$', TemplateView.as_view(template_name="google3a86ba1c6ba9b80c.html"), name='google3a86ba1c6ba9b80c'),
	url(r'^grappelli/', include('grappelli.urls')), # grappelli URLS
	url(r'^admin/', include(admin.site.urls)),
	url(r'^search/$' , 'blog.views.search', name='search'),
	url(r'^arsiv/(?P<date>[-\d]+)$', 'blog.views.archive', name='archive'),
	url(r'^kategori/(?P<slug>[-\w]+)/$', 'blog.views.category', name='category'),
	url(r'^etiket/(?P<slug>[-\w]+)/$', 'blog.views.tag', name='tag'),
	url(r'^post/(?P<slug>[-\w]+)/$', 'blog.views.post_detail', name='detail'),
	url(r'^(?P<slug>[-\w]+)/$', 'blog.views.pages', name='page'),
    #url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
)+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

handler404 = 'blog.views.page_not_found'

# Sitemap
from django.contrib.sitemaps import GenericSitemap
from django.contrib.sitemaps import views as sitemaps_views
from blog.models import Blog

sitemaps = {
	'post': GenericSitemap({'queryset': Blog.objects.filter(is_active=True), 'date': 'date'}, priority=1, changefreq='daily'),
}

urlpatterns += (
	url(r'^sitemap\.xml$', sitemaps_views.index, {'sitemaps': sitemaps}),
	url(r'^sitemap-(?P<section>.+)\.xml$', sitemaps_views.sitemap, {'sitemaps': sitemaps}),
)