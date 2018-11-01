



import React from 'react'
import ReactDOMServer from 'react-dom/server'
import express from 'express'
import parsify from 'body-parser'

import Server from './app/server'
import Router from './app/pages/router'
import Html from './html'
import nodeStore from './app/stores/nodestore'



const app = express( )


app.use( parsify.json( ) )

app.use( express.static( 'public' ) )


// Exclusively ran from Node to render jsx with a stringified template
app.get( '/*', ( request, response ) => {
	const title = 'Pfitzer Photography'
	const root = ReactDOMServer.renderToString( <Server url={ request.path }/> )
	response.send( Html( root, title ) )
} )

// Http request from Django to serialize jsx for server-side rendering 
app.post( '/render', ( request, response ) => {
	// Data loading on the server must occur prior to rendering the app
	const store = nodeStore( )
	console.log( '\n\nCurrent:', request.body.url, '\n\n' )
	const urls = Router.bind( Router )( request.body.url )
	const factory = exe => urls.reduce( exe, [ ] )
	const load = factory( ( ops, url ) => {
		let api = url.api.map( api => store.dispatch( api( ) ) )
		url.query ? api.push( url.query( store ) ) : null
		return ops.concat( api )
	} )
	// Wait for each promise before rendering to resolve for their data
	Promise.all( load ).then( ( ) => {
		console.log( 'Promises:\n', load, '\n\n' )
		// React's router needs originally requested url from Django first
		const data = { url: request.body.url, data: request.body.data, store: store }
		const root = ReactDOMServer.renderToString( <Server { ...data }/> )
		response.json( { html: root } )
	} )
} )


app.listen( 3000, ( ) => {
	console.log( 'Node running on port 3000!', '\n\n' )
} )


