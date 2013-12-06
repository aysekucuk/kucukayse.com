#-*- coding:utf-8 -*-
from django import template
from testApp.models import MainMenu
 
register = template.Library()

@register.inclusion_tag('menu.html', takes_context=True)
def menu(context):
	request = context['request']
	try:
		menus = MainMenu.objects.filter(status=True)
		print menus
		return {'menus':menus}
	except Exception, e:
		return {}
