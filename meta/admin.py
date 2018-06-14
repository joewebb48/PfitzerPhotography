



from django.contrib import admin

from .forms import ImageForm
from .models import Image



pfitzer_title = 'Pfitzer Photography Admin'
pfitzer_admin = 'Pfitzer Photography Administration'

admin.site.site_title = pfitzer_title
admin.site.site_header = pfitzer_admin
admin.site.index_title = pfitzer_admin



class Admin( admin.ModelAdmin ):
	form = ImageForm



admin.site.register( Image, Admin )



