



import React from 'react'
import ReactDOMServer from 'react-dom/server'
import express from 'express'

import App from '../view/app'
import Html from './html'
import '../view/styles.css'



const app = express( )


app.use( express.static( 'exe/root' ) ) 

app.get( '*', ( request, response ) => {
	const root = ReactDOMServer.renderToString( <App/> )
	const title = 'Pfitzer Photography'
	response.send( Html( root, title ) )
} )

app.listen( 3000, ( ) => {
	console.log( 'Node running on port 3000!' )
} )



