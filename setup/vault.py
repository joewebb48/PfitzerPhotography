



import json



def vault( ):
	with open( 'vault.json' ) as v:
		return json.load( v )



## Expose protected app secrets for use in settings
environ = vault( )



