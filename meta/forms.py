



from django.forms import ModelForm

from meta.widgets import ImageWidget
from meta.models import Image



class ImageForm( ModelForm ):
	
	class Meta:
		model = Image
		fields = [ 'name', 'image' ]
		widgets = { 'image': ImageWidget( attrs = { 'class': 'upload-image' } ) }


