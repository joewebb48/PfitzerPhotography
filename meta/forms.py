



from django.forms import ModelForm

from .widgets import ImageWidget
from .models import Image



class ImageForm( ModelForm ):
	
	class Meta:
		model = Image
		fields = [ 'name', 'image' ]
		widgets = { 'image': ImageWidget( attrs = { 'class': 'upload-image' } ) }


