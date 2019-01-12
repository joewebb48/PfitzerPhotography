



import os
from django.contrib import admin
from django.utils.html import format_html

from setup.settings import STATIC_URL
from meta.forms import SettingForm, ImageForm, MediaForm
from meta.models import Setting, Page, Image, Media



pfitzer_title = 'Pfitzer Photography Admin'
pfitzer_admin = 'Pfitzer Photography Administration'

admin.site.site_title = pfitzer_title
admin.site.site_header = pfitzer_admin
admin.site.index_title = pfitzer_admin



class SettingAdmin( admin.ModelAdmin ):
	form = SettingForm
	actions = None
	list_display = 'name', 'portrait', 'email', 'social', 'develop', 'modified_at'
	
	def __init__( self, model, admin ):
		type( self ).develop.short_description = 'developer website'
		super( ).__init__( model, admin )
	
	def name( self, field ):
		return field.first_name.title( ) + ' ' + field.last_name.title( )
	
	def portrait( self, field ):
		html = '<a href="{}"><img src="{}" alt="{}"/></a>'
		path = STATIC_URL + field.image.image.name
		return format_html( html, path, path, field.image.description )
	
	def develop( self, field ):
		html = '<a href="{}">{}</a>'
		return format_html( html, field.developer, field.developer )
	
	def save_model( self, request, photo, form, change ):
		image = request.FILES.get( 'portrait', None )
		if image:
			## Create portrait image if none exists
			if not photo.image:
				text = 'A portrait photo of ' + photo.__str__( ) + '.'
				portrait = Image( name = 'portrait', description = text, image = image )
				portrait.save( )
				photo.image = portrait
			## Set portrait to the new file upload
			else:
				photo.image.image = image
				photo.image.save( )
		super( ).save_model( request, photo, form, change )
	
	def has_add_permission( self, request ):
		## Keep object creation from happening
		return False
	
	def has_delete_permission( self, request, obj = None ):
		## Remove admin Profile object deletion
		return False
	
	
	class Media:
		css = { 'all': [ 'admin.css' ] }



class PageAdmin( admin.ModelAdmin ):
	ordering = [ 'created_at' ]
	list_display = 'page', 'title', 'description', 'modified_at'
	
	## Update later to disable add and remove



class ImageAdmin( admin.ModelAdmin ):
	form = ImageForm
	ordering = [ 'uploaded_at' ]
	actions = [ 'delete_selected' ]
	list_display = '__str__', 'thumbnail', 'viewable', 'date_taken', 'modified_at', 'uploaded_at'
	
	def __init__( self, model, admin ):
		type( self ).thumbnail.short_description = 'thumbnail'
		super( ).__init__( model, admin )
	
	def thumbnail( self, field ):
		html = '<a href="{}"><img src="{}" alt="{}"/></a>'
		path = STATIC_URL + field.image.name
		return format_html( html, path, path, field.description )
	
	def get_queryset( self, request ):
		queryset = super( ).get_queryset( request )
		## Hide media icon objects when added
		return queryset.exclude( name = 'portrait' )
	
	def delete_selected( modeladmin, request, queryset ):
		if request.POST.get( 'post' ):
			## Delete the selected images in bulk
			for image in queryset:
				imageurl = image.image.url
				trashurl = STATIC_URL + image.image.name
				os.remove( imageurl[ 1: ] ) if os.path.isfile( imageurl[ 1: ] ) else None
				os.remove( trashurl[ 1: ] ) if os.path.isfile( trashurl[ 1: ] ) else None
		return admin.actions.delete_selected( modeladmin, request, queryset )
	
	
	class Media:
		css = { 'all': [ 'admin.css' ] }



class MediaAdmin( admin.ModelAdmin ):
	form = MediaForm
	ordering = [ 'platform' ]
	list_display = 'website', 'iconview', 'location', 'active', 'modified_at', 'created_at'
	
	def __init__( self, model, admin ):
		type( self ).website.short_description = 'platform'
		type( self ).iconview.short_description = 'icon'
		type( self ).location.short_description = 'url'
		super( ).__init__( model, admin )
	
	def website( self, field ):
		return field.platform.title( )
	
	def iconview( self, field ):
		html = '<a href="{}"><img src="{}" alt="{}"/></a>'
		path = STATIC_URL + field.icon.name
		return format_html( html, path, path, field.platform )
	
	def location( self, field ):
		html = '<a href="{}">{}</a>'
		return format_html( html, field.url, field.url )
	
	
	class Media:
		css = { 'all': [ 'admin.css' ] }



admin.site.register( Setting, SettingAdmin )
admin.site.register( Page, PageAdmin )
admin.site.register( Image, ImageAdmin )
admin.site.register( Media, MediaAdmin )



