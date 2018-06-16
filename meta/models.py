



from os import path, remove
from django.db.models import Model, CharField, ImageField



class Image( Model ):
	name = CharField( max_length = 100 )
	image = ImageField( )
	
	def __str__( self ):
		return self.name
	
	def save( self, *args, **kwargs ):
		previous = Image.objects.get( pk = self.pk ) if self.pk else None
		## Use the name field input as the new image file name
		filename, extension = path.splitext( self.image.name )
		imagename = 'img/' + self.name + extension
		## Get the previous, next, and uploaded urls respectively
		preurl = '/root/img/' + previous.name + extension if previous else ''
		nexturl = '/root/' + imagename
		loadurl = self.image.url
		## Edit the existing image file to reflect the name change
		if path.isfile( self.image.url[ 1: ] ) and self.image.name != imagename:
			self.image.save( imagename, self.image, save = False )
			remove( loadurl[ 1: ] )
		## Replace the old image with the updated image version
		elif not path.isfile( self.image.url[ 1: ] ) and path.isfile( nexturl[ 1: ] ):
			remove( nexturl[ 1: ] )
			self.image.save( imagename, self.image, save = False )
		## Invoke the superclass save method with a new path
		self.image.name = imagename
		super( Image, self ).save( *args, **kwargs )
		## Trash the old file for one with a new name and image
		if path.isfile( preurl[ 1: ] ) and preurl != nexturl:
			remove( preurl[ 1: ] )


