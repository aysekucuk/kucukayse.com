from django.contrib import admin
from testApp.models import *

class BlogAdmin(admin.ModelAdmin):
	list_display = ("title","content","date","category")
	readonly_fields = ('slug',)

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
