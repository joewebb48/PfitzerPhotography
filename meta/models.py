



from django.db.models import Model, CharField, ImageField



def pathfinder( instance, filename ):
	## Build the path and custom image file name
	base, extension = os.path.splitext( filename )
	return 'img/' + instance.name + extension


class Image( Model ):
	name = CharField( max_length = 100, blank = False )
	image = ImageField( upload_to = pathfinder, blank = False )
	
	def __str__( self ):
		return self.name



