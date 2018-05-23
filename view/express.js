



import React from 'react'
import ReactDOMServer from 'react-dom/server'
import express from 'express'
import parsify from 'body-parser'

import App from './app'
import Html from './html'
import './styles.css'



const app = express( )


app.use( parsify.json( { limit: '50mb' } ) )

app.use( express.static( 'meta/static' ) )


// Exclusively ran from Node to render jsx with a stringified template
app.get( '/', ( request, response ) => {
	const root = ReactDOMServer.renderToString( <App/> )
	const title = 'Pfitzer Photography'
	response.send( Html( root, title ) )
} )

// Http request from Django to serialize jsx for server-side rendering 
app.post( '/render', ( request, response ) => {
	const source = request.body.source
	const root = ReactDOMServer.renderToString( <App/> )
	response.send( root )
} )


app.listen( 3000, ( ) => {
	console.log( 'Node running on port 3000!' )
} )


