



import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Base from './base'
import Navigator from './components/navigator/navigator'
import Social from './components/social/social'
import nexus from './nexus'



class Router extends Component {
	
	constructor( props ) {
		super( props )
		// Might not be necessary to have any state in this component
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
	
	generateRoutes( ) {
		const routes = nexus( this.props.location.pathname )
		console.log( routes )
		// Generate routes this way to allow server-side data loading
		return routes.map( route => {
			return <Route key={ route.route.path } { ...route.route }/>
		} )
	}
	
	render( ) {
		// Parameters for determining if Navigator should be rendered
		const exhibit = this.props.location.pathname.startsWith( '/gallery/' )
		return (
			<section className="app-page">
				<Base location={ this.state.location }/>
				<Navigator url={ this.state.location } void={ exhibit }/>
				{ this.generateRoutes( ) }
				<Social url={ this.state.location }/>
			</section>
		)
	}
	
}


export default withRouter( Router )


