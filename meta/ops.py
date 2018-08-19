



import json
from django.core import serializers

from meta.models import Setting



def owner( ):
	query = Setting.objects.get( pk = 1 )
	serial = serializers.serialize( 'json', [ query ] )
	user = json.loads( serial )[ 0 ]
	return user



