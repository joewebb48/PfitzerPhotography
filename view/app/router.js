



import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Base from './base'
import Home from './components/home/home'
import About from './components/about/about'
import Gallery from './components/gallery/gallery'
import Contact from './components/contact/contact'



class Router extends Component {
	
	constructor( props ) {
		super( props )
		this.state = { canUseDOM: false }
	}
	
	
	componentDidMount( ) {
		this.setState( { canUseDOM: true } )
	}
	
	render( ) {
		if ( !this.state.canUseDOM ) {
			return null
		}
		return (
			<section className="page">
				<Base/>
				<Route exact path="/" component={ Home }/>
				<Route path="/about" component={ About }/>
				<Route path="/gallery" component={ Gallery }/>
				<Route path="/contact" component={ Contact }/>
			</section>
		)
	}
	
}


export default Router



