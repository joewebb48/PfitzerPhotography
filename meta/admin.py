



from django.contrib import admin
from django.db.models import ImageField

from .widgets import ImageWidget
from .models import Image, ImageForm



pfitzer_title = 'Pfitzer Photography Admin'
pfitzer_admin = 'Pfitzer Photography Administration'

admin.site.site_title = pfitzer_title
admin.site.site_header = pfitzer_admin
admin.site.index_title = pfitzer_admin



class Admin( admin.ModelAdmin ):
	form = ImageForm
	"""
	attrs = { 'class': 'upload-image' }
	formfield_overrides = { ImageField: { 'widget': ImageWidget( attrs = attrs ) } }
	"""



admin.site.register( Image, Admin )


