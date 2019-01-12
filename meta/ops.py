



import json
from django.core import serializers
from datetime import datetime

from meta.models import Setting



def owner( ):
	## Will fail if the settings object in the database isn't defined
	try:
		query = Setting.objects.get( pk = 1 )
		serial = serializers.serialize( 'json', [ query ] )
		person = json.loads( serial )[ 0 ]
		## Foreign key image object must be serialized separately
		if query and query.image:
			foreign = serializers.serialize( 'json', [ query.image ] )
			person[ 'fields' ][ 'image' ] = json.loads( foreign )[ 0 ]
		return person
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


