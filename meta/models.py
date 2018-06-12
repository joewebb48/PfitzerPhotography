



import os
from django.db import models



def pathfinder( instance, filename ):
	## Build the path and custom image file name
	base, extension = os.path.splitext( filename )
	return "img/" + instance.name + extension


class Image( models.Model ):
	name = models.CharField( max_length = 100, blank = False )
	image = models.ImageField( upload_to = pathfinder )
	
	def __str__( self ):
		return self.name


