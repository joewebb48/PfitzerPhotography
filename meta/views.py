



import json
import requests
from django.core import serializers
from django.shortcuts import render
from django.http import JsonResponse
from datetime import datetime

from meta.models import Setting, Image, Media



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
	data = serializers.serialize( 'json', Image.objects.all( ) )
	images = json.loads( data )
	for item in images:
		item[ 'fields' ][ 'date' ] = item[ 'fields' ].pop( 'date_taken', None )
		if item[ 'fields' ][ 'date' ]:
			## Format each date string in the American date format
			date = datetime.strptime( item[ 'fields' ][ 'date' ], '%Y-%m-%d' )
			item[ 'fields' ][ 'date' ] = '{0}-{1}-{2}'.format( date.month, date.day, date.year )
	gallery = { 'images': images }
	return JsonResponse( images, safe = False )


def social( request ):
	media = serializers.serialize( 'json', Media.objects.filter( active = True ) )
	active = Setting.objects.get( name__iexact = 'social media' )
	raw = serializers.serialize( 'json', [ active ] )
	icons = json.loads( media )
	status = json.loads( raw )[ 0 ]
	content = { 'icons': icons, 'status': status }
	return JsonResponse( content )


