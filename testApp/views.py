#-*- coding:utf-8 -*-
from django.shortcuts import render,get_object_or_404
from testApp.models import *
from django.core.paginator import Paginator
from datetime import datetime, timedelta
import calendar


def contents(request):
	try:
		posts = Blog.objects.all().order_by('-date')[0:10]
	except Exception, e:
		posts = []
	return render(request,"blog-list-right-sidebar.html",{"posts":posts,})

def pages(request,slug=None):
	try:
		pages = get_object_or_404(MainMenu, slug = slug)  # Gelen sayfanın slugına göre Menuyu buluyor.
		posts = pages.blog_set.filter(status=True) # o menuye ait blog yazılarını çekiyor posts listesine atıyor
	except Exception, e:
		posts = []
	return render(request, 'blog-list-right-sidebar.html', {'posts':posts})

def post_detail(request,slug=None):
	post_detail = get_object_or_404(Blog, slug=slug) #slug'a göre postu çekiyor
	comments = Comment.objects.select_related('blog').filter(blog=post_detail) # select_related select blog from gibi blog fieldını alıyor sadece böylece daha az sorgu daha hızlı filter da sql de ki where gibi
	return render(request, 'blog-post.html', {'post_detail' : post_detail , 'comments':comments})	

def archive(request, date):
	first = datetime.strptime(date, "%Y-%m-%d")
	end = first + timedelta(calendar.mdays[first.month])
	posts = Blog.objects.filter(date__gte=first, date__lte=end)

	return render(request, "blog-list-right-sidebar.html", {'posts' : posts})

def category(request,slug=None):
	try:
		posts = Blog.objects.filter(category__slug=slug)[0:10]
		return render(request,'blog-list-right-sidebar.html',{'posts':posts})
	except Exception, e:
		return render(request,'blog-list-right-sidebar.html',{})

def tag(request,slug=None):
	try:
		posts = Blog.objects.filter(tags__slug=slug)[0:10]
		return render(request,'blog-list-right-sidebar.html',{'posts':posts})
	except Exception, e:
		return render(request,'blog-list-right-sidebar.html',{})
	