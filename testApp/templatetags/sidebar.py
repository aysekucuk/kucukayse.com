from django import template
from testApp.models import *

from django.db import connections
from django.db.models import Count
from datetime import datetime
 
register = template.Library()

@register.inclusion_tag('sidebar.html', takes_context=True)
def sidebar(context):
	context['categories'] = Category.objects.all()
	context['tags'] = Tag.objects.all()
	context['recents'] = Blog.objects.all().order_by('-date')[0:3]

	archive = Blog.objects.extra(select={'month':connections[Blog.objects.db].ops.date_trunc_sql('month', 'date')}).values('month').annotate(total=Count('date')).order_by('-month')

	list =[]
	for month in archive:
		months =[]
		months.append(month.get('month'))
		months.append(month.get('total')) 
		list.append(months)

	archive = [{'date': datetime.strptime(i['month'].split()[0], "%Y-%m-%d"), 'count' : i['total'] } for i in archive if i['month'].split()[0][0:4] == str(datetime.now().year-1)]
	context['list'] = list

	return context
