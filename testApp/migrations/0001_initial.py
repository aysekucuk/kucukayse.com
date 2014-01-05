# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'MainMenu'
        db.create_table(u'testApp_mainmenu', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=100)),
            ('parent', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['testApp.MainMenu'], null=True, blank=True)),
            ('status', self.gf('django.db.models.fields.BooleanField')(default=True)),
            ('slug', self.gf('django.db.models.fields.SlugField')(max_length=200, null=True, blank=True)),
        ))
        db.send_create_signal(u'testApp', ['MainMenu'])

        # Adding model 'Category'
        db.create_table(u'testApp_category', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=100)),
            ('slug', self.gf('django.db.models.fields.SlugField')(max_length=100, null=True, blank=True)),
        ))
        db.send_create_signal(u'testApp', ['Category'])

        # Adding model 'Tag'
        db.create_table(u'testApp_tag', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('slug', self.gf('django.db.models.fields.SlugField')(max_length=255, null=True, blank=True)),
        ))
        db.send_create_signal(u'testApp', ['Tag'])

        # Adding model 'Blog'
        db.create_table(u'testApp_blog', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('title', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('content', self.gf('django.db.models.fields.TextField')()),
            ('date', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('category', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['testApp.Category'])),
            ('menu', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['testApp.MainMenu'])),
            ('status', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('slug', self.gf('django.db.models.fields.SlugField')(max_length=100, null=True, blank=True)),
            ('photo', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['testApp.Media'], null=True, blank=True)),
            ('commment_count', self.gf('django.db.models.fields.IntegerField')(default=0)),
        ))
        db.send_create_signal(u'testApp', ['Blog'])

        # Adding M2M table for field tags on 'Blog'
        m2m_table_name = db.shorten_name(u'testApp_blog_tags')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('blog', models.ForeignKey(orm[u'testApp.blog'], null=False)),
            ('tag', models.ForeignKey(orm[u'testApp.tag'], null=False))
        ))
        db.create_unique(m2m_table_name, ['blog_id', 'tag_id'])

        # Adding model 'Comment'
        db.create_table(u'testApp_comment', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('email', self.gf('django.db.models.fields.EmailField')(max_length=75)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=100)),
            ('content', self.gf('django.db.models.fields.TextField')()),
            ('blog', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['testApp.Blog'])),
            ('status', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('date', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
        ))
        db.send_create_signal(u'testApp', ['Comment'])

        # Adding model 'Album'
        db.create_table(u'testApp_album', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=30)),
            ('status', self.gf('django.db.models.fields.BooleanField')(default=True)),
            ('coverimage', self.gf('django.db.models.fields.related.ForeignKey')(blank=True, related_name='cover', null=True, to=orm['testApp.Media'])),
            ('slug', self.gf('django.db.models.fields.SlugField')(max_length=200, null=True, blank=True)),
        ))
        db.send_create_signal(u'testApp', ['Album'])

        # Adding model 'Media'
        db.create_table(u'testApp_media', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=30)),
            ('file_url', self.gf('django.db.models.fields.URLField')(max_length=200, null=True, blank=True)),
            ('file', self.gf('django.db.models.fields.files.FileField')(max_length=100, null=True, blank=True)),
            ('order', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('album', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['testApp.Album'], null=True, blank=True)),
        ))
        db.send_create_signal(u'testApp', ['Media'])


    def backwards(self, orm):
        # Deleting model 'MainMenu'
        db.delete_table(u'testApp_mainmenu')

        # Deleting model 'Category'
        db.delete_table(u'testApp_category')

        # Deleting model 'Tag'
        db.delete_table(u'testApp_tag')

        # Deleting model 'Blog'
        db.delete_table(u'testApp_blog')

        # Removing M2M table for field tags on 'Blog'
        db.delete_table(db.shorten_name(u'testApp_blog_tags'))

        # Deleting model 'Comment'
        db.delete_table(u'testApp_comment')

        # Deleting model 'Album'
        db.delete_table(u'testApp_album')

        # Deleting model 'Media'
        db.delete_table(u'testApp_media')


    models = {
        u'testApp.album': {
            'Meta': {'object_name': 'Album'},
            'coverimage': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'cover'", 'null': 'True', 'to': u"orm['testApp.Media']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '30'}),
            'slug': ('django.db.models.fields.SlugField', [], {'max_length': '200', 'null': 'True', 'blank': 'True'}),
            'status': ('django.db.models.fields.BooleanField', [], {'default': 'True'})
        },
        u'testApp.blog': {
            'Meta': {'object_name': 'Blog'},
            'category': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['testApp.Category']"}),
            'commment_count': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'content': ('django.db.models.fields.TextField', [], {}),
            'date': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'menu': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['testApp.MainMenu']"}),
            'photo': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['testApp.Media']", 'null': 'True', 'blank': 'True'}),
            'slug': ('django.db.models.fields.SlugField', [], {'max_length': '100', 'null': 'True', 'blank': 'True'}),
            'status': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'tags': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['testApp.Tag']", 'symmetrical': 'False'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '255'})
        },
        u'testApp.category': {
            'Meta': {'object_name': 'Category'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'slug': ('django.db.models.fields.SlugField', [], {'max_length': '100', 'null': 'True', 'blank': 'True'})
        },
        u'testApp.comment': {
            'Meta': {'object_name': 'Comment'},
            'blog': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['testApp.Blog']"}),
            'content': ('django.db.models.fields.TextField', [], {}),
            'date': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'status': ('django.db.models.fields.BooleanField', [], {'default': 'False'})
        },
        u'testApp.mainmenu': {
            'Meta': {'object_name': 'MainMenu'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'parent': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['testApp.MainMenu']", 'null': 'True', 'blank': 'True'}),
            'slug': ('django.db.models.fields.SlugField', [], {'max_length': '200', 'null': 'True', 'blank': 'True'}),
            'status': ('django.db.models.fields.BooleanField', [], {'default': 'True'})
        },
        u'testApp.media': {
            'Meta': {'object_name': 'Media'},
            'album': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['testApp.Album']", 'null': 'True', 'blank': 'True'}),
            'file': ('django.db.models.fields.files.FileField', [], {'max_length': '100', 'null': 'True', 'blank': 'True'}),
            'file_url': ('django.db.models.fields.URLField', [], {'max_length': '200', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '30'}),
            'order': ('django.db.models.fields.IntegerField', [], {'default': '0'})
        },
        u'testApp.tag': {
            'Meta': {'object_name': 'Tag'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'slug': ('django.db.models.fields.SlugField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        }
    }

    complete_apps = ['testApp']