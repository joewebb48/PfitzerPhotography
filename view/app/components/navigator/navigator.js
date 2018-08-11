



import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './navigator.css'



class Navigator extends Component {
	
	render( ) {
		const title = 'Pfitzer Photography'
		const home = this.props.location === '/' ? true : false
		console.log( this.props.location, home )
		return (
			<header>
				{ ( ( ) => ( home ? <h1> { title } </h1> : null ) )( ) }
				<nav>
					<ul className={ home ? 'nav-home' : 'nav-other' }>
						<li><Link to="/"> Home </Link></li>
						<li><Link to="/about"> About </Link></li>
						<li><Link to="/gallery"> Gallery </Link></li>
						<li><Link to="/contact"> Contact </Link></li>
					</ul>
				</nav>
			</header>
		)
	}
	
}


export default Navigator



