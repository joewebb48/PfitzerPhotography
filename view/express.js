



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

app.use( express.static( 'root' ) )


// Exclusively ran from Node to render jsx with a stringified template
app.get( '/*', ( request, response ) => {
	const title = 'Pfitzer Photography'
	const root = ReactDOMServer.renderToString( <Server url={ request.path }/> )
	response.send( Html( root, title ) )
} )

// Http request from Django to serialize jsx for server-side rendering 
app.post( '/render', ( request, response ) => {
	console.log( '\n\nCurrent:', request.body.path, '\n\n' )
	// Data loading on the server must occur prior to rendering the app
	const store = nodeStore( )
	const urls = Router.bind( Router )( request.body.path )
	const factory = exe => urls.reduce( exe, [ ] )
	const load = factory( ( ops, url ) => {
		let api = url.api.map( api => store.dispatch( api( request.body.url ) ) )
		// Utilize non-Redux state data loading on the server once ready
		return ops.concat( api )
	} )
	// Wait for each promise before rendering to resolve for their data
	Promise.all( load ).then( ( ) => {
		console.log( 'Promises:\n', load, '\n\n' )
		// React's router needs originally requested url from Django first
		const data = { url: request.body.path, data: request.body.data, store }
		const root = ReactDOMServer.renderToString( <Server { ...data }/> )
		// Stringify store data as JSON to set initial state on the browser
		const json = JSON.stringify( store.getState( ) )
		response.json( { html: root, state: json } )
	} )
} )


app.listen( 3000, ( ) => {
	console.log( 'Node running on port 3000!', '\n\n' )
} )


