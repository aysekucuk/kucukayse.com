from django.contrib import admin
from django.conf import settings
from testApp.models import *

class BlogAdmin(admin.ModelAdmin):
	list_display = ("title","content","date","category")
	readonly_fields = ('slug',)
	search_fields = ['title']

	classes = ('collapse-open',)
	allow_add = True

	fieldsets = (
		('', {
            'fields': ('title', 'content', 'photo',),
        }),
		 ('icerik', {
            'classes': ('collapse-open',),
            'fields' : ('category', 'menu',),
        }),
		 )

	class Media:
		js = [
			settings.STATIC_URL+'grappelli/tinymce/jscripts/tiny_mce/tiny_mce.js',
			settings.STATIC_URL+'grappelli/tinymce_setup/tinymce_setup.js',
		]

class CategoryAdmin(admin.ModelAdmin):
	readonly_fields = ('slug',)

class MainMenuAdmin(admin.ModelAdmin):
	readonly_fields = ('slug',)


class MediaAdmin(admin.ModelAdmin):
	list_display=('name','admin_image')


admin.site.register(Blog,BlogAdmin)
admin.site.register(Category,CategoryAdmin)
admin.site.register(MainMenu, MainMenuAdmin)
admin.site.register(Comment)
admin.site.register(Tag)
admin.site.register(Album)
admin.site.register(Media,MediaAdmin)
