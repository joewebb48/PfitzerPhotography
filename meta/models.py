



from django.forms import ModelForm
from django.db.models import Model, CharField, ImageField

from .widgets import ImageWidget



def pathfinder( instance, filename ):
	## Build the path and custom image file name
	base, extension = os.path.splitext( filename )
	return "img/" + instance.name + extension


class Image( Model ):
	name = CharField( max_length = 100, blank = False )
	image = ImageField( upload_to = pathfinder )
	
	def __str__( self ):
		return self.name


class ImageForm( ModelForm ):
	
	class Meta:
		model = Image
		fields = [ "name", "image" ]
		widgets = { "image": ImageWidget( attrs = { "class": "upload-image" } ) }


