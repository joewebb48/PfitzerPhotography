



import React from 'react'
import ReactDOMServer from 'react-dom/server'
import express from 'express'
import parsify from 'body-parser'

import App from './app/pre'
import Html from './html'
import nexus from './app/nexus'
import nodeBox from './app/boxes/nodebox'



const app = express( )


app.use( parsify.json( ) )

app.use( express.static( 'public' ) )


// Exclusively ran from Node to render jsx with a stringified template
app.get( '/*', ( request, response ) => {
	const title = 'Pfitzer Photography'
	const root = ReactDOMServer.renderToString( <App url={ request.path }/> )
	response.send( Html( root, title ) )
} )

// Http request from Django to serialize jsx for server-side rendering 
app.post( '/render', ( request, response ) => {
	// React's router must get the requested url path from Django first
	const data = { url: request.body.url, data: request.body.data, box: nodeBox( ) }
	// Data loading on the server must occur prior to rendering the app
	console.log( '\n\ncurrent:', request.body.url, '\n' )
	const urls = nexus.bind( nexus )( request.body.url )
	const load = urls.map( url => {
		let here = { params: { url: request.body.url } }
		console.log( url )
	} )
	console.log( '\n\n' )
	const root = ReactDOMServer.renderToString( <App { ...data }/> )
	response.json( { html: root } )
} )


app.listen( 3000, ( ) => {
	console.log( 'Node running on port 3000!', '\n\n' )
} )


