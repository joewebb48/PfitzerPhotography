



import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Base from './base'
import Navigator from './components/navigator/navigator'
import nexus from './nexus'



class Router extends Component {
	
	constructor( props ) {
		super( props )
		this.routes = {  }
		// Might not be necessary to have any state in this component
		this.state = { location: props.location.pathname }
	}
	
	
	componentDidMount( ) {
		this.setState( { location: this.props.location.pathname } )
	}
	
	componentDidUpdate( ) {
		if ( this.state.location !== this.props.location.pathname ) {
			this.setState( { location: this.props.location.pathname } )
			console.log( 'router', this.routes )
		}
	}
	
	generateRoutes( ) {
		const location = this.props.location.pathname
		const routes = nexus.bind( nexus )( location )
		console.log( 'website', routes )
		// Generate routes this way to allow server-side data loading
		return routes.map( route => {
			let props = { ...route.route, ref: React.createRef( ) }
			let base = props.path.slice( 1 ).split( '/' ).pop( )
			let key = base[ 0 ] === ':' ? base.slice( 1 ) : base
			this.routes[ props.path !== '/' ? key : 'home' ] = props.ref
			return <Route key={ route.route.path } { ...props }/>
		} )
	}
	
	render( ) {
		const { pathname: url } = this.props.location
		// Parameters for determining if Navigator should be rendered
		const orientation = { url: this.state.location, void: url.includes( '/gallery/' ) }
		const style = url !== '/' ? url.slice( 1 ).split( '/' )[ 0 ] : 'home'
		return (
			<section className={ style + '-page' }>
				<Base location={ this.state.location }/>
				<Navigator { ...orientation }/>
				{ this.generateRoutes( ) }
			</section>
		)
	}
	
}


export default withRouter( Router )



