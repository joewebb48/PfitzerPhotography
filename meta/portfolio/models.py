



import os
import boto3 as aws
from django.db import models

from pfitzer.settings import AWS_S3_URL, AWS_S3_ACCESS
from meta.portfolio.storage import AmazonStorage



class Setting( models.Model ):
	first_name = models.CharField( max_length = 50, blank = True )
	last_name = models.CharField( max_length = 50, blank = True )
	email = models.EmailField( )
	social = models.BooleanField( verbose_name = 'social media enabled', default = False )
	about = models.TextField( blank = True )
	developer = models.URLField( verbose_name = 'developer website' )
	image = models.OneToOneField( 'Image', on_delete = models.SET_NULL, null = True )
	created_at = models.DateTimeField( auto_now_add = True )
	modified_at = models.DateTimeField( auto_now = True )
	
	def __str__( self ):
		return self.first_name.title( ) + ' ' + self.last_name.title( )
	
	def save( self, *args, **kwargs ):
		## Prevent additional Setting objects from being created
		if self.pk != 1 and Setting.objects.exists( ):
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
	image = models.ImageField( storage = AmazonStorage( ), height_field = 'height', width_field = 'width' )
	url = models.FilePathField( path = AWS_S3_URL + '/public', editable = False, unique = True )
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
		## Amazon's S3 file storage service for image uploading
		cube = aws.resource( 's3' ).Bucket( 'cloud-cube' )
		cube.meta.client = aws.client( 's3', **AWS_S3_ACCESS )
		## Find previous version of the current object if it exists
		previous = Image.objects.get( pk = self.pk ) if self.pk else None
		## Use the name field input as the new image file name
		filename, extension = os.path.splitext( self.image.name )
		imagename = 'public/' + self.name + extension
		## Get the previous, next, and uploaded urls respectively
		self.url = AWS_S3_URL + '/' + imagename
		self.image.name = 'pfitzer/' + imagename
		## Keep the image field's save method from being used
		self.image.save = lambda name, content, save: None
		## Missing image upload should ignore height and width
		within = lambda key: key not in [ 'id', 'height', 'width' ]
		exact = lambda key: not key.startswith( '_' ) and within( key )
		attrs = filter( lambda key: exact( key ), vars( self ).keys( ) )
		## Invoke the superclass save method with a new path
		update = list( attrs ) if previous and self.image.closed else None
		super( Image, self ).save( update_fields = update, *args, **kwargs )
		## Collect any metadata to store with the uploaded info
		stats = filter( lambda val: val[ 0 ][ 0 ].isalpha( ), vars( self ).items( ) )
		meta = map( lambda val: ( val[ 0 ], str( val[ 1 ] ) ), dict( stats ).items( ) )
		## Generate an image object resource for uploading to S3
		image = cube.Object( self.image.name )
		## Edit the existing image file to reflect the name change
		if self.image.closed and previous.name != self.name:
			source = { 'Bucket': 'cloud-cube', 'Key': previous.image.name }
			image.copy( source, ExtraArgs = { 'Metadata': dict( meta ) } )
			cube.Object( previous.image.name ).delete( )
		## Replace the last image or upload a new image object
		elif not self.image.closed:
			if previous:
				cube.Object( previous.image.name ).delete( )
			image.put( Body = self.image, Metadata = dict( meta ) )
	
	def delete( self, *args, **kwargs ):
		## Build the bucket resource to delete the image upload
		cube = aws.resource( 's3' ).Bucket( 'cloud-cube' )
		cube.meta.client = aws.client( 's3', **AWS_S3_ACCESS )
		## Trash the image object and its associated S3 file data
		super( Image, self ).delete( *args, **kwargs )
		cube.Object( self.image.name ).delete( )
	
	
	class Meta:
		db_table = 'images'



class Media( models.Model ):
	platform = models.CharField( max_length = 100, unique = True )
	url = models.URLField( unique = True )
	## Highly likely replaced by the image model viewable field
	active = models.BooleanField( default = False )
	## Will add default choices field for social media icons soon
	image = models.OneToOneField( 'Image', on_delete = models.CASCADE, related_name = 'media' )
	created_at = models.DateTimeField( auto_now_add = True )
	modified_at = models.DateTimeField( auto_now = True )
	
	def __str__( self ):
		return self.platform.title( )
	
	def save( self, *args, **kwargs ):
		self.platform = self.platform.title( )
		super( Media, self ).save( *args, **kwargs )
	
	
	class Meta:
		db_table = 'media'
		## Stop default pluralization from appending 's' to the end
		verbose_name_plural = 'media'


