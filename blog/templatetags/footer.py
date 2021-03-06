from django import template
from blog.models import *

register = template.Library()

@register.inclusion_tag("footer.html",takes_context=True)
def footer(context):
	context['tags'] = Tag.objects.all()[0:20]
	context['recents'] = Blog.objects.filter(is_active=True).order_by('-date')[0:5]

	return context
