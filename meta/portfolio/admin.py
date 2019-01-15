



import os
from django.contrib import admin
from django.utils.html import format_html

from pfitzer.settings import STATIC_URL
from meta.portfolio.forms import SettingForm, ImageForm, MediaForm
from meta.portfolio.models import Setting, Page, Image, Media



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
	
	def save_model( self, request, config, form, change ):
		image = request.FILES.get( 'portrait', None )
		if image:
			## Create portrait image if none exists
			if 'portrait' not in form.initial:
				text = 'A portrait photo of ' + config.__str__( ) + '.'
				portrait = Image( name = 'portrait', description = text, image = image )
				portrait.save( )
				config.image = portrait
			## Set portrait to the new file upload
			else:
				config.image.image = image
				config.image.save( )
		super( ).save_model( request, config, form, change )
	
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
	actions = None
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
	actions = [ 'delete_selected' ]
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
		path = STATIC_URL + field.image.image.name
		return format_html( html, path, path, field.image.description )
	
	def location( self, field ):
		html = '<a href="{}">{}</a>'
		return format_html( html, field.url, field.url )
	
	def save_model( self, request, media, form, change ):
		image = request.FILES.get( 'icon', None )
		if image:
			## Generate missing social media icon
			if 'icon' not in form.initial:
				text = media.__str__( ) + ' logo icon.'
				icon = Image( name = media.platform, description = text, image = image )
				icon.save( )
				media.image = icon
			## Modify icon using the uploaded file
			else:
				media.image.image = image
				media.image.save( )
		super( ).save_model( request, media, form, change )
	
	def get_deleted_objects( self, queryset, request ):
		## Preserve original arguments for later
		catalog = list( )
		keep = queryset
		for media in queryset:
			if self.model == queryset.model:
				catalog.append( media.image_id )
				## Need to change for bulk deleting
				icon = type( media.image ).objects.filter( pk = media.image_id )
				look = queryset.filter( image_id = media.image )
				queryset = icon
		## Alter context settings for media objs
		ejection = super( ).get_deleted_objects( queryset, request )
		params = ejection[ 0 ].pop( -1 ).pop( 0 ), ejection[ 0 ]
		assembly = dict( sorted( ejection[ 1 ].items( ), reverse = True ) )
		## Integrate new context configuration
		return list( params ), assembly, ejection[ 2 ], ejection[ 3 ]
	
	
	class Media:
		css = { 'all': [ 'admin.css' ] }


