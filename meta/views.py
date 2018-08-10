



import os
import json
import requests
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from datetime import datetime

from meta.models import Setting, Page, Image, Media



def index( request, url = None ):
	tags = data( request ).content
	page = json.loads( tags )
	## Get jsx views from the Node server that processes them
	feedback = requests.post(
		'http://localhost:3000/render',
		headers = { 'Content-Type': 'application/json' },
		## React's StaticRouter needs the url from Django instead
		data = json.dumps( { 'url': request.path } )
	)
	## Serialized React frontend that will be embedded into html
	metadata = feedback.json( )
	metadata[ 'title' ] = page[ 'fields' ][ 'title' ]
	return render( request, 'index.html', metadata )


def data( request ):
	title = 'Pfitzer Photography'
	## Have this removed for url query once model field is added
	origin = request.GET.get( 'url', request.path )
	url = origin[ 1: ] if origin != '/' else 'home'
	## Obtain page metadata for insertion into HTML as head tags
	try:
		## May fail and run except block instead if url is a subroute
		query = Page.objects.get( page__iexact = url )
		serial = serializers.serialize( 'json', [ query ] )
		info = json.loads( serial )[ 0 ]
		info[ 'fields' ][ 'title' ] += ' | ' + title
		return JsonResponse( info )
	## Avoid database querying if requested path is an image file
	except Page.DoesNotExist:
		base = os.path.basename( origin )
		photo = { 'fields': { 'title': base + ' | ' + title } }
		return JsonResponse( photo )


def photos( request ):
	query = Image.objects.all( )
	serial = serializers.serialize( 'json', query )
	gallery = json.loads( serial )
	## Update image date fields for more readable viewed dates
	for image in gallery:
		image[ 'fields' ][ 'date' ] = image[ 'fields' ].pop( 'date_taken', None )
		if image[ 'fields' ][ 'date' ]:
			## Format each date string in the American date format
			date = datetime.strptime( image[ 'fields' ][ 'date' ], '%Y-%m-%d' )
			image[ 'fields' ][ 'date' ] = '{0}-{1}-{2}'.format( date.month, date.day, date.year )
	return JsonResponse( gallery, safe = False )


def bio( request ):
	query = Setting.objects.get( pk = 1 )
	serial = serializers.serialize( 'json', [ query ] )
	content = json.loads( serial )[ 0 ]
	## Build a new full name key from the removed name fields
	first = content[ 'fields' ].pop( 'first_name', None )
	last = content[ 'fields' ].pop( 'last_name', None )
	content[ 'fields' ][ 'name' ] = '{0} {1}'.format( first, last )
	return JsonResponse( content, safe = False )


def email( request ):
	query = Setting.objects.get( pk = 1 )
	serial = serializers.serialize( 'json', [ query ] )
	address = json.loads( serial )[ 0 ]
	return JsonResponse( address, safe = False )


def social( request ):
	## Verify that the social media links panel has been enabled
	query = Setting.objects.get( pk = 1 )
	serial = serializers.serialize( 'json', [ query ] )
	enabled = json.loads( serial )[ 0 ][ 'fields' ][ 'social' ]
	## Don't display the social media panel if it's not set to active
	if not enabled:
		return HttpResponse( )
	## If enabled, grab all activated social media links to display
	else:
		query = Media.objects.filter( active = True )
		serial = serializers.serialize( 'json', query )
		links = json.loads( serial )
		return JsonResponse( links, safe = False )



