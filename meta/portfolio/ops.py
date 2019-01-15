



import json
from django.core import serializers
from datetime import datetime

from meta.portfolio.models import Setting



def owner( ):
	## Will fail if the settings object in the database isn't defined
	try:
		query = Setting.objects.get( pk = 1 )
		person = list( trans( [ query ], 'image' ) )
		return person.pop( 0 )
	except Setting.DoesNotExist:
		return dict( )


def dateify( item ):
	item[ 'fields' ][ 'date' ] = item[ 'fields' ].pop( 'date_taken', None )
	## Update date fields reformatted to be more readable dates
	if item[ 'fields' ][ 'date' ]:
		date = datetime.strptime( item[ 'fields' ][ 'date' ], '%Y-%m-%d' )
		## Format each date string with the American date format
		item[ 'fields' ][ 'date' ] = '{0}-{1}-{2}'.format( date.month, date.day, date.year )
	return item


def trans( query, using ):
	## Generator function to fuse related objects because it's fun
	for value in query:
		serial = serializers.serialize( 'json', [ value ] )
		element = json.loads( serial )[ 0 ]
		## Identify the foreign key objects to include in the original
		identity = getattr( value, using, None )
		if identity:
			## Any related objects must be serialized independently
			foreign = serializers.serialize( 'json', [ identity ] )
			element[ 'fields' ][ using ] = json.loads( foreign )[ 0 ]
		yield element



