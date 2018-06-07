



import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Home from './home/home'
import About from './about/about'
import Gallery from './gallery/gallery'
import Contact from './contact/contact'



class Router extends Component {
	
	render( ) {
		return (
			<section className="page">
				<Route exact path="/" component={ Home }/>
				<Route path="/about" component={ About }/>
				<Route path="/gallery" component={ Gallery }/>
				<Route path="/contact" component={ Contact }/>
			</section>
		)
	}
	
}


export default Router


