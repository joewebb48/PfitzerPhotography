



import os
import shutil
from django.db import models

from pfitzer.settings import MEDIA_URL, STATIC_URL



class Setting( models.Model ):
	first_name = models.CharField( max_length = 50, blank = True )
	last_name = models.CharField( max_length = 50, blank = True )
	email = models.EmailField( )
	social = models.BooleanField( verbose_name = 'social media enabled', default = False )
	about = models.TextField( blank = True )
	developer = models.URLField( verbose_name = 'developer website' )
	image = models.OneToOneField( 'Image', models.SET_NULL, null = True )
	created_at = models.DateTimeField( auto_now_add = True )
	modified_at = models.DateTimeField( auto_now = True )
	
	def __str__( self ):
		return self.first_name.title( ) + ' ' + self.last_name.title( )
	
	def save( self, *args, **kwargs ):
		## Prevent additional Setting objects from further creation
		if self.pk != 1:
			return
		super( Setting, self ).save( *args, **kwargs )
	
	def delete( self, *args, **kwargs ):
		## Don't allow deletion of the single Setting model object
		if self.pk == 1:
			return
		super( Setting, self ).delete( *args, **kwargs )
	
	
	class Meta:
		db_table = 'settings'



class Page( models.Model ):
	page = models.CharField( max_length = 25, unique = True )
	title = models.CharField( max_length = 50 )
	description = models.TextField( )
	created_at = models.DateTimeField( auto_now_add = True )
	modified_at = models.DateTimeField( auto_now = True )
	
	def __str__( self ):
		return self.page.title( )
	
	
	class Meta:
		db_table = 'pages'



class Image( models.Model ):
	name = models.CharField( max_length = 100, unique = True )
	image = models.ImageField( height_field = 'height', width_field = 'width' )
	url = models.URLField( editable = False, unique = True )
	height = models.IntegerField( editable = False )
	width = models.IntegerField( editable = False )
	description = models.TextField( blank = True )
	viewable = models.BooleanField( default = False )
	## Nullify merchandising fields until e-commerce integration
	""" for_sale = models.BooleanField( default = False ) """
	## Validators needed to require price is set if for_sale is true
	""" price = models.DecimalField( max_digits = 10, decimal_places = 2, blank = True, null = True ) """
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
		preurl = previous.image.url if previous else ''
		loadurl = self.image.url
		self.url = MEDIA_URL + imagename
		## Edit the existing image file to reflect the name change
		if os.path.isfile( self.image.url[ 1: ] ) and self.image.name != imagename:
			with self.image.open( ):
				self.image.save( imagename, self.image, save = False )
			os.remove( loadurl[ 1: ] )
		## Replace the old image with the updated image version
		elif not os.path.isfile( self.image.url[ 1: ] ) and os.path.isfile( self.url[ 1: ] ):
			os.remove( self.url[ 1: ] )
			self.image.save( imagename, self.image, save = False )
		## Invoke the superclass save method with a new path
		self.image.name = imagename
		super( Image, self ).save( *args, **kwargs )
		## Trash the old file for one with a new name and image
		if os.path.isfile( preurl[ 1: ] ) and preurl != self.url:
			os.remove( preurl[ 1: ] )
		## Copy the newly saved image into the public img folder
		self.copy( previous )
	
	def delete( self, *args, **kwargs ):
		super( Image, self ).delete( *args, **kwargs )
		dumpurl = STATIC_URL + self.image.name
		## Look for the remaining images if any and delete them
		os.remove( self.image.url[ 1: ] ) if os.path.isfile( self.image.url[ 1: ] ) else None
		os.remove( dumpurl[ 1: ] ) if os.path.isfile( dumpurl[ 1: ] ) else None
	
	def copy( self, previous ):
		if os.path.isfile( self.image.url[ 1: ] ):
			## Overwrite the previous public image should it exist
			if previous:
				os.remove( STATIC_URL[ 1: ] + previous.image.name )
			## Make viewable with a new or updated image copy
			viewurl = STATIC_URL + self.image.name
			shutil.copy2( self.url[ 1: ], viewurl[ 1: ] )
	
	
	class Meta:
		db_table = 'images'



class Media( models.Model ):
	platform = models.CharField( max_length = 100, unique = True )
	url = models.URLField( unique = True )
	## Will change icon field to an image object foreign relation
	icon = models.ImageField( unique = True )
	active = models.BooleanField( default = False )
	created_at = models.DateTimeField( auto_now_add = True )
	modified_at = models.DateTimeField( auto_now = True )
	
	def __str__( self ):
		return self.platform.title( )
	
	def save( self, *args, **kwargs ):
		filename = os.path.basename( self.icon.name )
		iconname = 'img/' + filename
		preurl = MEDIA_URL + iconname
		if os.path.isfile( preurl[ 1: ] ):
			os.remove( preurl[ 1: ] )
		self.icon.save( iconname, self.icon, save = False )
		super( Media, self ).save( *args, **kwargs )
	
	
	class Meta:
		db_table = 'media'
		## Stop default pluralization from appending 's' to the end
		verbose_name_plural = 'media'



