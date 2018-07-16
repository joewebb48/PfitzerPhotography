



import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './navigator.css'



class Navigator extends Component {
	
	render( ) {
		return (
			<nav>
				<ul className={ this.props.atHome ? 'nav-home' : 'nav-other' }>
					<li><Link to="/"> Home </Link></li>
					<li><Link to="/about"> About </Link></li>
					<li><Link to="/gallery"> Gallery </Link></li>
					<li><Link to="/contact"> Contact </Link></li>
				</ul>
			</nav>
		)
	}
	
}


export default Navigator



