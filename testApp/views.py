#-*- coding:utf-8 -*-
from django.shortcuts import render,get_object_or_404
from testApp.models import *
from django.core.paginator import Paginator

# Create your views here.
def contents(request):
    blogs = Blog.objects.all()
    return render(request,"blog-list-right-sidebar.html",{"blogs":blogs})

def pages(request,slug=None):
	pages = get_object_or_404(MainMenu, slug = slug)  # Gelen sayfanın slugına göre Menuyu buluyor.
	posts = pages.blog_set.filter(status=True) # o menuye ait blog yazılarını çekiyor posts listesine atıyor
	return render(request, 'blog-list-right-sidebar.html', {'posts':posts})

def post_detail(request,slug=None):
	post_detail = get_object_or_404(Blog, slug=slug) #slug'a göre postu çekiyor
	comments = Comment.objects.select_related('blog').filter(blog=post_detail) # select_related select blog from gibi blog fieldını alıyor sadece böylece daha az sorgu daha hızlı filter da sql de ki where gibi
	return render(request, 'blog-post.html', {'post_detail' : post_detail , 'comments':comments})	

