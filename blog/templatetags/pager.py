# -*- coding: utf-8 -*-
from django import template
import re, json

register = template.Library()

@register.tag
def pager(parser,token):

	try:
#		tag_name, obj = token.split_contents()
		tag_name, arg = token.contents.split(None, 1)
	except ValueError:
		raise template.TemplateSyntaxError("%r tag requires exactly two argument" % token.contents.split()[0])

	try:
		m = re.search(r'(.*?) as (\w+)', arg)
		if not m:
			raise template.TemplateSyntaxError("%r tag had invalid arguments" % tag_name)
		obj, var_name = m.groups()
	
	#	if not (format_string[0] == format_string[-1] and format_string[0] in ('"', "'")):
	#		raise template.TemplateSyntaxError("%r tag's argument should be in quotes" % tag_name)
	except:
		obj = arg
		var_name = None
		
	return PagerNode(obj,var_name)

class PagerNode(template.Node):
	def __init__(self,obj, var_name):

		self.template_file = 'pagination.html'
		self.spacer = 0
		
		self.pager_var = 'sayfa'
		self.var_name = var_name
		self.obj = obj

	
	def render(self, context):
		try:
			current_page = context[self.obj].number
			total_page = context[self.obj].paginator.num_pages

			items = []
			if total_page == 1:
				pass
			
			elif total_page < 8:
				for i in range(1,total_page+1):
					items.append(i)
			else:
				if current_page <= 4:
					for i in range(1,current_page+2):
						items.append(i)
					items.append(self.spacer)
					for i in range(total_page-1,total_page+1):
						items.append(i)
				elif current_page >= total_page-3:
					for i in range(1,3):
						items.append(i)
					items.append(self.spacer)
					for i in range(current_page-1,total_page+1):
						items.append(i)
				else:
					items.append(self.spacer)
					items.append(current_page-2)
					items.append(current_page-1)
					items.append(current_page)
					items.append(current_page+1)
					items.append(current_page+2)
					items.append(self.spacer)
			
			p = {
				'current_page':current_page,
				'total_pages':total_page,
				'previous_page': context[self.obj].previous_page_number(),
				'next_page': context[self.obj].next_page_number(),
				'has_previous': context[self.obj].has_previous(),
				'has_next': context[self.obj].has_next(),
				'items': items
				}
			if self.var_name:
				context[self.var_name] = json.dumps(p)
				return ''
			else:
				data = context['request'].GET.copy()
				try:
					data.pop(self.pager_var)
				except:
					pass
				p['data'] = data
				t = template.loader.get_template(self.template_file)
				return t.render(template.Context({'pager': p, }, autoescape=context.autoescape))
		except KeyError:
			return ''
#	t = template.loader.get_template('small_fragment.html')
#    return t.render(Context({'var': obj}, autoescape=context.autoescape))
