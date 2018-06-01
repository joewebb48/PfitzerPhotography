



import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './navigator.css'



class Navigator extends Component {
	
	render( ) {
		return (
			<nav>
				<Link to="/"> Home </Link>
				<Link to="/gallery"> Gallery </Link>
			</nav>
		)
	}
	
}


export default Navigator



