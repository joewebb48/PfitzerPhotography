



import os
import json
import requests
from django.core import serializers
from django.http import JsonResponse
from django.shortcuts import render

from meta.models import Page, Image, Media
from meta.ops import owner, dateify



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
		image = dateify( image )
	return JsonResponse( gallery, safe = False )


def image( request ):
	## Keep track of url segments for identifying a specific photo
	url = request.GET.get( 'url' )[ 1: ]
	base = os.path.basename( url )
	## Locate and modify image data that matches the url suffix
	try:
		query = Image.objects.get( name__iexact = base )
		serial = serializers.serialize( 'json', [ query ] )
		film = json.loads( serial )[ 0 ]
		## Format the image's date field into a more familiar form
		visual = dateify( film )
		return JsonResponse( visual )
	## Nonexistant image query returns None to trigger a redirect
	except Image.DoesNotExist:
		return JsonResponse( None, safe = False )


def bio( request ):
	user = owner( )
	## Build a new full name key from the removed name fields
	first = user[ 'fields' ].pop( 'first_name', None )
	last = user[ 'fields' ].pop( 'last_name', None )
	user[ 'fields' ][ 'name' ] = '{0} {1}'.format( first, last )
	return JsonResponse( user )


def email( request ):
	address = owner( )
	return JsonResponse( address )


def social( request ):
	entity = bio( request ).content
	footer = { 'owner': json.loads( entity ) }
	## Verify whether or not any social media links are enabled
	enabled = footer[ 'owner' ][ 'fields' ][ 'social' ]
	if enabled:
		query = Media.objects.filter( active = True )
		serial = serializers.serialize( 'json', query )
		footer[ 'links' ] = json.loads( serial )
	return JsonResponse( footer )


