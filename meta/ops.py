



import json
from django.core import serializers
from datetime import datetime

from meta.models import Setting



def owner( ):
	query = Setting.objects.get( pk = 1 )
	serial = serializers.serialize( 'json', [ query ] )
	person = json.loads( serial )[ 0 ]
	## Foreign image object needs to be serialized separately
	if query.image:
		foreign = serializers.serialize( 'json', [ query.image ] )
		person[ 'fields' ][ 'image' ] = json.loads( foreign )[ 0 ]
	return person


def dateify( item ):
	item[ 'fields' ][ 'date' ] = item[ 'fields' ].pop( 'date_taken', None )
	## Update new item date fields with more readable dates
	if item[ 'fields' ][ 'date' ]:
		date = datetime.strptime( item[ 'fields' ][ 'date' ], '%Y-%m-%d' )
		## Format each date string in the American date format
		item[ 'fields' ][ 'date' ] = '{0}-{1}-{2}'.format( date.month, date.day, date.year )
	return item


