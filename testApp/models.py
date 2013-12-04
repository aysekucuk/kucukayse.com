from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length = 100)

    def __unicode__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length = 255)

    def __unicode__(self):
        return self.name

class Blog(models.Model):
    title = models.CharField(max_length = 255)
    content = models.TextField()
    date = models.DateTimeField(auto_now_add =True)
    category = models.ForeignKey(Category)
    tags = models.ManyToManyField(Tag)


    def __unicode__(self):
        return self.content

class Comment(models.Model):
    email = models.EmailField()
    name = models.CharField(max_length = 100)
    content = models.TextField()
    blog = models.ForeignKey(Blog)

    def __unicode__(self):
        return self.blog.title

