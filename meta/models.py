



from os import path
from django.db.models import Model, CharField, ImageField



class Image( Model ):
	name = CharField( max_length = 100, blank = False )
	image = ImageField( upload_to = 'img/', blank = False )
	
	def __str__( self ):
		return self.name
	
	def save( self, *args, **kwargs ):
		## Use the name field input as the new image file name 
		filename, extension = path.splitext( self.image.name )
		self.image.name = self.name + extension
		## Invoke the saving operations from the inherited class
		super( Image, self ).save( *args, **kwargs )



