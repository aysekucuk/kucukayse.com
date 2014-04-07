#-*- coding:utf-8 -*-
# sudo apt-get install libjpeg-dev
from django import template
from blog.models import MainMenu
 
register = template.Library()

@register.inclusion_tag('menu.html', takes_context=True)
def menu(context):
	request = context['request']
	url = request.path.split("/")
	url = url[1]
	try:
		menus = MainMenu.objects.filter(status=True)
		return {'menus':menus,'url':url}
	except Exception, e:
		return {'url':url}
