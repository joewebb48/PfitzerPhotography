



import os
from django.contrib import admin
from django.forms import ModelForm

from setup.settings import STATIC_URL
from meta.forms import SettingForm, ImageForm
from meta.models import Setting, Page, Image, Media



pfitzer_title = 'Pfitzer Photography Admin'
pfitzer_admin = 'Pfitzer Photography Administration'

admin.site.site_title = pfitzer_title
admin.site.site_header = pfitzer_admin
admin.site.index_title = pfitzer_admin



class SettingAdmin( admin.ModelAdmin ):
	form = SettingForm
	actions = None
	
	def save_model( self, request, obj, form, change ):
		image = request.FILES.get( 'portrait', None )
		if image:
			## Create portrait image if none exists
			if not obj.image:
				text = 'A portrait photo of ' + obj.__str__( ) + '.'
				portrait = Image( name = 'portrait', description = text, image = image )
				portrait.save( )
				obj.image = portrait
			## Set portrait to the new file upload
			else:
				obj.image.image = image
				obj.image.save( )
		super( ).save_model( request, obj, form, change )
	
	def has_add_permission( self, request ):
		## Keep object creation from happening
		return False
	
	def has_delete_permission( self, request, obj = None ):
		## Remove admin Profile object deletion
		return False



class PageAdmin( admin.ModelAdmin ):
	## Update later to disable add and remove
	pass



class ImageAdmin( admin.ModelAdmin ):
	form = ImageForm
	actions = [ 'delete_selected' ]
	list_display = 'name', 'viewable', 'height', 'width', 'date_taken', 'url', 'modified_at', 'uploaded_at'
	
	def delete_selected( modeladmin, request, queryset ):
		if request.POST.get( 'post' ):
			## Delete the selected images in bulk
			for obj in queryset:
				garbageurl = STATIC_URL + obj.image.name
				os.remove( obj.image.url[ 1: ] ) if os.path.isfile( obj.image.url[ 1: ] ) else None
				os.remove( garbageurl[ 1: ] ) if os.path.isfile( garbageurl[ 1: ] ) else None
		return admin.actions.delete_selected( modeladmin, request, queryset )



class MediaAdmin( admin.ModelAdmin ):
	pass



admin.site.register( Setting, SettingAdmin )
admin.site.register( Page, PageAdmin )
admin.site.register( Image, ImageAdmin )
admin.site.register( Media, MediaAdmin )


