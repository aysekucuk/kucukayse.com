#-*- coding:utf-8 -*-
# sudo apt-get install libjpeg-dev
from django import template
from testApp.models import MainMenu
 
register = template.Library()

@register.inclusion_tag('menu.html', takes_context=True)
def menu(context):
	request = context['request']
	try:
		menus = MainMenu.objects.filter(status=True)
		return {'menus':menus}
	except Exception, e:
		return {}
