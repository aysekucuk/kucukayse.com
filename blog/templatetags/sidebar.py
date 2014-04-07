from django import template
from blog.models import *

from django.db import connections
from django.db.models import Count
from datetime import datetime
 
register = template.Library()

@register.inclusion_tag('sidebar.html', takes_context=True)
def sidebar(context):
	context['categories'] = Category.objects.all()
	context['tags'] = Tag.objects.all()
	context['recents'] = Blog.objects.all().order_by('-date')[0:3]

	archive = Blog.objects.filter(is_active=True).extra(select={'month':connections[Blog.objects.db].ops.date_trunc_sql('month', 'date')}).values('month').annotate(total=Count('date')).order_by('-month')
	archive = [{'date': datetime.strptime(str(i['month'].year)+"-"+str(i['month'].month), "%Y-%m"), 'count' : i['total'] } for i in archive]
	
	#print "------",archive[0].get('date')
	context['archive'] = archive

	return context
