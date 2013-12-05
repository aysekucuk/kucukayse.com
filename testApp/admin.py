from django.contrib import admin
from testApp.models import *

class BlogAdmin(admin.ModelAdmin):
    list_display = ("title","content","date","category")

admin.site.register(Blog,BlogAdmin)
admin.site.register(Category)
admin.site.register(MainMenu)
admin.site.register(Comment)
admin.site.register(Tag)