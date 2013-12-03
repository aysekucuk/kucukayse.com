from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length = 100)

    def __unicode__(self):
        return self.name

class Blog(models.Model):
    title = models.CharField(max_length = 255)
    content = models.TextField()
    date = models.DateTimeField(auto_now_add =True)
    category = models.ForeignKey(Category)

    def __unicode__(self):
        return self.content

