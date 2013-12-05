from django import template
 
register = template.Library()

@register.inclusion_tag('sidebar.html', takes_context=True)
def sidebar(context):
	return {}
