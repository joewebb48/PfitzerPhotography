



import json
import requests
from django.shortcuts import render



def index( request, url = None ):
	## Get the jsx views from the Node server that processes it
	feedback = requests.post(
		"http://localhost:3000/render",
		headers = { "Content-Type": "application/json" },
		## React's StaticRoter needs url path from Django instead
		data = json.dumps( { "url": request.path } )
	)
	## Serialized React frontend that will be embedded into html
	metadata = feedback.json( )
	return render( request, "index.html", metadata )


