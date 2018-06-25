



from django.forms import ModelForm

from meta.widgets import ImageWidget
from meta.models import Image



class ImageForm( ModelForm ):
	
	class Meta:
		model = Image
		fields = [ 'name', 'image', 'description', 'viewable', 'for_sale', 'price', 'date_taken' ]
		widgets = { 'image': ImageWidget( attrs = { 'class': 'upload-image' } ) }


