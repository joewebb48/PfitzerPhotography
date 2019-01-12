



from django import forms

from meta.widgets import ImageWidget
from meta.models import Setting, Image, Media



class SettingForm( forms.ModelForm ):
	portrait = forms.ImageField( label = 'Self portrait', widget = ImageWidget( ), required = False )
	
	def __init__( self, *args, **kwargs ):
		## Form needs the current portrait set to view it
		portrait = kwargs[ 'instance' ].image.image
		kwargs[ 'initial' ] = { 'portrait': portrait }
		super( ).__init__( *args, **kwargs )
	
	
	class Meta:
		model = Setting
		fields = [ 'first_name', 'last_name', 'email', 'portrait', 'social', 'about' ]



class ImageForm( forms.ModelForm ):
	## Additional field will be necessary for size pricing
	pass
	
	
	class Meta:
		model = Image
		fields = [ 'name', 'image', 'description', 'viewable', 'for_sale', 'price', 'date_taken' ]
		widgets = { 'image': ImageWidget( ) }



class MediaForm( forms.ModelForm ):
	## Include icon field when made into image objects
	pass
	
	
	class Meta:
		model = Media
		fields = [ 'platform', 'url', 'icon', 'active' ]
		widgets = { 'icon': ImageWidget( ) }



class ContactForm( forms.Form ):
	subject = forms.CharField( min_length = 10 )
	address = forms.EmailField( min_length = 10 )
	recipient = forms.EmailField( min_length = 10 )
	message = forms.CharField( min_length = 75 )



