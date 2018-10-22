



import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Base from './base'
import Navigator from './components/navigator/navigator'
import nexus from './nexus'



class Router extends Component {
	
	constructor( props ) {
		super( props )
		this.routes = {  }
		this.state = { location: '' }
	}
	
	
	componentDidMount( ) {
		this.setState( { location: this.props.location.pathname } )
	}
	
	componentDidUpdate( ) {
		if ( this.state.location !== this.props.location.pathname ) {
			this.setState( { location: this.props.location.pathname } )
		}
	}
	
	formRoutes( routes ) {
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
		const site = nexus.bind( nexus )( )
		const url = this.props.location.pathname
		// Parameters for determining if Navigator should be rendered
		const props = { url, site, void: url.includes( '/gallery/' ) }
		const area = url !== '/' ? url.slice( 1 ).split( '/' )[ 0 ] : 'home'
		return (
			<section className={ area + '-page' }>
				<Base location={ url }/>
				<Navigator { ...props }/>
				{ this.formRoutes( site ) }
			</section>
		)
	}
	
}


export default withRouter( Router )



