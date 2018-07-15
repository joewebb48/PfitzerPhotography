



import json
import requests
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from datetime import datetime

from meta.models import Personal, Setting, Image, Text, Media



def index( request, url = None ):
	## Get the jsx views from the Node server that processes it
	feedback = requests.post(
		'http://localhost:3000/render',
		headers = { 'Content-Type': 'application/json' },
		## React's StaticRouter needs the url from Django instead
		data = json.dumps( { 'url': request.path } )
	)
	## Serialized React frontend that will be embedded into html
	metadata = feedback.json( )
	return render( request, 'index.html', metadata )


def photos( request ):
	query = Image.objects.all( )
	serial = serializers.serialize( 'json', query )
	images = json.loads( serial )
	for item in images:
		item[ 'fields' ][ 'date' ] = item[ 'fields' ].pop( 'date_taken', None )
		if item[ 'fields' ][ 'date' ]:
			## Format each date string in the American date format
			date = datetime.strptime( item[ 'fields' ][ 'date' ], '%Y-%m-%d' )
			item[ 'fields' ][ 'date' ] = '{0}-{1}-{2}'.format( date.month, date.day, date.year )
	gallery = { 'images': images }
	return JsonResponse( images, safe = False )


def bio( request ):
	query = Text.objects.filter( page__iexact = 'about', published = True )
	serial = serializers.serialize( 'json', query )
	content = json.loads( serial )
	return JsonResponse( content, safe = False )


def email( request ):
	query = Personal.objects.get( pk = 1 )
	serial = serializers.serialize( 'json', [ query ] )
	address = json.loads( serial )[ 0 ]
	return JsonResponse( address, safe = False )


def social( request ):
	## Verify that the social media links panel has been enabled
	query = Setting.objects.get( name__iexact = 'social media' )
	serial = serializers.serialize( 'json', [ query ] )
	enabled = json.loads( serial )[ 0 ][ 'fields' ][ 'active' ]
	if enabled:
		print( '\n', enabled, '\n' )
		return HttpResponse( )
	## If enabled, grab all activated social media links to display
	else:
		query = Media.objects.filter( active = True )
		serial = serializers.serialize( 'json', query )
		links = json.loads( serial )
		return JsonResponse( links, safe = False )



