



import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './home.css'



class Home extends Component {
	
	render( ) {
		return (
			<Link to="/gallery">
				<img className="home-img" alt="image"/>
			</Link>
		)
	}
	
}


export default Home


