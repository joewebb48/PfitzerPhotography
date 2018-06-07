



import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Navigator from '../navigator/navigator'
import Social from '../social/social'
import './home.css'



class Home extends Component {
	
	render( ) {
		return (
			<section>
				<header>
					<h1 className="home-title"> Pfitzer Photography </h1>
					<Navigator atHome={ true }/>
				</header>
				<Link to="/gallery">
					<img className="home-img" alt="image"/>
				</Link>
				<Social/>
			</section>
		)
	}
	
}


export default Home



