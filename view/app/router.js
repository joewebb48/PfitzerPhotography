



import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Base from './base'
import Navigator from './components/navigator/navigator'
import Home from './components/home/home'
import About from './components/about/about'
import Gallery from './components/gallery/gallery'
import Contact from './components/contact/contact'



class Router extends Component {
	
	constructor( props ) {
		super( props )
		this.state = { location: undefined }
	}
	
	
	componentDidMount( ) {
		this.setState( { location: this.props.location.pathname } )
	}
	
	componentDidUpdate( ) {
		if ( this.state.location !== this.props.location.pathname ) {
			this.setState( { location: this.props.location.pathname } )
		}
	}
	
	render( ) {
		return (
			<section className="app-page">
				<Base location={ this.state.location }/>
				<Navigator location={ this.state.location }/>
				<Route exact path="/" component={ Home }/>
				<Route path="/about" component={ About }/>
				<Route path="/gallery" component={ Gallery }/>
				<Route path="/contact" component={ Contact }/>
			</section>
		)
	}
	
}


export default withRouter( Router )


