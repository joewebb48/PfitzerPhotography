



import os
from django.db import models



class Setting( models.Model ):
	name = models.CharField( max_length = 50, unique = True )
	active = models.BooleanField( default = False )
	created_at = models.DateTimeField( auto_now_add = True )
	modified_at = models.DateTimeField( auto_now = True )
	
	def __str__( self ):
		return self.name



class Image( models.Model ):
	name = models.CharField( max_length = 100, unique = True )
	image = models.ImageField( )
	description = models.TextField( blank = True )
	viewable = models.BooleanField( default = False )
	for_sale = models.BooleanField( default = False )
	## Validators needed to make sure price is set if for_sale is true
	price = models.DecimalField( max_digits = 10, decimal_places = 2, blank = True, null = True )
	date_taken = models.DateField( verbose_name = 'photo taken at', blank = True, null = True )
	uploaded_at = models.DateTimeField( auto_now_add = True )
	modified_at = models.DateTimeField( auto_now = True )
	
	def __str__( self ):
		return self.name
	
	def save( self, *args, **kwargs ):
		previous = Image.objects.get( pk = self.pk ) if self.pk else None
		## Use the name field input as the new image file name
		filename, extension = os.path.splitext( self.image.name )
		imagename = 'img/' + self.name + extension
		## Get the previous, next, and uploaded urls respectively
		preurl = '/root/img/' + previous.name + extension if previous else ''
		nexturl = '/root/' + imagename
		loadurl = self.image.url
		## Edit the existing image file to reflect the name change
		if os.path.isfile( self.image.url[ 1: ] ) and self.image.name != imagename:
			self.image.save( imagename, self.image, save = False )
			os.remove( loadurl[ 1: ] )
		## Replace the old image with the updated image version
		elif not os.path.isfile( self.image.url[ 1: ] ) and os.path.isfile( nexturl[ 1: ] ):
			os.remove( nexturl[ 1: ] )
			self.image.save( imagename, self.image, save = False )
		## Invoke the superclass save method with a new path
		self.image.name = imagename
		super( Image, self ).save( *args, **kwargs )
		## Trash the old file for one with a new name and image
		if os.path.isfile( preurl[ 1: ] ) and preurl != nexturl:
			os.remove( preurl[ 1: ] )
	
	def delete( self, *args, **kwargs ):
		super( Image, self ).delete( *args, **kwargs )
		os.remove( self.image.url[ 1: ] )



class Text( models.Model ):
	label = models.CharField( max_length = 100, unique = True )
	page = models.CharField( max_length = 50 )
	subject = models.CharField( max_length = 100 )
	text = models.TextField( verbose_name = 'content' )
	published = models.BooleanField( default = False )
	created_at = models.DateTimeField( auto_now_add = True )
	modified_at = models.DateTimeField( auto_now = True )
	
	def __str__( self ):
		return self.label



class Media( models.Model ):
	platform = models.CharField( max_length = 100, unique = True )
	icon = models.ImageField( unique = True )
	url = models.URLField( unique = True )
	active = models.BooleanField( default = False )
	created_at = models.DateTimeField( auto_now_add = True )
	modified_at = models.DateTimeField( auto_now = True )
	
	def __str__( self ):
		return self.platform
	
	def save( self, *args, **kwargs ):
		iconname = 'img/' + self.icon.url[ 6: ]
		preurl = '/root/' + iconname
		if os.path.isfile( preurl[ 1: ] ):
			os.remove( preurl[ 1: ] )
		self.icon.save( iconname, self.icon, save = False )
		super( Media, self ).save( *args, **kwargs )


