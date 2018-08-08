



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
	
	// Needs to be moved to a more appropriate component
	viewImage( ) {
		const base = this.props.location.pathname.slice( 0, 9 )
		if ( base !== '/gallery/' || this.props.location.pathname.length < 10 ) {
			return null
		}
		const url = '/public/img/' + this.props.location.pathname.slice( 9 )
		// Has server-side rendering error that will need fixing
		return <img className="image-main" src={ url }/>
	}
	
	render( ) {
		const image = '/gallery/' + this.props.location.pathname.slice( 9 )
		return (
			<section className="page">
				<Base location={ this.state.location }/>
				<Route exact path="/" component={ Home }/>
				<Route path="/about" component={ About }/>
				<Route exact path="/gallery" component={ Gallery }/>
				<Route path="/contact" component={ Contact }/>
				<Route path={ image } render={ ( ) => this.viewImage( ) }/>
			</section>
		)
	}
	
}


export default withRouter( Router )



