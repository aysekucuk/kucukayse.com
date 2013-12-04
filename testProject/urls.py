from django.conf.urls import patterns, include, url

from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    #url(r'^.*$', RedirectView.as_view(url='<url_to_home_view>', permanent=False), name='index'),
    url(r'^$', 'testApp.views.contents', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
)
