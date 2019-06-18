from django.conf.urls import patterns, include, url
from django.contrib import admin

from app.urls import urlpatterns
from app.views import login

urlpatterns = patterns('',
                       url(r'^admin/', include(admin.site.urls)),
                       url(r'^app/', include(urlpatterns)),
                       url(r'^$', login)
                       )
