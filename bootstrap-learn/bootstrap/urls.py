from django.urls import path, include
from django.contrib import admin

from app.urls import urlpatterns
from app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('app/', include(urlpatterns)),
    path('', views.index)
]
