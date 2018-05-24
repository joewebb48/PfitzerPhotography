



import React from 'react'
import ReactDOMServer from 'react-dom/server'
import express from 'express'
import parsify from 'body-parser'

import App from './app/app'
import Html from './html'



const app = express( )


app.use( parsify.json( ) )

app.use( express.static( 'public' ) )


// Exclusively ran from Node to render jsx with a stringified template
app.get( '/', ( request, response ) => {
	const root = ReactDOMServer.renderToString( <App/> )
	const title = 'Pfitzer Photography'
	response.send( Html( root, title ) )
} )

// Http request from Django to serialize jsx for server-side rendering 
app.post( '/render', ( request, response ) => {
	const root = ReactDOMServer.renderToString( <App/> )
	response.json( {
		html: root,
		title: 'Pfitzer Photography'
	} )
} )


app.listen( 3000, ( ) => {
	console.log( 'Node running on port 3000!' )
} )



