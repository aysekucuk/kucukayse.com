from django.shortcuts import render
from testApp.models import *

# Create your views here.
def contents(request):
    blogs = Blog.objects.all()

    return render(request,"index-2.html",{"blogs":blogs})