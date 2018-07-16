



import os
from django.contrib import admin
from django.forms import ModelForm

from meta.forms import ImageForm
from meta.models import Setting, Image, Media



pfitzer_title = 'Pfitzer Photography Admin'
pfitzer_admin = 'Pfitzer Photography Administration'

admin.site.site_title = pfitzer_title
admin.site.site_header = pfitzer_admin
admin.site.index_title = pfitzer_admin



class SettingAdmin( admin.ModelAdmin ):
	form = ModelForm
	actions = None
	
	def has_add_permission( self, request ):
		## Keep object creation from occurring
		return False
	
	def has_delete_permission( self, request, obj = None ):
		## Remove any Profile object deletion
		return False



class ImageAdmin( admin.ModelAdmin ):
	form = ImageForm
	actions = [ 'delete_selected' ]
	
	def delete_selected( modeladmin, request, queryset ):
		if request.POST.get( 'post' ):
			## Delete the selected images in bulk
			for obj in queryset:
				if os.path.isfile( obj.image.url[ 1: ] ):
					os.remove( obj.image.url[ 1: ] )
		return admin.actions.delete_selected( modeladmin, request, queryset )



class MediaAdmin( admin.ModelAdmin ):
	form = ModelForm



admin.site.register( Setting, SettingAdmin )
admin.site.register( Image, ImageAdmin )
admin.site.register( Media, MediaAdmin )



