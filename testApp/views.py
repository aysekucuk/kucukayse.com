#-*- coding:utf-8 -*-
from django.shortcuts import render,get_object_or_404,render_to_response,RequestContext
from testApp.models import *
from django.core.paginator import Paginator
from datetime import datetime, timedelta
import calendar


def contents(request):
	if request.GET.get('sayfa'):
		pagenumber = request.GET.get('sayfa')
	else:
		pagenumber = 1

	paginator = Paginator(Blog.objects.all().order_by('-date'),10)
	posts = paginator.page(pagenumber)		

	return render(request,"blog-list-right-sidebar.html",{"posts":posts})

def pages(request,slug=None):
	try:
		pages = get_object_or_404(MainMenu, slug = slug)  # Gelen sayfanın slugına göre Menuyu buluyor.
		posts = pages.blog_set.filter(is_active=True) # o menuye ait blog yazılarını çekiyor posts listesine atıyor
	except Exception, e:
		posts = []
	return render(request, 'blog-list-right-sidebar.html', {'posts':posts})

def post_detail(request,slug=None):
	post_detail = get_object_or_404(Blog, slug=slug) #slug'a göre postu çekiyor
	comments = Comment.objects.select_related('blog').filter(blog=post_detail) # select_related select blog from gibi blog fieldını alıyor sadece böylece daha az sorgu daha hızlı filter da sql de ki where gibi
	return render(request, 'blog-post.html', {'post_detail' : post_detail , 'comments':comments})	

def archive(request, date):

	first = datetime.strptime(date+"-01", "%Y-%m-%d")
	end = first + timedelta(calendar.mdays[first.month])
	posts = Blog.objects.filter(date__gte=first, date__lte=end).order_by('-date')

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
	
def search(request):

	from django.db.models import Q		

	q = request.GET.get("search", "")

	if len(q) > 2:
		splits = q.split()
		list=[]
		for split in splits:
			query = Q(title__icontains=split) | Q(content__icontains=split)

			posts = Blog.objects.filter(query,is_active=True).distinct().order_by('date')

			if posts:
				list.append(posts)
			total = 0
			if list:
				total = len(list[0])
	else:
		list =[]
		query = Q(title__icontains=q) | Q(content__icontains=q)
		posts = Blog.objects.filter(query,is_active=True).distinct().order_by('date')
		if posts:
			for post in posts:
				list.append(post)
			total=0
			if list:
				total = len(list[0])

	return render_to_response('search-results.html', RequestContext(request, {
		"list": list,
		"q": q,
		"total": total,
		}))

def page_not_found(request):
	return render_to_response('404.html',
	{},
	context_instance=RequestContext(request))
