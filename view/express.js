



import React from 'react'
import ReactDOMServer from 'react-dom/server'
import express from 'express'
import parsify from 'body-parser'

// Use Webpack with middleware used for hot module replacement
import webpack from 'webpack'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'

// Webpack config file that will be necessary for middleware setup
import configOps from '../webpack.browser'

import App from './app/pre'
import Html from './html'



const app = express( )

// Duplicate the Webpack settings object that middleware will need
const bundler = webpack( configOps )


app.use( parsify.json( ) )

app.use( express.static( 'public' ) )


// Start up hot module replacement usage via middleware utilization
app.use( require( 'webpack-dev-middleware' )( bundler, {
	publicPath: configOps.output.publicPath
} ) )

/* app.use( devMiddleware( bundler, {
	publicPath: '/'
} ) ) */

app.use( require( 'webpack-hot-middleware' )( bundler, {
	path: '/__webpack_hmr'
} ) )

/* app.use( hotMiddleware( bundler ) ) */


// Exclusively ran from Node to render jsx with a stringified template
app.get( '/*', ( request, response ) => {
	const root = ReactDOMServer.renderToString( <App url={ request.path }/> )
	const title = 'Pfitzer Photography'
	response.send( Html( root, title ) )
} )

// Http request from Django to serialize jsx for server-side rendering 
app.post( '/render', ( request, response ) => {
	// React's router must get the requested url path from Django first
	const root = ReactDOMServer.renderToString( <App url={ request.body.url }/> )
	response.json( { html: root } )
} )


app.listen( 3000, ( ) => {
	console.log( 'Node running on port 3000!' )
} )


