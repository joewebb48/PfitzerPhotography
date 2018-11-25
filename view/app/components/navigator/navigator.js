



import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getBiography } from '../../actions/biography'
import { mapBiography } from '../../helpers/stateprops'
import './navigator.css'



class Navigator extends Component {
	
	constructor( props ) {
		super( props )
	}
	
	
	componentDidMount( ) {
		const brief = Object.keys( this.props.biography )
		// Populate biography data via Redux if it is currently missing
		brief.length ? null : this.props.getBiography( )
	}
	
	layNavigation( home ) {
		return this.props.site.map( link => {
			let root = link.route.path === '/'
			let key = !root ? link.route.path.slice( 1 ) : 'home'
			let label = key[ 0 ].toUpperCase( ) + key.slice( 1 )
			let props = { to: link.route.path, children: label }
			// Hide root route link for home route if fifth page is added
			let hide = !home && this.props.url === link.route.path
			return hide ? null : <li key={ key }><Link { ...props }/></li>
		} )
	}
	
	render( ) {
		const index = this.props.url === '/'
		const sum = this.props.biography.fields
		// Dynamic last name retrieval and adjust when nonexistent
		const head = sum && sum.name ? sum.name.split( ' ' )[ 1 ] : ''
		const main = head ? head + ' Photography' : 'Photography'
		return this.props.void ? null : (
			<header>
				{ ( ( ) => ( index ? <h1> { main } </h1> : null ) )( ) }
				<nav>
					<ul className={ index ? 'nav-home' : 'nav-other' }>
						{ this.layNavigation( index ) }
					</ul>
				</nav>
			</header>
		)
	}
	
}


export default connect( mapBiography, { getBiography } )( Navigator )


