from django.conf.urls import patterns, url

urlpatterns = patterns(
    'app.views',
    url(r'^login/$', 'login', name='login'),
    url(r'^register/$', 'register', name='register'),
    url(r'^index/$', 'index', name='index')
)
