



from os import path, remove
from django.db.models import Model, CharField, ImageField



class Image( Model ):
	name = CharField( max_length = 100, blank = False )
	image = ImageField( blank = False )
	
	def __str__( self ):
		return self.name
	
	def save( self, *args, **kwargs ):
		## Grabs the incorrect image url when the image is new
		oldurl = self.image.url
		## Use the name field input as the new image file name
		filename, extension = path.splitext( self.image.name )
		imagename = 'img/' + self.name + extension
		## Edit the existing image file once it is properly identified
		if path.isfile( self.image.url[ 1: ] ):
			self.image.save( imagename, self.image, save = False )
		self.image.name = imagename
		## Invoke the saving operations from the inherited class
		super( Image, self ).save( *args, **kwargs )
		## Delete the old file since the newer version replaces it
		## Only works properly if the name is all that is changed
		remove( oldurl[ 1: ] )


