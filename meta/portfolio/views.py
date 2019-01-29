



import os
import json
import requests
from django.core import serializers
from django.middleware import csrf
from django.core.mail import EmailMessage
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

from meta.portfolio.forms import ContactForm
from meta.portfolio.models import Page, Image, Media
from meta.portfolio.ops import owner, dateify, trans



def index( request, url = None ):
	tags = data( request ).content
	page = json.loads( tags )
	## React's StaticRouter needs the url used by Django instead
	domain = request.scheme + '://' + request.get_host( )
	info = { 'url': domain, 'path': request.path, 'data': page }
	""" ## Get jsx views from the Node server that processes them
	feedback = requests.post(
		'http://localhost:3000/render',
		headers = { 'Content-Type': 'application/json' },
		data = json.dumps( info )
	)
	## Serialized React frontend that will be embedded into html
	metadata = feedback.json( ) """
	metadata = { 'page': dict( ) }
	## Will have no page data if the visited page is an admin one
	if page:
		## Embed additional head tags utilized for SEO when ready
		metadata[ 'page' ] = page[ 'fields' ]
		## Xsrf token is necessary to make post requests via ajax
		csrf.get_token( request )
	""" ## Transform server-side Redux state for browser hydration
	redux = metadata.pop( 'state', {  } )
	metadata[ 'redux' ] = str( redux ) """
	metadata[ 'page' ] = { 'title': 'title', 'description': 'info' }
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
		graphic = image( request ).content
		photo = json.loads( graphic )
		## Photo will be None if the route accessed is an admin url
		if photo:
			photo[ 'fields' ][ 'title' ] = base + ' | ' + title
			return JsonResponse( photo )
		return JsonResponse( photo, safe = False )


def photos( request ):
	query = Image.objects.filter( viewable = True )
	serial = serializers.serialize( 'json', query )
	gallery = json.loads( serial )
	## Update image date fields for more readable viewed dates
	for image in gallery: image = dateify( image )
	return JsonResponse( gallery, safe = False )


def image( request ):
	## Keep track of url segments for identifying a specific photo
	url = request.GET.get( 'url', request.path )[ 1: ]
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


def biography( request ):
	user = owner( )
	if 'fields' in user:
		## Build a new full name key from the erased name fields
		first = user[ 'fields' ].pop( 'first_name', None )
		last = user[ 'fields' ].pop( 'last_name', None )
		user[ 'fields' ][ 'name' ] = '{0} {1}'.format( first, last )
	return JsonResponse( user )


def social( request ):
	media = request.GET.get( 'enabled', False )
	enabled = json.loads( media )
	## Verify whether any social media icons have been enabled
	if enabled:
		query = Media.objects.filter( active = True )
		footer = list( trans( query, 'image' ) )
		return JsonResponse( footer, safe = False )
	return HttpResponse( )


def email( request ):
	## Intercept and perform validation upon the submitted form
	post = ContactForm( request.POST )
	if post.is_valid( ):
		## Create the email message using the cleaned form input
		topic = post.cleaned_data[ 'subject' ]
		bulk = post.cleaned_data[ 'message' ]
		who = post.cleaned_data[ 'address' ]
		## Different endpoint addresses with development testing
		""" route = [ post.cleaned_data[ 'recipient' ] ] """
		route = [ 'email@website.com' ]
		## Send the email via the development mode email server
		args = topic, bulk, who, route
		EmailMessage( *args ).send( )
	## Json temporary returned to inspect all received form data
	new = { 'valid': post.is_valid( ) }
	for key, field in request.POST.dict( ).items( ):
		clean = post.cleaned_data.get( key, False )
		new[ key ] = { 'original': field, 'clean': clean }
	return JsonResponse( new )


