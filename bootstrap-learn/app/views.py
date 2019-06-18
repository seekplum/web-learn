# coding:utf-8
from django.shortcuts import render


def login(request):
    return render(request, 'login.html')


def register(request):
    return render(request, 'register.html')


def index(request):
    return render(request, 'index.html')