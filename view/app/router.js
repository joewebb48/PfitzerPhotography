



import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Home from './home/home'
import Gallery from './gallery/gallery'



class Router extends Component {
	
	render( ) {
		return (
			<section>
				<Route exact path="/" component={ Home }/>
				<Route path="/gallery" component={ Gallery }/>
			</section>
		)
	}
	
}


export default Router


