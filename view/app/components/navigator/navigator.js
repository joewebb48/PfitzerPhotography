



import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './navigator.css'



class Navigator extends Component {
	
	layNavigation( home ) {
		return this.props.site.map( link => {
			let root = link.route.path === '/'
			let key = !root ? link.route.path.slice( 1 ) : 'home'
			let label = key[ 0 ].toUpperCase( ) + key.slice( 1 )
			let props = { to: link.route.path, children: label }
			// Hide root route link at home route if fifth page is added
			let hide = !home && this.props.url === link.route.path
			return hide ? null : <li key={ key }><Link { ...props }/></li>
		} )
	}
	
	render( ) {
		const title = 'Pfitzer Photography'
		const root = this.props.url === '/'
		return this.props.void ? null : (
			<header>
				{ ( ( ) => ( root ? <h1> { title } </h1> : null ) )( ) }
				<nav>
					<ul className={ root ? 'nav-home' : 'nav-other' }>
						{ this.layNavigation( root ) }
					</ul>
				</nav>
			</header>
		)
	}
	
}


export default Navigator



