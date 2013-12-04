from django.contrib import admin
from testApp.models import Blog,Category

class BlogAdmin(admin.ModelAdmin):
    list_display = ("title","content","date","category")

admin.site.register(Blog,BlogAdmin)
admin.site.register(Category)