



import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Home from './home/home'
import About from './about/about'
import Gallery from './gallery/gallery'



class Router extends Component {
	
	render( ) {
		return (
			<section className="page">
				<Route exact path="/" component={ Home }/>
				<Route path="/about" component={ About }/>
				<Route path="/gallery" component={ Gallery }/>
			</section>
		)
	}
	
}


export default Router


