# coding:utf-8
from django.shortcuts import render


def prompt(request):
    return render(request, 'prompt.html')


def gallery(request):
    return render(request, 'gallery.html')


def index(request):
    return render(request, 'index.html')
