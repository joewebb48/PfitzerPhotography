



import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Base from './base'
import Navigator from './components/navigator/navigator'
import Home from './components/home/home'
import About from './components/about/about'
import Gallery from './components/gallery/gallery'
import Contact from './components/contact/contact'
import Social from './components/social/social'



class Router extends Component {
	
	constructor( props ) {
		super( props )
		this.state = { location: props.location.pathname }
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
		// Parameters for determining if Navigator should be rendered
		const object = Object.assign( {  }, this.props.location.state )
		const gallery = this.props.location.pathname.startsWith( '/gallery' )
		const exhibit = object.hasOwnProperty( 'image' ) && gallery
		return (
			<section className="app-page">
				<Base location={ this.state.location }/>
				<Navigator url={ this.state.location } void={ exhibit }/>
				<Route exact path="/" component={ Home }/>
				<Route path="/about" component={ About }/>
				<Route path="/gallery" component={ Gallery }/>
				<Route path="/contact" component={ Contact }/>
				<Social url={ this.state.location }/>
			</section>
		)
	}
	
}


export default withRouter( Router )


