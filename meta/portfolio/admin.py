



import os
import math
import boto3 as aws
from django.contrib import admin
from django.utils.html import format_html

from pfitzer.settings import AWS_S3_ACCESS
from meta.portfolio.forms import SettingForm, ImageForm, MediaForm
from meta.portfolio.models import Setting, Page, Image, Media
from meta.portfolio.ops import invert



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
		if field.image:
			html = '<a href="{}"><img src="{}" alt="{}"/></a>'
			path, desc = field.image.url, field.image.description
			return format_html( html, path, path, desc )
		return 'No portrait image uploaded'
	
	def develop( self, field ):
		html = '<a href="{}">{}</a>'
		return format_html( html, field.developer, field.developer )
	
	def save_model( self, request, config, form, change ):
		image = request.FILES.get( 'portrait', None )
		if image:
			## Create portrait image if none exists
			if not form.initial[ 'portrait' ]:
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
		## Only create when settings don't exist
		if not self.get_queryset( request ).exists( ):
			return True
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
		return format_html( html, field.url, field.url, field.description )
	
	def get_queryset( self, request ):
		queryset = super( ).get_queryset( request )
		## Locate image pks that have relations
		obscured = list( )
		for image in queryset:
			## Hide any non-gallery images found
			if hasattr( image, 'media' ) or hasattr( image, 'setting' ):
				obscured.append( image.id )
		return queryset.exclude( pk__in = obscured )
	
	def delete_selected( modeladmin, request, queryset ):
		if request.POST.get( 'post' ):
			## Execute bulk deletion within bucket
			cube = aws.resource( 's3' ).Bucket( 'cloud-cube' )
			cube.meta.client = aws.client( 's3', **AWS_S3_ACCESS )
			## Produce the list of keys for removal
			dump = [ { 'Key': image.image.name } for image in queryset ]
			## Quantity max of 1000 per bulk delete
			iters = math.floor( len( dump ) / 1000 )
			for kilo in range( iters + 1 ):
				breadth = 1000 if kilo < iters else len( dump )
				subset, dump = dump[ :breadth ], dump[ breadth: ]
				## Delete all selected images in bulk
				cube.delete_objects( Delete = { 'Objects': subset } )
		return admin.actions.delete_selected( modeladmin, request, queryset )
	
	
	class Media:
		css = { 'all': [ 'admin.css' ] }



class MediaAdmin( admin.ModelAdmin ):
	form = MediaForm
	ordering = [ 'platform' ]
	actions = [ 'delete_selected' ]
	list_display = 'platform', 'iconview', 'location', 'active', 'modified_at', 'created_at'
	
	def __init__( self, model, admin ):
		type( self ).iconview.short_description = 'icon'
		type( self ).location.short_description = 'url'
		super( ).__init__( model, admin )
	
	def iconview( self, field ):
		html = '<a href="{}"><img src="{}" alt="{}"/></a>'
		path, desc = field.image.url, field.image.description
		return format_html( html, path, path, desc )
	
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
		catalog = list( )
		for media in queryset:
			## Foreign keys for the new queryset
			catalog.append( media.image_id )
		keepset = Image.objects.filter( pk__in = catalog )
		## Alter context settings for media objs
		ejection = super( ).get_deleted_objects( keepset, request )
		params = invert( ejection[ 0 ], len( ejection[ 0 ] ) )
		assembly = dict( sorted( ejection[ 1 ].items( ), reverse = True ) )
		## Implement new context configuration
		return params, assembly, ejection[ 2 ], ejection[ 3 ]
	
	def delete_selected( modeladmin, request, queryset ):
		return admin.actions.delete_selected( modeladmin, request, queryset )
	
	def delete_queryset( self, request, queryset ):
		icons = list( media.image for media in queryset )
		super( ).delete_queryset( request, queryset )
		## Bulk deletion only cascades manually
		for icon in icons: icon.delete( )
	
	def delete_model( self, request, media ):
		super( ).delete_model( request, media )
		media.image.delete( )
	
	
	class Media:
		css = { 'all': [ 'admin.css' ] }


