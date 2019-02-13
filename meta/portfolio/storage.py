



import os
import io
import boto3 as aws
from botocore.exceptions import ClientError
from django.core.files.storage import FileSystemStorage
from django.core.files import File

from pfitzer.settings import AWS_S3_URL, AWS_S3_ACCESS, MEDIA_ROOT



class AmazonStorage( FileSystemStorage ):
	pass
	
	def open( self, name, mode = 'rb' ):
		## Default to opening existing image files locally
		try:
			return super( ).open( name, mode )
		except FileNotFoundError:
			## Yield empty image file if image is not open
			iobytes = io.BytesIO( bytes( ) )
			stream = io.BufferedReader( iobytes )
			return File( stream, name )
	
	def save( self, name, content, max_length = None ):
		## Add in a check in case local storage is desired
		""" return super( ).save( name, content, max_length ) """
		return name
	
	def exists( self, name ):
		cube = aws.resource( 's3' ).Bucket( 'cloud-cube' )
		cube.meta.client = aws.client( 's3', **AWS_S3_ACCESS )
		try:
			self.cube.Object( name ).get( )
			return True
		except ClientError as error:
			return os.path.exists( MEDIA_ROOT + name )
	
	def url( self, name ):
		## Will want alternate url sourcing for local files
		basename = os.path.basename( name )
		return AWS_S3_URL + '/public/' + basename
	
	def get_available_name( name, max_length = None ):
		## Override default Storage class' name hashing
		return name



