



from django.forms import ModelForm

from meta.widgets import ImageWidget
from meta.models import Setting, Image



class SettingForm( ModelForm ):
	
	class Meta:
		model = Setting
		fields = [ 'first_name', 'last_name', 'email', 'social', 'about', 'portrait' ]
		widgets = { 'image': ImageWidget( attrs = { 'class': 'upload-image' } ) }



class ImageForm( ModelForm ):
	
	class Meta:
		model = Image
		fields = [ 'name', 'image', 'description', 'viewable', 'for_sale', 'price', 'date_taken' ]
		widgets = { 'image': ImageWidget( attrs = { 'class': 'upload-image' } ) }



