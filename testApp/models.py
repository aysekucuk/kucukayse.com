#-*- coding:utf-8 -*-
from django.db import models
from django.template.defaultfilters import slugify

class MainMenu(models.Model):
    name = models.CharField(max_length=100)
    parent = models.ForeignKey("self", blank=True, null=True)
    status = models.BooleanField(default = True)
    slug = models.SlugField(max_length = 200, blank=True ,null = True)


    def save(self):
        self.slug = slugify(self.name.upper())
        super(MainMenu, self).save()

    def __unicode__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length = 100)
    slug = models.SlugField(max_length = 100, blank=True,null = True)


    def save(self):
        self.slug = slugify(self.name.upper())
        super(Category, self).save()

    def __unicode__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length = 255)
    slug = models.SlugField(max_length=255,blank=True,null=True)

    def save(self):
        self.slug = slugify(self.name.upper())
        super(Tag, self).save()

    def __unicode__(self):
        return self.name

class Blog(models.Model):
    title = models.CharField(max_length = 255)
    content = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category)
    tags = models.ManyToManyField(Tag)
    menu = models.ForeignKey(MainMenu)
    status = models.BooleanField(default = False)
    slug = models.SlugField(max_length = 100, blank=True,null = True)
    photo = models.ForeignKey('testApp.Media',blank=True,null=True)
    commment_count = models.IntegerField(default=0)

    def __unicode__(self):
        return self.title

    def save(self):
        self.slug = slugify(self.title.upper())
        super(Blog, self).save()

class Comment(models.Model):
    email = models.EmailField()
    name = models.CharField(max_length = 100)
    content = models.TextField()
    blog = models.ForeignKey(Blog)
    status = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return self.blog.title

    def save(self):
        try:
            super(Comment, self).save()
            self.updateCache()

        except Exception, e:
            raise e

    def updateCache(self, add=0):
        self.blog.comment_count = self.blog.comment_set.count()+add
        self.blog.save()


class Album(models.Model):
    
    name = models.CharField(max_length=30)
    status = models.BooleanField(default='True')
    coverimage = models.ForeignKey('Media', blank=True, null=True, related_name='cover')
    slug = models.SlugField(max_length=200, null=True, blank=True)

    def __unicode__(self):
        return self.name    



class Media(models.Model):

    name = models.CharField(max_length=30,)
    file_url = models.URLField(blank=True, null=True,)
    file = models.FileField(blank=True,null=True,upload_to='gallery')
    order = models.IntegerField(default=0)
    album = models.ForeignKey(Album, blank=True, null=True)

    def admin_image(self):
        if self.file:
            return '<img style="height:50px; width:50px;" src="%s"/>' % self.file.url
        elif self.file_url:
            return '<img style="height:50px; width:50px;" src="%s"/>' % self.file_url
        else:
            return ''

    def get_image_url(self):
        if self.file:
            return self.file.url
        elif self.file_url:
            return self.file_url
        else:
            return ''

    admin_image.allow_tags = True

    def __unicode__(self):
        return self.name    

