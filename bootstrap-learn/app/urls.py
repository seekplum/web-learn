from django.urls import path

from . import views

urlpatterns = [
    path('', views.index),
    path('index/', views.index, name='index'),
    path('prompt/', views.prompt, name='prompt'),
    path('gallery/', views.gallery, name='gallery'),
]
