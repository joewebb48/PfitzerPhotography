



from django.forms import ModelForm, ImageField

from meta.widgets import ImageWidget
from meta.models import Setting, Image



class SettingForm( ModelForm ):
	portrait = ImageField( label = 'Self portrait', widget = ImageWidget( ), required = False )
	
	def __init__( self, *args, **kwargs ):
		## Form needs the current portrait set to view it
		portrait = kwargs[ 'instance' ].image.image
		kwargs[ 'initial' ] = { 'portrait': portrait }
		super( ).__init__( *args, **kwargs )
	
	
	class Meta:
		model = Setting
		fields = [ 'first_name', 'last_name', 'email', 'portrait', 'social', 'about' ]



class ImageForm( ModelForm ):
	
	
	class Meta:
		model = Image
		fields = [ 'name', 'image', 'description', 'viewable', 'for_sale', 'price', 'date_taken' ]
		widgets = { 'image': ImageWidget( ) }



