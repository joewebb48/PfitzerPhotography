



from django import forms

from meta.admin.widgets import ImageWidget
from meta.portfolio.models import Setting, Image, Media



class SettingForm( forms.ModelForm ):
	portrait = forms.ImageField( label = 'Self portrait', widget = ImageWidget( ), required = False )
	
	def __init__( self, *args, **kwargs ):
		if 'instance' in kwargs and kwargs[ 'instance' ]:
			## Form needs the current portrait set to view
			portrait = kwargs[ 'instance' ].image
			graphic = getattr( portrait, 'image', None )
			kwargs[ 'initial' ] = { 'portrait': graphic }
		super( ).__init__( *args, **kwargs )
	
	
	class Meta:
		model = Setting
		fields = [ 'first_name', 'last_name', 'email', 'portrait', 'social', 'about' ]



class ImageForm( forms.ModelForm ):
	## Additional field will be necessary for size pricing
	pass
	
	
	class Meta:
		model = Image
		fields = [ 'name', 'image', 'description', 'viewable', 'date_taken' ]
		widgets = { 'image': ImageWidget( ) }



class MediaForm( forms.ModelForm ):
	icon = forms.ImageField( widget = ImageWidget( ), required = True )
	
	def __init__( self, *args, **kwargs ):
		if 'instance' in kwargs and kwargs[ 'instance' ]:
			## View current icon on form using initial value
			logo = kwargs[ 'instance' ].image
			icon = getattr( logo, 'image', None )
			kwargs[ 'initial' ] = { 'icon': icon }
		super( ).__init__( *args, **kwargs )
	
	
	class Meta:
		model = Media
		fields = [ 'platform', 'url', 'icon', 'active' ]



class ContactForm( forms.Form ):
	subject = forms.CharField( min_length = 10 )
	address = forms.EmailField( min_length = 10 )
	recipient = forms.EmailField( min_length = 10 )
	message = forms.CharField( min_length = 75 )



