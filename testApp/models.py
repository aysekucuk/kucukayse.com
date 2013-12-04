from django.db import models

# Create your models here.

class MainMenu(models.Model):
    name = models.CharField(max_length=100)
    parent = models.ForeignKey("self", blank=True, null=True)

    def __unicode__(self):
        return self.name

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
    menu = models.ForeignKey(MainMenu)


    def __unicode__(self):
        return self.content

class Comment(models.Model):
    email = models.EmailField()
    name = models.CharField(max_length = 100)
    content = models.TextField()
    blog = models.ForeignKey(Blog)
    status = models.BooleanField(default=False)

    def __unicode__(self):
        return self.blog.title

